import React, { useState } from "react";
import Sidebar from "./side";
import Chat from "./chat";
import NavbarSearch from "../../../Components/Ui/headerSearhc";
import logo from "/logoOrange.png";

const ChatPage: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  return (
     <>
                    <NavbarSearch text='black' logoOrange={logo} color="black" />

     <div className="flex bg-white  h-screen mt-1 border-t-[2px]">
      <Sidebar setSelectedChatId={setSelectedChatId} />
      <Chat selectedChatId={selectedChatId} />
    </div>
     </>
    
  );
};

export default ChatPage;
