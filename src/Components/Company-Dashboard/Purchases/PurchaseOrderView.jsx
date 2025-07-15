import React from 'react';
import { Row, Col, Table, Button, Badge } from 'react-bootstrap';
import {
  FaEdit, FaPrint, FaEye, FaMoneyBill, FaPaperPlane,
  FaGlobe, FaExchangeAlt, FaTimes
} from 'react-icons/fa';

const PurchaseOrderView = () => {
  return (
    <div className="container py-4">
      {/* Action Bar */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div className="d-flex flex-wrap gap-2">
          <Button variant="warning"><FaEdit className="me-1" /> Edit Order</Button>
          <Button variant="success"><FaMoneyBill className="me-1" /> Make Payment</Button>
          <Button variant="primary"><FaPaperPlane className="me-1" /> Send</Button>
          <Button variant="success"><FaPrint className="me-1" /> Print Order</Button>
          <Button variant="info"><FaGlobe className="me-1" /> Public Preview</Button>
          <Button variant="secondary"><FaExchangeAlt className="me-1" /> Change Status</Button>
          <Button variant="danger"><FaTimes className="me-1" /> Cancel</Button>
        </div>
        <div className="text-md-end">
          <h5 className="fw-bold mb-1">Purchase Order</h5>
          <div>PO#1045</div>
          <div>Reference:</div>
          <div className="fw-bold mt-2">Gross Amount: <span className="text-success">$ 10.90</span></div>
        </div>
      </div>

      {/* Supplier Info */}
      <Row className="mb-4">
        <Col md={6}>
          <strong>Bill From</strong>
          <div><strong>Haroun Spiers</strong></div>
          <div>4 Kings Park</div>
          <div>Zouparia do Monte, Portugal</div>
          <div>Phone: 489-737-5435</div>
          <div>Email: hspiers2g@redcross.org</div>
        </Col>
        <Col md={6} className="text-md-end mt-3 mt-md-0">
          <div>Order Date: 15-07-2025</div>
          <div>Due Date: 15-07-2025</div>
          <div>Terms: Payment Due On Receipt</div>
        </Col>
      </Row>

      {/* Item Table */}
      <div className="table-responsive mb-4">
        <Table bordered>
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
              <td>kjlkj:</td>
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
      <Row>
        <Col md={6}>
          <p><strong>Payment Status:</strong> <Badge bg="success">Paid</Badge></p>
          <p><strong>Payment Method:</strong> <a href="#">Cash</a></p>
          <p><strong>Note:</strong></p>
        </Col>
        <Col md={6}>
          <div className="table-responsive">
            <Table borderless className="text-end">
              <tbody>
                <tr>
                  <td>Sub Total</td>
                  <td>$ 10.00</td>
                </tr>
                <tr>
                  <td>TAX</td>
                  <td>$ 1.90</td>
                </tr>
                <tr>
                  <td>Shipping</td>
                  <td>$ 0.00</td>
                </tr>
                <tr className="fw-bold border-top">
                  <td>Total</td>
                  <td>$ 10.90</td>
                </tr>
                <tr className="text-danger">
                  <td>Payment Made</td>
                  <td>(-) $ 10.90</td>
                </tr>
                <tr className="fw-bold border-top">
                  <td>Balance Due</td>
                  <td>$ 0.00</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      {/* Authorized Signature */}
      <div className="text-end mt-5">
        <img src="https://i.ibb.co/Y0jXv9s/signature.png" alt="signature" height="40" />
        <div>(John Doe)</div>
        <small>Business Owner</small>
      </div>

      {/* Debit Transactions */}
      <h6 className="mt-5">Debit Transactions:</h6>
      <div className="table-responsive">
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

      {/* Terms & Conditions */}
      <h6>Terms & Condition</h6>
      <p className="mb-1 fw-bold">Payment Due On Receipt</p>
      <p className="mb-2">
        1. <strong>Prices And Payment</strong><br />
        Payments are to be made in U.S. funds. Unless otherwise specified all invoices are due net 30 days from date of shipment.
      </p>

      {/* Public Access */}
      <p className="text-muted small">
        Public Access URL:<br />
        https://billing.ultimatekode.com/neo/billing/purchase?id=1045&token=XXXXXXX
      </p>

      {/* File Upload */}
      <div className="mt-4">
        <label className="fw-bold">Files</label>
        <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-2">
          <Button variant="success" size="sm">Select files...</Button>
          <input type="file" />
        </div>
        <small className="text-muted">Allowed: gif, jpeg, png, docx, docs, txt, pdf, xls</small>
      </div>
    </div>
  );
};

export default PurchaseOrderView;
