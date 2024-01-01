const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./database/db");

// import routes
const authRouter = require("./routes/authRoute");
const inventoryRouter = require("./routes/inventoryRoute");

// Create express app
const app = express();

//configure dotenv for env variables
// if not at root level dotenv.config({"../../"}) => enter .env file path
dotenv.config();

// Database connection
connectDB();

// To handle responses in json format
app.use(express.json());

// To handler cross origin errors like react on 3000 , node on 8080 port
app.use(cors());

// To log the requested router path
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/inventory", inventoryRouter);

const PORT = process.env.PORT || "8080";
app.listen(PORT, () => {
  console.log(`Server running successfully on ${PORT}`.bgGreen.white);
});
