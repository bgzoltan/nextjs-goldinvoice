"use client";

import { deleteCustomer } from "@/app/lib/actions";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Confirm from "../confirm-modal";
import { SelectUserI } from "@/app/dashboard/(details)/customers/tableItems";
import CustomLink from "../custom-link";
import CustomButton from "../custom-button";
import CustomLoading from "../custom-loading";

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
  const [isLoading, setIsLoading] = useState({ state: false, text: "" });

  const handleLoading = (state: boolean, text: string) => {
    setIsLoading({ ...isLoading, state, text });
  };

  async function DeleteUser() {
    handleLoading(true, "Deleting...");
    const deleteCustomerWithId = deleteCustomer.bind(null, selectUser.id);
    await deleteCustomerWithId();
    handleSelectUser({ ...selectUser, isDelete: false, isSelect: false });
    handleLoading(false, "");
  }
  function handleConfirm(value: boolean) {
    if (value) DeleteUser();
    handleSelectUser({ ...selectUser, isDelete: false, isSelect: false });
  }
  return (
    <>
      {isLoading.state && (
        <div className="fixed z-0 top-0 left-0 w-full h-full flex justify-center items-center">
          <CustomLoading>{isLoading.text}</CustomLoading>
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
