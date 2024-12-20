import { FormattedCustomersTable } from "@/app/lib/definitions";
import { TableItems } from "./tableItems";

export default function CustomersTable({
  customers,
}: {
  customers: FormattedCustomersTable[];
}) {
  return (
    <>
      <div className="w-full relative text-sm mt-2 mb-2 rounded-lg bg-gray-200">
        <div className="p-2">
          <table className="w-full text-gray-900 ">
            <thead className="text-left font-normal">
              <tr>
                <th scope="col" className="px-2 py-4 ">
                  Image
                </th>
                <th scope="col" className="px-2 py-4 ">
                  Name
                </th>
                <th scope="col" className="px-2 py-4 ">
                  e-mail
                </th>
                <th scope="col" className="px-2 py-4 ">
                  Total invoice
                </th>
                <th scope="col" className="px-2 py-4 ">
                  Total paid
                </th>
                <th scope="col" className="px-2 py-4 ">
                  Total pending
                </th>
              </tr>
            </thead>
            <tbody className="bg-white relative">
              {customers.map((customer) => (
                <TableItems customer={customer} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
