import { Company } from "@/app/lib/definitions";
import { TableItems } from "./tableItems";

export default function CompaniesTable({
  companies,
}: {
  companies: Company[];
}) {
  return (
    <>
      <div className="w-full relative text-sm mt-2 mb-2 rounded-lg bg-gray-200">
        <div className="p-2">
          <table className="w-full text-gray-900 ">
            <thead className="text-left font-normal">
              <tr>
                <th scope="col" className="px-2 py-4 ">
                  Name
                </th>
                <th scope="col" className="px-2 py-4 ">
                  Country
                </th>
                <th scope="col" className="px-2 py-4 ">
                  State/County
                </th>
                <th scope="col" className="px-2 py-4 ">
                  Town
                </th>
                <th scope="col" className="px-2 py-4 ">
                  Street
                </th>
                <th scope="col" className="px-2 py-4 ">
                  House No.
                </th>
                <th scope="col" className="px-2 py-4 ">
                  Flat No.
                </th>
                <th scope="col" className="px-2 py-4 ">
                  WEB
                </th>
                <th scope="col" className="px-2 py-4 ">
                  Phone 1
                </th>
                <th scope="col" className="px-2 py-4 ">
                  Email 1
                </th>
              </tr>
            </thead>
            <tbody className="bg-white relative">
              {companies.map((company) => (
                <TableItems company={company} key={company.id} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
