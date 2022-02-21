import React from "react";
import { Spinner } from "react-bootstrap";

const LoaderOverley = () => {
  return (
    <div
      className="modal-backdrop d-flex justify-content-center align-items-center bg-white bg-opacity-75 "
    >
      <Spinner animation="border" variant="dark" className="overlay"/>
    </div>
  );
};

export default LoaderOverley;
