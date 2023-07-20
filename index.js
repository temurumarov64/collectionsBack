require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes/index");
const cors = require("cors");
const multer = require("multer");

const sequelize = require("./database");
const models = require("./models");
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api/v1", router);
app.use("/images", express.static("./images"));

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize
      .sync()
      .then((data) => {
        console.log("table and model synced successfully!");
      })
      .catch((error) => {
        console.log("Error syncing the table and model");
      });
    console.log("Connection has been established successfully.");
    app.listen(PORT, () => console.log("App is listening on port " + PORT));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

start();
