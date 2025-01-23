import Footer from '../../../Components/Ui/footer'
import media from '/Media.png';
import NavbarSearch from '../../../Components/Ui/headerSearhc';
import logo from "../../../../public/logoOrange.png";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from './form';

export default function AddServicePage() {

       const [value, setValue] = useState('one');
       const navigate = useNavigate();
         const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
           setValue(newValue);
         };
         const toOffers = () => {
          navigate('/offer/form');
         }

     return (
          <>
               <div className="">
                    <NavbarSearch text="black" color="black" logoOrange={logo} />
                    <div className="md:ml-[80px] md:mr-[80px] mr-4 ml-4">
                         <div className="flex justify-center items-center">
                              <div className="text-[32px] font-bold">My Request</div>
                         </div>
                         <Form/>
                    </div>
                    <Footer />
               </div>
          </>
     )
}
