const express = require("express");
const router = express.Router();
const loginController = require("../controllers/userController.js");
const session = require("express-session");

router.post("/add", loginController.addUser);

router.post("/get", loginController.getUser);

router.post("/getall", loginController.getAllUsers);

router.post("/getsession", loginController.getSession);

router.delete("/del", loginController.deleteUser);

router.post("/logoff", loginController.logOffUser);

module.exports = router;
