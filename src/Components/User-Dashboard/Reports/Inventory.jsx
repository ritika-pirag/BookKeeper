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

// Demo data for all tabs
const inventoryData = [
  {
    sku: "PT001",
    name: "Lenovo IdeaPad 3",
    img: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png",
    category: "Computers",
    unit: "Pc",
    instock: "100",
    store: "Store 1",
  },
  {
    sku: "PT002",
    name: "Beats Pro",
    img: "https://cdn-icons-png.flaticon.com/512/1048/1048927.png",
    category: "Electronics",
    unit: "Pc",
    instock: "140",
    store: "Store 2",
  },
  {
    sku: "PT003",
    name: "Nike Jordan",
    img: "https://cdn-icons-png.flaticon.com/512/1048/1048926.png",
    category: "Shoe",
    unit: "Bx",
    instock: "300",
    store: "Store 1",
  },
  {
    sku: "PT004",
    name: "Apple Series 5 Watch",
    img: "https://cdn-icons-png.flaticon.com/512/1048/1048930.png",
    category: "Electronics",
    unit: "Pc",
    instock: "450",
    store: "Store 2",
  },
];

const stockHistoryData = [
  {
    sku: "PT001",
    name: "Lenovo IdeaPad 3",
    img: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png",
    initial: "6000",
    added: "100",
    sold: "100",
    defective: "100",
    final: "100",
    store: "Store 1",
    category: "Computers",
  },
  {
    sku: "PT002",
    name: "Beats Pro",
    img: "https://cdn-icons-png.flaticon.com/512/1048/1048927.png",
    initial: "10",
    added: "140",
    sold: "140",
    defective: "140",
    final: "140",
    store: "Store 2",
    category: "Electronics",
  },
  {
    sku: "PT003",
    name: "Nike Jordan",
    img: "https://cdn-icons-png.flaticon.com/512/1048/1048926.png",
    initial: "08",
    added: "300",
    sold: "300",
    defective: "300",
    final: "300",
    store: "Store 1",
    category: "Shoe",
  },
  {
    sku: "PT004",
    name: "Apple Series 5 Watch",
    img: "https://cdn-icons-png.flaticon.com/512/1048/1048930.png",
    initial: "10",
    added: "450",
    sold: "450",
    defective: "450",
    final: "450",
    store: "Store 2",
    category: "Electronics",
  },
];

const soldStockData = [
  {
    sku: "PT001",
    name: "Lenovo IdeaPad 3",
    img: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png",
    unit: "6000",
    qty: "100",
    tax: "$300",
    total: "$300",
    store: "Store 1",
    category: "Computers",
  },
  {
    sku: "PT002",
    name: "Beats Pro",
    img: "https://cdn-icons-png.flaticon.com/512/1048/1048927.png",
    unit: "10",
    qty: "140",
    tax: "$10",
    total: "$1600",
    store: "Store 2",
    category: "Electronics",
  },
  {
    sku: "PT003",
    name: "Nike Jordan",
    img: "https://cdn-icons-png.flaticon.com/512/1048/1048926.png",
    unit: "08",
    qty: "300",
    tax: "$80",
    total: "$880",
    store: "Store 1",
    category: "Shoe",
  },
  {
    sku: "PT004",
    name: "Apple Series 5 Watch",
    img: "https://cdn-icons-png.flaticon.com/512/1048/1048930.png",
    unit: "10",
    qty: "450",
    tax: "$100",
    total: "$1200",
    store: "Store 2",
    category: "Electronics",
  },
];

// Helper to get unique values for dropdowns
const getUnique = (arr, key) => [
  "All",
  ...Array.from(new Set(arr.map((item) => item[key]))),
];

