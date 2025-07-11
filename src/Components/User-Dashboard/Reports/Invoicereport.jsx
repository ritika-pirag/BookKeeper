import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import { FaFilePdf, FaFileExcel, FaPrint, FaChartBar, FaCheckCircle, FaUserAlt, FaExclamationCircle } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";

const summary = [
  {
    label: "Total Amount",
    value: "$4,56,000",
    icon: <FaChartBar size={28} color="#27ae60" />,
    color: "#27ae60",
    bg: "#eafaf1",
    border: "#27ae60",
  },
  {
    label: "Total Paid",
    value: "$2,56,42",
    icon: <FaCheckCircle size={28} color="#2563eb" />,
    color: "#2563eb",
    bg: "#eaf1fd",
    border: "#2563eb",
  },
  {
    label: "Total Unpaid",
    value: "$1,52,45",
    icon: <FaUserAlt size={28} color="#ff6600" />,
    color: "#ff6600",
    bg: "#fff4ec",
    border: "#ff6600",
  },
  {
    label: "Overdue",
    value: "$2,56,12",
    icon: <FaExclamationCircle size={28} color="#ff1a1a" />,
    color: "#fff",
    bg: "#ffebeb",
    border: "#ff1a1a",
    text: "#ff1a1a",
    iconBg: "#ff1a1a",
  },
];

const invoiceData = [
  {
    no: "INV001",
    customer: "Carl Evans",
    due: "24 Dec 2024",
    amount: "$500",
    paid: "$500",
    dueAmount: "$500",
    status: "Paid",
  },
  {
    no: "INV002",
    customer: "Minerva Rameriz",
    due: "10 Dec 2024",
    amount: "$1500",
    paid: "$1500",
    dueAmount: "$1500",
    status: "Paid",
  },
  {
    no: "INV003",
    customer: "Robert Lamon",
    due: "27 Nov 2024",
    amount: "$600",
    paid: "$600",
    dueAmount: "$600",
    status: "Unpaid",
  },
  {
    no: "INV004",
    customer: "Patricia Lewis",
    due: "18 Nov 2024",
    amount: "$1000",
    paid: "$1000",
    dueAmount: "$1000",
    status: "Paid",
  },
];

const customers = ["All", ...Array.from(new Set(invoiceData.map(i => i.customer)))];
const statuses = ["All", ...Array.from(new Set(invoiceData.map(i => i.status)))];

