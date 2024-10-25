import Footer from "../../Components/Ui/footer";
import NavbarSearch from "../../Components/Ui/headerSearhc";
import FileIcon from "../../Components/Icon/FilIcon";
import { useNavigate } from "react-router-dom";
import Check from "/Auth/check.png";
import logo from "/logoOrange.png";
import API_BASE_URL from "../../api/config"; // Import the API base URL
import React, { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
  description: string;
  services: Service[];
  created_at: string;
  updated_at: string;
}

interface Service {
  id: number;
  seller_id: number;
  category_id: number;
  title: string;
  description: string;
  price: number;
  photo: string;
  created_at: string;
  updated_at: string;
}

export default function DocumentPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]); // State to store fetched categories
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // State to store selected category

  // Fetch categories with services
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/categories`); // API call to fetch categories with services
        const data: Category[] = await response.json(); // Define the type of data
        setCategories(data); // Set the fetched categories to state
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Handle file selection via browse button
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Handle drag-and-drop functionality
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Prevent default to allow dropping
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleAlertClose = () => {
    setShowAlert(false);
    navigate("/home");
  };

  const send = () => {
    setShowAlert(true);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value); // Set the selected category
  };

  return (
    <div>
      <NavbarSearch text="black" logoOrange={logo} color="black" />
      <div className="md:ml-[80px] md:mr-[80px] ml-4 mr-4">
        <div className="">
          <div className="md:text-[32px] text-[20px] font-bold">
            In 1 minute at the cheapest price
          </div>
          <div className="">
            Send your previous offer and BUILDEO will help you find better prices
          </div>
          <div className="">
            <select
              name="category"
              id="category"
              className="w-full border p-2 rounded mt-2"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-10">
            <div
              className="border border-dashed rounded mt-4 w-full p-6 text-[18px] flex flex-col items-center justify-center"
              onDrop={handleDrop} // Handle drop event
              onDragOver={handleDragOver} // Handle drag-over event
            >
              <FileIcon color="#E31E24" height={58} width={68} />
              <div>Drag and Drop File here</div>
              <div>Or</div>
              <div>
                <input
                  type="file"
                  id="fileInput"
                  className="hidden" // Hidden input for file browsing
                  onChange={handleFileChange}
                />
                <label htmlFor="fileInput">
                  <button className="bg-[#E31E24] pl-4 pr-4 p-2 text-white rounded-[45px]">
                    Browse File
                  </button>
                </label>
              </div>
              <div>Formats: zip, jpg, png, pdf, or ms.word</div>

              {/* Show the name of the selected file if it exists */}
              {selectedFile && (
                <div className="mt-4 text-[#E31E24]">
                  Selected File: {selectedFile.name}
                </div>
              )}
            </div>
            <div className=" flex flex-col md:items-end items-center mt-4 md:justify-end justify-center">
              <div className="flex font-bold">
                <button className="bg-[#FFFFFF] text-[#E31E24] border border-[#E31E24] rounded-[40px] w-[150px] p-[7px]">
                  Cancel
                </button>
                <button
                  className="bg-[#E31E24] text-white rounded-[40px] w-[150px] p-[7px] ml-10"
                  onClick={send}
                >
                  Send offer
                </button>
              </div>
            </div>

            <div className="text-[20px] mt-10 md:mt-0 md:text-[32px] font-bold">
              Don't have an offer yet?
            </div>
            <div className="">
              Tell what project you want to make, BUILDEO will help find better prices
            </div>
            <textarea
              placeholder="Short description of your project"
              name=""
              id=""
              rows={7}
              className="border border-[#E31E24] w-full p-2 rounded mt-2"
            ></textarea>
            <div className=" flex flex-col md:items-end items-center mt-4 md:justify-end justify-center">
              <div className="flex font-bold">
                <button className="bg-[#FFFFFF] text-[#E31E24] border border-[#E31E24] rounded-[40px] w-[150px] p-[7px]">
                  Cancel
                </button>
                <button
                  className="bg-[#E31E24] text-white rounded-[40px] w-[150px] p-[7px] ml-10"
                  onClick={send}
                >
                  Send offer
                </button>
              </div>
            </div>
          </div>
        </div>

        {showAlert && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex flex-col items-center bg-white p-6 rounded-lg w-[300px]">
              <img src={Check} alt="" className="w-[100px] fade-in" />
              <p className="mt-2 text-center">
                The Cheapest Offer will be sent
              </p>
              <div className="mt-4 ">
                <button
                  onClick={handleAlertClose}
                  className="bg-[#E31E24] text-white w-[250px] p-2 rounded-[15px]"
                >
                  Continue
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
