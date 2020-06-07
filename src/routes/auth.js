var express = require("express");
var router = express.Router();
const { signin, signup, signout } = require("../controllers/auth");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signout);

module.exports = router;
