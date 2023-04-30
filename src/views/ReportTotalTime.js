import React from "react";
import { Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

function ReportTotalTime() {
  const auth = useSelector((state) => state.auth);

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
                <Form>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <Form.Control
                          placeholder="Search by Project Code"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Row>
                        <Col className="text-center">
                          <span>Database Work Shop</span>
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
                          <tr>
                            <td>1</td>
                            <td>Design Database</td>
                            <td>00:01:00</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Create Table</td>
                            <td>00:02:00</td>
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

export default ReportTotalTime;
