var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 32
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Category", categorySchema);
