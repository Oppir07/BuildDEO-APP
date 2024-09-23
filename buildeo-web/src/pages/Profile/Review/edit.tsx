import DynamicRating from '../../../Components/Ui/rating'
import Footer from '../../../Components/Ui/footer'
import NavbarSearch from '../../../Components/Ui/headerSearhc'
import cover from '/cover.png'

export default function EditPage() {
  return (
     <>
       <div className="">
                    <NavbarSearch text='black'/>
                    <div className="ml-[80px] mr-[80px] mb-[80px]">
                         <div className="flex ">
                              <div className='w-[1000px] mr-6'><img src={cover} alt="" className='rounded-[10px]' /></div>
                              <div className="">
                                   <div className="text-[32px] font-bold">Lay LVT: up to 20 m²</div>
                                   <div className="flex"><div className="">30 Offerings</div><div className="">4.8 (20 Rating)</div></div>
                                   <div className="font-bold text-[32px] text-[#E31E24] mt-3">119€</div>
                                   <div className="text-[20px] text-justify">Transform your space with our professional painting services! Whether you're looking to refresh a single room or give your entire home or office a new look, our team of skilled painters is here to deliver top-quality results. We specialize in interior and exterior painting, using high-grade materials that ensure long-lasting and beautiful finishes. With attention to detail and a commitment to customer satisfaction, we guarantee a smooth and stress-free experience from start to finish.</div>
                              </div>
                         </div>
                         <div className="font-bold text-[32px] mt-4 mb-2">Give a Review</div>
                         <div className="">
                              <form action="">
                                   <div className="flex flex-col w-full">
                                        <DynamicRating />
                                        <textarea rows={7} placeholder='your review' name="" id="" className='mt-2 border border-[#E31E24] p-2 rounded-[5px]'>
                                        </textarea>
                                        <div className="flex font-bold justify-end mt-3">
                                             <button className='bg-[#FFFFFF] text-[#E31E24] border border-[#E31E24] rounded-[40px] w-[150px] p-[7px]'>Cancel</button>
                                             <button className='bg-[#E31E24] text-white rounded-[40px] w-[150px] p-[7px] ml-10'> Send Review</button>
                                        </div>
                                   </div>

                              </form>
                         </div>
                    </div>
                    <Footer />
               </div>
     </>
  )
}
