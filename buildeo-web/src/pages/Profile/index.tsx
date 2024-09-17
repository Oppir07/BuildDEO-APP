import NavbarSearch from '../../Components/Ui/headerSearhc'
import Footer from '../../Components/Ui/footer'
import cover from '../../../public/cover.png'
import PaymentMethod from '../../Components/Ui/payment'
import React, { useEffect, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import media from '../../../public/Media.png'
import API_BASE_URL from "../../api/config"; // Import the API base URL



export default function ProfilePage() {
  const [value, setValue] = useState('one');
  const [user, setUser] = useState<any>(null);  // State to hold user data

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("access_token");
      const userId = JSON.parse(localStorage.getItem("user") || "{}").id;  // Retrieve user ID from localStorage
      
      if (token && userId) {
        try {
          
          console.log("user_id:",userId)
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
      <NavbarSearch />
      <div className="mt-[10px] ml-[80px] mr-[80px] mb-[50px]">
        <div className="text-[32px] font-bold mb-4">Personal Information</div>
        <div className="flex flex-wrap mb-10">
          <div className="mr-[50px]">
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
            }
          </Box>
      </div>
      <Footer />
    </div>
  );
}