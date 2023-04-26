import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useAxiosFetch } from "customeHook/useAxiosFetch";
import Add from "../components/Status/Add.js";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Name",
    selector: (row) => row.name,
    left: true,
  },
  {
    name: "Action",
    left: true,
    cell: () => (
      <>
        <Button className="btn-fill me-1" variant="primary" size="sm">
          Edit
        </Button>
        <Button className="btn-fill ms-1" variant="danger" size="sm">
          Delete
        </Button>
      </>
    ),
  },
];

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
      <Add show={add} setShow={setAdd} fetchData={fetchData} />
      <Container fluid>
        {statusList ? (
          <Row>
            <Col md="12">
              <Card className="strpied-tabled-with-hover">
                <Card.Header>
                  <Card.Title as="h4">Status</Card.Title>
                </Card.Header>
                <Card.Body className="table-full-width table-responsive px-0">
                  <Button
                    onClick={() => setAdd(!add)}
                    className="btn-fill ms-3"
                    variant="info"
                    size="sm"
                  >
                    Add
                  </Button>
                  <DataTable
                    title="Status"
                    columns={columns}
                    data={statusList.data}
                    pagination
                  />
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
