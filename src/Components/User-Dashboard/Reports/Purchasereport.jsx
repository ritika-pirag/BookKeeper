import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import { FaFilePdf, FaFileExcel, FaPrint } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";

const purchaseData = [
  {
    ref: "PO2025",
    sku: "PT001",
    due: "24 Dec 2024",
    name: "Lenovo IdeaPad 3",
    img: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png",
    category: "Computers",
    instock: "100",
    qty: "05",
    amount: "$500",
  },
  {
    ref: "PO2025",
    sku: "PT002",
    due: "10 Dec 2024",
    name: "Beats Pro",
    img: "https://cdn-icons-png.flaticon.com/512/1048/1048927.png",
    category: "Electronics",
    instock: "140",
    qty: "10",
    amount: "$1500",
  },
  {
    ref: "PO2025",
    sku: "PT003",
    due: "27 Nov 2024",
    name: "Nike Jordan",
    img: "https://cdn-icons-png.flaticon.com/512/1048/1048926.png",
    category: "Shoe",
    instock: "300",
    qty: "08",
    amount: "$600",
  },
  {
    ref: "PO2025",
    sku: "PT004",
    due: "18 Nov 2024",
    name: "Apple Series 5 Watch",
    img: "https://cdn-icons-png.flaticon.com/512/1048/1048930.png",
    category: "Electronics",
    instock: "450",
    qty: "10",
    amount: "$1000",
  },
  {
    ref: "PO2025",
    sku: "PT005",
    due: "18 Nov 2024",
    name: "Amazon Echo Dot",
    img: "https://cdn-icons-png.flaticon.com/512/1048/1048931.png",
    category: "Electronics",
    instock: "320",
    qty: "05",
    amount: "$1200",
  },
  {
    ref: "PO2025",
    sku: "PT006",
    due: "25 Oct 2024",
    name: "Sanford Chair Sofa",
    img: "https://cdn-icons-png.flaticon.com/512/1048/1048932.png",
    category: "Furniture",
    instock: "650",
    qty: "07",
    amount: "$800",
  },
];

const stores = ["All", "Store 1", "Store 2"];
const products = [
  "All",
  "Lenovo IdeaPad 3",
  "Beats Pro",
  "Nike Jordan",
  "Apple Series 5 Watch",
  "Amazon Echo Dot",
  "Sanford Chair Sofa",
];

