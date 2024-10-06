import NavbarSearch from "../../../Components/Ui/headerSearhc";
import Footer from "../../../Components/Ui/footer";
import cover from "../../../../public/cover.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_BASE_URL from "../../../api/config"; // Import the API base URL

export default function ProductNewPage() {
  const { id } = useParams(); // Get the service ID from the URL
  const [service, setService] = useState<any>(null); // State to hold service data
  const navigate = useNavigate(); // For navigation

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

  if (!service) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  return (
    <>
      <div className="">
        <NavbarSearch text="black" color="black" />
        <div className="ml-[80px] mr-[80px]">
          <div className="grid grid-cols-2 w-full">
            <div className="">
              <img
                src={service.photos[0] || cover}
                className="h-[350px] mr-0 pr-0"
                alt=""
              />
            </div>
            <div className="">
              <div className="text-[32px] font-bold">{service.title}</div>
              <div className="flex text-[16px]">
                <div className="mr-8">0 Offerings</div>
                <div className="">4.8 (20 Rating)</div>
              </div>
              <div className="text-[32px] orange font-bold">
                {service.price}€
              </div>
              <div className="text-[16px] text-justify leading-[23px]">
                {service.description}
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6 mb-8">
            <div className="flex font-bold">
              <Link to={"/home/craftman"}>
                <button className="bg-[#FFFFFF] text-[#E31E24] border border-[#E31E24] rounded-[40px] w-[150px] p-[7px]">
                  Cancel
                </button>
              </Link>
              <button
                className="bg-[#E31E24] text-white rounded-[40px] w-[150px] p-[7px] ml-10"
                onClick={() => navigate(`/home/craftman/edit-product/${service.id}`)} // Navigate to edit product page
              >
                Edit service
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
