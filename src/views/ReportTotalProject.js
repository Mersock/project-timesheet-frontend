import { useAxiosFetch } from "customeHook/useAxiosFetch";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

function ReportTotalProject() {
  const auth = useSelector((state) => state.auth);
  const [report,setReport] = useState(null)

  const { fetchData, data, loading, error } = useAxiosFetch(
    {
      method: "GET",
      url: `/project/count`,
      headers: { Authorization: `bearer ${auth.accessToken}` },
    },
    false
  );

  useEffect(() => {
    if (auth.accessToken) {
      fetchData();
    }
  }, [auth.accessToken]);

  useEffect(() => {
    if (data) {
      setReport(data);
    } else {
      setReport(null);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (loading) {
      console.log("retrieving status...");
    }
  }, [loading]);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Report Total Project</Card.Title>
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
                            <td>Total Project</td>
                            <td>{report?.total || ''}</td>
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

export default ReportTotalProject;
