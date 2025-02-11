import React from "react";

type NumberInputCartProps = {
     value: number;
     onChange: (newValue: number) => void;
};

const NumberInputCart: React.FC<NumberInputCartProps> = ({ value, onChange }) => {
     const handleDecrement = () => {
          if (value > 0) {
               onChange(value - 1); // Update quantity
          }
     };

     const handleIncrement = () => {
          onChange(value + 1); // Update quantity
     };

     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const newValue = Number(e.target.value);
          if (!isNaN(newValue) && newValue >= 0) {
               onChange(newValue); // Update quantity
          }
     };

     return (
          <div className="flex rounded-[30px] w-[125px] items-center border border-[#E31E24]">
               <button
                    className="border-none text-[16px] border-[1.5px] text-[#E31E24] font-bold py-2 px-4 rounded"
                    onClick={handleDecrement}
               >
                    -
               </button>
               <input
                    type="number"
                    className="text-center text-[#E31E24] text-[16px] w-[50px] pl-4 font-medium"
                    value={value}
                    onChange={handleChange}
                    disabled
               />
               <button
                    className="border-none text-[16px] border-[1.5px] text-[#E31E24] font-bold py-2 px-4 rounded"
                    onClick={handleIncrement}
               >
                    +
               </button>
          </div>
     );
};

export default NumberInputCart;
