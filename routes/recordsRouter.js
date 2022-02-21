const Router = require("express");
const router = new Router();
const RecordsController = require("../controllers/recordsController");
const { body } = require("express-validator");

const authMiddleware = require('../middleware/authMiddleware');

router.post(
  "/",
  body("uah").isInt({min: 0, max: 30000}),
  body("usd").isInt({min: 0, max: 3000}),
  body("euro").isInt({min: 0, max: 3000}),
  // body("password").isLength({ min: 3, max: 32 }),
  authMiddleware, RecordsController.createRecord
 );
router.put("/", authMiddleware, RecordsController.saveRecord);
router.get("/", RecordsController.getRecords);
router.delete("/:id", authMiddleware, RecordsController.deleteRecord);

// router.get('/check', authMiddleware, UserController.check);

module.exports = router;
