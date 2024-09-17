import { Link } from "react-router-dom";
import logo from "../../../public/logo.png";
import { Input } from "../../Components/Ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../api/config"; // Import the API base URL
import { Alert, Stack } from "@mui/material";
export default function LoginPage() {
  const [isCraftman, setIsCraftman] = useState(true);
  const [loading, setLoading] =useState(false)
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
      const response = await fetch(`${API_BASE_URL}/users/login`, { // Use the base URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error);
      } else {
        const data = await response.json();
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/profile");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      navigate("/");
    }
  };

  const handleClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setLoading(true); //load page

    requestAnimationFrame(() => {
      window.location.reload();
    });

    setIsCraftman(!isCraftman); 
  };

  const regist = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="bg">
        <div className="md:flex flex justify-center items-center">
          <div className="hidden md:block  bg-black md:w-1/3 bg-opacity-40 h-screen md:flex md:flex-col md:items-center justify-center">
            <img src={logo} alt="Logo" className="w-[150px]" />
            <div className="text-[30px] text-white font-bold w-[331px] mt-[49px] leading-tight">
              We are looking for builders who want to save money
            </div>
          </div>
          <div className="mt-9 md:mt-0  md:w-2/3 w-[360px] flex flex-wrap items-center justify-center md:ml-[120px]">
            <div className="md:hidden ">
              <img src={logo} alt="" className="w-[100px] mb-4" />
            </div>
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
                    //spinner 
                  >
                    { isCraftman ?  "Login as craftman"  : "Login as buyer"}
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
                  <Stack className="mt-2">
                    <Alert variant="outlined" severity="error">
                      Email of password is incorrect! Please try again!
                    </Alert>
                  </Stack>
                )}
                <div className="text-end text-[#FF460A] font-bold mt-[17px] mb-[17px]">
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