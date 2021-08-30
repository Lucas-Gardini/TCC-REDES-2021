const express = require("express");
const router = express.Router();
const loginController = require("../controllers/userController.js");
// const session = require("express-session");

router.post("/add", loginController.addUser);
router.post("/get", loginController.getUser);
router.post("/update", loginController.updateUser);

router.get("/getlogin", loginController.getIsLoggedIn);
router.get("/getall", loginController.getAllUsers);
router.get("/getsession", loginController.getSession);

router.delete("/delete/:id", loginController.deleteUser);

router.post("/logoff", loginController.logOffUser);

module.exports = router;
