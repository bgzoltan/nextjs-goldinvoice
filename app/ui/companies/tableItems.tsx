"use client";
import { Company } from "@/app/lib/definitions";
import { useState } from "react";
import { DeleteCustomer, UpdateCustomer } from "@/app/ui/customers/buttons";

export interface SelectUserI {
  id: string;
  isDelete: boolean;
  isSelect: boolean;
}

export function TableItems({ company }: { company: Company }) {
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
      className={`${
        selectUser.isSelect && selectUser.id == company.id
          ? "bg-gray-300"
          : "bg-white"
      } border-gray-200 border-1 border-solid static`}
    >
      <td className="p-2">{company.name}</td>
      <td className="p-2">{company.address.country}</td>
      <td className="p-2">{company.address.state.name}</td>
      <td className="p-2">{company.address.town}</td>
      <td className="p-2">{company.address.street}</td>
      <td className="p-2">{company.address.houseNo}</td>
      <td className="p-2">{company.address.flatNo}</td>
      <td className="p-2">{company.web}</td>
      <td className="p-2">{company.phone.phone1}</td>
      <td className="p-2">{company.email.email1}</td>
      <td className="p-2">
        <div className="flex justify-end gap-2">
          <UpdateCustomer id={company.id} />
          <DeleteCustomer
            selectUser={selectUser}
            handleSelectUser={handleSelectUser}
            id={company.id}
          />
        </div>
      </td>
    </tr>
  );
}
