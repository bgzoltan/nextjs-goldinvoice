"use client";

import {
  ArrowUpOnSquareIcon,
  AtSymbolIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { ChangeEvent, useEffect, useState } from "react";
import ShowMessage from "../show-message";
import { updateCustomer } from "@/app/lib/actions";
import CustomLink from "../custom-link";
import CustomButton from "../custom-button";
import { Customer, Message, MessageType } from "@/app/lib/definitions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CustomLoading from "../custom-loading";
import { SubmitButton } from "./submit-button";
import { EditForm } from "./edit-form";

interface EditCustomerFormProp {
  id: string;
  customer: Customer;
}

export default function EditCustomerForm({
  id,
  customer,
}: EditCustomerFormProp) {
  const [isLoading, setIsLoading] = useState({ state: false, text: "" });
  const [message, setMessage] = useState<Message>({
    type: MessageType.Empty,
    content: "",
    show: false,
    redirect: false,
  });

  const router = useRouter();

  const handleLoading = (state: boolean, text: string) => {
    setIsLoading({ ...isLoading, state, text });
  };

  useEffect(() => {
    // prefetching the route to get faster redirect
    router.prefetch("/dashboard/customers");
  }, []);

  const handleMessageClick = () => {
    setMessage({
      ...message,
      show: false,
    });
    if (message.redirect) {
      handleLoading(true, "Redirecting...");
      router.push("/dashboard/customers");
    }
  };

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
      setMessage({
        ...message,
        content: "Form is updated successfully.",
        type: MessageType.Information,
        show: true,
        redirect: true,
      });
    } else if (response.error) {
      setMessage({
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
      <EditForm
        customer={customer}
        onSubmit={onSubmit}
        handleLoading={handleLoading}
      />
      <ShowMessage message={message} handleMessageClick={handleMessageClick} />
    </div>
  );
}
