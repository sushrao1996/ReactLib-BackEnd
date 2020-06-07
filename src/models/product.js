var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const { ObjectId } = Schema;
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      maxlength: 2000,
      required: true,
      trim: true
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true
    },
    stock: {
      type: Number
    },
    sold: {
      type: Number,
      default: 0
    },
    photo: {
      data: Buffer,
      contentType: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", productSchema);
