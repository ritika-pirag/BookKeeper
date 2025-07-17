import React, { useState } from "react";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./InvoiceForm.css";

const InvoiceForms = () => {
  const [items, setItems] = useState([
    { name: "", description: "", quantity: 1, rate: "", taxPercent: "", discount: "" },
  ]);

  const [showClientModal, setShowClientModal] = useState(false);

  const addRow = () => {
    setItems([
      ...items,
      { name: "", description: "", quantity: 1, rate: "", taxPercent: "", discount: "" },
    ]);
  };

  const removeRow = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleClientModalClose = () => setShowClientModal(false);
  const handleClientModalShow = () => setShowClientModal(true);

  return (
    <div className="container px-3 py-3 mt-2">
      <Row>
        <Col md={6} sm={12}>
          <h5 className="d-flex align-items-center justify-content-between">
            Bill To
            <Button style={{backgroundColor:"#3daaaa"}} size="sm" onClick={handleClientModalShow}>
              Add Client
            </Button>
          </h5>
          <Form.Group className="mb-2">
            <Form.Control placeholder="Enter Customer Name or Mobile Number to search" />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control placeholder="Client Details" />
          </Form.Group>
          <Form.Group>
            <Form.Select>
              <option>All</option>
              <option>Warehouse A</option>
              <option>Warehouse B</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6} sm={12}>
          <h5>Invoice Properties</h5>
          <Row className="mb-2">
            <Col><Form.Control placeholder="Invoice Number" defaultValue="1082" /></Col>
            <Col><Form.Control placeholder="Reference #" /></Col>
          </Row>
          <Row className="mb-2">
            <Col><Form.Control type="date" defaultValue="2025-07-15" /></Col>
            <Col><Form.Control type="date" defaultValue="2025-07-15" /></Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <Form.Select>
                <option>On</option>
                <option>Off</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Select>
                <option>% Discount After TAX</option>
                <option>% Discount Before TAX</option>
              </Form.Select>
            </Col>
          </Row>
          <Form.Control as="textarea" placeholder="Invoice Note" className="mt-2" />
        </Col>
      </Row>

      <div className="table-responsive mt-4">
        <table className="table table-bordered">
          <thead className="table-light text-nowrap">
            <tr>
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
                  <Form.Control placeholder="Enter Product name or Code" className="mb-2" />
                  <Form.Control placeholder="Enter Product description" />
                </td>
                <td><Form.Control type="number" defaultValue={1} /></td>
                <td><Form.Control /></td>
                <td><Form.Control /></td>
                <td>0</td>
                <td><Form.Control /></td>
                <td>$0</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => removeRow(index)}>
                    ×
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button style={{backgroundColor:"#3daaaa"}} onClick={addRow} className="mt-2">Add Row</Button>

      <Row className="mt-4">
        <Col md={{ span: 4, offset: 8 }} sm={12} className="text-end ms-auto">
          <table className="table">
            <tbody>
              <tr><td>Total Tax</td><td>$ 0</td></tr>
              <tr><td>Total Discount</td><td>$ 0</td></tr>
              <tr>
                <td>Shipping</td>
                <td><Form.Control placeholder="Value" /></td>
              </tr>
              <tr><td><strong>Grand Total ($)</strong></td><td><strong>$ 0</strong></td></tr>
            </tbody>
          </table>
        </Col>
      </Row>

      <Row className="mt-3 align-items-end">
        <Col md={4} sm={12}>
          <Form.Group>
            <Form.Label>Payment Currency</Form.Label>
            <Form.Select>
              <option>Default</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4} sm={12}>
          <Form.Group>
            <Form.Label>Payment Terms</Form.Label>
            <Form.Select>
              <option>Payment Due On Receipt</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4} sm={12} className="text-end">
          <Button style={{backgroundColor:"#3daaaa"}} className="mt-2">Generate Invoice</Button>
        </Col>
      </Row>

      {/* Add Client Modal */}
      <Modal show={showClientModal} onHide={handleClientModalClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6} sm={12}>
              <h6>Billing Address</h6>
              <Form.Control className="mb-2" placeholder="Name" />
              <Form.Control className="mb-2" placeholder="Phone" />
              <Form.Control className="mb-2" placeholder="Email" />
              <Form.Control className="mb-2" placeholder="Address" />
              <Row>
                <Col><Form.Control className="mb-2" placeholder="City" /></Col>
                <Col><Form.Control className="mb-2" placeholder="Region" /></Col>
              </Row>
              <Row>
                <Col><Form.Control className="mb-2" placeholder="Country" /></Col>
                <Col><Form.Control className="mb-2" placeholder="PostBox" /></Col>
              </Row>
              <Row>
                <Col><Form.Control className="mb-2" placeholder="Company" /></Col>
                <Col><Form.Control className="mb-2" placeholder="TAX ID" /></Col>
              </Row>
              <Form.Select className="mb-2">
                <option>Groupe A</option>
                <option>Groupe B</option>
              </Form.Select>
            </Col>

            <Col md={6} sm={12}>
              <h6>Shipping Address</h6>
              <Form.Check label="Same As Billing" className="mb-2" />
              <p className="text-muted small">Please leave Shipping Address blank if you do not want to print it on the invoice.</p>
              <Form.Control className="mb-2" placeholder="Name" />
              <Form.Control className="mb-2" placeholder="Phone" />
              <Form.Control className="mb-2" placeholder="Email" />
              <Form.Control className="mb-2" placeholder="Address" />
              <Row>
                <Col><Form.Control className="mb-2" placeholder="City" /></Col>
                <Col><Form.Control className="mb-2" placeholder="Region" /></Col>
              </Row>
              <Row>
                <Col><Form.Control className="mb-2" placeholder="Country" /></Col>
                <Col><Form.Control className="mb-2" placeholder="PostBox" /></Col>
              </Row>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClientModalClose}>Close</Button>
          <Button style={{backgroundColor:"#3daaaa"}}>ADD</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InvoiceForms;
