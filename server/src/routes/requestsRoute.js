const express = require("express");
const router = express.Router();
const requestsController = require("../controllers/requestsController.js");

router.post("/add", requestsController.addRequest);
router.get("/getall", requestsController.getAllRequests);
router.get("/getquantity", requestsController.getQuantity);

module.exports = router;
