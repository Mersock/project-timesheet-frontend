import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import { backendUrl } from "../config";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function Status() {
  const [statusList, setStatusList] = useState(null);
  const auth = useSelector((state) => state.auth);
  const history = useHistory();

  useEffect(() => {
    if (auth.accessToken) {
      axios
        .get(`${backendUrl}/status`, {
          headers: {
            Authorization: `bearer ${auth.accessToken}`,
          },
        })
        .then((res) => {
          setStatusList(res.data);
        })
        .catch((err) => {
          console.error(err);
          if (err.response.status == 401) {
            history.push("/auth");
          }
        });
    }
  }, [auth.accessToken]);

  return (
    <>
      <Container fluid>
        {statusList ? (
          <Row>
            <Col md="12">
              <Card className="strpied-tabled-with-hover">
                <Card.Header>
                  <Card.Title as="h4">Status</Card.Title>
                </Card.Header>
                <Card.Body className="table-full-width table-responsive px-0">
                  <Table className="table-hover table-striped">
                    <thead>
                      <tr>
                        <th className="border-0">Name</th>
                        <th className="border-0">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {statusList.data.map((item,key) => {
                        return (
                          <tr key={key}>
                            <td>{item.name}</td>
                            <td>
                              <Button
                                className="btn-fill"
                                variant="primary"
                                size="sm"
                              >
                                Edit
                              </Button>{" "}
                              <Button
                                className="btn-fill"
                                variant="danger"
                                size="sm"
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : null}
      </Container>
    </>
  );
}

export default Status;
