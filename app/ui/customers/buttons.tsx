"use client";

import { deleteCustomer } from "@/app/lib/actions";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import Confirm from "../confirm-modal";
import { SelectUserI } from "@/app/dashboard/(details)/customers/tableItems";
import CustomLink from "../custom-link";
import CustomButton from "../custom-button";

export function CreateCustomer() {
  return (
    <CustomLink linkType="primary" href="/dashboard/customers/create">
      Create Customer
      <span className="sr-only">Create</span>
      <PlusIcon className="h-5" />
    </CustomLink>
  );
}

export function UpdateCustomer({ id }: { id: string }) {
  return (
    <CustomLink linkType="secondary" href={`/dashboard/customers/${id}/edit`}>
      <span className="sr-only">Edit</span>
      <PencilIcon className="w-5" />
    </CustomLink>
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
      <CustomButton
        buttonType="secondary"
        onClick={() => {
          handleSelectUser({
            ...selectUser,
            id: id,
            isDelete: true,
            isSelect: true,
          });
        }}
      >
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </CustomButton>
      {selectUser.isDelete && (
        <Confirm title="Delete user" handleConfirm={handleConfirm} />
      )}
    </>
  );
}
