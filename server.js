import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectDB } from "./db.js";
import colors from "colors";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors("*"));

import UserRoute from "./routes/usersRoute.js";

//users routes
app.use("/api/v1/users", UserRoute);
//interests routes

//home route
app.get("/", (req, res) => {
  res.send("<h2>Welcome to backend of Expatswap.</h2>");
});

//page not found
app.all("*", async (req, res) => {
  try {
    res.status(404);
    throw new Error("Sorry, no endpoint found");
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
});

const start = async (port) => {
  try {
    const conn = await connectDB();
    app.listen(port, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`server is running on port ${port}`.bgCyan);
    });

    console.log(
      `Database is up and running on ${conn.connection.host}`.bgGreen.underline
    );
  } catch (err) {
    console.log(`${err}`.bgRed.underline);
  }
};

const PORT = process.env.PORT || 4500;

start(PORT);
