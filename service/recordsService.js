const { Record } = require("../models/models");
const RecordsDTO = require("../DTOs/recordsDTO");

// const ApiError = require("../error/apiErrors");

class RecordsService {
  async create(rec) {
    const record = await Record.create({ ...rec });
    const recordDTO = new RecordsDTO(record);

    return { record: recordDTO };
  }

  async save(rec) {
    const record = await Record.update({ ...rec }, { where: { id: rec.id } });
    const recordDTO = new RecordsDTO(record);
    return { record: recordDTO };
  }

  async getRecords(options) {
    options.order = [["date", "DESC"]];
    const record = await Record.findAndCountAll({ ...options });

    return { record: record };
  }

  async deleteRecord(id) {
    const record = await Record.destroy({ where: { id } });

    return { record: record };
  }
}

module.exports = new RecordsService();
