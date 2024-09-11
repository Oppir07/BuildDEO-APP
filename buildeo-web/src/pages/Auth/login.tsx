import { Link } from 'react-router-dom'
import logo from '../../../public/logo.png'
import { Input } from '../../Components/Ui/input'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function LoginPage() {

     const [isCraftman, setIsCraftman] = useState(true);
     const navigate = useNavigate();

     const handleClick = (event: { preventDefault: () => void; }) => {
          event.preventDefault(); 
          setIsCraftman(!isCraftman);
        };

     const regist = () =>{
          navigate('/register');
     }
     const home = () =>{
          navigate('/home');
     }

     return (
          <>
               <div className="bg">
                    <div className="flex">
                         <div className="bg-black w-1/3 bg-opacity-40 h-screen flex flex-col items-center justify-center">
                              <img src={logo} alt="" className='w-[150px]' />
                              <div className="text-[30px] text-white font-bold w-[331px] mt-[49px] leading-tight">
                                   We are looking for builders who want to save money
                              </div>
                         </div>
                         <div className="w-2/3 flex items-center justify-center ml-[120px]">
                              <div className="bg-white rounded-[30px] p-[29px] w-[450px]">
                                   <div className="text-[#FF460A] text-[30px] font-bold text-center">Login</div>



                                   <div className="text-[14px] text-center mt-[15px]">
                                   <div>
                                             Already registered in another role, 
                                             <button
                                                  className='text-[#FF460A] bg-transparent font-bold border-none cursor-pointer'
                                                  onClick={handleClick}
                                             >
                                                  {isCraftman ? ' Login as craftman' : ' Login as buyer'}
                                             </button>
                                        </div>

                                   </div>

                                   <form action="">
                                        <div className="mt-[25px]">
                                             <Input placeholder='e-mail' type='email' className=' bg-white h-[50px] rounded-[15px] pl-[26px] text-[16px]' />
                                        </div>
                                        <div className="mt-[13px]">
                                             <Input placeholder='password' type='password' className='bg-white h-[50px] rounded-[15px] pl-[26px] text-[16px]' />
                                        </div>
                                        <div className="text-end text-[#FF460A] font-bold mt-[37px] mb-[37px]">
                                             <Link to={''} className='text-end'>
                                                  Passwort vergessen?
                                             </Link>
                                        </div>
                                        <div className="">
                                             <button onClick={home} className='bg-[#FF460A] font-bold rounded-[40px] text-white text-center w-full'>
                                                  <div className="p-4">Login</div>
                                             </button>
                                        </div>
                                   </form>
                                   <div className="flex items-center m-4">
                                        <div className="flex-grow border-t border-black"></div>
                                        <span className="mx-4 text-black">Sie haben kein Konto?</span>
                                        <div className="flex-grow border-t border-black"></div>
                                   </div>
                                   <div className="">
                                        <button onClick={regist} className='bg-white text-[#FF460A] font-bold rounded-[40px] border border-[#FF460A] text-center w-full'>
                                             <div className="p-4">Registrieren</div>
                                        </button>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>

          </>
     )
}