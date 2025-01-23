import { useState } from "react";
import Footer from "../../../Components/Ui/footer";
import NavbarSearch from "../../../Components/Ui/headerSearhc";
import FileIcon from "../../../Components/Icon/FilIcon";
import Check from '/Auth/check.png'
import logo from "../../../../public/logoOrange.png";

import { useNavigate } from "react-router-dom";
import { Input } from "../../../Components/Ui/input";
export default function OfferFormPage() {
     const [showAlert, setShowAlert] = useState(false);
     const navigate = useNavigate();

     const handleAlertClose = () => {
          setShowAlert(false);
          navigate("/offers");
     };
     const handleAdd = () => {
          setShowAlert(true);
     };


     const [selectedFile, setSelectedFile] = useState<File | null>(null);

     // Handle file selection via browse button
     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const file = event.target.files?.[0];
          if (file) {
               setSelectedFile(file);
          }
     };

     const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
          event.preventDefault();
          const file = event.dataTransfer.files?.[0];
          if (file) {
               setSelectedFile(file);
          }
     };

     const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
          event.preventDefault();
     };
     const [isPageOne, setIsPageOne] = useState(true); 
     const toNext = () => setIsPageOne(false);
     // const goToPreviousPage = () => setIsPageOne(true);

     return (
          <div>
               <NavbarSearch text="black" color="black" logoOrange={logo} />
               {isPageOne ? (
                    <div>
                         {/* form one  */}
                         <div className="md:ml-[80px] md:mr-[80px] ml-4 mr-4">
                              <div className="">
                                   <div className="md:text-[32px] text-[20px] font-bold">
                                        Do you already have an offer?
                                   </div>
                                   <div className="text-[#808080] font-medium">upload your offer below!</div>
                                   <div className="mb-10">
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
                                                       id="fileInput"
                                                       className="hidden"
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
                                        <div className="md:text-[32px] text-[20px] font-bold">
                                             No offer yet? What are you planning to do?
                                        </div>
                                        <div className="text-[#808080] font-medium">Short description of your project.</div>
                                        <div className="text-[20px] mt-[22px]">
                                             <textarea placeholder='Describe your offer' className='p-[20px] border rounded-[10px] text-[20px] mt-[15px] w-full' >

                                             </textarea>
                                        </div>
                                        <div className="text-[20px] mt-[22px]">
                                             <Input placeholder='€ Offer price' type='number' className='p-[30px] text-[20px] mt-[15px]' />
                                        </div>
                                        <div className=" flex flex-col md:items-center items-center mt-4 md:justify-center justify-center">
                                             <button className='bg-[#E31E24] text-white rounded-[40px] w-[250px] p-[10px] ml-10' onClick={toNext}>Next</button>
                                        </div>
                                   </div>
                              </div>
                              {showAlert && (
                                   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                        <div className="flex flex-col items-center bg-white p-6 rounded-lg w-[300px]">
                                             <img src={Check} alt="" className="w-[100px] fade-in" />
                                             <p className="mt-2 text-center">
                                                  Your offer successfuly added
                                             </p>
                                             <div className="mt-4 ">
                                                  <button
                                                       onClick={handleAlertClose}
                                                       className="bg-[#E31E24] text-white w-[250px] p-2 rounded-[15px]"
                                                  >
                                                       Continue
                                                  </button>
                                             </div>
                                        </div>
                                   </div>
                              )}
                         </div>
                       
                    </div>
               ) : (
                    <div>
                         {/* form two  */}
                         <div className="md:ml-[80px] md:mr-[80px] ml-4 mr-4">
                              <div className="">
                                   <div className="md:text-[32px] text-[20px] font-bold">
                                        Do you already have an offer?
                                   </div>
                                   <div className="text-[#808080] font-medium">upload your offer below!</div>
                                   <div className="text-[20px] mt-[22px]">
                                        <div className="font-bold">Your Name</div>
                                        <Input placeholder='your full name' className='p-[30px] text-[20px] mt-[15px]' />
                                   </div>
                                   <div className="text-[20px] mt-[22px]">
                                        <div className="font-bold">Street</div>
                                        <Input placeholder='Street' className='p-[30px] text-[20px] mt-[15px]' />
                                   </div>
                                   <div className="text-[20px] mt-[22px]">
                                        <div className="font-bold">City & zip code</div>
                                        <Input type='text' placeholder='City & zip code' className='p-[30px] text-[20px] mt-[15px]' />
                                   </div>
                                   <div className="text-[20px] mt-[22px]">
                                        <div className="font-bold">Telp. Number</div>
                                        <Input placeholder='Telp. Number' className='p-[30px] text-[20px] mt-[15px]' />
                                   </div>
                                   <div className="text-[20px] mt-[22px]">
                                        <div className="font-bold">Email</div>
                                        <Input type="email" placeholder='say@example.com' className='p-[30px] text-[20px] mt-[15px]' />
                                   </div>
                                   <div className="mt-10 flex justify-center">
                                        <button
                                             onClick={handleAdd}
                                             className="bg-[#E31E24] text-white w-[250px] p-3 rounded-[15px]"
                                        >
                                             Continue
                                        </button>
                                   </div>
                                   {showAlert && (
                                   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                        <div className="flex flex-col items-center bg-white p-6 rounded-lg w-[300px]">
                                             <img src={Check} alt="" className="w-[100px] fade-in" />
                                             <p className="mt-2 text-center">
                                                  Your offer successfuly added
                                             </p>
                                             <div className="mt-4 ">
                                                  <button
                                                       onClick={handleAlertClose}
                                                       className="bg-[#E31E24] text-white w-[250px] p-2 rounded-[15px]"
                                                  >
                                                       Continue
                                                  </button>
                                             </div>
                                        </div>
                                   </div>
                              )}
                              </div>
                         </div>
                    </div>
               )}
               <Footer />
          </div>
     )
}
