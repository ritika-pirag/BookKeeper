import React, { useState, useRef } from 'react';
import { Tabs, Tab, Form, Button, Table, Row, Col } from 'react-bootstrap';
import html2pdf from 'html2pdf.js';
import * as XLSX from 'xlsx';
import './MultiStepPurchaseForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const MultiStepPurchaseForm = ({ onSubmit, initialData, initialStep }) => {
  const [key, setKey] = useState(initialStep || 'quotation');
  const formRef = useRef();

  // --- Form Data State ---
  const [formData, setFormData] = useState(() => ({
    quotation: {
      companyName: "",
      companyAddress: "",
      companyEmail: "",
      companyPhone: "",
      quotationNo: "",
      quotationDate: "",
      validDate: "",
      billToName: "",
      billToAddress: "",
      billToEmail: "",
      billToPhone: "",
      items: [],
      bankName: "",
      accountNo: "",
      accountHolder: "",
      ifsc: "",
      notes: "",
      terms: "",
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

  // ✅ Fixed: Now returns a NUMBER, not a string
  const calculateTotalAmount = (items) => {
    return items.reduce((total, item) => total + (item.rate || 0) * (item.quantity || 0), 0);
  };

  // --- Top Buttons ---
  const handlePrint = () => window.print();

  const handleSend = () => {
    window.location.href = `mailto:?subject=Sales Quotation&body=Please find the quotation details attached.`;
  };

  const handleDownloadPDF = () => {
    const element = formRef.current;
    html2pdf()
      .from(element)
      .set({
        margin: 1,
        filename: 'sales-quotation.pdf',
        jsPDF: { orientation: 'portrait' },
        html2canvas: { scale: 2 },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      })
      .save();
  };

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(formData.quotation.items);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Quotation');
    XLSX.writeFile(workbook, `quotation-${formData.quotation.quotationNo || 'draft'}.xlsx`);
  };

  // --- Navigation Buttons ---
  const handleSkip = () => {
    setKey(prev => {
      if (prev === 'quotation') return 'salesOrder';
      if (prev === 'salesOrder') return 'invoice';
      if (prev === 'invoice') return 'payment';
      return 'quotation';
    });
  };

  const handleSaveDraft = () => onSubmit(formData, key);

  const handleSaveNext = () => {
    handleSaveDraft();
    handleSkip();
  };

  const handleNext = () => {
    setKey(prev => {
      if (prev === 'quotation') return 'salesOrder';
      if (prev === 'salesOrder') return 'invoice';
      if (prev === 'invoice') return 'payment';
      return 'quotation';
    });
  };

  const handleFinalSubmit = () => onSubmit(formData, 'payment');

  // --- Render Items Table ---
  const renderItemsTable = (tab) => (
    <Table striped bordered hover responsive>
      <thead className="table-light">
        <tr>
          {tab === 'invoice'
            ? (
              <>
                <th>Description</th>
                <th>Rate</th>
                <th>Qty</th>
                <th>Tax (%)</th>
                <th>Discount</th>
                <th>Amount</th>
                <th>Action</th>
              </>
            )
            : (
              <>
                <th>Product Name</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Action</th>
              </>
            )
          }
        </tr>
      </thead>
      <tbody>
        {formData[tab].items.map((item, idx) => (
          <tr key={idx}>
            {tab === 'invoice'
              ? (
                <>
                  <td>
                    <Form.Control
                      type="text"
                      size="sm"
                      value={item.description}
                      onChange={(e) => handleItemChange(tab, idx, 'description', e.target.value)}
                      placeholder="Description"
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      size="sm"
                      value={item.rate}
                      onChange={(e) => handleItemChange(tab, idx, 'rate', e.target.value)}
                      placeholder="Rate"
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      size="sm"
                      value={item.qty}
                      onChange={(e) => handleItemChange(tab, idx, 'qty', e.target.value)}
                      placeholder="Qty"
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      size="sm"
                      value={item.tax}
                      onChange={(e) => handleItemChange(tab, idx, 'tax', e.target.value)}
                      placeholder="Tax"
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      size="sm"
                      value={item.discount}
                      onChange={(e) => handleItemChange(tab, idx, 'discount', e.target.value)}
                      placeholder="Disc."
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      size="sm"
                      value={item.amount}
                      onChange={(e) => handleItemChange(tab, idx, 'amount', e.target.value)}
                      placeholder="Amount"
                    />
                  </td>
                </>
              )
              : (
                <>
                  <td>
                    <Form.Control
                      type="text"
                      size="sm"
                      value={item.name}
                      onChange={(e) => handleItemChange(tab, idx, 'name', e.target.value)}
                      placeholder="Product Name"
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      size="sm"
                      value={item.qty}
                      onChange={(e) => handleItemChange(tab, idx, 'qty', e.target.value)}
                      placeholder="Qty"
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      size="sm"
                      value={item.rate}
                      onChange={(e) => handleItemChange(tab, idx, 'rate', e.target.value)}
                      placeholder="Rate"
                    />
                  </td>
                </>
              )
            }
            <td>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeItem(tab, idx)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan={tab === 'invoice' ? 7 : 4} className="text-end">
            <Button
              size="sm"
              onClick={() => addItem(tab)}
              style={{ backgroundColor: "#53b2a5", border: "none", padding: "6px 12px" }}
            >
              + Add Item
            </Button>
          </td>
        </tr>
      </tbody>
    </Table>
  );
  return (
    <div className="container-fluid mt-4 px-2" ref={formRef}>
      <h4 className="text-center mb-4">Sales Process</h4>
{/* Top Action Buttons */}
<div className="d-flex flex-wrap justify-content-center gap-2 gap-sm-3 mb-4 text-center">
  <Button
    variant="warning"
    onClick={handlePrint}
    className="flex-grow-1 flex-sm-grow-0"
    style={{ minWidth: "120px", fontSize: "0.95rem", padding: "6px 12px" }}
  >
    Print
  </Button>
  <Button
    variant="info"
    onClick={handleSend}
    style={{ color: 'white', minWidth: "120px", fontSize: "0.95rem", padding: "6px 12px" }}
    className="flex-grow-1 flex-sm-grow-0"
  >
    Send
  </Button>
  <Button
    variant="success"
    onClick={handleDownloadPDF}
    className="flex-grow-1 flex-sm-grow-0"
    style={{ minWidth: "130px", fontSize: "0.95rem", padding: "6px 12px" }}
  >
    Download PDF
  </Button>
  <Button
    variant="primary"
    onClick={handleDownloadExcel}
    className="flex-grow-1 flex-sm-grow-0"
    style={{ minWidth: "130px", fontSize: "0.95rem", padding: "6px 12px" }}
  >
    Download Excel
  </Button>
</div>
      <Tabs activeKey={key} onSelect={setKey} className="mb-4" fill>
        {/* ============= QUOTATION TAB ============= */}
        <Tab eventKey="quotation" title="Quotation">
          <Form>
            {/* Header: Logo + Company Info + Title */}
            <Row className="mb-4 mt-3">
              <Col md={3} className="d-flex align-items-center justify-content-center">
                <div
                  className="border rounded d-flex flex-column align-items-center justify-content-center"
                  style={{ height: "120px", width: "100%", borderStyle: "dashed", cursor: "pointer" }}
                  onClick={() => document.getElementById('logo-upload')?.click()}
                >
                  <FontAwesomeIcon icon={faUpload} size="2x" className="text-muted" />
                  <small>Upload Logo</small>
                  <input id="logo-upload" type="file" accept="image/*" hidden />
                </div>
              </Col>
        
              <Col md={6}>
  <div className="d-flex flex-column gap-1">
    <Form.Control
      type="text"
      value={formData.quotation.companyName}
      onChange={(e) => handleChange("quotation", "companyName", e.target.value)}
      placeholder="Your Company Name"
      className="form-control-no-border"
      style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
    />
    <Form.Control
      type="text"
      value={formData.quotation.companyAddress}
      onChange={(e) => handleChange("quotation", "companyAddress", e.target.value)}
      placeholder="Company Address, City, State, Pincode"
      className="form-control-no-border"
      style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
    />
    <Form.Control
      type="email"
      value={formData.quotation.companyEmail}
      onChange={(e) => handleChange("quotation", "companyEmail", e.target.value)}
      placeholder="Company Email"
      className="form-control-no-border"
      style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
    />
    <Form.Control
      type="text"
      value={formData.quotation.companyPhone}
      onChange={(e) => handleChange("quotation", "companyPhone", e.target.value)}
      placeholder="Phone No."
      className="form-control-no-border"
      style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
    />
  </div>
</Col>

              <Col md={3} className="d-flex flex-column align-items-end justify-content-center">
                <h2 className="text-success mb-0">QUOTATION</h2>
                <hr
                  style={{
                    width: "80%",
                    borderColor: "#28a745",
                    marginTop: "5px",
                    marginBottom: "10px",
                  }}
                />
              </Col>
            </Row>
 <hr
  style={{
    width: "100%",
    height: "4px", // height badhaya gaya
    backgroundColor: "#28a745", // color apply kiya
    border: "none", // default border hata diya
    marginTop: "5px",
    marginBottom: "10px",
  }}
/>
            {/* Quotation & Customer Info */}
            <Row className="mb-4 d-flex justify-content-between">
              <Col md={8} >
                <h5>Quotation To</h5>
                <Form.Group className="mb-2">
         
                  <Form.Control
                    type="text"
                    value={formData.quotation.billToName}
                    onChange={(e) => handleChange("quotation", "billToName", e.target.value)}
                    placeholder="Customer Name"
                    className="form-control-no-border"
                    style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="text"
                    value={formData.quotation.billToAddress}
                    onChange={(e) => handleChange("quotation", "billToAddress", e.target.value)}
                    placeholder="Customer Address"
                    className="form-control-no-border"
                    style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="email"
                    value={formData.quotation.billToEmail}
                    onChange={(e) => handleChange("quotation", "billToEmail", e.target.value)}
                    placeholder="Email"
                    className="form-control-no-border"
                    style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="text"
                    value={formData.quotation.billToPhone}
                    onChange={(e) => handleChange("quotation", "billToPhone", e.target.value)}
                    placeholder="Phone"
                    className="form-control-no-border"
                    style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-2">
                  <Form.Label>Quotation No.</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.quotation.quotationNo}
                    onChange={(e) => handleChange("quotation", "quotationNo", e.target.value)}
                    placeholder="e.g. QU-001"
                    
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Quotation Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.quotation.quotationDate}
                    onChange={(e) => handleChange("quotation", "quotationDate", e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Valid Till</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.quotation.validDate}
                    onChange={(e) => handleChange("quotation", "validDate", e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Items Table */}
            <Row className="mb-4">
              <Col>
                {renderItemsTable("quotation")}
              </Col>
            </Row>

            {/* Totals */}
    {/* Totals */}
<Row className="mb-4">
  <Col md={{ span: 4, offset: 8 }}>
    <Table bordered size="sm" className="text-end">
      <tbody>
        <tr>
          <td className="fw-bold">Sub Total:</td>
          <td>${calculateTotalAmount(formData.quotation.items).toFixed(2)}</td>
        </tr>
        <tr>
          <td className="fw-bold">Total:</td>
          <td className="fw-bold">
            ${calculateTotalAmount(formData.quotation.items).toFixed(2)}
          </td>
        </tr>
      </tbody>
    </Table>
  </Col>
</Row>

            {/* Bank & Notes */}
            <Row className="mb-4 ">
            <h5>Bank Details</h5>
              <Col md={6} className='border p-2 rounded'>
             
                {['bankName', 'accountNo', 'accountHolder', 'ifsc'].map(field => (
                  <Form.Group key={field} className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder={{
                        bankName: 'Bank Name',
                        accountNo: 'Account No.',
                        accountHolder: 'Account Holder',
                        ifsc: 'IFSC Code',
                      }[field]}
                      value={formData.quotation[field] || ""}
                      onChange={(e) => handleChange("quotation", field, e.target.value)}
                      className="form-control-no-border"
                      style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
                    />
                  </Form.Group>
                ))}
              </Col>

              <Col md={6}>
                <h5>Notes</h5>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Enter any additional notes"
                  value={formData.quotation.notes || ""}
                  onChange={(e) => handleChange("quotation", "notes", e.target.value)}
                  
                />
              </Col>
            </Row>

            {/* Terms & Footer */}
            <Row className="mb-4">
              <Col>
                <Form.Group>
                  <Form.Label>Terms & Conditions</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.quotation.terms}
                    onChange={(e) => handleChange("quotation", "terms", e.target.value)}
                    placeholder="e.g. Payment within 15 days"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="text-center mb-4">
              <Col>
                <p><strong>Thank you for your business!</strong></p>
                <p className="text-muted">www.yourcompany.com</p>
              </Col>
            </Row>

            {/* Navigation */}
            <div className="d-flex justify-content-between mt-5">
              <Button variant="secondary" onClick={handleSkip}>Skip</Button>
              <Button variant="warning" onClick={handleSaveDraft}>Save Draft</Button>
              <Button variant="primary" onClick={handleSaveNext}>Save & Next</Button>
              <Button variant="success" onClick={handleNext}>Next</Button>
            </div>
          </Form>
        </Tab>

        {/* ============= SALES ORDER TAB ============= */}
        <Tab eventKey="salesOrder" title="Sales Order">
  <Form>
    {/* Header: Logo + Company Info + Title */}
    <Row className="mb-4 d-flex justify-content-between">
      <Col md={3} className="d-flex align-items-center justify-content-center">
        <div
          className="border rounded d-flex flex-column align-items-center justify-content-center"
          style={{ height: "120px", width: "100%", borderStyle: "dashed", cursor: "pointer" }}
          onClick={() => document.getElementById('logo-upload')?.click()}
        >
          <FontAwesomeIcon icon={faUpload} size="2x" className="text-muted" />
          <small>Upload Logo</small>
          <input id="logo-upload" type="file" accept="image/*" hidden />
        </div>
      </Col>

  

      <Col md={3} className="d-flex flex-column align-items-end justify-content-center">
        <h2 className="text-success mb-0">SALES ORDER FORM</h2>
        <hr
          style={{
            width: "80%",
            borderColor: "#28a745",
            marginTop: "5px",
            marginBottom: "10px",
          }}
        />
      </Col>
    </Row>
    <hr
  style={{
    width: "100%",
    height: "4px", // height badhaya gaya
    backgroundColor: "#28a745", // color apply kiya
    border: "none", // default border hata diya
    marginTop: "5px",
    marginBottom: "10px",
  }}
/>
    <Row className="mb-4 mt-3">
      <Col md={6}>
        <div className="d-flex flex-column align-items-end justify-content-center gap-1" >
          <Form.Control
            type="text"
            value={formData.salesOrder.companyName}
            onChange={(e) => handleChange("salesOrder", "companyName", e.target.value)}
            placeholder="Your Company Name"
            className="form-control-no-border"
            style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
          />
          <Form.Control
            type="text"
            value={formData.salesOrder.companyAddress}
            onChange={(e) => handleChange("salesOrder", "companyAddress", e.target.value)}
            placeholder="Company Address, City, State, Pincode"
            className="form-control-no-border"
            style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
          />
          <Form.Control
            type="email"
            value={formData.salesOrder.companyEmail}
            onChange={(e) => handleChange("salesOrder", "companyEmail", e.target.value)}
            placeholder="Company Email"
            className="form-control-no-border"
            style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
          />
          <Form.Control
            type="text"
            value={formData.salesOrder.companyPhone}
            onChange={(e) => handleChange("salesOrder", "companyPhone", e.target.value)}
            placeholder="Phone No."
            className="form-control-no-border"
            style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
          />
        </div>
      </Col>

      <Col md={6} className="d-flex flex-column align-items-end justify-content-center">
  <div className="d-flex flex-column gap-1">
    <Form.Group>
      <Form.Control
        type="date"
        value={formData.salesOrder.orderDate}
        onChange={(e) => handleChange('salesOrder', 'orderDate', e.target.value)}
        placeholder="Date"
        className="form-control-no-border"
        style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
      />
    </Form.Group>

    <Form.Group>
      <Form.Control
        type="text"
        value={formData.salesOrder.orderNo}
        onChange={(e) => handleChange('salesOrder', 'orderNo', e.target.value)}
        placeholder="Sales Order No."
        className="form-control-no-border"
        style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
      />
    </Form.Group>

    <Form.Group>
      <Form.Control
        type="text"
        value={formData.salesOrder.quotationNo}
        onChange={(e) => handleChange('salesOrder', 'quotationNo', e.target.value)}
        placeholder="Quotation No."
        className="form-control-no-border"
        style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
      />
    </Form.Group>

    <Form.Group>
      <Form.Control
        type="text"
        value={formData.salesOrder.customerNo}
        onChange={(e) => handleChange('salesOrder', 'customerNo', e.target.value)}
        placeholder="Customer No."
        className="form-control-no-border"
        style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
      />
    </Form.Group>
  </div>
</Col>

    </Row>
    <hr
  style={{
    width: "100%",
    height: "4px", // height badhaya gaya
    backgroundColor: "#28a745", // color apply kiya
    border: "none", // default border hata diya
    marginTop: "5px",
    marginBottom: "10px",
  }}
/>
{/* Bill To and Ship To Sections */}
<Row className="mb-4 d-flex justify-content-between">
  <Col md={6} className="d-flex flex-column align-items-start">
    <h5>BILL TO</h5>
    <Form.Group className="mb-2 w-100">
      <Form.Label>ATN: Name / Dept</Form.Label>
      <Form.Control
        type="text"
        value={formData.salesOrder.billToAttn}
        onChange={(e) => handleChange("salesOrder", "billToAttn", e.target.value)}
        placeholder="Attention Name / Department"
        className="form-control-no-border"
        style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
      />
    </Form.Group>
    <Form.Group className="mb-2 w-100">
      <Form.Control
        type="text"
        value={formData.salesOrder.billToCompanyName}
        onChange={(e) => handleChange("salesOrder", "billToCompanyName", e.target.value)}
        placeholder="Company Name"
        className="form-control-no-border"
        style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
      />
    </Form.Group>
    <Form.Group className="mb-2 w-100">
      <Form.Control
        type="text"
        value={formData.salesOrder.billToAddress}
        onChange={(e) => handleChange("salesOrder", "billToAddress", e.target.value)}
        placeholder="Company Address"
        className="form-control-no-border"
        style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
      />
    </Form.Group>
    <Form.Group className="mb-2 w-100">
      <Form.Control
        type="text"
        value={formData.salesOrder.billToPhone}
        onChange={(e) => handleChange("salesOrder", "billToPhone", e.target.value)}
        placeholder="Phone"
        className="form-control-no-border"
        style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
      />
    </Form.Group>
    <Form.Group className="mb-2 w-100">
      <Form.Control
        type="email"
        value={formData.salesOrder.billToEmail}
        onChange={(e) => handleChange("salesOrder", "billToEmail", e.target.value)}
        placeholder="Email"
        className="form-control-no-border"
        style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
      />
    </Form.Group>
  </Col>
  <Col md={6} className="d-flex flex-column align-items-end">
  <h5 >SHIP TO</h5> 
  <div className="w-100 text-end" style={{ maxWidth: "400px" }}>
    <Form.Group className="mb-2">
      <Form.Label >ATN: Name / Dept</Form.Label>
      <Form.Control
        type="text"
        value={formData.salesOrder.shipToAttn}
        onChange={(e) => handleChange("salesOrder", "shipToAttn", e.target.value)}
        placeholder="Attention Name / Department"
        className="form-control-no-border text-end"
        style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0", textAlign: "right" }}
      />
    </Form.Group>
    <Form.Group className="mb-2">
      <Form.Control
        type="text"
        value={formData.salesOrder.shipToCompanyName}
        onChange={(e) => handleChange("salesOrder", "shipToCompanyName", e.target.value)}
        placeholder="Company Name"
        className="form-control-no-border text-end"
        style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0", textAlign: "right" }}
      />
    </Form.Group>
    <Form.Group className="mb-2">
      <Form.Control
        type="text"
        value={formData.salesOrder.shipToAddress}
        onChange={(e) => handleChange("salesOrder", "shipToAddress", e.target.value)}
        placeholder="Company Address"
        className="form-control-no-border text-end"
        style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0", textAlign: "right" }}
      />
    </Form.Group>
    <Form.Group className="mb-2">
      <Form.Control
        type="text"
        value={formData.salesOrder.shipToPhone}
        onChange={(e) => handleChange("salesOrder", "shipToPhone", e.target.value)}
        placeholder="Phone"
        className="form-control-no-border text-end"
        style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0", textAlign: "right" }}
      />
    </Form.Group>
    <Form.Group className="mb-2">
      <Form.Control
        type="email"
        value={formData.salesOrder.shipToEmail}
        onChange={(e) => handleChange("salesOrder", "shipToEmail", e.target.value)}
        placeholder="Email"
        className="form-control-no-border text-end"
        style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0", textAlign: "right" }}
      />
    </Form.Group>
  </div>
</Col>
</Row>

<hr
  style={{
    width: "100%",
    height: "4px", // height badhaya gaya
    backgroundColor: "#28a745", // color apply kiya
    border: "none", // default border hata diya
    marginTop: "5px",
    marginBottom: "10px",
  }}
/>

    {/* Items Table */}
    <div className="mt-4">{renderItemsTable('salesOrder')}</div>
{/* Totals */}
<Row className="mb-4 mt-2">
  <Col md={{ span: 4, offset: 8 }}>
    <Table bordered size="sm" className="text-end">
      <tbody>
        <tr>
          <td className="fw-bold">Sub Total:</td>
          <td>${calculateTotalAmount(formData.quotation.items).toFixed(2)}</td>
        </tr>
        <tr>
          <td className="fw-bold">Total:</td>
          <td className="fw-bold">
            ${calculateTotalAmount(formData.quotation.items).toFixed(2)}
          </td>
        </tr>
      </tbody>
    </Table>
  </Col>
</Row>
    {/* Terms & Conditions */}
    <Form.Group className="mt-4">
      <Form.Label>Terms & Conditions</Form.Label>
      <Form.Control
        as="textarea"
        rows={2}
        value={formData.salesOrder.terms}
        onChange={(e) => handleChange('salesOrder', 'terms', e.target.value)}
      />
    </Form.Group>

    {/* Navigation Buttons */}
    <div className="d-flex justify-content-between mt-4">
      <Button variant="secondary" onClick={handleSkip}>Skip</Button>
      <Button variant="warning" onClick={handleSaveDraft}>Save Draft</Button>
      <Button variant="primary" onClick={handleSaveNext}>Save & Next</Button>
      <Button variant="success" onClick={handleNext}>Next</Button>
    </div>
  </Form>
</Tab>
      {/* ============= INVOICE TAB ============= */}
<Tab eventKey="invoice" title="Invoice">
  <Form>
    {/* Header: Logo + Company Info + Title */}
    <Row className="mb-4 d-flex justify-content-between align-items-center">
      <Col md={3} className="d-flex align-items-center justify-content-center">
        <div
          className="border rounded d-flex flex-column align-items-center justify-content-center"
          style={{ height: "120px", width: "100%", borderStyle: "dashed", cursor: "pointer" }}
          onClick={() => document.getElementById('logo-upload-invoice')?.click()}
        >
          <FontAwesomeIcon icon={faUpload} size="2x" className="text-muted" />
          <small>Upload Logo</small>
          <input id="logo-upload-invoice" type="file" accept="image/*" hidden />
        </div>
      </Col>
      <Col md={3} className="d-flex flex-column align-items-end justify-content-center">
        <h2 className="text-success mb-0">INVOICE</h2>
        <hr
          style={{
            width: "80%",
            borderColor: "#28a745",
            marginTop: "5px",
            marginBottom: "10px",
          }}
        />
      </Col>
    </Row>

    {/* Green Line */}
    <hr
      style={{
        width: "100%",
        height: "4px",
        backgroundColor: "#28a745",
        border: "none",
        marginTop: "5px",
        marginBottom: "10px",
      }}
    />

    {/* Company Info + Invoice No, Date */}
    <Row className="mb-4 mt-3">
      <Col md={6}>
        <div className="d-flex flex-column gap-1">
          <Form.Control
            type="text"
            value={formData.invoice.companyName}
            onChange={(e) => handleChange("invoice", "companyName", e.target.value)}
            placeholder="Your Company Name"
            className="form-control-no-border"
            style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
          />
          <Form.Control
            type="text"
            value={formData.invoice.companyAddress}
            onChange={(e) => handleChange("invoice", "companyAddress", e.target.value)}
            placeholder="Company Address, City, State, Pincode"
            className="form-control-no-border"
            style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
          />
          <Form.Control
            type="email"
            value={formData.invoice.companyEmail}
            onChange={(e) => handleChange("invoice", "companyEmail", e.target.value)}
            placeholder="Company Email"
            className="form-control-no-border"
            style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
          />
          <Form.Control
            type="text"
            value={formData.invoice.companyPhone}
            onChange={(e) => handleChange("invoice", "companyPhone", e.target.value)}
            placeholder="Phone No."
            className="form-control-no-border"
            style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
          />
        </div>
      </Col>
      <Col md={6} className="d-flex flex-column align-items-end">
  <div className="d-flex flex-column gap-1 text-end" style={{ maxWidth: "400px" }}>
  <Form.Group>
  <Form.Label className="mb-0" style={{ fontSize: "0.9rem", color: "#6c757d" }}>
    Invoice Date
  </Form.Label>
  <Form.Control
    type="date"
    value={formData.invoice.invoiceDate}
    onChange={(e) => handleChange("invoice", "invoiceDate", e.target.value)}
    className="form-control-no-border text-end"
    style={{
      fontSize: "1rem",
      lineHeight: "1.5",
      minHeight: "auto",
      padding: "0",
      textAlign: "right"
    }}
  />
</Form.Group>

    <Form.Group>
      <Form.Control
        type="text"
        value={formData.invoice.invoiceNo}
        onChange={(e) => handleChange("invoice", "invoiceNo", e.target.value)}
        placeholder="Invoice No."
        className="form-control-no-border text-end"
        style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0", textAlign: "right" }}
      />
    </Form.Group>

    <Form.Group>
      <Form.Control
        type="text"
        value={formData.invoice.salesOrderNo}
        onChange={(e) => handleChange("invoice", "salesOrderNo", e.target.value)}
        placeholder="Sales Order No."
        className="form-control-no-border text-end"
        style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0", textAlign: "right" }}
      />
    </Form.Group>

    <Form.Group>
    <Form.Label className="mb-0" style={{ fontSize: "0.9rem", color: "#6c757d" }}>
    Due Date
  </Form.Label>
      <Form.Control
        type="date"
        value={formData.invoice.dueDate}
        onChange={(e) => handleChange("invoice", "dueDate", e.target.value)}
        placeholder="Due Date"
        className="form-control-no-border text-end"
        style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0", textAlign: "right" }}
      />
    </Form.Group>
  </div>
</Col>

    </Row>

    {/* Green Line */}
    <hr
      style={{
        width: "100%",
        height: "4px",
        backgroundColor: "#28a745",
        border: "none",
        marginTop: "5px",
        marginBottom: "10px",
      }}
    />

    {/* Bill To & Customer Info */}
    <Row className="mb-4 d-flex justify-content-between">
      <Col md={6} className="d-flex flex-column align-items-start">
        <h5>BILL TO</h5>
        <Form.Group className="mb-2 w-100">
          <Form.Label>Customer Name</Form.Label>
          <Form.Control
            type="text"
            value={formData.invoice.customerName}
            onChange={(e) => handleChange("invoice", "customerName", e.target.value)}
            placeholder="Customer Name"
            className="form-control-no-border"
            style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
          />
        </Form.Group>
        <Form.Group className="mb-2 w-100">
          <Form.Control
            as="textarea"
            rows={2}
            value={formData.invoice.customerAddress}
            onChange={(e) => handleChange("invoice", "customerAddress", e.target.value)}
            placeholder="Customer Address"
            className="form-control-no-border"
            style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
          />
        </Form.Group>
        <Form.Group className="mb-2 w-100">
          <Form.Control
            type="email"
            value={formData.invoice.customerEmail}
            onChange={(e) => handleChange("invoice", "customerEmail", e.target.value)}
            placeholder="Email"
            className="form-control-no-border"
            style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
          />
        </Form.Group>
        <Form.Group className="mb-2 w-100">
          <Form.Control
            type="text"
            value={formData.invoice.customerPhone}
            onChange={(e) => handleChange("invoice", "customerPhone", e.target.value)}
            placeholder="Phone"
            className="form-control-no-border"
            style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
          />
        </Form.Group>
      </Col>
      <Col md={6} className="d-flex flex-column align-items-end">
        <h5>SHIP TO</h5>
        <div className="w-100 text-end" style={{ maxWidth: "400px" }}>
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              value={formData.invoice.shipToName || ""}
              onChange={(e) => handleChange("invoice", "shipToName", e.target.value)}
              placeholder="Name"
              className="form-control-no-border text-end"
              style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0", textAlign: "right" }}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              value={formData.invoice.shipToAddress || ""}
              onChange={(e) => handleChange("invoice", "shipToAddress", e.target.value)}
              placeholder="Address"
              className="form-control-no-border text-end"
              style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0", textAlign: "right" }}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control
              type="email"
              value={formData.invoice.shipToEmail || ""}
              onChange={(e) => handleChange("invoice", "shipToEmail", e.target.value)}
              placeholder="Email"
              className="form-control-no-border text-end"
              style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0", textAlign: "right" }}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              value={formData.invoice.shipToPhone || ""}
              onChange={(e) => handleChange("invoice", "shipToPhone", e.target.value)}
              placeholder="Phone"
              className="form-control-no-border text-end"
              style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0", textAlign: "right" }}
            />
          </Form.Group>
        </div>
      </Col>
    </Row>

    {/* Green Line */}
    <hr
      style={{
        width: "100%",
        height: "4px",
        backgroundColor: "#28a745",
        border: "none",
        marginTop: "5px",
        marginBottom: "10px",
      }}
    />

    {/* Items Table */}
    <div className="mt-4">{renderItemsTable('invoice')}</div>

    {/* Totals */}
    <Row className="mb-4 mt-2">
      <Col md={{ span: 4, offset: 8 }}>
        <Table bordered size="sm" className="text-end">
          <tbody>
            <tr>
              <td className="fw-bold">Sub Total:</td>
              <td>${calculateTotalAmount(formData.invoice.items).toFixed(2)}</td>
            </tr>
            <tr>
              <td className="fw-bold">Total Due:</td>
              <td className="fw-bold">${calculateTotalAmount(formData.invoice.items).toFixed(2)}</td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>

    {/* Terms & Conditions */}
    <Form.Group className="mt-4">
      <Form.Label>Terms & Conditions</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        value={formData.invoice.terms}
        onChange={(e) => handleChange("invoice", "terms", e.target.value)}
        placeholder="e.g. Payment within 15 days. Late fees may apply."
      />
    </Form.Group>

    {/* Footer Note */}
    <Row className="text-center mt-5 mb-4 pt-3 border-top">
      <Col>
        <Form.Control
          type="text"
          value={formData.invoice.footerNote}
          onChange={(e) => handleChange("invoice", "footerNote", e.target.value)}
          className="text-center mb-2 fw-bold"
          placeholder="e.g. Thank you for your business!"
        />
      </Col>
    </Row>

    {/* Navigation */}
    <div className="d-flex justify-content-between mt-4 border-top pt-3">
      <Button variant="secondary" onClick={handleSkip}>Skip</Button>
      <Button variant="warning" onClick={handleSaveDraft}>Save Draft</Button>
      <Button variant="primary" onClick={handleSaveNext}>Save & Next</Button>
      <Button variant="success" onClick={handleNext}>Next</Button>
    </div>
  </Form>
</Tab>
<Tab eventKey="payment" title="Payment">
  <Form>
    {/* Header: Logo + Title */}
    <Row className="mb-4 d-flex justify-content-between align-items-center">
      <Col md={3} className="d-flex align-items-center justify-content-center">
        <div
          className="border rounded d-flex flex-column align-items-center justify-content-center"
          style={{ height: "120px", width: "100%", borderStyle: "dashed", cursor: "pointer" }}
          onClick={() => document.getElementById('logo-upload-payment')?.click()}
        >
          <FontAwesomeIcon icon={faUpload} size="2x" className="text-muted" />
          <small>Upload Logo</small>
          <input id="logo-upload-payment" type="file" accept="image/*" hidden />
        </div>
      </Col>
      <Col md={3} className="d-flex flex-column align-items-end justify-content-center">
        <h2 className="text-success mb-0">PAYMENT RECEIPT</h2>
        <hr
          style={{
            width: "80%",
            borderColor: "#28a745",
            marginTop: "5px",
            marginBottom: "10px",
          }}
        />
      </Col>
    </Row>

    {/* Green Line */}
    <hr
      style={{
        width: "100%",
        height: "4px",
        backgroundColor: "#28a745",
        border: "none",
        marginTop: "5px",
        marginBottom: "10px",
      }}
    />

    {/* Company Info + Payment Details */}
    <Row className="mb-4 mt-3">
      <Col md={6}>
        <div className="d-flex flex-column gap-1">
          <Form.Control
            type="text"
            value={formData.payment.companyName}
            onChange={(e) => handleChange("payment", "companyName", e.target.value)}
            placeholder="Your Company Name"
            className="form-control-no-border"
            style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
          />
          <Form.Control
            type="text"
            value={formData.payment.companyAddress}
            onChange={(e) => handleChange("payment", "companyAddress", e.target.value)}
            placeholder="Company Address, City, State, Pincode"
            className="form-control-no-border"
            style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
          />
          <Form.Control
            type="email"
            value={formData.payment.companyEmail}
            onChange={(e) => handleChange("payment", "companyEmail", e.target.value)}
            placeholder="Company Email"
            className="form-control-no-border"
            style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
          />
          <Form.Control
            type="text"
            value={formData.payment.companyPhone}
            onChange={(e) => handleChange("payment", "companyPhone", e.target.value)}
            placeholder="Phone No."
            className="form-control-no-border"
            style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
          />
        </div>
      </Col>
      <Col md={6} className="d-flex flex-column align-items-end">
        <div className="d-flex flex-column gap-1 text-end" style={{ maxWidth: "400px" }}>
          <Form.Group>
            <Form.Control
              type="date"
              value={formData.payment.paymentDate}
              onChange={(e) => handleChange("payment", "paymentDate", e.target.value)}
              placeholder="Payment Date"
              className="form-control-no-border text-end"
              style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0", textAlign: "right" }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              value={formData.payment.invoiceNo}
              onChange={(e) => handleChange("payment", "invoiceNo", e.target.value)}
              placeholder="Invoice No."
              className="form-control-no-border text-end"
              style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0", textAlign: "right" }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              value={formData.payment.paymentMethod}
              onChange={(e) => handleChange("payment", "paymentMethod", e.target.value)}
              placeholder="Payment Method"
              className="form-control-no-border text-end"
              style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0", textAlign: "right" }}
            />
          </Form.Group>
        </div>
      </Col>
    </Row>

    {/* Green Line */}
    <hr
      style={{
        width: "100%",
        height: "4px",
        backgroundColor: "#28a745",
        border: "none",
        marginTop: "5px",
        marginBottom: "10px",
      }}
    />

    {/* Received From & Payment Info */}
    <Row className="mb-4 d-flex justify-content-between">
      <Col md={6} className="d-flex flex-column align-items-start">
        <h5>RECEIVED FROM</h5>
        <Form.Group className="mb-2 w-100">
          <Form.Label>Customer Name</Form.Label>
          <Form.Control
            type="text"
            value={formData.payment.customerName || ""}
            onChange={(e) => handleChange("payment", "customerName", e.target.value)}
            placeholder="Customer Name"
            className="form-control-no-border"
            style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
          />
        </Form.Group>
        <Form.Group className="mb-2 w-100">
          <Form.Control
            as="textarea"
            rows={2}
            value={formData.payment.customerAddress || ""}
            onChange={(e) => handleChange("payment", "customerAddress", e.target.value)}
            placeholder="Customer Address"
            className="form-control-no-border"
            style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
          />
        </Form.Group>
        <Form.Group className="mb-2 w-100">
          <Form.Control
            type="email"
            value={formData.payment.customerEmail || ""}
            onChange={(e) => handleChange("payment", "customerEmail", e.target.value)}
            placeholder="Email"
            className="form-control-no-border"
            style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
          />
        </Form.Group>
        <Form.Group className="mb-2 w-100">
          <Form.Control
            type="text"
            value={formData.payment.customerPhone || ""}
            onChange={(e) => handleChange("payment", "customerPhone", e.target.value)}
            placeholder="Phone"
            className="form-control-no-border"
            style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
          />
        </Form.Group>
      </Col>
      <Col md={6} className="d-flex flex-column align-items-end">
        <h5>PAYMENT DETAILS</h5>
        <div className="w-100 text-end" style={{ maxWidth: "400px" }}>
          <Form.Group className="mb-2">
            <Form.Label>Amount Received</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={formData.payment.amount}
              onChange={(e) => handleChange("payment", "amount", e.target.value)}
              placeholder="Amount"
              className="form-control-no-border text-end"
              style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0", textAlign: "right" }}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control
              type="number"
              step="0.01"
              value={formData.payment.totalAmount || calculateTotalAmount(formData.invoice.items).toFixed(2)}
              onChange={(e) => handleChange("payment", "totalAmount", e.target.value)}
              placeholder="Total Invoice"
              className="form-control-no-border text-end"
              style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0", textAlign: "right" }}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              value={formData.payment.paymentStatus}
              onChange={(e) => handleChange("payment", "paymentStatus", e.target.value)}
              placeholder="Payment Status"
              className="form-control-no-border text-end"
              style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0", textAlign: "right" }}
            />
          </Form.Group>
        </div>
      </Col>
    </Row>

    {/* Green Line */}
    <hr
      style={{
        width: "100%",
        height: "4px",
        backgroundColor: "#28a745",
        border: "none",
        marginTop: "5px",
        marginBottom: "10px",
      }}
    />

    {/* Balance Summary */}
    <Row className="mb-4 mt-2">
      <Col md={{ span: 4, offset: 8 }}>
        <Table bordered size="sm" className="text-end">
          <tbody>
            <tr>
              <td className="fw-bold">Total Invoice:</td>
              <td>
                ${(
                  parseFloat(formData.payment.totalAmount) ||
                  calculateTotalAmount(formData.invoice.items)
                ).toFixed(2)}
              </td>
            </tr>
            <tr className="fw-bold">
              <td>Amount Received:</td>
              <td>${(parseFloat(formData.payment.amount) || 0).toFixed(2)}</td>
            </tr>
            <tr style={{ backgroundColor: "#f8f9fa" }}>
              <td className="fw-bold">Balance:</td>
              <td className="fw-bold text-danger">
                ${(
                  (parseFloat(formData.payment.totalAmount) ||
                    calculateTotalAmount(formData.invoice.items)) -
                  (parseFloat(formData.payment.amount) || 0)
                ).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>

    {/* Note */}
    <Form.Group className="mt-4">
      <Form.Label>Note</Form.Label>
      <Form.Control
        as="textarea"
        rows={2}
        value={formData.payment.note}
        onChange={(e) => handleChange("payment", "note", e.target.value)}
        placeholder="e.g. Payment received via UPI / Cash"
      />
    </Form.Group>

    {/* Footer */}
    <Row className="text-center mt-5 mb-4 pt-3 border-top">
      <Col>
        <Form.Control
          type="text"
          value={formData.payment.footerNote}
          onChange={(e) => handleChange("payment", "footerNote", e.target.value)}
          className="text-center mb-2 fw-bold"
          placeholder="e.g. Thank you for your payment!"
        />
      </Col>
    </Row>

    {/* Navigation */}
    <div className="d-flex justify-content-between mt-4 border-top pt-3">
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
