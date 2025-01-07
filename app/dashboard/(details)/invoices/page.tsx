import Pagination from "@/app/ui/invoices/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/invoices/table";
import { CreateInvoice } from "@/app/ui/invoices/buttons";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchInvoicesPages } from "@/app/lib/data";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import PageTitle from "@/app/ui/page-title";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";

export const metadata: Metadata = {
  title: "Invoices",
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);
  return (
    <div className="w-full">
      <PageTitle title="Invoices list" />
      <Breadcrumbs
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          {
            label: "Invoices list",
            href: "/dashboard/invoices",
            active: true,
          },
        ]}
      />
      <div
        className="mt-4 flex items-center 
      justify-between gap-2 md:mt-8"
      >
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
