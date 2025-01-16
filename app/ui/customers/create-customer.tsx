"use client";

import ShowMessage from "../show-message";
import { createCustomer } from "@/app/lib/actions";
import { Customer, MessageType } from "@/app/lib/definitions";
import CustomLoading from "../custom-loading";
import { useMessageAndLoading } from "@/app/dashboard/context/message-context";
import { CustomerForm } from "./customer-form";

export default function CreateCustomerForm() {
  const { message, isLoading, handleMessage } = useMessageAndLoading();

  const customer: Customer = {
    id: "",
    name: "",
    email: "",
    imageUrl: "",
    firstName: "",
    lastName: "",
  };

  async function onSubmit(formData: FormData) {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const name = `${firstName} ${lastName}`;
    const email = formData.get("email") as string;
    let userImageFile = "" as unknown as File;
    if (formData.get("user-image")) {
      userImageFile = formData.get("user-image") as File;
    }

    const result = await createCustomer({
      name: name,
      firstName: firstName,
      lastName: lastName,
      email: email,
      imageUrl: "",
      userImage: userImageFile,
    });

    if (!result) {
      handleMessage({
        ...message,
        content: "Form is updated successfully.",
        type: MessageType.Information,
        show: true,
        redirect: true,
        redirect_url: "/dashboard/customers",
      });
    } else if (result.error) {
      handleMessage({
        ...message,
        content: result.error,
        type: MessageType.Error,
        show: true,
      });
    }
  }

  return (
    <div className="w-full relative text-sm p-2 rounded-lg bg-gray-200">
      {isLoading.state && (
        <div className="fixed z-0 top-0 left-0 w-full h-full flex justify-center items-center">
          <CustomLoading>{isLoading.text}</CustomLoading>
        </div>
      )}
      <CustomerForm customer={customer} onSubmit={onSubmit} />
      <ShowMessage />
    </div>
  );
}
