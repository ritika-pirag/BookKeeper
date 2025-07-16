import React, { useState } from "react";
import {
  Container,
  Card,
  Table,
  Form,
  InputGroup,
  Button,
  Dropdown,
  Modal,
  Row,
  Col,
} from "react-bootstrap";
import { FaEllipsisV, FaPlus, FaTrash, FaFilePdf, FaEdit, FaEye, FaMoneyCheckAlt, FaRegCreditCard, FaTimes } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
import DatePicker from "react-datepicker";
// import ReactQuill from "react-quill";

const salesData = [
  {
    id: 1,
    customer: "Carl Evans",
    customerImg: "",
    reference: "SL001",
    date: "24 Dec 2024",
    status: "Completed",
    grandTotal: "$1000",
    paid: "$1000",
    due: "$0.00",
    paymentStatus: "Paid",
    paymentStatusColor: "#d4f7e6",
    paymentStatusTextColor: "#27ae60",
    statusColor: "#27ae60",
    statusBg: "#eafaf1",
    products: [
      {
        name: "Nike Jordan",
        img: "https://cdn-icons-png.flaticon.com/512/1048/1048926.png",
        qty: 1,
        price: 2000,
        discount: 500,
        tax: 0,
        taxAmount: 0,
        unitCost: 0,
        total: 1500,
      },
    ],
    orderSummary: [
      {
        name: "Nike Jordan",
        img: "https://cdn-icons-png.flaticon.com/512/1048/1048926.png",
        price: 2000,
        discount: 500,
        tax: 0,
        taxAmount: 0,
        unitCost: 0,
        total: 1500,
      },
      {
        name: "Apple Series 5 Watch",
        img: "https://cdn-icons-png.flaticon.com/512/1048/1048930.png",
        price: 3000,
        discount: 400,
        tax: 0,
        taxAmount: 0,
        unitCost: 0,
        total: 1700,
      },
      {
        name: "Lobar Handy",
        img: "https://cdn-icons-png.flaticon.com/512/1048/1048932.png",
        price: 2500,
        discount: 500,
        tax: 0,
        taxAmount: 0,
        unitCost: 0,
        total: 2000,
      },
    ],
    company: {
      name: "DGT",
      address: "2077 Chicago Avenue Orosi, CA 93647",
      email: "admin@example.com",
      phone: "+1 893 174 0385",
    },
    invoice: {
      reference: "#SL0101",
      date: "Dec 24, 2024",
      status: "Completed",
      paymentStatus: "Paid",
    },
    customerInfo: {
      name: "Carl Evans",
      address: "3103 Trainer Avenue Peoria, IL 61602",
      email: "carlevans241@example.com",
      phone: "+1 987 471 6589",
    },
    payments: [
      {
        date: "19 Jan 2023",
        reference: "INV/SL0101",
        amount: "$1500",
        paidBy: "Cash",
      },
    ],
  },
  {
    id: 2,
    customer: "Minerva Rameriz",
    customerImg: "",
    reference: "SL002",
    date: "10 Dec 2024",
    status: "Pending",
    grandTotal: "$1500",
    paid: "$0.00",
    due: "$1500",
    paymentStatus: "Unpaid",
    paymentStatusColor: "#ffeaea",
    paymentStatusTextColor: "#ff1a1a",
    statusColor: "#2563eb",
    statusBg: "#eaf1fd",
    products: [],
    orderSummary: [],
    company: {},
    invoice: {},
    customerInfo: {},
    payments: [],
  },
  {
    id: 3,
    customer: "Robert Lamon",
    customerImg: "",
    reference: "SL003",
    date: "08 Feb 2023",
    status: "Completed",
    grandTotal: "$1500",
    paid: "$0.00",
    due: "$1500",
    paymentStatus: "Paid",
    paymentStatusColor: "#d4f7e6",
    paymentStatusTextColor: "#27ae60",
    statusColor: "#27ae60",
    statusBg: "#eafaf1",
    products: [],
    orderSummary: [],
    company: {},
    invoice: {},
    customerInfo: {},
    payments: [],
  },
  {
    id: 4,
    customer: "Patricia Lewis",
    customerImg: "",
    reference: "SL004",
    date: "12 Feb 2023",
    status: "Completed",
    grandTotal: "$2000",
    paid: "$1000",
    due: "$1000",
    paymentStatus: "Overdue",
    paymentStatusColor: "#fff7e0",
    paymentStatusTextColor: "#FFA94D",
    statusColor: "#27ae60",
    statusBg: "#eafaf1",
    products: [],
    orderSummary: [],
    company: {},
    invoice: {},
    customerInfo: {},
    payments: [],
  },
  {
    id: 5,
    customer: "Mark Joslyn",
    customerImg: "",
    reference: "SL005",
    date: "17 Mar 2023",
    status: "Completed",
    grandTotal: "$800",
    paid: "$800",
    due: "$0.00",
    paymentStatus: "Paid",
    paymentStatusColor: "#d4f7e6",
    paymentStatusTextColor: "#27ae60",
    statusColor: "#27ae60",
    statusBg: "#eafaf1",
    products: [],
    orderSummary: [],
    company: {},
    invoice: {},
    customerInfo: {},
    payments: [],
  },
  {
    id: 6,
    customer: "Marsha Betts",
    customerImg: "",
    reference: "SL006",
    date: "24 Mar 2023",
    status: "Pending",
    grandTotal: "$750",
    paid: "$0.00",
    due: "$750",
    paymentStatus: "Unpaid",
    paymentStatusColor: "#ffeaea",
    paymentStatusTextColor: "#ff1a1a",
    statusColor: "#2563eb",
    statusBg: "#eaf1fd",
    products: [],
    orderSummary: [],
    company: {},
    invoice: {},
    customerInfo: {},
    payments: [],
  },
];

