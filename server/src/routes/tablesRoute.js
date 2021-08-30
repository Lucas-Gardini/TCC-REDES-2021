const express = require("express");
const router = express.Router();
const tablesController = require("../controllers/tablesController.js");

router.post("/add", tablesController.addTable);
router.post("/availability/:id", tablesController.changeAvailability);

router.get("/getall", tablesController.getAlltables);
router.get("/getbyid/:id", tablesController.getTableById);
router.get("/getquantity", tablesController.getQuantity);

router.delete("/del/:id", tablesController.deleteTable);

module.exports = router;
