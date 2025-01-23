import Footer from '../../../Components/Ui/footer'
import media from '/Media.png';
import NavbarSearch from '../../../Components/Ui/headerSearhc';
import logo from "../../../../public/logoOrange.png";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ServicePage() {

       const [value, setValue] = useState('one');
       const navigate = useNavigate();
         const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
           setValue(newValue);
         };
         const toOffers = () => {
          navigate('/add-service');
         }
         const items = Array(6).fill(null);
         const request = Array(3).fill(null);

     return (
          <>
               <div className="">
                    <NavbarSearch text="black" color="black" logoOrange={logo} />
                    <div className="md:ml-[80px] md:mr-[80px] mr-4 ml-4">
                         <div className="flex justify-between items-center">
                              <div className="text-[32px] font-bold">All my services</div>
                              <div className=""><button onClick={toOffers} className='text-white bg-[#E31E24] rounded-[10px] md:w-[150px] p-2'>+New Service</button></div>
                         </div>
                         <div className="grid grid-cols-5 gap-2">
                         {items.map((_, i) => (
                              <Link to={'/detail-service'}>
                                   <div className="flex flex-col justify-center p-2 bg-white rounded shadow ">
                                        <img src={media} alt="" className='rounded'/>
                                        <div className="font-bold text-[16px] mt-2">Lay LVT: up to 20 m²</div>
                                        <div className="text-[12px] text-[#9A9A9D]">Painter Company</div>
                                   </div>
                              </Link>
                                   
                             )) }
                         </div>
                         <div className="flex justify-between items-center mt-6">
                              <div className="text-[32px] font-bold">My service request</div>
                         </div>
                         <div className="grid grid-cols-5 gap-2">
                         {request.map((_, i) => (
                                   <div className="flex flex-col justify-center p-2 bg-white rounded shadow ">
                                   <img src={media} alt="" className='rounded'/>
                                   <div className="font-bold text-[16px] mt-2">Lay LVT: up to 20 m²</div>
                                   <div className="text-[12px] text-[#9A9A9D]">Painter Company</div>
                              </div>
                             )) }
                         </div>
                         
                         
                    </div>
                    <Footer />
               </div>
          </>
     )
}