const Inventory = () => {
  const [tab, setTab] = useState("inventory");
  const [startDate, setStartDate] = useState(new Date("2025-07-03"));
  const [endDate, setEndDate] = useState(new Date("2025-07-09"));
  const [category, setCategory] = useState("All");
  const [product, setProduct] = useState("All");
  const [store, setStore] = useState("All");
  const [unit, setUnit] = useState("All");

  // Data and filters per tab
  let tableData = [];
  let categories = [];
  let products = [];
  let stores = [];
  let units = [];

  if (tab === "inventory") {
    tableData = inventoryData;
    categories = getUnique(inventoryData, "category");
    products = getUnique(inventoryData, "name");
    stores = getUnique(inventoryData, "store");
    units = getUnique(inventoryData, "unit");
  } else if (tab === "stock") {
    tableData = stockHistoryData;
    categories = getUnique(stockHistoryData, "category");
    products = getUnique(stockHistoryData, "name");
    stores = getUnique(stockHistoryData, "store");
  } else if (tab === "sold") {
    tableData = soldStockData;
    categories = getUnique(soldStockData, "category");
    products = getUnique(soldStockData, "name");
    stores = getUnique(soldStockData, "store");
  }

  // Filter table data
  tableData = tableData.filter(
    (row) =>
      (category === "All" || row.category === category) &&
      (product === "All" || row.name === product) &&
      (store === "All" || row.store === store) &&
      (tab !== "inventory" || unit === "All" || row.unit === unit)
  );

  // PDF Export
  const handlePDF = () => {
    let head = [];
    let body = [];
    if (tab === "inventory") {
      head = [["SKU", "Product Name", "Category", "Unit", "InStock"]];
      body = tableData.map((row) => [
        row.sku,
        row.name,
        row.category,
        row.unit,
        row.instock,
      ]);
    } else if (tab === "stock") {
      head = [
        [
          "SKU",
          "Product",
          "Initial Quantity",
          "Added Quantity",
          "Sold Quantity",
          "Defective Quantity",
          "Final Quantity",
        ],
      ];
      body = tableData.map((row) => [
        row.sku,
        row.name,
        row.initial,
        row.added,
        row.sold,
        row.defective,
        row.final,
      ]);
    } else if (tab === "sold") {
      head = [
        ["SKU", "Product Name", "Unit", "Quantity", "Tax Value", "Total"],
      ];
      body = tableData.map((row) => [
        row.sku,
        row.name,
        row.unit,
        row.qty,
        row.tax,
        row.total,
      ]);
    }
    const doc = new jsPDF();
    doc.text(
      tab === "inventory"
        ? "Inventory Report"
        : tab === "stock"
        ? "Stock History"
        : "Sold Stock",
      14,
      16
    );
    doc.autoTable({
      startY: 22,
      head,
      body,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [245, 246, 250], textColor: 60 },
    });
    doc.save(
      (tab === "inventory"
        ? "inventory_report"
        : tab === "stock"
        ? "stock_history"
        : "sold_stock") + ".pdf"
    );
  };

  return (
    <div  style={{ background: "#f7f7f7", minHeight: "100vh", paddingBottom: 40 }}>
      <Container fluid className="py-4 ">
        {/* Tabs */}
        <div className="mb-4 d-flex gap-3">
          <Button 
            variant="light"
            style={{
              background: tab === "inventory" ? "#FFA94D" : "#eaeaea",
              color: tab === "inventory" ? "#fff" : "#888",
              fontWeight: 600,
              fontSize: 18,
              border: "none",
              borderRadius: 10,
              minWidth: 180,
            }}
            onClick={() => setTab("inventory")}
          >
            Inventory Report
          </Button>
          <Button
            variant="light"
            style={{
              background: tab === "stock" ? "#FFA94D" : "#eaeaea",
              color: tab === "stock" ? "#fff" : "#888",
              fontWeight: 600,
              fontSize: 18,
              border: "none",
              borderRadius: 10,
              minWidth: 180,
            }}
            onClick={() => setTab("stock")}
          >
            Stock History
          </Button>
          <Button
            variant="light"
            style={{
              background: tab === "sold" ? "#FFA94D" : "#eaeaea",
              color: tab === "sold" ? "#fff" : "#888",
              fontWeight: 600,
              fontSize: 18,
              border: "none",
              borderRadius: 10,
              minWidth: 180,
            }}
            onClick={() => setTab("sold")}
          >
            Sold Stock
          </Button>
        </div>

        {/* Heading */}
        <div style={{ fontWeight: 700, fontSize: 28, marginBottom: 0  }}>
          {tab === "inventory"
            ? "Inventory"
            : tab === "stock"
            ? "Stock History"
            : "Sold Stock"}
        </div>
        <div style={{ color: "#888", fontSize: 17, marginBottom: 24 }}>
          View Reports of{" "}
          {tab === "inventory"
            ? "Inventory"
            : tab === "stock"
            ? "Stock History"
            : "Sold Stock"}
        </div>

        {/* Filters */}
        <Card className="mb-4 " style={{ borderRadius: 14 }}>
          <Card.Body style={{ background: "#fff", borderRadius: 14 }}>
            <Row className="align-items-end g-3">
              <Col xs={12} md={3}>
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
                  Category
                </Form.Label>
                <Form.Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((c) => (
                    <option key={c}>{c}</option>
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
              {tab === "inventory" && (
                <Col xs={12} md={2}>
                  <Form.Label style={{ color: "#888", fontWeight: 500 }}>
                    Units
                  </Form.Label>
                  <Form.Select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                  >
                    {units.map((u) => (
                      <option key={u}>{u}</option>
                    ))}
                  </Form.Select>
                </Col>
              )}
              {tab !== "inventory" && (
                <Col xs={12} md={2}>
                  <Form.Label style={{ color: "#fff" }}>-</Form.Label>
                  <Form.Select
                    value={store}
                    onChange={(e) => setStore(e.target.value)}
                    style={{ display: "none" }}
                  >
                    {stores.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </Form.Select>
                </Col>
              )}
              <Col xs={12} md={tab === "inventory" ? 1 : 2} className="d-flex align-items-end">
                
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Table */}
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
                    {tab === "inventory" && (
                      <>
                        <th>SKU</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Unit</th>
                        <th>InStock</th>
                      </>
                    )}
                    {tab === "stock" && (
                      <>
                        <th>SKU</th>
                        <th>Product</th>
                        <th>Initial Quantity</th>
                        <th>Added Quantity</th>
                        <th>Sold Quantity</th>
                        <th>Defective Quantity</th>
                        <th>Final Quantity</th>
                      </>
                    )}
                    {tab === "sold" && (
                      <>
                        <th>SKU</th>
                        <th>Product Name</th>
                        <th>Unit</th>
                        <th>Quantity</th>
                        <th>Tax Value</th>
                        <th>Total</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, idx) => (
                    <tr key={row.sku + idx}>
                      <td>{row.sku}</td>
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
                      {tab === "inventory" && (
                        <>
                          <td>{row.category}</td>
                          <td>{row.unit}</td>
                          <td>{row.instock}</td>
                        </>
                      )}
                      {tab === "stock" && (
                        <>
                          <td>{row.initial}</td>
                          <td>{row.added}</td>
                          <td>{row.sold}</td>
                          <td>{row.defective}</td>
                          <td>{row.final}</td>
                        </>
                      )}
                      {tab === "sold" && (
                        <>
                          <td>{row.unit}</td>
                          <td>{row.qty}</td>
                          <td>{row.tax}</td>
                          <td>{row.total}</td>
                        </>
                      )}
                    </tr>
                  ))}
                  {tableData.length === 0 && (
                    <tr>
                      <td
                        colSpan={
                          tab === "inventory"
                            ? 5
                            : tab === "stock"
                            ? 7
                            : 6
                        }
                        className="text-center text-muted"
                      >
                        No records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
              {/* Pagination */}
<div className="d-flex justify-content-between align-items-center mt-3 px-3">
  <span className="small text-muted">
    Showing 1 to {tableData.length} of {tableData.length} results
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

export default Inventory;