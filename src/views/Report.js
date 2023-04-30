import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

function Report() {
  const auth = useSelector((state) => state.auth);

  return (
    <>
      <Container fluid>
      </Container>
    </>
  );
}

export default Report;
