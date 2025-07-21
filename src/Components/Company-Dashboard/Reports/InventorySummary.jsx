import React, { useState } from "react";
import { Table, Form, Badge, Container, Row, Col, InputGroup } from "react-bootstrap";

const InventorySummary = () => {
  const [search, setSearch] = useState("");

  const inventoryData = [
    {
      id: 1,
      name: "Product A",
      sku: "PROD-A",
      opening: 100,
      inward: 50,
      outward: 80,
      closing: 70,
      rate: 50
    },
    {
      id: 2,
      name: "Product B",
      sku: "PROD-B",
      opening: 20,
      inward: 100,
      outward: 60,
      closing: 60,
      rate: 30
    },
    {
      id: 3,
      name: "Product C",
      sku: "PROD-C",
      opening: 10,
      inward: 5,
      outward: 12,
      closing: 3,
      rate: 100
    }
  ];

  const filteredData = inventoryData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col md={6}>
          <h4>📦 Inventory Summary</h4>
        </Col>
        <Col md={6}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search by product name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>

      <Table striped bordered responsive hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>SKU</th>
            <th>Opening</th>
            <th>Inward</th>
            <th>Outward</th>
            <th>Closing</th>
            <th>Rate (₹)</th>
            <th>Total Value (₹)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => {
              const totalValue = item.closing * item.rate;
              const status =
                item.closing <= 5 ? (
                  <Badge bg="danger">Low Stock</Badge>
                ) : (
                  <Badge bg="success">In Stock</Badge>
                );

              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.sku}</td>
                  <td>{item.opening}</td>
                  <td>{item.inward}</td>
                  <td>{item.outward}</td>
                  <td>{item.closing}</td>
                  <td>₹{item.rate}</td>
                  <td>₹{totalValue}</td>
                  <td>{status}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="10" className="text-center">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default InventorySummary;
