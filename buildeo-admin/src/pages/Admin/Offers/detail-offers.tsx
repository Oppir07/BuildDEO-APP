import PageHead from "@/components/shared/page-head";
import Profil from '../../../../public/profil.png'
import { Label } from "@radix-ui/react-label";
import { Switch } from "@/components/ui/switch";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Modal } from "@/components/ui/modal";
import EditOffer from "../Buyer/Detail Data/Form/edit-offer";
import { useState } from "react";
import Swal from "sweetalert2";

export default function DetailOffers() {

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
                                             <BreadcrumbLink className="text-[16px]" href="/admin-manage-buyer">Manage Offers</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator className="text-[16px]" />
                                        <BreadcrumbItem>
                                             <BreadcrumbPage className="text-black text-[16px]">Detail Offers</BreadcrumbPage>
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
                                        <MailOutlineIcon color={"black"} className="mr-2" />Send Message
                                   </button>
                              </div>
                         </div>
                    </div>
                    <div className="flex text-black" >
                         <div className="">
                              <table className="w-[500px]">
                                   <tr>
                                        <td >ID</td>
                                        <td>1</td>
                                   </tr>
                                   <tr>
                                        <td>Request ID</td>
                                        <td>1</td>
                                   </tr>
                                   <tr>
                                        <td>User ID</td>
                                        <td>1</td>
                                   </tr>
                                   <tr>
                                        <td>Name</td>
                                        <td>Olivia</td>
                                   </tr>
                                   <tr>
                                        <td>Email</td>
                                        <td>olivia@gmail.com</td>
                                   </tr>
                                   <tr>
                                        <td>Seller ID</td>
                                        <td>1</td>
                                   </tr>
                                   <tr>
                                        <td>Service ID</td>
                                        <td>Completed</td>
                                   </tr>
                                   <tr>
                                        <td>Service Name</td>
                                        <td>1</td>
                                   </tr>
                              </table>
                         </div>
                         <div className="">
                              <table className="w-[500px]">
                                   <tr>
                                        <td >Price</td>
                                        <td>$245</td>
                                   </tr>
                                   <tr>
                                        <td >Payment Method</td>
                                        <td>Credit Card</td>
                                   </tr>
                                   <tr>
                                        <td >Status</td>
                                        <td>Completed</td>
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
                    <div className="text-black border p-5 rounded">
                         <b>Description :</b> <br />
                         Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                         Ut vitae, quisquam repudiandae minima quasi laborum, ab omnis est iste,
                         alias facilis provident! Excepturi delectus sequi explicabo velit nisi
                         natus quia ab asperiores expedita obcaecati saepe deserunt cum nihil
                         repellat repudiandae vel, neque perspiciatis unde tenetur commodi
                         voluptates accusamus tempora dolore? Ab natus dolorum enim ea nulla
                         autem quaerat laboriosam tempore veritatis, fuga nisi perspiciatis,
                         ex molestias possimus accusantium dolores. Consequuntur pariatur
                         exercitationem placeat. Natus perspiciatis expedita eligendi harum
                         iusto, voluptatibus facere commodi soluta ab impedit sapiente facilis
                         labore debitis. Corporis sequi eius harum itaque autem deserunt dolore quae debitis saepe!
                    </div>
                    <div className="flex justify-end">
                         <div className="flex flex-wrap">
                              <div className=""><button onClick={showConfirmationModal} className="m-2 w-[200px] text-[#2C3E50] font-bold border border-[#2C3E50] p-2 rounded-[45px]">Delete Offer</button></div>
                              <div className=""><button onClick={openModal} className="m-2 w-[200px] text-[#2C3E50] font-bold border border-[#2C3E50] p-2 rounded-[45px]">Edit Offer</button></div>
                              <div className=""><button className="m-2 w-[200px] font-bold bg-[#2C3E50] text-white p-2 rounded-[45px]">Back</button></div>
                         </div>
                    </div>
                    <Modal
                         title="Edit Offer"
                         description="Please fill out the form below."
                         isOpen={isModalOpen}
                         onClose={closeModal}
                         className="w-[9000px] text-black"
                    >
                         <EditOffer />
                    </Modal>
               </div>
          </>
     )
}
