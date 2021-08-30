const express = require("express");
const router = express.Router();
const requestsController = require("../controllers/requestsController.js");

router.post("/add", requestsController.addRequest);
router.post("/finish", requestsController.finishRequest);
router.get("/getall", requestsController.getAllRequests);
router.get("/gettoday", requestsController.getTodayRequests);
router.get("/getquantity", requestsController.getQuantity);

module.exports = router;
