import React, { useState } from 'react';
import { Tabs, Tab, Form, Button, Table, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import html2pdf from 'html2pdf.js';
import * as XLSX from 'xlsx';
import '../Sales/MultiStepPurchaseForm.css';

const MultiStepPurchaseForm = ({ onSubmit, initialData, initialStep }) => {
  const [key, setKey] = useState(initialStep || 'rfq');

  // --- Form Data State (Purchase Flow) ---
  const [formData, setFormData] = useState(() => ({
    rfq: {
      companyName: "",
      companyAddress: "",
      companyEmail: "",
      companyPhone: "",
      rfqNo: "",
      rfqDate: "",
      validTill: "",
      supplierName: "",
      supplierAddress: "",
      supplierEmail: "",
      supplierPhone: "",
      items: [],
      contactPerson: "",
      deliveryAddress: "",
      notes: "",
      terms: "",
    },
    purchaseOrder: {
      companyName: "",
      companyAddress: "",
      companyEmail: "",
      companyPhone: "",
      rfqNo: '',
      poNo: '',
      poDate: '',
      deliveryDate: '',
      supplierName: '',
      supplierAddress: '',
      supplierEmail: '',
      supplierPhone: '',
      items: [{ name: '', qty: '', rate: '' }],
      terms: '',
    },
    vendorBill: {
      companyName: "",
      companyAddress: "",
      companyEmail: "",
      companyPhone: "",
      poNo: '',
      billNo: '',
      billDate: '',
      dueDate: '',
      supplierName: '',
      supplierAddress: '',
      supplierEmail: '',
      supplierPhone: '',
      items: [{ description: '', rate: '', qty: '', tax: '', discount: '', amount: '' }],
      paymentStatus: '',
      paymentMethod: '',
      note: '',
      terms: '',
      footerNote: 'Thank you for your business!',
      website: 'www.yourcompany.com',
    },
    payment: {
      companyName: "",
      companyAddress: "",
      companyEmail: "",
      companyPhone: "",
      billNo: '',
      paymentDate: '',
      amount: '',
      paymentMethod: '',
      paymentStatus: '',
      note: '',
      footerNote: 'Payment successful.',
      website: 'www.yourcompany.com',
      totalAmount: '',
    },
  }));



  // --- Export Vendor Bill Data ---
const handleExportVendorBill = () => {
    const worksheet = XLSX.utils.json_to_sheet([
      {
        'Bill No': formData.vendorBill.billNo,
        'Bill Date': formData.vendorBill.billDate,
        'Due Date': formData.vendorBill.dueDate,
        'Supplier Name': formData.vendorBill.supplierName,
        'Supplier Address': formData.vendorBill.supplierAddress,
        'Supplier Email': formData.vendorBill.supplierEmail,
        'Supplier Phone': formData.vendorBill.supplierPhone,
        'PO No': formData.vendorBill.poNo,
        'Total Amount': calculateTotalAmount(formData.vendorBill.items),
      }
    ]);
  
    // Add items
    formData.vendorBill.items.forEach((item, idx) => {
      worksheet[`A${idx + 3}`] = { v: item.description, t: 's' };
      worksheet[`B${idx + 3}`] = { v: item.qty, t: 'n' };
      worksheet[`C${idx + 3}`] = { v: item.rate, t: 'n' };
      worksheet[`D${idx + 3}`] = { v: item.tax, t: 'n' };
      worksheet[`E${idx + 3}`] = { v: item.discount, t: 'n' };
      worksheet[`F${idx + 3}`] = { v: item.amount, t: 'n' };
    });
  
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Vendor Bill');
    XLSX.writeFile(workbook, `vendor-bill-${formData.vendorBill.billNo || 'draft'}.xlsx`);
  };
  
  // --- Import Vendor Bill Data ---
  const handleImportVendorBill = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const wb = XLSX.read(binaryStr, { type: 'binary' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
  
      // Assume first row is header, second row is data
      const row = data[1] || [];
  
      const importedData = {
        vendorBill: {
          billNo: row[0] || '',
          billDate: row[1] || '',
          dueDate: row[2] || '',
          supplierName: row[3] || '',
          supplierAddress: row[4] || '',
          supplierEmail: row[5] || '',
          supplierPhone: row[6] || '',
          poNo: row[7] || '',
          items: [],
        }
      };
  
      // Extract items (from row 2 onwards, columns A-F)
      const items = [];
      for (let i = 2; i < data.length; i++) {
        const itemRow = data[i];
        if (itemRow[0]) {
          items.push({
            description: itemRow[0] || '',
            qty: itemRow[1] || '',
            rate: itemRow[2] || '',
            tax: itemRow[3] || '',
            discount: itemRow[4] || '',
            amount: itemRow[5] || '',
          });
        }
      }
      importedData.vendorBill.items = items;
  
      // Update form data
      setFormData(prev => ({
        ...prev,
        vendorBill: importedData.vendorBill
      }));
    };
    reader.readAsBinaryString(file);
  };

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
        items: [...prev[tab].items, tab === 'vendorBill'
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
    if (!items || !items.length) return 0;
    return items.reduce((total, item) => {
      const qty = parseFloat(item.qty) || 0;
      const rate = parseFloat(item.rate) || 0;
      const amount = parseFloat(item.amount) || 0;
      if (item.amount !== undefined) return total + amount;
      return total + (qty * rate);
    }, 0);
  };

  // --- Top Actions ---
  const handlePrint = () => window.print();
  const handleSend = () => {
    window.location.href = "mailto:?subject=Purchase Request&body=Please find the purchase details attached.";
  };
  const handleDownloadPDF = () => {
    const element = document.getElementById('purchase-form');
    html2pdf()
      .from(element)
      .set({
        margin: 1,
        filename: 'purchase-request.pdf',
        jsPDF: { orientation: 'portrait' },
        html2canvas: { scale: 2 },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      })
      .save();
  };
  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(formData.rfq.items);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'RFQ');
    XLSX.writeFile(workbook, `rfq-${formData.rfq.rfqNo || 'draft'}.xlsx`);
  };
  const handleNext = () => {
    setKey(prev => {
      if (prev === 'quotation') return 'salesOrder';
      if (prev === 'salesOrder') return 'invoice';
      if (prev === 'invoice') return 'payment';
      return 'quotation'; // wrap around
    });
  };
  // --- Navigation ---
  const handleSkip = () => {
    setKey(prev => {
      if (prev === 'rfq') return 'purchaseOrder';
      if (prev === 'purchaseOrder') return 'vendorBill';
      if (prev === 'vendorBill') return 'payment';
      return 'rfq';
    });
  };
  const handleSaveDraft = () => onSubmit(formData, key);
  const handleSaveNext = () => {
    handleSaveDraft();
    handleSkip();
  };
  const handleFinalSubmit = () => onSubmit(formData, 'payment');

  // --- Render Items Table ---
  const renderItemsTable = (tab) => (
    <Table striped bordered hover responsive>
      <thead className="table-light">
        <tr>
          {tab === 'vendorBill'
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
            {tab === 'vendorBill'
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
          <td colSpan={tab === 'vendorBill' ? 7 : 4} className="text-end">
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
    <div className="container-fluid mt-4 px-2" id="purchase-form">
      <h4 className="text-center mb-4">Purchase Process</h4>

      {/* Top Action Buttons */}
      <div className="d-flex flex-wrap justify-content-center gap-2 gap-sm-3 mb-4 text-center">
        <Button variant="warning" onClick={handlePrint} style={{ minWidth: "120px" }}>Print</Button>
        <Button variant="info" onClick={handleSend} style={{ color: 'white', minWidth: "120px" }}>Send</Button>
        <Button variant="success" onClick={handleDownloadPDF} style={{ minWidth: "130px" }}>Download PDF</Button>
        <Button variant="primary" onClick={handleDownloadExcel} style={{ minWidth: "130px" }}>Download Excel</Button>
      </div>

      <Tabs activeKey={key} onSelect={setKey} className="mb-4" fill>

        {/* ============= RFQ TAB ============= */}
        <Tab eventKey="rfq" title="RFQ">
          <Form>
            <Row className="mb-4 d-flex justify-content-between align-items-center">
              <Col md={3} className="d-flex align-items-center justify-content-center">
                <div
                  className="border rounded d-flex flex-column align-items-center justify-content-center"
                  style={{ height: "120px", width: "100%", borderStyle: "dashed", cursor: "pointer" }}
                  onClick={() => document.getElementById('logo-upload-rfq')?.click()}
                >
                  <FontAwesomeIcon icon={faUpload} size="2x" className="text-muted" />
                  <small>Upload Logo</small>
                  <input id="logo-upload-rfq" type="file" accept="image/*" hidden />
                </div>
              </Col>
              <Col md={3} className="d-flex flex-column align-items-end justify-content-center">
                <h2 className="text-primary mb-0">REQUEST FOR QUOTATION</h2>
                <hr
                  style={{
                    width: "80%",
                    borderColor: "#007bff",
                    marginTop: "5px",
                    marginBottom: "10px",
                  }}
                />
              </Col>
            </Row>

            <hr
              style={{
                width: "100%",
                height: "4px",
                backgroundColor: "#007bff",
                border: "none",
                marginTop: "5px",
                marginBottom: "10px",
              }}
            />

            <Row className="mb-4 mt-3">
              <Col md={6}>
                <div className="d-flex flex-column gap-1">
                  <Form.Control
                    type="text"
                    value={formData.rfq.companyName}
                    onChange={(e) => handleChange("rfq", "companyName", e.target.value)}
                    placeholder="Your Company Name"
                    className="form-control-no-border"
                    style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
                  />
                  <Form.Control
                    type="text"
                    value={formData.rfq.companyAddress}
                    onChange={(e) => handleChange("rfq", "companyAddress", e.target.value)}
                    placeholder="Company Address, City, State, Pincode"
                    className="form-control-no-border"
                    style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
                  />
                  <Form.Control
                    type="email"
                    value={formData.rfq.companyEmail}
                    onChange={(e) => handleChange("rfq", "companyEmail", e.target.value)}
                    placeholder="Company Email"
                    className="form-control-no-border"
                    style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
                  />
                  <Form.Control
                    type="text"
                    value={formData.rfq.companyPhone}
                    onChange={(e) => handleChange("rfq", "companyPhone", e.target.value)}
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
                      value={formData.rfq.rfqDate}
                      onChange={(e) => handleChange("rfq", "rfqDate", e.target.value)}
                      placeholder="RFQ Date"
                      className="form-control-no-border text-end"
                      style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0", textAlign: "right" }}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      value={formData.rfq.rfqNo}
                      onChange={(e) => handleChange("rfq", "rfqNo", e.target.value)}
                      placeholder="RFQ No."
                      className="form-control-no-border text-end"
                      style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0", textAlign: "right" }}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="date"
                      value={formData.rfq.validTill}
                      onChange={(e) => handleChange("rfq", "validTill", e.target.value)}
                      placeholder="Valid Till"
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
                height: "4px",
                backgroundColor: "#007bff",
                border: "none",
                marginTop: "5px",
                marginBottom: "10px",
              }}
            />

            <Row className="mb-4 d-flex justify-content-between">
              <Col md={6} className="d-flex flex-column align-items-start">
                <h5>SUPPLIER</h5>
                <Form.Group className="mb-2 w-100">
                  <Form.Label>Supplier Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.rfq.supplierName}
                    onChange={(e) => handleChange("rfq", "supplierName", e.target.value)}
                    placeholder="Supplier Name"
                    className="form-control-no-border"
                    style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
                  />
                </Form.Group>
                <Form.Group className="mb-2 w-100">
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={formData.rfq.supplierAddress}
                    onChange={(e) => handleChange("rfq", "supplierAddress", e.target.value)}
                    placeholder="Supplier Address"
                    className="form-control-no-border"
                    style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
                  />
                </Form.Group>
                <Form.Group className="mb-2 w-100">
                  <Form.Control
                    type="email"
                    value={formData.rfq.supplierEmail}
                    onChange={(e) => handleChange("rfq", "supplierEmail", e.target.value)}
                    placeholder="Email"
                    className="form-control-no-border"
                    style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
                  />
                </Form.Group>
                <Form.Group className="mb-2 w-100">
                  <Form.Control
                    type="text"
                    value={formData.rfq.supplierPhone}
                    onChange={(e) => handleChange("rfq", "supplierPhone", e.target.value)}
                    placeholder="Phone"
                    className="form-control-no-border"
                    style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="d-flex flex-column align-items-end">
                <h5>DELIVERY & CONTACT</h5>
                <div className="w-100 text-end" style={{ maxWidth: "400px" }}>
                  <Form.Group className="mb-2">
                    <Form.Control
                      type="text"
                      value={formData.rfq.contactPerson}
                      onChange={(e) => handleChange("rfq", "contactPerson", e.target.value)}
                      placeholder="Contact Person"
                      className="form-control-no-border text-end"
                      style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0", textAlign: "right" }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={formData.rfq.deliveryAddress}
                      onChange={(e) => handleChange("rfq", "deliveryAddress", e.target.value)}
                      placeholder="Delivery Address"
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
                height: "4px",
                backgroundColor: "#007bff",
                border: "none",
                marginTop: "5px",
                marginBottom: "10px",
              }}
            />

            <div className="mt-4">{renderItemsTable('rfq')}</div>

            <Row className="mb-4 mt-2">
              <Col md={{ span: 4, offset: 8 }}>
                <Table bordered size="sm" className="text-end">
                  <tbody>
                    <tr>
                      <td className="fw-bold">Total:</td>
                      <td className="fw-bold">${calculateTotalAmount(formData.rfq.items).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.rfq.notes || ""}
                    onChange={(e) => handleChange("rfq", "notes", e.target.value)}
                    placeholder="e.g. Need urgent delivery"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Terms & Conditions</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.rfq.terms}
                    onChange={(e) => handleChange("rfq", "terms", e.target.value)}
                    placeholder="e.g. Quote within 3 days"
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-between mt-4 border-top pt-3">
              <Button variant="secondary" onClick={handleSkip}>Skip</Button>
              <Button variant="warning" onClick={handleSaveDraft}>Save Draft</Button>
              <Button variant="primary" onClick={handleSaveNext}>Save & Next</Button>
              <Button variant="success" onClick={handleNext}>Next</Button>
            </div>
          </Form>
        </Tab>

        {/* ============= PURCHASE ORDER TAB ============= */}
        <Tab eventKey="purchaseOrder" title="Purchase Order">
          <Form>
            <Row className="mb-4 d-flex justify-content-between align-items-center">
              <Col md={3} className="d-flex align-items-center justify-content-center">
                <div
                  className="border rounded d-flex flex-column align-items-center justify-content-center"
                  style={{ height: "120px", width: "100%", borderStyle: "dashed", cursor: "pointer" }}
                  onClick={() => document.getElementById('logo-upload-po')?.click()}
                >
                  <FontAwesomeIcon icon={faUpload} size="2x" className="text-muted" />
                  <small>Upload Logo</small>
                  <input id="logo-upload-po" type="file" accept="image/*" hidden />
                </div>
              </Col>
              <Col md={3} className="d-flex flex-column align-items-end justify-content-center">
                <h2 className="text-success mb-0">PURCHASE ORDER</h2>
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
                height: "4px",
                backgroundColor: "#28a745",
                border: "none",
                marginTop: "5px",
                marginBottom: "10px",
              }}
            />

            <Row className="mb-4 mt-3">
              <Col md={6}>
                <div className="d-flex flex-column gap-1">
                  <Form.Control
                    type="text"
                    value={formData.purchaseOrder.companyName}
                    onChange={(e) => handleChange("purchaseOrder", "companyName", e.target.value)}
                    placeholder="Your Company Name"
                    className="form-control-no-border"
                    style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
                  />
                  <Form.Control
                    type="text"
                    value={formData.purchaseOrder.companyAddress}
                    onChange={(e) => handleChange("purchaseOrder", "companyAddress", e.target.value)}
                    placeholder="Company Address, City, State, Pincode"
                    className="form-control-no-border"
                    style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
                  />
                  <Form.Control
                    type="email"
                    value={formData.purchaseOrder.companyEmail}
                    onChange={(e) => handleChange("purchaseOrder", "companyEmail", e.target.value)}
                    placeholder="Company Email"
                    className="form-control-no-border"
                    style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
                  />
                  <Form.Control
                    type="text"
                    value={formData.purchaseOrder.companyPhone}
                    onChange={(e) => handleChange("purchaseOrder", "companyPhone", e.target.value)}
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
                      value={formData.purchaseOrder.poDate}
                      onChange={(e) => handleChange("purchaseOrder", "poDate", e.target.value)}
                      placeholder="PO Date"
                      className="form-control-no-border text-end"
                      style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0", textAlign: "right" }}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      value={formData.purchaseOrder.poNo}
                      onChange={(e) => handleChange("purchaseOrder", "poNo", e.target.value)}
                      placeholder="PO No."
                      className="form-control-no-border text-end"
                      style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0", textAlign: "right" }}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="date"
                      value={formData.purchaseOrder.deliveryDate}
                      onChange={(e) => handleChange("purchaseOrder", "deliveryDate", e.target.value)}
                      placeholder="Delivery Date"
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
                height: "4px",
                backgroundColor: "#28a745",
                border: "none",
                marginTop: "5px",
                marginBottom: "10px",
              }}
            />

            <Row className="mb-4 d-flex justify-content-between">
              <Col md={6} className="d-flex flex-column align-items-start">
                <h5>SUPPLIER</h5>
                <Form.Group className="mb-2 w-100">
                  <Form.Label>Supplier Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.purchaseOrder.supplierName}
                    onChange={(e) => handleChange("purchaseOrder", "supplierName", e.target.value)}
                    placeholder="Supplier Name"
                    className="form-control-no-border"
                    style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
                  />
                </Form.Group>
                <Form.Group className="mb-2 w-100">
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={formData.purchaseOrder.supplierAddress}
                    onChange={(e) => handleChange("purchaseOrder", "supplierAddress", e.target.value)}
                    placeholder="Supplier Address"
                    className="form-control-no-border"
                    style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
                  />
                </Form.Group>
                <Form.Group className="mb-2 w-100">
                  <Form.Control
                    type="email"
                    value={formData.purchaseOrder.supplierEmail}
                    onChange={(e) => handleChange("purchaseOrder", "supplierEmail", e.target.value)}
                    placeholder="Email"
                    className="form-control-no-border"
                    style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
                  />
                </Form.Group>
                <Form.Group className="mb-2 w-100">
                  <Form.Control
                    type="text"
                    value={formData.purchaseOrder.supplierPhone}
                    onChange={(e) => handleChange("purchaseOrder", "supplierPhone", e.target.value)}
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
                      value={formData.purchaseOrder.shipToCompanyName || ""}
                      onChange={(e) => handleChange("purchaseOrder", "shipToCompanyName", e.target.value)}
                      placeholder="Company Name"
                      className="form-control-no-border text-end"
                      style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0", textAlign: "right" }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={formData.purchaseOrder.shipToAddress || ""}
                      onChange={(e) => handleChange("purchaseOrder", "shipToAddress", e.target.value)}
                      placeholder="Address"
                      className="form-control-no-border text-end"
                      style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0", textAlign: "right" }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Control
                      type="email"
                      value={formData.purchaseOrder.shipToEmail || ""}
                      onChange={(e) => handleChange("purchaseOrder", "shipToEmail", e.target.value)}
                      placeholder="Email"
                      className="form-control-no-border text-end"
                      style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0", textAlign: "right" }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Control
                      type="text"
                      value={formData.purchaseOrder.shipToPhone || ""}
                      onChange={(e) => handleChange("purchaseOrder", "shipToPhone", e.target.value)}
                      placeholder="Phone"
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
                height: "4px",
                backgroundColor: "#28a745",
                border: "none",
                marginTop: "5px",
                marginBottom: "10px",
              }}
            />

            <div className="mt-4">{renderItemsTable('purchaseOrder')}</div>

            <Form.Group className="mt-4">
              <Form.Label>Terms & Conditions</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={formData.purchaseOrder.terms}
                onChange={(e) => handleChange('purchaseOrder', 'terms', e.target.value)}
              />
            </Form.Group>

            <div className="d-flex justify-content-between mt-4 border-top pt-3">
              <Button variant="secondary" onClick={handleSkip}>Skip</Button>
              <Button variant="warning" onClick={handleSaveDraft}>Save Draft</Button>
              <Button variant="primary" onClick={handleSaveNext}>Save & Next</Button>
              <Button variant="success" onClick={handleNext}>Next</Button>
            </div>
          </Form>
        </Tab>

        {/* ============= VENDOR BILL TAB ============= */}
     {/* ============= VENDOR BILL TAB ============= */}
