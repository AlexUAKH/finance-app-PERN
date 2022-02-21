import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import AmountCurrencyInfo from "./AmountCurrencyInfo";
import { useTranslation } from "react-i18next";

const AmountInfoCard = ({
  headerColor = "light", infoTitle = "Title", infoAmount = {
    uah: 0,
    usd: 0,
    euro: 0
  }, ...props
}) => {
  const { t } = useTranslation();
  const [ currencyShowStatus, setCurrencyShowStatus ] = useState({uah: true, usd: false, euro: false});

  const header = [
    headerColor === "light" ? "text-dark" : "text-white",
    `bg-${ headerColor }`
  ].join(" ");

  const showCurrencyHandler = (e, cur) => {
    setCurrencyShowStatus({ ...currencyShowStatus, [cur]: e.target.checked })
  };

  return (
    <Card { ...props } className="h-100">
      <Card.Header className={ header }>
        <div className="d-flex justify-content-between align-items-center">
          { infoTitle }
          <div>
            <Form.Check
              inline
              label={ t("app.cur.uah") }
              type="checkbox"
              checked={ currencyShowStatus.uah }
              onChange={ (e) => showCurrencyHandler(e, 'uah') }
            />
            <Form.Check
              inline
              label={ t("app.cur.usd") }
              type="checkbox"
              value={ currencyShowStatus.usd }
              onChange={ (e) => showCurrencyHandler(e, 'usd') }
            />
            <Form.Check
              inline
              label={ t("app.cur.euro") }
              type="checkbox"
              value={ currencyShowStatus.euro }
              onChange={ (e) => showCurrencyHandler(e, 'euro') }

            />
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        {
          currencyShowStatus.uah &&
            <AmountCurrencyInfo cur={ t("app.cur.uah") } amount={ infoAmount.uah }/>
        }
        {
          currencyShowStatus.usd &&
            <AmountCurrencyInfo cur={ t("app.cur.usd") } amount={ infoAmount.usd }/>
        }
        {
          currencyShowStatus.euro &&
            <AmountCurrencyInfo cur={ t("app.cur.euro") } amount={ infoAmount.euro }/>
        }
        {
          !currencyShowStatus.uah && !currencyShowStatus.usd && !currencyShowStatus.euro &&
            <div>{ t('dashboard.choose-currency') }</div>
        }
      </Card.Body>
    </Card>
  );
};

export default AmountInfoCard;
