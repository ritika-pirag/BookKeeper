import React, { useState } from 'react';
import { Form, Button, Row, Col, InputGroup, Modal } from 'react-bootstrap';
import { BsCalendar, BsBookmark, BsPlusCircle } from 'react-icons/bs';

const NewOrder = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false); // ✅ Fix: Define the handler

  const [items, setItems] = useState([
    { name: '', description: '', quantity: 1, rate: '', tax: '', discount: '', amount: 0 }
  ]);

  const addRow = () => {
    setItems([
      ...items,
      { name: '', description: '', quantity: 1, rate: '', tax: '', discount: '', amount: 0 }
    ]);
  };

  return (
    <div className="p-4 mt-4 mb-5">
      <h5 className="mb-3">
        Bill From
        <Button style={ {backgroundColor:"#3daaaa", borderColor:"#3daaaa"}} size="sm" className="ms-2" onClick={() => setShowModal(true)}>
          Add Vendors
        </Button>
      </h5>

      {/* --- Your Form Fields --- */}
      <Row className="mb-3">
        <Col md={4}>
          <Form.Label>Search Vendors</Form.Label>
          <Form.Control placeholder="Enter Vendors Name or Mobile Number to search" />
        </Col>
        <Col md={2}>
          <Form.Label>Bill #</Form.Label>
          <InputGroup>
            <InputGroup.Text><BsCalendar /></InputGroup.Text>
            <Form.Control value="1046" />
          </InputGroup>
        </Col>
        <Col md={2}>
          <Form.Label>Reference</Form.Label>
          <InputGroup>
            <InputGroup.Text><BsBookmark /></InputGroup.Text>
            <Form.Control placeholder="Reference #" />
          </InputGroup>
        </Col>
        <Col md={2}>
          <Form.Label>Order Date</Form.Label>
          <InputGroup>
            <InputGroup.Text><BsCalendar /></InputGroup.Text>
            <Form.Control type="date" value="2025-07-15" />
          </InputGroup>
        </Col>
        <Col md={2}>
          <Form.Label>Order Due Date</Form.Label>
          <InputGroup>
            <InputGroup.Text><BsCalendar /></InputGroup.Text>
            <Form.Control type="date" value="2025-07-15" />
          </InputGroup>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Label>Vendors Details</Form.Label>
          <Form.Control disabled />
        </Col>
        <Col md={4}>
          <Form.Label>Warehouse</Form.Label>
          <Form.Select>
            <option>All</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Label>Tax</Form.Label>
          <Form.Select>
            <option>On</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Label>Discount</Form.Label>
          <Form.Select>
            <option>% Discount After TAX</option>
          </Form.Select>
        </Col>
      </Row>

      <div className="table-responsive mb-3">
        <table className="table table-bordered align-middle">
          <thead>
            <tr className="table-light">
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Tax(%)</th>
              <th>Tax</th>
              <th>Discount</th>
              <th>Amount ($)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>
                  <Form.Control placeholder="Enter Product name or Code" className="mb-1" />
                  <Form.Control placeholder="Enter Product description" />
                </td>
                <td><Form.Control type="number" defaultValue={1} /></td>
                <td><Form.Control /></td>
                <td><Form.Control /></td>
                <td>0</td>
                <td><Form.Control /></td>
                <td>$ 0</td>
                <td>-</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button style={{backgroundColor:"#3daaaa", borderColor:"#3daaaa"}} onClick={addRow}><BsPlusCircle className="me-1" /> Add Row</Button>
      </div>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Label>Payment Terms</Form.Label>
          <Form.Select>
            <option>Payment Due On Receipt</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Label>Update Stock</Form.Label><br />
          <Form.Check inline label="Yes" name="updateStock" type="radio" defaultChecked />
          <Form.Check inline label="No" name="updateStock" type="radio" />
        </Col>
      </Row>

      <Row className="justify-content-end text-end mb-3">
        <Col md={4}>
          <p>Total Tax: <strong>$ 0</strong></p>
          <p>Total Discount: <strong>$ 0</strong></p>
          <InputGroup className="mb-2">
            <InputGroup.Text>Shipping</InputGroup.Text>
            <Form.Control placeholder="Value" />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Grand Total ($)</InputGroup.Text>
            <Form.Control />
          </InputGroup>
          <Button style={{backgroundColor:"#3daaaa", borderColor:"#3daaaa"}}>Generate Order</Button>
        </Col>
      </Row>

      {/* --- Add Vendors Modal --- */}
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Vendors</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Phone" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Address" />
            </Form.Group>
            <Row className="mb-3">
              <Col>Upload Document</Col>
 <Form.Control
                type="file"
                name="document"
                // onChange={handleChange}
              />
            </Row>
     
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>Close</Button>
          <Button style={{ backgroundColor: '#3daaaa',borderColor:"#3daaaa", color: '#fff' }} onClick={handleClose}>ADD</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NewOrder;
