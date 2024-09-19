import React from 'react'
import NavbarSearch from '../../../Components/Ui/headerSearhc'
import Footer from '../../../Components/Ui/footer'
import { Input } from '../../../Components/Ui/input'

export default function OrderOfferPage() {
  return (
    <div>
          <NavbarSearch text='black' />
               <div className="md:ml-[80px] md:mr-[80px] ml-4 mr-4">
               <div className="md:text-[32px] text-[20px] font-bold">
               Get the Cheapest Offer
                         </div>
                         <div className="">Fill this thata so BUILDEO can send you the result</div>
               <form className='mt-8'>
                <div className="md:grid md:grid-cols-2 gap-4">
                  <Input
                    className="border border-black h-[40px]"
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                  
                    required
                  />
                  <Input
                    className="border border-black h-[40px] mt-4 md:mt-0"
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                  
                    required
                  />
                </div>
                <div className="md:grid md:grid-cols-2 md:gap-4 mt-4 md:mt-6">
                  <Input
                    placeholder="city"
                    className="border border-black h-[40px]"
                  />
                  <Input
                    className="border border-black h-[40px] mt-4 md:mt-0"
                    type="text"
                    name="postNumber"
                    placeholder="Post Number"
                   
                    required
                  />
                </div>
                <div className="md:grid md:grid-cols-2 md:gap-4 mt-4 md:mt-6">
                  <Input
                    className="border border-black h-[40px]"
                    type="text"
                    name="street"
                    placeholder="Street"
                    
                    required
                  />
                  <Input
                    className="border border-black h-[40px] mt-4 md:mt-0"
                    type="text"
                    name="phone"
                    placeholder="Phone"
                   
                    required
                  />
                </div>
                <div className="md:grid md:grid-cols-2 gap-4 mt-4 md:mt-6 ">
                  <Input
                    className="border border-black h-[40px] "
                    type="email"
                    name="email"
                    placeholder="Email"
                    
                    required
                  />
                
                </div>
                <div className="mt-10 flex justify-end">
                <button className='bg-[#FFFFFF] text-[#E31E24] border border-[#E31E24] rounded-[40px] w-[200px] p-[7px]'>Cancel</button>
                  <button
                    type="submit"
                    className="bg-[#E31E24] font-bold rounded-[40px] w-[200px] text-white text-center ml-2"
                  >
                    <div className="p-4">Send Offer</div>
                  </button>
                </div>
              </form>
               </div>
          <Footer/>
    </div>
  )
}
