"use client";

import { Company } from "@/app/lib/definitions";
import {
  PhoneIcon,
  DevicePhoneMobileIcon,
  AtSymbolIcon,
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
          <label className="p-2" htmlFor="phone1">
            Phone 1
          </label>
          <PhoneIcon className="pointer-events-none absolute right-20 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
        <input
          className="rounded-lg text-sm col-span-3"
          id="phone1"
          type="text"
          name="phone1"
          defaultValue={company.phone.phone1 ?? ""}
        />
      </div>
      <div className="container grid grid-cols-4 text-right p-2 items-center">
        <div className="relative">
          <label className="p-2" htmlFor="phone2">
            Phone 2
          </label>
          <DevicePhoneMobileIcon className="pointer-events-none absolute right-20 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
        <input
          className="rounded-lg text-sm col-span-3"
          id="phone2"
          type="text"
          name="phone2"
          defaultValue={company.phone.phone2 ?? ""}
        />
      </div>
      <div className="container grid grid-cols-4 text-right p-2 items-center">
        <div className="relative">
          <label className="p-2" htmlFor="email1">
            Email 1
          </label>
          <AtSymbolIcon className="pointer-events-none absolute right-20 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
        <input
          className="rounded-lg text-sm col-span-3"
          id="email1"
          type="text"
          name="email1"
          defaultValue={company.email.email1 ?? ""}
        />
      </div>

      <div className="container grid grid-cols-4 text-right p-2 items-center">
        <div className="relative">
          <label className="p-2" htmlFor="email2">
            Email 2
          </label>
          <AtSymbolIcon className="pointer-events-none absolute right-20 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
        <input
          className="rounded-lg text-sm col-span-3"
          id="email2"
          type="text"
          name="email2"
          defaultValue={company.email.email2 ?? ""}
        />
      </div>

      <div className="container grid grid-cols-4 text-right p-2 items-center">
        <div className="relative">
          <label className="p-2" htmlFor="web">
            Web
          </label>
          <MapPinIcon className="pointer-events-none absolute right-20 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
        <input
          className="rounded-lg text-sm col-span-3"
          id="web"
          type="text"
          name="web"
          defaultValue={company.web ?? ""}
        />
      </div>
    </div>
  );
}
