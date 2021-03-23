const express = require("express");
const router = express.Router();
const loginController = require("../controllers/userController.js");

router.post("/add", loginController.addUser);

router.post("/get", loginController.getUser);

router.post("/getall", loginController.getAllUsers);

router.post("/getSession", loginController.getSession);

router.delete("/del", loginController.deleteUser);

router.post("/logoff", loginController.logoffUser);

module.exports = router;
