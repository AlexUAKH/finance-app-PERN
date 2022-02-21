import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { HOME_ROUTE, TABLE_ROUTE, OFFERING_ROUTE } from "../../utils/consts";
import { useTranslation } from "react-i18next";

const NavMenu = ({onSelect}) => {
  const { t } = useTranslation();

  const menuList = [
    { title: t("menu.statistic"), to: HOME_ROUTE },
    { title: t("menu.table"), to: TABLE_ROUTE },
    { title: t("menu.offering"), to: OFFERING_ROUTE }
  ];

  return (
    <Nav className="me-auto ms-lg-4" >
      {
        menuList.map(menu =>
          <Nav.Link as={ NavLink } to={ menu.to } key={ menu.title } onClick={() => onSelect()}>
            { menu.title }
          </Nav.Link>
        )
      }
    </Nav>
  );
};

export default NavMenu;
