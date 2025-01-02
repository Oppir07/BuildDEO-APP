import Swal from 'sweetalert2';

export default function EditOffer() {
     const save = () =>{
          Swal.fire({
               title: "Good job!",
               text: "You clicked the button!",
               icon: "success"
             });
     }
  return (
    <>
          <form action="">
                    <div className="mt-2">
                         <label htmlFor="#sm">Service Name</label><br />
                         <input type="text" id="sm" placeholder="service name" className="border w-full rounded p-2" />
                    </div>
                    <div className="mt-2">
                         <label htmlFor="#sm">Price</label><br />
                         <input type="number" id="sm" placeholder="$45" className="border w-full rounded p-2" />
                    </div>
                    <div className="mt-2">
                         <label htmlFor="#sm">Status</label><br />
                         <select name="" id=""  className="border w-full rounded p-2">
                              <option value="" selected>Completed</option>
                              <option value="">Uncompleted</option>
                         </select>
                    </div>
                    <div className="mt-2">
                         <label htmlFor="#sm" >Description</label><br />
                         <textarea name="" id="" rows={10}  className="border w-full rounded p-2"></textarea>
                    </div>
                    <div className="flex justify-end">
                         <div className="flex flex-wrap">
                         <div className=""><button  className="m-2 w-[100px] text-[#2C3E50] font-bold border border-[#2C3E50] p-2 rounded-[45px]">Back</button></div>
                         <div className=""><button onClick={save} className="m-2 w-[100px] font-bold bg-[#2C3E50] text-white p-2 rounded-[45px]">Save</button></div>
                         </div>
                    </div>

          </form>
    </>
  )
}
