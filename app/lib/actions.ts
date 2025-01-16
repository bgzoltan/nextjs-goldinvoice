"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { v2 as cloudinary } from "cloudinary";
import { CompanyDTO, CreateModifyCustomer } from "./definitions";

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
  imageUrl: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

const CreateCustomerSchema = CustomerFormSchema.omit({
  id: true,
  imageUrl: true,
});

export async function createCustomer(customer: CreateModifyCustomer) {
  try {
    if (!customer.name || !customer.email)
      throw new Error(`Please fill in all fields and select an image!`);
  } catch (error) {
    // Return an error to the client side
    if (error instanceof Error) return { error: error.message };
  }

  // Validate with Zod parse method
  const validatedCustomer = CreateCustomerSchema.parse({
    name: customer.firstName + " " + customer.lastName,
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
  });

  // email database validation
  try {
    const response =
      await sql`SELECT * FROM customers WHERE (email ILIKE ${validatedCustomer.email} or name ILIKE ${validatedCustomer.name}) `;
    if (response.rows.length !== 0)
      throw new Error(
        `The ${validatedCustomer.name} or the ${validatedCustomer.email} is already in the database!`
      );
  } catch (error) {
    // Return an error to the client side
    if (error instanceof Error) return { error: error.message };
  }

  let imageUrl = customer.imageUrl;
  if (customer.userImage.size > 0)
    imageUrl = await saveFile(customer.userImage);

  try {
    // Insert data into database
    await sql`
   INSERT INTO customers (first_name,last_name,name, email, image_url)
   VALUES (${validatedCustomer.firstName},${validatedCustomer.lastName},${validatedCustomer.name}, ${validatedCustomer.email}, ${imageUrl})
  `;
  } catch (error) {
    throw new Error(`There is a problem creating a customer: ${error}`);
  }
  // Once the database has been updated, the /dashboard/invoices path will be revalidated (cache will be deleted), and fresh data will be fetched from the server (a new request will be send).
  revalidatePath("/dashboard/customers");
  return;
}

export async function updateCustomer(
  id: string,
  customer: CreateModifyCustomer
) {
  try {
    if (!customer.name || !customer.email)
      throw new Error(`Please fill in all fields and select an image!`);
  } catch (error) {
    // Return an error to the client side
    if (error instanceof Error) return { error: error.message };
  }

  // Validate with Zod parse method
  const { name, firstName, lastName, email } = CreateCustomerSchema.parse({
    name: customer.firstName + " " + customer.lastName,
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
  });

  // email database validation
  try {
    const response =
      await sql`SELECT * FROM customers WHERE (email ILIKE ${email} and name NOT ILIKE ${name}) `;
    if (response.rows.length !== 0)
      throw new Error(
        `The ${name} or the ${email} is already in the database!`
      );
  } catch (error) {
    // Return an error to the client side
    if (error instanceof Error) return { error: error.message };
  }

  try {
    if (customer.userImage.size > 8000) {
      throw new Error(`The size of the uploaded file is more than 8000!`);
    } else {
      if (
        !["image/webp", "image/jpeg", "image/png"].some((str) =>
          customer.userImage.type.includes(str)
        ) &&
        customer.userImage.size !== 0
      ) {
        throw new Error(`The file type is not good!`);
      }
    }
  } catch (error) {
    // Return an error to the client side
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: error };
    }
  }

  let imageUrl = customer.imageUrl;
  if (customer.userImage.size > 0)
    imageUrl = await saveFile(customer.userImage);

  try {
    // Insert data into database
    await sql`
      UPDATE customers
      SET name=${name}, first_name=${firstName}, last_name=${lastName}, email=${email}, image_url=${imageUrl}
      WHERE id=${id}
    `;
  } catch (error) {
    throw new Error(`There is a problem updating a customer: ${error}`);
  }
  // Once the database has been updated, the /dashboard/invoices path will be revalidated (cache will be deleted), and fresh data will be fetched from the server (a new request will be send).
  revalidatePath("/dashboard/customers");
  return;
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

export async function deleteCompany(id: string) {
  try {
    await sql`DELETE FROM companies WHERE id=${id}`;
    revalidatePath("/dashboard/company");
  } catch (error) {
    console.log(error);
    if (error instanceof Error) return { error: error.message };
  }
  return { error: null };
}

