import React from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

const SearchBar = () => {
  return (
    <InputGroup className="">
      <FormControl
        placeholder="Recipient's username"
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
      />
      <Button variant="outline-secondary" id="button-addon2">
        <Search/>
      </Button>
    </InputGroup>
    // <div className="input-group">
    //   <FormControl placeholder="dddd" type="text"  />
    //   <button type="button" className="btn btn-outline-secondary">
    //     Action
    //   </button>
    // </div>
  );
};

export default SearchBar;
