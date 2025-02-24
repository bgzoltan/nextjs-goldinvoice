import Search from "@/app/ui/search";
import Table from "../../../ui/customers/table";
import { fetchFilteredCustomers, fetchTotalCustomers } from "@/app/lib/data";
import Pagination from "@/app/ui/pagination";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import PageTitle from "@/app/ui/page-title";
import { suse } from "@/app/ui/fonts";
import { CreateCustomer } from "@/app/ui/customers/buttons";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? "";
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const totalCustomers = await fetchTotalCustomers(query);
  const customers = await fetchFilteredCustomers(query, page);

  return (
    <>
      <div className={`${suse.className} flex flex-col w-full`}>
        <PageTitle title="Customers list" />
        <Breadcrumbs
          breadcrumbs={[
            { label: "Dashboard", href: "/dashboard" },
            {
              label: "Customers list",
              href: "/dashboard/customers",
              active: true,
            },
          ]}
        />
        <div className="w-full flex justify-between">
          <Search placeholder="Enter a customer name..." />
          <CreateCustomer />
        </div>

        <Table customers={customers} />
        <div className="flex flex-row justify-center w-full">
          <Pagination totalPages={totalCustomers} />
        </div>
      </div>
    </>
  );
}
