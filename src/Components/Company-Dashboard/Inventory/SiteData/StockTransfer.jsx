import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";

const StockTransfer = () => {
  const [formData, setFormData] = useState({
    transferFrom: "NewYork Warehouse",
    product: "",
    quantity: "",
    bulkTransfer: false,
    transferTo: "NewYork Warehouse",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Stock Transfer Submitted:", formData);
    // You can integrate submission logic here (API call etc.)
  };

  return (
    <div className="py-4 px-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Card className="p-4 w-100" style={{ backgroundColor: "#fff", borderRadius: 8 }}>
        <h5 style={{ color: "#002d4d", marginBottom: 24 }}>Stock Transfer</h5>
        <Form onSubmit={handleSubmit}>
          
          {/* 🔁 Transfer From */}
          <Row className="mb-3">
            <Form.Label column sm={2}>
              Transfer From
            </Form.Label>
            <Col sm={10}>
              <Form.Select
                name="transferFrom"
                value={formData.transferFrom}
                onChange={handleChange}
              >
                <option>NewYork Warehouse</option>
                <option>Delhi Warehouse</option>
                <option>Bangalore Warehouse</option>
              </Form.Select>
            </Col>
          </Row>

          {/* 📦 Bulk Transfer Toggle */}
          <Row className="mb-3">
            <Form.Label column sm={2}>Bulk Transfer</Form.Label>
            <Col sm={10} className="d-flex align-items-center">
              <Form.Check
                type="checkbox"
                name="bulkTransfer"
                label="Enable Bulk Transfer"
                checked={formData.bulkTransfer}
                onChange={handleChange}
              />
            </Col>
          </Row>

          {/* 🔢 Product & Quantity — only if bulkTransfer is OFF */}
          {!formData.bulkTransfer && (
            <>
              <Row className="mb-3">
                <Form.Label column sm={2}>Product</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    placeholder="Enter product name"
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Form.Label column sm={2}>Quantity</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="Enter quantity"
                    min="1"
                  />
                </Col>
              </Row>
            </>
          )}

          {/* 🎯 Transfer To */}
          <Row className="mb-4">
            <Form.Label column sm={2}>
              Transfer To
            </Form.Label>
            <Col sm={10}>
              <Form.Select
                name="transferTo"
                value={formData.transferTo}
                onChange={handleChange}
              >
                <option>NewYork Warehouse</option>
                <option>Mumbai Warehouse</option>
                <option>Chennai Warehouse</option>
              </Form.Select>
            </Col>
          </Row>

          {/* ✅ Submit */}
          <div className="text-end">
            <Button
              type="submit"
              style={{
                backgroundColor: "#002d4d",
                border: "none",
                padding: "8px 24px",
                fontWeight: 600,
              }}
            >
              Save
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default StockTransfer;
