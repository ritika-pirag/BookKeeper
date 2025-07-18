import React, { useState } from "react";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";
import { BsPlusCircle } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import "./InvoiceForm.css";

const InvoiceForm = () => {
  const [items, setItems] = useState([
    { name: "", description: "", quantity: 1, rate: "", taxPercent: "", discount: "" },
  ]);

  const [showClientModal, setShowClientModal] = useState(false);
  const [isTaxOn, setIsTaxOn] = useState(true);
  const [isDiscountOn, setIsDiscountOn] = useState(true);

  const [showTaxModal, setShowTaxModal] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);

  const [taxClass, setTaxClass] = useState("");
  const [taxValue, setTaxValue] = useState("");

  const [discountName, setDiscountName] = useState("");
  const [discountValue, setDiscountValue] = useState("");

  const [isEditMode, setIsEditMode] = useState(false);

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

  const handleTaxModalShow = () => setShowTaxModal(true);
  const handleTaxModalClose = () => setShowTaxModal(false);

  const handleDiscountModalShow = () => setShowDiscountModal(true);
  const handleDiscountModalClose = () => setShowDiscountModal(false);

  const handleTaxFormSubmit = (e) => {
    e.preventDefault();
    // logic for submitting tax form
    setShowTaxModal(false);
  };

  const handleDiscountFormSubmit = (e) => {
    e.preventDefault();
    // logic for submitting discount form
    setShowDiscountModal(false);
  };
  return (
    <div className="invoice-form-container">
    <Row className="g-3">
        <Col lg={6} md={12}>
          <div className="invoice-section-card">
            <h5 className="d-flex align-items-center justify-content-between">
              Bill To
              <Button style={{ backgroundColor: "#3daaaa", borderColor: "#3daaaa" }} size="sm" onClick={handleClientModalShow}>
                Add Client
              </Button>
            </h5>
            <Form.Group className="mb-2">
              <Form.Control placeholder="Enter Customer Name or Mobile Number to search" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control as="textarea" rows={3} placeholder="Client Details" />
            </Form.Group>
            <Form.Group>
              <Form.Select>
                <option>All</option>
                <option>Warehouse A</option>
                <option>Warehouse B</option>
              </Form.Select>
            </Form.Group>
          </div>
        </Col>

        <Col lg={6} md={12}>
          <div className="invoice-section-card">
            <h5>Invoice Properties</h5>
            <Row className="mb-2">
              <Col><Form.Control placeholder="Invoice Number" defaultValue="1082" /></Col>
              <Col><Form.Control placeholder="Reference #" /></Col>
            </Row>
            <Row className="mb-2">
              <Col><Form.Control type="date" defaultValue="2025-07-15" /></Col>
              <Col><Form.Control type="date" defaultValue="2025-07-15" /></Col>
            </Row>
            <Row className="mb-3">
  {/* Tax Row */}
  <Col md={12} className="mb-2">
    <div className="d-flex justify-content-between align-items-center">
    <div className="d-flex align-items-center">
  <Form.Label className="mb-0 fw-semibold me-3" style={{ minWidth: "50px" }}>
    Tax
  </Form.Label>

  <div className="d-flex align-items-center gap-4">
    <Form.Check
      type="radio"
      id="tax-on"
      name="tax"
      label="On"
      checked={isTaxOn}
      onChange={() => setIsTaxOn(true)}
      className="mb-0"
    />
    <Form.Check
      type="radio"
      id="tax-off"
      name="tax"
      label="Off"
      checked={!isTaxOn}
      onChange={() => setIsTaxOn(false)}
      className="mb-0"
    />
  </div>
</div>

      <Button variant="outline-primary" size="sm" className="px-2 py-1" onClick={handleTaxModalShow}>
        + Add Tax
      </Button>
    </div>
  </Col>

  {/* Discount Row */}
  <Col md={12}>
    <div className="d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center gap-3">
        <Form.Label className="mb-0 fw-semibold">Discount</Form.Label>
        <Form.Check
          inline
          type="radio"
          label="On"
          name="discount"
          checked={isDiscountOn}
          onChange={() => setIsDiscountOn(true)}
        />
        <Form.Check
          inline
          type="radio"
          label="Off"
          name="discount"
          checked={!isDiscountOn}
          onChange={() => setIsDiscountOn(false)}
        />
      </div>
      <Button variant="outline-primary" size="sm" className="px-2 py-1" onClick={handleDiscountModalShow}>
        + Add Discount
      </Button>
    </div>
  </Col>
</Row>

            <Form.Control as="textarea" placeholder="Invoice Note" className="mt-2" rows={2} />
          </div>
        </Col>
      </Row>

      <div className="invoice-section-card mt-3">
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light text-nowrap">
              <tr>
                <th>Item Name & Description</th>
                <th>Quantity</th>
                <th>Rate</th>
                {isTaxOn && <th>Tax(%)</th>}
                {isTaxOn && <th>Tax</th>}
                {isDiscountOn && <th>Discount</th>}
                <th>Amount ($)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <Form.Control placeholder="Enter Product name or Code" className="mb-1" />
                    <Form.Control as="textarea" rows={1} placeholder="Description" />
                  </td>
                  <td><Form.Control type="number" defaultValue={1} /></td>
                  <td><Form.Control /></td>
                  {isTaxOn && <td><Form.Control /></td>}
                  {isTaxOn && <td>0</td>}
                  {isDiscountOn && <td><Form.Control /></td>}
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

        <Button
          style={{ backgroundColor: "#3daaaa", borderColor: "#3daaaa" }}
          onClick={addRow}
          className="mt-2"
        >
          <BsPlusCircle className="me-1" /> Add Row
        </Button>
      </div>

      <Row className="mt-3">
        <Col lg={{ span: 4, offset: 8 }} md={12}>
          <div className="invoice-section-card">
            <table className="table">
              <tbody>
                {isTaxOn && <tr><td>Total Tax</td><td>$ 0</td></tr>}
                {isDiscountOn && <tr><td>Total Discount</td><td>$ 0</td></tr>}
                <tr>
                  <td>Shipping</td>
                  <td><Form.Control size="sm" placeholder="Value" /></td>
                </tr>
                <tr><td><strong>Grand Total ($)</strong></td><td><strong>$ 0</strong></td></tr>
              </tbody>
            </table>
          </div>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col lg={8} md={12}>
          <div className="invoice-section-card">
            <Row className="align-items-end">
              <Col lg={6} md={12}>
                <Form.Group>
                  <Form.Label>Payment Currency</Form.Label>
                  <Form.Select>
                    <option>Default</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={6} md={12}>
                <Form.Group>
                  <Form.Label>Payment Terms</Form.Label>
                  <Form.Select>
                    <option>Payment Due On Receipt</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Col>
        <Col lg={4} md={12} className="d-flex align-items-end">
          <div className="invoice-section-card w-100">
            <Button style={{ backgroundColor: "#3daaaa", borderColor: "#3daaaa" }} className="w-100">
              Generate Invoice
            </Button>
          </div>
        </Col>
      </Row>

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
              <Form.Control className="mb-2" placeholder="City" />
              <Form.Control className="mb-2" placeholder="Country" />
              <Form.Control className="mb-2" placeholder="Company" />
            </Col>
            <Col md={6} sm={12}>
              <h6>Shipping Address</h6>
              <Form.Check label="Same As Billing" className="mb-2" />
              <p className="text-muted small">Leave blank if you do not want to print it on invoice.</p>
              <Form.Control className="mb-2" placeholder="Name" />
              <Form.Control className="mb-2" placeholder="Phone" />
              <Form.Control className="mb-2" placeholder="Email" />
              <Form.Control className="mb-2" placeholder="Address" />
              <Form.Control className="mb-2" placeholder="City" />
              <Form.Control className="mb-2" placeholder="Country" />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClientModalClose}>Close</Button>
          <Button style={{ backgroundColor: "#3daaaa", borderColor: "#3daaaa" }}>ADD</Button>
        </Modal.Footer>
      </Modal>



      <Modal show={showDiscountModal} onHide={handleDiscountModalClose}>
  <Modal.Header closeButton>
    <Modal.Title>Add Discount</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form onSubmit={handleDiscountFormSubmit}>
      <Form.Group controlId="discountName">
        <Form.Label>Discount Name</Form.Label>
        <Form.Control type="text" value={discountName} onChange={(e) => setDiscountName(e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="discountValue" className="mt-3">
        <Form.Label>Discount Value (%)</Form.Label>
        <Form.Control type="number" value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} required />
      </Form.Group>
      <div className="d-flex justify-content-end mt-3">
        <Button variant="secondary" onClick={handleDiscountModalClose}>Close</Button>
        <Button variant="primary" type="submit" className="ms-2">Submit</Button>
      </div>
    </Form>
  </Modal.Body>
</Modal>
<Modal show={showTaxModal} onHide={handleTaxModalClose}>
  <Modal.Header closeButton>
    <Modal.Title>{isEditMode ? "Edit Tax" : "Create New Tax"}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form onSubmit={handleTaxFormSubmit}>
      <Form.Group controlId="taxClass">
        <Form.Label>Tax Class</Form.Label>
        <Form.Control type="text" value={taxClass} onChange={(e) => setTaxClass(e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="taxValue" className="mt-3">
        <Form.Label>Tax Value (%)</Form.Label>
        <Form.Control type="number" value={taxValue} onChange={(e) => setTaxValue(e.target.value)} required />
      </Form.Group>
      <div className="d-flex justify-content-end mt-3">
        <Button variant="secondary" onClick={handleTaxModalClose}>Close</Button>
        <Button variant="primary" type="submit" className="ms-2">{isEditMode ? "Update" : "Submit"}</Button>
      </div>
    </Form>
  </Modal.Body>
</Modal>

    </div>
  );
};

export default InvoiceForm;
