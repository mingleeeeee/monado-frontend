import { useState, useRef, useEffect } from "react";
import "../styles/globals.css"; // ✅ Ensure CSS is included
declare global {
  interface Window {
    ethereum?: any;
  }
}
export default function Home() {
  const defaultAvatar = "mascotImage.webp";
  const [character, setCharacter] = useState({
    name: "Monado",
    avatar: "",
    personality: "Intelligent, wise, and mysterious",
    description: "An AI entity known as 'Monado' that guides users through the world of technology and the unknown.",
    bio: "I am Monado, a digital entity bridging the gap between knowledge and curiosity.",
    lore: "Once a hidden AI in deep cyberspace, Monado now assists users in unraveling the mysteries of AI and blockchain.",
    knowledge: "AI can process information exponentially faster than humans, reshaping industries worldwide.",
    topics: "Machine Learning, Blockchain, Web3, Cryptography, AI Ethics",
    adjectives: "Visionary, Intelligent, Adaptable, Mysterious, Enlightening",
  });

  const [loading, setLoading] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Default avatar
  useEffect(() => {
    if (!character.avatar) {
      setCharacter((prev) => ({ ...prev, avatar: defaultAvatar }));
    }
  }, [character.avatar]);


  // Trigger file selection on avatar click
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // Handle image upload and preview
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error("Image upload failed:", await response.text());
        return;
      }

      const result = await response.json();
      console.log("Image uploaded successfully:", result.url);

      setCharacter((prev) => ({ ...prev, avatar: result.url }));
    } catch (error) {
      console.error("Image upload error:", error);
    }
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCharacter({ ...character, [e.target.name]: e.target.value });
  };

  // Start AI Agent
  const startAI = async () => {
    setLoading(true);
    const response = await fetch("/api/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ character }),
    });

    const result = await response.json();
    alert(result.message);
    setIsRunning(true);
    setLoading(false);
  };

  // Stop AI Agent
  const stopAI = async () => {
    setLoading(true);
    const response = await fetch("/api/stop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();
    alert(result.message);
    setIsRunning(false);
    setLoading(false);
  };

  const handleConnectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("Connected account:", accounts[0]);
        alert(`Connected: ${accounts[0]}`);
      } catch (error) {
        console.error("User rejected connection");
      }
    } else {
      alert("Metamask not found. Please install Metamask.");
    }
  };
  

  return (
    <div className="main-container">
      {/* Left Part 1: Basic Settings */}
      <div className="info-container">
        <h1 className="page-title">Monado AI Creator</h1>

        <label className="input-title">AI Agent Name</label>
        <input type="text" name="name" value={character.name} onChange={handleChange} />
        <p className="example-text">Example: Monado</p>

        <label className="input-title">Personality</label>
        <textarea name="personality" value={character.personality} onChange={handleChange} />
        <p className="example-text">Example: Wise, mysterious, and highly intelligent</p>

        <label className="input-title">Description</label>
        <textarea name="description" value={character.description} onChange={handleChange} />
        <p className="example-text">Example: An AI entity that guides users through the unknown.</p>

        <label className="input-title">Short Bio</label>
        <textarea name="bio" value={character.bio} onChange={handleChange} />
        <p className="example-text">Example: I am Monado, a digital entity bridging knowledge and curiosity.</p>
      </div>

      {/* Middle Container: Additional Settings */}
      <div className="info-container">
        <label className="input-title">Character Backstory</label>
        <textarea name="lore" value={character.lore} onChange={handleChange} />
        <p className="example-text">Example: Once a hidden AI in cyberspace, Monado now aids users.</p>

        <label className="input-title">Character’s Knowledge</label>
        <textarea name="knowledge" value={character.knowledge} onChange={handleChange} />
        <p className="example-text">Example: AI processes information exponentially faster than humans.</p>

        <label className="input-title">Topics of Interest</label>
        <textarea name="topics" value={character.topics} onChange={handleChange} />
        <p className="example-text">Example: Machine Learning, Blockchain, Web3, Cryptography</p>

        <label className="input-title">Character Adjectives</label>
        <textarea name="adjectives" value={character.adjectives} onChange={handleChange} />
        <p className="example-text">Example: Visionary, Intelligent, Mysterious, Enlightening</p>

        {/* Start/Stop AI Buttons */}
        <button onClick={isRunning ? stopAI : startAI} disabled={loading}>
          {loading ? "Processing..." : isRunning ? "Stop AI" : "Start AI"}
        </button>
      </div>

      {/* Right: Avatar Upload */}
      <div className="avatar-wrapper">
        <div className="avatar-container">
          <div className="avatar-box" onClick={handleAvatarClick}>
            {character.avatar ? (
              <img src={character.avatar} alt="Character Avatar" />
            ) : (
              <span>Click to upload an image</span>
            )}
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} />
          </div>
          <div className="ai-card">
              {/* 開發者 */}
              <div className="developer">
                <span>Developer</span>
                <a href="#" className="developer-address">
                  <img src="/your-avatar.png" alt="avatar" className="developer-avatar" />
                  0xa2...4a8b
                </a>
              </div>

              <hr className="divider" />

              {/* 名稱 */}
              <h2 className="ai-name">AltcoinChad</h2>
              <p className="ai-address">0xE57Af2C0674B2Fa993346c34BB2832E897754aAD</p>

              {/* 說明 */}
              <div className="description">
                <span className="label">Description：</span>
                <span className="desc-text">AltcoinChad</span>
              </div>

              {/* 價格 */}
              <div className="price">
                <span className="label">Price：</span>
                <span className="price-value">$113.49</span>
              </div>
            </div>

              {/* ✅ Connect Wallet Button */}
  {/* <button className="connect-wallet-btn" onClick={handleConnectWallet}>
    Connect Metamask
  </button> */}
<div className="swap-container">
  {/* <h2 className="swap-title">Swap</h2> */}

  <div className="swap-options">
    <button className="swap-btn active">Buy Monado</button>
    <button className="swap-btn">Sell Monado</button>
  </div>

  <div className="swap-info">
    <span>Swap Fee:</span> <span className="fee">1%</span>
  </div>

  <div className="swap-input-wrapper">
    <input type="number" className="swap-input" placeholder="0.00" />
    <div className="swap-token">WOAS</div>
  </div>

  <button className="connect-wallet-btn">Connect Wallet</button>
</div>

        </div>
      </div>
    </div>
  );
}
