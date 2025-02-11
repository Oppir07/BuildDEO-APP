import Footer from '../../../Components/Ui/footer'
import media from '/Media.png';
import NavbarSearch from '../../../Components/Ui/headerSearhc';
import logo from "../../../../public/logoOrange.png";
import { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import FormRating from './rating';
export default function OrdersPage() {
     const [value, setValue] = useState('one');
     const [show, setShow] = useState(false);
     const [showAlert, setShowAlert] = useState(false);
     const navigate = useNavigate();
     const goRating = () => {
          setShowAlert(true);

     };
     const toShow = () => {
          setShow(!show);
     }
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
     const toDetail = () => {
          Swal.fire({
               title: " Successful",
               text: "You have successfully complete service!",
               icon: "success",
               confirmButtonText: "OK",
          }).then(() => {
               setValue('three');

          });
     };

     return (
          <>
               <div className="">
                    <NavbarSearch text="black" color="black" logoOrange={logo} />
                    <div className="md:ml-[80px] md:mr-[80px] mr-4 ml-4">
                         <div className="flex justify-between items-center">
                              <div className="text-[32px] font-bold">Orders</div>
                              <div className=""><button onClick={() => navigate('/menu')} className='text-white bg-[#E31E24] rounded-[10px] md:w-[150px] p-2'>+Add Order</button></div>
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
                                   <div>
                                        <div className="flex  bg-white shadow p-6 rounded-[5px]">
                                             <div className="mr-10"><img src={media} alt="" className='w-[186px] h-[150px] rounded-[10px]' /></div>
                                             <div className="w-full flex flex-col justify-between">
                                                  <div className="flex justify-between items-center">
                                                       <div className="font-bold text-[24px]">Services order 1</div>
                                                       <div className="text-[#808080]">1x</div>
                                                  </div>
                                                  <div className="text-[#808080]">17 January 2025</div>
                                                  <div className="text-[#FFAB00]">Waiting company approve...</div>
                                                  <div className="flex justify-between items-center">
                                                       <div className="font-bold text-[#E31E24] text-[24px]">Total 208€</div>
                                                       <div className="text-[#808080]"><a className='cursor-pointer' onClick={toShow}>See all <FontAwesomeIcon icon={faCaretDown} /></a></div>
                                                  </div>
                                             </div>
                                        </div>
                                        {/* component to hide if have more than 1 service */}
                                        {show &&
                                             <div className="mt-1">
                                                  <div className="flex ml-[100px] bg-white shadow p-4 rounded-[5px]">
                                                       <div className="mr-10"><img src={media} alt="" className='w-[186px] h-[150px] rounded-[10px]' /></div>
                                                       <div className="w-full flex flex-col justify-between">
                                                            <div className="flex justify-between items-center">
                                                                 <div className="font-bold text-[24px]">Painter</div>
                                                                 <div className="text-[#808080]">1x</div>
                                                            </div>
                                                            <div className="text-[#808080]">17 January 2025</div>
                                                            <div className="text-[#FFAB00]">Waiting company approve...</div>
                                                            <div className="flex justify-between items-center">
                                                                 <div className="font-bold text-[#E31E24] text-[24px]">218€</div>
                                                                 <div className="text-[#808080]"><button onClick={toOnprogrss} className='border text-[#E31E24] border-[#E31E24] p-2 w-[100px] rounded-[5px]'>Start</button></div>
                                                            </div>
                                                       </div>

                                                  </div>
                                             </div>
                                        }
                                        <div className="flex mt-2  bg-white shadow p-6 rounded-[5px]">
                                             <div className="mr-10"><img src={media} alt="" className='w-[186px] h-[150px] rounded-[10px]' /></div>
                                             <div className="w-full flex flex-col justify-between">
                                                  <div className="flex justify-between items-center">
                                                       <div className="font-bold text-[24px]">Services orde 2</div>
                                                       <div className="text-[#808080]">1x</div>
                                                  </div>
                                                  <div className="text-[#808080]">17 January 2025</div>
                                                  <div className="text-[#1ECC55]">Approved</div>
                                                  <div className="flex justify-between items-center">
                                                       <div className="font-bold text-[#E31E24] text-[24px]">Total 338€</div>
                                                       <div className="text-[#808080]"><button onClick={toOnprogrss} className='border text-[#E31E24] border-[#E31E24] p-2 w-[100px] rounded-[5px]'>Start</button></div>
                                                  </div>
                                             </div>
                                        </div>

                                   </div>
                              }
                              {value === 'two' &&
                                   <div>
                                        <div className="flex  bg-white shadow p-6 rounded-[5px]">
                                             <div className="mr-10"><img src={media} alt="" className='w-[186px] h-[150px] rounded-[10px]' /></div>
                                             <div className="w-full flex flex-col justify-between">
                                                  <div className="flex justify-between items-center">
                                                       <div className="font-bold text-[24px]">Services order 1</div>
                                                       <div className="text-[#808080]">1x</div>
                                                  </div>
                                                  <div className="text-[#808080]">17 January 2025</div>
                                                  <div className="flex justify-between items-center">
                                                       <div className="font-bold text-[#E31E24] text-[24px]">Total 208€</div>
                                                       <div className="text-[#808080]"><a className='cursor-pointer' onClick={toShow}>See all <FontAwesomeIcon icon={faCaretDown} /></a></div>
                                                  </div>
                                             </div>
                                        </div>
                                        {/* component to hide if have more than 1 service */}
                                        {show &&
                                             <div className="mt-1">
                                                  <div className="flex ml-[100px] bg-white shadow p-4 rounded-[5px]">
                                                       <div className="mr-10"><img src={media} alt="" className='w-[186px] h-[150px] rounded-[10px]' /></div>
                                                       <div className="w-full flex flex-col justify-between">
                                                            <div className="flex justify-between items-center">
                                                                 <div className="font-bold text-[24px]">Painter</div>
                                                                 <div className="text-[#808080]">1x</div>
                                                            </div>
                                                            <div className="text-[#808080]">17 January 2025</div>
                                                            <div className="flex justify-between items-center">
                                                                 <div className="font-bold text-[#E31E24] text-[24px]">218€</div>
                                                                 <div className="text-[#808080]"><button onClick={toComplete} className='border text-[#E31E24] border-[#E31E24] p-2 w-[100px] rounded-[5px]'>End</button></div>
                                                            </div>
                                                       </div>

                                                  </div>
                                             </div>
                                        }
                                         <a onClick={toDetail} className='cursor-pointer'>
                                         <div className="flex mt-2  bg-white shadow p-6 rounded-[5px]">
                                                  <div className="mr-10"><img src={media} alt="" className='w-[186px] h-[150px] rounded-[10px]' /></div>
                                                  <div className="w-full flex flex-col justify-between">
                                                       <div className="flex justify-between items-center">
                                                            <div className="font-bold text-[24px]">Services order 2</div>
                                                            <div className="text-[#808080]">1x</div>
                                                       </div>
                                                       <div className="text-[#808080]">17 January 2025</div>
                                                       <div className="flex justify-between items-center">
                                                            <div className="font-bold text-[#E31E24] text-[24px]">Total 338€</div>
                                                            <div className="text-[#808080]"><button onClick={toComplete} className='border text-[#E31E24] border-[#E31E24] p-2 w-[100px] rounded-[5px]'>End</button></div>
                                                       </div>
                                                  </div>
                                             </div>
                                         </a>
                                        <div className="flex mt-2  bg-white shadow p-6 rounded-[5px]">
                                             <div className="mr-10"><img src={media} alt="" className='w-[186px] h-[150px] rounded-[10px]' /></div>
                                             <div className="w-full flex flex-col justify-between">
                                                  <div className="flex justify-between items-center">
                                                       <div className="font-bold text-[24px]">Services order 2</div>
                                                       <div className="text-[#808080]">1x</div>
                                                  </div>
                                                  <div className="text-[#808080]">17 January 2025</div>
                                                  <div className="flex justify-between items-center">
                                                       <div className="font-bold text-[#E31E24] text-[24px]">Total 338€</div>
                                                       <div className="text-[#808080]"><button onClick={toComplete} className='border text-[#E31E24] border-[#E31E24] p-2 w-[100px] rounded-[5px]'>End</button></div>
                                                  </div>
                                             </div>
                                        </div>

                                   </div>
                              }{
                                   value === 'three' &&
                                   <div>
                                        <div className="flex  bg-white shadow p-6 rounded-[5px]">
                                             <div className="mr-10"><img src={media} alt="" className='w-[186px] h-[150px] rounded-[10px]' /></div>
                                             <div className="w-full flex flex-col justify-between">
                                                  <div className="flex justify-between items-center">
                                                       <div className="font-bold text-[24px]">Services order 1</div>
                                                       <div className="text-[#808080]">1x</div>
                                                  </div>
                                                  <div className="text-[#808080]">17 January 2025</div>
                                                  <div className="flex justify-between items-center">
                                                       <div className="font-bold text-[#E31E24] text-[24px]">Total 208€</div>
                                                       <div className="text-[#808080]"><a className='cursor-pointer' onClick={toShow}>See all <FontAwesomeIcon icon={faCaretDown} /></a></div>
                                                  </div>
                                             </div>
                                        </div>
                                        {/* component to hide if have more than 1 service */}
                                        {show &&
                                             <div className="mt-1">
                                                  <div className="flex ml-[100px] bg-white shadow p-4 rounded-[5px]">
                                                       <div className="mr-10"><img src={media} alt="" className='w-[186px] h-[150px] rounded-[10px]' /></div>
                                                       <div className="w-full flex flex-col justify-between">
                                                            <div className="flex justify-between items-center">
                                                                 <div className="font-bold text-[24px]">Painter </div>
                                                                 <div className="text-[#808080]">1x</div>
                                                            </div>
                                                            <div className="text-[#808080]">17 January 2025</div>
                                                            <div className="flex justify-between items-center">
                                                                 <div className="font-bold text-[#E31E24] text-[24px]">218€</div>
                                                                 <div className="text-[#808080]"><button onClick={goRating} className='border text-[#E31E24] border-[#E31E24] p-2 w-[100px] rounded-[5px]'>Give rating</button></div>
                                                            </div>
                                                       </div>

                                                  </div>
                                             </div>
                                        }
                                        <div className="flex mt-2  bg-white shadow p-6 rounded-[5px]">
                                             <div className="mr-10"><img src={media} alt="" className='w-[186px] h-[150px] rounded-[10px]' /></div>
                                             <div className="w-full flex flex-col justify-between">
                                                  <div className="flex justify-between items-center">
                                                       <div className="font-bold text-[24px]">Services order</div>
                                                       <div className="text-[#808080]">1x</div>
                                                  </div>
                                                  <div className="text-[#808080]">17 January 2025</div>
                                                  <div className="flex justify-between items-center">
                                                       <div className="font-bold text-[#E31E24] text-[24px]">Total 338€</div>
                                                       <div className="text-[#808080]"><button className='border text-[#E31E24] border-[#E31E24] p-2 w-[100px] rounded-[5px]'>Give rating</button></div>
                                                  </div>
                                             </div>
                                        </div>

                                        {/* modal for give rating  */}
                                        {showAlert &&
                                             <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                                  <div className="flex flex-col items- bg-white p-[70px] rounded-lg w-[500px]">
                                                       <FormRating />
                                                  </div>
                                             </div>
                                        }
                                   </div>
                              }
                         </Box>

                    </div>
                    <Footer />
               </div>
          </>
     )
}
