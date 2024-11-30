import PageHead from "@/components/shared/page-head";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Profil from '../../../../public/tr.png'
import { Link } from "react-router-dom";
import DataTableReviews from "./table-list";
import Swal from 'sweetalert2';

export default function DetailReviews() {
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
  return (
     <>
          <PageHead title="Buildeo"/>
          <div className="max-h-screen flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">
                    <div className="flex items-center justify-between space-y-2">
                         <h2 className="text-3xl font-bold tracking-tight text-black">
                         <Breadcrumb >
                                   <BreadcrumbList>
                                        <BreadcrumbItem>
                                             <BreadcrumbLink className="text-[16px]" href="/admin-manage-reviews">Manage Reviews</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator className="text-[16px]" />
                                        
                                        <BreadcrumbItem>
                                             <BreadcrumbPage className="text-black text-[16px]">Reviews Detail</BreadcrumbPage>
                                        </BreadcrumbItem>
                                   </BreadcrumbList>
                              </Breadcrumb>
                              <br />
                              Service Information
                         </h2>
                    </div>
                    <div className="flex text-black">
                         <div className="w-1/3">
                         <img src={Profil} className="" alt="" />
                         </div>
                         <div className="w-2/3">
                              <div className="text-[24px] font-bold">Lay LVT: up to 20 m²</div>
                              <div className="flex text-[12px] justify-between w-[200px]"><div className="">30 Offerings</div><div className="">4.8 (20 Rating)</div></div>
                              <div className="font-bold text-[24px] text-[#E31E24]">119€</div>
                              <div className="text-[16px] text-justify">Transform your space with our professional painting services! Whether you're looking to refresh a single room or give your entire home or office a new look, our team of skilled painters is here to deliver top-quality results. We specialize in interior and exterior painting, using high-grade materials that ensure long-lasting and beautiful finishes. With attention to detail and
                                    a commitment to customer satisfaction, we guarantee a smooth and stress-free experience from start to finish.</div>
                         </div>
                    </div>
                    <div className="text-black">
                         <div className="flex items-center">
                              <div className="text-[16px] font-bold">Maria Francisca</div> &nbsp;-&nbsp; <div className="">Jan 1 2024</div>
                         </div>
                         <div className="underline"><Link to={''}>mariafrancisca@gmail.com</Link></div>
                         <div className="text-justify">
                         So lovely paint! I couldn't be happier with the results. The painters were professional, punctual, and meticulous in their work. They transformed my living room with vibrant colors, making it feel fresh and inviting. The attention to detail was impressive, and they ensured everything was cleaned up afterward. I highly recommend their services to anyone looking for a top-quality painting job. The entire experience was smooth and stress-free. Five stars all the way!
                         </div>

                    </div>
                    <div className="flex justify-end">
                         <div className="flex flex-wrap">
                              <div className=""><button onClick={showConfirmationModal} className="m-2 w-[200px] text-[#2C3E50] font-bold border border-[#2C3E50] p-2 rounded-[45px]">Delete Review</button></div>
                              <div className=""><button className="m-2 w-[200px] font-bold bg-[#2C3E50] text-white p-2 rounded-[45px]">Back</button></div>
                         </div>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-black">
                         See Another Reviews
                    </h2>
               <DataTableReviews/>
                    
          </div>

     </>
  )
}
