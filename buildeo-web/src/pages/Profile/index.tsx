import NavbarSearch from '../../Components/Ui/headerSearhc'
import Footer from '../../Components/Ui/footer'
import cover from '../../../public/cover.png'
import PaymentMethod from '../../Components/Ui/payment'
import React, { useEffect, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import media from '../../../public/Media.png'
import API_BASE_URL from "../../api/config"; // Import the API base URL
import NotestIcon from '../../Components/Icon/NotesIcon';
import TrashIcon from '../../Components/Icon/TrashIcon';
import { EyeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Trash from '/trash.png'
import logo from "/logoOrange.png";


export default function ProfilePage() {
  const [value, setValue] = useState('one');
  const [user, setUser] = useState<any>(null);  // State to hold user data
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleAlertClose = () => {
    setShowAlert(false);
    navigate("/profile");
  };
  const remove = () => {
    setShowAlert(true);
   
  };


  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("access_token");
      const userId = JSON.parse(localStorage.getItem("user") || "{}").id;  // Retrieve user ID from localStorage

      if (token && userId) {
        try {

          console.log("user_id:", userId)
          const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,  // Pass token in headers
            },
          });
          const data = await response.json();
          setUser(data);  // Set user data
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;  // Show loading state while fetching
  }



  return (
    <div className="">
      <NavbarSearch text='black'logoOrange={logo}/>
      <div className="mt-[10px] ml-4 mr-4 md:ml-[80px] md:mr-[80px] mb-[50px]">
        <div className="text-[32px] font-bold mb-4">Personal Information</div>
        <div className="flex md:justify-start justify-center flex-wrap mb-10">
          <div className="md:mr-[50px]">
            <img src={cover} alt="" className="rounded-[10px]" />
          </div>
          <div className="">
            <table className='text-[20px]'>
              <tr>
                <td colSpan={2} className=' font-bold'>User Personal Data</td>
              </tr>
              <tr>
                <td className='w-[120px]'>Name</td>
                <td className='w-[450px]'>{user.firstname} {user.lastname}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>{user.street}, {user.post_number}</td>
              </tr>
            </table>
          </div>
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
            <Tab value="one" label="Payment" />
            <Tab value="two" label="Wishlist Item" />
            <Tab value="three" label="Your Orders" />
          </Tabs>
          {value === 'one' &&
            <div>
              <PaymentMethod />
            </div>
          }
          {value === 'two' &&
            <div>
              <div className="flex flex-wrap justify-between bg-white shadow p-4 rounded-[5px]">
                <div className="mr-10"><img src={media} alt="" className='w-[200px] h-[150px] rounded-[10px]' /></div>
                <div className="text-[14px] flex flex-col justify-between">
                  <div className="font-bold text-[20px] ">Lay LVT: up to 20 m²</div>
                  <div className="flex justify-between text-[#9586A8] "><div className="">Item : 1</div><div className="">Price :  119€</div></div>
                  <div className="text-[#9586A8] mt-[50px]">Total Price</div>
                  <div className="text-[20px] font-bold">119€</div>
                </div>
                <div className="md:ml-[100px] flex flex-col items-center justify-center">
                  <div className="flex font-bold">
                    <button className='bg-[#FFFFFF] text-[#E31E24] border border-[#E31E24] rounded-[40px] w-[150px] p-[7px]'>Give a Review</button>
                    <button className='bg-[#E31E24] text-white rounded-[40px] w-[150px] p-[7px] ml-10'>Re-Order</button>
                  </div>
                </div>
              </div>
            </div>
          }{
            value === 'three' &&
            <div>
              <div className="text-[32px] font-bold">
                Your Offer List
              </div>
              <div className="mt-[20px] bg-[#FEABB1] w-full flex items-center justify-between p-6">
                <div className=""><div className="font-bold text-[32px]">Make Your Dream Offer</div><div className="w-[200px]">add service that people want the most</div></div>
                <div className=""><Link to={'/favorable/document-buyer'}><button className="bg-[#E31E24] p-3 pl-6 pr-6 text-white rounded-[25px] font-medium">Add Offer</button></Link></div>
              </div>
              <div className="mt-4">
                <table className="w-full">
                  <tr className=" text-[#9586A8] font-medium">
                    <td className=''>Service Name</td>
                    <td className='text-end '>Manage Service</td>
                  </tr>
                  <tr>
                    <td className='text-end'>
                      <div className="">
                        <div className="flex">
                            <div className="text-[14px] flex flex-col ">
                            <div className="font-bold md:text-[20px] ">Lay LVT: up to 20 m²</div>
                            <div className="text-[#9586A8] mt-[1px]">added at : January 20 2024</div>
                          </div>
                        </div>
                      </div>
                    </td>
                
                    
                    <td className=''>
                      <div className="grid grid-cols-3 ">
                        <div className=""><Link to={'/favorable/document-buyer/detail/'}><EyeIcon color="black" /></Link></div>
                        <div className=""><Link to={'/favorable/document-buyer/edit/'}><NotestIcon color="black" width={24} /></Link></div>
                        <div className=""><button onClick={remove}><TrashIcon color="black" width={24} /></button></div>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          }
        </Box>

        {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col items-center bg-white p-6 rounded-lg w-[300px]">
            <img src={Trash} alt="" className="w-[100px] fade-in" />
            <p className="mt-2 text-center">
              Your account has been successfully created
            </p>
            <div className="mt-4 ">
              <button
                onClick={handleAlertClose}
                className="bg-[#E31E24] text-white w-[250px] p-2 rounded-[15px]"
              >
                Continue
              </button>
              <button
                onClick={handleAlertClose}
                className="bg-[#FFFFFF] w-full rounded-[15px] p-2 mt-2 text-[#E31E24] border border-[#E31E24]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
      <Footer />
    </div>
  );
}