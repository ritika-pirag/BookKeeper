import React, { useState } from "react";
import {
  Table,
  Form,
  Badge,
  Container,
  Row,
  Col,
  InputGroup,
  Button,
} from "react-bootstrap";
import * as XLSX from "xlsx";

const InventorySummary = () => {
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  const inventoryData = [
    {
      id: 1,
      name: "Product A",
      sku: "PROD-A",
      warehouse: "Indore",
      opening: 100,
      inward: 50,
      outward: 80,
      closing: 70,
      price: 50,
    },
    {
      id: 2,
      name: "Product B",
      sku: "PROD-B",
      warehouse: "Delhi",
      opening: 20,
      inward: 100,
      outward: 60,
      closing: 60,
      price: 30,
    },
    {
      id: 3,
      name: "Product C",
      sku: "PROD-C",
      warehouse: "Mumbai",
      opening: 10,
      inward: 5,
      outward: 12,
      closing: 3,
      price: 100,
    },
  ];

  const filteredData = inventoryData.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (priceFilter === "" || item.price >= parseFloat(priceFilter))
  );

  const handleImport = () => {
    // 🟢 Placeholder - can add input[type="file"] logic here
    console.log("Import clicked");
  };

  const handleExport = () => {
    const exportData = filteredData.map((item) => ({
      Product: item.name,
      SKU: item.sku,
      Warehouse: item.warehouse,
      Opening: item.opening,
      Inward: item.inward,
      Outward: item.outward,
      Closing: item.closing,
      Price: item.price,
      TotalValue: item.closing * item.price,
      Status: item.closing <= 5 ? "Low Stock" : "In Stock",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory Summary");
    XLSX.writeFile(workbook, "Inventory_Summary.xlsx");
  };

  const handleDownloadTemplate = () => {
    const templateHeaders = [
      {
        Product: "",
        SKU: "",
        Warehouse: "",
        Opening: "",
        Inward: "",
        Outward: "",
        Closing: "",
        Price: "",
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(templateHeaders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Template");
    XLSX.writeFile(workbook, "Inventory_Template.xlsx");
  };

  return (
    <Container className="mt-4">
      <Row className="align-items-center mb-3 g-2">
        <Col md={4}>
          <h4>📦 Inventory Summary</h4>
        </Col>
        <Col md={8} className="text-md-end d-flex justify-content-md-end flex-wrap">
        <Button
  style={{ backgroundColor: "#28a745", borderColor: "#28a745" }} // Green
  className="rounded-pill me-2 mb-2 text-white"
  onClick={handleImport}
>
   Import
</Button>

<Button
  style={{ backgroundColor: "#fd7e14", borderColor: "#fd7e14" }} // Orange
  className="rounded-pill me-2 mb-2 text-white"
  onClick={handleExport}
>
   Export
</Button>

<Button
  style={{ backgroundColor: "#ffc107", borderColor: "#ffc107" }} // Yellow
  className="rounded-pill mb-2 text-dark"
  onClick={handleDownloadTemplate}
>
   Download Template
</Button>

        </Col>
      </Row>

      {/* 🔍 Filters Above Table */}
      <Row className="mb-3 g-3">
        <Col md={6}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder=" Search by product name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-pill"
            />
          </InputGroup>
        </Col>
        <Col md={6}>
          <InputGroup>
            <Form.Control
              type="number"
              placeholder=" Filter by min price..."
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="rounded-pill"
            />
          </InputGroup>
        </Col>
      </Row>

      <Table striped bordered responsive hover>
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>SKU</th>
            <th>Warehouse</th>
            <th>Opening</th>
            <th>Inward</th>
            <th>Outward</th>
            <th>Closing</th>
            <th>Price (₹)</th>
            <th>Total Value (₹)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => {
              const totalValue = item.closing * item.price;
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
                  <td>{item.warehouse}</td>
                  <td>{item.opening}</td>
                  <td>{item.inward}</td>
                  <td>{item.outward}</td>
                  <td>{item.closing}</td>
                  <td>₹{item.price}</td>
                  <td>₹{totalValue}</td>
                  <td>{status}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="11" className="text-center">
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
