const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));

const authRoutes      = require("./routes/authRoutes");
const scriptRoutes    = require("./routes/scriptRoutes");
const seoRoutes       = require("./routes/seoRoutes");
const topicRoutes     = require("./routes/topicRoutes");
const channelRoutes   = require("./routes/channelRoutes");
const thumbnailRoutes = require("./routes/thumbnailRoutes");
const nicheRoutes     = require("./routes/nicheRoutes");
const shortsRoutes    = require("./routes/shortsRoutes");
const adminRoutes     = require("./routes/adminRoutes");

app.use("/api/auth",      authRoutes);
app.use("/api/script",    scriptRoutes);
app.use("/api/seo",       seoRoutes);
app.use("/api/topic",     topicRoutes);
app.use("/api/channel",   channelRoutes);
app.use("/api/thumbnail", thumbnailRoutes);
app.use("/api/niche",     nicheRoutes);
app.use("/api/shorts",    shortsRoutes);
app.use("/api/admin",     adminRoutes);

app.get("/", (req, res) => {
  res.json({ status: "VidFlow AI Backend Running ✅" });
});

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/vidflow")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});