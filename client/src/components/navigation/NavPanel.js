import React, { useContext } from "react";
import LanguageSelect from "../LanguageSelect";
import { Button, Nav } from "react-bootstrap";
import { LOGIN_ROUTE, HOME_ROUTE } from "../../utils/consts";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import UserProfile from "../UserProfile";
import { logout } from "../../http/userApi";

const NavPanel = observer(({ onSelect }) => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const logoutHandler = async () => {
    try {
      await logout();
      // console.log("logout");
      user.setIsAuth(false);
      user.setUser(null);
      navigate(HOME_ROUTE);
    } catch (e) {
      console.log(e);
    }
  };

  const logHandler = () => {
    onSelect();
    if (user.isAuth) logoutHandler();
    else navigate(LOGIN_ROUTE);
  };

  return (
    <Nav>
      {user.isAuth && <UserProfile onClick={() => onSelect()} />}
      <Button
        className="mx-2"
        variant="outline-light"
        onClick={() => logHandler()}
      >
        {user.isAuth ? t("app.logout") : t("app.login")}
      </Button>
      <LanguageSelect
        className="my-2 my-md-0 text-center"
        onSelect={() => onSelect()}
      />
    </Nav>
  );
});

export default NavPanel;
