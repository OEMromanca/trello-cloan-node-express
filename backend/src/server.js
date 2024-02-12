// Import required modules
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const { userRouter } = require("./routes/userRoutes");
const { labelRouter } = require("./routes/labelRouters");
require("./db");

dotenv.config();

const app = express();

const port = process.env.ACCESS_SERVER_PORT;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/users", userRouter);
app.use("/labels", labelRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
