import NavbarSearch from '../../../Components/Ui/headerSearhc'
import PaymentMethod from '../../../Components/Ui/payment'
import Footer from '../../../Components/Ui/footer'
import { FileIcon } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '../../../Components/Ui/input'

export default function PaymentPage() {
     const [selectedFile, setSelectedFile] = useState<File | null>(null);

     // Handle file selection via browse button
     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const file = event.target.files?.[0];
          if (file) {
               setSelectedFile(file);
          }
     };

     // Handle drag-and-drop functionality
     const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
          event.preventDefault();
          const file = event.dataTransfer.files?.[0];
          if (file) {
               setSelectedFile(file);
          }
     };

     // Prevent default to allow dropping
     const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
          event.preventDefault();
     };

     //
     const [showAlert, setShowAlert] = useState(false);
     const navigate = useNavigate();

     const goConfirm = () => {
          setShowAlert(false);
          navigate("/payment-confirm");
     };

     const send = () => {
          setShowAlert(true);
     }
     return (
          <>
               <div className="">
                    <NavbarSearch text='balck' />
                    <div className="md:pl-[80px] md:pr-[80px] ml-4 mr-4">
                         <div className="">
                              <div className="text-[32px] font-bold md:mt-[70px]">Your Payment method</div>
                              <div className="text-[16px] text-[#9586A8]" >Choose yout  Payment method</div>
                              <div className="mt-10">
                                   <PaymentMethod />
                              </div>
                              <div className="">
                                   <div className="text-[32px] font-bold mt-[70px]">Offer Informastion</div>
                                   <div className="text-[16px] text-[#9586A8]" >Descript ypur project information to the provider</div>
                                   <div className="">
                                        <textarea placeholder='Short description of your project' name="" id="" rows={7} className='border border-[#E31E24] w-full p-2 rounded mt-2'>

                                        </textarea>
                                   </div>
                                   <div
                                        className="border border-dashed border-[#E31E24] rounded mt-4 w-full p-6 text-[18px] flex flex-col items-center justify-center"
                                        onDrop={handleDrop}  // Handle drop event
                                        onDragOver={handleDragOver} // Handle drag-over event
                                   >
                                        <FileIcon color='#E31E24' height={58} width={68} />
                                        <div>Drag and Drop File here</div>
                                        <div>Or</div>
                                        <div>
                                             <input
                                                  type="file"
                                                  id="fileInput"
                                                  className="hidden"  // Hidden input for file browsing
                                                  onChange={handleFileChange}
                                             />
                                             <label htmlFor="fileInput">
                                                  <button className='bg-[#E31E24] pl-4 pr-4 p-2 text-white rounded-[45px]'>
                                                       Browse File
                                                  </button>
                                             </label>
                                        </div>
                                        <div>
                                             Formats: zip, jpg, png, pdf, or ms.word
                                        </div>

                                        {/* Show the name of the selected file if it exists */}
                                        {selectedFile && (
                                             <div className="mt-4 text-[#E31E24]">
                                                  Selected File: {selectedFile.name}
                                             </div>
                                        )}
                                   </div>
                              </div>
                              <div className=" flex flex-col items-end mt-4 justify-end">
                                   <div className="flex font-bold">
                                        <button className='bg-[#FFFFFF] text-[#E31E24] border border-[#E31E24] rounded-[40px] w-[150px] p-[7px]'>Cancel</button>
                                        <button className='bg-[#E31E24] text-white rounded-[40px] w-[150px] p-[7px] ml-10' onClick={send}>Next</button>
                                   </div>
                              </div>

                         </div>
                    </div>


                    {showAlert && (
                         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                              <div className="flex flex-col items- bg-white p-6 rounded-lg w-[300px]">
                                   <div className="font-bold text-[24px]">Payment</div>
                                   <div className="">paying with credit card</div>
                                   <div className="mt-4 ">
                                        <div className="mt-2"><div className="text-[12px]">Price ammount</div><Input placeholder='Number' /></div>
                                        <div className="mt-2"><div className="text-[12px]">Account number</div><Input placeholder='Number' /></div>

                                        <button
                                             className="bg-[#E31E24] text-white w-full p-2 rounded-[15px] mt-2"
                                             onClick={goConfirm}
                                        >
                                             Place an order
                                        </button>
                                   </div>
                              </div>
                         </div>
                    )}
                    <Footer />
               </div>
          </>
     )
}
