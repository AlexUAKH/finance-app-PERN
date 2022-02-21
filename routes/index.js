const Router = require("express");
const router = new Router();

const UserRouter = require("./userRouter.js");
const RecordsRouter = require("./recordsRouter.js");
const StatisticRouter = require("./statisticRouter.js");

router.use("/user", UserRouter);
router.use("/records", RecordsRouter);
router.use("/statistic", StatisticRouter);

module.exports = router;
