import React from "react";
import "./side.css";

interface ChatItem {
  id: string;
  name: string;
  date: string;
}

interface SidebarProps {
  setSelectedChatId: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setSelectedChatId }) => {
  const chats: ChatItem[] = [
    { id: "ID13451", name: "Interested party ID13451", date: "13:30" },
    { id: "ID98367", name: "Interested party ID98367", date: "12/01/25" },
    { id: "ID53e325", name: "Interested party ID53e325", date: "11/12/24" },
  ];

  return (
    <div className="sidebar">
      <h3 className="font-bold text-center text-[24px]">Chat</h3>
      {chats.map((chat) => (
        <div
          key={chat.id}
          className="chat-item p-3 rounded hover:bg-gray-200  "
          onClick={() => setSelectedChatId(chat.id)}  
        >
          <div className="chat-avatar">
            <img src={`https://i.pravatar.cc/50?u=${chat.id}`} alt="Avatar" />
          </div>
          <div className="chat-info">
            <h4>{chat.name}</h4>
            <p>{chat.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
