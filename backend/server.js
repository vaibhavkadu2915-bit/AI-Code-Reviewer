require("dotenv").config();

const express = require("express");
const cors = require("cors");

const reviewRoutes = require("./src/routes/reviewRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/", reviewRoutes);

app.get("/", (req, res) => {
    res.send("AI Code Reviewer Backend is Running!");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});