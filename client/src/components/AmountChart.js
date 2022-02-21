import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Card } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AmountChart = ({
  chartData = {
    chartOffering: { uah: [], usd: [], euro: [] },
    lastYearSpend: { uah: [], usd: [], euro: [] }
  },
  period
}) => {
  const { t } = useTranslation();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: t("dashboard.chart-title")
      }
    }
  };
  const shiftData = (data) => {
    // if ( currentMonth === 0 ) return data;
    const labels = [ ...data.slice(currentMonth), ...data.splice(0, currentMonth) ];


    return labels.slice(labels.length - period);

  };
  const currentMonth = moment().month()+1;//(new Date(Date.now())).getMonth();
  const months = [
    t("app.months.january"),
    t("app.months.february"),
    t("app.months.march"),
    t("app.months.april"),
    t("app.months.may"),
    t("app.months.june"),
    t("app.months.july"),
    t("app.months.august"),
    t("app.months.september"),
    t("app.months.october"),
    t("app.months.november"),
    t("app.months.december")
  ];

  const labels = shiftData(months);
  // const shiftedUAHData = shiftData(chartData.chartOffering.uah || []);

  const data = {
    labels,
    datasets: [
      {
        label: t("app.cur.uah"),
        data: chartData.chartOffering.uah,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        cubicInterpolationMode: 'monotone',
        tension: 0.4
      },
      {
        label: t("app.cur.uah"),
        data: chartData.lastYearSpend.uah,
        borderColor: "rgb(0, 0, 0)",
        backgroundColor: "rgba(20, 20, 20, 0.5)",
        cubicInterpolationMode: 'monotone',
        tension: 0.4
      }
    ]
  };
  return (
    <Card>
      <Card.Body>
        <Line options={ options } data={ data }/>
      </Card.Body>
    </Card>
  );
};

export default AmountChart;
