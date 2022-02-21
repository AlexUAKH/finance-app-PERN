import { $host, $authHost } from "./index";
// import jwtDecode from "jwt-decode";

export const getRecords = async () => {
  const { data } = await $host.get("/records");
  return data.record;
};

export const createRecord = async rec => {
  const { data } = await $authHost.post("/records", { ...rec });
  return data;
};

export const saveRecord = async rec => {
  const { data } = await $authHost.put("/records", { ...rec });
  return data;
};

export const deleteRecord = async id => {
  const { data } = await $authHost.delete(`/records/${id}`);
  return data;
};

export const getTotal = async () => {
  const total = await $host.get(`/statistic/total`);
  return total.data;
};

export const getMonthTotall = async () => {
  const total = await $host.get(`/statistic/month-total`);
  return total.data;
};

export const getYearChart = async (chartPeriod = 12) => {
  const total = await $host.get(`/statistic/year-chart`, {
    params: {
      chartPeriod
    }
  });

  return total.data;
};

export const getStatistic = period => {
  const totalPromise = new Promise((resolve, reject) => {
    getTotal()
      .then(res => resolve(res))
      .catch(() => reject());
  });
  const monthPromise = new Promise((resolve, reject) => {
    getMonthTotall()
      .then(res => resolve(res))
      .catch(() => reject());
  });
  const yearPromise = new Promise((resolve, reject) => {
    getYearChart(period)
      .then(res => resolve(res))
      .catch(() => reject());
  });
  return Promise.all([totalPromise, monthPromise, yearPromise]);
};
