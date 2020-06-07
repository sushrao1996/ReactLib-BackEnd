const { Order } = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          message: " No order found in db"
        });
      }
      req.order = order;
      next();
    });
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        message: "Failed to save order in db"
      });
    }
    res.json(order);
  });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          message: "No orders found in DB"
        });
      }
      res.json(order);
    });
};
