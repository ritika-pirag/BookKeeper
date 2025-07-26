import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";

const VatReport = () => {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  const [filterType, setFilterType] = useState("All");

  const types = ["All", "Outward Supplies", "Inward Supplies", "Adjustments", "Exempt Supplies"];

  const vatEntries = [
    {
      type: "Outward Supplies",
      description: "Sales to GCC customers",
      taxableAmount: 15000,
      vatRate: 5,
      vatAmount: 750,
    },
    {
      type: "Inward Supplies",
      description: "Purchase from GCC vendors",
      taxableAmount: 9000,
      vatRate: 5,
      vatAmount: 450,
    },
    {
      type: "Adjustments",
      description: "Credit note issued",
      taxableAmount: -2000,
      vatRate: 5,
      vatAmount: -100,
    },
    {
      type: "Exempt Supplies",
      description: "Exported goods (zero-rated)",
      taxableAmount: 5000,
      vatRate: 0,
      vatAmount: 0,
    },
  ];

  const filteredRows = vatEntries.filter(
    (e) => filterType === "All" || e.type === filterType
  );

  return (
    <div className="p-4 mt-4">
      <h4 className="fw-bold">GCC VAT Return Report</h4>
      <p className="text-muted mb-4">
        Auto-generated VAT summary.
      </p>

      {/* 🔍 Filter Section */}
      <div className="shadow-sm rounded-4 p-4 mb-4 bg-light">
        <Row className="g-3 align-items-end">
          <Col md={4}>
            <Form.Label className="fw-semibold">Choose Date</Form.Label>
            <DatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => setDateRange(update)}
              isClearable
              className="form-control"
              dateFormat="dd/MM/yyyy"
            />
          </Col>
          <Col md={4}>
            <Form.Label className="fw-semibold">Transaction Type</Form.Label>
            <Form.Select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              {types.map((t, i) => (
                <option key={i}>{t}</option>
              ))}
            </Form.Select>
          </Col>
          <Col md={4}>
            <Button
              variant="" // remove default variant
              style={{
                backgroundColor: "#27b2b6",
                borderColor: "#27b2b6",
                color: "white",
                width: "100%",
              }}
              className="py-2"
            >
              Generate Report
            </Button>
          </Col>
        </Row>
      </div>

      {/* 📊 VAT Table */}
      <Card className="shadow-sm rounded-4 p-4 border-0">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
          <h5 className="fw-bold mb-2 mb-md-0">VAT Summary</h5>
          <div className="d-flex gap-2">
            <Button variant="outline-danger" size="sm"><FaFilePdf /></Button>
            <Button variant="outline-success" size="sm"><FaFileExcel /></Button>
          </div>
        </div>

        <Table hover responsive className="text-nowrap mb-0 align-middle">
          <thead className="bg-light text-dark fw-semibold">
            <tr>
              <th>Type</th>
              <th>Description</th>
              <th>Taxable Amount</th>
              <th>VAT Rate (%)</th>
              <th>VAT Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row, idx) => (
              <tr key={idx}>
                <td>{row.type}</td>
                <td>{row.description}</td>
                <td>${row.taxableAmount.toFixed(2)}</td>
                <td>{row.vatRate}%</td>
                <td>${row.vatAmount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default VatReport;