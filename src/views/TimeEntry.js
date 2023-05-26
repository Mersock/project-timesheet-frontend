import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useAxiosFetch } from "customeHook/useAxiosFetch";
import Add from "../components/TimeEntry/Add.js";
import Edit from "../components/TimeEntry/Edit.js";
import Delete from "components/TimeEntry/Delete.js";
import DataTable from "react-data-table-component";
import { fakePaginate } from "config/index.js";
import moment from "moment";
import Badge from "react-bootstrap/Badge";
import axios from "axios";
import { backendUrl } from "config/index.js";

function TimeEntry() {
  const [list, setList] = useState(null);
  const [projectList, setProjectList] = useState(null);
  const [statusList, setStatusList] = useState(null);
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deletes, setDeletes] = useState(false);
  const [activeData, setActiveData] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [workTypeList, setWorkTypeList] = useState(null);

  const auth = useSelector((state) => state.auth);

  const { fetchData, data, loading, error } = useAxiosFetch(
    {
      method: "GET",
      url: `/timeEntry${fakePaginate}`,
      headers: { Authorization: `bearer ${auth.accessToken}` },
    },
    false
  );

  const { fetchData: fetchProject, data: project } = useAxiosFetch(
    {
      method: "GET",
      url: `/project${fakePaginate}`,
      headers: { Authorization: `bearer ${auth.accessToken}` },
    },
    false
  );

  const { fetchData: fetchStatus, data: status } = useAxiosFetch(
    {
      method: "GET",
      url: `/status${fakePaginate}`,
      headers: { Authorization: `bearer ${auth.accessToken}` },
    },
    false
  );

  const columns = [
    {
      name: "Project Code",
      selector: (row) => row.project_code,
      left: true,
    },
    {
      name: "Project Name",
      selector: (row) => row.project_name,
      left: true,
    },
    {
      name: "Work Type",
      selector: (row) => row.work_type_name,
      left: true,
    },
    {
      name: "Start Time",
      selector: (row) => moment(row.start_time).format("DD-MM-yyyy HH:mm"),
      left: true,
    },
    {
      name: "End time",
      selector: (row) => moment(row.end_time).format("DD-MM-yyyy HH:mm"),
      left: true,
    },
    {
      name: "Full Name",
      selector: (row) => `${row.firstname} ${row.lastname}`,
      left: true,
    },
    {
      name: "Status",
      left: true,
      cell: (row) => (
        <>
          <Badge bg="secondary"><strong>{row.status}</strong></Badge>
        </>
      ),
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

  const handleEdit = async (row) => {
    try {
      const config = {
        headers: { Authorization: `bearer ${auth.accessToken}` },
      };
      const { data } = await axios.get(
        `${backendUrl}/workTypes/project/${row.project_id}`,
        config
      );
      if (data.data) {
        const workTypes = data.data.map((item) => {
          const option = {
            value: item.id,
            label: item.name,
          };
          return option;
        });
        setWorkTypeList(workTypes);
        setActiveData(row);
        setEdit(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (data) => {
    setActiveData(data);
    setDeletes(true);
  };

  useEffect(() => {
    if (auth.accessToken) {
      fetchData();
      fetchProject();
      fetchStatus();
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
    if (project) {
      const projectOption = project?.data?.map((item) => {
        const option = {
          value: item.id,
          label: item.name,
        };
        return option;
      });
      setProjectList(projectOption);
    }
  }, [project]);

  useEffect(() => {
    if (status) {
      const statusOption = status?.data?.map((item) => {
        const option = {
          value: item.id,
          label: item.name,
        };
        return option;
      });
      setStatusList(statusOption);
    }
  }, [status]);

  useEffect(() => {
    const fetchWorkType = async () => {
      if (activeProject) {
        try {
          const config = {
            headers: { Authorization: `bearer ${auth.accessToken}` },
          };
          const { data } = await axios.get(
            `${backendUrl}/workTypes/project/${activeProject}`,
            config
          );
          if (data.data) {
            const workTypes = data.data.map((item) => {
              const option = {
                value: item.id,
                label: item.name,
              };
              return option;
            });
            setWorkTypeList(workTypes);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchWorkType();
  }, [activeProject]);


  return (
    <>
      <Add
        show={add}
        setShow={setAdd}
        fetchData={fetchData}
        projectList={projectList}
        statusList={statusList}
        workTypeList={workTypeList}
        setActiveProject={setActiveProject}
        setWorkTypeList={setWorkTypeList}
      />
      <Edit
        show={edit}
        activeData={activeData}
        setShow={setEdit}
        fetchData={fetchData}
        projectList={projectList}
        statusList={statusList}
        workTypeList={workTypeList}
        setActiveProject={setActiveProject}
        setWorkTypeList={setWorkTypeList}
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
