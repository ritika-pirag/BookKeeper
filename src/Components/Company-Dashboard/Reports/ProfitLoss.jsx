import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Form,
} from "react-bootstrap";

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const years = [2025, 2024, 2023, 2022, 2021, 2020];

const defaultData = Array(12).fill({
  income: {
    sales: 50000,
    service: 30000,
    purchaseReturn: 7000,
    grossProfit: 8000,
  },
  daybook: {
    sales: 50000,
    purchase: 30000,
    salesReturn: 7000,
    totalDaybook: 8000,
    netProfit: 8000,
  },
});

const formatUSD = (num) =>
  "$" + num.toLocaleString("en-US", { maximumFractionDigits: 0 });

function toCSV(data, headers) {
  const rows = [];
  rows.push(["", ...headers]);
  rows.push(["Income", ...Array(headers.length).fill("")]);
  rows.push(["Sales", ...data.map((d) => formatUSD(d.income.sales))]);
  rows.push(["Service", ...data.map((d) => formatUSD(d.income.service))]);
  rows.push(["Purchase Return", ...data.map((d) => formatUSD(d.income.purchaseReturn))]);
  rows.push(["Gross Profit", ...data.map((d) => formatUSD(d.income.grossProfit))]);
  rows.push(["Daybook", ...Array(headers.length).fill("")]);
  rows.push(["Sales", ...data.map((d) => formatUSD(d.daybook.sales))]);
  rows.push(["Purchase", ...data.map((d) => formatUSD(d.daybook.purchase))]);
  rows.push(["Sales Return", ...data.map((d) => formatUSD(d.daybook.salesReturn))]);
  rows.push(["Total Daybook", ...data.map((d) => formatUSD(d.daybook.totalDaybook))]);
  rows.push(["Net Profit", ...data.map((d) => formatUSD(d.daybook.netProfit))]);
  return rows.map((r) => r.join(",")).join("\r\n");
}

const ProfitLoss = () => {
  const [mode, setMode] = useState("monthly");
  const [selectedYear, setSelectedYear] = useState(2025);
  const [tableData] = useState(defaultData);

  const headers =
    mode === "monthly"
      ? months.map((m) => `${m} ${selectedYear}`)
      : years.map((y) => `${y}`);

  const handleDownload = () => {
    const csv = toCSV(tableData.slice(0, headers.length), headers);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `profit_loss_${mode}_${selectedYear}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div style={{ background: "#f8f9fb", minHeight: "100vh", paddingBottom: 40 }}>
      <Container fluid className="py-4">
        <h2 className="fw-bold mb-1">Profit / Loss Report</h2>
        <p className="text-muted mb-4 fs-5">
          View reports monthly or yearly with income and daybook breakdown
        </p>

        {/* Filter Controls */}
        <Card className="mb-4">
          <Card.Body>
            <Row className="g-3 align-items-end">
              <Col xs={12} md={4}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Report Type</Form.Label>
                  <Form.Select value={mode} onChange={(e) => setMode(e.target.value)}>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col xs={12} md={4}>
                <Form.Group>
                  <Form.Label className="fw-semibold">
                    {mode === "monthly" ? "Select Year" : "Year Range"}
                  </Form.Label>
                  <Form.Select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  >
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col xs={12} md={4}>
              <Button
  onClick={handleDownload}
  style={{
    backgroundColor: "#28a745",
    borderColor: "#28a745",
    borderRadius: "7px",
    height: "40px" // You can adjust this value as needed
  }}
>
  Download Report
</Button>

              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Table Section */}
        <Card>
          <Card.Body style={{ padding: 0 }}>
            <div style={{ overflowX: "auto" }}>
              <Table responsive bordered hover>
                <thead>
                  <tr>
                    <th></th>
                    {headers.map((h) => (
                      <th key={h} className="text-center fw-bold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Income Section */}
                  <tr>
                    <td colSpan={headers.length + 1} className="fw-bold">Income</td>
                  </tr>
                  {["sales", "service", "purchaseReturn", "grossProfit"].map((field) => (
                    <tr key={field}>
                      <td className="fw-semibold">
                        {field === "purchaseReturn"
                          ? "Purchase Return"
                          : field === "grossProfit"
                          ? "Gross Profit"
                          : field.charAt(0).toUpperCase() + field.slice(1)}
                      </td>
                      {tableData.slice(0, headers.length).map((d, idx) => (
                        <td key={idx} className="text-center">
                          {formatUSD(d.income[field])}
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* Daybook Section */}
                  <tr>
                    <td colSpan={headers.length + 1} className="fw-bold">Daybook</td>
                  </tr>
                  {["sales", "purchase", "salesReturn", "totalDaybook", "netProfit"].map(
                    (field) => (
                      <tr key={field}>
                        <td className="fw-semibold">
                          {field === "salesReturn"
                            ? "Sales Return"
                            : field === "totalDaybook"
                            ? "Total Daybook"
                            : field === "netProfit"
                            ? "Net Profit"
                            : field.charAt(0).toUpperCase() + field.slice(1)}
                        </td>
                        {tableData.slice(0, headers.length).map((d, idx) => (
                          <td key={idx} className="text-center">
                            {formatUSD(d.daybook[field])}
                          </td>
                        ))}
                      </tr>
                    )
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

export default ProfitLoss;
