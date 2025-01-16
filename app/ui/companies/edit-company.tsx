"use client";

import { useEffect } from "react";
import ShowMessage from "../show-message";
import { Company, MessageType } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";
import CustomLoading from "../custom-loading";
import { useMessageAndLoading } from "@/app/dashboard/context/message-context";
import { CompanyForm } from "./company-form";
import { updateCompany } from "@/app/lib/actions";

interface EditCompanyProps {
  company: Company;
}

export default function EditCompany({ company }: EditCompanyProps) {
  const router = useRouter();
  const { message, handleMessage, isLoading } = useMessageAndLoading();

  useEffect(() => {
    // prefetching the route to get faster redirect
    router.prefetch("/dashboard/companies");
  }, []);

  async function onSubmit(formData: FormData) {
    const response = await updateCompany(company.id, {
      id: company.id as string,
      name: formData.get("name") as string,
      country_name: formData.get("countryName") as string,
      country_code: formData.get("countryCode") as string,
      state_name: formData.get("stateName") as string,
      state_code: formData.get("stateCode") as string,
      post_code: formData.get("postCode") as string,
      town: formData.get("town") as string,
      street: formData.get("street") as string,
      house_no: formData.get("houseNo") as string,
      flat_no: formData.get("flatNo") as string,
      email1: formData.get("email1") as string,
      email2: formData.get("email2") as string,
      phone1: formData.get("phone1") as string,
      phone2: formData.get("phone2") as string,
      web: formData.get("web") as string,
    });

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
    <div className="w-full text-sm p-2 rounded-lg bg-gray-200">
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
