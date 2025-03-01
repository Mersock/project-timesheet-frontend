import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { backendUrl } from "config";
import { useSelector } from "react-redux";
import Select from "react-select";
import { capitalizeStr } from "utils/string";

function Edit({ activeData, show, setShow, fetchData, roleList }) {
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
      const param = {
        email: e.target.email.value,
        firstname: e.target.firstname.value,
        lastname: e.target.lastname.value,
        role: Number(e.target.role.value),
      };
      const config = {
        headers: { Authorization: `bearer ${auth.accessToken}` },
      };
      const id = activeData?.id;
      await axios.put(`${backendUrl}/user/${id}`, param, config);
      if (e.target.password.value) {
        await axios.put(
          `${backendUrl}/user/password/${id}`,
          { password: e.target.password.value },
          config
        );
      }
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
            <Modal.Title>Add User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col className="pr-1" md="12">
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    defaultValue={activeData?.email || ""}
                    name="email"
                    placeholder="Email"
                    type="email"
                    onFocus={() => setExistErr(false)}
                    required
                  ></Form.Control>
                </Form.Group>
                {existErr ? (
                  <p className="text-danger">This email already exist</p>
                ) : null}
              </Col>
            </Row>
            <Row>
              <Col className="pr-1" md="12">
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    placeholder="Password"
                    type="password"
                    minLength={6}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="pr-1" md="12">
                <Form.Group>
                  <Form.Label>Firstname</Form.Label>
                  <Form.Control
                    defaultValue={activeData?.firstname || ""}
                    name="firstname"
                    placeholder="Firstname"
                    type="text"
                    required
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="pr-1" md="12">
                <Form.Group>
                  <Form.Label>Lastname</Form.Label>
                  <Form.Control
                    defaultValue={activeData?.lastname || ""}
                    name="lastname"
                    placeholder="Lastname"
                    type="text"
                    required
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="pr-1" md="12">
                <Form.Label>Role</Form.Label>
                <Form.Group>
                  <Select
                    defaultValue={
                      roleList != null
                        ? roleList.find(
                            (role) =>
                              role.label ==
                              capitalizeStr(activeData?.role || "")
                          )
                        : null
                    }
                    placeholder="Role"
                    classNamePrefix="select"
                    isClearable={true}
                    isSearchable={true}
                    name="role"
                    options={roleList}
                    required
                  />
                </Form.Group>
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

export default Edit;
