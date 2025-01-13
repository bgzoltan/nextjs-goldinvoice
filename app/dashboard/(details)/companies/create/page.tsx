import CreateCompany from "@/app/ui/companies/create-company";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import PageTitle from "@/app/ui/page-title";

export default async function Page() {
  return (
    <div className="w-full">
      <PageTitle title="Create Company" />
      <Breadcrumbs
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          {
            label: "Companies list",
            href: "/dashboard/companies",
          },
          {
            label: "Create company",
            href: "/dashboard/companies/create",
            active: true,
          },
        ]}
      />
      <CreateCompany />
    </div>
  );
}
