import { useState, useRef, useEffect } from "react";

export default function Assistant() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! 👋 I'm your AI learning assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, currentText]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");

    const aiResponse = `You asked: "${input}". I'll get back with detailed help soon.`;
    setIsTyping(true);
    setCurrentText("");

    let index = 0;
    const typingInterval = setInterval(() => {
      setCurrentText((prev) => prev + aiResponse[index]);
      index++;
      if (index === aiResponse.length) {
        clearInterval(typingInterval);
        setMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);
        setIsTyping(false);
        setCurrentText("");
      }
    }, 30);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col bg-white rounded-xl shadow-lg w-90 sm:w-96 h-[500px]">
        {/* Header */}
        <header className="bg-purple-600 text-white p-2 text-center text-base font-semibold rounded-t-xl">
          AI Assistant
        </header>

        {/* Chat Window */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2" style={{ scrollbarWidth: "thin" }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg max-w-[70%] break-words text-sm ${
                msg.sender === "user"
                  ? "ml-auto bg-blue-600 text-white"
                  : "mr-auto bg-gray-100 text-gray-900"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {isTyping && (
            <div className="mr-auto bg-gray-100 text-gray-900 p-2 rounded-lg max-w-[70%] font-mono text-sm flex items-center">
              {currentText}
              <span className="animate-pulse ml-1">|</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="flex p-2 border-t gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-3 py-1 rounded-lg hover:bg-purple-700 transition text-sm"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
