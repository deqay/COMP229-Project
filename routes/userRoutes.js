const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/auth");

//define routes

router.post("/users", userController.createUser);
router.get("/users", isAuthenticatedUser, userController.getAllUsers);
router.get("/users/:userid", isAuthenticatedUser, userController.getUserById);
router.put("/users/:userid", isAuthenticatedUser, userController.updateUser);
router.delete("/users/:userid", isAuthenticatedUser, userController.deleteUser);
router.post("/users/signin", userController.signIn);
router.post("/users/signout", userController.signOut);

module.exports = router;
