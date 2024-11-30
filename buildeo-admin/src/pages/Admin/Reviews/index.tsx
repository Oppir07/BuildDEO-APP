import PageHead from "@/components/shared/page-head";
import DataTableReviews from "./table-list";



export default function ReviewsPage() {
     return (
          <>
               <PageHead title="Buildeo" />
               <div className=" flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">
                    <div className="flex items-center justify-between space-y-2">
                         <h2 className="text-3xl font-bold tracking-tight text-black">
                         Reviews
                         </h2>
                    </div>
               <DataTableReviews/>
               </div>
          </>
     )
}
