import NavbarSearch from '../../Components/Ui/headerSearhc'
import Footer from '../../Components/Ui/footer'
import favorable from '/favorable.jpg'
import { Link } from 'react-router-dom'

export default function FavorablePage() {
     return (
          <div>
               <NavbarSearch text='black' />
               <div className="md:ml-[150px] md:mr-[150px] mr-[70px] ml-[80px]">
                    <div className="flex flex-wrap md:justify-between justify-center mt-10 ">
                         <div className="flex flex-col justify-center items-center">
                              <img src={favorable} className='w-[200px]' alt="" />
                              <div className="text-center font-bold w-[200px]">Submit your offer for free in BUILDEO</div>
                         </div>
                         <div className="flex flex-col">
                              <img src={favorable} className='w-[200px]' alt="" />
                              <div className="text-center font-bold w-[200px]">Wait for the provider response</div>
                         </div>
                         <div className="flex flex-col">
                              <img src={favorable} className='w-[200px]' alt="" />
                              <div className="text-center font-bold w-[200px]">Compare the provider profile and choose</div>
                         </div>
                    </div>
                    <div className="flex justify-center items-center mt-[60px] mb-[100px]">
                         <Link to={'/favorable/document'}>
                         <button className="bg-[#E31E24] p-3 pl-6 pr-6 text-white rounded-[25px] font-medium">Uppload ad Offer</button>
                         </Link>
                    </div>
               </div>
               <Footer />
          </div>
     )
}
