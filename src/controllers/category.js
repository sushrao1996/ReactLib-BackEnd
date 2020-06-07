const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err) {
      return res.status(404).json({
        error: "Cannot find category"
      });
    }
    req.category = category;
    next();
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategories = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(404).json({
        error: "No category is available in DB"
      });
    }
    res.json(categories);
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Cannot save category!"
      });
    }
    return res.json(category);
  });
};

exports.updateCategory = (req, res) => {
  console.log(req.category);
  Category.findByIdAndUpdate(
    { _id: req.category._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, category) => {
      if (err) {
        return res.status(400).json({
          error: "Cannot update category"
        });
      }
      res.json(category);
    }
  );
};

exports.removeCategory = (req, res) => {
  Category.findByIdAndDelete({ _id: req.category._id }, (err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Cannot delete category"
      });
    }
    res.json({
      message: `Successfully delete ${category.name}`
    });
  });
};
