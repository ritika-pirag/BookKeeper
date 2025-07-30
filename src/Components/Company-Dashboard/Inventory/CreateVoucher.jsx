import React, { useState } from "react";
import { Tabs, Tab, Button, Row, Col, Form } from "react-bootstrap";
import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const CreateVoucher = () => {
  const [activeTab, setActiveTab] = useState("sales");
  const navigate = useNavigate();

  const voucherData = [
    {
      itemName: "Voucher Item 1",
      hsn: "1234",
      quantity: 10,
    amount: 100,

      status: "In Stock",
    },
    {
      itemName: "Voucher Item 2",
      hsn: "5678",
      quantity: 0,
    amount: 200,

      status: "Out of Stock",
    },
  ];

  const [salesSearchTerm, setSalesSearchTerm] = useState("");
  const [purchaseSearchTerm, setPurchaseSearchTerm] = useState("");

  const filteredSales = voucherData.filter((item) =>
    item.itemName.toLowerCase().includes(salesSearchTerm.toLowerCase())
  );

  const filteredPurchase = voucherData.filter((item) =>
    item.itemName.toLowerCase().includes(purchaseSearchTerm.toLowerCase())
  );

  return (
    <div className="mt-4 p-3">
      <Row className="align-items-center mb-3">
        <Col md={12}>
          <h4 className="fw-bold mb-0">Create Voucher</h4>
        </Col>
      </Row>

      <Row className="align-items-center mb-3">
        <Col md={6}>
          <Tabs
            id="voucher-tabs"
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-0"
          >
            <Tab eventKey="sales" title="Sales Voucher" />
            <Tab eventKey="purchase" title="Purchase Voucher" />
          </Tabs>
        </Col>

        <Col md={6} className="text-end">
        {activeTab === "sales" ? (
  <Button
    style={{
      backgroundColor: '#27b2b6',
      border: 'none',
      color: '#fff',
      padding: '6px 16px',
    }}
    onClick={() => navigate("/company/salesvoucher")}
  >
    Add Sales Voucher
  </Button>
) : (
  <Button
    style={{
      backgroundColor: '#27b2b6',
      border: 'none',
      color: '#fff',
      padding: '6px 16px',
    }}
    onClick={() => navigate("/company/purchasevoucher")}
  >
    Add Purchase Voucher
  </Button>
)}

        </Col>
      </Row>

      {activeTab === "sales" && (
        <>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Search sales voucher..."
                className="rounded-pill"
                value={salesSearchTerm}
                onChange={(e) => setSalesSearchTerm(e.target.value)}
              />
            </Col>
          </Row>
          <div className="card bg-white rounded-3 p-3">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>HSN</th>
                    <th>Quantity</th>
                    <th>Amount</th>
  
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSales.length > 0 ? (
                    filteredSales.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.itemName}</td>
                        <td>{item.hsn}</td>
                        <td>{item.quantity}</td>
                        <td>{item.amount}</td>
       
                        <td>
                          <span
                            className={`badge px-3 py-1 rounded-pill fw-semibold ${
                              item.status === "In Stock"
                                ? "bg-success text-white"
                                : "bg-danger text-white"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td>
                                  <div className="d-flex gap-2">
                                  <Button
  variant="link"
  className="text-info p-0"
  onClick={() => navigate("/company/salesvoucherview")}
>
  <FaEye />
</Button>

                                    {/* <Button variant="link" className="text-warning p-0" ><FaEdit /></Button> */}
                                    <Button variant="link" className="text-danger p-0" ><FaTrash /></Button>
                                  </div>
                                </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No items found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeTab === "purchase" && (
        <>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Search purchase voucher..."
                className="rounded-pill"
                value={purchaseSearchTerm}
                onChange={(e) => setPurchaseSearchTerm(e.target.value)}
              />
            </Col>
          </Row>
          <div className="card bg-white rounded-3 p-3">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>HSN</th>
                    <th>Quantity</th>
                    <th>Amount</th>
       
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPurchase.length > 0 ? (
                    filteredPurchase.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.itemName}</td>
                        <td>{item.hsn}</td>
                        <td>{item.quantity}</td>
                        <td>{item.amount}</td>
            
                        <td>
                          <span
                            className={`badge px-3 py-1 rounded-pill fw-semibold ${
                              item.status === "In Stock"
                                ? "bg-success text-white"
                                : "bg-danger text-white"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                  
                        <td>
                                  <div className="d-flex gap-2">
                                  <Button
  variant="link"
  className="text-info p-0"
  onClick={() => navigate("/company/purchasevoucherview")}
>
  <FaEye />
</Button>

                                    {/* <Button variant="link" className="text-warning p-0" ><FaEdit /></Button> */}
                                    <Button variant="link" className="text-danger p-0" ><FaTrash /></Button>
                                  </div>
                                </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No items found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateVoucher;
