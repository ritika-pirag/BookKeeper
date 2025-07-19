import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Container,
  Row,
  Col,
  Form,
  Card,
  InputGroup,
} from "react-bootstrap";
import { FaTrash, FaDownload, FaEye, FaEdit, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const invoices = [
  { id: 1083, customer: "Shawn Hoowod", date: "15-07-2025", amount: 0.0, status: "Due" },
  { id: 1082, customer: "Shawn Hoowod", date: "15-07-2025", amount: 0.0, status: "Due" },
  { id: 1081, customer: "Elijah Allan", date: "15-07-2025", amount: 890.0, status: "Paid" },
  { id: 1080, customer: "Jere Swayne", date: "15-07-2025", amount: 2085.12, status: "Partial" },
  { id: 1075, customer: "Prince Stamper", date: "12-07-2025", amount: 91.27, status: "Due" },
];

const getStatusVariant = (status) => {
  switch (status) {
    case "Paid":
      return "success";
    case "Due":
      return "danger";
    case "Partial":
      return "primary";
    default:
      return "secondary";
  }
};

const Invoice = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    customer: "",
    issueDate: "",
    invoiceNumber: "#INVO00010",
    refNumber: "",
    dueDate: "",
    category: "",
    items: [{
      item: "",
      quantity: 1,
      price: 0,
      discount: 0,
      tax: 0,
      amount: 0
    }],
    subTotal: 0,
    totalDiscount: 0,
    totalTax: 0,
    totalAmount: 0
  });

  const handleDelete = (invoice) => {
    setSelectedInvoice(invoice);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    alert(`Deleted invoice #${selectedInvoice.id}`);
    setShowDeleteModal(false);
  };

  const handleDownload = (invoice) => {
    const blob = new Blob([`Invoice PDF for ${invoice.customer}`], {
      type: "application/pdf",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Invoice_${invoice.id}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;
    
    // Calculate amount
    updatedItems[index].amount = updatedItems[index].quantity * updatedItems[index].price;
    
    setFormData(prev => ({
      ...prev,
      items: updatedItems
    }));
  };

  const addNewItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, {
        item: "",
        quantity: 1,
        price: 0,
        discount: 0,
        tax: 0,
        amount: 0
      }]
    }));
  };

  return (
    <div className="p-4 mt-2">
      <Row className="g-4">
        <Col md={12}>
          <Card className="rounded-3 p-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="fw-semibold mb-0">Invoices</h6>
              <div>
                <Button 
                  variant="primary" 
                  size="" 
                  onClick={() => setShowCreateModal(true)}
                  className="me-2"
                >
                  <FaPlus className="me-1" /> Create Invoice
                </Button>
             
              </div>
            </div>

            <Row className="mb-3 align-items-center">
              <Col md={6} sm={12}>
                <Form.Group controlId="entriesPerPage" className="d-flex align-items-center">
                  <Form.Label className="me-2 mb-0">Show</Form.Label>
                  <Form.Select
                    size="sm"
                    style={{ width: "80px", marginRight: "10px" }}
                    defaultValue="10"
                  >
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                  </Form.Select>
                  <span className="mb-0">entries</span>
                </Form.Group>
              </Col>
              <Col md={6} sm={12} className="text-md-end mt-2 mt-md-0">
                <Form.Control
                  type="text"
                  placeholder="Search..."
                  style={{ maxWidth: "200px", display: "inline-block" }}
                />
              </Col>
            </Row>

            <div className="table-responsive">
              <Table bordered hover className="mt-3 mb-0">
                <thead className="table-light">
                  <tr>
                    <th>No</th>
                    <th>#</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice, index) => (
                    <tr key={invoice.id}>
                      <td>{index + 1}</td>
                      <td>{invoice.id}</td>
                      <td>{invoice.customer}</td>
                      <td>{invoice.date}</td>
                      <td>${invoice.amount.toFixed(2)}</td>
                      <td>
                        <span className={`badge bg-${getStatusVariant(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-2 justify-content-center">
                          <Button
                            variant="outline-info"
                            size="sm"
                            onClick={() => navigate("/company/viewinvoicee")}
                          >
                            <FaEye size={16}/>
                          </Button>
                          <Button 
                            variant="outline-warning" 
                            size="sm" 
                            onClick={() => {/* Edit functionality */}}
                          >
                            <FaEdit size={16}/>
                          </Button>
                          <Button 
                            variant="outline-primary" 
                            size="sm" 
                            onClick={() => handleDownload(invoice)}
                          >
                            <FaDownload size={16}/>
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm" 
                            onClick={() => handleDelete(invoice)}
                          >
                            <FaTrash size={16}/>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-between align-items-center mt-3 px-3">
              <span className="small text-muted">
                Showing 1 to {invoices.length} of {invoices.length} results
              </span>

              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className="page-item disabled">
                    <button className="page-link rounded-start">&laquo;</button>
                  </li>
                  <li className="page-item active">
                    <button
                      className="page-link"
                      style={{ backgroundColor: '#3daaaa', borderColor: '#3daaaa' }}
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
          </Card>
        </Col>
      </Row>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete invoice #{selectedInvoice?.id}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Create Invoice Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} size="xll" centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
  <Row className="mb-3">
    <Col md={8}>
      <Form.Group>
        <Form.Label className="fw-semibold">Customer*</Form.Label>
        <InputGroup>
          <Form.Select 
            name="customer" 
            value={formData.customer} 
            onChange={handleInputChange}
            className="border-end-0"
          >
            <option>Select Customer</option>
            {invoices.map(inv => (
              <option key={inv.id} value={inv.customer}>{inv.customer}</option>
            ))}
          </Form.Select>
          <Button 
            variant="outline-secondary" 
            size="sm"
            className="border-start-0"
            onClick={() => {/* Open customer creation modal */}}
          >
            <FaPlus size={12} />
          </Button>
        </InputGroup>
      </Form.Group>
    </Col>
    <Col md={4}>
      <Form.Group>
        <Form.Label className="fw-semibold">Invoice Number*</Form.Label>
        <Form.Control 
          type="text" 
          name="invoiceNumber" 
          value={formData.invoiceNumber} 
          onChange={handleInputChange} 
          readOnly
        />
      </Form.Group>
    </Col>
  </Row>

  <Row className="mb-3">
    <Col md={3}>
      <Form.Group>
        <Form.Label className="fw-semibold">Issue Date*</Form.Label>
        <Form.Control 
          type="date" 
          name="issueDate" 
          value={formData.issueDate} 
          onChange={handleInputChange} 
        />
      </Form.Group>
    </Col>
    <Col md={3}>
      <Form.Group>
        <Form.Label className="fw-semibold">Due Date*</Form.Label>
        <Form.Control 
          type="date" 
          name="dueDate" 
          value={formData.dueDate} 
          onChange={handleInputChange} 
        />
      </Form.Group>
    </Col>
    <Col md={3}>
      <Form.Group>
        <Form.Label className="fw-semibold">Ref Number</Form.Label>
        <Form.Control 
          type="text" 
          name="refNumber" 
          value={formData.refNumber} 
          onChange={handleInputChange} 
          placeholder="Optional" 
        />
      </Form.Group>
    </Col>
    <Col md={3}>
      <Form.Group>
        <Form.Label className="fw-semibold">Category</Form.Label>
        <InputGroup>
          <Form.Select 
            name="category" 
            value={formData.category} 
            onChange={handleInputChange}
            className="border-end-0"
          >
            <option>Select Category</option>
            <option>Service</option>
            <option>Product</option>
          </Form.Select>
          <Button 
            variant="outline-secondary" 
            size="sm"
            className="border-start-0"
            onClick={() => {/* Open category creation modal */}}
          >
            <FaPlus size={12} />
          </Button>
        </InputGroup>
      </Form.Group>
    </Col>
  </Row>

  {/* Tax Toggle */}
  <Row className="mb-3">
    <Col md={12}>
      <Form.Group className="d-flex align-items-center">
        <Form.Label className="fw-semibold me-3">Tax Status</Form.Label>
        <Button
          variant={formData.taxEnabled ? "primary" : "outline-secondary"}
          size="sm"
          onClick={() => setFormData({...formData, taxEnabled: !formData.taxEnabled})}
          className="me-2"
        >
          {formData.taxEnabled ? "ON" : "OFF"}
        </Button>
        <span className="small text-muted">
          {formData.taxEnabled ? "Tax will be applied" : "Tax excluded"}
        </span>
      </Form.Group>
    </Col>
  </Row>

  {/* Items Table */}
  <h6 className="fw-semibold mb-3">Product & Services*</h6>
  <div className="table-responsive">
    <Table bordered className="mb-3">
      <thead className="table-light">
        <tr>
          <th width="30%">ITEMS*</th>
          <th width="10%">QTY*</th>
          <th width="15%">PRICE*</th>
          <th width="15%">DISCOUNT*</th>
          {formData.taxEnabled && <th width="10%">TAX (%)</th>}
          <th width="15%">AMOUNT</th>
          <th width="5%"></th>
        </tr>
      </thead>
      <tbody>
        {formData.items.map((item, index) => (
          <tr key={index}>
            <td>
              <Form.Control 
                type="text" 
                value={item.item} 
                onChange={(e) => handleItemChange(index, 'item', e.target.value)}
                placeholder="Item name or description"
              />
            </td>
            <td>
              <Form.Control 
                type="number" 
                min="1"
                value={item.quantity} 
                onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 1)} 
              />
            </td>
            <td>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control 
                  type="number" 
                  min="0"
                  step="0.01"
                  value={item.price} 
                  onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value) || 0)} 
                />
              </InputGroup>
            </td>
            <td>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control 
                  type="number" 
                  min="0"
                  step="0.01"
                  value={item.discount} 
                  onChange={(e) => handleItemChange(index, 'discount', parseFloat(e.target.value) || 0)} 
                />
              </InputGroup>
            </td>
            {formData.taxEnabled && (
              <td>
                <InputGroup>
                  <Form.Control 
                    type="number" 
                    min="0"
                    max="100"
                    value={item.tax} 
                    onChange={(e) => handleItemChange(index, 'tax', parseFloat(e.target.value) || 0)} 
                  />
                  <InputGroup.Text>%</InputGroup.Text>
                </InputGroup>
              </td>
            )}
            <td className="align-middle">${item.amount.toFixed(2)}</td>
            <td className="align-middle text-center">
              <Button 
                variant="outline-danger" 
                size="sm"
                onClick={() => removeItem(index)}
                disabled={formData.items.length <= 1}
              >
                <FaTrash size={12} />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>

  <Button 
    variant="outline-primary" 
    size="sm"
    onClick={addNewItem}
    className="mb-3"
  >
    <FaPlus className="me-1" /> Add item
  </Button>

  <Form.Group className="mb-4">
    <Form.Label className="fw-semibold">Notes</Form.Label>
    <Form.Control 
      as="textarea" 
      rows={3} 
      placeholder="Additional notes or terms..."
    />
  </Form.Group>

  {/* Totals Section */}
  <Card className="border-0 bg-light">
    <Card.Body className="p-3">
      <Row>
        <Col md={{ span: 4, offset: 8 }}>
          <div className="d-flex justify-content-between mb-2">
            <span className="fw-semibold">Subtotal:</span>
            <span>${formData.subTotal.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="fw-semibold">Discount:</span>
            <span className="text-danger">-${formData.totalDiscount.toFixed(2)}</span>
          </div>
          {formData.taxEnabled && (
            <div className="d-flex justify-content-between mb-2">
              <span className="fw-semibold">Tax ({formData.items.reduce((sum, item) => sum + item.tax, 0)/formData.items.length || 0}%):</span>
              <span>${formData.totalTax.toFixed(2)}</span>
            </div>
          )}
          <div className="d-flex justify-content-between fw-bold fs-5 border-top pt-2 mt-2">
            <span>Total:</span>
            <span>${formData.totalAmount.toFixed(2)}</span>
          </div>
        </Col>
      </Row>
    </Card.Body>
  </Card>
</Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {
            alert('Invoice created successfully!');
            setShowCreateModal(false);
          }}>
            Create Invoice
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Invoice;