import React, { useState, useRef, useEffect } from "react";
import { marked } from "marked";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const chatbotRef = useRef(null);

  const messagesEndRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const API_KEY = "AIzaSyCbwpJyMLK7J3btaApB7-5Szwqn-r9ZWcw";
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  function openChat() {
    setIsOpen(true);
  }

  function closeChat() {
    setIsOpen(false);
  }

  async function getBotResponse(userMessage) {
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: userMessage }],
            },
          ],
        }),
      });

      const data = await response.json();

      if (!data.candidates || !data.candidates.length) {
        throw new Error("No response from Gemini API");
      }

      const botMessage = data.candidates[0].content.parts
        .map((part) => part.text)
        .join("\n\n");

      setMessages((prev) => [...prev, { sender: "bot", text: botMessage }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I'm having trouble responding. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function sendMessage() {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { sender: "user", text: trimmed }]);
    setInputValue("");
    getBotResponse(trimmed);
  }

  // Handle Enter key in input
  function handleKeyPress(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {/* Chatbot Icon */}
      {!isOpen && (
        <div
          id="chatbot-icon"
          aria-label="Open chat"
          role="button"
          tabIndex={0}
          title="Open chat"
          onClick={openChat}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openChat();
            }
          }}
          style={{
            cursor: "pointer",
            fontSize: "2.4rem",
            position: "fixed",
            bottom: 20,
            right: 20,
            background: "#4f46e5",
            color: "white",
            padding: "3px 9px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 8px rgba(79, 70, 229, 0.3)",
            transition: "background-color 0.3s ease",
            zIndex: 1000,
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#4338ca")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#4f46e5")}
        >
          💬
        </div>
      )}

      {/* Container full bottom width wrapper */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100vw",
          display: isOpen ? "flex" : "none",
          justifyContent: "flex-end",
          paddingRight: 20,
          paddingBottom: 20,
          boxSizing: "border-box",
          zIndex: 1000,
          background: "transparent", 
        }}
      >
        {/* Chatbot Container */}
        <div
          ref={chatbotRef}
          style={{
            width: 560,
            height: 680,
            background: "white",
            borderRadius: 12,
            border: "1px solid #e0e7ff",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 8px 20px rgba(79, 70, 229, 0.25)",
          }}
        >
          {/* HEADER */}
          <div
            style={{
              background: "#4f46e5",
              color: "white",
              padding: "12px 16px",
              fontWeight: 700,
              fontSize: "1.25rem",
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              flexShrink: 0, 
            }}
          >
            ChatBot
          </div>

          {/* SCROLLABLE MESSAGES */}
          <div
            style={{
              flex: 1, 
              overflowY: "auto", 
              padding: "1rem",
              background: "#f9fafb",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg max-w-xs break-words ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white self-end ml-[10rem] my-4"
                    : "bg-gray-300 text-gray-800 self-start"
                }`}
                dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) }}
              />
            ))}
            {loading && (
            <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        color: "#6b7280", // Tailwind gray-500
        fontWeight: 500,
        fontSize: 14,
        userSelect: "none",
      }}
      aria-label="Bot is thinking"
      role="status"
    >
      <span>Thinking</span>
      <span style={{ display: "flex", gap: 4,marginTop:13 }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: "#4f46e5", // Indigo 600
              animation: `bounce 1.4s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </span>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: translateY(0);
            opacity: 0.3;
          }
          40% {
            transform: translateY(-8px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT BAR */}
          <div
            style={{
              padding: "12px 16px",
              borderTop: "1px solid #e0e7ff",
              display: "flex",
              gap: 10,
              background: "white",
              flexShrink: 0, // keep fixed
            }}
          >
            <input
              placeholder="Ask anything"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{
                flexGrow: 1,
                padding: "10px",
                borderRadius: 8,
                border: "1px solid #bfdbfe",
                backgroundColor: "#eff6ff",
              }}
              className="chatbot-input"
            />
            <button
              onClick={sendMessage}
              disabled={!inputValue.trim() || loading}
              style={{
                background: "#4f46e5",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
