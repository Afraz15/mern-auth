const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/user-router");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", router);

mongoose
  .connect(
    "mongodb+srv://admin:dummyAdmin@auth-mern-app.1mmzmzy.mongodb.net/auth?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port, () => {
      console.log("Server is running on port", port);
    });
  });

// app.get("/hi", (req, res) => {res.send('hello')});
