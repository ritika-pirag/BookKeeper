import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
} from "react-bootstrap";
import DatePicker from "react-datepicker";

const months = [
  "Jan 2025",
  "Feb 2025",
  "Mar 2025",
  "Apr 2025",
  "May 2025",
  "Jun 2025",
];

const defaultData = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
];

const formatUSD = (num) =>
  "$" +
  num.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });

function toCSV(data) {
  // Prepare CSV rows
  const rows = [];
  rows.push(["", ...months]);
  rows.push(["Income", ...Array(months.length).fill("")]);
  rows.push([
    "Sales",
    ...data.map((d) => formatUSD(d.income.sales)),
  ]);
  rows.push([
    "Service",
    ...data.map((d) => formatUSD(d.income.service)),
  ]);
  rows.push([
    "Purchase Return",
    ...data.map((d) => formatUSD(d.income.purchaseReturn)),
  ]);
  rows.push([
    "Gross Profit",
    ...data.map((d) => formatUSD(d.income.grossProfit)),
  ]);
  rows.push(["DayBooknses", ...Array(months.length).fill("")]);
  rows.push([
    "Sales",
    ...data.map((d) => formatUSD(d.daybook.sales)),
  ]);
  rows.push([
    "Purrchase",
    ...data.map((d) => formatUSD(d.daybook.purchase)),
  ]);
  rows.push([
    "Sales Return",
    ...data.map((d) => formatUSD(d.daybook.salesReturn)),
  ]);
  rows.push([
    "Total DayBooknse",
    ...data.map((d) => formatUSD(d.daybook.totalDaybook)),
  ]);
  rows.push([
    "Net Profit",
    ...data.map((d) => formatUSD(d.daybook.netProfit)),
  ]);
  // Convert to CSV string
  return rows.map((r) => r.join(",")).join("\r\n");
}

const ProfitLoss = () => {
  const [startDate, setStartDate] = useState(new Date("2025-07-02"));
  const [endDate, setEndDate] = useState(new Date("2025-07-08"));
  const [tableData] = useState(defaultData);

  const handleDownload = () => {
    const csv = toCSV(tableData);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "profit_loss_report.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div style={{ background: "#f7f7f7", minHeight: "100vh", paddingBottom: 40 }}>
      <Container fluid className="py-4">
        <div style={{ fontWeight: 700, fontSize: 28, marginBottom: 0 }}>
          Profit / Loss Report
        </div>
        <div style={{ color: "#888", fontSize: 17, marginBottom: 24 }}>
          View Reports of Profit / Loss Report
        </div>
        <Row className="mb-3 justify-content-end">
          <Col xs="auto" className="mb-2 mb-md-0">
            <div className="d-flex align-items-center gap-2">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="MM/dd/yyyy"
                className="form-control"
              />
              <span style={{ fontWeight: 600, color: "#888" }}>-</span>
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
            </div>
          </Col>
          <Col xs="auto">
            <Button
              style={{
                background: "#FFA94D",
                border: "none",
                fontWeight: 500,
                padding: "7px 24px",
                fontSize: 16,
              }}
              onClick={handleDownload}
            >
              Download Report
            </Button>
          </Col>
        </Row>
        <Card className="shadow-sm">
          <Card.Body style={{ padding: 0 }}>
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
                    <th style={{ background: "#f5f6fa", minWidth: 180 }}></th>
                    {months.map((m, idx) => (
                      <th
                        key={m}
                        style={{
                          background: "#f5f6fa",
                          textAlign: "center",
                          fontWeight: 600,
                          fontSize: 20,
                        }}
                      >
                        {m}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 700 }}>Income</td>
                    {tableData.map((d, idx) => (
                      <td key={idx}></td>
                    ))}
                  </tr>
                  <tr>
                    <td>Sales</td>
                    {tableData.map((d, idx) => (
                      <td key={idx} style={{ color: "#444" }}>
                        {formatUSD(d.income.sales)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>Service</td>
                    {tableData.map((d, idx) => (
                      <td key={idx} style={{ color: "#444" }}>
                        {formatUSD(d.income.service)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>Purchase Return</td>
                    {tableData.map((d, idx) => (
                      <td key={idx} style={{ color: "#444" }}>
                        {formatUSD(d.income.purchaseReturn)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700 }}>
                      <b>Gross Profit</b>
                    </td>
                    {tableData.map((d, idx) => (
                      <td key={idx} style={{ fontWeight: 700 }}>
                        <b>{formatUSD(d.income.grossProfit)}</b>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700 }}>DayBooknses</td>
                    {tableData.map((d, idx) => (
                      <td key={idx}></td>
                    ))}
                  </tr>
                  <tr>
                    <td>Sales</td>
                    {tableData.map((d, idx) => (
                      <td key={idx} style={{ color: "#444" }}>
                        {formatUSD(d.daybook.sales)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>Purrchase</td>
                    {tableData.map((d, idx) => (
                      <td key={idx} style={{ color: "#444" }}>
                        {formatUSD(d.daybook.purchase)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700 }}>Sales Return</td>
                    {tableData.map((d, idx) => (
                      <td key={idx} style={{ color: "#444" }}>
                        {formatUSD(d.daybook.salesReturn)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700 }}>Total DayBooknse</td>
                    {tableData.map((d, idx) => (
                      <td key={idx} style={{ color: "#444" }}>
                        {formatUSD(d.daybook.totalDaybook)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700 }}>Net Profit</td>
                    {tableData.map((d, idx) => (
                      <td key={idx} style={{ fontWeight: 700 }}>
                        {formatUSD(d.daybook.netProfit)}
                      </td>
                    ))}
                  </tr>
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