import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AmountInfoCard from "../components/AmountInfoCard";
import AmountChart from "../components/AmountChart";
import { useTranslation } from "react-i18next";
import LoaderOverley from "../components/LoaderOverley";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const StatisticPage = observer(() => {
  // const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const { record } = useContext(Context);
  const { t } = useTranslation();
  const chartPeriod = 6;

  useEffect(() => {
    const fetchStat = async () => {
      setLoading(true);
      try {
        await record.getChartData(chartPeriod);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };
    fetchStat();
  }, []);

  if (loading) return <LoaderOverley />;

  return (
    <Container className="mt-4">
      <Row>
        <Col xs="12" sm="6" md="4" className="mb-3">
          <AmountInfoCard
            infoTitle={t("dashboard.last-month-tithe")}
            infoAmount={record.chartData.lastMonthOffering}
          />
        </Col>
        <Col xs="12" sm="6" md="4" className="mb-3">
          <AmountInfoCard
            headerColor="dark"
            border="dark"
            infoTitle={t("dashboard.last-month-spend")}
            infoAmount={record.chartData.lastMonthSpend}
          />
        </Col>
        <Col xs="12" sm="6" md="4" className="mb-3">
          <AmountInfoCard
            headerColor="success"
            border="success"
            infoTitle={t("dashboard.total")}
            infoAmount={record.chartData.totalAmount}
          />
        </Col>
      </Row>
      <Row>
        <AmountChart
          chartData={{
            chartOffering: record.chartData.chartOffering,
            lastYearSpend: record.chartData.lastYearSpend
          }}
          period={chartPeriod}
        />
      </Row>
    </Container>
  );
});

export default StatisticPage;
