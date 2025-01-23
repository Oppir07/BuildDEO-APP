import React, { useState } from "react";
import NavbarSearch from "../../../Components/Ui/headerSearhc";
import Footer from "../../../Components/Ui/footer";
import media from "/Media.png";
import logo from "/logoOrange.png";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NumberInputCart from "../../../Components/Ui/numberInputCart";
import PaymentMethod from "../../../Components/Ui/payment";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
     const navigate = useNavigate();

     const toCheckout = () => {
          navigate("/checkout");
     };

     // jumlah item dan harga total
     const [quantities, setQuantities] = useState([1, 1]); 
     const prices = [119, 119]; // Harga per item

     // kuantitas berdasarkan index item
     const updateQuantity = (index: number, newValue: number) => {
          const newQuantities = [...quantities];
          newQuantities[index] = newValue;
          setQuantities(newQuantities);
     };

     // toal harga
     const totalPrice = quantities.reduce((total, qty, idx) => total + qty * prices[idx], 0);

     return (
          <>
               <div>
                    <NavbarSearch text="black" logoOrange={logo} color="black" />
                    <div className="md:ml-[80px] ml-[10px] md:mr-[80px] mr-[10px]">
                         <div className="text-[32px] font-bold">Shopping Cart</div>

                         {/* List Cart */}
                         <div className="flex justify-between mt-4">
                              <div className="shadow">
                                   {prices.map((price, index) => (
                                        <div key={index} className="flex justify-between md:w-[600px] border-b-[2px] p-6">
                                             <div className="flex items-center ">
                                                  <img src={media} alt="" width={100} style={{ borderRadius: 55 }} />
                                                  <div className="text-[22px] font-bold ml-[22px]">
                                                       LVT verlegen: 20 m² (Item {index + 1})
                                                  </div>
                                             </div>
                                             <div>
                                                  <div className="font-bold text-end text-[#E31E24] text-[22px] mt-2">
                                                       {quantities[index] * price} €
                                                  </div>
                                                  <div className="flex items-center mt-2">
                                                       <div className="bg-[#E31E24] p-2 rounded-[45px] mr-4">
                                                            <FontAwesomeIcon icon={faTrash} width={20} color="white" />
                                                       </div>
                                                       <div>
                                                            <NumberInputCart
                                                                 value={quantities[index]}
                                                                 onChange={(newValue) => updateQuantity(index, newValue)}
                                                            />
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   ))}
                              </div>
                              <div>
                                   <div className="shadow md:w-[400px] p-[30px]">
                                        <div className="font-bold text-[22px]">Shopping summary</div>
                                        <div className="flex justify-between mt-[33px]">
                                             <div>Total</div>
                                             <div className="font-bold text-[22px]">{totalPrice} €</div>
                                        </div>
                                        <hr />
                                        <div className="mt-[30px] flex justify-center">
                                             <button
                                                  onClick={toCheckout}
                                                  className="text-white md:w-[200px] font-bold text-center rounded-[25px] p-2 bg-[#E31E24]"
                                             >
                                                  Complete Order
                                             </button>
                                        </div>
                                   </div>
                              </div>
                         </div>

                         {/* Payment */}
                         <div>
                              <div className="text-[32px] font-bold">Your Payment method</div>
                              <div className="text-[#808080]">Choose your Payment method</div>
                              <div className="mt-4">
                                   <PaymentMethod />
                              </div>
                         </div>
                    </div>
                    <Footer />
               </div>
          </>
     );
}
