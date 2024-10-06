import React, { useState, useEffect } from "react";
import NavbarSearch from "../../../Components/Ui/headerSearhc";
import Footer from "../../../Components/Ui/footer";
import API_BASE_URL from "../../../api/config";
import Check from "../../../../public/Auth/check.png";
import { useNavigate } from "react-router-dom";

export default function CreateProductPage() {
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState(0);
  const [serviceDescription, setServiceDescription] = useState("");
  const [serviceImageUrl, setServiceImageUrl] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState(1);
  const [serviceImage, setServiceImage] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/categories`);
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setErrorMessage("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const handleAddService = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = localStorage.getItem("access_token");
    const userId = JSON.parse(localStorage.getItem("user") || "{}").id;

    if (!token || !userId) {
      console.error("Token or user ID is missing.");
      return;
    }

    // Create a plain object to hold the service data (JSON format)
    const serviceData = {
      seller_id: userId,
      category_id: categoryId,
      title: serviceName,
      description: serviceDescription,
      price: servicePrice, // Will remain as integer
      created_by: userId,
      updated_by: userId,
    };

    try {
      // Send the request to create the service
      const serviceResponse = await fetch(`${API_BASE_URL}/services`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Send as JSON
        },
        body: JSON.stringify(serviceData),
      });

      if (!serviceResponse.ok) {
        const errorText = await serviceResponse.text();
        console.error("Service response error:", errorText);
        return;
      }

      const serviceResult = await serviceResponse.json();
      const serviceId = serviceResult.id;

      console.log("image url : " + serviceImage);

      // Handle the photo upload if a service image exists
      if (serviceImage) {
        const formData = new FormData();
        formData.append("service_id", String(serviceId)); // Convert service_id to string
        formData.append("photo", serviceImage); // Append the image file directly
        formData.append("created_by", String(userId)); // Convert userId to string
        formData.append("updated_by", String(userId)); // Convert userId to string

        for (var pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }

        const photoResponse = await fetch(`${API_BASE_URL}/services/photos`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // No need to set Content-Type here, browser will handle it
          },
          body: formData, // Send FormData instead of JSON
        });

        if (!photoResponse.ok) {
          const errorText = await photoResponse.text();
          console.error("Photo response error:", errorText);
          throw new Error(`Error saving photo: ${photoResponse.statusText}`);
        }
      }

      // Clear form fields after successful submission
      setServiceName("");
      setServicePrice(0);
      setServiceDescription("");
      setServiceImageUrl("");
      setCategoryId(1);
      setErrorMessage("");

      navigate("/home/craftman");

      setShowAlert(true);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(
          error.message || "An error occurred while adding the service."
        );
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

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

  return (
    <>
      <div>
        <NavbarSearch text="black" color="black" />
        <div className="ml-[80px] mr-[80px]">
          <div className="text-[32px] font-bold">Add Service</div>
          <div className="text-[16px]">Make sure to fill it correctly</div>
          <form onSubmit={handleAddService}>
            <div className="flex w-full p-3">
              <div className="bg-[#FFFF] flex justify-center items-center p-2 h-[230px] w-[250px]">
                <div className="rounded mt-[70px]">
                  <img
                    src={serviceImage ? URL.createObjectURL(serviceImage) : ""}
                    className="h-[200px] w-[200px]"
                  />
                  <label
                    htmlFor="file-upload"
                    className="custom-file-upload mt-[10px] ml-[25px]"
                  >
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
                <input
                  type="text"
                  className="border border-[#E31E24] rounded-[10px] pl-4 p-2 w-full h-[45px] mt-[20px]"
                  placeholder="Service name"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                />
                <input
                  type="number"
                  className="border border-[#E31E24] rounded-[10px] pl-4 p-2 w-full h-[45px] mt-[20px]"
                  placeholder="Service price"
                  value={servicePrice}
                  onChange={(e) =>
                    setServicePrice(parseInt(e.target.value) || 0)
                  }
                />
                <textarea
                  className="border border-[#E31E24] rounded-[10px] pl-4 p-2 w-full mt-[20px]"
                  rows={5}
                  placeholder="Service description"
                  value={serviceDescription}
                  onChange={(e) => setServiceDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            {errorMessage && <div className="text-red-600">{errorMessage}</div>}
            <div className="flex justify-end mt-6 mb-8">
              <button
                type="submit"
                className="bg-[#E31E24] text-white rounded-[40px] w-[150px] p-[7px] ml-10"
              >
                Add service
              </button>
            </div>
          </form>
          {showAlert && (
            <div className="bg-white h-screen absolute top-0 left-0 right-0 flex flex-col items-center justify-center">
              <img src={Check} alt="checklist" className="h-[100px]" />
              <p className="mt-5 text-black font-semibold text-xl">
                Your product has been successfully added!
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
