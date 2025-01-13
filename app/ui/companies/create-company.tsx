"use client";

import ShowMessage from "../show-message";
import { createCompany } from "@/app/lib/actions";
import { Company, MessageType } from "@/app/lib/definitions";
import CustomLoading from "../custom-loading";
import { useMessageAndLoading } from "@/app/dashboard/context/message-context";
import { CompanyForm } from "./company-form";
import { useState } from "react";
import { mapCompaniesDtoToCompanies } from "@/app/dashboard/(details)/companies/page";

export default function CreateCustomerForm() {
  const { message, isLoading, handleMessage } = useMessageAndLoading();
  const [company, setCompany] = useState<Company>({
    id: "",
    name: "",
    address: {
      country: "",
      state: {
        name: "",
        abbreviation: "",
      },
      town: "",
      street: "",
      houseNo: "",
      flatNo: "",
    },
    email: { email1: "", email2: "" },
    phone: { phone1: "", phone2: "" },
    web: "",
  });

  async function onSubmit(formData: FormData) {
    console.log(
      "FORMDATA ++++++++++++++++++++++++",
      "Name:",
      formData.get("name") as string,
      "Country",
      formData.get("country") as string,
      "State:",
      formData.get("stateName") as string,
      formData.get("stateAbbreviation") as string,
      formData.get("town") as string,
      formData.get("street") as string,
      formData.get("houseNo") as string,
      formData.get("flatNo") as string,
      formData.get("email1") as string,
      formData.get("email2") as string,
      formData.get("phone1") as string,
      formData.get("phone2") as string,
      formData.get("web") as string
    );

    const newCompany = {
      id: "",
      name: formData.get("name") as string,
      country: formData.get("country") as string,
      state_name: formData.get("stateName") as string,
      state_abreviation: formData.get("stateAbbreviation") as string,
      town: formData.get("town") as string,
      street: formData.get("town") as string,
      house_no: formData.get("houseNo") as string,
      flat_no: formData.get("flatNo") as string,
      email1: formData.get("email1") as string,
      email2: formData.get("email2") as string,
      phone1: formData.get("phone1") as string,
      phone2: formData.get("phone2") as string,
      web: formData.get("web") as string,
    };

    const result = await createCompany(newCompany);
    setCompany(mapCompaniesDtoToCompanies([newCompany])[0]);

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
      <CompanyForm company={company} onSubmit={onSubmit} />
      <ShowMessage />
    </div>
  );
}
