import React, { createContext, useContext, useState } from "react";

interface Service {
  id: number;
  name: string;
  company: string;
  price: number;
  quantity: number;
  rating: number;
  category: string;
  description: string;
  img: string;
}

interface CartContextProps {
  cart: Service[];
  order: Service[];
  addToCart: (item: Service) => void;
  removeFromCart: (id: number) => void;
  completeOrder: (items: Service[]) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Service[]>([]);
  const [order, setOrder] = useState<Service[]>([]);

  const addToCart = (item: Service) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const completeOrder = (items: Service[]) => {
    setOrder(items); // Simpan order
    setCart([]); // Kosongkan cart setelah order selesai
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        order,
        addToCart,
        removeFromCart,
        completeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
