const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");

const blogRoutes = require("./routes/blogRoutes");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"));
// handle CORS
const DEV_ORIGIN = process.env.DEV_ENV;
const PROD_ORIGIN = process.env.PROD_ENV;
const allowedOrigins = [DEV_ORIGIN, PROD_ORIGIN];

const corsOption = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS Error : Origin ${origin} is not allowed`));
    }
  },
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Middleware
app.use(cors(corsOption));
app.use(express.json());
// Serve uploaded images statically
app.use("/uploads", express.static("uploads"));
app.use("/api/blogs", blogRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
