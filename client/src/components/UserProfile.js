import React from "react";
import { Button } from "react-bootstrap";
import { Person } from "react-bootstrap-icons";
import { useNavigate } from "react-router";
import { PROFILE_ROUTE } from "../utils/consts";

const UserProfile = ({ onClick }) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    onClick();
    navigate(PROFILE_ROUTE);
  };

  return (
    <Button className="mx-2 my-3 my-md-0"
      variant="outline-light"
      onClick={ () => clickHandler()}
    >
      <Person size="24"/>
    </Button>
  );
};

export default UserProfile;
