import React, { useState, useRef, useEffect } from "react";
import "./chat.css";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Message {
  id: number;
  sender: "user" | "other";
  text: string;
  time: string;
  chatId: string; // Add a chatId field to identify messages for each chat
}

interface ChatProps {
  selectedChatId: string | null;
}

const Chat: React.FC<ChatProps> = ({ selectedChatId }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "user", text: "Hello, I can offer 50€", time: "09:25 AM", chatId: "ID13451" },
    { id: 2, sender: "other", text: "Yes, what details do you need?", time: "09:26 AM", chatId: "ID13451" },
    { id: 3, sender: "user", text: "Please send photos", time: "09:27 AM", chatId: "ID98367" },
    { id: 4, sender: "other", text: "I'll send it to you straight away.", time: "09:28 AM", chatId: "ID98367" },
  ]);

  const [input, setInput] = useState("");

  // Ref to track the messages container
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Filter messages based on the selected chat
  const filteredMessages = messages.filter((msg) => msg.chatId === selectedChatId);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [filteredMessages]);

  const sendMessage = () => {
    if (input.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: "user",
        text: input,
        time: "Now",
        chatId: selectedChatId || "", // Make sure chatId is added
      };
      setMessages([...messages, newMessage]);
      setInput("");
    }
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <h3>{selectedChatId ? `Chat ID: ${selectedChatId}` : "Select a chat"}</h3>
      </div>
      <div className="chat-messages">
        {filteredMessages.map((msg) => (
          <div key={msg.id} className={`chat-message ${msg.sender}`}>
            <p>{msg.text}</p>
            <span>{msg.time}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {selectedChatId && (
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Chat;
