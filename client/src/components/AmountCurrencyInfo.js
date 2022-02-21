import React from "react";

const AmountCurrencyInfo = ({cur, amount}) => {
  return (
    <div className="d-flex justify-content-between">
      <div className="">{cur}</div>
      <div className="">{amount}</div>
    </div>
  );
};

export default AmountCurrencyInfo;
