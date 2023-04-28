import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useAxiosFetch } from "customeHook/useAxiosFetch";
import Add from "../components/Project/Add.js";
import Edit from "../components/Project/Edit.js";
import Delete from "components/Project/Delete.js";
import DataTable from "react-data-table-component";
import { fakePaginate } from "config/index.js";
import axios from "axios";
import { backendUrl } from "config/index.js";

function Project() {
  const [list, setList] = useState(null);
  const [userList, setUserList] = useState(null);
  const [projectData, setProjectData] = useState(null);
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deletes, setDeletes] = useState(false);
  const [activeData, setActiveData] = useState(null);

  const auth = useSelector((state) => state.auth);

  const { fetchData, data, loading, error } = useAxiosFetch(
    {
      method: "GET",
      url: `/project${fakePaginate}`,
      headers: { Authorization: `bearer ${auth.accessToken}` },
    },
    false
  );

  const { fetchData: fetchUser, data: users } = useAxiosFetch(
    {
      method: "GET",
      url: `/user${fakePaginate}`,
      headers: { Authorization: `bearer ${auth.accessToken}` },
    },
    false
  );

  const columns = [
    {
      name: "Project Name",
      selector: (row) => row.name,
      left: true,
    },
    {
      name: "Project Code",
      selector: (row) => row.code,
      left: true,
    },
    {
      name: "Action",
      left: true,
      cell: (row) => (
        <>
          <Button
            className="btn-fill me-1"
            variant="info"
            size="sm"
          >
            View
          </Button>
          <Button
            onClick={() => handleEdit(row)}
            className="btn-fill me-1 ms-1"
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

  const handleEdit = async (row) => {
    setActiveData(row);
    try {
      const config = {
        headers: { Authorization: `bearer ${auth.accessToken}` },
      };
      const id = row.id;
      const { data } = await axios.get(`${backendUrl}/project/${id}`, config);
      setProjectData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id) => {
    setActiveData(id);
    setDeletes(true);
  };

  useEffect(() => {
    if (!edit && projectData) {
      setEdit(true);
    }
  }, [edit, projectData]);

  useEffect(() => {
    if (auth.accessToken) {
      fetchData();
      fetchUser();
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

  useEffect(() => {
    if (users) {
      const userOption = users?.data.map((item) => {
        const option = {
          value: item.email,
          label: item.email,
        };
        return option;
      });
      setUserList(userOption);
    }
  }, [users]);

  return (
    <>
      <Add
        show={add}
        setShow={setAdd}
        fetchData={fetchData}
        userList={userList}
      />
      <Edit
        show={edit}
        activeData={activeData}
        setShow={setEdit}
        setProjectData={setProjectData}
        fetchData={fetchData}
        userList={userList}
        project={projectData}
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
                  <Card.Title as="h4">Project</Card.Title>
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

export default Project;
