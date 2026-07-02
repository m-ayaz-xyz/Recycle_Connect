require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoute");

const app = express();
// const FrontendURL = process.env.FRONTEND_URL || "http://localhost:3000";

connectDB();

app.use(express.json());

app.use(cookieParser());

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://recycle-connect.vercel.app"
  ],
  credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.get("/health", (req, res) => {
  res.send("API is running...");
});

app.listen(process.env.PORT, () => {
  console.log("Server Running");
});
