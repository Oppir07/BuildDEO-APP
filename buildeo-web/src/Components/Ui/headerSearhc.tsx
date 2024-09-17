import logo from '../../../public/logoOrange.png'
import { Link } from 'react-router-dom'

import { useState } from "react";
import MenuIcon from "../Icon/MenuIcon";
import ProfileIcon from '../Icon/ProfileIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Input } from './input';
import MessageIcon from '../Icon/MessageIcon';
import logow from "../../../public/Buildeo.png";


interface BgProps {
     bg?: string;
     text?:string
}


export default function NavbarSearch({ bg, text }: BgProps) {
     const [navbar, setNavbar] = useState(false);

     const [isLoggedIn] = useState(true);
     return (
          <div className={`navbar flex flex-wrap items-center justify-between pl-4 pr-4 ${text ? text : 'text-white'} text-[12px] z-[9] ${bg ? bg : 'bg-[#FFFFFF]'}`}>
               <div className="md:flex p-1  md:items w-full">
                    <div className="flex mb-4 md:mr-20  items-center justify-between align-items-start">
                         {isLoggedIn ? (
                              <img src={logo} alt="buildeo.jpg"
                                   width={163} height={32} className='p-4 md:mr-35 ' />
                         ) : (
                              <img
                                   src={logow}
                                   alt="buildeo.jpg"
                                   width={163}
                                   height={32}
                                   className="p-4 md:mr-35 "
                              />

                         )}
                         <div className="md:hidden flex mt-5  justify-end self-end " style={{ alignSelf: 'flex-start' }}>

                              <button onClick={() => setNavbar(!navbar)}>
                                   {navbar ? (
                                        <MenuIcon width={32} height={24} color={'white'} />
                                   ) : (
                                        <MenuIcon width={32} height={24} color={'white'} />
                                   )}
                              </button>
                         </div>
                    </div>
                    <div className="mb-6 flex items-center self-center">
                         <div className={`flex flex-col gap-[50px] text-left md:text-right text-[15px] md:flex md:items-center space-x-0 md:space-x-12   md:flex-row ${navbar ? "flex" : "hidden"
                              }`}>

                              {isLoggedIn ? (
                                   <>
                                        <div className="flex justify-center mt-[20px]">
                                             <div className="relative w-[300px]">
                                                  <FontAwesomeIcon icon={faSearch} className="absolute top-[13px] left-[20px] " color="black" />
                                                  <Input
                                                       placeholder="search"
                                                       className="pl-[49px] text-black font-medium rounded-[10px] h-[40px] border border-[#737B7D] border-[1.5px]"
                                                  />
                                             </div>
                                        </div>
                                   </>
                              ) :
                                   (<><div className="w-[300px]"></div></>)

                              }

                              <div className=" md:mt-5 font-bold">
                                   <Link to={'/home'}>
                                        Home
                                   </Link>
                              </div>
                              <div className=" md:mt-5 font-bold">
                                   <Link to={''}>
                                        Favorable Offer
                                   </Link>
                              </div>
                              {isLoggedIn ? (
                                   <>
                                        <div className="md:mt-5">
                                             <Link to={''}>
                                                  <MessageIcon width={20} color='black' />
                                             </Link>
                                        </div>
                                        <div className="md:mt-5">
                                             <Link to={''}>
                                                  <ProfileIcon width={20} color='black' />
                                             </Link>
                                        </div>
                                   </>
                              ) : (
                                   <>
                                        <div className="md:mt-5">
                                             <button className='bg-[#FFFFFF] text-[#E31E24] border border-[#E31E24] rounded-[5px] w-[80px] p-[7px]'>Register</button>

                                        </div>
                                        <div className="md:mt-5">
                                             <button className='bg-[#E31E24] text-white rounded-[5px] w-[80px] p-[7px] '> Login</button>
                                        </div>
                                   </>
                              )}
                         </div>
                    </div>

               </div>
          </div>
     )
}
