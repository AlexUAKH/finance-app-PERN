import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import moment from "moment";

const initial = {
  description: "",
  date: moment().format("yyyy-MM-DD"),
  type: "ADD",
  uah: 0,
  usd: 0,
  euro: 0
};

const RecordModal = ({ onHide, onSave, onDelete, record, ...props }) => {
  const [rec, setRec] = useState({ ...initial });

  useEffect(() => {
    // console.log("rec: ", record);
    record ? setRec({ ...rec, ...record }) : setRec({ ...initial });
  }, [record]);

  const save = () => {
    setRec(initial);
    onSave(rec);
  };

  const delRec = async () => {
    if (record && record.id) onDelete();
    setRec(initial);
  };

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Record</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            placeholder={"description"}
            value={rec.description}
            onChange={e => setRec({ ...rec, description: e.target.value })}
          />
        </Form.Group>
        <Row className="mt-3">
          <Col xs="6">
            <Form.Control
              type="date"
              name="date"
              value={
                rec.date
                  ? moment(rec.date).format("yyyy-MM-DD")
                  : moment().format("yyyy-MM-DD")
              }
              onChange={e => setRec({ ...rec, date: e.target.value })}
            />
            {/*  error={errors.date_of_birth} */}
          </Col>
          <Col xs="6">
            <Form.Select
              aria-label="select type"
              value={rec.type}
              onChange={e => setRec({ ...rec, type: e.target.value })}
            >
              <option value="ADD">Offering</option>
              <option value="DEC">Spend</option>
            </Form.Select>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={4}>
            <Form.Group
              as={Row}
              className="d-flex justify-content-between me-1"
              controlId="formPassword"
            >
              <Form.Label column sm={3}>
                UAH
              </Form.Label>
              <Col sm="7">
                <Form.Control
                  type="number"
                  placeholder=""
                  className="px-1 text-end"
                  value={rec.uah}
                  min={0}
                  max={30000}
                  onChange={e => setRec({ ...rec, uah: e.target.value })}
                />
              </Col>
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Form.Group
              as={Row}
              className="d-flex justify-content-center px-1"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm={4}>
                USD
              </Form.Label>
              <Col sm="7">
                <Form.Control
                  type="number"
                  placeholder=""
                  className="px-1 text-end"
                  value={rec.usd}
                  min={0}
                  max={30000}
                  onChange={e => setRec({ ...rec, usd: e.target.value })}
                />
              </Col>
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Form.Group
              as={Row}
              className="d-flex justify-content-between ms-1"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm={3}>
                EURO
              </Form.Label>
              <Col sm="7">
                <Form.Control
                  type="number"
                  placeholder=""
                  className="px-1 text-end"
                  value={rec.euro}
                  min={0}
                  max={30000}
                  onChange={e => setRec({ ...rec, euro: e.target.value })}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        {record && (
          <Button
            variant="danger"
            className="px-3 me-auto"
            onClick={() => delRec()}
          >
            Delete
          </Button>
        )}
        <Button variant="outline-danger" className="px-3" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="success" className="px-5 " onClick={() => save()}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RecordModal;
