import React, { useState } from "react";
import './chatbot.css';
import logo from './logo.jpg'; // Update the path to your logo

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "How can I help you?", sender: "bot" }
  ]);
  const [suggestions, setSuggestions] = useState([
    "Service", "Price Details","Internship","Job Openings", "More"
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSuggestionClick = (suggestion) => {
    let newMessages = [...messages, { text: suggestion, sender: "user" }];
  
    // Based on the suggestion, show relevant content one-by-one
    if (suggestion === "Service") {
      newMessages.push(
        { 
          text: (
            <>
              We offer:<br />
              <strong>DEVELOPING:</strong><br />
              &nbsp;&nbsp;1. App Developing<br />
              &nbsp;&nbsp;2. Web Developing<br />
              &nbsp;&nbsp;3. Nocode Developing<br />
              &nbsp;&nbsp;4. Blog<br />
              <strong>DESIGNINGS:</strong><br />
              &nbsp;&nbsp;1. Graphic Designing<br />
              &nbsp;&nbsp;2. Banner Designing<br />
              &nbsp;&nbsp;3. Poster Designing<br />
              &nbsp;&nbsp;4. Video Editing<br />
              <strong>DIGITAL MARKETING:</strong><br />
              &nbsp;&nbsp;1. SEO<br />
              &nbsp;&nbsp;2. Social Media<br />
              &nbsp;&nbsp;3. Content Marketing<br />
              &nbsp;&nbsp;4. WhatsApp Marketing<br />
              &nbsp;&nbsp;5. Social Media Handling<br />
              &nbsp;&nbsp;6. Influencer Promotion<br />
              &nbsp;&nbsp;7. Page Promotion
            </>
          ),
          sender: "bot"
        }
      );
    } else if (suggestion === "Price Details") {
      newMessages.push(
        { 
          text: "For more details, contact: 6380944811", 
          sender: "bot" 
        }
      );
    } else if (suggestion === "Internship") {
      newMessages.push(
        {
          text: (
            <>
              <strong>Internships:</strong><br />
              1. SOFTWARE DEVELOPING <br />
              2. DIGITAL MARKETING <br />
              3. GRAPHIC DESIGNING <br />
              4. ARTIFICIAL INTELLIGENCE <br />
              5. ADMINISTRATIVE TECHNICAL SUPPORT <br />
              6. CYBER SECURITY <br />
              7. SELF DEVELOPMENT <br />
              8. FUNDAMENTALS OF IT SECTOR <br />
              9. PROJECT PREPARATION <br />
              10. INVESTMENT & SHARE MARKETING 
            </>
          ),
          sender: "bot"
        }
      );
    } else if (suggestion === "Job Openings") {
      newMessages.push(
        {
          text: "More details 6380944811 WhatsApp or contact",
          sender: "bot"
        }
      );
    } else if (suggestion === "More") {
      newMessages.push({ text: "Feel free to ask us more questions!", sender: "bot" });
    }
  
    setMessages(newMessages);
  };
  
  const handleMessageSend = () => {
    if (inputMessage) {
      // Add the user's message to the chat
      setMessages([...messages, { text: inputMessage, sender: "user" }]);
  
      // After sending the user's message, show the default bot response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "More details 6380944811 WhatsApp or contact", sender: "bot" }
        ]);
      }, 500); // You can adjust the delay as per your preference
  
      setInputMessage(""); // Clear input field
    }
  };
  
  return (
    <div>
      {!isOpen && (
        <>
          <p className="chat-text">heyy... i'm Leza</p>
          <div className="dots-container">
            <div className="dot-large"></div>
            <div className="dot-medium"></div>
            <div className="dot-small"></div>
          </div>
        </>
      )}

      {!isOpen ? (
        <img
          src={logo}
          alt="Logo"
          className="chat-logo"
          onClick={() => setIsOpen(true)} // Open chat window on click
        />
      ) : (
        <div className="chatbot-container">
          <button className="close-btn" onClick={() => setIsOpen(false)}>X</button>
          <div className="chat-header">
            <img src={logo} alt="Logo" className="header-logo" />
            <h3 className="chat">Leza For You</h3>
          </div>
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`message-wrapper ${msg.sender}`}>
                {msg.sender === "bot" && <img src={logo} alt="Bot Logo" className="bot-logo" />}
                <div className={`message ${msg.sender}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="message suggestion"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={inputMessage}
              placeholder="Type your message here..."
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button onClick={handleMessageSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
