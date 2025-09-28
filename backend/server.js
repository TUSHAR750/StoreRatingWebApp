require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./src/models");

const app = express();

// ✅ Enable CORS for React frontend
app.use(
  cors({
    origin: "http://localhost:3000", // React frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Parse incoming JSON
app.use(express.json());

// ✅ Routes
app.use("/api/auth", require("./src/routes/auth"));
app.use("/api/users", require("./src/routes/users"));
app.use("/api/stores", require("./src/routes/stores"));
app.use("/api/ratings", require("./src/routes/ratings"));

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Failed to start:", err);
  }
})();
