"use client";

import { useEffect } from "react";
import ShowMessage from "../show-message";
import { updateCustomer } from "@/app/lib/actions";
import { Customer, Message, MessageType } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";
import CustomLoading from "../custom-loading";
import { EditForm } from "./edit-form";
import { useMessageAndLoading } from "@/app/dashboard/context/message-context";

interface EditCustomerFormProp {
  id: string;
  customer: Customer;
}

export default function EditCustomerForm({
  id,
  customer,
}: EditCustomerFormProp) {
  const router = useRouter();
  const { message, handleMessage, handleMessageClick, isLoading } =
    useMessageAndLoading();

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

    const response = await updateCustomer(id, {
      name: name,
      firstName: firstName,
      lastName: lastName,
      email: email,
      imageUrl: customer.imageUrl,
      userImage: userImageFile,
    });

    if (!response) {
      handleMessage({
        ...message,
        content: "Form is updated successfully.",
        type: MessageType.Information,
        show: true,
        redirect: true,
      });
    } else if (response.error) {
      handleMessage({
        ...message,
        content: response.error,
        type: MessageType.Error,
        show: true,
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
      <EditForm customer={customer} onSubmit={onSubmit} />
      <ShowMessage />
    </div>
  );
}
