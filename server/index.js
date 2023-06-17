const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const PORT = process.env.PORT | 3001;
const authRouter = require("./routes/auth");
const documentRouter = require("./routes/document");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(documentRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connection to db successful");
  })
  .catch(() => {
    console.log("Connection to db failed!");
  });
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Connected at port ${PORT}`);
});
