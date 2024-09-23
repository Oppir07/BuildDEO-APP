import { Link } from 'react-router-dom'
import Footer from '../../../Components/Ui/footer'
import NavbarSearch from '../../../Components/Ui/headerSearhc'
import cover from '/cover.png'
export default function ConfirmPayPage() {

     return (
          <>
               <div className="">
                    <NavbarSearch text='balck' />
                    <div className="md:pl-[80px] md:pr-[80px] ml-4 mr-4">
                         <div className="flex flex-wrap justify-between">
                              <div className="flex flex-wrap">
                                   <div className=""><img src={cover} alt="" /></div>
                                   <div className="md:ml-9"><div className="text-[20px] font-bold">Your Items</div><div className="text-[#9586A8]">please make sure this order already correct</div><div className="text-[20px]">Lay LVT: up to 20 m²</div></div>
                              </div>
                              <div className="flex flex-col justify-between">
                                   <div className="font-bold text-[20px] md:text-end md:mt-0 mt-4">Total Price &nbsp; <b className='text-[#E31E24]'>119€</b></div>
                                   <div className="flex flex-wrap">
                                        <button className='bg-[#FFFFFF] text-[#E31E24] border border-[#E31E24] rounded-[40px] w-[150px] p-[7px]'>Back to Home</button>
                                        <button className='bg-[#FFFFFF] text-[#E31E24] border border-[#E31E24] rounded-[40px] w-[150px] p-[7px] ml-2 md:ml-10'>Cancel Offering</button>
                                        <Link to={'/home'}><button className='bg-[#E31E24] text-white rounded-[40px] w-full md:w-[150px] p-[7px] md:ml-10 md:mt-0 mt-2'>Paying</button></Link>
                                   </div>
                              </div>

                         </div>
                         <div className="mt-6 mb-[100px]">
                              <div className="text-[24px] font-bold ">Step by Step</div>
                              <div className="text-[18px] font-bold mt-4">Enter Your Credit Card Details</div>
                              <div className="">
                                   <li>Card Number: Input your 16-digit credit card number.</li>
                                   <li>Expiration Date: Select the card’s expiration month and year.</li>
                                   <li>CVV/CVC Code: Enter the 3-digit security code from the back of your card</li>
                                   <li>Cardholder Name: Type the name as it appears on the card.</li>
                              </div>
                              {/* // */}
                              <div className="text-[18px] font-bold mt-4"> Provide Your Billing Address:</div>
                              <div className="">
                                   <li>If your billing address is different from your shipping address, enter the full billing address details.</li>
                              </div>
                              {/* // */}
                              <div className="text-[18px] font-bold mt-4">Review Your Order</div>
                              <div className="">
                                   <li>Double-check your order summary, including items, shipping, and total cost.</li>
                              </div>
                              {/* // */}
                              <div className="text-[18px] font-bold mt-4">Confirm Payment</div>
                              <div className="">
                                   <li>Click "Confirm Payment" or "Pay Now" to process your payment.</li>
                              </div>
                              {/* // */}
                              <div className="text-[18px] font-bold mt-4">Wait for Confirmation</div>
                              <div className="">
                                   <li>Your payment is being processed. Please wait a moment. </li>
                              </div>
                         </div>

                    </div>
                    <Footer />
               </div>
          </>
     )
}
