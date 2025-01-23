import Footer from '../../../Components/Ui/footer'
import media from '/Media.png';
import NavbarSearch from '../../../Components/Ui/headerSearhc';
import logo from "../../../../public/logoOrange.png";
import { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function OffersPage() {

  const [value, setValue] = useState('one');
  const navigate = useNavigate();
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const toComplete = () => {
            Swal.fire({
                 title: " Successful",
                 text: "You have successfully complete service!",
                 icon: "success",
                 confirmButtonText: "OK",
            }).then(() => {
                 setValue('three');
  
            });
       };
       const toOnprogrss = () => {
            Swal.fire({
                 title: " Successful",
                 text: "You have successfully start service!",
                 icon: "success",
                 confirmButtonText: "OK",
            }).then(() => {
                 setValue('two');
  
            });
       };
  const toOffers = () => {
    navigate('/offer/form');
  }
  return (
    <>
      <div className="">
        <NavbarSearch text="black" color="black" logoOrange={logo} />
        <div className="md:ml-[80px] md:mr-[80px] mr-4 ml-4">
          <div className="flex justify-between items-center">
            <div className="text-[32px] font-bold">Offers</div>
            <div className=""><button onClick={toOffers} className='text-white bg-[#E31E24] rounded-[10px] md:w-[150px] p-2'>+Add Offers</button></div>
          </div>
          <Box sx={{ width: '100%' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              TabIndicatorProps={{
                style: {
                  backgroundColor: '#FF460A',
                  color: '#FF460A'
                },
              }}
              sx={{
                '& .MuiTab-root': {
                  color: '#9A9A9D',
                },
                '& .Mui-selected': {
                  color: '#FF460A',
                },
              }}
              indicatorColor="secondary"
            >
              <Tab value="one" label="Pending" />
              <Tab value="two" label="On progress" />
              <Tab value="three" label="Completed" />
            </Tabs>
            {value === 'one' &&
              <div className='grid grid-cols-5'>
                <div className="flex flex-col justify-center p-2 bg-white rounded shadow ">
                  <div className=""><img src={media} alt="" className='w-full h-[150px] rounded-[10px]' /></div>
                  <div className="font-bold text-[16px] mt-2">Lay LVT: up to 20 m²</div>
                  <div className="text-[12px] text-[#9A9A9D]">Painter Company</div>
                  <div className="font-bold text-[#E31E24]">119€</div>
                  <div className=" w-full flex justify-end mt-4">
                    <button onClick={toOnprogrss} className='border w-[100px] text-[#E31E24] border-[#E31E24] rounded p-2'>Start</button>
                  </div>
                </div>
              </div>
            }
            {value === 'two' &&
              <div className="grid grid-cols-5">
                <div className="flex flex-col justify-center p-2 bg-white rounded shadow ">
                  <div className=""><img src={media} alt="" className='w-full h-[150px] rounded-[10px]' /></div>
                  <div className="font-bold text-[16px] mt-2">Lay LVT: up to 20 m²</div>
                  <div className="text-[12px] text-[#9A9A9D]">Painter Company</div>
                  <div className="font-bold text-[#E31E24]">119€</div>
                  <div className=" w-full flex justify-end mt-4">
                    <button onClick={toComplete} className='border w-[100px] text-[#E31E24] border-[#E31E24] rounded p-2'>Completed</button>
                  </div>
                </div>
              </div>
            }{
              value === 'three' &&
              <div className="grid grid-cols-5">
                <div className="flex flex-col justify-center p-2 bg-white rounded shadow ">
                  <div className=""><img src={media} alt="" className='w-full h-[150px] rounded-[10px]' /></div>
                  <div className="font-bold text-[16px] mt-2">Lay LVT: up to 20 m²</div>
                  <div className="text-[12px] text-[#9A9A9D]">Painter Company</div>
                  <div className="font-bold text-[#E31E24]">119€</div>
                  <div className=" w-full flex justify-end mt-4">
                    <button className='border w-[100px] text-[#E31E24] border-[#E31E24] rounded p-2'>Start</button>
                  </div>
                </div>
              </div>
            }
          </Box>

        </div>
        <Footer />
      </div>
    </>
  )
}
