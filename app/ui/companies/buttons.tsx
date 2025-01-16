"use client";

import { deleteCompany } from "@/app/lib/actions";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Confirm from "../confirm-modal";
import CustomLink from "../custom-link";
import CustomButton from "../custom-button";
import CustomLoading from "../custom-loading";
import { MessageType, SelectedItem } from "@/app/lib/definitions";
import { useMessageAndLoading } from "@/app/dashboard/context/message-context";

export function CreateCompany() {
  return (
    <CustomLink linkType="primary" href="/dashboard/companies/create">
      Create Company
      <span className="sr-only">Create</span>
      <PlusIcon className="h-5" />
    </CustomLink>
  );
}

export function UpdateCompany({ id }: { id: string }) {
  return (
    <CustomLink linkType="secondary" href={`/dashboard/companies/${id}/edit`}>
      <span className="sr-only">Edit</span>
      <PencilIcon className="w-5" />
    </CustomLink>
  );
}

export function DeleteCompany({
  selectedItem,
  handleSelectItem,
  id,
}: {
  selectedItem: SelectedItem;
  handleSelectItem: (selectedItem: SelectedItem) => void;
  id: string;
}) {
  const { message, handleMessage, isLoading, handleLoading } =
    useMessageAndLoading();

  async function DeleteCompany() {
    handleLoading(true, "Deleting...");
    const deleteCompanyWithId = deleteCompany.bind(null, selectedItem.id);
    const response = await deleteCompanyWithId();

    if (!response.error) {
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

    handleSelectItem({ ...selectedItem, isDelete: false, isSelect: false });
    handleLoading(false, "");
  }
  function handleConfirm(value: boolean) {
    if (value) DeleteCompany();
    handleSelectItem({ ...selectedItem, isDelete: false, isSelect: false });
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
          handleSelectItem({
            ...selectedItem,
            id: id,
            isDelete: true,
            isSelect: true,
          });
        }}
      >
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </CustomButton>
      {selectedItem.isDelete && (
        <Confirm title="Delete user" handleConfirm={handleConfirm} />
      )}
    </>
  );
}
