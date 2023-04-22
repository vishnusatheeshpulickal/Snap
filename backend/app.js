const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");
const morgan = require("morgan");
connectDB();

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(morgan("tiny"));

const commonRoutes = require("./routes/common");
const userRoutes = require("./routes/user");
// const uploadRoutes = require("./routes/upload");

app.use(`${process.env.BASEURL}/`, commonRoutes);
app.use(`${process.env.BASEURL}/user`, userRoutes);
// app.use(`${process.env.BASEURL}/upload`, uploadRoutes);

const port = process.env.PORT || 3100;
app.listen(port, () => console.log(`Listening port ${port}`));
