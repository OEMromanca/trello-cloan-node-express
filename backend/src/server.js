const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { userRouter } = require("./routes/userRoutes");

dotenv.config();

const app = express();
const port = process.env.ACCESS_SERVER_PORT;
const dbConnectionString = process.env.MONGODB_URI;
const connection = mongoose.connection;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (dbConnectionString) {
  mongoose.connect(dbConnectionString);
} else {
  console.error("DB connection is not defined.");
}
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
