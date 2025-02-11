import  { useEffect, useState } from "react";
import NavbarSearch from "../../../Components/Ui/headerSearhc";
import Footer from "../../../Components/Ui/footer";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NumberInputCart from "../../../Components/Ui/numberInputCart";
import PaymentMethod from "../../../Components/Ui/payment";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, API_LOCAL } from "../../../api/config";

export default function CartPage() {
     const navigate = useNavigate();
     const [items, setItems] = useState<any[]>([]);  // Array of cart items
     const [quantities, setQuantities] = useState<number[]>([]); // Quantities for each cart item
     const [itemDetails, setItemDetails] = useState<any[]>([]);  // Item details for each cart item
     const [totalPrice, setTotalPrice] = useState(0);


     useEffect(() => {
          const fetchCart = async () => {
               const token = localStorage.getItem("access_token");
               const user = localStorage.getItem("user");
               const userId = user ? JSON.parse(user).id : null;

               if (token && userId) {
                    try {
                         // Fetch cart items
                         const cartRes = await fetch(`${API_LOCAL}/cart/${userId}`);
                         if (!cartRes.ok) throw new Error("Gagal mengambil data keranjang");
                         const cartData = await cartRes.json();
                         setItems(cartData);
                         setQuantities(cartData.map((item: any) => item.quantity));

                         const total = cartData.reduce((sum: number, item: any) => sum + item.price, 0);
                         setTotalPrice(total);

                         // Fetch additional details for each item
                         const details = await Promise.all(
                              cartData.map(async (item: any) => {
                                   try {
                                        // Fetch service details
                                        const serviceRes = await fetch(`${API_BASE_URL}/services/${item.service_id}`);
                                        if (!serviceRes.ok) throw new Error("Gagal mengambil service");
                                        const serviceData = await serviceRes.json();

                                        // Fetch category details
                                        const categoryRes = await fetch(`${API_BASE_URL}/categories/${serviceData.category_id}`);
                                        const categoryData = categoryRes.ok ? await categoryRes.json() : { name: "Tidak Diketahui" };

                                        // Fetch image
                                        const imgRes = await fetch(`${API_BASE_URL}/services/photos/${item.service_id}`);
                                        const imgData = imgRes.ok ? await imgRes.json() : { photo_url: "" };

                                        return {
                                             service_id: item.service_id,
                                             photo_url: imgData.photo_url,
                                             category: categoryData.name,
                                        };
                                   } catch (error) {
                                        console.error("Error fetching details:", error);
                                        return {
                                             service_id: item.service_id,
                                             photo_url: "",
                                             category: "Tidak Diketahui",
                                        };
                                   }
                              })
                         );

                         setItemDetails(details);
                    } catch (err) {
                         console.error("Error:", err);
                    }
               }
          };

          fetchCart();
     }, []);

   
     const handleUpdateQuantity = async (index: number, newValue: number) => {
          const updatedQuantities = [...quantities];
          updatedQuantities[index] = newValue;
          setQuantities(updatedQuantities);

          const updatedItem = items[index];

          const token = localStorage.getItem("access_token");
          const userId = JSON.parse(localStorage.getItem("user") || "{}").id;

          try {
               // Ambil harga asli dari service
               const serviceRes = await fetch(`${API_BASE_URL}/services/${updatedItem.service_id}`);
               if (!serviceRes.ok) throw new Error("Gagal mengambil data service");
               const serviceData = await serviceRes.json();

               // Harga tetap (dari service) dikalikan quantity
               const updatedPrice = serviceData.price * newValue;

               // Update quantity dan harga
               const response = await fetch(
                    `${API_LOCAL}/cart/update/${userId}/${updatedItem.service_id}`,
                    {
                         method: "PUT",
                         headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${token}`,
                         },
                         body: JSON.stringify({
                              quantity: newValue,
                              price: serviceData.price, // Harga tetap disimpan di DB
                         }),
                    }
               );

               if (response.ok) {
                    console.log("Quantity and price updated successfully");
               } else {
                    console.error("Failed to update quantity and price");
               }
          } catch (error) {
               console.error("Error updating quantity and price:", error);
          }
     };

     const handleCompleteOrder = () => {
          const updatedCart = items.map((item, idx) => ({
              ...item,
              quantity: quantities[idx],
              price: itemDetails[idx]?.price || item.price,  // Pastikan harga sesuai
          }));
      
          // Mengirim data cart yang diperbarui ke backend
          const orderData = {
              user_id: JSON.parse(localStorage.getItem("user") || "{}").id,
              status_payment: "N",  // Status pembayaran awal "Pending"
              negotiable_id: null,  // Jika ada negosiasi ID, bisa diisi
              file_payment: null,  // Jika ada file pembayaran, bisa diisi
              created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
              updated_at: new Date().toISOString().slice(0, 19).replace("T", " "),
              items: updatedCart.map(item => ({
                  service_id: item.service_id,
                  quantity: item.quantity,
                  price: item.price,
              }))
          };
      
          fetch(`${API_LOCAL}/create-order`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
              body: JSON.stringify(orderData),
          })
          .then(response => response.json())
          .then(data => {
              if (data && data.order_id) {
                  console.log("Order berhasil dibuat dengan ID:", data.order_id);
                  navigate("/checkout");
              } else {
                  console.error("Gagal membuat order:", data.message);
              }
          })
          .catch(error => {
              console.error("Gagal menyelesaikan order:", error);
          });
      };
      

     return (
          <>
               <div>
                    <NavbarSearch text="black" logoOrange="/logoOrange.png" color="black" />
                    <div className="md:ml-[80px] ml-[10px] md:mr-[80px] mr-[10px]">
                         <div className="text-[32px] font-bold">Shopping Cart</div>

                         {/* List Cart */}
                         <div className="flex justify-between mt-4">
                              <div className="shadow">
                                   {items.map((cartItems: any, index: number) => {
                                        const itemDetail = itemDetails.find(
                                             (detail) => detail.service_id === cartItems.service_id
                                        );

                                        return (
                                             <div
                                                  key={cartItems.id}
                                                  className="flex justify-between md:w-[600px] border-b-[2px] p-6"
                                             >
                                                  <div className="flex items-center ">
                                                       <img
                                                            src={itemDetail?.photo_url || "/default-image.jpg"}
                                                            width={200}
                                                            style={{ borderRadius: 5 }}
                                                       />
                                                       <div className="text-[22px] font-bold ml-[22px]">
                                                            {cartItems.name}
                                                       </div>
                                                       <div className="ml-4 text-[18px] text-gray-500">
                                                            {itemDetail?.category || "Uncategorized"} {/* Show category */}
                                                       </div>
                                                  </div>
                                                  <div>
                                                       <div className="font-bold text-end text-[#E31E24] text-[22px] mt-2">
                                                            {cartItems.price} €
                                                       </div>
                                                       <div className="font-bold text-end text-[#E31E24] text-[22px] mt-2">
                                                            {/* {cartItems.price * (quantities[index] || 1)} € */}
                                                       </div>
                                                       <div className="flex items-center mt-2">
                                                            <div className="bg-[#E31E24] p-2 rounded-[45px] mr-4">
                                                                 <button  >
                                                                      <FontAwesomeIcon icon={faTrash} width={20} color="white" />
                                                                 </button>
                                                            </div>
                                                            <div>
                                                                 <NumberInputCart
                                                                      value={quantities[index]}
                                                                      onChange={(newValue) => handleUpdateQuantity(index, newValue)}
                                                                 />
                                                            </div>
                                                       </div>
                                                  </div>
                                             </div>
                                        );
                                   })}
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
                                                  onClick={handleCompleteOrder}
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
