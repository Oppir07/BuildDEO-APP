import { useState } from "react";
import logo from "../../../public/logo.png";
import { Input } from "../../Components/Ui/input";
import { useNavigate } from "react-router-dom";
import Check from "../../../public/Auth/check.png";
import API_BASE_URL from "../../api/config"; // Import the API base URL

// Define an interface for the formData
interface FormData {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  postNumber: string;
  street: string;
  phone: string;
  role: string;
  createdBy: number;
  updatedBy: number;
}

export default function RegisterPage() {
  const [isCraftman, setIsCraftman] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIsCraftman(!isCraftman);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    navigate("/home");
  };

  const login = () => {
    navigate("/");
  };

  // Form state management
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    postNumber: "",
    street: "",
    phone: "",
    role: "buyer", // default role, can be 'seller' or 'admin'
    createdBy: 1, // you may set it dynamically
    updatedBy: 1, // you may set it dynamically
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Map formData to match API expectations
  const mapFormDataToAPI = (formData: FormData) => {
    return {
      email: formData.email,
      password: formData.password,
      firstname: formData.firstname,
      lastname: formData.lastname,
      post_number: formData.postNumber, // Convert to snake_case
      street: formData.street,
      phone: formData.phone,
      role: formData.role,
      created_by: formData.createdBy, // Convert to snake_case
      updated_by: formData.updatedBy, // Convert to snake_case
    };
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const apiData = mapFormDataToAPI(formData); // Prepare the data for API

    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData), // Send transformed form data as JSON
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData.error); // Log the error from the backend
      } else {
        const data = await response.json();
        console.log(data);
        setShowAlert(true); // Show success alert
      }
    } catch (err) {
      setShowAlert(false);
      navigate("/register");
    }
  };

  return (
    <>
      <div className="bg">
        <div className="flex">
          <div className="hidden md:block bg-black w-1/3 bg-opacity-40 h-screen md:flex flex-col items-center justify-center">
            <img src={logo} alt="Logo" className="w-[150px]" />
            <div className=" text-[30px] text-white font-bold w-[331px] mt-[49px] leading-tight">
              We are looking for builders who want to save money
            </div>
          </div>
          <div className="mt-9 md:mt-0  md:w-2/3 md:w-[360px] w-full flex flex-wrap items-center justify-center md:ml-[350px] md:mb-0 mb-[50px]">
            <div className="bg-white rounded-[30px] p-[19px] md:w-[400px] w-[360px]">
              <div className="text-[#FF460A] text-[30px] font-bold text-center">
                Register
              </div>
              <div className="text-[14px] text-center mt-[15px] mb-[15px]">
                <div>
                  Want registered in another role,&nbsp;
                  <button
                    className="text-[#FF460A] bg-transparent font-bold border-none cursor-pointer"
                    onClick={handleClick}
                  >
                    {isCraftman
                      ? " Register as craftman"
                      : " Register as buyer"}
                  </button>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="md:grid md:grid-cols-2 gap-4">
                  <Input
                    className="border border-black h-[40px]"
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    className="border border-black h-[40px] mt-4 md:mt-0"
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="md:grid md:grid-cols-2 md:gap-4 mt-4 md:mt-6">
                  <Input
                    placeholder="city"
                    className="border border-black h-[40px]"
                  />
                  <Input
                    className="border border-black h-[40px] mt-4 md:mt-0"
                    type="text"
                    name="postNumber"
                    placeholder="Post Number"
                    value={formData.postNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="md:grid md:grid-cols-2 md:gap-4 mt-4 md:mt-6">
                  <Input
                    className="border border-black h-[40px]"
                    type="text"
                    name="street"
                    placeholder="Street"
                    value={formData.street}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    className="border border-black h-[40px] mt-4 md:mt-0"
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="md:grid md:grid-cols-2 gap-4 mt-4 md:mt-6 ">
                  <Input
                    className="border border-black h-[40px] "
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    className="border border-black h-[40px] mt-4  md:mt-0"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mt-10 flex justify-center">
                  <button
                    type="submit"
                    className="bg-[#FF460A] font-bold rounded-[40px] w-[448px] text-white text-center w-full"
                  >
                    <div className="p-4">Register</div>
                  </button>
                </div>
              </form>
              <div className="flex justify-center">
                <div className="flex items-center m-4 w-[448px]">
                  <div className="flex-grow border-t border-black"></div>
                  <span className="mx-4 text-black">
                    Already have an account?
                  </span>
                  <div className="flex-grow border-t border-black"></div>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={login}
                  className="w-[448px] bg-white text-[#FF460A] font-bold rounded-[40px] border border-[#FF460A] text-center w-full"
                >
                  <div className="p-4">Login</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col items-center bg-white p-6 rounded-lg w-[300px]">
            <img src={Check} alt="" className="w-[100px] fade-in" />
            <p className="mt-2 text-center">
              Your account has been successfully created
            </p>
            <div className="mt-4 ">
              <button
                onClick={handleAlertClose}
                className="bg-[#FF460A] text-white w-[250px] p-2 rounded-[15px]"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


