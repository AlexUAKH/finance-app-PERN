import React, { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import Logo from "./Logo";
import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";
import NavPanel from "./navigation/NavPanel";
import NavMenu from "./navigation/NavMenu";
import { set } from "mobx";

const AppNavBar = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" expanded={expanded}>
      <Container>
        <Navbar.Brand as={ NavLink } to={ LOGIN_ROUTE }>
          <Logo/>
        </Navbar.Brand>
        <Navbar.Toggle onClick={() => setExpanded(!expanded)} />
        <Navbar.Collapse>
          <NavMenu onSelect={() => setExpanded(false)} />
          <NavPanel onSelect={() => setExpanded(false)} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavBar;
