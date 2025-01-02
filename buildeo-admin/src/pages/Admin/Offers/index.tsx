import PageHead from "@/components/shared/page-head";
import DataTableOffers from "./table-list";



export default function OffersPage() {
     return (
          <>
               <PageHead title="Buildeo" />
               <div className="max-h-screen flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">
                    <div className="flex items-center justify-between space-y-2">
                         <h2 className="text-3xl font-bold tracking-tight text-black">
                              Manage Provider
                         </h2>
                    </div>
                    <DataTableOffers/>
               </div>
          </>
     )
}
