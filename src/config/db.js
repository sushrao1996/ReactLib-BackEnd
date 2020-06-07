const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;
db.on("error", err => {
  console.log("MongoDB Connection Failed!");
  console.error(err);
});

db.once("open", () => {
  console.log("MongoDB Connection Successful!");
});

module.exports = db;
