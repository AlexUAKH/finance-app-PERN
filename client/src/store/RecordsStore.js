import { makeAutoObservable } from "mobx";
import {
  getRecords,
  saveRecord,
  deleteRecord,
  createRecord,
  getStatistic
} from "../http/recordsApi";

export default class UserStore {
  constructor() {
    this._records = [];
    this._count = 0;
    this._error = null;
    this._chartData = {};
    makeAutoObservable(this);
  }

  setRecords(records) {
    this._records = records;
  }
  get records() {
    return this._records;
  }

  setCount(count) {
    this._count = count;
  }
  get count() {
    return this._count;
  }

  setError(error) {
    this._error = error;
  }
  get error() {
    return this._error;
  }

  setChartData(data) {
    this._chartData = { ...data };
  }
  get chartData() {
    return this._chartData;
  }

  async fetchRecords() {
    try {
      const { count, rows } = await getRecords();
      this.setCount(count);
      this.setRecords(rows);
    } catch (e) {}
  }

  async save(rec, newFlag) {
    try {
      if (newFlag) {
        await createRecord(rec);
      } else {
        await saveRecord(rec);
      }
      await this.fetchRecords();
    } catch (e) {
      // this.setError(e.response.data.message);
      throw Error(e.response.data.message);
    }
  }

  async delete(id) {
    try {
      await deleteRecord(id);
      await this.fetchRecords();
    } catch (e) {}
  }

  async getChartData(period) {
    try {
      let res = await getStatistic(period);
      res = res.reduce((acc, cur) => {
        return { ...acc, ...cur };
      }, {});
      this.setChartData(res);
      return res;
    } catch (e) {}
  }
}
