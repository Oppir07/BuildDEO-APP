import NavbarSearch from "../../../Components/Ui/headerSearhc";
import Footer from "../../../Components/Ui/footer";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_BASE_URL from "../../../api/config"; // Import the API base URL
import cover from "../../../../public/cover.png";
import Check from "../../../../public/Auth/check.png"; // Ensure to import the check image

export default function EditProductPage() {
  const { id } = useParams(); // Get the service ID from the URL
  const [service, setService] = useState<any>(null); // State to hold service data
  const navigate = useNavigate(); // For navigation after editing
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/services/${id}`);
        const data = await response.json();
        setService(data); // Set service data
      } catch (error) {
        console.error("Error fetching service details:", error);
      }
    };

    fetchServiceDetail();
  }, [id]);

  const handleUpdateService = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    const token = localStorage.getItem("access_token");
    const userId = JSON.parse(localStorage.getItem("user") || "{}").id; // Retrieve user ID from localStorage

    if (!token || !userId) {
      console.error("Token or user ID is missing.");
      return;
    }

    const updatedService = {
      seller_id: service.seller_id,
      category_id: service.category_id,
      title: service.title,
      description: service.description,
      price: service.price,
      updated_by: userId,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/services/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass token in headers
        },
        body: JSON.stringify(updatedService), // Convert to JSON string
      });

      if (!response.ok) {
        throw new Error(`Error updating service: ${response.statusText}`);
      }

      setShowAlert(true); // Show alert on successful update
      setTimeout(() => {
        navigate("/home/craftman"); // Navigate after a short delay
      }, 2000); // Delay for 2 seconds before navigating
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false); // Close the alert
  };

  if (!service) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  return (
    <>
      <div className="">
        <NavbarSearch text="black" color="black" />
        <div className="ml-[80px] mr-[80px]">
          <div className="text-[32px] font-bold">Edit Data Service</div>
          <div className="text-[16px]">Make sure to fill it correctly</div>
          <form onSubmit={handleUpdateService}>
            <div className="flex w-full p-3">
              <div className="bg-[#ffff] flex justify-center items-center h-[230px] ">
                <div className="rounded mt-[50px]">
                  <img src={service.photos[0] || cover} alt="" className="h-[200px]" />
                  <label htmlFor="file-upload" className="custom-file-upload mt-4 ml-[25px]">
                    Choose an Image
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    style={{ display: "none", height: 12 }}
                    className="h-[4px]"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col justify-between ml-[100px]">
                <div className="">
                  <input
                    type="text"
                    className="border border-[#E31E24] rounded-[10px] pl-4 p-2 w-full h-[45px]"
                    value={service.title}
                    onChange={(e) => setService({ ...service, title: e.target.value })} // Update title on change
                  />
                </div>
                <div className="mt-[20px]">
                  <input
                    type="number"
                    className="border border-[#E31E24] rounded-[10px] pl-4 p-2 w-full h-[45px]"
                    value={service.price}
                    onChange={(e) => setService({ ...service, price: parseInt(e.target.value) })} // Update price on change
                  />
                </div>
                <div className="mt-[20px]">
                  <textarea
                    className="border border-[#E31E24] rounded-[10px] pl-4 p-2 w-full"
                    rows={5}
                    value={service.description || ""}
                    onChange={(e) => setService({ ...service, description: e.target.value })} // Update description on change
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6 mb-8">
              <div className="flex font-bold">
                <Link to={"/home/craftman"}>
                  <button type="button" className="bg-[#FFFFFF] text-[#E31E24] border border-[#E31E24] rounded-[40px] w-[150px] p-[7px]">
                    Cancel
                  </button>
                </Link>
                <button type="submit" className="bg-[#E31E24] text-white rounded-[40px] w-[150px] p-[7px] ml-10">
                  Edit service
                </button>
              </div>
            </div>
          </form>
          {showAlert && (
            <div className="bg-white h-screen absolute top-0 left-0 right-0 flex flex-col items-center justify-center">
              <img src={Check} alt="checklist" className="h-[100px]" />
              <p className="mt-5 text-black font-semibold text-xl">
                Your product successfully edited!
              </p>
              <button
                onClick={handleAlertClose}
                className="bg-[#FF460A] font-bold rounded-[30px] text-white py-[15px] w-[200px] mt-5"
              >
                Continue
              </button>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}
