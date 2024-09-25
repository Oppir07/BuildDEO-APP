import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from '../../Components/Ui/footer';
import Navbar from "../../Components/Ui/headerSearhc";
import { Input } from "../../Components/Ui/input";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import Card from "../../Components/Ui/cardMenu";
import cover from "../../../public/cover.png";
import React, { useEffect, useState } from "react";
import API_BASE_URL from "../../api/config"; // Import the API base URL

interface Service {
  id: number;
  seller_id: number;
  category_id: number;
  title: string;
  description: string;
  price: number;
  photos: string[];
  created_at: string;
  updated_at: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
  services: Service[];
  created_at: string;
  updated_at: string;
}

interface Seller {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]); // State to hold categories data
  const [sellers, setSellers] = useState<{ [key: number]: Seller }>({}); // State to hold seller data (keyed by seller_id)
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]); // For handling search/filter
  const [searchQuery, setSearchQuery] = useState(""); // For search functionality

  // Fetch categories with services
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/categories`); // API call to fetch categories with services
        const data: Category[] = await response.json(); // Define the type of data
        setCategories(data); // Set categories data
        setFilteredCategories(data); // Initially, filtered categories are the same as all categories

        // Fetch seller information for each service
        const sellerPromises = data.flatMap((category) =>
          category.services.map(async (service) => {
            if (!sellers[service.seller_id]) {
              // Fetch seller details if not already fetched
              const sellerResponse = await fetch(`${API_BASE_URL}/users/${service.seller_id}`);
              const sellerData: Seller = await sellerResponse.json();
              return { [service.seller_id]: sellerData };
            }
            return null;
          })
        );

        const fetchedSellers = await Promise.all(sellerPromises);
        // Combine all fetched sellers into one object
        const sellersData = fetchedSellers.reduce((acc, seller) => {
          return seller ? { ...acc, ...seller } : acc;
        }, {});
        setSellers((prev) => ({ ...prev, ...sellersData })); // Update state with sellers
      } catch (error) {
        console.error("Error fetching categories or sellers:", error);
      }
    };
    fetchCategories();
  }, []);

  // Handle search input changes
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter categories based on the search query
    const filtered = categories.filter(
      (category) =>
        category.name.toLowerCase().includes(query) ||
        category.services.some(
          (service) =>
            service.title.toLowerCase().includes(query) ||
            service.description.toLowerCase().includes(query)
        )
    );
    setFilteredCategories(filtered);
  };

  return (
    <>
      <div className="landing n">
        <Navbar bg="#FFFFFF00" />
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
              value={searchQuery}
              onChange={handleSearchChange} // Update the input handler
              placeholder="Search for services..."
              className="pl-[29px] rounded-[10px] h-[47px]"
            />
          </div>
        </div>
      </div>

      {/* Render Categories with Services */}
      {filteredCategories.map((category, index) => (
        <div
          key={category.id}
          className={
            index % 2 === 0
              ? "bg-[#FFDED2] pl-16 pr-16 pb-16"
              : "bg-[#4A9AEB] pl-16 pr-16 pb-16"
          }
        >
          <div className={index % 2 === 0 ? "text-black" : "text-white"}>
            <div className="font-bold text-[28px] pt-6">{category.name}</div>
            <div className="text-[16px] font-medium">{category.description}</div>
          </div>
          <div className="mt-[20px] flex flex-wrap gap-[20px]">
            {category.services.map((service) => (
              <Card
                key={service.id}
                title={service.title}
                company={sellers[service.seller_id]?.firstname || "Loading..."} // Use seller's firstname
                price={service.price.toString()}
                img={service.photos[0] || cover}
                link={`/services/${service.id}`}
              />
            ))}
          </div>
          <br />
        </div>
      ))}
      <Footer />
    </>
  );
}
