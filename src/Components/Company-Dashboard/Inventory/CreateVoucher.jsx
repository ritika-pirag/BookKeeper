

import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";

const CreateVoucher = () => {
  const [formData, setFormData] = useState({
    voucherType: "",
    date: "",
    amount: "",
    narration: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Voucher:", formData);
    // TODO: Send to backend via API
  };

  const handleReset = () => {
    setFormData({ voucherType: "", date: "", amount: "", narration: "" });
  };

  return (
    <Container className="py-4">
      <Card className="shadow rounded-4 p-4">
        <h2 className="text-center mb-4">Create Voucher</h2>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="voucherType">
                <Form.Label>Voucher Type</Form.Label>
                <Form.Select
                  name="voucherType"
                  value={formData.voucherType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="payment">Payment</option>
                  <option value="receipt">Receipt</option>
                  <option value="journal">Journal</option>
                  <option value="contra">Contra</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="amount">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="narration">
                <Form.Label>Narration</Form.Label>
                <Form.Control
                  as="textarea"
                  name="narration"
                  value={formData.narration}
                  onChange={handleChange}
                  placeholder="Narration (optional)"
                  rows={2}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end gap-3 mt-4">
            <Button variant="secondary" onClick={handleReset}>
              Reset
            </Button>
            <Button variant="primary" type="submit">
              Save Voucher
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default CreateVoucher;
