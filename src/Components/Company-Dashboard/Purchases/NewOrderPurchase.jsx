import React, { useState } from 'react';
import {
  Form,
  Button,
  Row,
  Col,
  InputGroup,
  Modal,


} from 'react-bootstrap';
import {
  BsCalendar,
  BsBookmark,
  BsPlusCircle,
  BsPlus
} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const NewOrder = () => {
  const [showModal, setShowModal] = useState(false);
  const [showTaxModal, setShowTaxModal] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);

  const [isTaxOn, setIsTaxOn] = useState(true);
  const [isDiscountOn, setIsDiscountOn] = useState(true);

  const [taxClass, setTaxClass] = useState('');
  const [taxValue, setTaxValue] = useState('');
  const [discountName, setDiscountName] = useState('');
  const [discountValue, setDiscountValue] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState('');

  const [items, setItems] = useState([
    { name: '', description: '', quantity: 1, rate: '', tax: '', discount: '', amount: 0 }
  ]);

  const addRow = () => {
    setItems([
      ...items,
      { name: '', description: '', quantity: 1, rate: '', tax: '', discount: '', amount: 0 }
    ]);
  };

  const handleTaxFormSubmit = (e) => {
    e.preventDefault();
    setShowTaxModal(false);
  };

  const handleDiscountFormSubmit = (e) => {
    e.preventDefault();
    setShowDiscountModal(false);
  };

  const navigate = useNavigate();

  const vendors = [
    { id: 1, name: "John Vendor" },
    { id: 2, name: "Emily Vendor" },
    { id: 3, name: "Rajesh Vendor" }
  ];

  return (
    <div className="p-4 mt-4 mb-5 border">


      {/* Vendor Info */}
      <Row className="mb-3">
      <Col md={6}>
  <Form.Group>
    <Form.Label className="fw-semibold">Vendor*</Form.Label>
    <InputGroup>
      <Form.Select
        value={selectedVendor}
        onChange={(e) => setSelectedVendor(e.target.value)}
        className="border-end-0"
      >
        <option value="">Select Vendor</option>
        {vendors.map(v => (
          <option key={v.id} value={v.name}>{v.name}</option>
        ))}
      </Form.Select>
      <Button
        variant="outline-secondary"
        size="sm"
        className="border-start-0"
        onClick={() => navigate("/company/vendors")}
        title="Add Vendor"
      >
        <BsPlus size={12} />
      </Button>
    </InputGroup>
  </Form.Group>
</Col>


        <Col md={6}>
          <Form.Label>Bill #</Form.Label>
          <InputGroup>
            <InputGroup.Text><BsCalendar /></InputGroup.Text>
            <Form.Control value="1046" />
          </InputGroup>
        </Col>

        <Col md={6} className='mt-2'>
          <Form.Label>Reference</Form.Label>
          <InputGroup>
            <InputGroup.Text><BsBookmark /></InputGroup.Text>
            <Form.Control placeholder="Reference #" />
          </InputGroup>
        </Col>

        <Col md={6}>
          <Form.Label>Order Date</Form.Label>
          <InputGroup>
            <InputGroup.Text><BsCalendar /></InputGroup.Text>
            <Form.Control type="date" value="2025-07-15" />
          </InputGroup>
        </Col>

        <Col md={6} className='mt-2'>
          <Form.Label>Due Date</Form.Label>
          <InputGroup>
            <InputGroup.Text><BsCalendar /></InputGroup.Text>
            <Form.Control type="date" value="2025-07-15" />
          </InputGroup>
        </Col>
      </Row>

      {/* Tax & Discount */}
      <Row className="mb-3">
      <Col md={12} className="mb-2">
  <div className="d-flex justify-content-between align-items-center">
    <div className="d-flex align-items-center gap-3">
      <Form.Label className="mb-0 fw-semibold small">Tax</Form.Label>
      <Form.Check
        type="switch"
        id="tax-toggle"
        label={isTaxOn ? "On" : "Off"}
        checked={isTaxOn}
        onChange={() => setIsTaxOn(!isTaxOn)}
        className="mb-0"
      />
    </div>
    <Button
      size="sm"
      onClick={() => setShowTaxModal(true)}
      style={{ backgroundColor: "#3daaaa", borderColor: "#3daaaa" }}
    >
      + Add Tax
    </Button>
  </div>
</Col>

<Col md={12}>
  <div className="d-flex justify-content-between align-items-center">
    <div className="d-flex align-items-center gap-3">
      <Form.Label className="mb-0 fw-semibold small">Discount</Form.Label>
      <Form.Check
        type="switch"
        id="discount-toggle"
        label={isDiscountOn ? "On" : "Off"}
        checked={isDiscountOn}
        onChange={() => setIsDiscountOn(!isDiscountOn)}
        className="mb-0"
      />
    </div>
    <Button
      size="sm"
      onClick={() => setShowDiscountModal(true)}
      style={{ backgroundColor: "#3daaaa", borderColor: "#3daaaa" }}
    >
      + Add Discount
    </Button>
  </div>
</Col>

      </Row>

      {/* Items Table */}
 {/* Items Table */}
<div className="table-responsive mb-3">
  <table className="table table-bordered align-middle">
    <thead>
      <tr className="table-light">
        <th>Product</th>
        <th>Quantity</th>
        <th>Price</th>
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
            <Form.Control
              placeholder="Enter Product name or Code"
              className="mb-1"
            />
            <Form.Control placeholder="Enter Product description" />
          </td>
          <td>
            <Form.Control type="number" defaultValue={1} />
          </td>
          <td>
            <Form.Control placeholder="Enter Price" />
          </td>
          {isTaxOn && (
            <td>
              <Form.Control placeholder="%" />
            </td>
          )}
          {isTaxOn && <td>0</td>}
          {isDiscountOn && (
            <td>
              <Form.Control placeholder="%" />
            </td>
          )}
          <td>$ 0</td>
          <td>-</td>
        </tr>
      ))}
    </tbody>
  </table>
  <Button
    className="d-flex align-items-center mt-4 mb-2"
    style={{ backgroundColor: "#3daaaa", borderColor: "#3daaaa" }}
    onClick={addRow}
  >
    <BsPlusCircle className="me-1" /> Add Row
  </Button>
