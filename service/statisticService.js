const moment = require("moment");
const { Op } = require("sequelize");
const { Record } = require("../models/models");

class StatisticService {
  async total() {
    try {
      const records = await Record.findAll({
        attributes: ["uah", "usd", "euro", "type"]
      });
      const totalAmount = records.reduce(
        (acc, cur) => {
          return {
            uah: cur.type === "ADD" ? acc.uah + cur.uah : acc.uah - cur.uah,
            usd: cur.type === "ADD" ? acc.usd + cur.usd : acc.usd - cur.usd,
            euro: cur.type === "ADD" ? acc.euro + cur.euro : acc.euro - cur.euro
          };
        },
        { uah: 0, usd: 0, euro: 0 }
      );
      return { totalAmount };
    } catch (e) {
      console.log("error: ", e);
    }
  }

  async monthTotal(monthCount = 1) {
    try {
      const records = await Record.findAll({
        attributes: ["uah", "usd", "euro", "type"],
        where: {
          date: {
            [Op.between]: [
              moment().subtract(monthCount, "M").toDate(),
              moment().toDate()
            ]
          }
        }
      });

      const lastMonthOffering = records.reduce(
        (acc, cur) => {
          return {
            uah: cur.type === "ADD" ? acc.uah + cur.uah : acc.uah,
            usd: cur.type === "ADD" ? acc.usd + cur.usd : acc.usd,
            euro: cur.type === "ADD" ? acc.euro + cur.euro : acc.euro
          };
        },
        { uah: 0, usd: 0, euro: 0 }
      );

      const lastMonthSpend = records.reduce(
        (acc, cur) => {
          return {
            uah: cur.type === "ADD" ? acc.uah : acc.uah + cur.uah,
            usd: cur.type === "ADD" ? acc.usd : acc.usd + cur.usd,
            euro: cur.type === "ADD" ? acc.euro : acc.euro + cur.euro
          };
        },
        { uah: 0, usd: 0, euro: 0 }
      );

      return { lastMonthOffering, lastMonthSpend };
    } catch (e) {
      console.log("error: ", e);
    }
  }

  async yearChart(chartPeriod = 6) {
    const yearTotal = [];
    try {
      for (let i = 0; i < chartPeriod; i++) {
        const record = await Record.findAll({
          attributes: ["uah", "type"],
          where: {
            date: {
              // [Op.between]: [
              //   moment("0101", "MMDD").subtract(i, "M").toDate(),
              //   i === 0 ? moment().toDate() : moment("0101", "MMDD").subtract(i-1, "M").toDate()
              // ],
              [Op.gt]: moment("0101", "MMDD").subtract(i, "M").toDate(),
              [Op.lte]:
                i === 0
                  ? moment().toDate()
                  : moment("0101", "MMDD")
                      .subtract(i - 1, "M")
                      .toDate()
            }
          }
        });
        yearTotal.push(record);
      }
      const lastYear = yearTotal.map(month => {
        return month.reduce(
          (acc, cur) => {
            return {
              offer: {
                uah:
                  cur.type === "ADD" ? acc.offer.uah + cur.uah : acc.offer.uah
              },
              spend: {
                uah:
                  cur.type === "DEC" ? acc.spend.uah + cur.uah : acc.spend.uah
              }
            };
          },
          { offer: { uah: 0 }, spend: { uah: 0 } }
        );
      });
      const lastYearSpend = { uah: [] };
      const chartOffering = { uah: [] };
      for (let i = lastYear.length - 1; i >= 0; i--) {
        chartOffering.uah.push(lastYear[i].offer.uah);
        lastYearSpend.uah.push(lastYear[i].spend.uah);
      }
      return { lastYearSpend, chartOffering };
    } catch (e) {
      console.log("error: ", e);
    }
  }
}

module.exports = new StatisticService();
