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
import MultipleValueTextInput from "react-multivalue-text-input";
import TableRows from "./WorkTypesRow";
import { Table } from "react-bootstrap";

function Add({ show, setShow, fetchData, userList }) {
  const [isLoading, setLoading] = useState(false);
  const [existErr, setExistErr] = useState(false);
  const [workTypeErr, setWorkTypeErr] = useState(false);
  const [workTypes, setWorkType] = useState([]);
  const [member, setMember] = useState(null);
  const auth = useSelector((state) => state.auth);

  const addTableRows = () => {
    const rowsInput = {
      name: null,
      id: null,
    };
    setWorkType([...workTypes, rowsInput]);
  };

  const deleteTableRows = (index, id) => {
    let rows = [...workTypes];
    rows.splice(index, 1);
    setWorkType(rows);
  };

  const handleTableChange = (index, id, evnt) => {
    const { value } = evnt.target;
    const rowsInput = [...workTypes];
    rowsInput[index].id = null;
    rowsInput[index].action = "add";
    rowsInput[index].name = value;
    setWorkType(rowsInput);
  };

  const handleClose = () => {
    setShow(false);
    setLoading(false);
    setExistErr(false);
    setWorkTypeErr(false);
    setMember(null);
    setWorkType([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (workTypes.length == 0) {
      setWorkTypeErr(true);
      return;
    }
    setLoading(true);
    try {
      const param = {
        name: e.target.name.value,
        members: member,
        work_types: workTypes.map((item) => item.name),
      };
      const config = {
        headers: { Authorization: `bearer ${auth.accessToken}` },
      };
      await axios.post(`${backendUrl}/project`, param, config);
      await fetchData();
      handleClose();
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
                    required
                  ></Form.Control>
                </Form.Group>
                {existErr ? (
                  <p className="text-danger">This project name already exist</p>
                ) : null}
              </Col>
            </Row>
            <Row>
              <Col className="pr-1" md="12">
                <Form.Label>Members</Form.Label>
                <Form.Group>
                  <Select
                    placeholder="Members"
                    classNamePrefix="select"
                    isClearable={true}
                    isSearchable={true}
                    name="role"
                    options={userList}
                    required
                    isMulti
                    onChange={(data) => {
                      const value = data.map((option) => {
                        return String(option.value);
                      });
                      setMember(value);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="pr-1" md="12">
                <Row>
                  <Col>
                    <Form.Label>Work Type</Form.Label>
                  </Col>
                </Row>
                <Row>
                  <Col></Col>
                </Row>
                {workTypeErr ? (
                  <p className="text-danger">
                    Work Type is required at least 1 item{" "}
                  </p>
                ) : null}
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th className="text-center">Name</th>
                      <th className="text-center">
                        <Button
                          className="btn-fill"
                          variant="success"
                          size="sm"
                          onClick={addTableRows}
                        >
                          Add
                        </Button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {workTypes ? (
                      <TableRows
                        rowsData={workTypes}
                        deleteTableRows={deleteTableRows}
                        handleChange={handleTableChange}
                      />
                    ) : null}
                  </tbody>
                </Table>
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
