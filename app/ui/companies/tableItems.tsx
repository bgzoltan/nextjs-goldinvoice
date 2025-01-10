"use client";
import { Company, SelectedItem } from "@/app/lib/definitions";
import { useState } from "react";
import { DeleteCompany, UpdateCompany } from "@/app/ui/companies/buttons";

export function TableItems({ company }: { company: Company }) {
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
        selectedItem.isSelect && selectedItem.id == company.id
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
      <td className="p-2 w-20">
        <div className="flex justify-end gap-2">
          <UpdateCompany id={company.id} />
          <DeleteCompany
            selectedItem={selectedItem}
            handleSelectItem={handleSelectItem}
            id={company.id}
          />
        </div>
      </td>
    </tr>
  );
}
