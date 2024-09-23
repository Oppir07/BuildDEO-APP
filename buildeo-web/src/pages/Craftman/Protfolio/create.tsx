import { Link } from "react-router-dom";
import Footer from "../../../Components/Ui/footer";
import NavbarSearch from "../../../Components/Ui/headerSearhc";

export default function CreatePortfolio() {
     return (
          <div>

               <NavbarSearch text="black"/>
               <div className="md:ml-[80px] md:mr-[80px] mr-4 ml-4">
                    <div className="text-[32px] font-bold">Add Project</div>
                    <div className="text-[16px]">make sure to fill it correctly</div>
                    <form action="">
                         <div className="flex flex-wrap justify-center w-full  p-3">
                              <div className="bg-[#D9D9D9] flex justify-center items-center p-2 h-[230px] w-[210px]">
                                   <div className=" rounded ">
                                        <img src="" alt="" />
                                        <label htmlFor="file-upload" className="custom-file-upload">
                                             Choose an Image
                                        </label>
                                        <input id="file-upload" type="file" style={{ display: 'none', height: 12 }} className='h-[4px]' />
                                   </div>
                              </div>
                              <div className="w-full flex flex-col justify-between md:ml-[100px]">
                                   <div className="">
                                        <input type="text" className='border border-[#E31E24] rounded-[10px] pl-4 p-2 w-full h-[45px] mt-1' placeholder='project name' />
                                   </div>
                                   <div className="">
                                        <input type="date" className='border border-[#E31E24] rounded-[10px] pl-4 p-2  w-full h-[45px] mt-4' placeholder='Project start date' />
                                   </div>
                                   <div className="">
                                        <input type="date" className='border border-[#E31E24] rounded-[10px] pl-4 p-2  w-full h-[45px] mt-4' placeholder='Project end date' />
                                   </div>
                                   <div className="">
                                        <textarea name="" className=' mt-4 border border-[#E31E24] rounded-[10px] pl-4 p-2  w-full' id="" rows={10} placeholder='project description'>
                                        </textarea>
                                   </div>
                              </div>
                         </div>
                         <div className="flex justify-end mt-6 mb-8">
                              <div className="flex font-bold">
                              <Link to={'/home/craftman'}><button className='bg-[#FFFFFF] text-[#E31E24] border border-[#E31E24] rounded-[40px] w-[150px] p-[7px]'>Cancel</button></Link>
                              <button className='bg-[#E31E24] text-white rounded-[40px] w-[150px] p-[7px] ml-10'>Add Portfolio</button>
                              </div>
                         </div>
                    </form>

               </div>
               <Footer />
          </div>
     )
}
