import { useState } from 'react';
import CreditIcon from '../Icon/CreditIcon';
import BankIcon from '../Icon/BankIcon';
import PaypalIcon from '../Icon/PaypalIcon';

const PaymentMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState('');

  const paymentMethods = [
    { id: 'credit-card', label: 'Credit Card', color: 'bg-orange-500', icon: <CreditIcon color='white' height={24} width={24}/> },
    { id: 'bank-transfer', label: 'Bank Transfer', color: 'bg-pink-500', icon: <BankIcon color='white' height={24} width={24}/> },
    { id: 'paypal', label: 'Paypal', color: 'bg-blue-900', icon: <PaypalIcon color='white' height={24} width={24}/> },
  ];

  return (
    <div className="grid md:grid-cols-3  gap-4">
      {paymentMethods.map((method) => (
        <div
          key={method.id}
          onClick={() => setSelectedMethod(method.id)}
          className={`relative flex items-center space-x-2 p-5 rounded-[5px] cursor-pointer border 
            ${selectedMethod === method.id ? `border-[2px] border-[#FF460A]` : 'border-transparent transition transform hover:scale-105'}
          `}
        >
        
          {selectedMethod === method.id && (
            <div className="absolute -top-2 -left-2 bg-[#FF460A] rounded-full p-[2px]">
              <svg
                className="w-4 h-4 text-[#ffffff]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          )}

          <div className={`p-2 rounded-[5px] ${method.color}`}>
            {method.icon}
          </div>
          <span className="text-black font-bold text-[20px]">{method.label}</span>
        </div>
      ))}
    </div>
  );
};

export default PaymentMethod;
