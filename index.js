require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileUplioad = require("express-fileupload");
const path = require("path");
const router = require("./routes/index.js");
const errorHandler = require("./middleware/errorMiddleware");
const sequelize = require("./db.js");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 4300;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL
  })
);

app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUplioad({}));

app.use("/api", router);

app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"))
}

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log("Server is working... port: " + PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
