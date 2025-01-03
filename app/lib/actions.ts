"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { v2 as cloudinary } from "cloudinary";
import { CreateCustomer } from "./definitions";

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string({ invalid_type_error: "Please select a customer." }),
  customerId: z.string(),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status.",
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];
  try {
    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
`;
  } catch (error) {
    throw new Error(`Database Error: Falied to Create Invoice - ${error}`);
  }
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(id: string, formData: FormData) {
  try {
    const { customerId, amount, status } = UpdateInvoice.parse({
      customerId: formData.get("customerId"),
      amount: formData.get("amount"),
      status: formData.get("status"),
    });

    const amountInCents = amount * 100;

    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.log(error);
    throw new Error("Database Error: Falied to Update Invoice");
  }
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  try {
    await sql`
        DELETE FROM invoices
        WHERE id = ${id}
      `;
    revalidatePath("/dashboard/invoices");
  } catch (error) {
    console.log(error);
    throw new Error(`Database Error: Falied to Delete Invoice`);
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

// Create formschema for Zod validation library
const CustomerFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email("Invalid email"),
  image_url: z.string(),
});

const CreateCustomerSchema = CustomerFormSchema.omit({
  id: true,
  image_url: true,
});

export async function createCustomer(customer: CreateCustomer) {
  const picture = customer.picture;

  try {
    if (!customer.name || !customer.email || picture.size === 0)
      throw new Error(`Please fill in all fields and select an image!`);
  } catch (error) {
    // Return an error to the client side
    if (error instanceof Error) return { error: error.message };
  }

  // Validate with Zod parse method
  const { name, email } = CreateCustomerSchema.parse({
    name: customer.name,
    email: customer.email,
  });

  // email database validation
  try {
    const response =
      await sql`SELECT * FROM customers WHERE (email ILIKE ${email} or name ILIKE ${name}) `;
    if (response.rows.length !== 0)
      throw new Error(
        `The ${name} or the ${email} is already in the database!`
      );
  } catch (error) {
    // Return an error to the client side
    if (error instanceof Error) return { error: error.message };
  }

  const image_url = await saveFile(picture);

  try {
    // Insert data into database
    await sql`
   INSERT INTO customers (name, email, image_url)
   VALUES (${name}, ${email}, ${image_url})
  `;
  } catch (error) {
    throw new Error("There is a problem creating a customer");
  }
  // Once the database has been updated, the /dashboard/invoices path will be revalidated (cache will be deleted), and fresh data will be fetched from the server (a new request will be send).
  revalidatePath("/dashboard/customers");
  return;
}

export async function updateCustomer(id: string, formData: FormData) {
  return null;
}

export async function deleteCustomer(id: string) {
  try {
    await sql`DELETE FROM customers WHERE id=${id}`;
    revalidatePath("/dashboard/customers");
  } catch (error) {
    console.log(error);
    throw new Error("Database Error: Failed to Delete Customer!");
  }
}

interface UploadResult {
  url: string;
}

async function saveFile(file: File) {
  // Saving file to cloudinary cloud and return the url - it is necessary to define the images domain is next.config.js file
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  const result = await new Promise<UploadResult>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, function (error, result) {
        if (error || result === undefined) {
          reject(error || new Error("Upload result is undefined."));
          return;
        }
        resolve(result);
      })
      .end(buffer);
  });

  return result.url;
}
