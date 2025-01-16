"use client";

import { Company, State } from "@/app/lib/definitions";
import {
  GlobeAltIcon,
  BuildingOffice2Icon,
  MapIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { suse } from "../fonts";
import { ChangeEvent, useState } from "react";
import { countries, states } from "@/app/seed/company-data";

export default function AddressForm({ company }: { company: Company }) {
  const [countryCode, setCountryCode] = useState(
    company.id ? company.address.country.code : ""
  );
  const [stateCode, setStateCode] = useState(
    company.id ? company.address.state.code : ""
  );

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement>,
    name: string,
    list: { name: string; code: string }[]
  ) => {
    const selectedItem = list.reduce<State | null>((acc, item) => {
      if (item.name == e.target.value) {
        return item;
      }
      return acc;
    }, null);
    if (name == "states") {
      setStateCode(selectedItem?.code ?? "");
    } else if ((name = "countries")) {
      setCountryCode(selectedItem?.code ?? "");
    }
  };

  return (
    <div
      className={`flex rounded-lg flex-col w-full gap-2 ${suse.className} bg-goldGreen`}
    >
      <div className="container grid grid-cols-8 text-right p-2 items-center">
        <div className="container grid grid-cols-6 col-span-6">
          <div className="flex flex-row justify-end col-span-2 relative">
            <label className="p-2" htmlFor="country">
              Country
            </label>
            <GlobeAltIcon className="pointer-events-none absolute right-20 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <select
            id="countryName"
            name="countryName"
            className="autofocus rounded-lg text-sm col-span-4 focus-outline-none focus:bg-goldOrangeLight"
            onChange={(e) => handleChange(e, "countries", countries)}
            defaultValue={company.address.country.name ?? ""}
          >
            {countries.map((country) => (
              <option key={country.code} value={country.name}>
                {country.name ?? ""}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 col-span-2">
          <div className="flex items-center relative col-span-1 justify-end">
            <label className="p-2" htmlFor="stateCode">
              Code
            </label>
          </div>
          <input
            className="rounded-lg text-sm col-span-1"
            id="countryCode"
            type="text"
            name="countryCode"
            readOnly
            value={countryCode ?? ""}
          />
        </div>
      </div>
      <div className="container grid grid-cols-8 text-right p-2 items-center">
        <div className="container grid grid-cols-6 col-span-6">
          <div className="flex flex-row justify-end col-span-2 relative">
            <label className="p-2" htmlFor="stateName">
              State
            </label>
            <MapIcon className="pointer-events-none absolute right-20 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <select
            className="rounded-lg text-sm flex flex-row justify-end col-span-4"
            id="stateName"
            name="stateName"
            defaultValue={company.address.state.name ?? ""}
            onChange={(e) => handleChange(e, "states", states)}
          >
            {states
              .filter((state) => state.countryCode == countryCode)
              .map((state) => (
                <option key={state.code} value={state.name}>
                  {state.name}
                </option>
              ))}
          </select>
        </div>
        <div className="grid grid-cols-2 col-span-2">
          <div className="flex items-center relative col-span-1 justify-end">
            <label className="p-2" htmlFor="stateCode">
              Code
            </label>
          </div>
          <input
            className="rounded-lg text-sm col-span-1"
            id="stateCode"
            type="text"
            name="stateCode"
            readOnly
            value={stateCode}
          />
        </div>
      </div>
      <div className="container grid grid-cols-8 text-right p-2 items-center">
        <div className="container grid grid-cols-6 col-span-6">
          <div className="flex flex-row justify-end col-span-2 relative">
            <label className="p-2" htmlFor="town">
              Town
            </label>
            <BuildingOffice2Icon className="pointer-events-none absolute right-20 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <input
            className="rounded-lg text-sm flex flex-row justify-end col-span-4"
            id="town"
            type="text"
            name="town"
            defaultValue={company.address.town ?? ""}
          />
        </div>
        <div className="grid grid-cols-2 col-span-2">
          <div className="flex items-center relative col-span-1 justify-end">
            <label className="p-2" htmlFor="postCode">
              Postcode
            </label>
          </div>
          <input
            className="rounded-lg text-sm col-span-1"
            id="postCode"
            type="text"
            name="postCode"
            defaultValue={company.address.postCode ?? ""}
          />
        </div>
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
              House No.
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
              Floor/Unit No.
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
