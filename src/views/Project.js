import React, { useState } from "react";

// react-bootstrap components
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";

import AsyncSelect from "react-select/async";

import MultipleValueTextInput from "react-multivalue-text-input";

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
          <Col md="2"></Col>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Add Project</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={(e) => e.preventDefault()}>
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
                    <Col md="12">
                      <label htmlFor="inputMembers">Members</label>
                      <AsyncSelect
                        options={options}
                        isMulti
                        cacheOptions
                        loadOptions={loadOptions}
                        defaultOptions
                        placeholder="Select members"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                    <label htmlFor="inputMembers">Work Types</label>
                      <MultipleValueTextInput
                        onItemAdded={(item, allItems) =>
                          console.log(`Item added: ${item}`)
                        }
                        onItemDeleted={(item, allItems) =>
                          console.log(`Item removed: ${item}`)
                        }
                        className="form-control"
                        name="work-type-item"
                        placeholder="COMMA or ENTER to add WORK TYPES."
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
