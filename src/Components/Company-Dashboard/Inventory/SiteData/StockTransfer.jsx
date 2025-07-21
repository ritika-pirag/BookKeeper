import React, { useState, useRef, useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";

const productOptions = [
  "Product A",
  "Product B",
  "Product C",
  "Product D"
];

const StockTransfer = () => {
  const [formData, setFormData] = useState({
    transferFrom: "NewYork Warehouse",
    selectedProducts: [],
    transferTo: "NewYork Warehouse",
    quantity: ""
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // 🔒 Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleProductToggle = (product) => {
    setFormData((prev) => {
      const isSelected = prev.selectedProducts.includes(product);
      const updated = isSelected
        ? prev.selectedProducts.filter((p) => p !== product)
        : [...prev.selectedProducts, product];
      return { ...prev, selectedProducts: updated };
    });
  };

  const handleSelectAll = () => {
    const allSelected = formData.selectedProducts.length === productOptions.length;
    setFormData((prev) => ({
      ...prev,
      selectedProducts: allSelected ? [] : [...productOptions]
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Stock Transfer Submitted:", formData);
  };

  return (
    <div className="py-4 px-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Card className="p-4 w-100" style={{ backgroundColor: "#fff", borderRadius: 8 }}>
        <h5 style={{ color: "#002d4d", marginBottom: 24 }}>Stock Transfer</h5>
        <Form onSubmit={handleSubmit}>

          {/* 🔁 Transfer From */}
          <Row className="mb-3">
            <Form.Label column sm={2}>Transfer From</Form.Label>
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

          {/* 📦 Product Dropdown with Checkboxes */}
          <Row className="mb-3">
            <Form.Label column sm={2}>Products</Form.Label>
            <Col sm={10}>
              <div ref={dropdownRef} style={{ position: "relative" }}>
                <Button variant="outline-secondary" onClick={toggleDropdown}>
                  {formData.selectedProducts.length > 0
                    ? `${formData.selectedProducts.length} selected`
                    : "Select Products"}
                </Button>

                {dropdownOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      zIndex: 999,
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: 4,
                      padding: 10,
                      width: "100%",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
                    }}
                  >
                    <Form.Check
                      type="checkbox"
                      label="Select All"
                      checked={formData.selectedProducts.length === productOptions.length}
                      onChange={handleSelectAll}
                    />
                    {productOptions.map((product, index) => (
                      <Form.Check
                        key={index}
                        type="checkbox"
                        label={product}
                        checked={formData.selectedProducts.includes(product)}
                        onChange={() => handleProductToggle(product)}
                        style={{ marginLeft: 12 }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </Col>
          </Row>

          {/* 🔢 Quantity */}
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

          {/* 🎯 Transfer To */}
          <Row className="mb-4">
            <Form.Label column sm={2}>Transfer To</Form.Label>
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

          {/* 🚀 Submit */}
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
