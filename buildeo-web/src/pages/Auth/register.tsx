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
  const [isCraftman, setIsCraftman] = useState(false); // Default to buyer registration
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  // Form state management
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    postNumber: "",
    street: "",
    phone: "",
    role: "buyer", // default role
    createdBy: 1, // you may set it dynamically
    updatedBy: 1, // you may set it dynamically
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newRole = isCraftman ? "buyer" : "seller"; // Toggle role
    setIsCraftman(!isCraftman);
    setFormData({
      ...formData,
      role: newRole, // Update role in formData
    });
    console.log("role = " + newRole);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    navigate("/home");
  };

  const login = () => {
    navigate("/");
  };

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

  // Handle form submission with automatic login after registration
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const apiData = mapFormDataToAPI(formData); // Prepare the data for API

    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("ini error" + errorData.error);
      } else {
        const data = await response.json();
        console.log(data);

        // After successful registration, automatically log in the user
        const loginResponse = await fetch(`${API_BASE_URL}/users/login`, {
          // Correct login URL
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email, // Use the email and password from formData
            password: formData.password,
          }),
        });

        if (loginResponse.ok) {
          const loginData = await loginResponse.json();
          // Store token and user data in localStorage
          localStorage.setItem("access_token", loginData.token);
          localStorage.setItem("user", JSON.stringify(loginData.user));
          // Navigate based on user role
          if (loginData.user.role === "seller") {
            navigate("/home/craftman"); // Redirect to craftman home
          } else {
            navigate("/home"); // Redirect to buyer home
          }

          setShowAlert(true); // Show success alert
        } else {
          console.error("Login failed");
        }
      }
    } catch (err) {
      setShowAlert(false);
      console.log("login is failed");
      navigate("/register");
    }
  };

  return (
    <>
      <div className="bg">
        <div className="flex">
          {/* Left Side (Logo and Text) */}
          <div className="hidden md:block bg-black w-1/3 bg-opacity-40 h-screen md:flex flex-col items-center justify-center">
            <img src={logo} alt="Logo" className="w-[150px]" />
            <div className="text-[30px] text-white font-bold w-[331px] mt-[49px] leading-tight">
              We are looking for builders who want to save money
            </div>
          </div>

          {/* Right Side (Registration Form) */}
          <div className="mt-9 md:mt-0 md:w-2/3 w-full flex flex-wrap items-center justify-center md:ml-[350px] md:mb-0 mb-[50px] ">
            <div className="bg-white rounded-[30px] p-[19px] md:w-[400px] w-[360px] mt-[75px]">
              <div className="text-[#FF460A] text-[30px] font-bold text-center">
                Register
              </div>
              <div className="text-[14px] text-center mt-[15px] mb-[15px]">
                <div>
                  Want to register in another role?&nbsp;
                  <button
                    className="text-[#FF460A] bg-transparent font-bold border-none cursor-pointer"
                    onClick={handleClick}
                  >
                    {isCraftman ? "Register as buyer" : "Register as craftman"}
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
                    placeholder="City"
                    className="border border-black h-[40px]"
                    name="city"
                    onChange={handleChange}
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
                <div className="md:grid md:grid-cols-2 gap-4 mt-4 md:mt-6">
                  <Input
                    className="border border-black h-[40px]"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    className="border border-black h-[40px] mt-4 md:mt-0"
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
                    className="bg-[#FF460A] font-bold rounded-[30px] text-white py-[15px] w-[200px]"
                  >
                    Register
                  </button>
                </div>
              </form>
              {showAlert && (
                <div className="bg-white h-screen absolute top-0 left-0 right-0 flex flex-col items-center justify-center">
                  <img src={Check} alt="checklist" className="h-[100px]" />
                  <p className="mt-5 text-black font-semibold text-xl">
                    Registration successful!
                  </p>
                  <button
                    onClick={handleAlertClose}
                    className="bg-[#FF460A] font-bold rounded-[30px] text-white py-[15px] w-[200px] mt-5"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
