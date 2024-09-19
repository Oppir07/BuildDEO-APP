import { useState } from "react";
import Footer from "../../../Components/Ui/footer";
import NavbarSearch from "../../../Components/Ui/headerSearhc";
import FileIcon from "../../../Components/Icon/FilIcon";

export default function OfferBuyerDetailPage() {
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
     return (
          <div>
               <NavbarSearch text="black" />
               <div className="md:ml-[80px] md:mr-[80px] ml-4 mr-4">
                    <div className="">
                         <div className="md:text-[32px] text-[20px] font-bold">
                              Offer Infromation
                         </div>
                         <div className="">Descript ypur project information to the provider</div>
                         <div className="">
                              <select name="provide" id="" className="w-full border border-[#E31E24] p-2 rounded mt-2">
                                   <option value="provider 1">Provider 1</option>
                                   <option value="provider 1">Provider 2</option>
                                   <option value="provider 1">Provider 3</option>
                                   <option value="provider 1">Provider 4</option>
                              </select>
                         </div>
                         <textarea placeholder='Short description of your project' name="" id="" rows={7} className='border border-[#E31E24] w-full p-2 rounded mt-2'>

                         </textarea>
                         <div className="mb-10">
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
                              <div className=" flex flex-col md:items-end items-center mt-4 md:justify-end justify-center">
                                   <div className="flex font-bold">
                                        <button className='bg-[#E31E24] text-white rounded-[40px] w-[150px] p-[7px] ml-10'>Back</button>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
               <Footer />
          </div>
     )
}
