import Footer from "../../../Components/Ui/footer";
import NavbarSearch from "../../../Components/Ui/headerSearhc";
import cover from "../../../../public/cover.png";
import { Box, Tab, Tabs } from "@mui/material";
import media from "../../../../public/Media.png";
import Card from "../../../Components/Ui/cardMenu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../Components/Ui/avatar";
import DynamicRating from "../../../Components/Ui/rating";
import { EyeIcon } from "lucide-react";
import NotestIcon from "../../../Components/Icon/NotesIcon";
import TrashIcon from "../../../Components/Icon/TrashIcon";
import PaymentMethod from "../../../Components/Ui/payment";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../../../api/config"; // Import the API base URL
import React, { useEffect, useState } from "react";

export default function HomeCompanyPage() {
  const [value, setValue] = useState("one");
  const [user, setUser] = useState<any>(null); // State to hold user data
  const [services, setServices] = useState<any[]>([]); // State to hold services

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const navigate = useNavigate(); // For navigation

  
  const token = localStorage.getItem("access_token");
  const userId = JSON.parse(localStorage.getItem("user") || "{}").id; // Retrieve user ID from localStorage

  const text = "So lovely paint! I couldn't be happier with the results...";
  const maxLength = 30;

  // Function to delete a service
const handleDelete = async (serviceId: string) => {
  const confirmed = window.confirm('Are you sure you want to delete this service?');
  if (confirmed) {
    try {
      const response = await fetch(`${API_BASE_URL}/services/${serviceId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Include token if needed
        },
      });

      const response2 = await fetch(`${API_BASE_URL}/services/photos/${serviceId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Include token if needed
        },
      });

      if (response.ok && response2.ok) {
        alert('Service deleted successfully!');
        // Optionally, you can remove the service from the state here
        setServices((prevServices) => prevServices.filter(service => service.id !== serviceId));
      } else {
        alert('Failed to delete service.');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Failed to delete service.');
    }
  }
};


  

  useEffect(() => {
    const fetchUserData = async () => {
            if (token && userId) {
        try {
          const response = await fetch(`${API_BASE_URL}/users/${userId}`);
          const data = await response.json();
          setUser(data); // Set user data
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    const fetchSellerServices = async () => {
      console.log("user id : "+userId)
      console.log("token : "+token)
      if (token && userId) {
        try {
          const response = await fetch(
            `${API_BASE_URL}/services/seller/${userId}`
          );
          const serviceData = await response.json();

          console.log("data service: "+serviceData);
          setServices(serviceData); // Set services data
        } catch (error) {
          console.error("Error fetching services:", error);
          console.log("errorr")
        }
      }
    };

    fetchUserData();
    fetchSellerServices();
  }, []);

  if (!user) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  return (
    <>
      <div className="">
        <NavbarSearch text="black" color="black" />
        <div className="md:ml-[80px] md:mr-[80px] ml-4 mr-4">
          <div className="md:text-[32px] text-[16px] font-bold mb-4">
            Your Company Information
          </div>
          <div className="flex flex-wrap mb-10 mt-[40px]">
            <div className="flex flex-col justify-center items-center  md:mr-[50px] md:justify-start items-start flex justify-center">
              <img src={cover} alt="" className="rounded-[250px]" />
              <button className="p-3 w-full bg-[#E31E24] mt-2 rounded-[25px] text-white font-bold">Change Profile Picture</button>
            </div>
            <div className="ml-[50px]">
              <table className="text-[20px]">
                <tr>
                  <td colSpan={2} className="font-bold">
                    {user.company_name}
                  </td>
                </tr>
                <tr>
                  <td className="w-[200px]">Email </td>
                  <td>: {user.email}</td>
                </tr>
                <tr>
                  <td>Phone Number </td>
                  <td>: {user.phone}</td>
                </tr>
                <tr>
                  <td>Type </td>
                  <td>: {user.id}</td>
                </tr>
                <tr>
                  <td>City </td>
                  <td>
                    : {user.street} - {user.post_number}
                  </td>
                </tr>
                <tr>
                  <td>Lontitude </td>
                  <td>
                    : ''
                  </td>
                </tr>
              </table>
            </div>
          </div>

          <Box sx={{ width: "100%" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              TabIndicatorProps={{
                style: { backgroundColor: "#FF460A", color: "#FF460A" },
              }}
              sx={{
                "& .MuiTab-root": { color: "#9A9A9D" },
                "& .Mui-selected": { color: "#FF460A" },
              }}
            >
              <Tab value="one" label="Your Service" />
              <Tab value="two" label="Review and Rating" />
              <Tab value="three" label="Manage Service" />
              <Tab value="four" label="Payment" />
              <Tab value="five" label="Buyer Offer" />
              <Tab value="six" label="Your Portfolio" />
            </Tabs>

            {value === "one" && (
              <div>
                <div className="mt-[20px] flex flex-wrap gap-[9px]">
                  {services.map((service, index) => (
                    <Card
                      key={index}
                      title={service.title}
                      company={user.firstname}
                      price={`${service.price}€`}
                      img={
                        service.photo
                          ? service.photo
                          : cover
                      } // Use service photo if available
                      link={`/home/craftman/product-detail/${service.id}`} // Link to service detail page
                    />
                  ))}
                </div>
              </div>
            )}

            {value === "two" && (
              <div>
                <div className=" mt-[20px] grid md:grid-cols-2 gap-3 bg-white shadow p-4 rounded-[5px]">
                  <div className="flex">
                    <div className="mr-10">
                      <img
                        src={media}
                        alt=""
                        className="w-[200px] h-[150px] rounded-[10px]"
                      />
                    </div>
                    <div className="text-[14px] flex flex-col justify-between">
                      <div className="font-bold text-[20px] ">
                        Lay LVT: up to 20 m²
                      </div>
                      <div className="flex justify-between text-[#9586A8] ">
                        <div className="">Item : 1</div>
                        <div className="">Price : 119€</div>
                      </div>
                      <div className="text-[#9586A8] mt-[50px]">
                        Total Price
                      </div>
                      <div className="text-[20px] font-bold">119€</div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="mr-4">
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          className="w-[50px] mr-10"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="">
                      <div className="text-[20px] font-bold">Maria Natalie</div>
                      <div className="flex items-center">
                        <div className="mr-[20px]">
                          <DynamicRating defaultValue={4.5} readOnly={true} />
                        </div>
                        <div className="text-[16px] text-[#9586A8]">
                          Jan 1 2024
                        </div>
                      </div>
                      <div className="text-justify">
                        {text.length > maxLength
                          ? `${text.slice(0, maxLength)}...`
                          : text}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {value === "three" && (
              <div>
                <div className="mt-[20px] bg-[#FEABB1] w-full flex items-center justify-between p-6">
                  <div className="">
                    <div className="font-bold text-[18px] md:text-[32px]">
                      Sell Your Skills
                    </div>
                    <div className="w-[200px]">
                      add service that people want the most
                    </div>
                  </div>
                  <div className="">
                    <button className="bg-[#E31E24] p-3 pl-6 pr-6 text-white rounded-[25px] font-medium" onClick={() => navigate(`/home/craftman/create-product`)}>
                      Add Service
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="font-bold text-[24px]">Service List</div>
                  <table className="w-full mt-[20px]">
                    <tr className=" text-[#9586A8] font-medium">
                      <td>Service Name</td>
                      <td>Service Sell</td>
                      <td>Manage Service</td>
                    </tr>
                    {services.map((service) => (
                      <tr className="">
                        <td className="md:w-[600px]">
                          <div className="">
                            <div className="flex flex-wrap mt-2">
                              <div className="mr-10">
                                <img
                                  src={
                                    service.photo
                                      ? service.photo
                                      : media
                                  }
                                  alt=""
                                  className="w-[100px] h-[100px] rounded-[10px]"
                                />
                              </div>
                              <div className="text-[14px] flex flex-col ">
                                <div className="font-bold md:text-[20px] ">
                                  {service.title}
                                </div>
                                <div className="text-[#9586A8] mt-[10px]">
                                  Added at :{" "}
                                  {new Date(
                                    service.created_at
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="font-bold text-black text-[24px]">
                            0
                          </div>
                        </td>
                        <td className="md:w-[200px] w-[100px]">
                          <div className="grid grid-cols-3 ">
                            <div className="">
                              {" "}
                              <Link
                                to={`/home/craftman/show-product/${service.id}`}
                              >
                                <EyeIcon color="black" />
                              </Link>
                            </div>
                            <div className="">
                              <Link
                                to={`/home/craftman/edit-product/${service.id}`}
                              >
                                <NotestIcon color="black" width={24} />
                              </Link>
                            </div>
                            <div onClick={() => handleDelete(service.id)} className="cursor-pointer">
              <TrashIcon color="black" width={24} />
            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </table>
                </div>
              </div>
            )}
            {value === "four" && (
              <div className="mt-[50px] mb-[100px]">
                <PaymentMethod />
              </div>
            )}
            {value === "five" && (
              <div>
                <div className="flex flex-wrap justify-between bg-white shadow p-4 rounded-[5px]">
                  <div className="flex">
                    <div className="mr-10">
                      <img
                        src={media}
                        alt=""
                        className="w-[200px] h-[150px] rounded-[10px]"
                      />
                    </div>
                    <div className="text-[14px] flex flex-col justify-between">
                      <div className="font-bold text-[20px] ">
                        Lay LVT: up to 20 m²
                      </div>
                      <div className="flex justify-between text-[#9586A8] ">
                        <div className="">Item : 1</div>
                        <div className="">Price : 119€</div>
                      </div>
                      <div className="text-[#9586A8] mt-[50px]">
                        Total Price
                      </div>
                      <div className="text-[20px] font-bold">119€</div>
                    </div>
                  </div>
                  <div className="md:ml-[100px] flex flex-col items-center justify-center">
                    <div className="flex flex-wrap font-bold">
                      <button className="bg-[#FFFFFF] text-[#E31E24] border border-[#E31E24] rounded-[40px] w-[150px] p-[7px]">
                        View Detail
                      </button>
                      <button className="bg-[#FFFFFF] text-[#E31E24] border border-[#E31E24] rounded-[40px] w-[150px] p-[7px] ml-6 md:ml-10">
                        Reject
                      </button>
                      <button className="bg-[#E31E24] text-white rounded-[40px] w-[150px] p-[7px] mt-2 md:mt-0 md:ml-10">
                        Accept
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {value === "six" && (
              <div>
                <div className="mt-[20px] bg-[#FEABB1] w-full flex items-center justify-between p-6">
                  <div className="">
                    <div className="font-bold text-[18px] md:text-[32px]">
                      Experience for Opportunity
                    </div>
                    <div className="w-[200px]">
                      add to your portfolio to convince potential buyers
                    </div>
                  </div>
                  <div className="">
                    <Link to={"/home/craftman/portfolio/create"}>
                      <button className="bg-[#E31E24] p-3 pl-6 pr-6 text-white rounded-[25px] font-medium">
                        Add Portfolio
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="font-bold text-[24px]">Project List</div>
                  <table className="w-full">
                    <tr className=" text-[#9586A8] font-medium">
                      <td>Project Name</td>
                      <td>Project Duration</td>
                      <td>Manage Service</td>
                    </tr>
                    <tr>
                      <td className="md:w-[600px]">
                        <div className="">
                          <div className="flex flex-wrap">
                            <div className="mr-10">
                              <img
                                src={media}
                                alt=""
                                className="w-[100px] h-[100px] rounded-[10px]"
                              />
                            </div>
                            <div className="text-[14px] flex flex-col ">
                              <div className="font-bold md:text-[20px] ">
                                Lay LVT: up to 20 m²
                              </div>
                              <div className="text-[#9586A8] mt-[10px]">
                                added at : January 20 2024
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="font-bold text-black text-[24px]">
                          30 Day
                        </div>
                      </td>
                      <td className="md:w-[200px] w-[100px]">
                        <div className="grid grid-cols-3 ">
                          <div className="">
                            {" "}
                            <Link to={"/home/craftman/portfolio/detail"}>
                              <EyeIcon color="black" />
                            </Link>
                          </div>
                          <div className="">
                            <Link to={"/home/craftman/portfolio/edit"}>
                              <NotestIcon color="black" width={24} />
                            </Link>
                          </div>
                          <div className="">
                            <TrashIcon color="black" width={24} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            )}
          </Box>
        </div>

        <Footer />
      </div>
    </>
  );
}
