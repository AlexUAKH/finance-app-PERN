import React from "react";
import { Container, Image, Alert } from "react-bootstrap";
import { API_ROUTE, HOME_ROUTE } from "../utils/consts";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const OfferingPage = () => {
  const { t } = useTranslation();

  return (
    <Container className="mt-3">
      <Alert variant="warning" className="text-center">
        { t("app.in-progress") } &nbsp;
        <Alert.Link as={NavLink} to={HOME_ROUTE}>
          { t("app.back-home") }
        </Alert.Link>
      </Alert>
      <Image src={`${API_ROUTE}/cat_2.jpg`} width={'100%'} className="mb-3"/>
    </Container>
  );
};

export default OfferingPage;
