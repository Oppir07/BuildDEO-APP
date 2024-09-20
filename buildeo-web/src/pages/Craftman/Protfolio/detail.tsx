import { Link } from "react-router-dom";
import NavbarSearch from "../../../Components/Ui/headerSearhc";
import cover from '/cover.png'
import Footer from "../../../Components/Ui/footer";

export default function DetailPortfolioPage() {
  return (
    <div>
           <NavbarSearch text="black"/>
                    <div className="ml-[80px] mr-[80px]">
                         <div className="text-[28px] font-bold">Painting Wall Project</div>
                         <div className="">Duration : September 21 2024 - September 26 2024</div>
                         <div className="mt-6 grid md:grid-cols-2 w-full">
                              <div className=""><img src={cover} className='h-[350px]  mr-0 pr-0' alt="" /></div>
                              <div className="">
                                   
                                   <div className="text-[16px] text-justify leading-[23px]">Transform your space with our professional painting services! Whether you're looking to refresh a single room or give your entire home or office a new look, our team of skilled painters is here to deliver top-quality results. We specialize in interior and exterior painting, using high-grade materials that ensure long-lasting and beautiful finishes. With attention to detail and a commitment to customer satisfaction, we guarantee a smooth and stress-free experience from start to finish.</div>
                              </div>
                         </div>
                         <div className="flex justify-end mt-6 mb-8">
                                   <div className="flex font-bold">
                                        <Link to={'/home/craftman'}><button className='bg-[#FFFFFF] text-[#E31E24] border border-[#E31E24] rounded-[40px] w-[150px] p-[7px]'>Cancel</button></Link>
                                        <button className='bg-[#E31E24] text-white rounded-[40px] w-[150px] p-[7px] ml-10'>Edit Portfolio</button>
                                   </div>
                              </div>


                    </div>
                    <Footer />

    </div>
  )
}
