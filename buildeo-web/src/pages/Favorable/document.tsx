import Footer from "../../Components/Ui/footer";
import NavbarSearch from "../../Components/Ui/headerSearhc";
import FileIcon from "../../Components/Icon/FilIcon";
import { useNavigate } from "react-router-dom";
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
  const [description, setDescription] = useState<string>(""); // State to store description
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const navigate = useNavigate();

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
      const validFormats = [
        "application/pdf",
        "application/msword",
        "image/jpeg",
        "image/png",
        "application/zip",
      ];
      if (!validFormats.includes(file.type)) {
        alert(
          "Invalid file format. Accepted formats are zip, jpg, png, pdf, or ms.word."
        );
        return;
      }
      setSelectedFile(file);

      // Save only metadata to session storage
      const sessionData = JSON.parse(
        sessionStorage.getItem("temporaryData") || "{}"
      );
      sessionData.document_url = {
        name: file.name,
        type: file.type,
      };
      sessionStorage.setItem("temporaryData", JSON.stringify(sessionData)); // Use file.name or upload logic for actual URL
    }
  };

  // Handle drag-and-drop functionality
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      const validFormats = [
        "application/pdf",
        "application/msword",
        "image/jpeg",
        "image/png",
        "application/zip",
      ];
      if (!validFormats.includes(file.type)) {
        alert(
          "Invalid file format. Accepted formats are zip, jpg, png, pdf, or ms.word."
        );
        return;
      }

      setSelectedFile(file);

      // Save only metadata to session storage
      const sessionData = JSON.parse(
        sessionStorage.getItem("temporaryData") || "{}"
      );
      sessionData.document_url = {
        name: file.name,
        type: file.type,
      };
      sessionStorage.setItem("temporaryData", JSON.stringify(sessionData)); // Use file.name or upload logic for actual URL
    }
  };

  // Prevent default to allow dropping
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value); // Set the selected category
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value); // Set the description
  };

  const handleFirstSendOffer = async () => {
    // Add async here
    if (!selectedCategory || !selectedFile) {
      alert("Please select a category and upload a document.");
      return;
    }

    const categoryId = parseInt(selectedCategory, 10);
    if (isNaN(categoryId)) {
      alert("Invalid category selected.");
      return;
    }

    // Show loading state
    setLoading(true);

    // Upload the file to the server
    const formData = new FormData();
    formData.append("document_url", selectedFile);

    console.log("selectedFile : " + selectedFile);

    try {
      const uploadResponse = await fetch(`${API_BASE_URL}/quotation/upload`, {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload the file.");
      }

      const uploadedData = await uploadResponse.json();

      console.log("uploadedData : " + uploadedData);

      const fileUrl = uploadedData.file_url;

      const temporaryData = {
        category_id: categoryId,
        document_url: fileUrl,
      };

      sessionStorage.setItem("temporaryData", JSON.stringify(temporaryData));
      console.log("Temporary Data:", temporaryData);
      navigate("/favorable/document/profile/");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed.");
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  const handleSecondSendOffer = () => {
    if (!description.trim()) {
      alert("Please provide a description.");
      return;
    }
    const existingData = JSON.parse(
      sessionStorage.getItem("temporaryData") || "{}"
    );
    const updatedData = {
      ...existingData,
      description,
    };

    // Show loading state
    setLoading(true);

    sessionStorage.setItem("temporaryData", JSON.stringify(updatedData));
    console.log("Second Send Offer Temporary Data:", updatedData);
    navigate(`/favorable/document/profile/`);

    setLoading(false); // Hide loading state after navigation
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
            Send your previous offer and BUILDEO will help you find better
            prices
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
                <option key={category.id} value={category.id.toString()}>
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
              <br />
              <div>
                <input
                  type="file"
                  id="fileInput"
                  className="hidden" // Hidden input for file browsing
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="fileInput"
                  className="bg-[#E31E24] pl-4 pr-4 p-2 text-white rounded-[45px] cursor-pointer"
                >
                  Browse File
                </label>
              </div>
              <br />
              <div>Formats: zip, jpg, png, pdf, or ms.word</div>
              {selectedFile && (
                <div className="mt-4 text-[#00FF00]">
                  Selected File: {selectedFile.name}
                </div>
              )}
            </div>
            <div className="flex flex-col md:items-end items-center mt-4 md:justify-end justify-center">
              <div className="flex font-bold">
                <button className="bg-[#FFFFFF] text-[#E31E24] border border-[#E31E24] rounded-[40px] w-[150px] p-[7px]">
                  Cancel
                </button>
                <button
                  className="bg-[#E31E24] text-white rounded-[40px] w-[150px] p-[7px] ml-10"
                  onClick={handleFirstSendOffer} // Trigger first send offer
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Send offer"}
                </button>
              </div>
            </div>

            <div className="text-[20px] mt-10 md:mt-0 md:text-[32px] font-bold">
              Don't have an offer yet?
            </div>
            <div className="">
              Tell what project you want to make, BUILDEO will help find better
              prices
            </div>
            <textarea
              placeholder="Short description of your project"
              name=""
              id=""
              rows={7}
              className="border border-[#E31E24] w-full p-2 rounded mt-2"
              value={description}
              onChange={handleDescriptionChange} // Handle description change
            ></textarea>
            <div className="flex flex-col md:items-end items-center mt-4 md:justify-end justify-center">
              <div className="flex font-bold">
                <button className="bg-[#FFFFFF] text-[#E31E24] border border-[#E31E24] rounded-[40px] w-[150px] p-[7px]">
                  Cancel
                </button>
                <button
                  className="bg-[#E31E24] text-white rounded-[40px] w-[150px] p-[7px] ml-10"
                  onClick={handleSecondSendOffer} // Trigger second send offer
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Send offer"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
