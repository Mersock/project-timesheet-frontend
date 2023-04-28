import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { backendUrl } from "config";
import { useSelector } from "react-redux";

function Delete({ activeData, show, setShow, fetchData }) {
  const [isLoading, setLoading] = useState(false);
  const [existErr, setExistErr] = useState(false);
  const auth = useSelector((state) => state.auth);

  const handleClose = () => {
    setShow(false);
    setLoading(false);
    setExistErr(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        headers: { Authorization: `bearer ${auth.accessToken}` },
      };
      const id = activeData.id;
      await axios.delete(`${backendUrl}/project/${id}`, config);
      await fetchData();
      handleClose()
    } catch (error) {
      console.error(error);
      if (error.response.status == 409) {
        setExistErr(true);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={true}>
        <Form onSubmit={handleSubmit} method="post">
          <Modal.Header closeButton>
            <Modal.Title>Delete Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete?</Modal.Body>
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
              variant="danger"
              type="submit"
            >
              {isLoading ? "Loading…" : "Delete"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default Delete;
