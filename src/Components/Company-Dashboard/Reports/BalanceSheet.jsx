import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const BalanceSheet = () => (
  <div style={{ background: "#f0f2f5", minHeight: "100vh", paddingBottom: 40 }}>
    <Container fluid className="py-4">
      <div className="text-center mb-2" style={{ fontSize: 36, color: "#002d4d", fontWeight: 500 }}>
        Balance Sheet
      </div>
      <div className="text-center mb-4" style={{ color: "#6c757d", fontSize: 18 }}>
        As on 8 July 2025
      </div>

      <Row className="g-4 justify-content-center">
        {/* Assets */}
        <Col xs={12} md={6}>
          <Card style={{ borderRadius: 12, backgroundColor: "#fff", border: "1px solid #dee2e6" }}>
            <Card.Body>
              <div className="mb-3" style={{ fontWeight: 500, fontSize: 24 }}>
                ASSETS
              </div>

              <div style={{ color: "#002d4d", fontWeight: 400, fontSize: 16, marginBottom: 8 }}>
                Current Assets
              </div>
              {[
                ["Cash", "$75,000"],
                ["Bank", "$245,000"],
                ["Stock", "$320,000"],
                ["Accounts Receivable", "$185,000"],
                ["Total Current Assets", "$825,000", true],
              ].map(([label, value, isTotal], idx) => (
                <Row className="mb-2" key={idx}>
                  <Col xs={7} style={{ fontSize: 16, fontWeight: isTotal ? 600 : 500, color: isTotal ? "#000" : "#6c757d" }}>{label}</Col>
                  <Col xs={5} className="text-end" style={{ fontSize: 16, fontWeight: isTotal ? 600 : 500 }}>{value}</Col>
                </Row>
              ))}

              <div style={{ color: "#002d4d", fontWeight: 500, fontSize: 16, marginTop: 24, marginBottom: 8 }}>
                Fixed Assets
              </div>
              {[
                ["Land & Building", "$1,250,000"],
                ["Plant & Machinery", "$875,000"],
                ["Furniture & Fixtures", "$150,000"],
                ["Total Fixed Assets", "$2,275,000", true],
              ].map(([label, value, isTotal], idx) => (
                <Row className="mb-2" key={idx}>
                  <Col xs={7} style={{ fontSize: 16, fontWeight: isTotal ? 600 : 500, color: isTotal ? "#000" : "#6c757d" }}>{label}</Col>
                  <Col xs={5} className="text-end" style={{ fontSize: 16, fontWeight: isTotal ? 600 : 500 }}>{value}</Col>
                </Row>
              ))}

              <hr className="my-3" />
              <Row>
                <Col xs={7} style={{ fontWeight: 600, fontSize: 18 }}>Total Assets</Col>
                <Col xs={5} className="text-end" style={{ fontWeight: 600, fontSize: 18 }}>$3,100,000</Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* Liabilities & Capital */}
        <Col xs={12} md={6}>
          <Card style={{ borderRadius: 12, backgroundColor: "#fff", border: "1px solid #dee2e6" }}>
            <Card.Body>
              <div className="mb-3" style={{ fontWeight: 500, fontSize: 24 }}>
                LIABILITIES & CAPITAL
              </div>

              <div style={{ color: "#002d4d", fontWeight: 500, fontSize: 16, marginBottom: 8 }}>
                Current Liabilities
              </div>
              {[
                ["Accounts Payable", "$235,000"],
                ["Short-term Loans", "$125,000"],
                ["Outstanding Expenses", "$45,000"],
                ["Total Current Liabilities", "$405,000", true],
              ].map(([label, value, isTotal], idx) => (
                <Row className="mb-2" key={idx}>
                  <Col xs={7} style={{ fontSize: 16, fontWeight: isTotal ? 600 : 500, color: isTotal ? "#000" : "#6c757d" }}>{label}</Col>
                  <Col xs={5} className="text-end" style={{ fontSize: 16, fontWeight: isTotal ? 600 : 500 }}>{value}</Col>
                </Row>
              ))}

              <div style={{ color: "#002d4d", fontWeight: 600, fontSize: 16, marginTop: 24, marginBottom: 8 }}>
                Long-term Liabilities
              </div>
              {[
                ["Term Loan", "$750,000"],
                ["Mortgage Loan", "$425,000"],
                ["Total Long-term Liabilities", "$1,175,000", true],
              ].map(([label, value, isTotal], idx) => (
                <Row className="mb-2" key={idx}>
                  <Col xs={7} style={{ fontSize: 16, fontWeight: isTotal ? 600 : 500, color: isTotal ? "#000" : "#6c757d" }}>{label}</Col>
                  <Col xs={5} className="text-end" style={{ fontSize: 16, fontWeight: isTotal ? 600 : 500 }}>{value}</Col>
                </Row>
              ))}

              <div style={{ color: "#002d4d", fontWeight: 500, fontSize: 16, marginTop: 24, marginBottom: 8 }}>
                Owner’s Capital
              </div>
              {[
                ["Capital", "$1,000,000"],
                ["Retained Earnings", "$520,000"],
                ["Total Owner’s Capital", "$1,520,000", true],
              ].map(([label, value, isTotal], idx) => (
                <Row className="mb-2" key={idx}>
                  <Col xs={7} style={{ fontSize: 16, fontWeight: isTotal ? 600 : 500, color: isTotal ? "#000" : "#6c757d" }}>{label}</Col>
                  <Col xs={5} className="text-end" style={{ fontSize: 16, fontWeight: isTotal ? 600 : 500 }}>{value}</Col>
                </Row>
              ))}

              <hr className="my-3" />
              <Row>
                <Col xs={7} style={{ fontWeight: 500, fontSize: 18 }}>Total Liabilities & Capital</Col>
                <Col xs={5} className="text-end" style={{ fontWeight: 600, fontSize: 18 }}>$3,100,000</Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
);

export default BalanceSheet;
