import PageHead from "@/components/shared/page-head";
import { 
     Breadcrumb, 
     BreadcrumbItem, 
     BreadcrumbLink, 
     BreadcrumbList, 
     BreadcrumbPage, 
     BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Service from '../../../../public/service.png'
import DataTableReviewSerices from "./data-detail/table-list-review-services";

export default function DetailService() {
     return (
          <>
               <PageHead />
               <div className="max-h-screen flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8 mb-5">
                    <div className="flex items-center justify-between space-y-2">
                         <h3 className="text-3xl font-bold text-black">
                              <Breadcrumb >
                                   <BreadcrumbList>
                                        <BreadcrumbItem>
                                             <BreadcrumbLink className="text-[16px]" href="provider-manage/details">Manage Provider</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator className="text-[16px]" />
                                        <BreadcrumbItem>
                                             <BreadcrumbLink className="text-[16px]" aria-disabled={true}>Service Provider</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                             <BreadcrumbPage className="text-black text-[16px]">Detail Service</BreadcrumbPage>
                                        </BreadcrumbItem>
                                   </BreadcrumbList>
                              </Breadcrumb>

                         </h3>
                    </div>
                    <div className="flex flex-wrap text-black mt-10 mb-10">
                         <div className="md:w-1/3">
                              <img src={Service} alt="" className="md:w-[200px] sm:w-[100px]" />
                         </div>
                         <div className="md:w-2/3">
                              <div className="text-[24px] font-bold">Lay LVT: up to 20 m²</div>
                              <tr>
                                   <td className="md:w-[100px]">30 Offerings</td>
                                   <td className="">4.8 (20 Rating)</td>
                              </tr>
                              <div className="text-[#E31E24] text-[18px] font-bold">119€</div>
                              <div className="text-justify">
                              Transform your space with our professional
                               painting services! Whether you're looking 
                               to refresh a single room or give your entire 
                               home or office a new look, our team of skilled
                                painters is here to deliver top-quality results.
                                 We specialize in interior and exterior painting,
                                  using high-grade materials that ensure long-lasting 
                                  and beautiful finishes. With attention to detail and 
                                  a commitment to customer satisfaction, we guarantee a 
                                  smooth and stress-free experience from start to finish.
                              </div>
                         </div>
                    </div>
                    <div className="text-[16px] font-medium underline  text-black">Review</div>
                    <DataTableReviewSerices/>
               </div>
          </>
     )
}
