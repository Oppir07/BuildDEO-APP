import NavbarSearch from "../../../Components/Ui/headerSearhc";
import Footer from "../../../Components/Ui/footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import API_BASE_URL from "../../../api/config"; // Import the API base URL
import cover from "../../../../public/cover.png";
import Check from "../../../../public/Auth/check.png"; // Ensure to import the check image

export default function EditProductPage() {
  const { id } = useParams(); // Get the service ID from the URL
  const [service, setService] = useState<any>(null); // State to hold service data
  const [serviceImage, setServiceImage] = useState<File | string | null>(null); // State to hold service image
  const navigate = useNavigate(); // For navigation after editing
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Fetch service details
    const fetchServiceDetail = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/services/${id}`);
        const data = await response.json();
        setService(data); // Set service data

        // Fetch service photo
        const photoResponse = await fetch(`${API_BASE_URL}/services/photos/${id}`);
        const photoData = await photoResponse.json();
        if (photoData && photoData.photo_url) {
          setServiceImage(photoData.photo_url); // Set service image URL
        }
      } catch (error) {
        console.error("Error fetching service details or photo:", error);
      }
    };

    fetchServiceDetail();
  }, [id]);

  // Handle form submission to update service
  const handleUpdateService = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("access_token");
    const userId = JSON.parse(localStorage.getItem("user") || "{}").id;

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
      updated_by: userId, // Include updated_by in the service update
    };

    try {
      // Update the service details
      const response = await fetch(`${API_BASE_URL}/services/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedService),
      });

      if (!response.ok) {
        throw new Error(`Error updating service: ${response.statusText}`);
      }

      // Handle photo upload if a new image is selected
      if (serviceImage instanceof File) {
        const formData = new FormData();
        formData.append("photo", serviceImage); // Add photo
        formData.append("updated_by", String(userId)); // Add updated_by

        for (var pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }

        const photoResponse = await fetch(`${API_BASE_URL}/services/photos/${id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData, // Send FormData for the image
        });

        if (!photoResponse.ok) {
          throw new Error(`Error updating service photo: ${photoResponse.statusText}`);
        }
      }

      setShowAlert(true); // Show success alert
      setTimeout(() => {
        navigate("/home/craftman"); // Navigate after 2 seconds
      }, 2000);
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  // Handle image change for photo upload
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file && !file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      setServiceImage(null);
    } else {
      setServiceImage(file);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  if (!service) {
    return <div>Loading...</div>;
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
              <div className="bg-[#ffff] flex justify-center items-center h-[230px]">
                <div className="rounded mt-[50px]">
                  <img
                    src={
                      serviceImage instanceof File
                        ? URL.createObjectURL(serviceImage)
                        : serviceImage || cover // Default to cover if no image
                    }
                    alt="service"
                    className="h-[200px] w-[200px]"
                  />
                  <label htmlFor="file-upload" className="custom-file-upload mt-[10px] ml-[5px]">
                    Choose an Image
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              <div className="w-full flex flex-col justify-between ml-[100px]">
                <div className="">
                  <input
                    type="text"
                    className="border border-[#E31E24] rounded-[10px] pl-4 p-2 w-full h-[45px]"
                    value={service.title}
                    onChange={(e) => setService({ ...service, title: e.target.value })}
                  />
                </div>
                <div className="mt-[20px]">
                  <input
                    type="number"
                    className="border border-[#E31E24] rounded-[10px] pl-4 p-2 w-full h-[45px]"
                    value={service.price}
                    onChange={(e) => setService({ ...service, price: parseInt(e.target.value) })}
                  />
                </div>
                <div className="mt-[20px]">
                  <textarea
                    className="border border-[#E31E24] rounded-[10px] pl-4 p-2 w-full"
                    rows={5}
                    value={service.description || ""}
                    onChange={(e) => setService({ ...service, description: e.target.value })}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6 mb-8">
              <div className="flex font-bold">
                <Link to={"/home/craftman"}>
                  <button
                    type="button"
                    className="bg-[#FFFFFF] text-[#E31E24] border border-[#E31E24] rounded-[40px] w-[150px] p-[7px]"
                  >
                    Cancel
                  </button>
                </Link>
                <button
                  type="submit"
                  className="bg-[#E31E24] text-white rounded-[40px] w-[150px] p-[7px] ml-10"
                >
                  Edit service
                </button>
              </div>
            </div>
          </form>
          {showAlert && (
            <div className="bg-white h-screen absolute top-0 left-0 right-0 flex flex-col items-center justify-center">
              <img src={Check} alt="checklist" className="h-[100px]" />
              <p className="mt-5 text-black font-semibold text-xl">Your product successfully edited!</p>
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
