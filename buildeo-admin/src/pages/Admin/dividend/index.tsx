import PageHead from "@/components/shared/page-head";
import DataTableDividend from "./table-list";

export default function DividendPage() {
  return (
     <>
          <PageHead title="Buildeo" />
               <div className=" flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">
                    <div className="flex items-center justify-between space-y-2">
                         <h2 className="text-3xl font-bold tracking-tight text-black">
                         Dividend
                         </h2>
                    </div>
                    <DataTableDividend/>
               </div>
     </>
  )
}
