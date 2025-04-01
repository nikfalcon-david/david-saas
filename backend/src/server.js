const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes"); 

dotenv.config(); // Load .env variables

const app = express();

// Middlewares
app.use(cors({ origin: "*" })); // Yaha frontend ka origin set kar sakte hain
app.use(express.json());
app.use(morgan("dev")); // Logs request details

// Default Route (Fix for "Cannot GET /")
app.get("/", (req, res) => {
  res.send("✅ Server is running smoothly!");
});

// Routes
app.use("/api/auth", authRoutes); 

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

// Server start
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`🚀 Server chal raha hai: http://localhost:${PORT}`);
});