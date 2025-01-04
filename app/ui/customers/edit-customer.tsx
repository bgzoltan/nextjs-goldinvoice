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

interface EditCustomerFormProp {
  id: string;
  customer: Customer;
}

export default function EditCustomerForm({
  id,
  customer,
}: EditCustomerFormProp) {
  const [fileName, setFileName] = useState<string>(customer.imageUrl);
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

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFileName(`${e.target.files[0].name}`);
  };

  async function onSubmit(formData: FormData) {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const name = `${firstName} ${lastName}`;
    const email = formData.get("email") as string;
    const userImageFile = formData.get("user_image") as File;

    const result = await updateCustomer(id, {
      name: name,
      firstName: firstName,
      lastName: lastName,
      email: email,
      imageUrl: customer.imageUrl,
      userImage: userImageFile,
    });

    if (!result) {
      setMessage({
        ...message,
        content: "Form is updated successfully.",
        type: MessageType.Information,
        show: true,
        redirect: true,
      });
    } else if (result.error) {
      setMessage({
        ...message,
        content: result.error,
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

      <form action={onSubmit} className="bg-white flex flex-col">
        <div className="flex">
          <div className="w-50 p-2">
            <Image
              src={`${
                fileName.includes("http") ? fileName : "/customers/" + fileName
              }`}
              className="rounded-full"
              width={100}
              height={100}
              alt={`${customer.name}'s profile picture`}
            />
          </div>
          <div className="container m-auto grid grid-rows-3 grid-cols-2 gap-2 w-full p-2">
            <div className="container grid grid-cols-2 text-right items-center">
              <div className="relative">
                <label className="p-2" htmlFor="firstName">
                  First name
                </label>
                <UserCircleIcon className="pointer-events-none absolute right-20 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
              </div>
              <input
                className="rounded-lg text-sm"
                id="firstName"
                type="text"
                name="firstName"
                defaultValue={customer.firstName ?? ""}
              />
            </div>
            <div className="container grid grid-cols-2 text-right items-center">
              <div className="relative">
                <label className="p-2" htmlFor="last_name">
                  Last name
                </label>
                <UserCircleIcon className="pointer-events-none absolute right-20 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
              </div>
              <input
                className="rounded-lg text-sm"
                id="lastName"
                type="text"
                name="lastName"
                defaultValue={customer.lastName ?? ""}
              />
            </div>
            <div className="container grid grid-cols-2 text-right items-center">
              <div className="relative">
                <AtSymbolIcon className="pointer-events-none absolute right-14 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                <label className="p-2" htmlFor="email">
                  e-mail
                </label>
              </div>
              <input
                className="rounded-lg text-sm"
                type="email"
                name="email"
                defaultValue={customer.email}
              />
            </div>
            <div></div>
            <div className="container grid grid-cols-2 text-right items-center">
              <div className="flex justify-end items-center pr-2">
                <CustomButton buttonType="primary" type="button">
                  <label
                    htmlFor="user-image"
                    className="peer block cursor-pointer"
                  >
                    Upload a picture
                  </label>
                  <ArrowUpOnSquareIcon className="w-5 ml-2" />
                </CustomButton>
                <input
                  type="file"
                  id="user-image"
                  name="user_image"
                  defaultValue={""}
                  className="peer w-full rounded-lg border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500 hidden"
                  onChange={(e) => handleFileInput(e)}
                />
              </div>
              <div className="bg-white rounded-lg text-sm p-2 border border-gray-600 border-solid h-10">
                {fileName.includes("http") ? " " : fileName}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <CustomLink linkType="secondary" href="/dashboard/customers">
            Cancel
          </CustomLink>
          <SubmitButton handleLoading={handleLoading} />
        </div>
        <ShowMessage
          message={message}
          handleMessageClick={handleMessageClick}
        />
      </form>
    </div>
  );
}
