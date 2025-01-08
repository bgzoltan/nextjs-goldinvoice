"use client";

import {
  ArrowUpOnSquareIcon,
  AtSymbolIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import ShowMessage from "../show-message";
import { createCustomer } from "@/app/lib/actions";
import CustomLink from "../custom-link";
import CustomButton from "../custom-button";
import { MessageType } from "@/app/lib/definitions";
import CustomLoading from "../custom-loading";
import { SubmitButton } from "./submit-button";
import { useMessageAndLoading } from "@/app/dashboard/context/message-context";

export default function CreateCustomerForm() {
  const [fileName, setFileName] = useState<string>("");
  const { message, isLoading, handleMessage } = useMessageAndLoading();

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFileName(`${e.target.files[0].name}`);
  };

  async function onSubmit(formData: FormData) {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const name = `${firstName} ${lastName}`;
    const email = formData.get("email") as string;
    const userImageFile = formData.get("user-image") as File;

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
      <form action={onSubmit} className="bg-white">
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
            />
          </div>
          <div className="container grid grid-cols-2 text-right items-center">
            <div className="relative">
              <label className="p-2" htmlFor="lastName">
                Last name
              </label>
              <UserCircleIcon className="pointer-events-none absolute right-20 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <input
              className="rounded-lg text-sm"
              id="lastName"
              type="text"
              name="lastName"
            />
          </div>
          <div className="container grid grid-cols-2 text-right items-center">
            <div className="relative">
              <AtSymbolIcon className="pointer-events-none absolute right-14 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
              <label className="p-2" htmlFor="email">
                e-mail
              </label>
            </div>
            <input className="rounded-lg text-sm" type="email" name="email" />
          </div>
          <div></div>
          <div className="container grid grid-cols-2 text-right items-center">
            <div className="flex justify-end pr-2">
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
                name="user-image"
                className="peer w-full rounded-lg border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500 hidden"
                onChange={(e) => handleFileInput(e)}
              />
            </div>
            <span className="bg-white rounded-lg text-sm p-2 outline outline-1">
              {fileName}
            </span>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <CustomLink linkType="secondary" href="/dashboard/customers">
            Cancel
          </CustomLink>
          <SubmitButton />
        </div>
        <ShowMessage />
      </form>
    </div>
  );
}