const Invoicereport = () => {
  const [startDate, setStartDate] = useState(new Date("2025-07-03"));
  const [endDate, setEndDate] = useState(new Date("2025-07-09"));
  const [customer, setCustomer] = useState("All");
  const [status, setStatus] = useState("All");

  // Filtered data (for demo, always shows all)
  const filtered = invoiceData.filter(
    row =>
      (customer === "All" || row.customer === customer) &&
      (status === "All" || row.status === status)
  );

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.text("Invoice Report", 14, 16);
    doc.autoTable({
      startY: 22,
      head: [["Invoice No", "Customer", "Due Date", "Amount", "Paid", "Amount Due", "Status"]],
      body: filtered.map(row => [
        row.no,
        row.customer,
        row.due,
        row.amount,
        row.paid,
        row.dueAmount,
        row.status,
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [245, 246, 250], textColor: 60 },
    });
    doc.save("invoice_report.pdf");
  };

  return (
    <div style={{ background: "#f7f7f7", minHeight: "100vh", paddingBottom: 40 }}>
      <Container fluid className="py-4">
        <div style={{ fontWeight: 700, fontSize: 28, marginBottom: 0 }}>
          Invoice Report
        </div>
        <div style={{ color: "#888", fontSize: 17, marginBottom: 24 }}>
          Manage Your Invoice Report
        </div>
        <Row className="mb-4 g-3">
          {summary.map((s, idx) => (
            <Col key={s.label} xs={12} md={3}>
              <Card
                className="h-100"
                style={{
                  border: `2px solid ${s.border}`,
                  borderRadius: 12,
                  background: s.bg,
                  boxShadow: "none",
                  marginBottom: 12,
                }}
              >
                <Card.Body className="d-flex align-items-center gap-3">
                  <div
                    style={{
                      background: s.iconBg || "#fff",
                      borderRadius: 10,
                      width: 48,
                      height: 48,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {s.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        color: "#888",
                        fontWeight: 500,
                        fontSize: 17,
                        marginBottom: 2,
                      }}
                    >
                      {s.label}
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 28,
                        color: s.text || s.color,
                      }}
                    >
                      {s.value}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Card className="mb-4" style={{ borderRadius: 14 }}>
          <Card.Body style={{ background: "#fff", borderRadius: 14 }}>
            <Row className="align-items-end g-3">
              <Col xs={12} md={4}>
                <Form.Label style={{ color: "#888", fontWeight: 500 }}>
                  Choose Date
                </Form.Label>
                <InputGroup>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="MM/dd/yyyy"
                    className="form-control"
                  />
                  <span
                    style={{
                      fontWeight: 600,
                      color: "#888",
                      background: "#f7f7f7",
                      border: "1px solid #dee2e6",
                      padding: "0 8px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    -
                  </span>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    dateFormat="MM/dd/yyyy"
                    className="form-control"
                  />
                </InputGroup>
              </Col>
              <Col xs={12} md={4}>
                <Form.Label style={{ color: "#888", fontWeight: 500 }}>
                  Customer
                </Form.Label>
                <Form.Select
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                >
                  {customers.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={12} md={3}>
                <Form.Label style={{ color: "#888", fontWeight: 500 }}>
                  Status
                </Form.Label>
                <Form.Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {statuses.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={12} md={1} className="d-flex align-items-end">
                <Button
                  style={{
                    background: "#FFA94D",
                    border: "none",
                    fontWeight: 500,
                    fontSize: 17,
                    width: "100%",
                  }}
                >
                  Generate Report
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card style={{ borderRadius: 14 }}>
          <Card.Body style={{ background: "#fff", borderRadius: 14 }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div style={{ fontWeight: 700, fontSize: 22 }}>Invoice Report</div>
              <div className="d-flex gap-2">
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
                  <FaFilePdf size={22} color="#ff6f61" />
                </Button>
                <Button
                  variant="light"
                  style={{
                    border: "none",
                    background: "#fff",
                    boxShadow: "0 1px 4px #0001",
                  }}
                  title="Download Excel"
                  disabled
                >
                  <FaFileExcel size={22} color="#27ae60" />
                </Button>
                <Button
                  variant="light"
                  style={{
                    border: "none",
                    background: "#fff",
                    boxShadow: "0 1px 4px #0001",
                  }}
                  title="Print"
                  disabled
                >
                  <FaPrint size={22} color="#2563eb" />
                </Button>
              </div>
            </div>
            <div style={{ overflowX: "auto" }}>
              <Table
                responsive
                className="align-middle mb-0"
                style={{
                  minWidth: 900,
                  fontSize: 17,
                  background: "#fff",
                }}
              >
                <thead>
                  <tr>
                    <th>
                      <Form.Check type="checkbox" />
                    </th>
                    <th>Invoice No</th>
                    <th>Customer</th>
                    <th>Due Date</th>
                    <th>Amount</th>
                    <th>Paid</th>
                    <th>Amount Due</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row, idx) => (
                    <tr key={row.no + idx}>
                      <td>
                        <Form.Check type="checkbox" />
                      </td>
                      <td>{row.no}</td>
                      <td>{row.customer}</td>
                      <td>{row.due}</td>
                      <td>{row.amount}</td>
                      <td>{row.paid}</td>
                      <td>{row.dueAmount}</td>
                      <td>
                        <span
                          style={{
                            background: "#eafaf1",
                            color: "#27ae60",
                            fontWeight: 600,
                            borderRadius: 8,
                            padding: "3px 18px",
                            fontSize: 15,
                            display: "inline-block",
                          }}
                        >
                          ● {row.status}
                        </span>
                      </td>
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
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Invoicereport;