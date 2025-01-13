"use client";

import { Company } from "@/app/lib/definitions";
import {
  PhoneIcon,
  DevicePhoneMobileIcon,
  AtSymbolIcon,
  GlobeAltIcon,
  BuildingOffice2Icon,
  MapIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { suse } from "../fonts";

export default function ContactForm({ company }: { company: Company }) {
  return (
    <div
      className={`flex rounded-lg flex-col w-full gap-2 ${suse.className} bg-goldGreen`}
    >
      <div className="container grid grid-cols-4 text-right p-2 items-center">
        <div className="relative">
          <label className="p-2" htmlFor="country">
            Phone 1
          </label>
          <PhoneIcon className="pointer-events-none absolute right-20 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
        <input
          className="rounded-lg text-sm col-span-3"
          id="country"
          type="text"
          name="country"
          defaultValue={company.phone.phone1 ?? ""}
        />
      </div>
      <div className="container grid grid-cols-4 text-right p-2 items-center">
        <div className="relative">
          <label className="p-2" htmlFor="state">
            Phone 2
          </label>
          <DevicePhoneMobileIcon className="pointer-events-none absolute right-20 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
        <input
          className="rounded-lg text-sm col-span-3"
          id="state"
          type="text"
          name="state"
          defaultValue={company.phone.phone2 ?? ""}
        />
      </div>
      <div className="container grid grid-cols-4 text-right p-2 items-center">
        <div className="relative">
          <label className="p-2" htmlFor="town">
            Email 1
          </label>
          <AtSymbolIcon className="pointer-events-none absolute right-20 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
        <input
          className="rounded-lg text-sm col-span-3"
          id="town"
          type="text"
          name="town"
          defaultValue={company.email.email1 ?? ""}
        />
      </div>

      <div className="container grid grid-cols-4 text-right p-2 items-center">
        <div className="relative">
          <label className="p-2" htmlFor="street">
            Email 2
          </label>
          <AtSymbolIcon className="pointer-events-none absolute right-20 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
        <input
          className="rounded-lg text-sm col-span-3"
          id="street"
          type="text"
          name="street"
          defaultValue={company.email.email2 ?? ""}
        />
      </div>

      <div className="container grid grid-cols-4 text-right p-2 items-center">
        <div className="relative">
          <label className="p-2" htmlFor="street">
            Web
          </label>
          <MapPinIcon className="pointer-events-none absolute right-20 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
        <input
          className="rounded-lg text-sm col-span-3"
          id="street"
          type="text"
          name="street"
          defaultValue={company.web ?? ""}
        />
      </div>
    </div>
  );
}
