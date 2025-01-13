"use client";

import { Company } from "@/app/lib/definitions";
import { suse } from "../fonts";
import { BuildingOfficeIcon } from "@heroicons/react/16/solid";
import ContactForm from "./contact-form";
import AddressForm from "./address-form";
import CustomLink from "../custom-link";
import { SubmitButton } from "../submit-button";

interface CompanyFormProps {
  company: Company;
  onSubmit(formData: FormData): Promise<void>;
}

export function CompanyForm(props: CompanyFormProps) {
  const { company, onSubmit } = props;

  return (
    <div className={`flex ${suse.className} bg-white`}>
      <form action={onSubmit} className="flex bg-white flex-col ">
        <div className="flex justify-center items-center rounded-lg m-2 p-2 bg-goldGreen ">
          <div className="relative">
            <label className="p-2" htmlFor="firstName">
              Name
            </label>
            <BuildingOfficeIcon className="pointer-events-none absolute right-20 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <input
            className="rounded-lg text-sm w-80"
            id="name"
            type="text"
            name="name"
            defaultValue={company.name ?? ""}
          />
          <div></div>
        </div>
        <div className="container m-auto grid grid-rows-1 grid-cols-2 gap-2 w-full p-2">
          <ContactForm company={company} />
          <AddressForm company={company} />
        </div>
        <div className="flex justify-end gap-2">
          <CustomLink linkType="secondary" href="/dashboard/companies">
            Cancel
          </CustomLink>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
