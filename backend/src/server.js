import express from "express";
import "dotenv/config";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("Hello, World! 777");
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
  connectDB();
});
