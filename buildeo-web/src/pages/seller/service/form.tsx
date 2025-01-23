import Swal from 'sweetalert2';
import { Input } from '../../../Components/Ui/input'
import { useNavigate } from 'react-router-dom';
export default function Form() {
     const navigate = useNavigate();

     const toOnprogress = (e: React.FormEvent) => {
          e.preventDefault();
               Swal.fire({
                    title: " Successful",
                    text: "You have successfully start service!",
                    icon: "success",
               }).then(() => {
                   navigate('/my-service')
     
               });
          };
     return (
          <div className='bg-white shadow m-[50px] p-6'>
               <form action="">
                    <div className="font-bold text-[32px]">What service do you provide?</div>
                    <div className="">
                         <div className="text-[20px] mt-[22px]">
                              <div className="">Service Title</div>
                              <Input placeholder='Type here..' className='p-[30px] text-[20px] mt-[15px]' />
                         </div>
                         <div className="text-[20px] mt-[22px]">
                              <div className="">Service Price</div>
                              <Input placeholder='€ Type here..' className='p-[30px] text-[20px] mt-[15px]' />
                         </div>
                         
                         <div className="text-[20px] mt-[22px]">
                              <div className="">Overview</div>
                              <Input placeholder='Describe your service' className='p-[30px] text-[20px] mt-[15px]' />
                         </div>
                         <div className="text-[20px] mt-[22px]">
                              <div className="">Service Image</div>
                              <Input type='file' placeholder='Describe your service' className='p-[30px] flex items-center  mt-[15px]' />
                         </div>
                         <div className="flex justify-end mt-4">
                              <button onClick={toOnprogress} className='bg-[#E31E24] text center w-[200px]  text-white p-4 rounded-[10px]'>Request</button>
                         </div>
                         
                    </div>
               </form>
          </div>
     )
}
