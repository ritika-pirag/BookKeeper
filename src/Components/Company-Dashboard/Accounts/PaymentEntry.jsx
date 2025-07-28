import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import html2pdf from "html2pdf.js";
import { useRef } from "react";

const PaymentEntry = () => {
  const [show, setShow] = useState(false);
  const [paymentData, setPaymentData] = useState([]);
  const [form, setForm] = useState({
    date: "",
    paymentNo: "",
    paidTo: "",
    amount: "",
    mode: "Cash",
    invoiceNo: "",
    reference: "",
    notes: "",
  });

  const [viewModal, setViewModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    setPaymentData([
      {
        date: "2025-07-20",
        paymentNo: "PMT001",
        paidTo: "Shree Suppliers",
        amount: "8000",
        mode: "Bank",
        reference: "CHQ78901",
        notes: "Partial payment",
        invoiceNo: "PUR-001",
      },
      {
        date: "2025-07-22",
        paymentNo: "PMT002",
        paidTo: "MNO Agencies",
        amount: "15000",
        mode: "UPI",
        reference: "UPI-556688",
        notes: "Full Settlement",
        invoiceNo: "PUR-003",
      },
    ]);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setPaymentData([...paymentData, form]);
    setForm({
      date: "",
      paymentNo: "",
      paidTo: "",
      amount: "",
      mode: "Cash",
      invoiceNo: "",
      reference: "",
      notes: "",
    });
    setShow(false);
  };

  const handleView = (payment) => {
    setSelectedPayment(payment);
    setViewModal(true);
  };
  const pdfRef = useRef();

  const handleDownloadPDF = () => {
    if (pdfRef.current) {
      const element = pdfRef.current;
      html2pdf()
        .from(element)
        .set({
          margin: 0.5,
          filename: `${selectedPayment?.paymentNo || "payment"}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        })
        .save();
    }
  };
  const handleDirectPDF = (payment) => {
    const dummyContainer = document.createElement("div");
    dummyContainer.style.position = "absolute";
    dummyContainer.style.left = "-9999px";
    dummyContainer.innerHTML = `
      <div style="padding:20px; font-family:Arial; width:210mm;">
        <h3 style="text-align:center;">Payment Receipt</h3>
        <hr />
        <p><strong>Date:</strong> ${payment.date}</p>
        <p><strong>Payment No:</strong> ${payment.paymentNo}</p>
        <p><strong>Vendor:</strong> ${payment.paidTo}</p>
        <p><strong>Invoice No:</strong> ${payment.invoiceNo || "-"}</p>
        <p><strong>Amount:</strong> ₹${payment.amount}</p>
        <p><strong>Mode:</strong> ${payment.mode}</p>
        <p><strong>Reference:</strong> ${payment.reference}</p>
        <p><strong>Notes:</strong> ${payment.notes}</p>
      </div>
    `;
    document.body.appendChild(dummyContainer);
  
    html2pdf()
      .from(dummyContainer)
      .set({
        margin: 0.5,
        filename: `${payment.paymentNo}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      })
      .save()
      .then(() => {
        document.body.removeChild(dummyContainer);
      });
  };
  
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Payment Entry</h4>
        <Button
          variant="success"
          onClick={() => setShow(true)}
          style={{
            backgroundColor: "#53b2a5",
            border: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          + Add Payment
        </Button>
      </div>

      <div className="card bg-white rounded-3 p-3">
        <div className="table-responsive">
          <Table className="table table-hover table-bordered align-middle mb-0">
            <thead className="table-light border">
              <tr>
                <th>Date</th>
                <th>Payment No</th>
                <th>Paid To</th>
                <th>Amount</th>
                <th>Mode</th>
                <th>Reference</th>
                <th>Notes</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paymentData.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.date}</td>
                  <td>{item.paymentNo}</td>
                  <td>{item.paidTo}</td>
                  <td>₹{item.amount}</td>
                  <td>{item.mode}</td>
                  <td>{item.reference}</td>
                  <td>{item.notes}</td>
                  <td className="d-flex gap-2">
  <Button
    variant="link"
    size="sm"
    onClick={() => handleView(item)}
    className="text-info p-0"
    title="View"
  >
    <FaEye size={18} />
  </Button>

  <Button
    variant="link"
    size="sm"
    onClick={() => handleDirectPDF(item)}
    className="text-danger p-0"
    title="Download PDF"
  >
    📄
  </Button>
</td>

                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Add Payment Modal */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Payment Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Payment Number</Form.Label>
              <Form.Control
                type="text"
                name="paymentNo"
                value={form.paymentNo}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Vendor Name</Form.Label>
              <Form.Select
                name="paidTo"
                value={form.paidTo}
                onChange={handleChange}
              >
                <option value="">Select Vendor</option>
                <option value="Shree Suppliers">Shree Suppliers</option>
                <option value="MNO Agencies">MNO Agencies</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Invoice No (optional)</Form.Label>
              <Form.Select
                name="invoiceNo"
                value={form.invoiceNo}
                onChange={handleChange}
              >
                <option value="">Select Invoice</option>
                <option value="PUR-001">PUR-001</option>
                <option value="PUR-003">PUR-003</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Amount Paid</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Payment Mode</Form.Label>
              <Form.Select name="mode" value={form.mode} onChange={handleChange}>
                <option value="Cash">Cash</option>
                <option value="Bank">Bank</option>
                <option value="UPI">UPI</option>
                <option value="Cheque">Cheque</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Reference No.</Form.Label>
              <Form.Control
                type="text"
                name="reference"
                value={form.reference}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Narration / Note</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="notes"
                value={form.notes}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            style={{
              backgroundColor: "#53b2a5",
              border: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* View Modal */}
      <Modal show={viewModal} onHide={() => setViewModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Payment Details</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedPayment && (
      <div ref={pdfRef}>
        <h5 className="text-center mb-3">Payment Receipt</h5>
        <p><strong>Date:</strong> {selectedPayment.date}</p>
        <p><strong>Payment No:</strong> {selectedPayment.paymentNo}</p>
        <p><strong>Vendor:</strong> {selectedPayment.paidTo}</p>
        <p><strong>Invoice No:</strong> {selectedPayment.invoiceNo || "-"}</p>
        <p><strong>Amount:</strong> ₹{selectedPayment.amount}</p>
        <p><strong>Mode:</strong> {selectedPayment.mode}</p>
        <p><strong>Reference:</strong> {selectedPayment.reference}</p>
        <p><strong>Notes:</strong> {selectedPayment.notes}</p>
      </div>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button
      variant="secondary"
      onClick={() => setViewModal(false)}
      style={{
        backgroundColor: "#53b2a5",
        border: "none",
        display: "flex",
        alignItems: "center",
      }}
    >
      Close
    </Button>

    <Button
      variant="outline-primary"
      onClick={handleDownloadPDF}
      style={{ display: "flex", alignItems: "center" }}
    >
      Download PDF
    </Button>
  </Modal.Footer>
</Modal>

    </div>
  );
};

export default PaymentEntry;
