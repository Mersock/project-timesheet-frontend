import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card, Table } from "react-bootstrap";

function View({ activeData, show, setShow, project, setProjectData }) {
  const handleClose = () => {
    setShow(false);
    setProjectData(null);
  };

  const showUserList =
    project?.data?.users.length > 0 ? (
      project?.data?.users.map((item, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item?.email}</td>
          <td>{item?.firstname}</td>
          <td>{item?.lastname}</td>
          <td>{item?.role}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={5}>No data</td>
      </tr>
    );
  const showWorkTypeList =
    project?.data?.work_types.length > 0 ? (
      project?.data?.work_types.map((item, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item?.name}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={2}>No data</td>
      </tr>
    );

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={true} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Row>
                <Col md="3">
                  <div className="typography-line">PROJECT NAME:</div>
                </Col>
                <Col md="9">
                  <div className="typography-line pl-5">
                    {project?.data?.name}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="3">
                  <div className="typography-line">PROJECT CODE:</div>
                </Col>
                <Col md="9">
                  <div className="typography-line pl-5">
                    {project?.data?.code}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="3">
                  <div className="typography-line">MEMBERS:</div>
                </Col>
                <Col md="9">
                  <Table className="table-hover">
                    <thead>
                      <tr>
                        <th className="border-0">NO</th>
                        <th className="border-0">Email</th>
                        <th className="border-0">Firstname</th>
                        <th className="border-0">Lastname</th>
                        <th className="border-0">Role</th>
                      </tr>
                    </thead>
                    <tbody>{showUserList}</tbody>
                  </Table>
                </Col>
              </Row>
              <Row>
                <Col md="3">
                  <div className="typography-line">Work Type:</div>
                </Col>
                <Col md="9">
                  <Table className="table-hover">
                    <thead>
                      <tr>
                        <th className="border-0">NO</th>
                        <th className="border-0">Name</th>
                      </tr>
                    </thead>
                    <tbody>{showWorkTypeList}</tbody>
                  </Table>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-fill"
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default View;
