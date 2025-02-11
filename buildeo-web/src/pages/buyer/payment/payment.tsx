import NavbarSearch from '../../../Components/Ui/headerSearhc'
import Footer from '../../../Components/Ui/footer'
import { FileIcon } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../../../../public/logoOrange.png";
import media from '/Media.png'
import Swal from 'sweetalert2'
import { useCart } from '../../../utils/CartContext'
export default function PaymentPage() {
     const [selectedFile, setSelectedFile] = useState<File | null>(null);
     const { order } = useCart();
     const totalPrice = order.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );

     // Handle file selection  
     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const file = event.target.files?.[0];
          if (file) {
               setSelectedFile(file);
          }
     };

     // Handle drag-and-drop  
     const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
          event.preventDefault();
          const file = event.dataTransfer.files?.[0];
          if (file) {
               setSelectedFile(file);
          }
     };

     // Prevent default dropp
     const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
          event.preventDefault();
     };

     //
     const navigate = useNavigate();

     const toOrder = () => {
          Swal.fire({
               title: " Successful",
               text: "You have successfully orders services!",
               icon: "success",
               confirmButtonText: "OK",
          }).then(() => {
               navigate("/orders");
          });
     };
     return (
          <>
               <div className="">
                    <NavbarSearch text="black" color="black" logoOrange={logo} />
                    <div className="md:pl-[80px] md:pr-[80px] ml-4 mr-4">
                         <div className="">
                              <div className="text-[32px] font-bold md:mt-[70px]">Detail Payment</div>
                              {/* list cart  */}
                              <div className="flex justify-between mt-4">
                                   <div className="shadow p-6">
                                        <div className="shadow">
                                             {order.map((item) => (
                                                  <div className="">
                                                       <div key={item.id} className="border-b-[2px] p-6">
                                                            <div className="flex justify-between">
                                                                 <div className="flex items-center">
                                                                      <img src={item.img} alt={item.name} width={150} />
                                                                 </div>
                                                                 <div className="w-[500px] ml-6">
                                                                      <div className="text-[22px] font-bold">{item.name}</div>
                                                                      <div className="text-[#808080] text-[18px]">{item.company}</div>
                                                                      <div className="flex justify-between items-center mt-2">
                                                                           <div className="font-bold text-start text-[#E31E24] text-[22px]">
                                                                                {item.price}€
                                                                           </div>
                                                                           <div className="text-[#808080] text-[18px]">{item.quantity}X</div>
                                                                      </div>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                       <div className="flex justify-between p-6 text-[15px] border-b-[2px]">
                                                            <div className="text-[#E31E24]"><a href="/negotiable">Negotiation</a></div>
                                                            <div className="text-[#808080]">Filling out the form</div>
                                                       </div>
                                                  </div>

                                             ))}
                                        </div>
                                        <div className="shadow">
                                             <div className="flex justify-between border-b-[2px] p-6">
                                                  <div className="flex items-center ">
                                                       <img src={media} alt="" width={150} />
                                                  </div>
                                                  <div className="w-[500px] ml-6">
                                                       <div className="text-[22px] font-bold  ">Painter </div>
                                                       <div className="text-[#808080] text-[18px]"> Painter Company</div>
                                                       <div className="flex justify-between items-center mt-2">
                                                            <div className="font-bold text-start text-[#E31E24] text-[22px]">119€</div>
                                                            <div className="text-[#808080] text-[18px]">1X</div>
                                                       </div>
                                                  </div>
                                             </div>
                                             <div className="flex justify-between p-6 text-[15px] border-b-[2px]">
                                                  <div className="text-[#E31E24]"><a href="/negotiable">Negotiation</a></div>
                                                  <div className="text-[#ffffff] bg-[#4CAF50] rounded-[20px] text-[10px] p-2 w-[90px] text-center">Approve</div>
                                             </div>
                                        </div>
                                        <div className="shadow">
                                             <div className="flex justify-between border-b-[2px] p-6">
                                                  <div className="flex items-center ">
                                                       <img src={media} alt="" width={150} />
                                                  </div>
                                                  <div className="w-[500px] ml-6">
                                                       <div className="text-[22px] font-bold  ">Painter </div>
                                                       <div className="text-[#808080] text-[18px]"> Painter Company</div>
                                                       <div className="flex justify-between items-center mt-2">
                                                            <div className="font-bold text-start text-[#E31E24] text-[22px]">119€</div>
                                                            <div className="text-[#808080] text-[18px]">1X</div>
                                                       </div>
                                                  </div>
                                             </div>
                                             <div className="flex justify-between p-6 text-[15px] border-b-[2px]">
                                                  <div className="text-[#E31E24]"><a href="/negotiable">Negotiation</a></div>
                                                  <div className="text-[#ffffff] bg-[#FF854D] rounded-[20px] text-[10px] p-2 w-[100px] text-center">Pending approval</div>
                                             </div>
                                        </div>
                                   </div>
                                   <div className="">
                                        <div className="shadow md:w-[400px] p-[30px]">
                                             <div className="flex justify-between">
                                                  <div className="font-bold text-[22px]">Total Payment</div>
                                                  <div className="text-[22px] text-[#E31E24]">{totalPrice}€</div>
                                             </div>
                                             <hr />

                                             <div className="flex justify-between items-center mt-[20px]">
                                                  <div className="font-bold text-[20px]">Bank</div>
                                                  <div className="text-[#E31E24] text-[13px] font-medium">Estimates 29 : 59</div>
                                             </div>
                                             <div className="mt-2">Account Number</div>
                                             <div className="flex justify-between items-center mt-2">
                                                  <div className="text-[#E31E24] text-[18px]">DE 89 37040044 05320130</div>
                                                  <div className="text-[18px] text-[#28A745]"><a href=''> Copy </a></div>
                                             </div>
                                             <div className="text-[#105FCE] text-[13px] mt-2"><a href='/cart'> Changes Payment Method</a> </div>

                                        </div>
                                   </div>
                              </div>

                              <div className="">
                                   <div
                                        className="border border-dashed border-[#E31E24] rounded mt-4 w-full p-6 text-[18px] flex flex-col items-center justify-center"
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                   >
                                        <FileIcon color='#E31E24' height={58} width={68} />
                                        <div>Drag and Drop File here</div>
                                        <div>Or</div>
                                        <div>
                                             <input
                                                  type="file"
                                                  id="bukti"
                                                  className="hidden "
                                                  onChange={handleFileChange}
                                             />
                                             <label htmlFor="bukti">
                                                  <button className='bg-[#E31E24] pl-4 pr-4 p-2 text-white rounded-[45px]'>
                                                       Browse File
                                                  </button>
                                             </label>
                                        </div>
                                        <div>
                                             Formats: zip, jpg, png, pdf, or ms.word
                                        </div>

                                        {selectedFile && (
                                             <div className="mt-4 text-[#E31E24]">
                                                  Selected File: {selectedFile.name}
                                             </div>
                                        )}
                                   </div>
                              </div>
                              <div className=" flex flex-col items-end mt-4 justify-end">
                                   <div className="flex font-bold">
                                        <button className='bg-[#E31E24] text-white rounded-[40px] w-[150px] p-[7px] ml-10' onClick={toOrder}>Complete order</button>
                                   </div>
                              </div>

                         </div>
                    </div>
                    <Footer />
               </div>
          </>
     )
}
