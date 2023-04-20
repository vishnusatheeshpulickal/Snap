const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");
connectDB();

app.use(cors());
app.use(express.json({ limit: "25mb" }));

const commonRoutes = require("./routes/common");

app.use(`${process.env.BASEURL}/`, commonRoutes);

const port = process.env.PORT || 3100;
app.listen(port, () => console.log(`Listening port ${port}`));
