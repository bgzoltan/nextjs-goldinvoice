import { FormattedCustomersTable } from "@/app/lib/definitions";
import Image from "next/image";

export default async function CustomersTable({
  customers,
}: {
  customers: FormattedCustomersTable[];
}) {
  return (
    <>
      <div className="min-w-full mt-2 mb-2 rounded-lg bg-gray-200">
        <div className="p-2">
          <table className="w-full text-gray-900 ">
            <thead className="text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-2 py-5 font-medium">
                  Image
                </th>
                <th scope="col" className="px-2 py-5 font-medium">
                  Name
                </th>
                <th scope="col" className="px-2 py-5 font-medium">
                  e-mail
                </th>
                <th scope="col" className="px-2 py-5 font-medium">
                  Total invoice
                </th>
                <th scope="col" className="px-2 py-5 font-medium">
                  Total paid
                </th>
                <th scope="col" className="px-2 py-5 font-medium">
                  Total pending
                </th>
              </tr>
            </thead>
            <tbody className="bg-white p-2">
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-gray-200 border-2 border-solid"
                >
                  <td className="p-2">
                    <Image
                      src={customer.image_url}
                      className="rounded-full"
                      width={28}
                      height={28}
                      alt={`${customer.name}'s profile picture`}
                    />
                  </td>
                  <td className="p-2">{customer.name}</td>
                  <td className="p-2">{customer.email}</td>
                  <td className="p-2">{customer.total_invoices}</td>
                  <td className="p-2">{customer.total_paid}</td>
                  <td className="p-2">{customer.total_pending}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
