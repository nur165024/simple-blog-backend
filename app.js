// external imports
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// internal imports
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");
const blog = require("./router/blog");

const app = express();
dotenv.config();

// ----------------------- Database connection --------------------
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log("Database connection successfully!"))
  .catch((error) => console.log(error));

// ----------------------------- parser -----------------------------
// for parsing application/json
app.use(bodyParser.json());

// for parsing application
app.use(bodyParser.urlencoded({ extended: true }));

// request parser
app.use(express.json());

// cors parser
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, "/public")));

// parser secret
app.use(cookieParser(process.env.COOKIES_SECRET));

// router
app.use("/", blog);

// ----------------------------- error handling -----------------------------
// 404 page not found handler
app.use(notFoundHandler);

// error handling
app.use(errorHandler);

// app listening
app.listen(process.env.PORT, () => {
  console.log(`App listening on your ${process.env.PORT}`);
});
