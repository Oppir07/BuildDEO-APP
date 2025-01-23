import Footer from '../../../Components/Ui/footer'
import media from '/Media.png';
import NavbarSearch from '../../../Components/Ui/headerSearhc';
import logo from "../../../../public/logoOrange.png";
import { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import Swal from 'sweetalert2';
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function MyOrderPage() {
     const [value, setValue] = useState('one');

     const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
          setValue(newValue);
     };
     const toPending = () => {
          Swal.fire({
               title: " Successful",
               text: "You have successfully complete service!",
               icon: "success",
               confirmButtonText: "OK",
          }).then(() => {
               setValue('two');

          });
     };


     const items = Array(4).fill(null);


     return (
          <>
               <div className="">
                    <NavbarSearch text="black" color="black" logoOrange={logo} />
                    <div className="md:ml-[80px] md:mr-[80px] mr-4 ml-4">
                         <div className="flex justify-between items-center">
                              <div className="text-[32px] font-bold">Orders</div>
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
                                   <Tab value="one" label="Negotiation" />
                                   <Tab value="two" label="Pending" />
                                   <Tab value="three" label="On progress" />
                                   <Tab value="four" label="Completed" />
                              </Tabs>
                              {value === 'one' &&
                                   <div className="ml-[100px] mr-[100px] shadow p-6 mt-4">
                                        <table className='w-full text-[#808080]'>
                                             <tr className='font-bold'>
                                                  <td>Service</td>
                                                  <td>Total Service</td>
                                                  <td>Amount</td>
                                                  <td>Status</td>
                                                  <td>Action</td>
                                             </tr>
                                             <tr className=''>
                                                  <td>Floor Layers</td>
                                                  <td>3</td>
                                                  <td className='text-[#E31E24] font-bold'>39€</td>
                                                  <td className='text-[#FA7A5D]'>On Progress</td>
                                                  <td className='w-[20%]'>
                                                       <div className="">
                                                            <button className='bg-[#03C3EC] rounded p-2 w-[40px] mr-6'><FontAwesomeIcon icon={faEye} color='white' /></button>
                                                            <button onClick={toPending} className='bg-[#2FB142] rounded p-2 w-[100px] text-white'>Approve</button>
                                                       </div>
                                                  </td>
                                             </tr>
                                             <tr className=''>
                                                  <td>Painter</td>
                                                  <td>3</td>
                                                  <td className='text-[#E31E24] font-bold'>199€</td>
                                                  <td className='text-[#EE3535]'>Expired</td>
                                                  <td className='w-[20%]'>
                                                       <div className="">
                                                            <button className='bg-[#03C3EC] rounded p-2 w-[40px] mr-6'><FontAwesomeIcon icon={faEye} color='white' /></button>
                                                            <button className='bg-[#5B5C5B] rounded p-2 w-[100px] text-white'>Approve</button>
                                                       </div>
                                                  </td>
                                             </tr>
                                        </table>
                                   </div>
                              }
                              {
                                   value === 'two' &&
                                   <div className="grid grid-cols-5 gap-2">
                                        {items.map((_, i) => (
                                             <div className="flex flex-col justify-center p-2 bg-white rounded shadow ">
                                                  <div className="mr-10"><img src={media} alt="" className='w-[186px] h-[150px] rounded-[10px]' /><div className="absolute mt-[-150px] rounded-tr font-medium text-[12px] text-[#ffffff] rounded-bl p-1 bg-[#AA121290] ml-[105px]">Paid by buyer</div></div>
                                                  <div className="font-bold text-[16px] mt-2">Lay LVT: up to 20 m²</div>
                                                  <div className="text-[12px] text-[#9A9A9D]">Painter Company</div>
                                             </div>
                                        ))}
                                   </div>

                              }
                              {
                                   value === 'three' &&
                                   <div className="grid grid-cols-5 gap-2">
                                        {items.map((_, i) => (
                                             <div className="flex flex-col justify-center p-2 bg-white rounded shadow ">
                                                  <div className="mr-10"><img src={media} alt="" className='w-[186px] h-[150px] rounded-[10px]' /><div className="absolute mt-[-150px] rounded-tr font-medium text-[12px] text-[#ffffff] rounded-bl p-1 bg-[#AA121290] ml-[105px]">Paid by buyer</div></div>
                                                  <div className="font-bold text-[16px] mt-2">Lay LVT: up to 20 m²</div>
                                                  <div className="text-[12px] text-[#9A9A9D]">Painter Company</div>
                                             </div>
                                        ))}
                                   </div>

                              }{
                                   value === 'four' &&
                                   <div className="grid grid-cols-5 gap-2">
                                        {items.map((_, i) => (
                                             <div className="flex flex-col justify-center p-2 bg-white rounded shadow ">
                                                  <div className="mr-10"><img src={media} alt="" className='w-[186px] h-[150px] rounded-[10px]' /><div className="absolute mt-[-150px] rounded-tr font-medium text-[12px] text-[#ffffff] rounded-bl p-1 bg-[#AA121290] ml-[105px]">Paid by buyer</div></div>
                                                  <div className="font-bold text-[16px] mt-2">Lay LVT: up to 20 m²</div>
                                                  <div className="text-[12px] text-[#9A9A9D]">Painter Company</div>
                                             </div>
                                        ))}
                                   </div>

                              }
                         </Box>

                    </div>
                    <Footer />
               </div>
          </>
     )
}
