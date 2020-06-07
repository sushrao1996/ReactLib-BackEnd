var express = require("express");
var router = express.Router();
const {
  getProductById,
  getProduct,
  getAllProducts,
  getAllUniqueCategories,
  removeProduct,
  createProduct,
  updateProduct,
  getPhoto
} = require("../controllers/product");
const { getUserById } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("productId", getProductById);
router.param("userId", getUserById);

router.get("/product/:productId", getProduct);
router.get("/products", getAllProducts);
router.get("/product/categories", getAllUniqueCategories);
router.get("/product/photo/:productId", getPhoto);

router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeProduct
);
module.exports = router;
