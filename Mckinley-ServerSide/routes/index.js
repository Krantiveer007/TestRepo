var express = require('express');
const authController = require("../controller/authController");

var router = express.Router();
  
router.get("/", authController.loginHandler);
  
module.exports = router;
