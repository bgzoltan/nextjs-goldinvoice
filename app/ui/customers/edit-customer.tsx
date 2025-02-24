"use client";

import { useEffect, useState } from "react";
import ShowMessage from "../show-message";
import { updateCustomer } from "@/app/lib/actions";
import { Customer, MessageType } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";
import CustomLoading from "../custom-loading";
import { useMessageAndLoading } from "@/app/dashboard/context/message-context";
import { CustomerForm } from "./customer-form";

interface EditCustomerProps {
  customer: Customer;
}

export default function EditCustomer({ customer }: EditCustomerProps) {
  const router = useRouter();
  const { message, handleMessage, isLoading } = useMessageAndLoading();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(customer);

  useEffect(() => {
    // prefetching the route to get faster redirect
    router.prefetch("/dashboard/customers");
  }, []);

  async function onSubmit(formData: FormData) {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const name = `${firstName} ${lastName}`;
    const email = formData.get("email") as string;
    const userImageFile = formData.get("user_image") as File;

    const response = await updateCustomer(selectedCustomer.id, {
      name: name,
      firstName: firstName,
      lastName: lastName,
      email: email,
      imageUrl: customer.imageUrl,
      userImage: userImageFile,
    });

    if (!response.error) {
      handleMessage({
        ...message,
        content: "Form is updated successfully.",
        type: MessageType.Information,
        show: true,
        redirect: true,
        redirect_url: "/dashboard/customers",
      });
    } else if (response.error) {
      setSelectedCustomer({ ...selectedCustomer, imageUrl: "" });
      handleMessage({
        ...message,
        content: response.error,
        type: MessageType.Error,
        show: true,
        redirect: false,
        redirect_url: "",
      });
    }
  }

  return (
    <div className="w-full text-sm p-2 rounded-lg bg-gray-200">
      {isLoading.state && (
        <div className="fixed z-0 top-0 left-0 w-full h-full flex justify-center items-center">
          <CustomLoading>{isLoading.text}</CustomLoading>
        </div>
      )}
      <CustomerForm customer={selectedCustomer} onSubmit={onSubmit} />
      <ShowMessage />
    </div>
  );
}
