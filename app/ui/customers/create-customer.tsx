"use client";

import { AtSymbolIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import router from "next/router";
import { ChangeEvent, useState } from "react";
import ShowMessage from "../show-message";
import Link from "next/link";
import { Button } from "../button";
import { createCustomer } from "@/app/lib/actions";

export type Type = "critical error" | "error" | "user info";

export interface Message {
  type: Type | "";
  content: string;
  showMessage: boolean;
  redirect: string;
}

export default function CreateCustomerForm() {
  const [fileName, setFileName] = useState<string>("No selected picture");

  const [message, setMessage] = useState<Message>({
    content: "",
    type: "",
    showMessage: false,
    redirect: "",
  });

  const handleMessageClick = () => {
    const newMessage: Message | null = {
      ...message,
      showMessage: false,
      redirect: "",
    };
    setFileName("There is no selected file.");
    setMessage(newMessage);
    if (message.redirect !== "") {
      router.push(message.redirect);
    }
  };

  const fileValidation = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setMessage({
        ...message,
        content: "There is no selected file",
        type: "user info",
        showMessage: true,
      });
      return;
    }

    if (e.target.files[0].size < 10000) setFileName(e.target.files[0].name);
    else {
      setMessage({
        ...message,
        content: "The size of the file is too large!",
        type: "error",
        showMessage: true,
      });
    }
    const file = e.target.files[0];

    if (
      !["image/webp", "image/jpeg", "image/png"].find(
        (element) => element === file.type
      )
    ) {
      setMessage({
        ...message,
        content: "This is not an image file",
        type: "error",
        showMessage: true,
      });
    }
  };

  async function onSubmit(formData: FormData) {
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const name = `${firstName} ${lastName}`;
    const email = formData.get("email") as string;
    const picture = formData.get("userImage") as File;

    const result = await createCustomer({
      name: name,
      email: email,
      picture: picture,
    });

    if (!result) {
      setMessage({
        ...message,
        content: "Form submitted successfully",
        type: "user info",
        showMessage: true,
        redirect: "/dashboard/customers",
      });
    } else if (result.error) {
      setMessage({
        ...message,
        content: result.error,
        type: "critical error",
        showMessage: true,
      });
    }
  }

  return (
    <form
      action={onSubmit}
      className="w-full relative text-sm mt-2 mb-2 rounded-lg bg-gray-200"
    >
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
          <div className="flex justify-end relative">
            <div className="pr-2">
              <label
                htmlFor="user-image"
                className="peer w-32 rounded-lg border text-white bg-blue-600 p-2 text-sm outline-2 block cursor-pointer "
              >
                Upload a picture
              </label>
            </div>

            <input
              type="file"
              id="user-image"
              name="userImage"
              className="peer w-full rounded-lg border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500 hidden"
              onChange={(e) => fileValidation(e)}
            />
          </div>
          <div className="bg-white rounded-lg text-sm p-2 outline outline-1">
            {fileName}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Customer</Button>
      </div>
      <ShowMessage message={message} handleMessageClick={handleMessageClick} />
    </form>
  );
}
