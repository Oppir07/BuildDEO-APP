import Footer from '../../../Components/Ui/footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import media from '/Media.png'
import NavbarSearch from '../../../Components/Ui/headerSearhc';
import { Link } from 'react-router-dom';
export default function OrdersPage() {
     return (
          <>
               <div className="">
                    <NavbarSearch text='black' />
                    <div className="md:ml-[80px] md:mr-[80px] mr-4 ml-4">
                         <div className="text-[32px] font-bold">Orders</div>
                         <div className="flex flex-wrap mt-10">
                              <div className="md:mr-10 "><FontAwesomeIcon icon={faShoppingCart} color='#E31E24' size='9x' /></div>
                              <div className="flex flex-col justify-between">
                                   <div className="text-[20px] font-bold">Your Orders</div>
                                   <div className="text-[20px]">Uppsie you dont have any orders right now</div>
                                   <div className=""><button className='bg-[#E31E24] rounded-[40px] text-white font-bold p-[11px] w-full'>Place an orders</button></div>
                              </div>
                         </div>
                         <div className="text-[32px] font-bold mt-[90px] mb-10" >Order History</div>
                         <div className="flex flex-wrap justify-between bg-white shadow p-4 rounded-[5px]">
                              <div className=""><img src={media} alt="" className='md:w-[200px] h-[150px] rounded-[10px]' /></div>
                              <div className="text-[14px] flex flex-col justify-between mt-4 md:mt-0">
                                   <div className="font-bold text-[20px] ">Lay LVT: up to 20 m²</div>
                                   <div className="flex justify-between text-[#9586A8] "><div className="">Item : 1</div><div className="">Price :  119€</div></div>
                                   <div className="text-[#9586A8] mt-2 md:mt-[50px]">Total Price</div>
                                   <div className="text-[20px] font-bold  ">119€</div>
                              </div>
                              <div className="mt-3 md:mt-0 text-[16px]  flex flex-col items-center justify-center">
                                   <div className="flex flex-wrap items-center font-bold">
                                        <Link to={'/orders/detail'}><button className='bg-[#FFFFFF] text-[#E31E24] border border-[#E31E24] rounded-[40px] w-full md:w-[120px] p-[7px] '>View Detail</button></Link>
                                        <Link to={'/orders/review'}><button className='bg-[#FFFFFF] text-[#E31E24] border border-[#E31E24] rounded-[40px] w-full md:w-[120px] p-[7px] mt-2 md:mt-0 md:ml-2'>Give a Review</button></Link>
                                        <button className='bg-[#E31E24] text-white rounded-[40px] w-full md:w-[150px] p-[7px] mt-2 md:mt-0 md:ml-2'>Re-Order</button>
                                        <div className="text-[#9586A8] text-center font-medium md:ml-6 mt-2 md:mt-0">Status : <b>Accepted</b></div>
                                   </div>
                              </div>
                         </div>
                    </div>
                    <Footer />
               </div>
          </>
     )
}
