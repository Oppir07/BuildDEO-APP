import NavbarSearch from '../../../Components/Ui/headerSearhc'
import Footer from '../../../Components/Ui/footer'

export default function CreateProductPage() {


     return (
          <>
               <div className="">
                    <NavbarSearch />
                    <div className="ml-[80px] mr-[80px]">
                         <div className="text-[32px] font-bold">Add Service</div>
                         <div className="text-[16px]">make sure to fill it correctly</div>
                         <form action="">
                              <div className="flex w-full  p-3">
                                   <div className="bg-[#D9D9D9] flex justify-center items-center p-2 h-[230px] w-[210px]">
                                        <div className=" rounded ">
                                             <img src="" alt="" />
                                             <label htmlFor="file-upload" className="custom-file-upload">
                                                  Choose an Image
                                             </label>
                                             <input id="file-upload" type="file" style={{ display: 'none', height: 12 }} className='h-[4px]' />
                                        </div>
                                   </div>
                                   <div className="w-full flex flex-col justify-between ml-[100px]">
                                        <div className="">
                                             <input type="text" className='border border-[#E31E24] rounded-[10px] pl-4 p-2 w-full h-[45px]' placeholder='service name' />
                                        </div>
                                        <div className="">
                                             <input type="number" className='border border-[#E31E24] rounded-[10px] pl-4 p-2  w-full h-[45px]' placeholder='service price' />
                                        </div>
                                        <div className="">
                                             <textarea name="" className='border border-[#E31E24] rounded-[10px] pl-4 p-2  w-full' id="" rows={5} placeholder='service description'>
                                             </textarea>
                                        </div>
                                   </div>
                              </div>
                              <div className="flex justify-end mt-6 mb-8">
                                   <div className="flex font-bold">
                                        <button className='bg-[#FFFFFF] text-[#E31E24] border border-[#E31E24] rounded-[40px] w-[150px] p-[7px]'>Cancel</button>
                                        <button className='bg-[#E31E24] text-white rounded-[40px] w-[150px] p-[7px] ml-10'>Add service</button>
                                   </div>
                              </div>
                         </form>

                    </div>
                    <Footer />
               </div>
          </>
     )
}
