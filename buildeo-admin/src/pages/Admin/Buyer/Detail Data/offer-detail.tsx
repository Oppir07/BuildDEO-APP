import PageHead from "@/components/shared/page-head";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Swal from 'sweetalert2';
import { Modal } from "@/components/ui/modal";
import { useState } from "react";
import EditOffer from "./Form/edit-offer";

export default function DetailOfferBuyer() {

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
          <PageHead title="Buildeo"/>
          <div className="max-h-screen flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">
                    <div className="flex items-center justify-between space-y-2">
                         <h2 className="text-3xl font-bold tracking-tight text-black">
                         <Breadcrumb >
                                   <BreadcrumbList>
                                        <BreadcrumbItem>
                                             <BreadcrumbLink className="text-[16px]" href="/sa-buyer/details/">Manage Offer</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator className="text-[16px]" />
                                        
                                        <BreadcrumbItem>
                                             <BreadcrumbPage className="text-black text-[16px]">Offer Detail</BreadcrumbPage>
                                        </BreadcrumbItem>
                                   </BreadcrumbList>
                              </Breadcrumb>
                         </h2>
                    </div>
                     
                    <div className="">
                         <h2 className="text-3xl font-bold tracking-tight text-black mb-1">Offers Detail</h2>
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
                    </div>
                    <div className="flex justify-end">
                         <div className="flex flex-wrap">
                         <div className=""><button onClick={showConfirmationModal} className="m-2 w-[200px] text-[#2C3E50] font-bold border border-[#2C3E50] p-2 rounded-[45px]">Delete Offer</button></div>
                         <div className=""><button  onClick={openModal} className="m-2 w-[200px] text-[#2C3E50] font-bold border border-[#2C3E50] p-2 rounded-[45px]">Edit Offer</button></div>
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
                         <EditOffer/>
                    </Modal>
                    
          </div>

     </>
  )
}
