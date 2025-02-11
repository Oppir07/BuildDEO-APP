import { Link, useNavigate, useParams } from "react-router-dom";
import NavbarSearch from "../../../Components/Ui/headerSearhc";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../Components/Ui/avatar";
import DynamicRating from "../../../Components/Ui/rating";
import Footer from "../../../Components/Ui/footer";
import MessageIcon from "../../../Components/Icon/MessageIcon";
import Check from "/Auth/check.png";
import logo from "../../../../public/logoOrange.png";
import { useEffect, useState } from "react";
import { API_BASE_URL, API_LOCAL } from "../../../api/config";
import NumberInputCart from "../../../Components/Ui/numberInputCart";

interface Service {
  id: number;
  title: string;
  price: number;
  category: string;
  img: string;
  description?: string;
  created_at?: string;
}

export default function DetailMenuPage() {
  const { id } = useParams();
  const [service, setServices] = useState<Service | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    const serviceDetail = async () => {
      try {
        const detail = await fetch(`${API_BASE_URL}/services/${id}`);
        if (!detail.ok) {
          throw new Error(`Error : ${detail.status}`);
        }
        const detailData = await detail.json();

        const categoryDetail = await fetch(
          `${API_BASE_URL}/categories/${detailData.category_id}`
        )
        const categoryData = categoryDetail.ok ? await categoryDetail.json() : { name: " " }

        const photoDetail = await fetch(
          `${API_BASE_URL}/services/photos/${id}`
        )
        const photoData = photoDetail.ok ? await photoDetail.json() : { photo_url: " " }

        setServices({
          ...detailData,
          category: categoryData.name,
          img: photoData.photo_url
        })
        setTotalPrice(detailData.price);
        console.log(id);
      } catch (err) {
        setLoading(false)

      }

    }
    serviceDetail()
  }, [id])

  const handleCart = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("user") || "{}").id;

      const payload = {
        user_id: userId,
        service_id: service?.id,
        quantity: quantity,
        price: totalPrice,
        created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
        updated_at: new Date().toISOString().slice(0, 19).replace("T", " "),
      };

      console.log("Payload yang dikirim:", payload);

      const response = await fetch(`${API_LOCAL}/add-service`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Order successful:", result);
      setShowAlert(true);
    } catch (error) {
      console.error("Failed to place order:", error);
    }
  };


  const handleOrder = async () => {
    try {
      const user = localStorage.getItem("user");
      if (!user) {
        alert("User not found. Please login first.");
        return;
      }

      const userId = JSON.parse(user).id;

      if (!service) {
        alert("Service data is not loaded yet.");
        return;
      }

      const calculatedPrice = service.price * quantity;

      const payload = {
        user_id: userId,
        status_payment: "N",
        negotiable_id: null,
        file_payment: null,
        created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
        updated_at: new Date().toISOString().slice(0, 19).replace("T", " "),
        items: [  // ✅ Array untuk menyesuaikan dengan backend
          {
            service_id: service.id,
            quantity: quantity,
            price: calculatedPrice
          }
        ]
      };

      console.log("Payload yang dikirim:", payload);

      const response = await fetch(`${API_LOCAL}/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Order successful:", result);
      setShowAlert(true);
      navigate('/checkout');
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Failed to create order. Please try again.");
    }
  };





  const handleAlertClose = () => {
    setShowAlert(false);

  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);

    setTotalPrice(service?.price! * newQuantity);
  };

  return (
    <>
      <div className="">
        <NavbarSearch text="black" color="black" logoOrange={logo} />
        <div className="md:pl-[82px] md:pr-[82px] pl-4 pr-4 flex flex-col justify-center items-center">
          <div className="grid md:grid-cols-3 gap-6 w-full">
            <div className="flex items-center justify-center">
              <img
                src={service?.img}
                className="h-[350px] w-[300px] mr-0 pr-0"
                alt="Service cover"
              />
            </div>
            <div className="">
              <div className="text-[32px] font-bold">{service?.title}</div>
              <div className="flex text-[16px]">
                <div className="mr-8">30 Offerings</div>
                <div className="">4.8 (20 Rating)</div>
              </div>
              <div className="text-[32px] orange font-bold">{service?.price}€</div>
              <div className="text-[16px] text-justify leading-[23px]">
                {service?.description}
              </div>
              <button onClick={() => navigate('/chat')}
                className="flex items-center justify-center bg-[#FFFFFF] w-full text-[#E31E24] font-bold border border-[1.5px] border-[#E31E24] rounded-[40px] mt-2 p-[7px]"
              >
                <MessageIcon width={24} color="#E31E24" /> &nbsp; Ask About
                Product Detail
              </button>

              {showAlert && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="flex flex-col items-center bg-white p-6 rounded-lg w-[300px]">
                    <img src={Check} alt="" className="w-[100px] fade-in" />
                    <p className="mt-2 text-center">
                      Services Succsessfully added to wishlist
                    </p>
                    <div className="mt-4 ">
                      <button
                        onClick={handleAlertClose}
                        className="bg-[#E31E24] text-white w-[250px] p-2 rounded-[15px]"
                      >
                        Back
                      </button>
                    </div>
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
                    <NumberInputCart value={quantity} onChange={handleQuantityChange} />
                  </div>
                  <div className="text-[32px] font-bold">{totalPrice}€</div>
                </div>
                <div className="text-[20px] mt-[50px] font-bold text-center text-white">
                  <button onClick={handleOrder} className="bg-[#E31E24] rounded-[40px] p-[11px] w-full hover:bg-[#ffffff] hover:border hover:border-[1.5px] hover:border-[#ff460a] hover:text-[#ff460a] transition-colors duration-200">
                    Order
                  </button>
                  <button onClick={handleCart}
                    className="bg-[#FFFFFF] w-full text-[#E31E24] font-bold border border-[1.5px] border-[#E31E24] rounded-[40px] mt-2 p-[11px] w-full hover:bg-[#ffffff] hover:border hover:border-[1.5px] hover:border-[#ff460a] hover:text-[#ff460a] transition-colors duration-200"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div> {/* Reviews Section */}
          <div className="mt-[80px] mb-10">
            <div className="text-[32px] font-bold">Review and Rates</div>
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
            <div className="flex mt-2">
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
          </div>

        </div>

        <Footer />
      </div>
    </>
  );
}

