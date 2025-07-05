require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const config = require("./config/config");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const AppError = require("./exceptions/AppError");
const setupSwagger = require("./config/swagger");
const { initData } = require("./services/dataInitService");
const apiKeyMiddleware = require("./middleware/apiKey");

// Import routes
const movieRoutes = require("./routes/movieRoutes");
const memberRoutes = require("./routes/memberRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");

const app = express();
const PORT = process.env.PORT || 8001;
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs", "server.log"),
  { flags: "a" }
);

// Connect to MongoDB
connectDB().then(initData());
setupSwagger(app);

// app.use(apiKeyMiddleware);
app.use(cors());
app.use(express.json());
app.use(morgan("combined", { stream: accessLogStream }));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", "https://jsonplaceholder.typicode.com"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        scriptSrcAttr: ["'self'", "'unsafe-inline'"],
      },
    },
  })
);
app.use(compression());

// Routes
app.get("/", (req, res) => {
  res.send("Subscriptions WS up and running");
});
app.use("/api/movies", movieRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/subscriptions", subscriptionRoutes);

// 404 fallback
app.use((req, res, next) => {
  next(new AppError("Route not found", 404));
});

// Global error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  if (config.env === "development") {
    console.log(`🚀 app is listening at http://localhost:${PORT}`);
    console.log("Running in DEVELOPMENT mode");
  } else {
    console.log(
      `🚀 app is listening at https://factorymanager-6t60.onrender.com`
    );
    console.log("Running in PRODUCTION mode");
  }
});
