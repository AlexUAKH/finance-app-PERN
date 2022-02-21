import React from "react";
import { Card } from "react-bootstrap";

const AppFooter = () => {
  return (
    <Card as="footer" bg="dark" className="text-white text-center">
      <Card.Body className="p-2" >
        <a
          href="https://github.com/AlexUAKH"
          target="_blank"
          rel="noreferrer"
          className="text-white text-decoration-none"
        >
          @2021 AlexUAKH
        </a>
      </Card.Body>
    </Card>
  );
};

export default AppFooter;