<Tab eventKey="vendorBill" title="Vendor Bill">
  <Form>


    {/* Header: Logo + Title */}
    <Row className="mb-4 d-flex justify-content-between align-items-center">
      <Col md={3} className="d-flex align-items-center justify-content-center">
        <div
          className="border rounded d-flex flex-column align-items-center justify-content-center"
          style={{ height: "120px", width: "100%", borderStyle: "dashed", cursor: "pointer" }}
          onClick={() => document.getElementById('logo-upload-vendor-bill')?.click()}
        >
          <FontAwesomeIcon icon={faUpload} size="2x" className="text-muted" />
          <small>Upload Logo</small>
          <input id="logo-upload-vendor-bill" type="file" accept="image/*" hidden />
        </div>
      </Col>
      <Col md={3} className="d-flex flex-column align-items-end justify-content-center">
        <h2 className="text-warning mb-0">VENDOR BILL</h2>
        <hr
          style={{
            width: "80%",
            borderColor: "#ffc107",
            marginTop: "5px",
            marginBottom: "10px",
          }}
          
        />
            {/* Top Action Buttons: Import & Export */}
    <div className="d-flex flex-wrap justify-content-center gap-1 mb-6 text-center">
      <Button
        variant="info"
        onClick={() => document.getElementById('import-vendor-bill')?.click()}
        style={{ color: 'white', minWidth: "10px" }}
      >
         Import Bill
      </Button>
      {/* <Button
        variant="success"
        onClick={handleExportVendorBill}
        style={{ minWidth: "10px" }}
      >
         Export Bill
      </Button> */}

      {/* Hidden File Input for Import */}
      <input
        id="import-vendor-bill"
        type="file"
        accept=".xlsx, .csv"
        hidden
        onChange={handleImportVendorBill}
      />
    </div>
      </Col>
      
    </Row>

    {/* Green Line */}
    <hr
      style={{
        width: "100%",
        height: "4px",
        backgroundColor: "#ffc107",
        border: "none",
        marginTop: "5px",
        marginBottom: "10px",
      }}
    />

    {/* Company Info + Bill Details */}
    <Row className="mb-4 mt-3">
      <Col md={6}>
        <div className="d-flex flex-column gap-1">
          <Form.Control
            type="text"
            value={formData.vendorBill.companyName}
            onChange={(e) => handleChange("vendorBill", "companyName", e.target.value)}
            placeholder="Your Company Name"
            className="form-control-no-border"
            style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
          />
          <Form.Control
            type="text"
            value={formData.vendorBill.companyAddress}
            onChange={(e) => handleChange("vendorBill", "companyAddress", e.target.value)}
            placeholder="Company Address, City, State, Pincode"
            className="form-control-no-border"
            style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
          />
          <Form.Control
            type="email"
            value={formData.vendorBill.companyEmail}
            onChange={(e) => handleChange("vendorBill", "companyEmail", e.target.value)}
            placeholder="Company Email"
            className="form-control-no-border"
            style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
          />
          <Form.Control
            type="text"
            value={formData.vendorBill.companyPhone}
            onChange={(e) => handleChange("vendorBill", "companyPhone", e.target.value)}
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
              value={formData.vendorBill.billDate}
              onChange={(e) => handleChange("vendorBill", "billDate", e.target.value)}
              placeholder="Bill Date"
              className="form-control-no-border text-end"
              style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0", textAlign: "right" }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              value={formData.vendorBill.billNo}
              onChange={(e) => handleChange("vendorBill", "billNo", e.target.value)}
              placeholder="Bill No."
              className="form-control-no-border text-end"
              style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0", textAlign: "right" }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="date"
              value={formData.vendorBill.dueDate}
              onChange={(e) => handleChange("vendorBill", "dueDate", e.target.value)}
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
        backgroundColor: "#ffc107",
        border: "none",
        marginTop: "5px",
        marginBottom: "10px",
      }}
    />

    {/* Vendor + PO */}
    <Row className="mb-4 d-flex justify-content-between">
      <Col md={6} className="d-flex flex-column align-items-start">
        <h5>VENDOR</h5>
        <Form.Group className="mb-2 w-100">
          <Form.Label>Supplier Name</Form.Label>
          <Form.Control
            type="text"
            value={formData.vendorBill.supplierName}
            onChange={(e) => handleChange("vendorBill", "supplierName", e.target.value)}
            placeholder="Supplier Name"
            className="form-control-no-border"
            style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
          />
        </Form.Group>
        <Form.Group className="mb-2 w-100">
          <Form.Control
            as="textarea"
            rows={2}
            value={formData.vendorBill.supplierAddress}
            onChange={(e) => handleChange("vendorBill", "supplierAddress", e.target.value)}
            placeholder="Supplier Address"
            className="form-control-no-border"
            style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
          />
        </Form.Group>
        <Form.Group className="mb-2 w-100">
          <Form.Control
            type="email"
            value={formData.vendorBill.supplierEmail}
            onChange={(e) => handleChange("vendorBill", "supplierEmail", e.target.value)}
            placeholder="Email"
            className="form-control-no-border"
            style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
          />
        </Form.Group>
        <Form.Group className="mb-2 w-100">
          <Form.Control
            type="text"
            value={formData.vendorBill.supplierPhone}
            onChange={(e) => handleChange("vendorBill", "supplierPhone", e.target.value)}
            placeholder="Phone"
            className="form-control-no-border"
            style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
          />
        </Form.Group>
      </Col>
      <Col md={6} className="d-flex flex-column align-items-end">
        <h5>PURCHASE ORDER</h5>
        <div className="w-100 text-end" style={{ maxWidth: "400px" }}>
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              value={formData.vendorBill.poNo}
              onChange={(e) => handleChange("vendorBill", "poNo", e.target.value)}
              placeholder="PO No."
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
        backgroundColor: "#ffc107",
        border: "none",
        marginTop: "5px",
        marginBottom: "10px",
      }}
    />

    {/* Items Table */}
    <div className="mt-4">{renderItemsTable('vendorBill')}</div>

    {/* Totals */}
    <Row className="mb-4 mt-2">
      <Col md={{ span: 4, offset: 8 }}>
        <Table bordered size="sm" className="text-end">
          <tbody>
            <tr>
              <td className="fw-bold">Sub Total:</td>
              <td>${calculateTotalAmount(formData.vendorBill.items).toFixed(2)}</td>
            </tr>
            <tr>
              <td className="fw-bold">Total Due:</td>
              <td className="fw-bold">${calculateTotalAmount(formData.vendorBill.items).toFixed(2)}</td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>

    {/* Terms & Footer */}
    <Form.Group className="mt-4">
      <Form.Label>Terms & Conditions</Form.Label>
      <Form.Control
        as="textarea"
        rows={2}
        value={formData.vendorBill.terms}
        onChange={(e) => handleChange('vendorBill', 'terms', e.target.value)}
      />
    </Form.Group>

    <Row className="text-center mt-5 mb-4 pt-3 border-top">
      <Col>
        <Form.Control
          type="text"
          value={formData.vendorBill.footerNote}
          onChange={(e) => handleChange("vendorBill", "footerNote", e.target.value)}
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

        {/* ============= PAYMENT TAB ============= */}
        <Tab eventKey="payment" title="Payment">
          <Form>
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
                <h2 className="text-success mb-0">PAYMENT</h2>
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
                height: "4px",
                backgroundColor: "#28a745",
                border: "none",
                marginTop: "5px",
                marginBottom: "10px",
              }}
            />

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
                      value={formData.payment.billNo}
                      onChange={(e) => handleChange("payment", "billNo", e.target.value)}
                      placeholder="Bill No."
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

            <Row className="mb-4 d-flex justify-content-between">
              <Col md={6} className="d-flex flex-column align-items-start">
                <h5>PAY TO</h5>
                <Form.Group className="mb-2 w-100">
                  <Form.Label>Supplier Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.payment.supplierName || ""}
                    onChange={(e) => handleChange("payment", "supplierName", e.target.value)}
                    placeholder="Supplier Name"
                    className="form-control-no-border"
                    style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
                  />
                </Form.Group>
                <Form.Group className="mb-2 w-100">
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={formData.payment.supplierAddress || ""}
                    onChange={(e) => handleChange("payment", "supplierAddress", e.target.value)}
                    placeholder="Supplier Address"
                    className="form-control-no-border"
                    style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
                  />
                </Form.Group>
                <Form.Group className="mb-2 w-100">
                  <Form.Control
                    type="email"
                    value={formData.payment.supplierEmail || ""}
                    onChange={(e) => handleChange("payment", "supplierEmail", e.target.value)}
                    placeholder="Email"
                    className="form-control-no-border"
                    style={{ fontSize: "1rem", lineHeight: "1.5", minHeight: "auto", padding: "0" }}
                  />
                </Form.Group>
                <Form.Group className="mb-2 w-100">
                  <Form.Control
                    type="text"
                    value={formData.payment.supplierPhone || ""}
                    onChange={(e) => handleChange("payment", "supplierPhone", e.target.value)}
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
                    <Form.Label>Amount Paid</Form.Label>
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
                      value={formData.payment.totalAmount || calculateTotalAmount(formData.vendorBill.items).toFixed(2)}
                      onChange={(e) => handleChange("payment", "totalAmount", e.target.value)}
                      placeholder="Total Bill"
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

            <Row className="mb-4 mt-2">
              <Col md={{ span: 4, offset: 8 }}>
                <Table bordered size="sm" className="text-end">
                  <tbody>
                    <tr>
                      <td className="fw-bold">Total Bill:</td>
                      <td>${(parseFloat(formData.payment.totalAmount) || calculateTotalAmount(formData.vendorBill.items)).toFixed(2)}</td>
                    </tr>
                    <tr className="fw-bold">
                      <td>Amount Paid:</td>
                      <td>${(parseFloat(formData.payment.amount) || 0).toFixed(2)}</td>
                    </tr>
                    <tr style={{ backgroundColor: "#f8f9fa" }}>
                      <td className="fw-bold">Balance:</td>
                      <td className="fw-bold text-danger">
                        ${(
                          (parseFloat(formData.payment.totalAmount) || calculateTotalAmount(formData.vendorBill.items)) -
                          (parseFloat(formData.payment.amount) || 0)
                        ).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>

            <Form.Group className="mt-4">
              <Form.Label>Note</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={formData.payment.note}
                onChange={(e) => handleChange("payment", "note", e.target.value)}
                placeholder="e.g. Payment via UPI"
              />
            </Form.Group>

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