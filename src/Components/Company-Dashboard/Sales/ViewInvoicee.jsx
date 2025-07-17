import React from 'react';
import { Row, Col, Table, Button, Badge, Dropdown, ButtonGroup } from 'react-bootstrap';
import {
  FaEdit, FaPrint, FaEye, FaMoneyBill, FaPaperPlane,
  FaGlobe, FaExchangeAlt, FaTimes
} from 'react-icons/fa';

const ViewInvoicee = () => {
  return (
    <div className=" mt-4 p-4">
      {/* Action Bar */}
      <Row className="mb-4 ">
        <Col md={8}>
          <div className="d-flex flex-wrap gap-2">
            <Button variant="warning" className="d-flex align-items-center gap-1">
              <FaEdit /> <span>Edit Invoice</span>
            </Button>
            <Button variant="success" className="d-flex align-items-center gap-1">
              <FaMoneyBill /> <span>Receive Payment</span>
            </Button>
            <Button variant="primary" className="d-flex align-items-center gap-1">
              <FaPaperPlane /> <span>Send</span>
            </Button>
            <Button variant="success" className="d-flex align-items-center gap-1">
              <FaPrint /> <span>Print Invoice</span>
            </Button>
            <Button variant="info" className="d-flex align-items-center gap-1">
              <FaGlobe /> <span>Public Preview</span>
            </Button>
            <Button variant="secondary" className="d-flex align-items-center gap-1">
              <FaExchangeAlt /> <span>Change Status</span>
            </Button>
            <Button variant="danger" className="d-flex align-items-center gap-1">
              <FaTimes /> <span>Cancel</span>
            </Button>

            {/* Extra Dropdown Button */}
            <Dropdown as={ButtonGroup}>
              <Button variant="outline-info" className="text-black">Extra</Button>
              <Dropdown.Toggle split variant="outline-info" className="text-black" id="dropdown-split-basic" />
              <Dropdown.Menu>
                <Dropdown.Item href="#">Delivery Note</Dropdown.Item>
                <Dropdown.Item href="#">Proforma Invoice</Dropdown.Item>
                <Dropdown.Item href="#">Copy Invoice</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Col>

        <Col md={4} className="text-md-end mt-3 mt-md-0">
          <h5 className="fw-bold mb-1">Invoice</h5>
          <div>Invoice# INV-1045</div>
          <div>Reference:</div>
          <div className="fw-bold mt-2">Gross Amount: <span className="text-success">$ 10.90</span></div>
        </Col>
      </Row>

      {/* Customer Info */}
      <Row className="mb-4">
        <Col md={6}>
          <strong className="d-block mb-2">Bill To</strong>
          <div><strong className="text-primary">Haroun Spiers</strong></div>
          <div>4 Kings Park</div>
          <div>Zouparia do Monte, Portugal</div>
          <div>Phone: 489-737-5435</div>
          <div>Email: hspiers2g@redcross.org</div>
        </Col>
        <Col md={6} className="text-md-end mt-4 mt-md-0">
          <div><strong>Invoice Date:</strong> 15-07-2025</div>
          <div><strong>Due Date:</strong> 15-07-2025</div>
          <div><strong>Terms:</strong> Payment Due On Receipt</div>
        </Col>
      </Row>

      {/* Item Table */}
      <div className="table-responsive mb-4">
        <Table bordered className="align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Description</th>
              <th>Rate</th>
              <th>Qty</th>
              <th>Tax</th>
              <th>Discount</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Sample Product</td>
              <td>$ 10.00</td>
              <td>1</td>
              <td>$ 1.90 (19.00%)</td>
              <td>$ 1.00 (1.00 flat)</td>
              <td>$ 10.90</td>
            </tr>
          </tbody>
        </Table>
      </div>

      {/* Payment Summary */}
      <Row className="mb-4">
        <Col md={6}>
          <p><strong>Payment Status:</strong> <Badge bg="success">Paid</Badge></p>
          <p><strong>Payment Method:</strong> <u>Cash</u></p>
          <p><strong>Note:</strong></p>
        </Col>
        <Col md={6}>
          <div className="table-responsive">
            <Table borderless className="text-end">
              <tbody>
                <tr><td>Sub Total</td><td>$ 10.00</td></tr>
                <tr><td>TAX</td><td>$ 1.90</td></tr>
                <tr><td>Shipping</td><td>$ 0.00</td></tr>
                <tr className="fw-bold border-top"><td>Total</td><td>$ 10.90</td></tr>
                <tr className="text-danger"><td>Payment Received</td><td>(-) $ 10.90</td></tr>
                <tr className="fw-bold border-top"><td>Balance Due</td><td>$ 0.00</td></tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      {/* Signature */}
      <div className="text-end mt-5 mb-5">
        <div>(John Doe)</div>
        <small>Business Owner</small>
      </div>

      {/* Credit Transactions */}
      <h6 className="mb-3">Credit Transactions:</h6>
      <div className="table-responsive mb-5">
        <Table bordered>
          <thead className="table-light">
            <tr>
              <th>Date</th>
              <th>Method</th>
              <th>Amount</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            <tr><td colSpan={4} className="text-center">No transactions</td></tr>
          </tbody>
        </Table>
      </div>

      {/* Terms */}
      <h6>Terms & Conditions</h6>
      <p className="mb-1 fw-bold">Payment Due On Receipt</p>
      <p className="mb-3">
        1. <strong>Prices And Payment:</strong><br />
        Payments are to be made in U.S. funds. Unless otherwise specified, all invoices are due net 30 days from shipment date.
      </p>

      {/* Public Access */}
      <p className="text-muted small mb-4">
        Public Access URL:<br />
        https://billing.ultimatekode.com/neo/billing/invoice?id=1045&token=XXXXXXX
      </p>

      {/* File Upload */}
      <div className="mt-4 mb-5">
        <label className="fw-bold d-block mb-2">Attachments</label>
        <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-2">
          <Button style={{backgroundColor:"#3daaaa", borderColor:"#3daaaa"}} size="sm">Select files...</Button>
          <input type="file" />
        </div>
        <small className="text-muted">Allowed: gif, jpeg, png, docx, docs, txt, pdf, xls</small>
      </div>
    </div>
  );
};

export default ViewInvoicee;
