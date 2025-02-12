import PageHead from "@/components/shared/page-head";
import Profil from '../../../../public/profil.png';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import DataTableOrder from "./Data/order-list";
import DataTableOffer from "./Data/offer-list";

export default function DetailBuyer() {
     return (
          <>
               <PageHead title="Buildeo" />
               <div className="max-h-screen flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">
                    <div className="flex items-center justify-between space-y-2">
                         <h2 className="text-3xl font-bold tracking-tight text-black">
                         <Breadcrumb >
                                   <BreadcrumbList>
                                        <BreadcrumbItem>
                                             <BreadcrumbLink className="text-[16px]" href="/provider-manage">Manage Buyer</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator className="text-[16px]" />
                                        <BreadcrumbItem>
                                             <BreadcrumbPage className="text-black text-[16px]">Detail Buyer</BreadcrumbPage>
                                        </BreadcrumbItem>
                                   </BreadcrumbList>
                              </Breadcrumb>

                         </h2>
                    </div>
                    <div className="flex flex-wrap bg-[#ffffff] text-black !mt-10">
                         <div className="w-1/6">
                              <img src={Profil} className="rounded-[10px]" alt="" />
                         </div>
                         <div className="">
                              <table className="text-black">
                                   <tr>
                                        <td>Name</td>
                                        <td>&nbsp;Edward Tua Panjaitan</td>
                                   </tr>
                                   <tr>
                                        <td>Email</td>
                                        <td>&nbsp;edu@gmail.com</td>
                                   </tr>
                                   <tr>
                                        <td>No.telp</td>
                                        <td>&nbsp;+49 05745 09056</td>
                                   </tr>
                                   <tr>
                                        <td>Post Name</td>
                                        <td>&nbsp;22411</td>
                                   </tr>
                                   <tr>
                                        <td>Street</td>
                                        <td>&nbsp;No 15 uti street off ovie palace road effurun delta state</td>
                                   </tr>
                              </table>
                         </div>
                    </div>
                     {/* content tab  */}
                     <Tabs defaultValue="cs">
                              <TabsList>
                                   <TabsTrigger value="cs" className="p-2 font-medium  mr-2">Company Service</TabsTrigger>
                                   <TabsTrigger value="" disabled={true}>|</TabsTrigger>
                                   <TabsTrigger value="offer" className="p-2 font-medium mr-2">Offers</TabsTrigger>
                              </TabsList>
                              <TabsContent value="cs">
                                   <DataTableOrder/>
                              </TabsContent>
                              <TabsContent value="offer">
                                   <DataTableOffer/>
                              </TabsContent>
                         </Tabs>
               </div>
          </>
     )
}
