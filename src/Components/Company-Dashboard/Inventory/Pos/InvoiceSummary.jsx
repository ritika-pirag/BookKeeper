import { useState } from "react";
import { Container, Row, Col, Button, Table, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const InvoiceSummary = () => {
  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);
  const [show, setShow] = useState(false);
  const [amounts, setAmounts] = useState({ cash: 0, eftpos: 0, afterpay: 0 });

  // Make invoiceData stateful for editing
  const [invoiceData, setInvoiceData] = useState({
    customerName: "Amit Sharma",
    productDetails: [
      { name: "Smartphone", quantity: 2, price: 150 },
      { name: "Screen Protector", quantity: 3, price: 10 },
    ],
    taxName: "GST",
    taxValue: 10,
  });
  const customerList = [
    "Amit Sharma",
    "Neha Verma",
    "Rahul Kumar",
    "Priya Singh",
    "Suresh Yadav"
  ];
  
  // Calculate subtotal and total based on current product details
  const calculateSubTotal = () => {
    return invoiceData.productDetails.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
  };

  const subTotal = calculateSubTotal();
  const total = subTotal + (subTotal * invoiceData.taxValue) / 100;
  const totalPaid = (amounts.cash || 0) + (amounts.eftpos || 0) + (amounts.afterpay || 0);

  const handleAmountChange = (e, type) => {
    const value = parseFloat(e.target.value) || 0;
    setAmounts((prev) => ({ ...prev, [type]: value }));
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...invoiceData.productDetails];
    updatedProducts[index][field] =
      field === "quantity" || field === "price" ? parseFloat(value) || 0 : value;
    setInvoiceData((prev) => ({ ...prev, productDetails: updatedProducts }));
  };

  return (
    <Container>
      <div className="d-flex justify-content-start mt-3">
  <Button variant="" onClick={() => navigate("/company/ponitofsale")}>
    ← Back
  </Button>
</div>

      <h3 className="text-center mb-4">Invoice Summary</h3>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button
          variant={isEditMode ? "warning" : "primary"}
          onClick={() => setIsEditMode(!isEditMode)}
        >
          {isEditMode ? "Save & Preview Invoice" : "Edit Invoice Info"}
        </Button>

      

        <div className="d-flex gap-2">
  <Button variant="success" onClick={() => setShow(true)}>
    Confirm
  </Button>
  <Button variant="outline-danger" onClick={() => navigate("/company/ponitofsale")}>
    Cancel
  </Button>
</div>


        
      </div>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Invoice Actions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="primary" className="m-2">Print Invoice</Button>
          <Button variant="success" className="m-2">Email Invoice</Button>
        </Modal.Body>
      </Modal>

      <div className="p-4 border rounded bg-white" style={{ minHeight: "85vh" }}>
        <Row>
          <Col md={6} className="mb-4">
            <h5>Customer Details</h5>
            <Form.Group className="mb-3">
  <Form.Label><strong>Customer Name</strong></Form.Label>
  <Form.Control
    type="text"
    list="customers"
    placeholder="Search or enter customer name..."
    value={invoiceData.customerName}
    onChange={(e) =>
      setInvoiceData((prev) => ({ ...prev, customerName: e.target.value }))
    }
  />
  <datalist id="customers">
    {customerList.map((name, idx) => (
      <option key={idx} value={name} />
    ))}
  </datalist>
</Form.Group>


            <h5 className="mt-4">Company Info</h5>
            <p><strong>Company Name:</strong> Demo Pvt Ltd</p>
            <p><strong>Email:</strong> demo@example.com</p>
            <p><strong>Phone:</strong> 9876543210</p>
            <p><strong>Address:</strong> 123 Demo Street</p>
          </Col>

          <Col md={6}>
            <h5>Invoice Details</h5>

            <Table bordered responsive className="mb-4">
              <thead className="bg-light">
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.productDetails.map((item, index) => (
                  <tr key={index}>
                    <td>
                      {isEditMode ? (
                        <Form.Control
                          type="text"
                          value={item.name}
                          onChange={(e) =>
                            handleProductChange(index, "name", e.target.value)
                          }
                        />
                      ) : (
                        item.name
                      )}
                    </td>
                    <td>
                      {isEditMode ? (
                        <Form.Control
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleProductChange(index, "quantity", e.target.value)
                          }
                        />
                      ) : (
                        item.quantity
                      )}
                    </td>
                    <td>
                      {isEditMode ? (
                        <Form.Control
                          type="number"
                          value={item.price}
                          onChange={(e) =>
                            handleProductChange(index, "price", e.target.value)
                          }
                        />
                      ) : (
                        `A$${item.price}`
                      )}
                    </td>
                    <td>A${(item.quantity * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Table bordered responsive>
              <tbody>
                <tr>
                  <td><strong>Subtotal:</strong></td>
                  <td>A${subTotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td><strong>Tax ({invoiceData.taxName}):</strong></td>
                  <td>A${(total - subTotal).toFixed(2)}</td>
                </tr>
                <tr className="table-success">
                  <td><strong>Total:</strong></td>
                  <td>A${total.toFixed(2)}</td>
                </tr>
              </tbody>
            </Table>

            <div className="mt-4">
              <h6 className="mb-2 fw-bold">Payment Received</h6>
              <Form.Group className="mb-2">
                <Form.Label>Cash</Form.Label>
                <Form.Control
                  type="number"
                  value={amounts.cash}
                  onChange={(e) => handleAmountChange(e, "cash")}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Eftpos</Form.Label>
                <Form.Control
                  type="number"
                  value={amounts.eftpos}
                  onChange={(e) => handleAmountChange(e, "eftpos")}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>AfterPay</Form.Label>
                <Form.Control
                  type="number"
                  value={amounts.afterpay}
                  onChange={(e) => handleAmountChange(e, "afterpay")}
                />
              </Form.Group>
            </div>

            <Table bordered responsive className="mt-3">
              <tbody>
                <tr>
                  <td><strong>Total Paid:</strong></td>
                  <td>A${totalPaid.toFixed(2)}</td>
                </tr>
                <tr>
                  <td><strong>Due Amount:</strong></td>
                  <td>A${(total - totalPaid).toFixed(2)}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default InvoiceSummary;
