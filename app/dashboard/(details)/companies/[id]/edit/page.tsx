import { fetchCompanyById } from "@/app/lib/data";
import { Company, CompanyDTO } from "@/app/lib/definitions";
import EditCompany from "@/app/ui/companies/edit-company";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import PageTitle from "@/app/ui/page-title";
import { notFound } from "next/navigation";

function mapCompanyDtoToCompany(company: CompanyDTO): Company {
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
      postCode: company.post_code,
      street: company.street,
      houseNo: company.house_no,
      flatNo: company.flat_no,
    },
    email: { email1: company.email1, email2: company.email2 },
    phone: { phone1: company.phone1, phone2: company.phone2 },
    web: company.web,
  };
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const companyDto = await fetchCompanyById(id);

  if (!companyDto) {
    notFound();
  }

  const company = mapCompanyDtoToCompany(companyDto);

  return (
    <div className="w-full relative">
      <PageTitle title="Edit Company" />
      <Breadcrumbs
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          {
            label: "Companies list",
            href: "/dashboard/companies",
            active: false,
          },
          {
            label: "Company edit",
            href: "",
            active: true,
          },
        ]}
      ></Breadcrumbs>
      <EditCompany company={company} />
    </div>
  );
}
