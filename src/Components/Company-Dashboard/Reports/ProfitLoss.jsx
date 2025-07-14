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

const defaultData = Array(6).fill({
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
  "$" +
  num.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });

function toCSV(data) {
  const rows = [];
  rows.push(["", ...months]);
  rows.push(["Income", ...Array(months.length).fill("")]);
  rows.push(["Sales", ...data.map((d) => formatUSD(d.income.sales))]);
  rows.push(["Service", ...data.map((d) => formatUSD(d.income.service))]);
  rows.push(["Purchase Return", ...data.map((d) => formatUSD(d.income.purchaseReturn))]);
  rows.push(["Gross Profit", ...data.map((d) => formatUSD(d.income.grossProfit))]);
  rows.push(["Daybook", ...Array(months.length).fill("")]);
  rows.push(["Sales", ...data.map((d) => formatUSD(d.daybook.sales))]);
  rows.push(["Purchase", ...data.map((d) => formatUSD(d.daybook.purchase))]);
  rows.push(["Sales Return", ...data.map((d) => formatUSD(d.daybook.salesReturn))]);
  rows.push(["Total Daybook", ...data.map((d) => formatUSD(d.daybook.totalDaybook))]);
  rows.push(["Net Profit", ...data.map((d) => formatUSD(d.daybook.netProfit))]);
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
        <div style={{ fontWeight: 700, fontSize: 28 }}>Profit / Loss Report</div>
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

        <Card className="">
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
                <thead className="table-light">
                  <tr>
                    <th style={{ background: "#f5f6fa", minWidth: 180 }} className="px-4 py-4"></th>
                    {months.map((m) => (
                      <th
                        key={m}
                        style={{
                          background: "#f5f6fa",
                          textAlign: "center",
                          fontWeight: 600,
                          fontSize: 18,
                        }}
                      >
                        {m}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Income Section */}
                  <tr>
                    <td colSpan={months.length + 1} style={{ fontWeight: 700, background: "#f9f9f9" }} className="px-3 py-3">
                      Income
                    </td>
                  </tr>
                  {["sales", "service", "purchaseReturn", "grossProfit"].map((field) => (
                    <tr key={field}>
                      <td style={{ fontWeight: field === "grossProfit" ? 700 : 400 }}  className="px-3 py-3">
                        {field === "purchaseReturn"
                          ? "Purchase Return"
                          : field === "grossProfit"
                          ? "Gross Profit"
                          : field.charAt(0).toUpperCase() + field.slice(1)}
                      </td>
                      {tableData.map((d, idx) => (
                        <td
                          key={idx}
                          style={{
                            color: "#444",
                            fontWeight: field === "grossProfit" ? 700 : 400,
                          }}
                        >
                          {formatUSD(d.income[field])}
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* Daybook Section */}
                  <tr>
                    <td colSpan={months.length + 1} style={{ fontWeight: 700, background: "#f9f9f9" }} className="px-3 py-3">
                      Daybook
                    </td>
                  </tr>
                  {["sales", "purchase", "salesReturn", "totalDaybook", "netProfit"].map((field) => (
                    <tr key={field}>
                      <td style={{ fontWeight: 700 }} className="px-3 py-3">
                        {field === "salesReturn"
                          ? "Sales Return"
                          : field === "totalDaybook"
                          ? "Total Daybook"
                          : field === "netProfit"
                          ? "Net Profit"
                          : field.charAt(0).toUpperCase() + field.slice(1)}
                      </td>
                      {tableData.map((d, idx) => (
                        <td
                          key={idx}
                          style={{
                            color: "#444",
                            fontWeight: 700,
                          }}
                        >
                          {formatUSD(d.daybook[field])}
                        </td>
                      ))}
                    </tr>
                  ))}
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