// Create formschema for Zod validation library
const CompanyFormSchema = z.object({
  id: z.string(),
  name: z.string().max(40, { message: "Name is too long!" }),
  country_name: z.string().max(56, { message: "Country name is too long!" }),
  country_code: z.string().max(56, { message: "Country name is too long!" }),
  state_name: z.string(),
  state_code: z.string(),
  post_code: z.string(),
  town: z.string().max(30, { message: "Town name is too long!" }),
  street: z.string().max(50, { message: "Street name is too long!" }),
  house_no: z.string().max(5, { message: "House no. is too long!" }),
  flat_no: z.string().max(5, { message: "Flat no. is too long!" }),
  email1: z.string().email("Invalid email 1"),
  email2: z.string().email("Indvalid email 2"),
  phone1: z.string(),
  phone2: z.string(),
  web: z.string().url("The website is invalid"),
});

export async function createCompany(company: CompanyDTO) {
  try {
    if (!company.name) throw new Error(`Company name is missing!`);
  } catch (error) {
    // Return an error to the client side
    if (error instanceof Error) return { error: error.message };
  }

  // Validate with Zod parse method
  const parsedValue = CompanyFormSchema.safeParse({
    id: company.id,
    name: company.name,
    country_name: company.country_name,
    country_code: company.country_code,
    state_name: company.state_name,
    state_code: company.state_code,
    post_code: company.post_code,
    town: company.town,
    street: company.street,
    house_no: company.house_no,
    flat_no: company.flat_no,
    email1: company.email1,
    email2: company.email2,
    phone1: company.phone1,
    phone2: company.phone2,
    web: company.web,
  });

  if (!parsedValue.success) {
    const message = parsedValue.error.errors
      .map((error) => error.message)
      .join(" - ");
    return {
      error: message,
    };
  }

  const validatedCompany = parsedValue.data;

  // company name database validation
  try {
    const response =
      await sql`SELECT * FROM companies WHERE (name ILIKE ${validatedCompany.name}) `;
    if (response.rows.length !== 0)
      throw new Error(`This company is already in the database!`);
  } catch (error) {
    // Return an error to the client side
    if (error instanceof Error) return { error: error.message };
  }

  try {
    // Insert data into database
    await sql`
   INSERT INTO companies (name,country_name,country_code,state_name,state_code,post_code,town,street,house_no,flat_no,phone1,phone2,email1,email2,web)
   VALUES (
   ${validatedCompany.name},
   ${validatedCompany.country_name},
   ${validatedCompany.country_code},
   ${validatedCompany.state_name},
   ${validatedCompany.state_code},
   ${validatedCompany.post_code},
   ${validatedCompany.town},
   ${validatedCompany.street},
   ${validatedCompany.house_no},
   ${validatedCompany.flat_no},
   ${validatedCompany.phone1},
   ${validatedCompany.phone2},
   ${validatedCompany.email1},
   ${validatedCompany.email2},
   ${validatedCompany.web})
  `;
  } catch (error) {
    // Return an error to the client side
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: `Unknown error during create company: ${error}` };
    }
  }

  // Once the data has been inserted, the /dashboard/companies path will be revalidated (cache will be deleted), and fresh data will be fetched from the server (a new request will be send).
  revalidatePath("/dashboard/companies");
  return { error: null };
}

export async function updateCompany(id: string, company: CompanyDTO) {
  // Validate with Zod parse method
  const parsedValue = CompanyFormSchema.safeParse({
    id: id,
    name: company.name,
    country_name: company.country_name,
    country_code: company.country_code,
    state_name: company.state_name,
    state_code: company.state_code,
    post_code: company.post_code,
    town: company.town,
    street: company.street,
    house_no: company.house_no,
    flat_no: company.flat_no,
    email1: company.email1,
    email2: company.email2,
    phone1: company.phone1,
    phone2: company.phone2,
    web: company.web,
  });

  if (!parsedValue.success) {
    const message = parsedValue.error.errors
      .map((error) => error.message)
      .join(" - ");
    return {
      error: message,
    };
  }

  const validatedCompany = parsedValue.data;

  try {
    // Insert data into database
    await sql`
      UPDATE companies
      SET name=${validatedCompany.name}, country_name=${validatedCompany.country_name}, country_code=${validatedCompany.country_code}, state_name=${validatedCompany.state_name}, state_code=${validatedCompany.state_code}, post_code=${validatedCompany.post_code}, town=${validatedCompany.town}, street=${validatedCompany.street}, house_no=${validatedCompany.house_no}, flat_no=${validatedCompany.flat_no}, email1=${validatedCompany.email1}, email2=${validatedCompany.email2}, phone1=${validatedCompany.phone1}, phone2=${validatedCompany.phone2}, web=${validatedCompany.web}
      WHERE id=${id}
    `;
  } catch (error) {
    // Return an error to the client side
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: `Unknown error during updating company: ${error}` };
    }
  }
  // Once the database has been updated, the /dashboard/companies path will be revalidated (cache will be deleted), and fresh data will be fetched from the server (a new request will be send).
  revalidatePath("/dashboard/companies");
  return { error: null };
}
