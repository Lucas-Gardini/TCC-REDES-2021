const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController.js");

router.post("/add", productsController.addProduct);
router.get("/getall", productsController.getAllProducts);

module.exports = router;
