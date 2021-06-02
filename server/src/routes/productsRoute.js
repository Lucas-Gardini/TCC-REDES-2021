const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController.js");

router.post("/add", productsController.addProduct);
router.post("/update", productsController.updateProduct);
router.get("/getall", productsController.getAllProducts);
router.get("/getquantity", productsController.getQuantity);
router.delete("/delete/:id", productsController.delProduct);

module.exports = router;
