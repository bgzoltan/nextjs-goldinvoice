import Search from "@/app/ui/search";
// import Table from "./table";
import { fetchFilteredCompanies, fetchTotalCompanies } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import PageTitle from "@/app/ui/page-title";
import { suse } from "@/app/ui/fonts";
import { Company, CompanyDTO } from "@/app/lib/definitions";
import Table from "@/app/ui/companies/table";
import Pagination from "@/app/ui/pagination";

export function mapCompaniesDtoToCompanies(
  companiesList: CompanyDTO[]
): Company[] {
  return companiesList.map((company) => {
    return {
      id: company.id,
      name: company.name,
      address: {
        country: company.country,
        state: {
          name: company.state_name,
          abbreviation: company.state_abreviation,
        },
        town: company.town,
        street: company.street,
        houseNo: company.house_no,
        flatNo: company.flat_no,
      },
      email: { email1: company.email1, email2: company.email2 },
      phone: { phone1: company.phone1, phone2: company.phone2 },
      web: company.web,
    };
  });
}

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
          {/* <CreateCustomer /> */}
        </div>

        <Table companies={companies} />
        <div className="flex flex-row justify-center w-full">
          <Pagination totalPages={totalCompanies} />
        </div>
      </div>
    </>
  );
}
