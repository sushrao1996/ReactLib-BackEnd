var express = require("express");
var router = express.Router();
const { getUserById } = require("../controllers/user");
const {
  getCategoryById,
  getCategory,
  getAllCategories,
  createCategory,
  updateCategory,
  removeCategory
} = require("../controllers/category");

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategories);

router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

router.put(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

router.delete(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeCategory
);
module.exports = router;
