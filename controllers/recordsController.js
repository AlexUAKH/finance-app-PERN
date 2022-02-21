const { validationResult } = require("express-validator");

const RecordsService = require("../service/recordsService.js");
const ApiError = require("../error/apiErrors");

class RecordsControler {
  async createRecord(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest("Validation error", errors));
      }
      const recordsData = await RecordsService.create(req.body);

      return res.json(recordsData);
    } catch (e) {
      next(e);
    }
  }

  async saveRecord(req, res, next) {
    try {
      const recordsData = await RecordsService.save(req.body);

      return res.json(recordsData);
    } catch (e) {
      next(e);
    }
  }

  async getRecords(req, res, next) {
    try {
      let { limit, page } = req.query;
      page = page || 1;
      limit = limit || 100;
      let offset = page * limit - limit;
      let records;
      records = await RecordsService.getRecords({ limit, offset });

      return res.json(records);
    } catch (e) {
      next(e);
    }
  }

  async deleteRecord(req, res, next) {
    try {
      const id = req.params.id;

      const record = await RecordsService.deleteRecord(id);
      return res.json(record);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new RecordsControler();
