"use client";
import { FormattedCustomersTable } from "@/app/lib/definitions";
import { useState } from "react";
import { DeleteCustomer, UpdateCustomer } from "@/app/ui/customers/buttons";
import Image from "next/image";

export interface SelectUserI {
  id: string;
  isDelete: boolean;
  isSelect: boolean;
}

interface TableItemsI {
  customer: FormattedCustomersTable;
}

export function TableItems({ customer }: TableItemsI) {
  const [selectUser, setSelectUser] = useState<SelectUserI>({
    id: "",
    isDelete: false,
    isSelect: false,
  });

  const handleSelectUser = (selectUser: SelectUserI) => {
    setSelectUser({
      ...selectUser,
      id: selectUser.id,
      isDelete: selectUser.isDelete,
      isSelect: selectUser.isSelect,
    });
  };
  return (
    <tr
      key={customer.id}
      className={`${
        selectUser.isSelect && selectUser.id == customer.id
          ? "bg-gray-300"
          : "bg-white"
      } border-gray-200 border-1 border-solid static`}
    >
      <td className="p-2">
        <Image
          src={customer.image_url}
          className="rounded-full"
          width={28}
          height={28}
          alt={`${customer.name}'s profile picture`}
        />
      </td>
      <td className="p-2">{customer.name}</td>
      <td className="p-2">{customer.email}</td>
      <td className="p-2">{customer.total_invoices}</td>
      <td className="p-2">{customer.total_paid}</td>
      <td className="p-2">{customer.total_pending}</td>
      <td className="p-2">
        <div className="flex justify-end gap-2">
          <UpdateCustomer id={customer.id} />
          <DeleteCustomer
            selectUser={selectUser}
            handleSelectUser={handleSelectUser}
            id={customer.id}
          />
        </div>
      </td>
    </tr>
  );
}