</div>


      {/* Payment Terms */}
      <Row className="mb-4">
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

      {/* Totals */}
      <Row className="justify-content-end text-end mb-5">
        <Col md={4}>
          <p>Total Tax: <strong>{isTaxOn ? '$ 0' : '-'}</strong></p>
          <p>Total Discount: <strong>{isDiscountOn ? '$ 0' : '-'}</strong></p>
          <InputGroup className="mb-2">
            <InputGroup.Text>Shipping</InputGroup.Text>
            <Form.Control placeholder="Value" />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Grand Total ($)</InputGroup.Text>
            <Form.Control />
          </InputGroup>
          <Button style={{ backgroundColor: "#3daaaa", borderColor: "#3daaaa" }}>
            Generate Order
          </Button>
        </Col>
      </Row>

      {/* Vendor Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Vendors</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3"><Form.Control type="text" placeholder="Name" /></Form.Group>
            <Form.Group className="mb-3"><Form.Control type="text" placeholder="Phone" /></Form.Group>
            <Form.Group className="mb-3"><Form.Control type="email" placeholder="Email" /></Form.Group>
            <Form.Group className="mb-3"><Form.Control type="text" placeholder="Address" /></Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload Document</Form.Label>
              <Form.Control type="file" name="document" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => setShowModal(false)}>Close</Button>
          <Button style={{ backgroundColor: '#3daaaa', borderColor: "#3daaaa", color: '#fff' }} onClick={() => setShowModal(false)}>ADD</Button>
        </Modal.Footer>
      </Modal>

      {/* Tax Modal */}
      <Modal show={showTaxModal} onHide={() => setShowTaxModal(false)}>
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
              <Button variant="secondary" onClick={() => setShowTaxModal(false)}>Close</Button>
              <Button variant="primary" type="submit" className="ms-2">
                {isEditMode ? "Update" : "Submit"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Discount Modal */}
      <Modal show={showDiscountModal} onHide={() => setShowDiscountModal(false)}>
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
              <Button variant="secondary" onClick={() => setShowDiscountModal(false)}>Close</Button>
              <Button variant="primary" type="submit" className="ms-2">Submit</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NewOrder;