const sortOptions = [
  "Last 7 Days",
  "Last 30 Days",
  "This Month",
  "This Year",
];

const customers = [
  "All",
  ...Array.from(new Set(salesData.map((row) => row.customer))),
];
const statuses = ["All", "Completed", "Pending"];
const paymentStatuses = ["All", "Paid", "Unpaid", "Overdue"];

const OnlineOrder = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState(sortOptions[0]);
  const [customer, setCustomer] = useState("All");
  const [status, setStatus] = useState("All");
  const [paymentStatus, setPaymentStatus] = useState("All");

  // Modal states
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showPayments, setShowPayments] = useState(false);
  const [showCreatePayment, setShowCreatePayment] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);

  // Add/Edit form states
  const [formDate, setFormDate] = useState(null);
  const [formReference, setFormReference] = useState("");
  const [formReceived, setFormReceived] = useState("");
  const [formPaying, setFormPaying] = useState("");
  const [formPaymentType, setFormPaymentType] = useState("");
  const [formDescription, setFormDescription] = useState("");

  // Table filter
  const filtered = salesData.filter(
    (row) =>
      (customer === "All" || row.customer === customer) &&
      (status === "All" || row.status === status) &&
      (paymentStatus === "All" || row.paymentStatus === paymentStatus) &&
      (search === "" ||
        row.customer.toLowerCase().includes(search.toLowerCase()) ||
        row.reference.toLowerCase().includes(search.toLowerCase()))
  );

  // PDF Download
  const handlePDF = (sale) => {
    const doc = new jsPDF();
    doc.text("Sales Detail", 14, 16);
    doc.autoTable({
      startY: 22,
      head: [["Product", "Purchase Price($)", "Discount($)", "Tax(%)", "Tax Amount($)", "Unit Cost($)", "Total Cost($)"]],
      body: sale.orderSummary.map((row) => [
        row.name,
        row.price,
        row.discount,
        row.tax,
        row.taxAmount,
        row.unitCost,
        row.total,
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [245, 246, 250], textColor: 60 },
    });
    doc.save("sales_detail.pdf");
  };

  // Action menu
  const handleAction = (action, sale) => {
    setSelectedSale(sale);
    if (action === "detail") setShowDetail(true);
    if (action === "edit") setShowEdit(true);
    if (action === "payments") setShowPayments(true);
    if (action === "createPayment") setShowCreatePayment(true);
    if (action === "pdf") handlePDF(sale);
    if (action === "delete") setShowDelete(true);
  };

  return (
    <div style={{ background: "#f7f7f7", minHeight: "100vh", paddingBottom: 40 }}>
      <Container fluid className="py-4">
        <div style={{ fontWeight: 700, fontSize: 28, marginBottom: 0 }}>
          Sales
        </div>
        <div style={{ color: "#888", fontSize: 17, marginBottom: 24 }}>
          Manage Your Sales
        </div>
        <Card className="mb-4" style={{ borderRadius: 14 }}>
          <Card.Body style={{ background: "#fff", borderRadius: 14 }}>
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-2 gap-2">
         
              <div className="d-flex flex-wrap align-items-center gap-2">
                <Form.Select
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  style={{
                    minWidth: 150,
                    background: "#fff",
                    border: "1px solid #eee",
                    borderRadius: 8,
                    fontSize: 16,
                  }}
                >
                  {customers.map((opt) => (
                    <option key={opt}>{opt === "All" ? "Customer" : opt}</option>
                  ))}
                </Form.Select>
                <Form.Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  style={{
                    minWidth: 120,
                    background: "#fff",
                    border: "1px solid #eee",
                    borderRadius: 8,
                    fontSize: 16,
                  }}
                >
                  {statuses.map((opt) => (
                    <option key={opt}>{opt === "All" ? "Staus" : opt}</option>
                  ))}
                </Form.Select>
                <Form.Select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  style={{
                    minWidth: 160,
                    background: "#fff",
                    border: "1px solid #eee",
                    borderRadius: 8,
                    fontSize: 16,
                  }}
                >
                  {paymentStatuses.map((opt) => (
                    <option key={opt}>{opt === "All" ? "Payment Status" : opt}</option>
                  ))}
                </Form.Select>
                <Form.Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    minWidth: 180,
                    background: "#fff",
                    border: "1px solid #eee",
                    borderRadius: 8,
                    fontSize: 16,
                  }}
                >
                  {sortOptions.map((opt) => (
                    <option key={opt}>{`Sort By : ${opt}`}</option>
                  ))}
                </Form.Select>
          
              </div>
            </div>
            <div style={{ overflowX: "auto" }}>
              <Table
                responsive
                className="align-middle mb-0"
                style={{
                  minWidth: 1100,
                  fontSize: 17,
                  background: "#fff",
                }}
              >
                <thead>
                  <tr>
                    <th>
                      <Form.Check type="checkbox" />
                    </th>
                    <th>Customer</th>
                    <th>Reference</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Grand Total</th>
                    <th>Paid</th>
                    <th>Due</th>
                    <th>Payment Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row, idx) => (
                    <tr key={row.reference + idx}>
                      <td>
                        <Form.Check type="checkbox" />
                      </td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div
                            style={{
                              width: 38,
                              height: 38,
                              borderRadius: 8,
                              background: "#e0e0e0",
                              overflow: "hidden",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 13,
                              color: "#aaa",
                            }}
                          >
                            {row.customerImg ? (
                              <img
                                src={row.customerImg}
                                alt={row.customer}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "contain",
                                }}
                              />
                            ) : (
                              <span style={{ color: "#bbb" }}>{"SGL"}</span>
                            )}
                          </div>
                          <span>{row.customer}</span>
                        </div>
                      </td>
                      <td>{row.reference}</td>
                      <td>{row.date}</td>
                      <td>
                        <span
                          style={{
                            background: row.status === "Completed" ? "#eafaf1" : "#eaf1fd",
                            color: row.status === "Completed" ? "#27ae60" : "#2563eb",
                            fontWeight: 600,
                            borderRadius: 8,
                            padding: "3px 18px",
                            fontSize: 15,
                            display: "inline-block",
                          }}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td>{row.grandTotal}</td>
                      <td>{row.paid}</td>
                      <td>{row.due}</td>
                      <td>
                        <span
                          style={{
                            background: row.paymentStatusColor,
                            color: row.paymentStatusTextColor,
                            fontWeight: 600,
                            borderRadius: 8,
                            padding: "3px 18px",
                            fontSize: 15,
                            display: "inline-block",
                          }}
                        >
                          ● {row.paymentStatus}
                        </span>
                      </td>
                      <td>
                        <Dropdown align="end">
                          <Dropdown.Toggle
                            as="button"
                            style={{
                              background: "none",
                              border: "none",
                              boxShadow: "none",
                              color: "#FFA94D",
                              fontSize: 22,
                              padding: 0,
                            }}
                          >
                            <FaEllipsisV />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleAction("detail", row)}>
                              <FaEye style={{ marginRight: 8 }} />
                              Sale Detail
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleAction("edit", row)}>
                              <FaEdit style={{ marginRight: 8 }} />
                              Edit Sale
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleAction("payments", row)}>
                              <FaMoneyCheckAlt style={{ marginRight: 8 }} />
                              Show Payments
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleAction("createPayment", row)}>
                              <FaRegCreditCard style={{ marginRight: 8 }} />
                              Create Payment
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleAction("pdf", row)}>
                              <FaFilePdf style={{ marginRight: 8 }} />
                              Download pdf
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleAction("delete", row)}>
                              <FaTrash style={{ marginRight: 8 }} />
                              Delete Sale
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={10} className="text-center text-muted">
                        No records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </Container>

      {/* Add/Edit Sale Modal */}
      <Modal
        show={showAdd || showEdit}
        onHide={() => {
          setShowAdd(false);
          setShowEdit(false);
        }}
        size="xl"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{showAdd ? "Add Sales" : "Edit Sale"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ overflowX: "auto" }}>
            <Table
              style={{
                minWidth: 900,
                fontSize: 17,
                background: "#fff",
                marginBottom: 24,
              }}
            >
              <thead>
                <tr>
                  <th style={{ color: "#FFA94D" }}>Product</th>
                  <th style={{ color: "#FFA94D" }}>Qty</th>
                  <th>Purchase Price($)</th>
                  <th>Discount($)</th>
                  <th>Tax(%)</th>
                  <th>Tax Amount($)</th>
                  <th>Unit Cost($)</th>
                  <th>Total Cost(%)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1048/1048926.png"
                        alt="Nike Jordan"
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: 8,
                          background: "#f5f5f5",
                          objectFit: "contain",
                        }}
                      />
                      Nike Jordan
                    </div>
                  </td>
                  <td>
                    <Button size="sm" variant="outline-secondary" style={{ borderRadius: "50%" }}>
                      +
                    </Button>
                    <span style={{ margin: "0 8px" }}>1</span>
                    <Button size="sm" variant="outline-secondary" style={{ borderRadius: "50%" }}>
                      -
                    </Button>
                  </td>
                  <td>2000</td>
                  <td>500</td>
                  <td>0.00</td>
                  <td>0.00</td>
                  <td>0.00</td>
                  <td>1500</td>
                </tr>
                <tr>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1048/1048930.png"
                        alt="Apple Series 5 Watch"
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: 8,
                          background: "#f5f5f5",
                          objectFit: "contain",
                        }}
                      />
                      Apple Series 5 Watch
                    </div>
                  </td>
                  <td>
                    <Button size="sm" variant="outline-secondary" style={{ borderRadius: "50%" }}>
                      +
                    </Button>
                    <span style={{ margin: "0 8px" }}>2</span>
                    <Button size="sm" variant="outline-secondary" style={{ borderRadius: "50%" }}>
                      -
                    </Button>
                  </td>
                  <td>3000</td>
                  <td>400</td>
                  <td>0.00</td>
                  <td>0.00</td>
                  <td>0.00</td>
                  <td>1700</td>
                </tr>
                <tr>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1048/1048932.png"
                        alt="Lobar Handy"
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: 8,
                          background: "#f5f5f5",
                          objectFit: "contain",
                        }}
                      />
                      Lobar Handy
                    </div>
                  </td>
                  <td>
                    <Button size="sm" variant="outline-secondary" style={{ borderRadius: "50%" }}>
                      +
                    </Button>
                    <span style={{ margin: "0 8px" }}>2</span>
                    <Button size="sm" variant="outline-secondary" style={{ borderRadius: "50%" }}>
                      -
                    </Button>
                  </td>
                  <td>2500</td>
                  <td>500</td>
                  <td>0.00</td>
                  <td>0.00</td>
                  <td>0.00</td>
                  <td>2000</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Customer Name <span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Select>
                  <option>Select</option>
                  <option>Carl Evans</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Date <span style={{ color: "red" }}>*</span></Form.Label>
                <InputGroup>
                  <DatePicker
                    selected={formDate}
                    onChange={setFormDate}
                    className="form-control"
                    placeholderText="Choose"
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Supplier <span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Select>
                  <option>Select</option>
                  <option>Apex Computers</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Product <span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Control placeholder="Please type product code and select" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Order Tax <span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Control defaultValue="0" />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Discount <span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Control defaultValue="0" />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Shipping <span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Control defaultValue="0" />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Status <span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Select>
                  <option>Select</option>
                  <option>Completed</option>
                  <option>Pending</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="secondary" onClick={() => { setShowAdd(false); setShowEdit(false); }}>
              Cancel
            </Button>
            <Button style={{ background: "#FFA94D", border: "none" }}>
              Submit
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Sale Detail Modal */}
      <Modal show={showDetail} onHide={() => setShowDetail(false)} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>Sales Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSale && (
            <>
              <Row>
                <Col md={4}>
                  <div style={{ fontWeight: 700, fontSize: 20 }}>Customer Info</div>
                  <div style={{ fontWeight: 600 }}>{selectedSale.customerInfo?.name || selectedSale.customer}</div>
                  <div style={{ color: "#888" }}>{selectedSale.customerInfo?.address}</div>
                  <div style={{ color: "#888" }}>{selectedSale.customerInfo?.email}</div>
                  <div style={{ color: "#888" }}>{selectedSale.customerInfo?.phone}</div>
                </Col>
                <Col md={4}>
                  <div style={{ fontWeight: 700, fontSize: 20 }}>Company Info</div>
                  <div style={{ fontWeight: 600 }}>{selectedSale.company?.name || "DGT"}</div>
                  <div style={{ color: "#888" }}>{selectedSale.company?.address}</div>
                  <div style={{ color: "#888" }}>{selectedSale.company?.email}</div>
                  <div style={{ color: "#888" }}>{selectedSale.company?.phone}</div>
                </Col>
                <Col md={4}>
                  <div style={{ fontWeight: 700, fontSize: 20 }}>Invoice Info</div>
                  <div>
                    Reference: <span style={{ color: "#FFA94D", fontWeight: 600 }}>{selectedSale.invoice?.reference || "#SL0101"}</span>
                  </div>
                  <div>Reference: {selectedSale.invoice?.date || "Dec 24, 2024"}</div>
                  <div>
                    Status:{" "}
                    <span
                      style={{
                        background: "#eafaf1",
                        color: "#27ae60",
                        fontWeight: 600,
                        borderRadius: 8,
                        padding: "3px 12px",
                        fontSize: 15,
                        display: "inline-block",
                      }}
                    >
                      Completed
                    </span>
                  </div>
                  <div>
                    Payment Status:{" "}
                    <span
                      style={{
                        background: "#eafaf1",
                        color: "#27ae60",
                        fontWeight: 600,
                        borderRadius: 8,
                        padding: "3px 12px",
                        fontSize: 15,
                        display: "inline-block",
                      }}
                    >
                      ● Paid
                    </span>
                  </div>
                </Col>
              </Row>
              <div style={{ fontWeight: 700, fontSize: 18, margin: "24px 0 10px" }}>
                Order Summary
              </div>
              <div style={{ overflowX: "auto" }}>
                <Table style={{ minWidth: 900, fontSize: 17, background: "#fff" }}>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Purchase Price($)</th>
                      <th>Discount($)</th>
                      <th>Tax(%)</th>
                      <th>Tax Amount($)</th>
                      <th>Unit Cost($)</th>
                      <th>Total Cost($)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedSale.orderSummary.map((row, idx) => (
                      <tr key={row.name + idx}>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <img
                              src={row.img}
                              alt={row.name}
                              style={{
                                width: 38,
                                height: 38,
                                borderRadius: 8,
                                background: "#f5f5f5",
                                objectFit: "contain",
                              }}
                            />
                            {row.name}
                          </div>
                        </td>
                        <td>{row.price}</td>
                        <td>{row.discount}</td>
                        <td>{row.tax.toFixed(2)}</td>
                        <td>{row.taxAmount.toFixed(2)}</td>
                        <td>{row.unitCost.toFixed(2)}</td>
                        <td>{row.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <Row className="mt-4">
                <Col md={6}></Col>
                <Col md={6}>
                  <Table>
                    <tbody>
                      <tr>
                        <td>Order Tax</td>
                        <td>$ 0.00</td>
                      </tr>
                      <tr>
                        <td>Discount</td>
                        <td>$ 0.00</td>
                      </tr>
                      <tr>
                        <td>Grand Total</td>
                        <td>$ 5200.00</td>
                      </tr>
                      <tr>
                        <td>Paid</td>
                        <td>$ 5200.00</td>
                      </tr>
                      <tr>
                        <td>Due</td>
                        <td>$ 0.00</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </>
          )}
        </Modal.Body>
      </Modal>

      {/* Show Payments Modal */}
      <Modal show={showPayments} onHide={() => setShowPayments(false)} centered>
        <Modal.Header>
          <Modal.Title>Show Payments</Modal.Title>
          <Button
            variant="link"
            style={{ color: "#ff1a1a", fontSize: 22, marginLeft: "auto" }}
            onClick={() => setShowPayments(false)}
          >
            <FaTimes />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Reference</th>
                <th>Amount</th>
                <th>Paid By</th>
              </tr>
            </thead>
            <tbody>
              {selectedSale?.payments?.map((p, idx) => (
                <tr key={p.reference + idx}>
                  <td>{p.date}</td>
                  <td>{p.reference}</td>
                  <td>{p.amount}</td>
                  <td>{p.paidBy}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div
            style={{
              height: 6,
              background: "#ffe6c7",
              borderRadius: 4,
              marginTop: 12,
              width: "80%",
              marginLeft: 10,
            }}
          >
            <div
              style={{
                width: "60%",
                height: "100%",
                background: "#FFA94D",
                borderRadius: 4,
              }}
            ></div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Create Payment Modal */}
      <Modal show={showCreatePayment} onHide={() => setShowCreatePayment(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Date <span style={{ color: "red" }}>*</span></Form.Label>
                <InputGroup>
                  <DatePicker
                    selected={formDate}
                    onChange={setFormDate}
                    className="form-control"
                    placeholderText="Choose Date"
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Reference <span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Control value={formReference} onChange={e => setFormReference(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Received Amount <span style={{ color: "red" }}>*</span></Form.Label>
                <InputGroup>
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control value={formReceived} onChange={e => setFormReceived(e.target.value)} />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Paying Amount <span style={{ color: "red" }}>*</span></Form.Label>
                <InputGroup>
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control value={formPaying} onChange={e => setFormPaying(e.target.value)} />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Payment type <span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Select value={formPaymentType} onChange={e => setFormPaymentType(e.target.value)}>
                  <option>Select</option>
                  <option>Cash</option>
                  <option>Card</option>
                  <option>UPI</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            {/* <ReactQuill value={formDescription} onChange={setFormDescription} /> */}
            <div style={{ color: "#888", fontSize: 14, marginTop: 4 }}>
              Maximum 60 Characters
            </div>
          </Form.Group>
          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="secondary" onClick={() => setShowCreatePayment(false)}>
              Cancel
            </Button>
            <Button style={{ background: "#FFA94D", border: "none" }}>
              Submit
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Delete Sale Modal */}
      <Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
        <Modal.Body className="text-center py-5">
          <div
            style={{
              background: "#fff0f0",
              borderRadius: "50%",
              width: 70,
              height: 70,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 18px",
            }}
          >
            <FaTrash size={36} color="#ff1a1a" />
          </div>
          <div style={{ fontWeight: 700, fontSize: 28, marginBottom: 8 }}>
            Delete Sale
          </div>
          <div style={{ color: "#444", fontSize: 18, marginBottom: 28 }}>
            Are you sure you want to delete salent?
          </div>
          <div className="d-flex justify-content-center gap-3">
            <Button
              style={{
                background: "#0a2342",
                border: "none",
                fontWeight: 500,
                fontSize: 18,
                minWidth: 120,
              }}
              onClick={() => setShowDelete(false)}
            >
              No, Cancel
            </Button>
            <Button
              style={{
                background: "#FFA94D",
                border: "none",
                fontWeight: 500,
                fontSize: 18,
                minWidth: 120,
              }}
              onClick={() => setShowDelete(false)}
            >
              Yes, Delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OnlineOrder;