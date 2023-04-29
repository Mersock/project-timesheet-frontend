import React, { useEffect, useState } from "react";
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
import { Table } from "react-bootstrap";

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
  const [member, setMember] = useState(null);
  const [defaultMember, setDefaultMember] = useState(null);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (project?.data) {
      const user = project?.data?.users.filter(
        (item) => item.role == "project member"
      );
      const userOption = user.map((item) => {
        return {
          value: item.id,
          label: item.email,
        };
      });
      setDefaultMember(userOption);
      const workType = project?.data?.work_types;
      setWorkType(workType);
    }
  }, [project]);

  const handleClose = () => {
    setShow(false);
    setLoading(false);
    setExistErr(false);
    setProjectData(null);
    setWorkTypeErr(false);
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
        work_types: workTypes,
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
    }
  };

  console.log(workTypes);

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
                      setMember(value);
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
                  <Col>
                    <Button
                      className="btn-fill mb-2"
                      variant="success"
                      size="sm"
                    >
                      Add
                    </Button>
                  </Col>
                </Row>
                <Table striped bordered hover width="100">
                  <thead>
                    <tr className="d-flex">
                      <th className="col-10 text-center">Name</th>
                      <th className="col-2 text-center">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workTypes ? (
                        workTypes.map (item => (
                          <tr className="d-flex" key={item.id}> 
                          <td className="col-10">
                            <Form.Control
                              size="sm"
                              type="text"
                              placeholder="name"
                              defaultValue={item.name}
                            />
                          </td>
                          <td className="col-2 text-center">
                            <Form.Check type="checkbox" id={`work_type_${item.id}`} />
                          </td>
                        </tr>
                        ))
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
