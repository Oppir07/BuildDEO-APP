import { Avatar, AvatarFallback, AvatarImage } from "../../../Components/Ui/avatar";
import Footer from "../../../Components/Ui/footer";
import NavbarSearch from "../../../Components/Ui/headerSearhc";
import DynamicRating from "../../../Components/Ui/rating";
import cover from '../../../../public/cover.png'
export default function DetailProduct() {
  return (
     <>
          <div className="">
               <NavbarSearch/>
               <div className="md:pl-[82px] md:pr-[82px]">
                         <div className="grid grid-cols-2    w-full">
                              <div className=""><img src={cover} className='h-[350px] w-[270px] mr-0 pr-0' alt="" /></div>
                              <div className="">
                                   <div className="text-[32px] font-bold">Lay LVT: up to 20 m²</div>
                                   <div className="flex text-[16px]"><div className="mr-8">30 Offerings</div><div className="">4.8 (20 Rating)</div></div>
                                   <div className="text-[32px] orange font-bold">119€</div>
                                   <div className="text-[16px] text-justify leading-[23px]">Transform your space with our professional painting services! Whether you're looking to refresh a single room or give your entire home or office a new look, our team of skilled painters is here to deliver top-quality results. We specialize in interior and exterior painting, using high-grade materials that ensure long-lasting and beautiful finishes. With attention to detail and a commitment to customer satisfaction, we guarantee a smooth and stress-free experience from start to finish.</div>
                                  
                              </div>
                             
                         </div>
                         <div className="mt-[80px] mb-10">
                              <div className="text-[32px] font-bold">Review and Rates</div>
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
                              <div className="flex mt-2">
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
                         </div>
                    </div>

               <Footer/>
          </div>
     </>
  )
}