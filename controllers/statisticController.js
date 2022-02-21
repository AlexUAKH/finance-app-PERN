const StatisticService = require("../service/statisticService");

// const ApiError = require("../error/apiErrors");

class StatisticControler {
  async getTotal(req, res, next) {
    try {
      const total = await StatisticService.total();

      return res.json(total);
    } catch (e) {
      next(e);
    }
  }

  async getMonthTotal(req, res, next) {
    try {
      const stat = await StatisticService.monthTotal();

      return res.json(stat);
    } catch (e) {
      next(e);
    }
  }

  async getYearChart(req, res, next) {
    const { chartPeriod } = req.query;
    try {
      const stat = await StatisticService.yearChart(chartPeriod);
      return res.json(stat);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new StatisticControler();
