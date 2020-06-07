require("./config/db");
const express = require("express");
//routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const categoryRoutes = require("./routes/category");
//middlewares
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var cors = require("cors");

const app = express();

app.get("/", (req, res) => {
  res.send("React Library Backend");
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);

const port = 8000;

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
