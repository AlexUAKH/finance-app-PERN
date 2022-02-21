import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteConfirm = ({show, confirm}) => {

  return (
    <Modal
      show={show}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Body>Are U really want to delete?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => confirm(false)}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => confirm(true)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirm;
