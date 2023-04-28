import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { backendUrl } from "config";
import { useSelector } from "react-redux";

function Add({ show, setShow,fetchData }) {
  const [isLoading, setLoading] = useState(false);
  const [existErr, setExistErr] = useState(false);
  const auth = useSelector((state) => state.auth);

  const handleClose = () => {
    setShow(false);
    setLoading(false);
    setExistErr(false)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const param = {
        name: e.target.name.value,
      };
      const config = {
        headers: { Authorization: `bearer ${auth.accessToken}` },
      };
      await axios.post(`${backendUrl}/project`, param, config);
      await fetchData()
      setShow(false)
      setLoading(false)
    } catch (error) {
      console.error(error);
      if (error.response.status == 409) {
        setExistErr(true);
        setLoading(false)
      }
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={true} size="lg">
        <Form onSubmit={handleSubmit} method="post">
          <Modal.Header closeButton>
            <Modal.Title>Add Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col className="pr-1" md="12">
                <Form.Group>
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    name="name"
                    placeholder="Name"
                    type="text"
                    onFocus={() => setExistErr(false)}
                  ></Form.Control>
                </Form.Group>
                {existErr ? (
                  <p className="text-danger">This project name already exist</p>
                ) : null}
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn-fill"
              variant="secondary"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              disabled={isLoading}
              className="btn-fill"
              variant="primary"
              type="submit"
            >
              {isLoading ? "Loading…" : "Save"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default Add;
