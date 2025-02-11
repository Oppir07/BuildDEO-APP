import NavbarSearch from "../../../Components/Ui/headerSearhc";
import Footer from "../../../Components/Ui/footer";
import media from '/Media.png'
import logo from "/logoOrange.png";
import { faCaretDown, faCircleQuestion, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PrinciplePage from "./principle";
import { API_BASE_URL } from "../../../api/config";
export default function ProfilePage() {
     const [show, setShow] = useState(false);
     const [user, setUser] = useState<any>(null)

     useEffect(() =>{
          const fetchUserData = async () =>{
               const token = localStorage.getItem("access_token");
               const userId = JSON.parse(localStorage.getItem("user") || "{}").id;

               if(token && userId){
                    try{
                         const response = await fetch(`${API_BASE_URL}/users/${userId}`,{
                              headers:{
                                   Authorization:`Bearer ${token}`,
                              },
                         });
                         const data = await response.json();
                         setUser(data);
                    }catch(err){
                         console.error("error :", err);
                    }

               }
          };
          fetchUserData();
     }, [])

     if (!user) {
          return <div>Loading...</div>;  
        }
      
     
const toShow = () =>{
          setShow(!show)
     }
     

     return (
          <>
               <div className="">
                    <NavbarSearch text='black' logoOrange={logo} color="black" />
                    <div className="md:ml-[80px] ml-[10px] md:mr-[80px] mr-[10px]">
                         <div className="text-[32px] font-bold">Personal Data</div>
                         <div className="flex">
                              <div className="">
                                   <div className="shadow p-4">
                                   <img src={media} alt="" className="rounded"/>
                                   <button className="w-full border mt-2 p-3 rounded">Select Image</button>
                                   </div>
                              </div>
                              <div className="w-full md:ml-[50px]">
                                   <div className="shadow p-4 text-[20px]">
                                        <table className="w-full">
                                             <tr className="">
                                                  <td>Name:</td>
                                                  <td>{user.firstname} &nbsp;{user.lastname}</td>
                                                  <td className="flex justify-center items-center border border-[2px] border-r-[#ffffff] border-t-[#ffffff] border-b-[#E31E24] border-l-[#E31E24]"><button><FontAwesomeIcon icon={faPen} color="#E31E24"/></button></td>
                                             </tr>
                                             <tr>
                                                  <td>Email:</td>
                                                  <td >{user.email}</td>
                                             </tr>
                                             <tr>
                                                  <td>No.Telp:</td>
                                                  <td >{user.phone}</td>
                                             </tr>
                                             <tr>
                                                  <td>Post name:</td>
                                                  <td >{user.post_number}</td>
                                             </tr>
                                             <tr>
                                                  <td>Street:</td>
                                                  <td >{user.street}</td>
                                             </tr>
                                        </table>
                                   </div>
                                   <div className="shadow mt-4">
                                        <div className="p-4 ">
                                             <button onClick={toShow} className="flex justify-between p-2 w-full">
                                                  <div className=""><FontAwesomeIcon icon={faCircleQuestion} color="#E31E24"/> Terms & Conditions</div>
                                                  <div className=""><FontAwesomeIcon icon={faCaretDown}/></div>
                                             </button>
                                        </div>
                                        {show && 
                                             <div className="p-4">
                                                  <PrinciplePage/>
                                             </div>
                                        }
                                   </div>
                              </div>
                         </div>

                    </div>
                    <Footer />
               </div>
          </>
     )
}
