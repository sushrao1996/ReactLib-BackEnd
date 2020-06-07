const Product = require("../models/product");
const formidable = require("formidable");
const fs = require("fs");
var _ = require("lodash");
exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(404).json({
          error: "Cannot find Product!"
        });
      }
      req.product = product;
      next();
    });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? req.query.limit : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  Product.find()
    .select("-photo")
    .limit(limit)
    .sort([[sortBy, "asc"]])
    .populate("category")
    .exec((err, products) => {
      if (err) {
        return res.status(404).json({
          error: "No products available"
        });
      }
      res.json(products);
    });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "No category found"
      });
    }
    res.json(categories);
  });
};

exports.removeProduct = (req, res) => {
  Product.findByIdAndDelete({ _id: req.product._id }, (err, product) => {
    if (err) {
      return res.status(400).json({
        error: "Cannot delete product"
      });
    }
    res.json({
      message: `Successfully deleted ${product.name}`
    });
  });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }
    const { name, description, category, stock } = fields;
    if (!name || !description || !category || !stock) {
      return res.status(400).json({
        error: "Please include all the fields"
      });
    }
    const product = new Product(fields);
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Cannot create product"
        });
      }
      res.json(product);
    });
  });
};

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }
    let product = req.product;
    product = _.extend(product, fields);

    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Cannot update product"
        });
      }
      res.json(product);
    });
  });
};

exports.getPhoto = (req, res) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
};

exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map(prod => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } }
      }
    };
  });

  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        message: "Bulk operation failed"
      });
    }
    next();
  });
};
