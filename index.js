const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const employeeRoute = require("./routes/employee");
const cors = require("cors");

dotenv.config();
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB is Connected Sucessfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.use("/api", employeeRoute);

app.listen(5000, () => {
  console.log("Backend server is running !");
});
