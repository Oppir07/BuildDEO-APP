import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../Components/Ui/avatar";
import Footer from "../../../Components/Ui/footer";
import NavbarSearch from "../../../Components/Ui/headerSearhc";
import DynamicRating from "../../../Components/Ui/rating";
import cover from "../../../../public/cover.png";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_BASE_URL from "../../../api/config"; // Import the API base URL
import logo from "../../../../public/logoOrange.png";

export default function DetailProduct() {
  const { id } = useParams(); // Get the service ID from the URL
  const [service, setService] = useState<any>(null); // State to hold service data

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
        <NavbarSearch text="black" color="black" logoOrange={logo}/>
        <div className="md:pl-[82px] md:pr-[82px]">
          <div className="grid grid-cols-2 w-full">
            <div>
              <img
                src={service.photo || cover}
                className="h-[350px]"
                alt={service.title}
              />
            </div>
            <div>
              <div className="text-[32px] font-bold">{service.title}</div>
              <div className="flex text-[16px]">
                <div className="mr-8">30 Offerings</div>
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
          {/* Reviews Section */}
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
