import PageHead from "@/components/shared/page-head";
import Profil from '../../../../public/profil.png'
import { Label } from "@radix-ui/react-label";
import { Switch } from "@/components/ui/switch";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataTableService from "./data-detail/table-list-service";
import DataTableOffer from "./data-detail/table-list-offer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
export default function DetailProvider() {
     return (
          <>
               <PageHead title="Buildeo" />
               <div className="max-h-screen flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">
                    <div className="flex items-center justify-between space-y-2">
                         <h2 className="text-3xl font-bold tracking-tight text-black">
                         <Breadcrumb >
                                   <BreadcrumbList>
                                        <BreadcrumbItem>
                                             <BreadcrumbLink className="text-[16px]" href="/provider-manage">Manage Provider</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator className="text-[16px]" />
                                        <BreadcrumbItem>
                                             <BreadcrumbPage className="text-black text-[16px]">Detail Provider</BreadcrumbPage>
                                        </BreadcrumbItem>
                                   </BreadcrumbList>
                              </Breadcrumb>

                         </h2>
                    </div>
                    <div className="flex flex-wrap bg-[#ffffff] text-black !mt-10">
                         <div className="w-1/4">
                              <img src={Profil} className="rounded-[75px]" alt="" />
                         </div>
                         <div className="">
                              <div className="font-bold text-black text-[16px]">Painter Company</div>
                              <table className="text-[#9586A8]">
                                   <tr>
                                        <td>Email</td>
                                        <td>&nbsp;: Data sample</td>
                                   </tr>
                                   <tr>
                                        <td>Phone Number</td>
                                        <td>&nbsp;: Data sample</td>
                                   </tr>
                                   <tr>
                                        <td>Type</td>
                                        <td>&nbsp;: Data sample</td>
                                   </tr>
                                   <tr>
                                        <td>City</td>
                                        <td>&nbsp;: Data sample</td>
                                   </tr>
                                   <tr>
                                        <td>Longtitude</td>
                                        <td>&nbsp;: Data sample</td>
                                   </tr>
                                   <tr>
                                        <td>Status</td>
                                        <td> <div className="flex items-center space-x-2">&nbsp;:&nbsp;
                                             <Switch id="airplane-mode" className="bg-[#2FB142]" />
                                             <Label htmlFor="airplane-mode" className="text-[12px] font-bold">Active</Label>
                                        </div></td>
                                   </tr>
                              </table>
                              <div className="mt-4">
                                   <button className="flex items-center justify-center text-center font-medium border rounded-[45px] w-full p-2 hover:bg-[#9586A8] hover:text-white hover:border-[#9586A8]">
                                    <MailOutlineIcon color={"black"} className="mr-2"/>Send Message
                                   </button>
                              </div>
                         </div>
                    </div>
                     {/* content tab  */}
                     <Tabs defaultValue="cs">
                              <TabsList>
                                   <TabsTrigger value="cs" className="p-2 font-medium  mr-2">Company Service</TabsTrigger>
                                   <TabsTrigger value="" disabled={true}>|</TabsTrigger>
                                   <TabsTrigger value="offer" className="p-2 font-medium mr-2">Offers</TabsTrigger>
                              </TabsList>
                              <hr className="w-[220px] mt-2"/>
                              <TabsContent value="cs">
                                   <DataTableService/>
                              </TabsContent>
                              <TabsContent value="offer">
                                   <DataTableOffer/>
                              </TabsContent>
                         </Tabs>
               </div>
          </>
     )
}
