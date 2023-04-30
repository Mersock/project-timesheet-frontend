import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { backendUrl } from "config";
import { useSelector } from "react-redux";
import Select from "react-select";
import DatePicker from "react-datepicker";

function Add({
  show,
  setShow,
  fetchData,
  projectList,
  statusList,
  workTypeList,
  setActiveProject,
  setWorkTypeList,
}) {
  const [isLoading, setLoading] = useState(false);
  const [existErr, setExistErr] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const auth = useSelector((state) => state.auth);
  const refWorkType = useRef();

  const handleClose = () => {
    setShow(false);
    setLoading(false);
    setExistErr(false);
    setStartDate(new Date());
    setEndDate(new Date());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const param = {
        status_id: Number(e.target.status.value),
        work_type_id: Number(e.target.work_type.value),
        start_time: `${e.target.start_time.value}:00`,
        end_time: `${e.target.end_time.value}:00`,
      };
      const config = {
        headers: { Authorization: `bearer ${auth.accessToken}` },
      };
      await axios.post(`${backendUrl}/timeEntry`, param, config);
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
            <Modal.Title>Add Time Entry</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col className="pr-1" md="12">
                <Form.Label>Project</Form.Label>
                <Form.Group>
                  <Select
                    placeholder="Project"
                    classNamePrefix="select"
                    isClearable={true}
                    isSearchable={true}
                    name="project"
                    options={projectList}
                    required
                    onChange={(e) => {
                      refWorkType.current.setValue(null);
                      setWorkTypeList(null);
                      setActiveProject(e.value);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="pr-1" md="6">
                <Form.Label>WorkType</Form.Label>
                <Form.Group>
                  <Select
                    placeholder="Project"
                    classNamePrefix="select"
                    isClearable={true}
                    isSearchable={true}
                    name="work_type"
                    options={workTypeList}
                    required
                    ref={refWorkType}
                  />
                </Form.Group>
              </Col>
              <Col className="pr-1" md="6">
                <Form.Label>Status</Form.Label>
                <Form.Group>
                  <Select
                    placeholder="Status"
                    classNamePrefix="select"
                    isClearable={true}
                    isSearchable={true}
                    name="status"
                    options={statusList}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <label htmlFor="inputMembers">Start Time</label>
                <DatePicker
                  className="form-control"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showTimeSelect
                  timeIntervals={10}
                  dateFormat="yyyy-MM-dd HH:mm"
                  timeFormat="HH:mm"
                  placeholderText="Select Start Time"
                  name="start_time"
                  required
                />
              </Col>
              <Col md="6">
                <label htmlFor="inputMembers">End Time</label>
                <DatePicker
                  className="form-control"
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  showTimeSelect
                  timeIntervals={10}
                  dateFormat="yyyy-MM-dd HH:mm"
                  timeFormat="HH:mm"
                  placeholderText="Select End Time"
                  name="end_time"
                  required
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

export default Add;
