import React from "react";
import { NavDropdown, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const LanguageSelect = ({onSelect, ...props}) => {
  const { i18n } = useTranslation();
  const lngList = [
    {title: "Русский", lngKey: "ru"},
    {title: "Українська", lngKey: "ua"},
    {title: "English", lngKey: "en"}
  ];

  const changeLanguage = (key) => {
    i18n.changeLanguage(key);
    localStorage.setItem("locale", key);
    onSelect()
  };

  const langTitle = {
    en: "en",
    ua: "укр",
    ru: "рус"
  };

  return (
    <NavDropdown
      title={langTitle[i18n.language].toUpperCase()}
      id="collapsible-nav-dropdown"
      menuVariant="dark"
      className={props.className}
    >
      {
        lngList.map((lng, ind) => (
          <NavDropdown.Item as={Button} onClick={() => changeLanguage(lng.lngKey)} key={ind} active={i18n.language === lng.lngKey}>{lng.title}</NavDropdown.Item>
        ))
      }
    </NavDropdown>
  );
};

export default LanguageSelect;
