const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/auth");

//define routes

router.post("/users", userController.createUser);
router.get("/users", isAuthenticatedUser, userController.getAllUsers);
router.get("/users/me", isAuthenticatedUser, userController.getProfile);
router.get("/users/:userid", userController.getUserById);
router.put("/users/:userid", isAuthenticatedUser, userController.updateUser);
router.delete("/users/:userid", isAuthenticatedUser, userController.deleteUser);
router.post("/users/signin", userController.signIn);
router.post("/users/signout", userController.signOut);
router.delete(
  "/reviews/:reviewid",
  isAuthenticatedUser,
  userController.deleteReview
);
router.get("/products", userController.getAllProducts);
router.get("/reviews", userController.getAllReviews);
router.post("/reviews", userController.postReview);
router.get("/reviews/search", userController.getReviwsByProductId);
router.get("/reviews/usersearch", userController.getReviwsByUserId);
router.get("/products/:productid", userController.getProductById);
module.exports = router;
