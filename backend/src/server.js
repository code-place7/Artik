import express from "express";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";

const app = express();

app.use(clerkMiddleware()); //we can check user is authenticated or not using req.auth()
const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("Hello, World! 777");
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
  connectDB();
});
