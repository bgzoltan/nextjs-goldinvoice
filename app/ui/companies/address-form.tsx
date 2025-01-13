"use client";

import { Company } from "@/app/lib/definitions";
import {
  GlobeAltIcon,
  BuildingOffice2Icon,
  MapIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { suse } from "../fonts";

export default function AddressForm({ company }: { company: Company }) {
  return (
    <div
      className={`flex rounded-lg flex-col w-full gap-2 ${suse.className} bg-goldGreen`}
    >
      <div className="container grid grid-cols-4 text-right p-2 items-center">
        <div className="relative">
          <label className="p-2" htmlFor="country">
            Country
          </label>
          <GlobeAltIcon className="pointer-events-none absolute right-20 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
        <input
          className="rounded-lg text-sm col-span-3"
          id="country"
          type="text"
          name="country"
          defaultValue={company.address.country ?? ""}
        />
      </div>
      <div className="container grid grid-cols-4 text-right p-2 items-center">
        <div className="relative">
          <label className="p-2" htmlFor="stateName">
            State
          </label>
          <MapIcon className="pointer-events-none absolute right-20 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
        <input
          className="rounded-lg text-sm col-span-3"
          id="stateName"
          type="text"
          name="stateName"
          defaultValue={company.address.state.name ?? ""}
        />
      </div>
      <div className="container grid grid-cols-4 text-right p-2 items-center">
        <div className="relative">
          <label className="p-2" htmlFor="stateAbbreviation">
            State
          </label>
          <MapIcon className="pointer-events-none absolute right-20 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
        <input
          className="rounded-lg text-sm col-span-3"
          id="stateAbbreviation"
          type="text"
          name="stateAbbreviation"
          defaultValue={company.address.state.abbreviation ?? ""}
        />
      </div>
      <div className="container grid grid-cols-4 text-right p-2 items-center">
        <div className="relative">
          <label className="p-2" htmlFor="town">
            Town
          </label>
          <BuildingOffice2Icon className="pointer-events-none absolute right-20 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
        <input
          className="rounded-lg text-sm col-span-3"
          id="town"
          type="text"
          name="town"
          defaultValue={company.address.town ?? ""}
        />
      </div>

      <div className="container grid grid-cols-4 text-right p-2 items-center">
        <div className="relative">
          <label className="p-2" htmlFor="street">
            Street
          </label>
          <MapPinIcon className="pointer-events-none absolute right-20 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
        <input
          className="rounded-lg text-sm col-span-3"
          id="street"
          type="text"
          name="street"
          defaultValue={company.address.street ?? ""}
        />
      </div>
      <div className="flex w-full flex-row p-2">
        <div className="container grid grid-cols-2 text-right items-center">
          <div className="relative">
            <label className="p-2" htmlFor="houseNo">
              HouseNo
            </label>
            {/* <BuildingOfficeIcon className="pointer-events-none absolute right-20 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" /> */}
          </div>
          <input
            className="rounded-lg text-sm"
            id="houseNo"
            type="text"
            name="houseNo"
            defaultValue={company.address.houseNo ?? ""}
          />
        </div>
        <div className="container grid grid-cols-2 text-right items-center">
          <div className="relative">
            <label className="p-2" htmlFor="flatNo">
              Flat No.
            </label>
            {/* <BuildingOfficeIcon className="pointer-events-none absolute right-20 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" /> */}
          </div>
          <input
            className="rounded-lg text-sm"
            id="flatNo"
            type="text"
            name="flatNo"
            defaultValue={company.address.flatNo ?? ""}
          />
        </div>
      </div>
    </div>
  );
}
