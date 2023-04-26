import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useAxiosFetch } from "customeHook/useAxiosFetch";
import Add from "../components/Status/Add.js";

function Status() {
  const [statusList, setStatusList] = useState(null);
  const [add, setAdd] = useState(false);

  const auth = useSelector((state) => state.auth);

  const { fetchData, data, loading, error } = useAxiosFetch(
    {
      method: "GET",
      url: "/status",
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
      setStatusList(data);
    } else {
      setStatusList([]);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  useEffect(() => {
    if (loading) {
      console.log("retrieving tutorials...");
    }
  }, [loading]);


  return (
    <>
      <Add show={add} setShow={setAdd}fetchData={fetchData} />
      <Container fluid>
        {statusList ? (
          <Row>
            <Col md="12">
              <Card className="strpied-tabled-with-hover">
                <Card.Header>
                  <Card.Title as="h4">Status</Card.Title>
                </Card.Header>
                <Card.Body className="table-full-width table-responsive px-0">
                  <Button onClick={() => setAdd(!add)} className="btn-fill ms-3" variant="info" size="sm">
                    Add
                  </Button>
                  <Table className="table-hover table-striped">
                    <thead>
                      <tr>
                        <th className="border-0">Name</th>
                        <th className="border-0">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {statusList.data
                        ? statusList.data.map((item, key) => {
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
                          })
                        : null}
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
