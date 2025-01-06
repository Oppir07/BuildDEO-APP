import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import  { useState } from "react";
import Swal from "sweetalert2";

export default function FormEditQuotation() {
     const [selectedValue, setSelectedValue] = useState('');
     
     const handleSave = () => {
          Swal.fire({
            title: "Success!",
            text: "Your changes have been saved.",
            icon: "success",
            confirmButtonText: "Continue",
            confirmButtonColor: "#2C3E50", 
          });
        };

     return (
          <div className="">
               <form action="">
                    <div className="form">
                         <p className="font-medium">Name</p>
                         <Input type="text" placeholder="Name" />
                    </div>
                    <div className="form mt-2">
                         <p className="font-medium">Email</p>
                         <Input type="email" placeholder="Email" />
                    </div>
                    <div className="form mt-2">
                         <p className="font-medium">Phone</p>
                         <Input type="number" placeholder="Phone" />
                    </div>
                    <div className="form mt-2">
                         <p className="font-medium">Address</p>
                         <Input type="text" placeholder="Adress" />
                    </div>
                    <div className="form mt-2">
                         <p className="font-medium">Email</p>
                         <Input placeholder="Email" />
                    </div>
                    <div className="form mt-2">
                         <p className="font-medium">Status</p>
                         <Select onValueChange={(value) => setSelectedValue(value)}>
                              <SelectTrigger>
                                   <span>{selectedValue || 'Pilih Status'}</span>
                              </SelectTrigger>
                              <SelectContent>
                                   <SelectItem value="On Progress">On Progress</SelectItem>
                                   <SelectItem value="Completed">Completed</SelectItem>
                                   <SelectItem value="Pending">Pending</SelectItem>
                              </SelectContent>
                         </Select>
                    </div>
                    <div className="form mt-2">
                         <p className="font-medium">Document Url</p>
                         <Input placeholder="url" />
                    </div>
                    <div className="form mt-2">
                         <p className="font-medium">Admin Notes</p>
                         <Textarea>

                         </Textarea>
                    </div>
                    <div className="flex justify-end">
                         <div className="flex ">
                              <div className=""><button  className="m-2 w-[200px] text-[#2C3E50] font-bold border border-[#2C3E50] p-2 rounded-[45px]">Back</button></div>
                              <div className=""><button onClick={handleSave} className="m-2 w-[200px] font-bold bg-[#2C3E50] text-white p-2 rounded-[45px]">Save</button></div>
                         </div>
                    </div>
               </form>
          </div>
     )
}
