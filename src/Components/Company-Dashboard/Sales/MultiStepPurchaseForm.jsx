





















import React, { useState, useRef } from 'react';
import { Tabs, Tab, Form, Button, Table, Row, Col, InputGroup } from 'react-bootstrap';
import html2pdf from 'html2pdf.js';
import * as XLSX from 'xlsx';
import './MultiStepPurchaseForm.css';

const MultiStepPurchaseForm = ({ onSubmit, initialData, initialStep }) => {
  const [key, setKey] = useState(initialStep || 'quotation');
  const formRef = useRef();

  // --- Form Data State ---
  const [formData, setFormData] = useState(() => ({
    quotation: {
      companyName: '',
      companyEmail: '',
      companyPhone: '',
      companyAddress: '',
      quotationNo: '',
      quotationDate: '',
      image: '',
      validDate: '',
      billToName: '',
      billToAddress: '',
      billToEmail: '',
      billToPhone: '',
      items: [{ name: '', qty: '', rate: '' }],
      terms: '',
    },
    salesOrder: {
      quotationNo: '',
      orderNo: '',
      orderDate: '',
      deliveryDate: '',
      customerName: '',
      customerAddress: '',
      customerEmail: '',
      customerPhone: '',
      items: [{ name: '', qty: '', rate: '' }],
      terms: '',
    },
    invoice: {
      orderNo: '',
      invoiceNo: '',
      invoiceDate: '',
      dueDate: '',
      companyName: '',
      companyAddress: '',
      companyEmail: '',
      companyPhone: '',
      customerName: '',
      customerAddress: '',
      customerEmail: '',
      customerPhone: '',
      items: [{ description: '', rate: '', qty: '', tax: '', discount: '', amount: '' }],
      paymentStatus: '',
      paymentMethod: '',
      note: '',
      terms: '',
    },
    payment: {
      invoiceNo: '',
      paymentDate: '',
      amount: '',
      paymentMethod: '',
      paymentStatus: '',
      note: '',
    },
  }));

  // --- Handlers ---
  const handleChange = (tab, field, value) => {
    setFormData(prev => ({
      ...prev,
      [tab]: { ...prev[tab], [field]: value },
    }));
  };

  const handleItemChange = (tab, index, field, value) => {
    const updatedItems = [...formData[tab].items];
    updatedItems[index][field] = value;
    setFormData(prev => ({
      ...prev,
      [tab]: { ...prev[tab], items: updatedItems },
    }));
  };

  const addItem = (tab) => {
    setFormData(prev => ({
      ...prev,
      [tab]: {
        ...prev[tab],
        items: [...prev[tab].items, tab === 'invoice'
          ? { description: '', rate: '', qty: '', tax: '', discount: '', amount: '' }
          : { name: '', qty: '', rate: '' }],
      },
    }));
  };

  const removeItem = (tab, index) => {
    const updatedItems = [...formData[tab].items];
    updatedItems.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      [tab]: { ...prev[tab], items: updatedItems },
    }));
  };

  const calculateTotalAmount = (items) => {
    if (!items || !items.length) return '0.00';
    return items.reduce((total, item) => {
      if (item.qty && item.rate) {
        return total + (parseFloat(item.qty) * parseFloat(item.rate) || 0);
      }
      if (item.amount) {
        return total + parseFloat(item.amount);
      }
      return total;
    }, 0).toFixed(2);
  };

  // --- Top Buttons ---
  const handlePrint = () => window.print();
  const handleSend = () => window.location.href = "mailto:?subject=Sales Quotation&body=Please find attached.";
  const handleDownloadPDF = () => {
    const element = formRef.current;
    html2pdf().from(element).save('sales-form.pdf');
  };
  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(formData.quotation.items);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Quotation");
    XLSX.writeFile(workbook, `quotation-${formData.quotation.quotationNo}.xlsx`);
  };

  // --- Navigation Buttons ---
  const handleSkip = () => setKey(key === 'quotation' ? 'salesOrder' : key === 'salesOrder' ? 'invoice' : key === 'invoice' ? 'payment' : 'quotation');
  const handleSaveDraft = () => onSubmit(formData, key);
  const handleSaveNext = () => {
    handleSaveDraft();
    handleSkip();
  };
  const handleNext = () => setKey(key === 'quotation' ? 'salesOrder' : key === 'salesOrder' ? 'invoice' : key === 'invoice' ? 'payment' : 'quotation');
  const handleFinalSubmit = () => onSubmit(formData, 'payment');

  // --- Render Items Table ---
  const renderItemsTable = (tab) => (
    <Table striped bordered>
      <thead>
        <tr>
          {tab === 'invoice'
            ? <>
                <th>Description</th>
                <th>Rate</th>
                <th>Qty</th>
                <th>Tax</th>
                <th>Discount</th>
                <th>Amount</th>
                <th>Action</th>
              </>
            : <>
                <th>Product Name</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Action</th>
              </>
          }
        </tr>
      </thead>
      <tbody>
        {formData[tab].items.map((item, idx) => (
          <tr key={idx}>
            {tab === 'invoice'
              ? <>
                  <td>
                    <Form.Control
                      type="text"
                      value={item.description}
                      onChange={(e) => handleItemChange(tab, idx, 'description', e.target.value)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      value={item.rate}
                      onChange={(e) => handleItemChange(tab, idx, 'rate', e.target.value)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      value={item.qty}
                      onChange={(e) => handleItemChange(tab, idx, 'qty', e.target.value)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      value={item.tax}
                      onChange={(e) => handleItemChange(tab, idx, 'tax', e.target.value)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      value={item.discount}
                      onChange={(e) => handleItemChange(tab, idx, 'discount', e.target.value)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      value={item.amount}
                      onChange={(e) => handleItemChange(tab, idx, 'amount', e.target.value)}
                    />
                  </td>
                </>
              : <>
                  <td>
                    <Form.Control
                      type="text"
                      value={item.name}
                      onChange={(e) => handleItemChange(tab, idx, 'name', e.target.value)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      value={item.qty}
                      onChange={(e) => handleItemChange(tab, idx, 'qty', e.target.value)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      value={item.rate}
                      onChange={(e) => handleItemChange(tab, idx, 'rate', e.target.value)}
                    />
                  </td>
                </>
            }
            <td>
              <Button variant="danger" onClick={() => removeItem(tab, idx)} size="sm">
                Delete
              </Button>
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan={tab === 'invoice' ? 7 : 4} className="text-end">
            <Button size="sm" onClick={() => addItem(tab)}
              style={{ backgroundColor: "#53b2a5", border: "none", padding: "8px 16px" }}>
              + Add Product
            </Button>
          </td>
        </tr>
      </tbody>
    </Table>
  );

  return (
    <div className="container-fluid mt-4 px-4" ref={formRef} >
      <h4 className="text-center mb-4">Sales Process</h4>

      {/* Top Buttons */}
      <div className="d-flex justify-content-center gap-2 mb-3">
        <Button variant="warning" style={{ borderRadius: "50px", fontWeight: 600 }} onClick={handlePrint}>Print Preview</Button>
        <Button variant="info" style={{ borderRadius: "50px", fontWeight: 600, color: "#fff" }} onClick={handleSend}>Send</Button>
        <Button variant="success" style={{ borderRadius: "50px", fontWeight: 600 }} onClick={handleDownloadPDF}>Download PDF</Button>
        <Button variant="primary" style={{ borderRadius: "50px", fontWeight: 600 }} onClick={handleDownloadExcel}>Download Excel</Button>
      </div>

      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
        style={{
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
        }}
        fill
      >
        {/* QUOTATION */}
        <Tab eventKey="quotation" title="Quotation">
          <Form>
            <div className="mb-4">
              <h2 className="text-center">SALES QUOTATION</h2>
              <hr style={{ borderColor: "#008000", marginTop: "-10px" }} />
            </div>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.quotation.companyName}
                    onChange={(e) => handleChange('quotation', 'companyName', e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Company Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.quotation.companyAddress}
                    onChange={(e) => handleChange('quotation', 'companyAddress', e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Company Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.quotation.companyEmail}
                    onChange={(e) => handleChange('quotation', 'companyEmail', e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Company Phone</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.quotation.companyPhone}
                    onChange={(e) => handleChange('quotation', 'companyPhone', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Quotation No.</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.quotation.quotationNo}
                    onChange={(e) => handleChange('quotation', 'quotationNo', e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Quotation Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.quotation.quotationDate}
                    onChange={(e) => handleChange('quotation', 'quotationDate', e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Valid Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.quotation.validDate}
                    onChange={(e) => handleChange('quotation', 'validDate', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <h5>BILL TO</h5>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.quotation.billToName}
                    onChange={(e) => handleChange('quotation', 'billToName', e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.quotation.billToAddress}
                    onChange={(e) => handleChange('quotation', 'billToAddress', e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.quotation.billToEmail}
                    onChange={(e) => handleChange('quotation', 'billToEmail', e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.quotation.billToPhone}
                    onChange={(e) => handleChange('quotation', 'billToPhone', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="mt-4">{renderItemsTable('quotation')}</div>
            <Table striped bordered>
              <tbody>
                <tr>
                  <td className="text-end">Sub Total:</td>
                  <td>${calculateTotalAmount(formData.quotation.items)}</td>
                </tr>
                <tr>
                  <td className="text-end">Tax:</td>
                  <td>$0.00</td>
                </tr>
                <tr>
                  <td className="text-end">Discount:</td>
                  <td>$0.00</td>
                </tr>
                <tr>
                  <td className="text-end"><strong>Total:</strong></td>
                  <td><strong>${calculateTotalAmount(formData.quotation.items)}</strong></td>
                </tr>
              </tbody>
            </Table>
            <Form.Group className="mt-4">
              <Form.Label>Terms & Conditions</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={formData.quotation.terms}
                onChange={(e) => handleChange('quotation', 'terms', e.target.value)}
              />
            </Form.Group>
            <div className="text-center mt-4">
              <p>Thank you for your purchase!</p>
              <p>www.wordtemplates.org</p>
            </div>
            {/* Navigation Buttons */}
            <div className="d-flex justify-content-between mt-4">
              <Button variant="secondary" onClick={handleSkip}>Skip</Button>
              <Button variant="warning" onClick={handleSaveDraft}>Save Draft</Button>
              <Button variant="primary" onClick={handleSaveNext}>Save & Next</Button>
              <Button variant="success" onClick={handleNext}>Next</Button>
            </div>
          </Form>
        </Tab>

        {/* SALES ORDER */}
        <Tab eventKey="salesOrder" title="Sales Order">
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Linked Quotation No</Form.Label>
                  <Form.Control type="text" value={formData.salesOrder.quotationNo} readOnly />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Order No</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.salesOrder.orderNo}
                    onChange={(e) => handleChange('salesOrder', 'orderNo', e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Order Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.salesOrder.orderDate}
                    onChange={(e) => handleChange('salesOrder', 'orderDate', e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Delivery Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.salesOrder.deliveryDate}
                    onChange={(e) => handleChange('salesOrder', 'deliveryDate', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Customer Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.salesOrder.customerName}
                    onChange={(e) => handleChange('salesOrder', 'customerName', e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Customer Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.salesOrder.customerAddress}
                    onChange={(e) => handleChange('salesOrder', 'customerAddress', e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Customer Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.salesOrder.customerEmail}
                    onChange={(e) => handleChange('salesOrder', 'customerEmail', e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Customer Phone</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.salesOrder.customerPhone}
                    onChange={(e) => handleChange('salesOrder', 'customerPhone', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="mt-4">{renderItemsTable('salesOrder')}</div>
            <Form.Group className="mt-4">
              <Form.Label>Terms & Conditions</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={formData.salesOrder.terms}
                onChange={(e) => handleChange('salesOrder', 'terms', e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-between mt-4">
              <Button variant="secondary" onClick={handleSkip}>Skip</Button>
              <Button variant="warning" onClick={handleSaveDraft}>Save Draft</Button>
              <Button variant="primary" onClick={handleSaveNext}>Save & Next</Button>
              <Button variant="success" onClick={handleNext}>Next</Button>
            </div>
          </Form>
        </Tab>

        {/* INVOICE */}
        <Tab eventKey="invoice" title="Invoice">
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Linked Order No</Form.Label>
                  <Form.Control type="text" value={formData.invoice.orderNo} readOnly />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Invoice No</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.invoice.invoiceNo}
                    onChange={(e) => handleChange('invoice', 'invoiceNo', e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Invoice Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.invoice.invoiceDate}
                    onChange={(e) => handleChange('invoice', 'invoiceDate', e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.invoice.dueDate}
                    onChange={(e) => handleChange('invoice', 'dueDate', e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.invoice.companyName}
                    onChange={(e) => handleChange('invoice', 'companyName', e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Company Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.invoice.companyAddress}
                    onChange={(e) => handleChange('invoice', 'companyAddress', e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Company Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.invoice.companyEmail}
                    onChange={(e) => handleChange('invoice', 'companyEmail', e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Company Phone</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.invoice.companyPhone}
                    onChange={(e) => handleChange('invoice', 'companyPhone', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Customer Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.invoice.customerName}
                    onChange={(e) => handleChange('invoice', 'customerName', e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Customer Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.invoice.customerAddress}
                    onChange={(e) => handleChange('invoice', 'customerAddress', e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Customer Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.invoice.customerEmail}
                    onChange={(e) => handleChange('invoice', 'customerEmail', e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Customer Phone</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.invoice.customerPhone}
                    onChange={(e) => handleChange('invoice', 'customerPhone', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="mt-4">{renderItemsTable('invoice')}</div>
            <Table striped bordered>
              <tbody>
                <tr>
                  <td className="text-end">Sub Total:</td>
                  <td>${calculateTotalAmount(formData.invoice.items)}</td>
                </tr>
                <tr>
                  <td className="text-end">Tax:</td>
                  <td>$0.00</td>
                </tr>
                <tr>
                  <td className="text-end">Discount:</td>
                  <td>$0.00</td>
                </tr>
                <tr>
                  <td className="text-end"><strong>Total:</strong></td>
                  <td><strong>${calculateTotalAmount(formData.invoice.items)}</strong></td>
                </tr>
              </tbody>
            </Table>
            <Form.Group className="mt-4">
              <Form.Label>Payment Status</Form.Label>
              <Form.Control
                type="text"
                value={formData.invoice.paymentStatus}
                onChange={(e) => handleChange('invoice', 'paymentStatus', e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Payment Method</Form.Label>
              <Form.Control
                type="text"
                value={formData.invoice.paymentMethod}
                onChange={(e) => handleChange('invoice', 'paymentMethod', e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Note</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={formData.invoice.note}
                onChange={(e) => handleChange('invoice', 'note', e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Terms & Conditions</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={formData.invoice.terms}
                onChange={(e) => handleChange('invoice', 'terms', e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-between mt-4">
              <Button variant="secondary" onClick={handleSkip}>Skip</Button>
              <Button variant="warning" onClick={handleSaveDraft}>Save Draft</Button>
              <Button variant="primary" onClick={handleSaveNext}>Save & Next</Button>
              <Button variant="success" onClick={handleNext}>Next</Button>
            </div>
          </Form>
        </Tab>

        {/* PAYMENT */}
        <Tab eventKey="payment" title="Payment">
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Linked Invoice No</Form.Label>
                  <Form.Control type="text" value={formData.payment.invoiceNo} readOnly />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Total Amount</Form.Label>
                  <Form.Control type="text" value={`$ ${calculateTotalAmount(formData.invoice.items)}`} readOnly />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Payment Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.payment.paymentDate}
                    onChange={(e) => handleChange('payment', 'paymentDate', e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.payment.amount}
                    onChange={(e) => handleChange('payment', 'amount', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Payment Method</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.payment.paymentMethod}
                    onChange={(e) => handleChange('payment', 'paymentMethod', e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Payment Status</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.payment.paymentStatus}
                    onChange={(e) => handleChange('payment', 'paymentStatus', e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Note</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={formData.payment.note}
                    onChange={(e) => handleChange('payment', 'note', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-between mt-4">
              <Button variant="secondary" onClick={handleSkip}>Skip</Button>
              <Button variant="warning" onClick={handleSaveDraft}>Save Draft</Button>
              <Button variant="primary" onClick={handleFinalSubmit}>Submit</Button>
            </div>
          </Form>
        </Tab>
      </Tabs>
    </div>
  );

};

export default MultiStepPurchaseForm;












