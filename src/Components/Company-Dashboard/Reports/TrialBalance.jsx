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

const TrialBalance = () => {
const [dateRange, setDateRange] = useState([null, null]);
const [startDate, endDate] = dateRange;
const [filterType, setFilterType] = useState("All");

const types = ["All", "Asset", "Liability", "Expense", "Income", "Equity"];

const trialEntries = [
{
code: "101",
name: "Cash in Hand",
type: "Asset",
opening: 20000,
debit: 30000,
credit: 0,
},
{
code: "201",
name: "Sales",
type: "Income",
opening: 0,
debit: 0,
credit: 50000,
},
{
code: "301",
name: "Purchase",
type: "Expense",
opening: 10000,
debit: 40000,
credit: 0,
},
{
code: "401",
name: "Capital",
type: "Equity",
opening: 30000,
debit: 0,
credit: 0,
},
];

const filteredRows = trialEntries.filter(
(entry) => filterType === "All" || entry.type === filterType
);

const calculateClosing = (entry) => {
return entry.opening + entry.debit - entry.credit;
};

return (
<div className="p-4 mt-4">
<h4 className="fw-bold">Trial Balance Report</h4>
<p className="text-muted mb-4">
Auto-generated accounting summary by account head.
</p>


  {/* Filter UI */}
  <Card className="p-4 mb-4 border-0 rounded-4 shadow-sm">
    <Form>
      <Row className="gy-3 gx-4 align-items-end">
        <Col md={4}>
          <Form.Group controlId="dateRange" className="d-flex flex-column">
            <Form.Label className="fw-semibold mb-2">Choose Date Range</Form.Label>
            <div style={{ zIndex: 1000 }}>
              <DatePicker
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => setDateRange(update)}
                isClearable
                className="form-control rounded-pill"
                dateFormat="dd/MM/yyyy"
                placeholderText="Select date range"
                popperPlacement="bottom-start"
                popperModifiers={[
                  {
                    name: "preventOverflow",
                    options: {
                      boundary: "viewport",
                      rootBoundary: "viewport",
                      padding: 8,
                    },
                  },
                ]}
              />
            </div>
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group controlId="accountType">
            <Form.Label className="fw-semibold mb-2">Account Type</Form.Label>
            <Form.Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="rounded-pill"
            >
              {types.map((t, i) => (
                <option key={i}>{t}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={4} className="d-flex justify-content-md-end justify-content-start">
          <Button
            style={{
              backgroundColor: "#27b2b6",
              borderColor: "#27b2b6",
              color: "white",
              padding: "10px 28px",
              fontWeight: "500",
              borderRadius: "50px",
            }}
            className="w-100 w-md-auto"
          >
            Generate Report
          </Button>
        </Col>
      </Row>
    </Form>
  </Card>

  {/* Trial Balance Table */}
  <Card className="shadow-sm rounded-4 p-4 border-0">
    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
      <h5 className="fw-bold mb-2 mb-md-0">Account Summary</h5>
      <div className="d-flex gap-2">
        <Button variant="outline-danger" size="sm">
          <FaFilePdf />
        </Button>
        <Button variant="outline-success" size="sm">
          <FaFileExcel />
        </Button>
      </div>
    </div>

    <Table hover responsive className="text-nowrap mb-0 align-middle">
      <thead className="bg-light text-dark fw-semibold">
        <tr>
          <th>Account Code</th>
          <th>Account Name</th>
          <th>Type</th>
          <th>Opening Balance</th>
          <th>Debit</th>
          <th>Credit</th>
          <th>Closing Balance</th>
        </tr>
      </thead>
      <tbody>
        {filteredRows.map((row, idx) => (
          <tr key={idx}>
            <td>{row.code}</td>
            <td>{row.name}</td>
            <td>{row.type}</td>
            <td>₹{row.opening.toLocaleString()}</td>
            <td>₹{row.debit.toLocaleString()}</td>
            <td>₹{row.credit.toLocaleString()}</td>
            <td>₹{calculateClosing(row).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Card>
  A trial balance is used in accounting to verify that total debits equal total credits—essentially a checkpoint to ensure the books are mathematically sound before preparing financial statements.
</div>


);
};

export default TrialBalance;