import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";

// Define the type for the props
interface LogoutConfirmationProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutConfirmation: React.FC<LogoutConfirmationProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="text-[48px] text-red-500 mb-4">
            <FontAwesomeIcon icon={faDoorOpen} />
          </div>
          <h2 className="text-xl font-semibold text-center mb-4 text-black">
            Are you sure you want to logout?
          </h2>
          <div className="flex space-x-4">
            {/* Logout button */}
            <button
              onClick={onConfirm}
              className="text-red-500 border border-red-500 bg-white py-2 px-6 rounded-full hover:bg-red-500 hover:text-white"
            >
              Logout
            </button>
            {/* Cancel button */}
            <button
              onClick={onCancel}
              className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmation;
