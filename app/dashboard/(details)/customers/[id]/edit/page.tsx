import { fetchCustomerById } from "@/app/lib/data";
import EditCustomerForm from "@/app/ui/customers/edit-customer";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import PageTitle from "@/app/ui/page-title";

import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const customer = await fetchCustomerById(id);

  if (!customer) {
    notFound();
  }
  return (
    <div className="w-full relative">
      <PageTitle title="Edit Customer" />
      <Breadcrumbs
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          {
            label: "Customers list",
            href: "/dashboard/customers",
          },
          {
            label: "Edit customer",
            href: "/dashboard/customers/edit",
            active: true,
          },
        ]}
      />
      <EditCustomerForm id={id} customer={customer} />
    </div>
  );
}