const Purchasereport= () => {
  const [startDate, setStartDate] = useState(new Date("2025-07-03"));
  const [endDate, setEndDate] = useState(new Date("2025-07-09"));
  const [store, setStore] = useState("All");
  const [product, setProduct] = useState("All");

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.text("Purchase Report", 14, 16);
    doc.autoTable({
      startY: 22,
      head: [
        [
          "Reference",
          "SKU",
          "Due Date",
          "Product Name",
          "Category",
          "Instock Qty",
          "Purchase Qty",
          "Purchase Amount",
        ],
      ],
      body: purchaseData.map((row) => [
        row.ref,
        row.sku,
        row.due,
        row.name,
        row.category,
        row.instock,
        row.qty,
        row.amount,
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [245, 246, 250], textColor: 60 },
    });
    doc.save("purchase_report.pdf");
  };

  return (
    <div style={{ background: "#f7f7f7", minHeight: "100vh", paddingBottom: 40 }}>
      <Container fluid className="py-4">
        <div style={{ fontWeight: 700, fontSize: 28, marginBottom: 0 }}>
          Purchase report
        </div>
        <div style={{ color: "#888", fontSize: 17, marginBottom: 24 }}>
          Manage your Purchase report
        </div>
        <Card className="mb-4" style={{ borderRadius: 14 }}>
          <Card.Body style={{ background: "#fff", borderRadius: 14 }}>
            <Row className="align-items-end g-3">
              <Col xs={12} md={4}>
                <Form.Label style={{ color: "#888", fontWeight: 500 }}>
                  Choose Date
                </Form.Label>
                <InputGroup>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="MM/dd/yyyy"
                    className="form-control"
                  />
                  <span
                    style={{
                      fontWeight: 600,
                      color: "#888",
                      background: "#f7f7f7",
                      border: "1px solid #dee2e6",
                      padding: "0 8px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    -
                  </span>
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
                </InputGroup>
              </Col>
              <Col xs={12} md={3}>
                <Form.Label style={{ color: "#888", fontWeight: 500 }}>
                  Store
                </Form.Label>
                <Form.Select
                  value={store}
                  onChange={(e) => setStore(e.target.value)}
                >
                  {stores.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={12} md={3}>
                <Form.Label style={{ color: "#888", fontWeight: 500 }}>
                  Products
                </Form.Label>
                <Form.Select
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                >
                  {products.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={12} md={2} className="d-flex align-items-end">
                <Button
                  style={{
                    background: "#3daaaa",
                    border: "none",
                    fontWeight: 500,
                    fontSize: 17,
                    width: "100%",
                  }}
                >
                  Generate Report
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card style={{ borderRadius: 14 }}>
          <Card.Body style={{ background: "#fff", borderRadius: 14 }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div style={{ fontWeight: 700, fontSize: 22 }}>Customer Report</div>
              <div className="d-flex gap-2">
                <Button
                  variant="light"
                  style={{
                    border: "none",
                    background: "#fff",
                    boxShadow: "0 1px 4px #0001",
                  }}
                  onClick={handlePDF}
                  title="Download PDF"
                >
                  <FaFilePdf size={22} color="#ff6f61" />
                </Button>
                <Button
                  variant="light"
                  style={{
                    border: "none",
                    background: "#fff",
                    boxShadow: "0 1px 4px #0001",
                  }}
                  title="Download Excel"
                  disabled
                >
                  <FaFileExcel size={22} color="#27ae60" />
                </Button>
                <Button
                  variant="light"
                  style={{
                    border: "none",
                    background: "#fff",
                    boxShadow: "0 1px 4px #0001",
                  }}
                  title="Print"
                  disabled
                >
                  <FaPrint size={22} color="#2563eb" />
                </Button>
              </div>
            </div>
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
                    <th>Reference</th>
                    <th>SKU</th>
                    <th>Due Date</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Instock Qty</th>
                    <th>Purchase Qty</th>
                    <th>Purchase Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseData.map((row, idx) => (
                    <tr key={row.sku + idx}>
                      <td>{row.ref}</td>
                      <td>{row.sku}</td>
                      <td>{row.due}</td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div
                            style={{
                              width: 38,
                              height: 38,
                              borderRadius: 8,
                              background: "#f5f5f5",
                              overflow: "hidden",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 13,
                              color: "#aaa",
                            }}
                          >
                            <img
                              src={row.img}
                              alt={row.name}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                              }}
                            />
                          </div>
                          <span>{row.name}</span>
                        </div>
                      </td>
                      <td>{row.category}</td>
                      <td>{row.instock}</td>
                      <td>{row.qty}</td>
                      <td>{row.amount}</td>
                    </tr>
                  ))}
                  {purchaseData.length === 0 && (
                    <tr>
                      <td colSpan={8} className="text-center text-muted">
                        No records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
              {/* Pagination */}
<div className="d-flex justify-content-between align-items-center mt-3 px-3">
  <span className="small text-muted">
    Showing 1 to {purchaseData.length} of {purchaseData.length} results
  </span>

  <nav>
    <ul className="pagination pagination-sm mb-0">
      <li className="page-item disabled">
        <button className="page-link rounded-start">&laquo;</button>
      </li>
      <li className="page-item active">
        <button
          className="page-link"
          style={{ backgroundColor: "#3daaaa", borderColor: "#3daaaa" }}
        >
          1
        </button>
      </li>
      <li className="page-item">
        <button className="page-link">2</button>
      </li>
      <li className="page-item">
        <button className="page-link rounded-end">&raquo;</button>
      </li>
    </ul>
  </nav>
</div>

            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Purchasereport;