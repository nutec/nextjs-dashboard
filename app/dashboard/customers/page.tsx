import Pagination from "@/app/ui/invoices/pagination";
import CustomersTable from "@/app/ui/customers/table";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { fetchCustomersPages, fetchFilteredCustomers } from "@/app/lib/data";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customers | Acme Dashboard",
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
  const totalCustomers = await fetchFilteredCustomers(query, currentPage);
  const totalPages = await fetchCustomersPages();

  return (
    <div className="w-full">
      {
        <Suspense
          key={query + currentPage}
          fallback={<InvoicesTableSkeleton />}
        >
          <CustomersTable customers={totalCustomers} />
        </Suspense>
      }
      <div className="mt-5 flex w-full justify-center">
        {<Pagination totalPages={totalPages} />}
      </div>
    </div>
  );
}
