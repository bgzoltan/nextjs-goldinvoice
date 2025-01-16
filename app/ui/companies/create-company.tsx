"use client";

import ShowMessage from "../show-message";
import { createCompany } from "@/app/lib/actions";
import { Company, MessageType } from "@/app/lib/definitions";
import CustomLoading from "../custom-loading";
import { useMessageAndLoading } from "@/app/dashboard/context/message-context";
import { CompanyForm } from "./company-form";
import { useState } from "react";
import { mapCompaniesDtoToCompanies } from "@/app/lib/utils";

export default function CreateCustomerForm() {
  const { message, isLoading, handleMessage } = useMessageAndLoading();
  const [company, setCompany] = useState<Company>({
    id: "",
    name: "",
    address: {
      country: { name: "", code: "" },
      state: {
        name: "",
        code: "",
      },
      postCode: "",
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
    const newCompany = {
      id: "",
      name: formData.get("name") as string,
      country_name: formData.get("countryName") as string,
      country_code: formData.get("countryCode") as string,
      state_name: formData.get("stateName") as string,
      state_code: formData.get("stateCode") as string,
      post_code: formData.get("postCode") as string,
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
    setCompany(mapCompaniesDtoToCompanies([newCompany])[0]);

    const response = await createCompany(newCompany);

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
