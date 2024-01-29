const express = require("express");
const app = express();
const sendmail = require("./routes/sendmail.router");
const cors = require("cors");
require("dotenv").config();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/sendmail", sendmail);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
