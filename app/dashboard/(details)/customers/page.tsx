import Search from "@/app/ui/search";
import Table from "./table";
import { fetchFilteredCustomers, fetchTotalCustomers } from "@/app/lib/data";
import Pagination from "@/app/ui/invoices/pagination";

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
      <div className="flex flex-col w-full">
        <h1>Customer Page</h1>
        <div className="w-full">
          <Search placeholder="Enter a customer name..." />
        </div>
        <Table customers={customers} />
        <div className="flex flex-row justify-center w-full">
          <Pagination totalPages={totalCustomers} />
        </div>
      </div>
    </>
  );
}
