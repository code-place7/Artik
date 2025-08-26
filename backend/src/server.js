import "../instrument.mjs";
import express from "express";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { functions, inngest } from "./config/inngest.js";
import { serve } from "inngest/express";
import chatRoutes from "./routes/chat.route.js";
import * as Sentry from "@sentry/node";

const app = express();

app.use(clerkMiddleware()); //we can check user is authenticated or not using req.auth()
app.use(express.json());
const PORT = process.env.PORT || 5001;

app.get("/debug-sentry", (req, res) => {
  throw new Error("MY first Sentry error on Purpose");
});

app.get("/", (req, res) => {
  res.send("Hello, World! 777");
});

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);

Sentry.setupExpressErrorHandler(app);

const startServer = async () => {
  try {
    await connectDB();
    if (process.env.NODE_ENV !== "production") {
      app.listen(PORT, () => {
        console.log("Server started on port:", PORT);
      });
    }
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1); // Exit the process with a failure code
  }
};

startServer();

export default app;
