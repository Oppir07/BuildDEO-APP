import NavbarSearch from '../../../Components/Ui/headerSearhc'
import Footer from '../../../Components/Ui/footer'
import { useNavigate } from 'react-router-dom'
import { Input } from '../../../Components/Ui/input'
import logo from "../../../../public/logoOrange.png";
import media from '/Media.png'
import Swal from 'sweetalert2';

export default function FormNegotiationPage() {

     const navigate = useNavigate();

     const toCheckout = (e: React.FormEvent) => {
          e.preventDefault();
          Swal.fire({
                    title: " Successful",
                    text: "You have successfully send negotiable!",
                    icon: "success",
                    confirmButtonText: "OK",
                  }).then(() => {
                     navigate("/checkout");
                  });
                };

     return (
          <>
               <div className="">
                    <NavbarSearch text="black" color="black" logoOrange={logo} />
                    <div className="md:pl-[80px] md:pr-[80px] ml-4 mr-4">
                         <div className="">
                              <div className="text-[32px] font-bold md:mt-[70px] text-center">Form Negotiable</div>
                              {/* product  */}
                              <div className=" mt-4">
                                   <div className="shadow p-6">
                                        <div className="flex ">
                                             <div className="w-1/3">
                                                  <img src={media} alt="" width={150} />
                                             </div>
                                             <div className="w-2/3 ml-6">
                                                  <div className="text-[22px] font-bold  ">LVT verlegen: 20 m²</div>
                                                  <div className="text-[#808080] text-[18px]"> Painter Company</div>
                                                  <div className="flex w-[100%] justify-between items-center mt-[40px]">
                                                       <div className="font-bold text-start text-[#E31E24] text-[22px]">119€</div>
                                                       <div className="text-[#808080] text-[18px]">1X</div>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </div>

                              {/* data peronal  */}
                              <form action="">
                                   <div className="shadow p-6 mt-[22px]">
                                        <div className="font-bold text-[32px] mb-[34px]">Personal Data</div>
                                        <div className="text-[20px] mt-[22px]">
                                             <div className="">Your Name</div>
                                             <Input placeholder='your full name' className='p-[30px] text-[20px] mt-[15px]' />
                                        </div>
                                        <div className="text-[20px] mt-[22px]">
                                             <div className="">No.Telp</div>
                                             <Input placeholder='+49 05745' className='p-[30px] text-[20px] mt-[15px]' />
                                        </div>
                                        <div className="text-[20px] mt-[22px]">
                                             <div className="">Email</div>
                                             <Input type='email' placeholder='info@buildeo.de' className='p-[30px] text-[20px] mt-[15px]' />
                                        </div>
                                        <div className="text-[20px] mt-[22px]">
                                             <div className="">Service Name</div>
                                             <Input placeholder='type the service you want to negotiate' className='p-[30px] text-[20px] mt-[15px]' />
                                        </div>
                                        <div className="text-[20px] mt-[22px]">
                                             <div className="">Seller</div>
                                             <Input placeholder='type the seller you are negotiating with' className='p-[30px] text-[20px] mt-[15px]' />
                                        </div>
                                        <div className="text-[20px] mt-[22px]">
                                             <div className="">Final price negotiation</div>
                                             <Input placeholder='example: 109€' type='number' className='p-[30px] text-[20px] mt-[15px]' />
                                        </div>
                                   </div>
                                   <div className=" flex flex-col items-end mt-[50px] justify-end">
                                        <div className="flex font-bold">
                                             <button className='bg-[#E31E24] text-white rounded-[10px] w-[150px] p-[7px] ml-10' onClick={toCheckout} >Submit</button>
                                        </div>
                                   </div>
                              </form>

                         </div>
                    </div>
                    <Footer />
               </div>
          </>
     )
}
