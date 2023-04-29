import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useSelector } from "react-redux";
import Select from "react-select";
import { Table } from "react-bootstrap";
import TableRows from "./WorkTypesRow";
import { useHistory } from "react-router-dom";
import { backendUrl } from "config";

function Edit({
  activeData,
  show,
  setShow,
  fetchData,
  userList,
  project,
  setProjectData,
}) {
  const [isLoading, setLoading] = useState(false);
  const [existErr, setExistErr] = useState(false);
  const [workTypeErr, setWorkTypeErr] = useState(false);
  const [workTypes, setWorkType] = useState([]);
  const [deleteWorkType, setDeleteWorkType] = useState([]);
  const [members, setMembers] = useState(null);
  const [defaultMember, setDefaultMember] = useState(null);
  const history = useHistory();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (project?.data) {
      const user = project?.data?.users.filter(
        (item) => item.role == "project member"
      );
      const userOption = user.map((item) => {
        return {
          value: item.email,
          label: item.email,
        };
      });
      setDefaultMember(userOption);
      const users = user.map((item) => item.email);
      setMembers(users);
      const workType = project?.data?.work_types;
      setWorkType(workType);
    }
  }, [project]);

  const addTableRows = () => {
    const rowsInput = {
      name: null,
      id: null,
    };
    setWorkType([...workTypes, rowsInput]);
  };

  const deleteTableRows = (index, id) => {
    let rows = [...workTypes];
    if (id) {
      rows[index].id = id;
      setDeleteWorkType((ids) => [...ids, id]);
      setWorkType((rows) => rows.filter((item) => item.id != id));
    } else {
      rows.splice(index, 1);
      setWorkType(rows);
    }
  };

  const handleTableChange = (index, id, evnt) => {
    const { value } = evnt.target;
    const rowsInput = [...workTypes];
    if (id) {
      rowsInput[index].name = value;
    } else {
      rowsInput[index].id = null;
      rowsInput[index].action = "add";
      rowsInput[index].name = value;
      setWorkType(rowsInput);
    }
    setWorkType(rowsInput);
  };

  const handleClose = () => {
    setShow(false);
    setLoading(false);
    setExistErr(false);
    setProjectData(null);
    setWorkTypeErr(false);
    setDeleteWorkType([]);
    setMembers(null);
    setDefaultMember(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (workTypes.length == 0) {
      setWorkTypeErr(true);
      return;
    }
    setLoading(true);

    const addWorkType = workTypes
      .filter((item) => item.action == "add")
      .map((item) => item.name);
    const editWorkType = workTypes
      .filter((item) => item.action != "add" && item.action != "delete")
      .map((item) => ({ id: item.id, name: item.name }));

    try {
      const param = {
        name: e.target.name.value,
        add_work_types: addWorkType,
        edit_work_types: editWorkType,
        delete_work_types: deleteWorkType,
        members: members,
      };
      const config = {
        headers: { Authorization: `bearer ${auth.accessToken}` },
      };
      const id = activeData.id;
      await axios.put(`${backendUrl}/project/${id}`, param, config);
      await fetchData();
      handleClose();
    } catch (error) {
      console.error(error);
      if (error.response.status == 409) {
        setExistErr(true);
        setLoading(false);
      }
      if (error.response.status == 401) {
        history.push("/auth");
      }
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={true} size="lg">
        <Form onSubmit={handleSubmit} method="post">
          <Modal.Header closeButton>
            <Modal.Title>Edit Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col className="pr-1" md="12">
                <Form.Group>
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    defaultValue={project?.data?.name || ""}
                    name="name"
                    placeholder="Name"
                    type="text"
                    onFocus={() => setExistErr(false)}
                  ></Form.Control>
                </Form.Group>
                {existErr ? (
                  <p className="text-danger">This Project name already exist</p>
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
                      setMembers(value);
                    }}
                    defaultValue={defaultMember}
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

export default Edit;
