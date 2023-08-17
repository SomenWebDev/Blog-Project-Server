const express = require("express");
const router = require("./src/routes/api");
const app = express();

// Security Middleware
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
require("dotenv").config();
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const hpp = require("hpp");
const cors = require("cors");
// Security Middleware implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
app.use(xss());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const limiter = rateLimit({ windowMs: 15 * 60 * 100, max: 3000 });
app.use(limiter);
// Routes implementation
app.use("/api/v1", router);
app.use("*", (req, res) => {
  res.status(404).json({ status: "failed", data: "Not Found" });
});
// Database
const mongoose = require("mongoose");
const database = process.env.DATABASE;
const port = process.env.PORT || 5000;
mongoose
  .connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  })
  .then(() => {
    console.log("Connected to the database.");
    app.listen(port, () => {
      console.log(`Server Running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Connection error:", error);
  });
