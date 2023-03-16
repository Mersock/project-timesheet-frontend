import React, { useState } from "react";

// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
  Table,
  InputGroup,
  FormControl,
  Badge,
} from "react-bootstrap";

import AsyncSelect from "react-select/async";
import Select from "react-select";

import MultipleValueTextInput from "react-multivalue-text-input";

import DatePicker from "react-datepicker";

const options = [
  { value: "1", label: "John@mail.com" },
  { value: "2", label: "Leo@mail.com" },
  { value: "3", label: "Bella@mail.com" },
];

const workTypes = [
  { value: "1", label: "Design Database" },
  { value: "2", label: "Create Table" },
];

const statuses = [
  { value: "1", label: "To do" },
  { value: "2", label: "In progress" },
  { value: "3", label: "Block" },
  { value: "4", label: "Fail" },
  { value: "5", label: "Done" },
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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

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

        <Row>
          <Col md="2"></Col>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Project</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="3">
                    <div className="typography-line">PROJECT NAME:</div>
                  </Col>
                  <Col md="9">
                    <div className="typography-line pl-5">
                      Database Work Shop
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="3">
                    <div className="typography-line">PROJECT CODE:</div>
                  </Col>
                  <Col md="9">
                    <div className="typography-line pl-5">
                      bff2dd5c-2273-476f-a399-dcff8debb06c
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="3">
                    <div className="typography-line">MEMBERS:</div>
                  </Col>
                  <Col md="9">
                    <Table className="table-hover">
                      <thead>
                        <tr>
                          <th className="border-0">NO</th>
                          <th className="border-0">Email</th>
                          <th className="border-0">Firstname</th>
                          <th className="border-0">Lastname</th>
                          <th className="border-0">Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <strong className="text-primary">1</strong>
                          </td>
                          <td>
                            <strong className="text-primary">
                              Mineva@mail.com
                            </strong>
                          </td>
                          <td>
                            <strong className="text-primary">Mineva</strong>
                          </td>
                          <td>
                            <strong className="text-primary">Hooper</strong>
                          </td>
                          <td>
                            <strong className="text-primary">
                              Project manager
                            </strong>
                          </td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>John@mail.com</td>
                          <td>John</td>
                          <td>Doe</td>
                          <td>Project Member</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>Bella@mail.com</td>
                          <td>Bella</td>
                          <td>Grenn</td>
                          <td>Project Member</td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>Leo@mail.com</td>
                          <td>Leo</td>
                          <td>Messi</td>
                          <td>Project Member</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
                <Row>
                  <Col md="3">
                    <div className="typography-line">Work Type:</div>
                  </Col>
                  <Col md="9">
                    <Table className="table-hover">
                      <thead>
                        <tr>
                          <th className="border-0">NO</th>
                          <th className="border-0">Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Design Database</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Create Table</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="2"></Col>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Add Time Entry</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={(e) => e.preventDefault()}>
                  <Row>
                    <Col md="6">
                      <label htmlFor="inputMembers">Work Type</label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isDisabled={false}
                        isClearable
                        isSearchable
                        name="work_types"
                        options={workTypes}
                        placeholder="Please choose your work type"
                      />
                    </Col>
                    <Col md="6">
                      <label htmlFor="inputMembers">Status</label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isDisabled={false}
                        isClearable
                        isSearchable
                        name="status"
                        options={statuses}
                        placeholder="Status"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <label htmlFor="inputMembers">Start Time</label>
                      <DatePicker
                        className="form-control"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        timeIntervals={10}
                        dateFormat="dd-MM-yyyy HH:mm"
                        timeFormat="HH:mm"
                        placeholderText="Select Start Time"
                      />
                    </Col>
                    <Col md="6">
                      <label htmlFor="inputMembers">End Time</label>
                      <DatePicker
                        className="form-control"
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        showTimeSelect
                        timeIntervals={10}
                        dateFormat="dd-MM-yyyy HH:mm"
                        timeFormat="HH:mm"
                        placeholderText="Select End Time"
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

        <Row>
          <Col md="2"></Col>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Report Total Time</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <Form.Control
                          placeholder="Search by Project Code"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Row>
                        <Col className="text-center">
                          <span>Database Work Shop</span>
                        </Col>
                      </Row>
                      <Table className="table-hover">
                        <thead>
                          <tr>
                            <th className="border-0">NO</th>
                            <th className="border-0">Work Type</th>
                            <th className="border-0">Total Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Design Database</td>
                            <td>00:01:00</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Create Table</td>
                            <td>00:02:00</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="2"></Col>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Report Individual Time Entry</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <Form.Control
                          placeholder="Project Code"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <Form.Control
                          placeholder="Email"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="info"
                      >
                        Search
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Row>
                        <Col md="4" className="text-left">
                          <span>Project: Database Work Shop</span>
                        </Col>
                        <Col md="4" className="text-left">
                          <span>Fullname: John Doe</span>
                        </Col>
                      </Row>
                      <Table className="table-hover">
                        <thead>
                          <tr>
                            <th className="border-0">NO</th>
                            <th className="border-0">Work Type</th>
                            <th className="border-0">Status</th>
                            <th className="border-0">Start Time</th>
                            <th className="border-0">End Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Design Database</td>
                            <td>
                              <Badge className="bg-success" variant="info">
                                Done
                              </Badge>
                            </td>
                            <td>20-02-2023 09:00</td>
                            <td>20-02-2023 18:00</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Create Table</td>
                            <td>
                              <Badge className="bg-success" variant="info">
                                Done
                              </Badge>
                            </td>
                            <td>21-02-2023 09:00</td>
                            <td>21-02-2023 18:00</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="2"></Col>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Report Member In Project</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <Form.Control
                          placeholder="Search by Project Code"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                        <Col className="text-center">
                          <span>Database Work Shop</span>
                        </Col>
                      </Row>
                  <Row>
                    <Col md="12">
                      <Table className="table-hover">
                        <thead>
                          <tr>
                            <th className="border-0">NO</th>
                            <th className="border-0">Email</th>
                            <th className="border-0">Firstname</th>
                            <th className="border-0">Lastname</th>
                            <th className="border-0">Role</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <strong className="text-primary">1</strong>
                            </td>
                            <td>
                              <strong className="text-primary">
                                Mineva@mail.com
                              </strong>
                            </td>
                            <td>
                              <strong className="text-primary">Mineva</strong>
                            </td>
                            <td>
                              <strong className="text-primary">Hooper</strong>
                            </td>
                            <td>
                              <strong className="text-primary">
                                Project manager
                              </strong>
                            </td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>John@mail.com</td>
                            <td>John</td>
                            <td>Doe</td>
                            <td>Project Member</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Bella@mail.com</td>
                            <td>Bella</td>
                            <td>Grenn</td>
                            <td>Project Member</td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>Leo@mail.com</td>
                            <td>Leo</td>
                            <td>Messi</td>
                            <td>Project Member</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="2"></Col>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Report Total Project</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md="12">
                      <Table className="table-hover">
                        <thead>
                          <tr>
                            <th className="border-0"></th>
                            <th className="border-0"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Total Project</td>
                            <td>22</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="2"></Col>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Report Total User</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md="12">
                      <Table className="table-hover">
                        <thead>
                          <tr>
                            <th className="border-0"></th>
                            <th className="border-0"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Total User</td>
                            <td>43</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
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
