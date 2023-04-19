const express = require("express");
const app = express();
const connectDB = require("./config/db");
connectDB();

const port = process.env.PORT || 3100;
app.listen(port, () => console.log(`Listening port ${port}`));
