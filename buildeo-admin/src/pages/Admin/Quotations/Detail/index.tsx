import PageHead from "@/components/shared/page-head";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Swal from 'sweetalert2';
import { Modal } from "@/components/ui/modal";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import FormEditQuotation from "./form-edit";

export default function DetailQuotations() {

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
                                             <BreadcrumbLink className="text-[16px]" href="/admin-manage-quotation">Manage Quotations</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator className="text-[16px]" />
                                        
                                        <BreadcrumbItem>
                                             <BreadcrumbPage className="text-black text-[16px]">Quotations Detail</BreadcrumbPage>
                                        </BreadcrumbItem>
                                   </BreadcrumbList>
                              </Breadcrumb>
                         </h2>
                    </div>
                     
                    <div className="">
                       <div className="flex text-black" >
                         <div className="">
                              <table className="w-[500px]">
                                   <tr>
                                        <td >Name</td>
                                        <td>Maria Angels</td>
                                   </tr>
                                   <tr>
                                        <td>Email</td>
                                        <td>maria@gmail.com</td>
                                   </tr>
                                   <tr>
                                        <td>Phone </td>
                                        <td>65627767262</td>
                                   </tr>
                                   <tr>
                                        <td>Address</td>
                                        <td>Jln. no 5 Santiago</td>
                                   </tr>
                                   <tr>
                                        <td>Email</td>
                                        <td>olivia@gmail.com</td>
                                   </tr>
                              </table>
                         </div>
                         <div className="">
                              <table className="w-[500px]">
                                   <tr>
                                        <td >Status</td>
                                        <td>On Process</td>
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
                         <p className="font-medium">Document Url :</p>
                         <Input value={'https://EgZjaHJvbWUyBggAEEUYOdIBCDc1ODlqMGoxqAIAsAIA&sourceid'} style={{color:'#02ADFD'}} readOnly/>
                         <p className="mt-5 font-medium">Admin Notes :  </p>
                         <div className="p-4 rounded border">
                              <p>Seeking Painter around Munchen:</p>
                              <p>Result:</p>
                              <ul>
                                   <li>Painter Company</li>
                                   <li>Good Painter</li>
                              </ul>
                         </div>
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
                    className="w-[15cm] text-black"
                    
                    >
                         <FormEditQuotation/>
                    </Modal>
                    
          </div>

     </>
  )
}
