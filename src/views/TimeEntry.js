import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useAxiosFetch } from "customeHook/useAxiosFetch";
import Add from "../components/Role/Add.js";
import Edit from "../components/Role/Edit.js";
import Delete from "components/Role/Delete.js";
import DataTable from "react-data-table-component";
import { fakePaginate } from "config/index.js";
import moment from "moment"


function TimeEntry() {
  const [list, setList] = useState(null);
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deletes, setDeletes] = useState(false);
  const [activeData, setActiveData] = useState(null);

  const auth = useSelector((state) => state.auth);

  const { fetchData, data, loading, error } = useAxiosFetch(
    {
      method: "GET",
      url: `/timeEntry${fakePaginate}`,
      headers: { Authorization: `bearer ${auth.accessToken}` },
    },
    false
  );

  const columns = [
    {
      name: "Project Name",
      selector: (row) => row.project_name,
      left: true,
    },
    {
      name: "Project Code",
      selector: (row) => row.project_code,
      left: true,
    },
    {
      name: "Work Type",
      selector: (row) => row.work_type,
      left: true,
    },
    {
      name: "Start Time",
      selector: (row) =>  moment(row.start_time).format('DD-MM-YYYY HH:mm') ,
      left: true,
    },
    {
      name: "End time",
      selector: (row) => moment(row.endtime).format('DD-MM-YYYY HH:mm'),
      left: true,
    },
    {
      name: "Full Name",
      selector: (row) => `${row.firstname} ${row.lastname}`,
      left: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
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

  const handleEdit = (data) => {
    setActiveData(data);
    setEdit(true);
  };

  const handleDelete = (data) => {
    setActiveData(data);
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
                  <Card.Title as="h4">Time Entry</Card.Title>
                </Card.Header>
                <Card.Body className="table-full-width table-responsive px-0">
                  <Button
                    onClick={() => setAdd(!add)}
                    className="btn-fill ms-3"
                    variant="success"
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

export default TimeEntry;
