import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const formatUSD = (num) =>
  "$" +
  num.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });

const BalanceSheet = () => (
  <div style={{ background: "#f7f7f7", minHeight: "100vh", paddingBottom: 40 }}>
    <Container fluid className="py-4">
      <div className="text-center mb-2" style={{ fontSize: 36, color: "#FFA94D", fontWeight: 700 }}>
        Balance Sheet
      </div>
      <div className="text-center mb-4" style={{ color: "#888", fontSize: 18 }}>
        As on 8 july 2025
      </div>
      <Row className="g-4 justify-content-center">
        <Col xs={12} md={6}>
          <Card className="shadow-sm" style={{ borderRadius: 20 }}>
            <Card.Body>
              <div style={{ fontWeight: 700, fontSize: 28, marginBottom: 18 }}>
                ASSETS
              </div>
              <div style={{ color: "#FFA94D", fontWeight: 600, fontSize: 18, marginBottom: 2 }}>
                Current Assets
              </div>
              <Row className="mb-1">
                <Col xs={7} style={{ color: "#666", fontSize: 18 }}>Cash</Col>
                <Col xs={5} className="text-end" style={{ fontSize: 18 }}>$75,000</Col>
              </Row>
              <Row className="mb-1">
                <Col xs={7} style={{ color: "#666", fontSize: 18 }}>Bank</Col>
                <Col xs={5} className="text-end" style={{ fontSize: 18 }}>$245,000</Col>
              </Row>
              <Row className="mb-1">
                <Col xs={7} style={{ color: "#666", fontSize: 18 }}>Stock</Col>
                <Col xs={5} className="text-end" style={{ fontSize: 18 }}>$320,000</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={7} style={{ color: "#666", fontSize: 18 }}>Accounts Receivable</Col>
                <Col xs={5} className="text-end" style={{ fontSize: 18 }}>$185,000</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={7} style={{ fontWeight: 700, fontSize: 18 }}>Total Current Assets</Col>
                <Col xs={5} className="text-end" style={{ fontWeight: 700, fontSize: 18 }}>$825,000</Col>
              </Row>
              <div style={{ color: "#FFA94D", fontWeight: 600, fontSize: 18, marginBottom: 2, marginTop: 18 }}>
                Fixed Assets
              </div>
              <Row className="mb-1">
                <Col xs={7} style={{ color: "#666", fontSize: 18 }}>Land &amp; Building</Col>
                <Col xs={5} className="text-end" style={{ fontSize: 18 }}>$1,250,000</Col>
              </Row>
              <Row className="mb-1">
                <Col xs={7} style={{ color: "#666", fontSize: 18 }}>Plant &amp; Machinery</Col>
                <Col xs={5} className="text-end" style={{ fontSize: 18 }}>$875,000</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={7} style={{ color: "#666", fontSize: 18 }}>Furniture &amp; Fixtures</Col>
                <Col xs={5} className="text-end" style={{ fontSize: 18 }}>$150,000</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={7} style={{ fontWeight: 700, fontSize: 18 }}>Total Fixed Assets</Col>
                <Col xs={5} className="text-end" style={{ fontWeight: 700, fontSize: 18 }}>$2,275,000</Col>
              </Row>
              <Row>
                <Col xs={7} style={{ fontWeight: 700, fontSize: 20 }}>Total Assets</Col>
                <Col xs={5} className="text-end" style={{ fontWeight: 700, fontSize: 20 }}>$3,100,000</Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card className="shadow-sm" style={{ borderRadius: 20 }}>
            <Card.Body>
              <div style={{ fontWeight: 700, fontSize: 28, marginBottom: 18 }}>
                LIABILITIES &amp; CAPITAL
              </div>
              <div style={{ color: "#FFA94D", fontWeight: 600, fontSize: 18, marginBottom: 2 }}>
                Current Liabilities
              </div>
              <Row className="mb-1">
                <Col xs={7} style={{ color: "#666", fontSize: 18 }}>Accounts Payable</Col>
                <Col xs={5} className="text-end" style={{ fontSize: 18 }}>$235,000</Col>
              </Row>
              <Row className="mb-1">
                <Col xs={7} style={{ color: "#666", fontSize: 18 }}>Short-term Loans</Col>
                <Col xs={5} className="text-end" style={{ fontSize: 18 }}>$125,000</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={7} style={{ color: "#666", fontSize: 18 }}>Outstanding Expenses</Col>
                <Col xs={5} className="text-end" style={{ fontSize: 18 }}>$45,000</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={7} style={{ fontWeight: 700, fontSize: 18 }}>Total Current Liabilities</Col>
                <Col xs={5} className="text-end" style={{ fontWeight: 700, fontSize: 18 }}>$405,000</Col>
              </Row>
              <div style={{ color: "#FFA94D", fontWeight: 600, fontSize: 18, marginBottom: 2, marginTop: 18 }}>
                Long-term Liabilities
              </div>
              <Row className="mb-1">
                <Col xs={7} style={{ color: "#666", fontSize: 18 }}>Term Loan</Col>
                <Col xs={5} className="text-end" style={{ fontSize: 18 }}>$750,000</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={7} style={{ color: "#666", fontSize: 18 }}>Mortgage Loan</Col>
                <Col xs={5} className="text-end" style={{ fontSize: 18 }}>$425,000</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={7} style={{ fontWeight: 700, fontSize: 18 }}>Total Long-term Liabilities</Col>
                <Col xs={5} className="text-end" style={{ fontWeight: 700, fontSize: 18 }}>$1,175,000</Col>
              </Row>
              <div style={{ color: "#FFA94D", fontWeight: 600, fontSize: 18, marginBottom: 2, marginTop: 18 }}>
                Owner’s Capital
              </div>
              <Row className="mb-1">
                <Col xs={7} style={{ color: "#666", fontSize: 18 }}>Capital</Col>
                <Col xs={5} className="text-end" style={{ fontSize: 18 }}>$1,000,000</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={7} style={{ color: "#666", fontSize: 18 }}>Retained Earnings</Col>
                <Col xs={5} className="text-end" style={{ fontSize: 18 }}>$520,000</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={7} style={{ fontWeight: 700, fontSize: 18 }}>Total Owner’s Capital</Col>
                <Col xs={5} className="text-end" style={{ fontWeight: 700, fontSize: 18 }}>$1,520,000</Col>
              </Row>
              <Row>
                <Col xs={7} style={{ fontWeight: 700, fontSize: 20 }}>Total Liabilities &amp; Capital</Col>
                <Col xs={5} className="text-end" style={{ fontWeight: 700, fontSize: 20 }}>$3,100,000</Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
);

export default BalanceSheet;