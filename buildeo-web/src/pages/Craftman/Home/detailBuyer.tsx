import Footer from "../../../Components/Ui/footer";
import NavbarSearch from "../../../Components/Ui/headerSearhc";
import cover from '../../../../public/cover.png'
import DownloadIcon from "../../../Components/Icon/DownloadIcon";
import pdf from '../../../../public/pdf.png'
export default function DetailBuyerPage() {
  return (
    <>
          <div className="">
               <NavbarSearch/>
                    <div className="ml-[80px] mr-[80px]">
                         <div className="text-[32px] font-bold">Buyer Offer Information</div>
                         <div className="text-[16px]">From : <b>Marvis Ighedosa</b></div>
                         <div className="text-[20px]">
                              Description
                         </div>
                         <div className="border border-[2px] border-[#E31E24] rounded flex justify-between p-3 mb-6 mt-4">
                              <div className="grid grid-cols-2 gap-4 items-center">
                                   <div className=""><img src={pdf} alt="" /></div>
                                   <div className="">Name File</div>
                              </div>
                              <div className="grid grid-cols-2 gap-4 items-center  ">
                                   <div className="text-[#CAC8C8]">Size file</div>
                                   <div className=""><DownloadIcon color="black" width={24}/></div>
                              </div>
                         </div>
                         <div className="grid grid-cols-2 w-full">
                              <div className=""><img src={cover} className='h-[350px] w-[270px] mr-0 pr-0' alt="" /></div>
                              <div className="">
                                   <div className="text-[32px] font-bold">Lay LVT: up to 20 m²</div>
                                   <div className="flex text-[16px]"><div className="mr-8">30 Offerings</div><div className="">4.8 (20 Rating)</div></div>
                                   <div className="text-[32px] orange font-bold">119€</div>
                                   <div className="text-[16px] text-justify leading-[23px]">Transform your space with our professional painting services! Whether you're looking to refresh a single room or give your entire home or office a new look, our team of skilled painters is here to deliver top-quality results. We specialize in interior and exterior painting, using high-grade materials that ensure long-lasting and beautiful finishes. With attention to detail and a commitment to customer satisfaction, we guarantee a smooth and stress-free experience from start to finish.</div>
                              </div>
                         </div>
                         <div className="flex justify-end mt-6 mb-8">
                                   <div className="flex font-bold">
                                        <button className='bg-[#FFFFFF] text-[#E31E24] border border-[#E31E24] rounded-[40px] w-[150px] p-[7px]'>Back</button>
                                        <button className='bg-[#FFFFFF] text-[#E31E24] border border-[#E31E24] rounded-[40px] w-[150px] p-[7px] ml-10'>Reject</button>
                                        <button className='bg-[#E31E24] text-white rounded-[40px] w-[150px] p-[7px] ml-10'>Accept</button>
                                   </div>
                              </div>

                    </div>
               <Footer/>
          </div>
    </>
  )
}
