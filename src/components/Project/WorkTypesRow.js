import React from "react";
import { Button, Form } from "react-bootstrap";

function TableRows({ rowsData, deleteTableRows, handleChange }) {
  return rowsData.map((data, index) => {
    const { name, id } = data;
    return (
      <tr key={index}>
        <td>
          <Form.Control
            size="sm"
            type="text"
            placeholder="name"
            value={name || ''}
            required
            onChange={(evnt)=>(handleChange(index,id, evnt))}
          />
        </td>
        <td align="center">
          <Button
            onClick={() => deleteTableRows(index, id)}
            className="btn-fill ms-1"
            variant="danger"
            size="sm"
          >
            Delete
          </Button>{" "}
        </td>
      </tr>
    );
  });
}
export default TableRows;
