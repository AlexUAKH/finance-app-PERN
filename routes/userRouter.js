const Router = require("express");
const router = new Router();
const UserController = require("../controllers/userController");
const { body } = require("express-validator");

// const authMiddleware = require('../middleware/authMiddleware');

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  UserController.registration
);
router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  UserController.login
);
router.post("/logout", UserController.logout);
router.get("/refresh", UserController.refresh);

// router.get('/check', authMiddleware, UserController.check);

module.exports = router;
