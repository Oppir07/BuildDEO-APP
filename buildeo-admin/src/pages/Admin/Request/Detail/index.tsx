import PageHead from "@/components/shared/page-head";
import Profil from '../../../../../public/profil.png'
import { Label } from "@radix-ui/react-label";
import { Switch } from "@/components/ui/switch";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";
import { useState } from "react";
import EditRequest from "./form-edit";


export default function DetailRequest() {
     const showConfirmationModal = async () => {
          const result = await Swal.fire({
               title: 'Are you sure?',
               text: "You won't be able to revert this!",
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Yes, delete it!'
          });

          if (result.isConfirmed) {
               Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
               );
               // Lakukan aksi yang diinginkan, seperti memanggil API delete
          }
     };
     const [isModalOpen, setModalOpen] = useState(false);

     // Fungsi untuk membuka modal
     const openModal = () => {
          setModalOpen(true);
     };

     // Fungsi untuk menutup modal
     const closeModal = () => {
          setModalOpen(false);
     };
     return (
          <>
               <PageHead title="Buildeo" />
               <div className="max-h-screen flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">
                    <div className="flex items-center justify-between space-y-2">
                         <h2 className="text-3xl font-bold tracking-tight text-black">
                              <Breadcrumb >
                                   <BreadcrumbList>
                                        <BreadcrumbItem>
                                             <BreadcrumbLink className="text-[16px]" href="/admin-manage-buyer">Manage Request</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator className="text-[16px]" />
                                        <BreadcrumbItem>
                                             <BreadcrumbPage className="text-black text-[16px]">Detail Request</BreadcrumbPage>
                                        </BreadcrumbItem>
                                   </BreadcrumbList>
                              </Breadcrumb>

                         </h2>
                    </div>
                    <div className="flex flex-wrap bg-[#ffffff] text-black !mt-10">
                         <div className="w-1/4">
                              <img src={Profil} className="rounded-[10px]" alt="" />
                         </div>
                         <div className="">
                              <div className="font-bold text-black text-[16px]">Buyer Personal Data</div>
                              <table className="text-[#9586A8]">
                                   <tr>
                                        <td>Name</td>
                                        <td>&nbsp;: Maria Separatie</td>
                                   </tr>
                                   <tr>
                                        <td>Email</td>
                                        <td>&nbsp;: separatie@gmail.com</td>
                                   </tr>
                                   {/* <tr>
                                        <td>Phone Number</td>
                                        <td>&nbsp;: Data sample</td>
                                   </tr> */}
                                   {/* <tr>
                                        <td>Type</td>
                                        <td>&nbsp;: Data sample</td>
                                   </tr> */}
                                   <tr>
                                        <td>City</td>
                                        <td>&nbsp;: Data sample</td>
                                   </tr>
                                   {/* <tr>
                                        <td>Longtitude</td>
                                        <td>&nbsp;: Data sample</td>
                                   </tr> */}
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
                                        <MailOutlineIcon color={"black"} className="mr-2" />Send Message
                                   </button>
                              </div>
                         </div>
                    </div>
                    <div className="grid grid-cols-4 gap-0 text-black mt-4" >
                         <div className=" ">
                              <table className="w-[200px]">
                                   <tr>
                                        <td >ID</td>
                                        <td>1</td>
                                   </tr>
                                   <tr>
                                        <td>Costumer ID</td>
                                        <td>2</td>
                                   </tr>
                                   <tr>
                                        <td>Category ID </td>
                                        <td>2</td>
                                   </tr>

                              </table>
                         </div>
                         <div className="">
                              <table className="w-[400px]">
                                   <tr>
                                        <td >Status</td>
                                        <td>Open</td>
                                   </tr>
                                   <tr>
                                        <td >Created At</td>
                                        <td>10/10/2024</td>
                                   </tr>
                                   <tr>
                                        <td>Created By</td>
                                        <td>Maria Francisca</td>
                                   </tr>
                                   <tr>
                                        <td>Updated At</td>
                                        <td>-</td>
                                   </tr>
                                   <tr>
                                        <td>Updated By</td>
                                        <td>-</td>
                                   </tr>
                              </table>
                         </div>

                    </div>
                    <div className="text-black border p-5 rounded mt-5">
                         <p className="font-medium">Title:</p>
                         <Input value={'https://EgZjaHJvbWUyBggAEEUYOdIBCDc1ODlqMGoxqAIAsAIA&sourceid'} style={{ color: '#000000' }} readOnly />
                         <p className="mt-5 font-medium">Description :  </p>
                         <div className="p-4 rounded border">
                              <p>I am looking for a professional painter to handle an interior and/or exterior painting project for my home. The details are as follows:</p>
                              <ul>
                                   <li>Painting [specific areas, e.g., entire house exterior, living room, bedrooms, etc.]</li>
                                   <li>Good Painter</li>
                              </ul>
                         </div>
                         <p className="font-medium">Budget:</p>
                         <Input value={'$456'} style={{ color: '#000406' }} readOnly />
                         <p className="font-medium">Dedline:</p>
                         <Input value={'12/03/2025'} style={{ color: '#000000' }} readOnly />
                    </div>
                    <div className="flex justify-end">
                         <div className="flex flex-wrap">
                              <div className=""><button onClick={showConfirmationModal} className="m-2 w-[200px] text-[#2C3E50] font-bold border border-[#2C3E50] p-2 rounded-[45px]">Delete Offer</button></div>
                              <div className=""><button onClick={openModal} className="m-2 w-[200px] text-[#2C3E50] font-bold border border-[#2C3E50] p-2 rounded-[45px]">Edit Offer</button></div>
                              <div className=""><button className="m-2 w-[200px] font-bold bg-[#2C3E50] text-white p-2 rounded-[45px]">Back</button></div>
                         </div>
                    </div>
               </div>

               <Modal
                    title="Edit Request"
                    description="Please fill out the form below."
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    className="w-[15cm] text-black"
               >
                    <EditRequest />
               </Modal>
          </>
     )
}
