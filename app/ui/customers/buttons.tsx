"use client";

import { deleteCustomer } from "@/app/lib/actions";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import Confirm from "../confirm-modal";
import { SelectUserI } from "@/app/dashboard/(details)/customers/tableItems";

export function CreateCustomer() {
  return (
    <Link
      href="/dashboard/customers/create"
      className="flex h-10 items-center rounded-lg bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Customer</span>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateCustomer({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/customers/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

interface DeleteCustomerI {
  selectUser: SelectUserI;
  handleSelectUser: (selectUser: SelectUserI) => void;
  id: string;
}
export function DeleteCustomer({
  selectUser,
  handleSelectUser,
  id,
}: DeleteCustomerI) {
  const [loading, setLoading] = useState(false);
  async function DeleteUser() {
    setLoading(true);
    const deleteCustomerWithId = deleteCustomer.bind(null, selectUser.id);
    await deleteCustomerWithId();
    handleSelectUser({ ...selectUser, isSelect: false });
    setLoading(false);
  }
  function handleConfirm(value: boolean) {
    if (value) DeleteUser();
    handleSelectUser({ ...selectUser, isDelete: false, isSelect: false });
  }
  return (
    <>
      {loading && (
        <div className="fixed left-0 top-0 w-screen h-screen flex justify-center items-center ">
          <div className="flex justify-center items-center w-40 h-32 bg-gray-200 p-2 rounded-lg">
            <div className="bg-blue-400 p-2">Loading...</div>
          </div>
        </div>
      )}
      <button
        onClick={() => {
          handleSelectUser({
            ...selectUser,
            id: id,
            isDelete: true,
            isSelect: true,
          });
        }}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
      {selectUser.isDelete && (
        <Confirm title="Delete user" handleConfirm={handleConfirm} />
      )}
    </>
  );
}
