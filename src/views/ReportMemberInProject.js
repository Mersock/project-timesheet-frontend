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

function ReportMemberInProject() {
  const [report, setReport] = useState(null);
  const auth = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectCode = e.target.project_code.value;
    try {
      const config = {
        headers: { Authorization: `bearer ${auth.accessToken}` },
      };
      const { data } = await axios.get(
        `${backendUrl}/project/code/${projectCode}`,
        config
      );
      if (data?.data) {
        setReport(data?.data);
      } else {
        setReport(null);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const userList = report ? (
    report?.users?.map((data, index) => (
      <tr>
        <td>
          {data.role == "project manager" ? (
            <strong className="text-primary"> {index + 1}</strong>
          ) : (
            index + 1
          )}
        </td>
        <td>
          {data.role == "project manager" ? (
            <strong className="text-primary"> {data.email}</strong>
          ) : (
            data.email
          )}
        </td>
        <td>
          {data.role == "project manager" ? (
            <strong className="text-primary"> {data.firstname}</strong>
          ) : (
            data.firstname
          )}
        </td>
        <td>
          {data.role == "project manager" ? (
            <strong className="text-primary"> {data.lastname}</strong>
          ) : (
            data.lastname
          )}
        </td>
        <td>
          {data.role == "project manager" ? (
            <strong className="text-primary"> {data.role}</strong>
          ) : (
            data.role
          )}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td align="center" colSpan={5}>
        No Data
      </td>
    </tr>
  );

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Report Member In Project</Card.Title>
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
                    <Col className="text-center">
                      <h3>{report?.name || ""}</h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
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
                        <tbody>{userList}</tbody>
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

export default ReportMemberInProject;
