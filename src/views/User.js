import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useAxiosFetch } from "customeHook/useAxiosFetch";
import Add from "../components/User/Add.js";
import Edit from "../components/User/Edit.js";
import Delete from "components/User/Delete.js";
import DataTable from "react-data-table-component";
import { fakePaginate } from "config/index.js";

function User() {
  const [userList, setUserList] = useState(null);
  const [roleList, setRoleList] = useState(null);
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deletes, setDeletes] = useState(false);
  const [activeData, setActiveData] = useState(null);

  const auth = useSelector((state) => state.auth);

  const { fetchData, data, loading, error } = useAxiosFetch(
    {
      method: "GET",
      url: `/user${fakePaginate}`,
      headers: { Authorization: `bearer ${auth.accessToken}` },
    },
    false
  );

  const { fetchData: fetchRole, data: role } = useAxiosFetch(
    {
      method: "GET",
      url: `/role${fakePaginate}`,
      headers: { Authorization: `bearer ${auth.accessToken}` },
    },
    false
  );

  const columns = [
    {
      name: "Email",
      selector: (row) => row.email,
      left: true,
    },
    {
      name: "Firstname",
      selector: (row) => row.firstname,
      left: true,
    },
    {
      name: "Lastname",
      selector: (row) => row.lastname,
      left: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
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
      fetchRole();
    }
  }, [auth.accessToken]);

  useEffect(() => {
    if (data) {
      setUserList(data);
    } else {
      setUserList([]);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  useEffect(() => {
    if (loading) {
      console.log("retrieving user...");
    }
  }, [loading]);

  useEffect(() => {
    if (role) {
      const roleOption = role?.data.map((item) => {
        const option = {
          value: item.id,
          label: String(item.name).charAt(0).toUpperCase() + item.name.slice(1),
        };
        return option;
      });
      setRoleList(roleOption);
    }
  }, [role]);

  console.log(roleList);
  return (
    <>
      <Add
        show={add}
        setShow={setAdd}
        fetchData={fetchData}
        roleList={roleList}
      />
      <Edit
        show={edit}
        activeData={activeData}
        setShow={setEdit}
        fetchData={fetchData}
        oleList={roleList}
      />
      <Delete
        show={deletes}
        activeData={activeData}
        setShow={setDeletes}
        fetchData={fetchData}
      />
      <Container fluid>
        {userList ? (
          <Row>
            <Col md="12">
              <Card className="strpied-tabled-with-hover">
                <Card.Header>
                  <Card.Title as="h4">User</Card.Title>
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
                    data={userList.data}
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

export default User;
