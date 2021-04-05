const express = require("express");
const router = express.Router();
const tablesController = require("../controllers/tablesController.js");

router.post("/add", tablesController.addTable);
router.get("/getall", tablesController.getAlltables);

module.exports = router;
