import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Taxreport = () => {
  const [activeTab, setActiveTab] = useState("purchase");
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;

  const stores = ["All", "Volt Vault", "Electro Mart", "Urban Mart", "Quantum Gadgets", "Prime Mart", "Elite Retail"];
  const suppliers = ["All", "A-Z Store", "Apex Computers", "Sigma Chairs", "Beats Headphones", "Aesthetic Bags", "Hatimi Hardwares"];
  const customers = ["All", "Mark Joslyn", "Carl Evans", "Richard Fralick", "Minerva Rameriz", "Daniel Jude", "Marsha Betts"];
  const payments = ["All", "Cash", "Stripe", "Paypal"];

  const purchaseData = [
    ["#4237022", "A-Z Store", "06 Nov 2024", "Volt Vault", "$700", "Cash", "$700", "$700"],
    ["#4237300", "Apex Computers", "24 Dec 2024", "Electro Mart", "$200", "Stripe", "$200", "$200"],
    ["#7590321", "Sigma Chairs", "20 Sep 2024", "Urban Mart", "$450", "Stripe", "$450", "$450"],
    ["#7590325", "Beats Headphones", "10 Dec 2024", "Quantum Gadgets", "$50", "Paypal", "$50", "$50"],
    ["#7590365", "Aesthetic Bags", "14 Oct 2024", "Prime Mart", "$1200", "Paypal", "$1200", "$1200"],
    ["#8744439", "Hatimi Hardwares", "25 Oct 2024", "Elite Retail", "$1000", "Cash", "$1000", "$1000"],
  ];

  const salesData = [
    ["#4237022", "Mark Joslyn", "06 Nov 2024", "Volt Vault", "$700", "Cash", "$700", "$700"],
    ["#4237300", "Carl Evans", "24 Dec 2024", "Electro Mart", "$200", "Stripe", "$200", "$200"],
    ["#7590321", "Richard Fralick", "20 Sep 2024", "Urban Mart", "$450", "Stripe", "$450", "$450"],
    ["#7590325", "Minerva Rameriz", "10 Dec 2024", "Quantum Gadgets", "$50", "Paypal", "$50", "$50"],
    ["#7590365", "Daniel Jude", "14 Oct 2024", "Prime Mart", "$1200", "Paypal", "$1200", "$1200"],
    ["#8744439", "Marsha Betts", "25 Oct 2024", "Elite Retail", "$1000", "Cash", "$1000", "$1000"],
  ];

  const renderFilterSection = (type) => (
    <Card className="shadow-sm p-4 rounded-4 mb-4 border-0">
      <Row className="g-4">
        <Col md={3}>
          <Form.Label className="fw-semibold">Choose Date</Form.Label>
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => setDateRange(update)}
            isClearable={true}
            className="form-control"
            dateFormat="dd/MM/yyyy"
          />
        </Col>
        <Col md={3}>
          <Form.Label className="fw-semibold">Store</Form.Label>
          <Form.Select>
            {stores.map((store, i) => (
              <option key={i}>{store}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Label className="fw-semibold">{type === "purchase" ? "Supplier" : "Customer"}</Form.Label>
          <Form.Select>
            {(type === "purchase" ? suppliers : customers).map((name, i) => (
              <option key={i}>{name}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Label className="fw-semibold">Payment Method</Form.Label>
          <Form.Select>
            {payments.map((p, i) => (
              <option key={i}>{p}</option>
            ))}
          </Form.Select>
        </Col>
    <Col md={1} className="d-flex align-items-start">
      
        </Col>
      </Row>
    </Card>
  );

  const renderTable = (type) => (
    <Card className="shadow-sm rounded-4 p-4 border-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">
          {type === "purchase" ? "Purchase Tax Report" : "Sales Tax Report"}
        </h5>
        <div className="d-flex gap-2">
          <Button variant="outline-danger" size="sm">
            <FaFilePdf />
          </Button>
          <Button variant="outline-success" size="sm">
            <FaFileExcel />
          </Button>
        </div>
      </div>
      <Table hover responsive className="mb-0">
        <thead className="bg-light text-dark fw-semibold">
          <tr>
            <th>Reference</th>
            <th>{type === "purchase" ? "Supplier" : "Customer"}</th>
            <th>Date</th>
            <th>Store</th>
            <th>Amount</th>
            <th>Payment Method</th>
            <th>Discount</th>
            <th>Tax Amount</th>
          </tr>
        </thead>
        <tbody>
          {(type === "purchase" ? purchaseData : salesData).map((row, idx) => (
            <tr key={idx}>
              {row.map((cell, i) => (
                <td key={i}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Pagination */}
<div className="d-flex justify-content-between align-items-center mt-3 px-3">
  <span className="small text-muted">
    Showing 1 to 6 of 6 results
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
      <li className="page-item">
        <button className="page-link">2</button>
      </li>
      <li className="page-item">
        <button className="page-link rounded-end">&raquo;</button>
      </li>
    </ul>
  </nav>
</div>

    </Card>
  );

  return (
    <div className="container mt-4">
      <div className="d-flex gap-2 mb-3">
        <Button
          variant={activeTab === "purchase" ? "warning" : "outline-secondary"}
          onClick={() => setActiveTab("purchase")}
        >
          Purchase Tax
        </Button>
        <Button
          variant={activeTab === "sales" ? "warning" : "outline-secondary"}
          onClick={() => setActiveTab("sales")}
        >
          Sales Tax
        </Button>
      </div>

      <h4 className="fw-bold text-capitalize">
        {activeTab === "purchase" ? "Purchase Tax" : "Sales Tax"}
      </h4>
      <div className="text-muted mb-4">
        View Reports of {activeTab === "purchase" ? "Purchase Tax" : "Sales Tax"}
      </div>

      {renderFilterSection(activeTab)}
      {renderTable(activeTab)}
    </div>
  );
};

export default Taxreport;
