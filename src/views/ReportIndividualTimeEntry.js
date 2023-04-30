import axios from "axios";
import { backendUrl } from "config";
import React, { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import moment from "moment";

function ReportTotalTime() {
  const [report, setReport] = useState(null);
  const [projectName, setProjectName] = useState(null);
  const [fullName, setFullName] = useState(null);
  const auth = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectCode = e.target.project_code.value;
    const email = e.target.email.value;
    try {
      const config = {
        headers: { Authorization: `bearer ${auth.accessToken}` },
      };
      const { data } = await axios.get(
        `${backendUrl}/timeEntry?projectCode=${projectCode}&email=${email}`,
        config
      );
      if (data.data) {
        setProjectName(data?.data[0]?.project_name);
        setFullName(`${data?.data[0]?.firstname} ${data?.data[0]?.lastname}`);
        setReport(data?.data);
      }else{
        setProjectName(null)
        setFullName(null)
        setReport(null)
      }

    } catch (error) {
      console.error(error);
    }
  };
  console.log(report);

  const listReport = report?.map((item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.work_type_name}</td>
      <td>
        <Badge bg="secondary">{item.status}</Badge>
      </td>
      <td>{moment(item.start_time).format("DD-MM-yyyy HH:mm")}</td>
      <td>{moment(item.end_time).format("DD-MM-yyyy HH:mm")}</td>
    </tr>
  ));

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Report Individual Time Entry</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <Form.Control
                          placeholder="Project Code"
                          type="text"
                          name="project_code"
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <Form.Control
                          placeholder="Email"
                          type="text"
                          name="email"
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="info"
                      >
                        Search
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Row>
                        <Col md="4" className="text-left">
                          <span>
                            {" "}
                            {projectName ? `Project: ${projectName}` : null}
                          </span>
                        </Col>
                        <Col md="4" className="text-left">
                          <span>
                            {fullName ? `Fullname: ${fullName}` : null}
                          </span>
                        </Col>
                      </Row>
                      <Table className="table-hover">
                        <thead>
                          <tr>
                            <th className="border-0">NO</th>
                            <th className="border-0">Work Type</th>
                            <th className="border-0">Status</th>
                            <th className="border-0">Start Time</th>
                            <th className="border-0">End Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {report ? (
                            listReport
                          ) : (
                            <tr>
                              <td colSpan={5} align="center">
                                No Data
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ReportTotalTime;
