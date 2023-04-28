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

function Edit({ activeData, show, setShow, fetchData, userList }) {
  const [isLoading, setLoading] = useState(false);
  const [existErr, setExistErr] = useState(false);
  const [project, setProject] = useState(null);
  const [workTypes, setWorkType] = useState([]);
  const [member, setMember] = useState(null);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    async function fetchData() {
      if (auth.accessToken && activeData?.id) {
        try {
          const config = {
            headers: { Authorization: `bearer ${auth.accessToken}` },
          };
          const id = activeData.id;
          const { data } = await axios.get(
            `${backendUrl}/project/${id}`,
            config
          );
          setProject(data.data);
        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchData()
  }, [auth.accessToken, activeData]);

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
        name: e.target.name.value,
      };
      const config = {
        headers: { Authorization: `bearer ${auth.accessToken}` },
      };
      const id = activeData.id;
      await axios.put(`${backendUrl}/project/${id}`, param, config);
      await fetchData();
      setShow(false);
      setLoading(false);
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
            <Modal.Title>Edit Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col className="pr-1" md="12">
                <Form.Group>
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    defaultValue={project?.name || ""}
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
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="pr-1" md="12">
                <MultipleValueTextInput
                  onItemAdded={(item, allItems) => {
                    setWorkType((workTypes) => [...workTypes, item]);
                  }}
                  onItemDeleted={(item, allItems) => {
                    setWorkType(
                      workTypes.filter((workType) => workType != item)
                    );
                  }}
                  label="Work Type"
                  name="work_types"
                  placeholder="Enter whatever items you want; separate them with COMMA or ENTER."
                />
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
