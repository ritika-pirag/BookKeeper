import React, { useState } from "react";
import { Form, Button, Row, Col, Card, Table } from "react-bootstrap";

const productOptions = ["Product A", "Product B", "Product C", "Product D"];

const StockTransfer = () => {
  const [formData, setFormData] = useState({
    transferFrom: "NewYork Warehouse",
    transferTo: "Mumbai Warehouse"
  });

  const [searchInput, setSearchInput] = useState("");
  const [transferItems, setTransferItems] = useState([]);

  const handleAddProduct = () => {
    const name = searchInput.trim();
    if (!name) return;
    const exists = transferItems.some((item) => item.name === name);
    if (exists) return;
    setTransferItems((prev) => [...prev, { id: Date.now(), name, qty: "" }]);
    setSearchInput("");
  };

  const updateQty = (id, qty) => {
    setTransferItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: qty === "" ? "" : Math.max(1, parseInt(qty) || "") } : item
      )
    );
  };

  const removeItem = (id) => {
    setTransferItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (transferItems.some((item) => item.qty === "")) {
      alert("Please enter quantity for all products.");
      return;
    }

    const payload = {
      ...formData,
      products: transferItems.map(({ id, name, qty }) => ({ name, quantity: qty }))
    };
    console.log("Final Payload:", payload);
    // Submit to backend here
  };

  return (
    <div className="py-4 px-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Card className="p-4 w-100" style={{ backgroundColor: "#fff", borderRadius: 8 }}>
        <h5 style={{ color: "#002d4d", marginBottom: 24 }}>Stock Transfer</h5>
        <Form onSubmit={handleSubmit}>
          {/* 🚚 Transfer From */}
          <Row className="mb-3">
            <Form.Label column sm={2}>Transfer From</Form.Label>
            <Col sm={10}>
              <Form.Select name="transferFrom" value={formData.transferFrom} onChange={handleChange}>
                <option>NewYork Warehouse</option>
                <option>Delhi Warehouse</option>
                <option>Bangalore Warehouse</option>
              </Form.Select>
            </Col>
          </Row>

          {/* 🔍 Product Search + Add */}
          <Row className="mb-3 align-items-center">
            <Form.Label column sm={2}>Search Product</Form.Label>
            <Col sm={7}>
              <Form.Control
                type="text"
                placeholder="Type product name"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </Col>
            <Col sm={3}>
              <Button variant="secondary" onClick={handleAddProduct}>Add Product</Button>
            </Col>
          </Row>

          {/* 🧾 Product Table */}
          {transferItems.length > 0 && (
            <Row className="mb-3">
              <Col>
                <Table bordered striped hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transferItems.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td className="d-flex align-items-center gap-2">
                          <Form.Control
                            type="number"
                            value={item.qty}
                            min="1"
                            placeholder="Qty"
                            style={{ width: "80px" }}
                            onChange={(e) => updateQty(item.id, e.target.value)}
                          />
                          <span style={{ fontSize: "0.9rem", color: "#666" }}>pcs</span>
                        </td>
                        <td>
                          <Button variant="danger" size="sm" onClick={() => removeItem(item.id)}>X</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          )}

          {/* 📦 Transfer To */}
          <Row className="mb-4">
            <Form.Label column sm={2}>Transfer To</Form.Label>
            <Col sm={10}>
              <Form.Select name="transferTo" value={formData.transferTo} onChange={handleChange}>
                <option>NewYork Warehouse</option>
                <option>Mumbai Warehouse</option>
                <option>Chennai Warehouse</option>
              </Form.Select>
            </Col>
          </Row>

          {/* 📤 Submit */}
          <div className="text-end">
            <Button type="submit" style={{ backgroundColor: "#002d4d", border: "none", padding: "8px 24px", fontWeight: 600 }}>
              Save Transfer
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default StockTransfer;
