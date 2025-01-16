import Search from "@/app/ui/search";
import { fetchFilteredCompanies, fetchTotalCompanies } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import PageTitle from "@/app/ui/page-title";
import { suse } from "@/app/ui/fonts";
import Table from "@/app/ui/companies/table";
import Pagination from "@/app/ui/pagination";
import { CreateCompany } from "@/app/ui/companies/buttons";
import { mapCompaniesDtoToCompanies } from "@/app/lib/utils";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? "";
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const totalCompanies = await fetchTotalCompanies(query);
  const companies = mapCompaniesDtoToCompanies(
    await fetchFilteredCompanies(query, page)
  );

  return (
    <>
      <div className={`${suse.className} flex flex-col w-full`}>
        <PageTitle title="Companies list" />
        <Breadcrumbs
          breadcrumbs={[
            { label: "Dashboard", href: "/dashboard" },
            {
              label: "Companies list",
              href: "/dashboard/companies",
              active: true,
            },
          ]}
        />
        <div className="w-full flex justify-between">
          <Search placeholder="Enter a company name..." />
          <CreateCompany />
        </div>

        <Table companies={companies} />
        <div className="flex flex-row justify-center w-full">
          <Pagination totalPages={totalCompanies} />
        </div>
      </div>
    </>
  );
}
