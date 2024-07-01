// server.js
const express = require("express");
const { connectDB } = require("./db");
const userRoutes = require("./routes/userRoutes");
const quizRoutes = require("./routes/quizRoutes");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// Enable CORS
app.use(cors());

// Init Middleware
app.use(bodyParser.json());

// Define Routes
app.use("/api", userRoutes);
app.use("/api/quiz", quizRoutes);
app.get("/", (req, res) => {
    console.log("Hello World");
    res.send("Hello World");
});

const start = async () => {
    const PORT = process.env.PORT || 8000;
    await connectDB();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

start();