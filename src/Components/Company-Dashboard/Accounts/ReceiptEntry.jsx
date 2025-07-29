import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import { FaEye } from 'react-icons/fa'; 
import html2pdf from "html2pdf.js";
import { useRef } from "react";

const ReceiptEntry = () => {
  const [show, setShow] = useState(false);
  const [receiptData, setReceiptData] = useState([]);
  const [form, setForm] = useState({
    date: "",
    receiptNo: "",
    receivedFrom: "",
    amount: "",
    mode: "Cash",
    invoiceNo: "", 
    reference: "",
    notes: "",
  });

  const [viewModal, setViewModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  useEffect(() => {
    setReceiptData([
      {
        date: "2025-07-25",
        receiptNo: "RCPT001",
        receivedFrom: "ABC Traders",
        amount: "5000",
        mode: "UPI",
        reference: "TXN12345",
        notes: "Advance Payment",
        invoiceNo: "INV-001", // ✅ Added
      },
      {
        date: "2025-07-27",
        receiptNo: "RCPT002",
        receivedFrom: "XYZ Pvt Ltd",
        amount: "12000",
        mode: "Bank",
        reference: "TXN54321",
        notes: "Full Payment",
        invoiceNo: "INV-002", // ✅ Added
      },
    ]);
  }, []);
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setReceiptData([...receiptData, form]);
    setForm({
      date: "",
      receiptNo: "",
      receivedFrom: "",
      amount: "",
      mode: "Cash",
      reference: "",
      notes: "",
    });
    setShow(false);
  };

  const handleView = (receipt) => {
    setSelectedReceipt(receipt);
    setViewModal(true);
  };
  const pdfRef = useRef();

  const handleDownloadPDF = () => {
    if (pdfRef.current) {
      html2pdf()
        .from(pdfRef.current)
        .set({
          margin: 0.5,
          filename: `${selectedReceipt?.receiptNo || "receipt"}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        })
        .save();
    }
  };
  const handleDirectPDF = (receipt) => {
    const tempDiv = document.createElement("div");
    tempDiv.style.padding = "20px";
    tempDiv.innerHTML = `
      <h3 style="text-align:center;">Receipt</h3>
      <p><strong>Date:</strong> ${receipt.date}</p>
      <p><strong>Receipt No:</strong> ${receipt.receiptNo}</p>
      <p><strong>Customer Name:</strong> ${receipt.receivedFrom}</p>
      <p><strong>Invoice No:</strong> ${receipt.invoiceNo || "-"}</p>
      <p><strong>Amount:</strong> ₹${receipt.amount}</p>
      <p><strong>Mode:</strong> ${receipt.mode}</p>
      <p><strong>Reference:</strong> ${receipt.reference}</p>
      <p><strong>Notes:</strong> ${receipt.notes}</p>
    `;
  
    html2pdf().from(tempDiv).set({
      margin: 0.5,
      filename: `${receipt.receiptNo || "receipt"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    }).save();
  };
  
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Receipt Entry</h4>
        <Button variant="success" onClick={() => setShow(true)}    style={{
            backgroundColor: "#53b2a5",
            border: "none",
            display: "flex",
            alignItems: "center",
          }}>
          + Add Receipt
        </Button>
      </div>

  








      <div className="card bg-white rounded-3 p-3">
  <div className="table-responsive">
    <Table className="table table-hover table-bordered align-middle mb-0">
      <thead className="table-light border">
        <tr>
          <th>Date</th>
          <th>Receipt No</th>
          <th>Received From</th>
          <th>Amount</th>
          <th>Mode</th>
          <th>Reference</th>
          <th>Notes</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {receiptData.map((item, idx) => (
          <tr key={idx}>
            <td>{item.date}</td>
            <td>{item.receiptNo}</td>
            <td>{item.receivedFrom}</td>
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















      {/* Add Receipt Modal */}
{/* Add Receipt Modal */}
<Modal show={show} onHide={() => setShow(false)} 
  
  size="lg">
  <Modal.Header closeButton>
    <Modal.Title>Add Receipt</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group className="mb-2">
        <Form.Label>Receipt Date</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Receipt Number</Form.Label>
        <Form.Control
          type="text"
          name="receiptNo"
          value={form.receiptNo}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Customer Name</Form.Label>
        <Form.Select
          name="receivedFrom"
          value={form.receivedFrom}
          onChange={handleChange}
        >
          <option value="">Select Customer</option>
          <option value="Customer A">Customer A</option>
          <option value="Customer B">Customer B</option>
          {/* Map customer list dynamically */}
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
          <option value="INV-001">INV-001</option>
          <option value="INV-002">INV-002</option>
          {/* Map invoice list dynamically */}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Amount Received</Form.Label>
        <Form.Control
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Payment Mode</Form.Label>
        <Form.Select
          name="mode"
          value={form.mode}
          onChange={handleChange}
        >
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
    <Button variant="primary" onClick={handleSubmit}    style={{
            backgroundColor: "#53b2a5",
            border: "none",
            display: "flex",
            alignItems: "center",
          }}>
      Save
    </Button>
  </Modal.Footer>
</Modal>


      {/* View Modal */}
      <Modal show={viewModal} onHide={() => setViewModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Receipt Details</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedReceipt && (
      <div ref={pdfRef}>
        <h5 className="text-center mb-3">Receipt</h5>
        <p><strong>Date:</strong> {selectedReceipt.date}</p>
        <p><strong>Receipt No:</strong> {selectedReceipt.receiptNo}</p>
        <p><strong>Customer Name:</strong> {selectedReceipt.receivedFrom}</p>
        <p><strong>Invoice No:</strong> {selectedReceipt.invoiceNo || "-"}</p>
        <p><strong>Amount:</strong> ₹{selectedReceipt.amount}</p>
        <p><strong>Mode:</strong> {selectedReceipt.mode}</p>
        <p><strong>Reference:</strong> {selectedReceipt.reference}</p>
        <p><strong>Notes:</strong> {selectedReceipt.notes}</p>
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

export default ReceiptEntry;
