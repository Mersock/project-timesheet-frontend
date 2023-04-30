import axios from "axios";
import { backendUrl } from "config";
import React, { useState } from "react";
import { Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

function ReportTotalUser() {
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
      if (data?.data) {
        setReport(data.data);
      } else {
        setReport(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const listReport = report?.worktypes.map((item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
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
                <Card.Title as="h4">Report Total User</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md="12">
                      <Table className="table-hover">
                        <thead>
                          <tr>
                            <th className="border-0"></th>
                            <th className="border-0"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Total User</td>
                            <td>43</td>
                          </tr>
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

export default ReportTotalUser;
