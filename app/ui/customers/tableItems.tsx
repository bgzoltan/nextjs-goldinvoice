"use client";
import { FormattedCustomersTable, SelectedItem } from "@/app/lib/definitions";
import { useState } from "react";
import { DeleteCustomer, UpdateCustomer } from "@/app/ui/customers/buttons";
import Image from "next/image";

interface TableItemsI {
  customer: FormattedCustomersTable;
}

export function TableItems({ customer }: TableItemsI) {
  const [selectedItem, setSelectedItem] = useState<SelectedItem>({
    id: "",
    isDelete: false,
    isSelect: false,
  });

  const handleSelectItem = (selectedItem: SelectedItem) => {
    setSelectedItem({
      ...selectedItem,
      id: selectedItem.id,
      isDelete: selectedItem.isDelete,
      isSelect: selectedItem.isSelect,
    });
  };
  return (
    <tr
      className={`${
        selectedItem.isSelect && selectedItem.id == customer.id
          ? "bg-gray-300"
          : "bg-white"
      } border-gray-200 border-1 border-solid static`}
    >
      <td className="p-2">
        {customer.image_url !== "" && (
          <Image
            src={customer.image_url}
            className="rounded-full"
            width={28}
            height={28}
            alt={`${customer.name}'s profile picture`}
          />
        )}
      </td>
      <td className="p-2">{customer.name}</td>
      <td className="p-2">{customer.email}</td>
      <td className="p-2">{customer.total_invoices}</td>
      <td className="p-2">{customer.total_paid}</td>
      <td className="p-2">{customer.total_pending}</td>
      <td className="p-2 w-20">
        <div className="flex justify-end gap-2">
          <UpdateCustomer id={customer.id} />
          <DeleteCustomer
            selectedItem={selectedItem}
            handleSelectItem={handleSelectItem}
            id={customer.id}
          />
        </div>
      </td>
    </tr>
  );
}
