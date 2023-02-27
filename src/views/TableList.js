import React, { useState } from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Pagination from "react-bootstrap-4-pagination";

let mdSize = {
  totalPages: 2,
  currentPage: 1,
  showMax: 2,
  threeDots: true,
  prevNext: true,
  onClick: function (page) {
    console.log(page);
  },
};

function TableList() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Users</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">No</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Firstname</th>
                      <th className="border-0">Lastname</th>
                      <th className="border-0">Role</th>
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>admin@admin.com</td>
                      <td>Admin</td>
                      <td>Admin</td>
                      <td>Administrator</td>
                      <td>
                        <Button
                          className="btn-fill"
                          variant="primary"
                          size="sm"
                        >
                          Edit
                        </Button>
                        {' '}
                        <Button
                          className="btn-fill"
                          variant="danger"
                          size="sm"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>minerva@mail.com</td>
                      <td>Minerva</td>
                      <td>Hooper</td>
                      <td>Project manager</td>
                      <td>
                      <Button
                          className="btn-fill"
                          variant="primary"
                          size="sm"
                        >
                          Edit
                        </Button>
                        {' '}
                        <Button
                          className="btn-fill"
                          variant="danger"
                          size="sm"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>sage@mail.com</td>
                      <td>Sage</td>
                      <td>Rodriguez</td>
                      <td>Project manager</td>
                      <td>
                      <Button
                          className="btn-fill"
                          variant="primary"
                          size="sm"
                        >
                          Edit
                        </Button>
                        {' '}
                        <Button
                          className="btn-fill"
                          variant="danger"
                          size="sm"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>philip@mail.com</td>
                      <td>Philip</td>
                      <td>Chaney</td>
                      <td>Project member</td>
                      <td>
                      <Button
                          className="btn-fill"
                          variant="primary"
                          size="sm"
                        >
                          Edit
                        </Button>
                        {' '}
                        <Button
                          className="btn-fill"
                          variant="danger"
                          size="sm"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>doris@mail.com</td>
                      <td>Doris</td>
                      <td>Greene</td>
                      <td>Project member</td>
                      <td>
                      <Button
                          className="btn-fill"
                          variant="primary"
                          size="sm"
                        >
                          Edit
                        </Button>
                        {' '}
                        <Button
                          className="btn-fill"
                          variant="danger"
                          size="sm"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <Pagination {...mdSize} shadow />
              </Card.Body>
            </Card>
          </Col>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Table on Plain Background</Card.Title>
                <p className="card-category">
                  Here is a subtitle for this table
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Salary</th>
                      <th className="border-0">Country</th>
                      <th className="border-0">City</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Dakota Rice</td>
                      <td>$36,738</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Minerva Hooper</td>
                      <td>$23,789</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Sage Rodriguez</td>
                      <td>$56,142</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Philip Chaney</td>
                      <td>$38,735</td>
                      <td>Korea, South</td>
                      <td>Overland Park</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Doris Greene</td>
                      <td>$63,542</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Mason Porter</td>
                      <td>$78,615</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TableList;
