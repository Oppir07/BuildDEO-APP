import Footer from '../../Components/Ui/footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import media from '../../../public/Media.png'
import NavbarSearch from '../../Components/Ui/headerSearhc';
export default function OrdersPage() {
  return (
     <>
          <div className="">
               <NavbarSearch/>
               <div className="ml-[80px] mr-[80px]">
                    <div className="text-[32px] font-bold">Orders</div>
                    <div className="flex mt-10">
                         <div className="mr-10 "><FontAwesomeIcon icon={faShoppingCart} color='#E31E24' size='10x'/></div>
                         <div className="flex flex-col justify-between">
                              <div className="text-[20px] font-bold">Your Orders</div>
                              <div className="text-[20px]">Uppsie you dont have any orders right now</div>
                              <div className=""><button className='bg-[#E31E24] rounded-[40px] text-white font-bold p-[11px] w-full'>Place an orders</button></div>
                         </div>
                    </div>
                    <div className="text-[32px] font-bold mt-[90px] mb-10" >Order History</div>
                    <div className="flex flex-wrap justify-between bg-white shadow p-4 rounded-[5px]">
                         <div className="mr-10"><img src={media} alt="" className='w-[200px] h-[150px] rounded-[10px]'/></div>
                         <div className="text-[14px] flex flex-col justify-between">
                              <div className="font-bold text-[20px] ">Lay LVT: up to 20 m²</div>
                              <div className="flex justify-between text-[#9586A8] "><div className="">Item : 1</div><div className="">Price :  119€</div></div>
                              <div className="text-[#9586A8] mt-[50px]">Total Price</div>
                              <div className="text-[20px] font-bold  119€"></div>
                         </div>
                         <div className=" md:ml-[100px] flex flex-col items-center justify-center">
                         <div className="flex font-bold">
                              <button className='bg-[#FFFFFF] text-[#E31E24] border border-[#E31E24] rounded-[40px] w-[150px] p-[7px]'>Give a Review</button>
                              <button className='bg-[#E31E24] text-white rounded-[40px] w-[150px] p-[7px] ml-10'>Re-Order</button>
                         </div>
                         </div>
                    </div>
               </div>
               <Footer/>
          </div>
     </>
  )
}
