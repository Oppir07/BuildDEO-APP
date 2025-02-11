import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../Components/Ui/footer";
import { Input } from "../../Components/Ui/input";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import Card from "../../Components/Ui/cardMenu";
import cover from "../../../public/cover.png";
import  { useEffect, useState } from "react";
import NavbarSearch from "../../Components/Ui/headerSearhc";
import { API_BASE_URL } from "../../api/config";
export default function HomeBuyer() {
  const [services, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    fetch(`${API_BASE_URL}/services`)
    .then((response) =>{
      if(!response.ok){
        throw new Error(`Error ${response.status}`)
      }
      return response.json();
    })
    .then(async (data) =>{
      const img = await Promise.all(
        data.map( async (service) =>{
          const imgService = await fetch(
            `${API_BASE_URL}/services/photos/${service.id}`
          )
          const imgData = imgService.ok ? await imgService.json() : {photo_url: " "}

          const categoryService = await fetch(
            `${API_BASE_URL}/categories/${service.category_id}`
          )
          const categoryData = categoryService.ok ? await categoryService.json() : {category : "  "}

          return {
            ...service, img: imgData.photo_url, category: categoryData.name
          }
        })
      )
      setService(img)
      setLoading(false)
    })
  },[])

  if(loading) return <p>loading</p>

  return (
    <>
      <div className="landing n">
        <NavbarSearch bg="#FFFFFF00" />
        <div className="text-white text-[28px] font-bold text-center mt-[120px]">
          Einfach günstigeren Handwerker finden
        </div>
        <div className="text-white text-[18px] text-center">
          Finden Sie hochwertige Handwerker zu erschwinglichen Preisen in Ihrer Nähe
        </div>
        <div className="flex justify-center mt-[20px] pb-[0px]">
          <div className="relative w-[476px]">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute top-[18px] left-[10px]"
              color="grey"
            />
            <Input
              value={''}
              placeholder="Search for services..."
              className="pl-[29px] rounded-[10px] h-[47px]"
            />
          </div>
        </div>
      </div>

      {/* Render Services */}
     
      <div className="p-6">
      <div className="font-bold text-[24px]">All Service</div>
        <div className="grid grid-cols-5 md:grid-cols-5 lg:grid-cols-5 gap-3 mt-4">
          {services.map((service) => (
            <Card
              key={service.id}
              title={service.name}
              company={service.category}
              price={` ${service.price.toLocaleString()}€`}
              img={service.img || cover}
              link={`/services/${service.id}`}  
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
