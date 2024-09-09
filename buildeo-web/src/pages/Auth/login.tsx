import { Link } from "react-router-dom";
import logo from "../../../public/logo.png";
import { Input } from "../../Components/Ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
  const [isCraftman, setIsCraftman] = useState(true);
  const navigate = useNavigate();

  // Manage form input state for email and password
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Manage error and success state
  const [error, setError] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8080/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send form data as JSON
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error); // Set error message if login fails
      } else {
        const data = await response.json();
        localStorage.setItem("access_token", data.access_token); // Save the token in localStorage
        localStorage.setItem("user", JSON.stringify(data.user)); // Optionally store user info
        navigate("/profile"); // Navigate to the home page after successful login
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      navigate("/");
    }
  };

  const handleClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIsCraftman(!isCraftman);
  };

  const regist = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="bg">
        <div className="flex">
          <div className="bg-black w-1/3 bg-opacity-40 h-screen flex flex-col items-center justify-center">
            <img src={logo} alt="Logo" className="w-[150px]" />
            <div className="text-[30px] text-white font-bold w-[331px] mt-[49px] leading-tight">
              We are looking for builders who want to save money
            </div>
          </div>
          <div className="w-2/3 flex items-center justify-center ml-[120px]">
            <div className="bg-white rounded-[30px] p-[29px] w-[450px]">
              <div className="text-[#FF460A] text-[30px] font-bold text-center">
                Login
              </div>

              <div className="text-[14px] text-center mt-[15px]">
                <div>
                  Already registered in another role,&nbsp;
                  <button
                    className="text-[#FF460A] bg-transparent font-bold border-none cursor-pointer"
                    onClick={handleClick}
                  >
                    {isCraftman ? "Login as craftman" : "Login as buyer"}
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mt-[25px]">
                  <Input
                    name="email"
                    placeholder="e-mail"
                    type="email"
                    className="bg-white h-[50px] rounded-[15px] pl-[26px] text-[16px]"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mt-[13px]">
                  <Input
                    name="password"
                    placeholder="password"
                    type="password"
                    className="bg-white h-[50px] rounded-[15px] pl-[26px] text-[16px]"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                {error && (
                  <div className="text-red-500 text-center mt-4">
                    Invalid email or password, please try again
                  </div>
                )}
                <div className="text-end text-[#FF460A] font-bold mt-[37px] mb-[37px]">
                  <Link to="" className="text-end">
                    Forget Password
                  </Link>
                </div>
                <div className="">
                  <button
                    type="submit"
                    className="bg-[#FF460A] font-bold rounded-[40px] text-white text-center w-full"
                  >
                    <div className="p-4">Login</div>
                  </button>
                </div>
              </form>

              <div className="flex items-center m-4">
                <div className="flex-grow border-t border-black"></div>
                <span className="mx-4 text-black">Don't have an account?</span>
                <div className="flex-grow border-t border-black"></div>
              </div>
              <div className="">
                <button
                  onClick={regist}
                  className="bg-white text-[#FF460A] font-bold rounded-[40px] border border-[#FF460A] text-center w-full"
                >
                  <div className="p-4">Register</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
