const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const opdRoutes = require("./routes/opdRoutes");
const blogRoutes = require("./routes/blogRoutes");
const patientRegistration = require("./routes/PatientRegistrationRoute");
const clinicPartner = require("./routes/clinicPartnerRoute")
const consultRoutes = require("./routes/consultationRoute")
const joinUsRoutes = require("./routes/joinUsRoutes");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"));
// handle CORS
const DEV_ORIGIN = process.env.DEV_ENV;
const TEST_ORIGIN = process.env.TEST_ENV;
const LANDING_ORIGIN = process.env.LANDING_PAGE_ENV;
const ADMIN_ORIGIN = process.env.ADMIN_ENV;
const PROD_ORIGIN = process.env.PROD_ENV;
const allowedOrigins = [DEV_ORIGIN, PROD_ORIGIN, ADMIN_ORIGIN, TEST_ORIGIN, LANDING_ORIGIN];

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

//OPD routes
app.use("/api/opds", opdRoutes);
app.use("/api", patientRegistration);
app.use("/api", clinicPartner);
app.use("/api/consult", consultRoutes);

// Join us routes
app.use("/api/joinus", joinUsRoutes);

// Serve uploaded images statically
app.use("/uploads", express.static("uploads"));
app.use("/api/blogs", blogRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
