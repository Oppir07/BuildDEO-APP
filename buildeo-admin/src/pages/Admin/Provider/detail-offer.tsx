import PageHead from "@/components/shared/page-head";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function DetailOffer() {
  return (
     <>
          <PageHead title="Buildeo"/>
          <div className="max-h-screen flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8 mb-5">
                    <div className="flex items-center justify-between space-y-2">
                         <h3 className="text-3xl font-bold text-black">
                              <Breadcrumb >
                                   <BreadcrumbList>
                                        <BreadcrumbItem>
                                             <BreadcrumbLink className="text-[16px]" href="/provider-manage/details">Manage Provider</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator className="text-[16px]" />
                                        <BreadcrumbItem>
                                             <BreadcrumbLink className="text-[16px]" aria-disabled={true}>Offer Provider</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                             <BreadcrumbPage className="text-black text-[16px]">Detail Offer</BreadcrumbPage>
                                        </BreadcrumbItem>
                                   </BreadcrumbList>
                              </Breadcrumb>

                         </h3>
                    </div>
                    <div className="text-white">
                         <div className="md:w-7/12 bg-[#608BC1] p-2 rounded">
                              <table className="w-full">
                                   <tr>
                                        <td className="font-medium">Name</td>
                                        <td>:</td>
                                        <td className="font-bold">Edward Tua</td>
                                   </tr>
                                   <tr>
                                        <td className="font-medium">Email</td>
                                        <td>:</td>
                                        <td>example@.com</td>
                                   </tr>
                                   <tr>
                                        <td className="font-medium">Service Name</td>
                                        <td>:</td>
                                        <td>Lay LVT: up to 20 m²</td>
                                   </tr>
                                   <tr>
                                        <td className="font-medium">Providers Taker</td>
                                        <td>:</td>
                                        <td>House Care Company</td>
                                   </tr>
                                   <tr>
                                        <td className="font-medium">Price</td>
                                        <td>:</td>
                                        <td className="font-bold">$90</td>
                                   </tr>
                                   <tr>
                                        <td className="font-medium">Payment Methode</td>
                                        <td>:</td>
                                        <td>Credit Card</td>
                                   </tr>
                                   <tr>
                                        <td className="font-medium">Status</td>
                                        <td>:</td>
                                        <td>Complete <b>at</b> <i>02 November 2024</i></td>
                                   </tr>
                              </table>
                         </div>
                         <div className="mt-4 text-black">
                              <div className="text-[18px] font-medium text-black ">Description</div>
                              <div className="">
                                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, perspiciatis!
                              </div>
                         </div>
                    </div>
               </div>

     </>
  )
}
