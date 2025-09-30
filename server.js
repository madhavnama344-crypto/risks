// server.js

// --- Imports ---
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

// --- Initialization ---
dotenv.config();
const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Routes ---
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/ai", async (req, res) => {
  console.log("✅ Received request at /api/ai");
  const apiKey = process.env.NVIDIA_API_KEY;

  if (!apiKey) {
    console.error("❌ NVIDIA_API_KEY is not set in the .env file.");
    return res.status(500).json({ error: "API key is not configured on the server." });
  }

  try {
    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("❌ NVIDIA API returned an error:", response.status, errorData);
      return res.status(response.status).json({ error: errorData.error || `NVIDIA API Error: ${response.statusText}` });
    }

    const data = await response.json();
    res.json(data);

  } catch (err) {
    console.error("❌ Fatal error when trying to contact NVIDIA API:", err);
    res.status(500).json({ error: "Failed to contact NVIDIA API. Check the server terminal for more details." });
  }
});

// --- Server Start ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Backend server running on http://0.0.0.0:${PORT}`);
});