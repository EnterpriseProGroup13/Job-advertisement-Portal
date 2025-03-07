const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use("/api/jobs", require("./routes/jobRoutes"));

app.listen(process.env.PORT || 5000, () => console.log("Server running on port 5000"));


