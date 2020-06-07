var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const { ObjectId } = Schema;

const productCartSchema = new Schema({
  product: {
    type: ObjectId,
    ref: "Product"
  },
  name: String
});

const ProductCart = mongoose.model("ProductCart", productCartSchema);

const orderSchema = new Schema(
  {
    products: [productCartSchema],
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = { ProductCart, Order };
