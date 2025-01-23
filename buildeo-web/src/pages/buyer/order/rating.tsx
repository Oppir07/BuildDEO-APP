import Swal from "sweetalert2";
import DynamicRating from "../../../Components/Ui/rating";
import { useState } from "react";

export default function FormRating() {
       const [value, setValue] = useState('one');
       const toOnprogress = () => {
               Swal.fire({
                    title: " Successful",
                    text: "You have successfully give rating!",
                    icon: "success",
                    confirmButtonText: "OK",
               }).then(() => {
                    setValue('three')
     
               });
          };
  return (
     <>
          <form action="">
                   <div className="">
                         <div className="font-bold text-[18px]"> Give Your Rate </div>
                         <div className="border flex justify-center p-4">
                              <DynamicRating defaultValue={0}   />
                         </div>
                   </div>
                   <div className="mt-5">
                         <div className="font-bold text-[18px]"> Write Your Review </div>
                         <textarea className="border w-full p-2  " name="" id=""></textarea>
                   </div>
                   <div className="mt-6">
                         <button onClick={toOnprogress} className="bg-[#E31E24] text-white w-full text-center p-3  rounded-[10px] " >Submit</button>
                   </div>
          </form>
     </>
  )
}
