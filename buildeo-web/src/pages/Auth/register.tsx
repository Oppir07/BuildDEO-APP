
import { useState } from "react";
import logo from "../../../public/logo.png";
import { Input } from "../../Components/Ui/input";
import { useNavigate } from "react-router-dom";
import Check from "../../../public/Auth/check.png";

// Define an interface for the formData
interface FormData {
     email: string;
     password: string;
     firstname: string;
     lastname: string;
     postNumber: string;
     street: string;
     phone: string;
     role: string;
     createdBy: number;
     updatedBy: number;
   }

export default function RegisterPage() {
     const [isCraftman, setIsCraftman] = useState(true);
     const [showAlert, setShowAlert] = useState(false);
     const navigate = useNavigate();

     const handleClick = (event: { preventDefault: () => void; }) => {
          event.preventDefault();
          setIsCraftman(!isCraftman);
     };

     const handleRegister = () => {
          setShowAlert(true);
     };

     const handleAlertClose = () => {
          setShowAlert(false);
          navigate('/home')
     };

     const login = () => {
          navigate('/');
     };

     return (
          <>
               <div className="bg">
                    <div className="flex">
                         <div className="bg-black w-1/3 bg-opacity-40 h-screen flex flex-col items-center justify-center">
                              <img src={logo} alt="Logo" className='w-[150px]' />
                              <div className="text-[30px] text-white font-bold w-[331px] mt-[49px] leading-tight">
                                   We are looking for builders who want to save money
                              </div>
                         </div>
                         <div className="w-2/3 flex items-center justify-center ml-[120px]">
                              <div className="bg-white rounded-[30px] p-[19px] w-[550px]">
                                   <div className="text-[#FF460A] text-[30px] font-bold text-center">Registrieren</div>
                                   <div className="text-[14px] text-center mt-[15px] mb-[15px]">
                                        <div>
                                             Want registered in another role,
                                             <button
                                                  className='text-[#FF460A] bg-transparent font-bold border-none cursor-pointer'
                                                  onClick={handleClick}
                                             >
                                                  {isCraftman ? ' Register as craftman' : ' Register as buyer'}
                                             </button>
                                        </div>
                                   </div>
                                   <form>
                                        <div className="md:grid md:grid-cols-2 gap-4">
                                             <Input placeholder='Vorname' className='border border-black h-[40px]' color='black' />
                                             <Input placeholder='Nachname' className='border border-black h-[40px]' />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 mt-6">
                                             <Input placeholder='Stadt' className='border border-black h-[40px]' />
                                             <Input placeholder='PLZ' className='border border-black h-[40px]' />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 mt-6">
                                             <Input placeholder='Straße' className='border border-black h-[40px]' />
                                             <Input placeholder='Telefonnummer' className='border border-black h-[40px]' />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 mt-6">
                                             <Input placeholder='e-mail' className='border border-black h-[40px]' />
                                             <Input placeholder='passwort' className='border border-black h-[40px]' />
                                        </div>
                                        <div className="mt-10 flex justify-center">
                                             <button
                                                  type="button"
                                                  onClick={handleRegister}
                                                  className='bg-[#FF460A] font-bold rounded-[40px] w-[448px] text-white text-center w-full'
                                             >
                                                  <div className="p-4">Registrieren</div>
                                             </button>
                                        </div>
                                   </form>
                                   <div className="flex justify-center">
                                        <div className="flex items-center m-4 w-[448px]">
                                             <div className="flex-grow border-t border-black"></div>
                                             <span className="mx-4 text-black">Sie haben bereits ein Konto?</span>
                                             <div className="flex-grow border-t border-black"></div>
                                        </div>
                                   </div>
                                   <div className="flex justify-center">
                                        <button
                                             onClick={login}
                                             className='w-[448px] bg-white text-[#FF460A] font-bold rounded-[40px] border border-[#FF460A] text-center w-full'
                                        >
                                             <div className="p-4">Login</div>
                                        </button>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>

      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col items-center bg-white p-6 rounded-lg w-[300px]">
            <img src={Check} alt="" className="w-[100px] fade-in" />
            <p className="mt-2 text-center">
              Your account has been successfully created
            </p>
            <div className="mt-4 ">
              <button
                onClick={handleAlertClose}
                className="bg-[#FF460A] text-white w-[250px] p-2 rounded-[15px]"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
