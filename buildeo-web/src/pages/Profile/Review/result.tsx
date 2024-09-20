import Footer from "../../../Components/Ui/footer";
import NavbarSearch from "../../../Components/Ui/headerSearhc";
import cover from '/cover.png'
import { Avatar, AvatarFallback, AvatarImage } from "../../../Components/Ui/avatar";
import DynamicRating from "../../../Components/Ui/rating";
import { Link } from "react-router-dom";

export default function ResultPage() {
     return (
          <>
               <div className="">
                    <NavbarSearch text="black"/>
                    <div className="ml-[80px] mr-[80px] mb-[80px]">
                         <div className="flex ">
                              <div className='w-[1000px] mr-6'><img src={cover} alt="" className='rounded-[10px]' /></div>
                              <div className="">
                                   <div className="text-[32px] font-bold">Lay LVT: up to 20 m²</div>
                                   <div className="flex"><div className="">30 Offerings</div><div className="">4.8 (20 Rating)</div></div>
                                   <div className="font-bold text-[32px] text-[#E31E24] mt-3">119€</div>
                                   <div className="text-[18px] text-justify">Transform your space with our professional painting services! Whether you're looking to refresh a single room or give your entire home or office a new look, our team of skilled painters is here to deliver top-quality results. We specialize in interior and exterior painting, using high-grade materials that ensure long-lasting and beautiful finishes. With attention to detail and a commitment to customer satisfaction, we guarantee a smooth and stress-free experience from start to finish.</div>
                              </div>
                         </div>
                         <div className="text-[32px] font-bold mb-4">Your Reviews</div>
                         <div className="flex">
                              <div className="mr-4"><Avatar>
                                   <AvatarImage src="https://github.com/shadcn.png" className='w-[50px] mr-10' />
                                   <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                              </div>
                              <div className="">
                                   <div className="text-[20px] font-bold">Maria Natalie</div>
                                   <div className="flex items-center"><div className="mr-[20px]"><DynamicRating defaultValue={4.5} readOnly={true} /></div><div className="text-[16px] text-[#9586A8]">Jan 1 2024</div></div>
                                   <div className="text-justify">So lovely paint! I couldn't be happier with the results. The painters were professional, punctual, and meticulous in their work. They transformed my living room with vibrant colors, making it feel fresh and inviting. The attention to detail was impressive, and they ensured everything was cleaned up afterward. I highly recommend their services to anyone looking for a top-quality painting job. The entire experience was smooth and stress-free. Five stars all the way!</div>
                              </div>
                         </div>
                         <div className="flex font-bold justify-end mt-16">
                              <Link to={'/orders/review/edit'}><button className='bg-[#FFFFFF] text-[#E31E24] border border-[#E31E24] rounded-[40px] w-[150px] p-[7px]'>Edit</button></Link>
                              <Link to={'/orders'}><button className='bg-[#E31E24] text-white rounded-[40px] w-[150px] p-[7px] ml-10'> Back</button></Link>
                         </div>
                    </div>
                    <Footer />
               </div>
          </>
     )
}
