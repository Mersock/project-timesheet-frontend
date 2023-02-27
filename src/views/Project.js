import React from "react";

// react-bootstrap components
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";

import AsyncSelect from "react-select/async";

const options = [
  { value: "1", label: "project_member_1@mail.com" },
  { value: "2", label: "project_member_2@mail.com" },
  { value: "3", label: "project_member_3@mail.com" },
];

const filterColors = (inputValue) => {
  return options.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const loadOptions = (inputValue, callback) => {
  setTimeout(() => {
    callback(filterColors(inputValue));
  }, 1000);
};

function Project() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Add User</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label htmlFor="inputProjectName">Project Name</label>
                        <Form.Control
                          placeholder="Project Name"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="5">
                    <label htmlFor="inputMembers">Members</label>
                      <AsyncSelect
                        options={options}
                        isMulti
                        cacheOptions
                        loadOptions={loadOptions}
                        defaultOptions
                        placeholder="Members"
                      />
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Add
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Project;
