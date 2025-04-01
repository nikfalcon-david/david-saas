const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Authorization header check
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    // Extract Token
    const token = authHeader.split(" ")[1];

    // Check if JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing in environment variables.");
      return res.status(500).json({ message: "Internal Server Error" });
    }

    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next(); // Move to next middleware
  } catch (err) {
    console.error("JWT verification error:", err);
    return res.status(401).json({ message: "Invalid Token" });
  }
};