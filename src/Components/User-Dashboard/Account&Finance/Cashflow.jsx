import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaFilePdf } from "react-icons/fa";

const cashFlowData = [
  {
    date: "03 Oct 2024",
    bank: "SWIZ - 3354456565687",
    desc: "Cash payments for operating",
    credit: 1100,
    debit: 0,
    accBal: 1100,
    totalBal: 5899,
    method: "Stripe",
  },
  {
    date: "06 Nov 2024",
    bank: "NBC - 4324356677889",
    desc: "Loan received (short-term)",
    credit: 800,
    debit: 0,
    accBal: 800,
    totalBal: 6896,
    method: "Cash",
  },
  {
    date: "10 Dec 2024",
    bank: "SWIZ - 5475878970090",
    desc: "Cash payments to employees",
    credit: 0,
    debit: 1500,
    accBal: 1500,
    totalBal: 9899,
    method: "Paypal",
  },
  {
    date: "10 Sep 2024",
    bank: "IBO - 3434565776768",
    desc: "Cash receipts from sales",
    credit: 1700,
    debit: 0,
    accBal: 1700,
    totalBal: 4568,
    method: "Cash",
  },
  {
    date: "14 Oct 2024",
    bank: "IBO - 3453647664889",
    desc: "Owner’s equity contribution",
    credit: 1300,
    debit: 0,
    accBal: 1300,
    totalBal: 4568,
    method: "Paypal",
  },
  {
    date: "18 Nov 2024",
    bank: "IBO - 4353689870544",
    desc: "Sale of old equipment",
    credit: 1000,
    debit: 1000,
    accBal: 1000,
    totalBal: 1562,
    method: "Paypal",
  },
  {
    date: "20 Sep 2024",
    bank: "SWIZ - 345656576787",
    desc: "Cash payments to suppliers",
    credit: 2300,
    debit: 0,
    accBal: 2300,
    totalBal: 4568,
    method: "Stripe",
  },
  {
    date: "24 Dec 2024",
    bank: "HBSC - 3298784309485",
    desc: "Cash receipts from sales",
    credit: 1000,
    debit: 0,
    accBal: 1000,
    totalBal: 889898,
    method: "Stripe",
  },
];

const paymentMethods = [
  "All",
  ...Array.from(new Set(cashFlowData.map((d) => d.method))),
];

const formatUSD = (num) =>
  "$" + num.toLocaleString("en-US", { minimumFractionDigits: 2 });

const Cashflow = () => {
  const [search, setSearch] = useState("");
  const [method, setMethod] = useState("All");

  const filtered = cashFlowData.filter(
    (row) =>
      (method === "All" || row.method === method) &&
      (row.date.toLowerCase().includes(search.toLowerCase()) ||
        row.bank.toLowerCase().includes(search.toLowerCase()) ||
        row.desc.toLowerCase().includes(search.toLowerCase()) ||
        row.method.toLowerCase().includes(search.toLowerCase()))
  );

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.text("Cash Flow Report", 14, 16);
    doc.autoTable({
      startY: 22,
      head: [
        [
          "Date",
          "Bank & Account Number",
          "Description",
          "Credit",
          "Debit",
          "Account balance",
          "Total Balance",
          "Payment Method",
        ],
      ],
      body: filtered.map((row) => [
        row.date,
        row.bank,
        row.desc,
        formatUSD(row.credit),
        formatUSD(row.debit),
        formatUSD(row.accBal),
        formatUSD(row.totalBal),
        row.method,
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [245, 246, 250], textColor: 60 },
    });
    doc.save("cashflow.pdf");
  };

  return (
    <div style={{ background: "#f7f7f7", minHeight: "100vh", paddingBottom: 40 }}>
      <Container fluid className="py-4">
        <div style={{ fontWeight: 700, fontSize: 28, marginBottom: 0 }}>
          Cash Flow
        </div>
        <div style={{ color: "#888", fontSize: 17, marginBottom: 24 }}>
          View Your Cashflows
        </div>
        <Card className="shadow-sm mb-4">
          <Card.Body style={{ padding: 0 }}>
            <Row className="g-2 align-items-center p-3 pb-0">
              <Col xs={12} md={6} className="mb-2 mb-md-0">
                <InputGroup>
                  <Form.Control
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col xs={8} md={3}>
                <Form.Select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                >
                  {paymentMethods.map((m) => (
                    <option key={m} value={m}>
                      {m === "All" ? "Payment Method" : m}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={4} md={3} className="text-end">
                <Button
                  variant="light"
                  style={{
                    border: "none",
                    background: "#fff",
                    boxShadow: "0 1px 4px #0001",
                  }}
                  onClick={handlePDF}
                  title="Download PDF"
                >
                  <FaFilePdf size={26} color="#ff6f61" />
                </Button>
              </Col>
            </Row>
            <div style={{ overflowX: "auto" }}>
              <Table
                responsive
                className="align-middle mb-0"
                style={{
                  minWidth: 900,
                  fontSize: 16,
                  background: "#fff",
                }}
              >
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Bank & Account Number</th>
                    <th>Description</th>
                    <th>Credit</th>
                    <th>Debit</th>
                    <th>
                      Account balance{" "}
                      <span title="Account balance">ℹ️</span>
                    </th>
                    <th>
                      Total Balance{" "}
                      <span title="Total Balance">ℹ️</span>
                    </th>
                    <th>Payment Method</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.date}</td>
                      <td>{row.bank}</td>
                      <td>{row.desc}</td>
                      <td>{formatUSD(row.credit)}</td>
                      <td>{formatUSD(row.debit)}</td>
                      <td>{formatUSD(row.accBal)}</td>
                      <td>{formatUSD(row.totalBal)}</td>
                      <td>{row.method}</td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={8} className="text-center text-muted">
                        No records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
              <div className="d-flex justify-content-between align-items-center mt-3 px-3 pb-3">
  <span className="small text-muted">
    Showing 1 to {filtered.length} of {filtered.length} results
  </span>
  <nav>
    <ul className="pagination pagination-sm mb-0">
      <li className="page-item disabled">
        <button className="page-link rounded-start">&laquo;</button>
      </li>
      <li className="page-item active">
        <button
          className="page-link"
          style={{ backgroundColor: "#3daaaa", borderColor: "#3daaaa" }}
        >
          1
        </button>
        
      </li>
  
      <li className="page-item disabled">
        <button className="page-link rounded-end">&raquo;</button>
      </li>
    </ul>
  </nav>
</div>

            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Cashflow;