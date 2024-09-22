import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import hljs from "highlight.js"; // Highlight.js import ediyoruz
import "highlight.js/styles/github-dark.css"; // GitHub tarzı karanlık tema
import './App.css';

// Kod blokları için CodeBlock bileşeni
function CodeBlock({ code, language }) {
  const codeRef = useRef(null);

  useEffect(() => {
    // Highlight.js ile kodu stilize et
    hljs.highlightElement(codeRef.current);
  }, [code]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code); // Kodu panoya kopyalar
    alert("Code copied to clipboard!"); // Bildirim göster
  };

  return (
    <div className="code-block">
      <pre>
        <code ref={codeRef} className={`language-${language}`}>
          {code}
        </code>
      </pre>
      <button onClick={copyToClipboard} className="copy-button">Copy</button>
    </div>
  );
}

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [models, setModels] = useState([]);  // Yüklü modelleri tutar
  const [selectedModel, setSelectedModel] = useState("");  // Seçilen modeli tutar
  const [loading, setLoading] = useState(true);  // Yüklenme durumu

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get("http://localhost:11434/api/tags");
        const modelList = response.data.models || [];
        setModels(modelList);
        if (modelList.length > 0) {
          setSelectedModel(modelList[0].name);
        }
      } catch (error) {
        console.error("Error fetching models:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchModels();
  }, []);

  const parseCodeBlock = (message) => {
    // Kod bloklarını tanıma
    const codeRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const match = codeRegex.exec(message);

    if (match) {
      const language = match[1] || 'plaintext'; // Kod dilini algıla (varsayılan plaintext)
      const code = match[2];
      return { isCode: true, language, code };
    }
    return { isCode: false, message };
  };

  const sendMessage = async () => {
    if (input.trim() === "" || selectedModel === "") return;
  
    const newMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  
    try {
      // Ollama API'ye POST isteği
      const response = await axios.post("http://localhost:11434/api/generate", {
        model: selectedModel,
        prompt: input,
        stream: false,
      });
  
      // Cevap geldiğinde kontrol et
      console.log("Ollama response:", response.data);
  
      const botMessage = { sender: "bot", text: response.data.response };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      // Hata durumunu konsola yazdır
      console.error("Error fetching response from Ollama:", error);
    }
  
    setInput("");
  };
  

  return (
    <div className="chat-container">
      {loading ? (
        <div>Loading models...</div>
      ) : (
        <div className="model-selector">
          <label htmlFor="model">Choose a model:</label>
          <select
            id="model"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
          >
            {models.map((model, index) => (
              <option key={index} value={model.name}>
                {model.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="chat-box">
        {messages.map((message, index) => {
          const { isCode, language, code, message: plainMessage } = parseCodeBlock(message.text);
          return (
            <div key={index} className={`message ${message.sender}`}>
              {/* Eğer kod bloğu mesajıysa CodeBlock bileşeni */}
              {isCode ? (
                <CodeBlock code={code} language={language} />
              ) : (
                plainMessage
              )}
            </div>
          );
        })}
      </div>

      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
