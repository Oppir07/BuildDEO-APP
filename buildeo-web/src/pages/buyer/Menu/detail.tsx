import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavbarSearch from "../../../Components/Ui/headerSearhc";
import NumberInput from "../../../Components/Ui/inputNumber";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../Components/Ui/avatar";
import DynamicRating from "../../../Components/Ui/rating";
import Footer from "../../../Components/Ui/footer";
import MessageIcon from "../../../Components/Icon/MessageIcon";
import LoginModals from "../../../Components/Ui/login";
import API_BASE_URL from "../../../api/config"; // Import the API base URL
import cover from "../../../../public/cover.png";
import Check from "/Auth/check.png";

export default function DetailMenuPage() {
  const { id } = useParams(); // Get service ID from URL
  const [showModal] = useState(false);
  const [serviceDetails, setServiceDetails] = useState<any>(null); // Store fetched service details
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch service details from API
    const fetchServiceDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/services/${id}`);
        const data = await response.json();
        setServiceDetails(data);
      } catch (error) {
        console.error("Error fetching service details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!serviceDetails) {
    return <div>Service not found.</div>;
  }

  const { title, description, price, photos } = serviceDetails;
  const servicePhoto = photos && photos.length > 0 ? photos[0] : cover; // Use service photo if available

  //alert wishlist
  //
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleAlertClose = () => {
    setShowAlert(false);
    navigate("/payment");
  };

  const send = () => {
    setShowAlert(true);
  };

  return (
    <>
      <div className="">
        <NavbarSearch text="red" />
        <div className="md:pl-[82px] md:pr-[82px] pl-4 pr-4 flex flex-col justify-center items-center">
          <div className="grid md:grid-cols-3 gap-6 w-full">
            <div className="flex items-center justify-center">
              <img
                src={servicePhoto}
                className="h-[350px] w-[270px] mr-0 pr-0"
                alt="Service cover"
              />
            </div>
            <div className="">
              <div className="text-[32px] font-bold">{title} iu</div>
              <div className="flex text-[16px]">
                <div className="mr-8">30 Offerings</div>
                <div className="">4.8 (20 Rating)</div>
              </div>
              <div className="text-[32px] orange font-bold">{price}€</div>
              <div className="text-[16px] text-justify leading-[23px]">
                {description}
              </div>
              <button className="flex items-center justify-center bg-[#FFFFFF] w-full text-[#E31E24] font-bold border border-[1.5px] border-[#E31E24] rounded-[40px] mt-2 p-[7px]">
                <MessageIcon width={24} color="#E31E24" /> &nbsp; Ask About
                Product Detail
              </button>
              <button className="flex items-center justify-center bg-[#FFFFFF] w-full text-[#E31E24] font-bold border border-[1.5px] border-[#E31E24] rounded-[40px] mt-2 p-[7px]">
                See more about company
              </button>

              {/* //have login */}
              {showAlert && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="flex flex-col items-center bg-white p-6 rounded-lg w-[300px]">
                    <img src={Check} alt="" className="w-[100px] fade-in" />
                    <p className="mt-2 text-center">
                      Services Succsessfully added to wislist
                    </p>
                    <div className="mt-4 ">
                      <button
                        onClick={handleAlertClose}
                        className="bg-[#E31E24] text-white w-[250px] p-2 rounded-[15px]"
                      >
                        Back
                      </button>
                      <button className="bg-[#E31E24] text-white w-[250px] p-2 rounded-[15px]">
                        Continue to Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Not login/regist */}

              {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className=" p-6 rounded-lg shadow-lg">
                    <LoginModals />
                  </div>
                </div>
              )}
            </div>
            <div className="">
              <div className="bg-white border border-[1.5px] w-[358px] rounded-[10px] pl-[19px] pr-[19px] pb-[34px] pt-[32px]">
                <div className="text-[20px] font-bold">Make your orders</div>
                <div className="text-[16px] text-[#9586A8] text-end mt-[87px]">
                  Total Price
                </div>
                <div className="flex justify-between">
                  <div className="">
                    <NumberInput />
                  </div>
                  <div className="text-[32px] font-bold">{price}€</div>
                </div>
                <div className="text-[20px] mt-[50px] font-bold text-center text-white">
                  <Link to={"/payment"}>
                    <button className="bg-[#FF460A] rounded-[40px] p-[11px] w-full hover:bg-[#ffffff] hover:border hover:border-[1.5px] hover:border-[#ff460a] hover:text-[#ff460a] transition-colors duration-200">
                      Offer
                    </button>
                  </Link>
                  <button
                    onClick={send}
                    className="bg-[#FFFFFF] w-full text-[#E31E24] font-bold border border-[1.5px] border-[#E31E24] rounded-[40px] mt-2 p-[11px] w-full hover:bg-[#ffffff] hover:border hover:border-[1.5px] hover:border-[#ff460a] hover:text-[#ff460a] transition-colors duration-200"
                  >
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-[80px] mb-10">
            <div className="text-[32px] font-bold">Review and Rates</div>
            <div className="flex flex-wrap">
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
                  <div className="text-[16px] text-[#9586A8]">Jan 1 2024</div>
                </div>
                <div className="text-justify">
                  So lovely paint! I couldn't be happier with the results. The
                  painters were professional, punctual, and meticulous in their
                  work. They transformed my living room with vibrant colors,
                  making it feel fresh and inviting. The attention to detail was
                  impressive, and they ensured everything was cleaned up
                  afterward. I highly recommend their services to anyone looking
                  for a top-quality painting job. The entire experience was
                  smooth and stress-free. Five stars all the way!
                </div>
              </div>
            </div>
            {/* Add more reviews similarly */}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
