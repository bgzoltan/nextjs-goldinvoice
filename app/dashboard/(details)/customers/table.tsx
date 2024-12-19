import { FormattedCustomersTable } from "@/app/lib/definitions";
import { DeleteCustomer, UpdateCustomer } from "@/app/ui/customers/buttons";
import Image from "next/image";

export default async function CustomersTable({
  customers,
}: {
  customers: FormattedCustomersTable[];
}) {
  return (
    <>
      <div className="w-full text-sm mt-2 mb-2 rounded-lg bg-gray-200">
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
            <tbody className="bg-white">
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-gray-200 border-1 border-solid"
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
                  <td className="p-2">
                    <div className="flex justify-end gap-2">
                      <UpdateCustomer id={customer.id} />
                      <DeleteCustomer id={customer.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
