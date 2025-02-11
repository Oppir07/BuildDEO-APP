import { useState } from "react";

const NumberInput = () => {
     const [value, setValue] = useState(1);

     const handleDecrement = () => {
          if (value > 0) {
               setValue(value - 1);
          }
     };

     const handleIncrement = () => {
          setValue(value + 1);
     };

     const handleChange = (e: { target: { value: any; }; }) => {
          setValue(Number(e.target.value));
     };

     return (
          <div className="flex items-center">
               <button
                    className="border border-[#FF460A] text-[16px] border-[1.5px] text-[#FF460A] font-bold py-2 px-4 rounded
                    hover:bg-[#FF460A] hover:text-white transition-colors duration-200"
                    onClick={handleDecrement}
               >
                    -
               </button>
               <input
                    type="number"
                    className="text-center text-[16px] w-[50px] pl-4 font-medium"
                    value={value}
                    onChange={handleChange}
                    disabled
               />
               <button
                    className="border border-[#FF460A] text-[16px] border-[1.5px] text-[#FF460A] font-bold py-2 px-4 rounded
                    hover:bg-[#FF460A] hover:text-white transition-colors duration-200"
                    onClick={handleIncrement}
               >
                    +
               </button>

          </div>
     );
};

export default NumberInput;
