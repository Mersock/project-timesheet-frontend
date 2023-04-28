import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useAxiosFetch } from "customeHook/useAxiosFetch";
import Add from "../components/Status/Add.js";
import Edit from "../components/Status/Edit.js";
import Delete from "components/Status/Delete.js";
import DataTable from "react-data-table-component";
import { fakePaginate } from "config/index.js";

function Status() {
  const [list, setList] = useState(null);
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deletes, setDeletes] = useState(false);
  const [activeData, setActiveData] = useState(null);

  const auth = useSelector((state) => state.auth);

  const { fetchData, data, loading, error } = useAxiosFetch(
    {
      method: "GET",
      url: `/status${fakePaginate}`,
      headers: { Authorization: `bearer ${auth.accessToken}` },
    },
    false
  );

  const columns = [
    {
      name: "Status Name",
      selector: (row) => row.name,
      left: true,
    },
    {
      name: "Action",
      left: true,
      cell: (row) => (
        <>
          <Button
            onClick={() => handleEdit(row)}
            className="btn-fill me-1"
            variant="primary"
            size="sm"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(row)}
            className="btn-fill ms-1"
            variant="danger"
            size="sm"
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const handleEdit = (id) => {
    setActiveData(id);
    setEdit(true);
  };

  const handleDelete = (id) => {
    setActiveData(id);
    setDeletes(true);
  };

  useEffect(() => {
    if (auth.accessToken) {
      fetchData();
    }
  }, [auth.accessToken]);

  useEffect(() => {
    if (data) {
      setList(data);
    } else {
      setList([]);
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
      <Add show={add} setShow={setAdd} fetchData={fetchData} />
      <Edit
        show={edit}
        activeData={activeData}
        setShow={setEdit}
        fetchData={fetchData}
      />
      <Delete
        show={deletes}
        activeData={activeData}
        setShow={setDeletes}
        fetchData={fetchData}
      />
      <Container fluid>
        {list ? (
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
                    columns={columns}
                    data={list.data || []}
                    progressPending={loading}
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
