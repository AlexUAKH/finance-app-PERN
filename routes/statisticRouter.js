const Router = require("express");
const router = new Router();
const StatisticController = require("../controllers/statisticController.js");

router.get("/total", StatisticController.getTotal);
router.get("/month-total", StatisticController.getMonthTotal);
router.get("/year-chart", StatisticController.getYearChart);
// router.delete("/:id", authMiddleware, RecordsController.deleteRecord);

module.exports = router;
