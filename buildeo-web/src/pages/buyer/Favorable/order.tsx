import NavbarSearch from "../../../Components/Ui/headerSearhc";
import Footer from "../../../Components/Ui/footer";
import { Input } from "../../../Components/Ui/input";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Check from "/Auth/check.png";
import API_BASE_URL from "../../../api/config"; // Import API base URL

export default function OrderOfferPage() {
  const navigate = useNavigate();
  const [sessionData, setSessionData] = useState<any>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAlertClose = () => {
    setShowAlert(false);
    navigate("/home");
  };

  // Retrieve session data from session storage
  useEffect(() => {
    try {
      const data = sessionStorage.getItem("temporaryData");
      if (data) {
        const parsedData = JSON.parse(data);
        const { document_url, category_id  } = parsedData;
  
        // Validate required fields
        if (!document_url || !category_id) {
          throw new Error("Incomplete session data.");
        }

        setSessionData(parsedData);
      } else {
        throw new Error("No session data found.");
      }
    } catch (error) {
      console.error("Failed to load session data:", error);
      alert("Session data is missing or invalid. Please start again.");
      navigate("/favorable/document");
    }
  }, [navigate]);
  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!sessionData || !sessionData.document_url) {
      alert("File upload is missing or invalid. Please start over.");
      return;
    }

    // Collect form data
    const formData = new FormData();

    // Append session data to FormData
    formData.append("category_id", sessionData.category_id.toString());
    formData.append("document_url", sessionData.document_url); // Attach the actual file
    formData.append("description", sessionData.description || "");

    // Append form data (make sure all required fields are included)
    const formElements = event.target as HTMLFormElement;
    formData.append("firstname", formElements.firstname.value);
    formData.append("lastname", formElements.lastname.value);
    formData.append("street", formElements.street.value);
    formData.append("post_number", formElements.post_number.value);
    formData.append("phone", formElements.phone.value);
    formData.append("email", formElements.email.value);
    formData.append("status", formElements.status.value);

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/quotation`, {
        method: "POST",
        body: formData, // Send as FormData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create quotation.");
      }

      setShowAlert(true);
    } catch (error) {
      alert("Failed to create the quotation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavbarSearch text="black" />
      <div className="md:ml-[80px] md:mr-[80px] ml-4 mr-4">
        <div className="md:text-[32px] text-[20px] font-bold">
          Get the Cheapest Offer
        </div>
        <div className="">
          Fill this data so BUILDEO can send you the result
        </div>
        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="md:grid md:grid-cols-2 gap-4">
            <Input
              className="border border-black h-[40px]"
              type="text"
              name="firstname"
              placeholder="First Name"
              required
            />
            <Input
              className="border border-black h-[40px] mt-4 md:mt-0"
              type="text"
              name="lastname"
              placeholder="Last Name"
              required
            />
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-4 mt-4 md:mt-6">
            <Input
              placeholder="Street"
              className="border border-black h-[40px]"
              name="street"
              required
            />
            <Input
              className="border border-black h-[40px] mt-4 md:mt-0"
              type="text"
              name="post_number"
              placeholder="Post Number"
              required
            />
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-4 mt-4 md:mt-6">
            <Input
              className="border border-black h-[40px] mt-4 md:mt-0"
              type="text"
              name="phone"
              placeholder="Phone"
              required
            />

            <Input
              className="border border-black h-[40px]"
              type="email"
              name="email"
              placeholder="Email"
              required
            />

            <input type="hidden" name="status" value="open" />
          </div>
          <div className="mt-10 flex justify-end">
            <button
              type="button"
              className="bg-[#FFFFFF] text-[#E31E24] border border-[#E31E24] rounded-[40px] w-[200px] p-[7px]"
              onClick={() => navigate("/home")} // Navigate back to home
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#E31E24] font-bold rounded-[40px] w-[200px] text-white text-center ml-2"
            >
              <div className="p-4">{loading ? "Sending..." : "Send Offer"}</div>
            </button>
          </div>
        </form>
        {showAlert && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex flex-col items-center bg-white p-6 rounded-lg w-[300px]">
              <img src={Check} alt="" className="w-[100px] fade-in" />
              <p className="mt-2 text-center">
                The Cheapest Offer will be sent 
              </p>
              <br />
              <p className="mt-2 text-center">
                Check your email!
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
