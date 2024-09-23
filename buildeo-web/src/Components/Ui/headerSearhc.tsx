import logo from "../../../public/logoOrange.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MenuIcon from "../Icon/MenuIcon";
import ProfileIcon from "../Icon/ProfileIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Input } from "./input";
import MessageIcon from "../Icon/MessageIcon";
import logow from "../../../public/Buildeo.png";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./menu";
import API_BASE_URL from "../../api/config";
import LogoutConfirmation from "./LogoutConfirmation";

interface BgProps {
  bg?: string;
  text?: string;
}

export default function NavbarSearch({ bg, text }: BgProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );
  console.log("isLoggedIn =", isLoggedIn); // Console output to check the state
  const [user, setUser] = useState<any>(null); // User data
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State for controlling modal
  const navigate = useNavigate();

  // Fetch user data if logged in
  useEffect(() => {
    if (isLoggedIn) {
      const fetchUserData = async () => {
        const token = localStorage.getItem("access_token");
        const userId = JSON.parse(localStorage.getItem("user") || "{}").id;
        if (token && userId) {
          try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const data = await response.json();
            setUser(data);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
      };
      fetchUserData();
    }
  }, [isLoggedIn]);

  // Sign out function
  const handleSignOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setIsLoggedIn(false); // Update state
    navigate("/"); // Redirect to login page after sign out
  };

  // Open the logout confirmation modal
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  // Handle logout confirmation
  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    handleSignOut(); // Proceed with sign out
  };

  // Handle cancel action in the modal
  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <div
      className={`navbar flex flex-wrap items-center justify-between pl-4 pr-4 ${
        text ? text : "text-white"
      } text-[12px] z-[9] ${bg ? bg : "bg-[#FFFFFF]"}`}
    >
      <div className="md:flex p-1 md:items w-full">
        <div className="flex mb-4 md:mr-20 items-right justify-end align-items-end">
          <img
            src={logow}
            alt="buildeo.jpg"
            width={163}
            height={32}
            className="p-4 md:mr-35"
          />
          <div
            className="md:hidden flex mt-5 justify-end self-end"
            style={{ alignSelf: "flex-start" }}
          >
            <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
              <MenuIcon width={32} height={24} color={"white"} />
            </button>
          </div>
        </div>
        <div className="mb-6 flex items-center justify-end self-center ml-[300px]">
          <div className="flex flex-col ml-[200px] gap-[50px] text-left md:text-right text-[17px] md:flex md:items-center space-x-0 md:space-x-12 md:flex-row">
            <div className="md:mt-5">
              <Link to={"/home"}>Home</Link>
            </div>
            <div className="md:mt-5">
              <Link to={""}>Favorable Offer</Link>
            </div>
            {isLoggedIn ? (
              <>
                {/* <div className="flex justify-center mt-[20px]">
                  <div className="relative w-[300px]">
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="absolute top-[13px] left-[20px]"
                      color="black"
                    />
                    <Input
                      placeholder="search"
                      className="pl-[49px] text-black font-medium rounded-[10px] h-[40px] border border-[#737B7D] border-[1.5px]"
                    />
                  </div>
                </div> */}

                <div className="md:mt-5">
                  <Link to={""}>
                    <MessageIcon width={20} color="white" />
                  </Link>
                </div>

                {/* Menubar Trigger for Profile Icon */}
                <div className="md:mt-5">
                  <Menubar>
                    <MenubarMenu>
                      <MenubarTrigger>
                        <ProfileIcon width={20} color="white" />
                      </MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem>
                          {user && (
                            <div>
                              <div className="font-bold">
                                {user.firstname} {user.lastname}
                              </div>
                              <div className="font-bold text-left ml-0 mt-2">
                                {user.email}
                              </div>
                            </div>
                          )}
                        </MenubarItem>
                        <MenubarItem>
                          <Link to="/profile">Personal Information</Link>
                        </MenubarItem>
                        <MenubarItem>Orders</MenubarItem>
                        <MenubarItem>Pending Offers</MenubarItem>
                        <MenubarItem>Open Application</MenubarItem>
                        <MenubarItem>Inquiry Form</MenubarItem>
                        <MenubarItem>Refer Friends</MenubarItem>
                        <MenubarItem>My Reviews</MenubarItem>
                        <MenubarItem onClick={handleLogoutClick}>
                          Sign Out
                        </MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                </div>
                {/* Logout Confirmation Modal */}
                <LogoutConfirmation
                  isOpen={showLogoutModal}
                  onConfirm={handleConfirmLogout}
                  onCancel={handleCancelLogout}
                />
              </>
            ) : (
              <>
                <div className="md:mt-5">
                  <Link to="/register">
                    <button className="bg-transparent text-white border border-white rounded-[5px] w-[80px] p-[7px]">
                      Register
                    </button>
                  </Link>
                </div>
                <div className="md:mt-5">
                  <Link to="/">
                    <button className="bg-[#E31E24] text-white rounded-[5px] w-[80px] p-[7px]">
                      Login
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
