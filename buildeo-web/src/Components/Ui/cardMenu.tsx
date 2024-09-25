import React from "react";
import { Link } from "react-router-dom";

interface CardProps {
  title: string;
  company: string;
  price: string;
  img: string;
  link: string;
}

const Card: React.FC<CardProps> = ({ title, company, price, img, link }) => (
  <Link to={link}>
    <div className="card bg-white rounded-[10px] md:w-[200px] w-[170px] p-[12px] shadow">
      <img src={img} alt="Cover" className="rounded-[10px]" />
      <div className="font-bold text-[18px] mt-[12px]">{title}</div>
      <div className="text-[12px] text-[#9586A8] mt-[4px]">
        {company
          ? company.charAt(0).toUpperCase() + company.slice(1) + " Company"
          : "Unknown Company"}
      </div>

      <div className="text-[12px] text-[#9586A8] mt-[20px]">start from:</div>
      <div className="font-bold text-[18px] text-[#FF460A]">{price}</div>
    </div>
  </Link>
);

export default Card;
