import axios from "axios";
import { backendUrl } from "config";
import React, { useState } from "react";
import { Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

function ReportTotalTime() {
  const [report, setReport] = useState(null);
  const auth = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const param = {
        project_code: e.target.project_code.value,
      };
      const config = {
        headers: { Authorization: `bearer ${auth.accessToken}` },
      };
      const { data } = await axios.post(
        `${backendUrl}/report/totalTime`,
        param,
        config
      );
      setReport(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const listReport = report?.worktypes.map((item,index) => (
    <tr key={index}>
      <td>{index+1}</td>
      <td>{item.work_type_name}</td>
      <td>{item.total_time}</td>
    </tr>
  ));

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Report Total Time</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <Form.Control
                          placeholder="Search by Project Code"
                          type="text"
                          name="project_code"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Row>
                        <Col className="text-center">
                          <h4>
                            <span>{report?.project_name || ""}</span>
                          </h4>
                        </Col>
                      </Row>
                      <Table className="table-hover">
                        <thead>
                          <tr>
                            <th className="border-0">NO</th>
                            <th className="border-0">Work Type</th>
                            <th className="border-0">Total Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {report ? (
                            listReport
                          ) : (
                            <>
                              <tr>
                                <td align="center" colSpan={3}>
                                  No Data
                                </td>
                              </tr>
                            </>
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
