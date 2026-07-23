import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { connectToMongoDB } from "./src/lib/mongodb.js";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  const getGenAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing");
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", appName: "Triveni Plus Marketplace" });
  });

  app.get("/api/listings", async (req, res) => {
    try {
      const { db } = await connectToMongoDB();
      if (db) {
        const listings = await db.collection("listings").find({}).sort({ createdAt: -1 }).toArray();
        return res.json({ success: true, count: listings.length, listings });
      }
      res.json({ success: false, message: "MongoDB not connected. Using local mock dataset." });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.post("/api/listings", async (req, res) => {
    try {
      const { db } = await connectToMongoDB();
      if (!db) {
        return res.status(400).json({ success: false, message: "MongoDB Atlas is not configured yet. Please set MONGODB_URI in environment." });
      }
      const newListing = {
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const result = await db.collection("listings").insertOne(newListing);
      res.json({ success: true, insertedId: result.insertedId, listing: newListing });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.get("/api/mandi-bhav", (req, res) => {
    res.json({
      success: true,
      updatedAt: "Live - Today",
      rates: [
        { commodity: "गेहूं (Wheat - Sharbati)", commodityEn: "Wheat", pricePerQuintal: "₹2,450 - ₹2,780", mandi: "Lucknow / Kanpur Mandi", trend: "up" },
        { commodity: "धान / बासमती चावल (Paddy)", commodityEn: "Paddy", pricePerQuintal: "₹3,850 - ₹4,200", mandi: "Karnal / Punjab Mandi", trend: "up" },
        { commodity: "गेहूं का भूसा (Wheat Straw/Bhusa)", commodityEn: "Wheat Bhusa", pricePerQuintal: "₹850 - ₹1,100", mandi: "UP & MP Mandi", trend: "stable" },
        { commodity: "हरा चारा / बरसीम (Green Fodder)", commodityEn: "Green Fodder", pricePerQuintal: "₹350 - ₹500", mandi: "Rural Mandi", trend: "up" },
        { commodity: "सरसों (Mustard Seeds)", commodityEn: "Mustard", pricePerQuintal: "₹5,600 - ₹6,100", mandi: "Jaipur / Alwar Mandi", trend: "up" },
        { commodity: "चना (Chickpea/Gram)", commodityEn: "Chickpea", pricePerQuintal: "₹6,200 - ₹6,800", mandi: "Bhopal Mandi", trend: "stable" },
        { commodity: "मक्का (Maize)", commodityEn: "Maize", pricePerQuintal: "₹2,100 - ₹2,350", mandi: "Bihar / UP Mandi", trend: "down" },
        { commodity: "टमाटर (Fresh Tomato)", commodityEn: "Tomato", pricePerQuintal: "₹1,800 - ₹2,200", mandi: "Varanasi / Patna", trend: "up" }
      ]
    });
  });

  app.post("/api/ai-description", async (req, res) => {
    try {
      const { title, category, condition, details, language } = req.body;
      const ai = getGenAI();

      const prompt = `You are an expert marketplace seller assistant for India's Triveni Plus Marketplace (OLX-like platform).
Create an attractive, professional marketplace title and detailed seller description for the following item.
Item Name/Title: ${title}
Category: ${category}
Condition: ${condition}
Details/Specs: ${details || "Standard specification"}
Preferred Language: ${language === "hi" ? "Hindi (हिंदी)" : "English"}

Requirements:
- Return valid JSON strictly in this format:
{
  "optimizedTitle": "Catchy short title",
  "description": "Attractive 3-4 paragraph description mentioning condition, features, why to buy, and location/inspection terms.",
  "suggestedTags": ["tag1", "tag2", "tag3"]
}
- Do NOT include markdown code blocks around JSON. Just clean JSON text.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const text = response.text || "{}";
      const data = JSON.parse(text);
      res.json({ success: true, data });
    } catch (error: any) {
      console.error("Error in /api/ai-description:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Failed to generate AI description",
      });
    }
  });

  app.post("/api/ai-price-estimate", async (req, res) => {
    try {
      const { title, category, condition, originalPrice, ageYears, details } = req.body;
      const ai = getGenAI();

      const prompt = `You are an expert Indian market price evaluator for second-hand and new items, vehicles, livestock, crops, and electronics.
Estimate a fair market listing price in INR (₹) for:
Item: ${title}
Category: ${category}
Condition: ${condition}
Original Price (if applicable): ₹${originalPrice || "N/A"}
Age/Usage: ${ageYears || "0"} years
Extra Details: ${details || "None"}

Requirements:
- Return strictly valid JSON:
{
  "estimatedMinPrice": 15000,
  "estimatedMaxPrice": 18000,
  "recommendedPrice": 16500,
  "valuationReason": "Brief 1-2 sentence explanation in Hindi or English."
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const text = response.text || "{}";
      const data = JSON.parse(text);
      res.json({ success: true, data });
    } catch (error: any) {
      console.error("Error in /api/ai-price-estimate:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Failed to estimate price",
      });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
