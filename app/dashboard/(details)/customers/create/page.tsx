import CreateCustomer from "@/app/ui/customers/create-customer";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import PageTitle from "@/app/ui/page-title";

export default async function Page() {
  return (
    <div className="w-full">
      <PageTitle title="Create Customer" />
      <Breadcrumbs
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          {
            label: "Customers list",
            href: "/dashboard/customers",
          },
          {
            label: "Create customer",
            href: "/dashboard/customers/create",
            active: true,
          },
        ]}
      />
      <CreateCustomer />
    </div>
  );
}
