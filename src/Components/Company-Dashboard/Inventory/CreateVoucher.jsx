import React, { useState, useRef } from "react";
import { Button, Form, Table, Modal, Row, Col } from "react-bootstrap";
import { FaEye, FaEdit, FaTrash, FaSignature, FaCamera, FaTimes } from "react-icons/fa";
import SignatureCanvas from "react-signature-canvas";

const VOUCHER_TYPES = [
  "Sales",
  "Purchase",
  "Receipt",
  "Payment",
  "Expense",
  "Contra",
  "Journal",
  "Credit Note",
  "Debit Note",
  "Stock/Inventory Adjustment",
  "Opening Balance",
];

const CUSTOMERS_VENDORS = [
  "ABC Traders",
  "XYZ Pvt Ltd",
  "Global Supplies",
  "John Doe Enterprises",
];

const initialFormData = {
  date: new Date().toISOString().split('T')[0],
  partyName: "",
  customerVendor: "",
  voucherNo: "INV0001",
  amount: "",
  paymentMode: "",
  items: [{ description: "", rate: 0, quantity: 1, amount: 0 }],
  note: "",
  reference: "",
  billNo: "",
  signature: null,
  photo: null,
  partyEmail: "",
  partyAddress: "",
  partyPhone: "",
  customerEmail: "",
  customerAddress: "",
  customerPhone: "",
  logo: null,
};

const CreateVoucherModal = ({ show, onHide, onSave, editData }) => {
  const [voucherType, setVoucherType] = useState(editData?.voucherType || "Receipt");
  const [formData, setFormData] = useState(editData || initialFormData);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const sigCanvas = useRef(null);
  const fileInputRef = useRef(null);
  const logoInputRef = useRef(null);

  React.useEffect(() => {
    if (editData) {
      setVoucherType(editData.voucherType);
      setFormData(editData);
    } else {
      setVoucherType("Receipt");
      setFormData(initialFormData);
    }
  }, [editData, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    
    // Calculate amount if rate or quantity changes
    if (field === 'rate' || field === 'quantity') {
      newItems[index].amount = newItems[index].rate * newItems[index].quantity;
    }
    
    setFormData({ ...formData, items: newItems });
  };

  const addNewItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: "", rate: 0, quantity: 1, amount: 0 }]
    });
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const handleSubmit = () => {
    if (!voucherType) return;
    onSave({ voucherType, ...formData, status: "Pending" });
    setFormData(initialFormData);
    setVoucherType("");
    onHide();
  };

  const handleSaveSignature = () => {
    if (sigCanvas.current) {
      const signatureData = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
      setFormData({ ...formData, signature: signatureData });
      setShowSignatureModal(false);
    }
  };

  const handleClearSignature = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
    }
  };

  const handleRemoveSignature = () => {
    setFormData({ ...formData, signature: null });
  };

  const handlePhotoUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, [field]: reader.result });
      };
      reader.readAsDataURL(file);
    }
    if (field === 'photo') {
      setShowPhotoModal(false);
    }
  };

  const handleRemovePhoto = (field) => {
    setFormData({ ...formData, [field]: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => sum + item.amount, 0);
  };

  // Get header title based on voucher type
  const getHeaderTitle = () => {
    switch(voucherType) {
      case "Payment":
        return "PAYMENT";
      case "Receipt":
        return "RECEIPT";
      case "Invoice":
        return "INVOICE";
      case "Bill":
        return "BILL";
      case "Credit Note":
        return "CREDIT NOTE";
      case "Debit Note":
        return "DEBIT NOTE";
      default:
        return "VOUCHER";
    }
  };

  // Get "From" label based on voucher type
  const getFromLabel = () => {
    switch(voucherType) {
      case "Payment":
      case "Credit Note":
        return "Paid By";
      case "Receipt":
      case "Debit Note":
        return "Received From";
      case "Invoice":
        return "From";
      case "Bill":
        return "Bill From";
      default:
        return "From";
    }
  };

  // Get "To" label based on voucher type
  const getToLabel = () => {
    switch(voucherType) {
      case "Payment":
      case "Credit Note":
        return "Paid To";
      case "Receipt":
      case "Debit Note":
        return "Received By";
      case "Invoice":
        return "Bill To";
      case "Bill":
        return "Bill To";
      default:
        return "To";
    }
  };

  // Get placeholder for name field based on voucher type
  const getNamePlaceholder = () => {
    switch(voucherType) {
      case "Payment":
        return "Paid By Name";
      case "Receipt":
        return "Received From Name";
      case "Invoice":
        return "Business Name";
      case "Bill":
        return "Vendor Name";
      case "Credit Note":
        return "Customer Name";
      case "Debit Note":
        return "Supplier Name";
      default:
        return "Name";
    }
  };

  // Get placeholder for customer/vendor field based on voucher type
  const getCustomerVendorPlaceholder = () => {
    switch(voucherType) {
      case "Payment":
        return "Paid To Name";
      case "Receipt":
        return "Received By Name";
      case "Invoice":
        return "Client Name";
      case "Bill":
        return "Your Business Name";
      case "Credit Note":
        return "Supplier Name";
      case "Debit Note":
        return "Customer Name";
      default:
        return "Name";
    }
  };

  // Get placeholder for email field based on voucher type
  const getEmailPlaceholder = (isFrom) => {
    if (isFrom) {
      switch(voucherType) {
        case "Payment":
          return "paidby@email.com";
        case "Receipt":
          return "receivedfrom@email.com";
        case "Invoice":
          return "yourbusiness@email.com";
        case "Bill":
          return "vendor@email.com";
        case "Credit Note":
          return "customer@email.com";
        case "Debit Note":
          return "supplier@email.com";
        default:
          return "email@example.com";
      }
    } else {
      switch(voucherType) {
        case "Payment":
          return "paidto@email.com";
        case "Receipt":
          return "receivedby@email.com";
        case "Invoice":
          return "client@email.com";
        case "Bill":
          return "yourbusiness@email.com";
        case "Credit Note":
          return "supplier@email.com";
        case "Debit Note":
          return "customer@email.com";
        default:
          return "email@example.com";
      }
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{editData ? "Edit Voucher" : "Create Voucher"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Voucher Type</Form.Label>
              <Form.Select
                value={voucherType}
                onChange={(e) => setVoucherType(e.target.value)}
              >
                <option value="">Select Type</option>
                {VOUCHER_TYPES.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Logo and Header Section */}
        <div className="d-flex justify-content-between align-items-start mb-4">
  <div>
    <h4 className="fw-bold">{getHeaderTitle()}</h4>
  </div>
  <div className="text-end">
    {formData.logo ? (
      <div className="position-relative">
        <img 
          src={formData.logo} 
          alt="Logo" 
          style={{ width: "150px", height: "100px", objectFit: "contain" }}
          className="border p-1"
        />
        <Button 
          variant="danger" 
          size="sm" 
          className="position-absolute top-0 end-0 translate-middle"
          onClick={() => handleRemovePhoto('logo')}
        >
          <FaTimes />
        </Button>
      </div>
    ) : (
      <div 
        className="border p-2 d-flex flex-column align-items-center justify-content-center" 
        style={{ width: "250px", height: "150px", cursor: "pointer" }}
        onClick={() => logoInputRef.current.click()}
      >
        <span>LOGO</span>
        <small className="text-muted">Click to upload</small>
        <input
          type="file"
          ref={logoInputRef}
          onChange={(e) => handlePhotoUpload(e, 'logo')}
          accept="image/*"
          style={{ display: "none" }}
        />
      </div>
    )}
  </div>
</div>


            {/* FROM & BILL TO SECTION */}
            <Row className="mb-5">
              {/* FROM SECTION */}
              <Col md={6}>
                <h6 className="fw-bold mb-3 text-dark">{getFromLabel()}</h6>
                <Form.Group as={Row} className="mb-3  align-items-center">
                  <Form.Label column sm={4}>Name</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="partyName"
                      value={formData.partyName}
                      onChange={handleChange}
                      placeholder={getNamePlaceholder()}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 align-items-center">
                  <Form.Label column sm={4}>Email</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="partyEmail"
                      value={formData.partyEmail}
                      onChange={handleChange}
                      placeholder={getEmailPlaceholder(true)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 align-items-center">
                  <Form.Label column sm={4}>Address</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="partyAddress"
                      value={formData.partyAddress}
                      onChange={handleChange}
                      placeholder="Street Address"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 align-items-center">
                  <Form.Label column sm={4}>Phone</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="partyPhone"
                      value={formData.partyPhone}
                      onChange={handleChange}
                      placeholder="(123) 456 7890"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-2 align-items-center">
                  <Form.Label column sm={4}>Business Number</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="partyBusinessNo"
                      value={formData.partyBusinessNo || ""}
                      onChange={handleChange}
                      placeholder="123-45-6789"
                    />
                  </Col>
                </Form.Group>
              </Col>

              {/* BILL TO SECTION */}
              <Col md={6}>
                <h6 className="fw-bold mb-3 text-dark">{getToLabel()}</h6>
                <Form.Group as={Row} className="mb-3 align-items-center">
                  <Form.Label column sm={4}>Name</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="customerVendor"
                      value={formData.customerVendor}
                      onChange={handleChange}
                      placeholder={getCustomerVendorPlaceholder()}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 align-items-center">
                  <Form.Label column sm={4}>Email</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="customerEmail"
                      value={formData.customerEmail}
                      onChange={handleChange}
                      placeholder={getEmailPlaceholder(false)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 align-items-center">
                  <Form.Label column sm={4}>Address</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="customerAddress"
                      value={formData.customerAddress}
                      onChange={handleChange}
                      placeholder="Street Address"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 align-items-center">
                  <Form.Label column sm={4}>Phone</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="customerPhone"
                      value={formData.customerPhone}
                      onChange={handleChange}
                      placeholder="(123) 456 7890"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 align-items-center">
                  <Form.Label column sm={4}>Mobile</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="customerMobile"
                      value={formData.customerMobile || ""}
                      onChange={handleChange}
                      placeholder="(123) 456 7890"
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            {/* Document Number and Date */}
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    {voucherType === "Invoice" ? "Invoice Number" : 
                     voucherType === "Bill" ? "Bill Number" : 
                     voucherType === "Payment" ? "Payment Number" : 
                     voucherType === "Receipt" ? "Receipt Number" : 
                     "Voucher Number"}
                  </Form.Label>
                  <Form.Control
                    name="voucherNo"
                    value={formData.voucherNo}
                    onChange={handleChange}
                    placeholder={
                      voucherType === "Invoice" ? "INV-001" : 
                      voucherType === "Bill" ? "BILL-001" : 
                      voucherType === "Payment" ? "PAY-001" : 
                      voucherType === "Receipt" ? "REC-001" : 
                      "VOUCH-001"
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    {voucherType === "Payment" ? "Payment Date" : 
                     voucherType === "Receipt" ? "Receipt Date" : 
                     "Date"}
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Items Table */}
            <h6 className="fw-bold mb-3 border-bottom pb-2">DESCRIPTION</h6>
            <Table bordered className="mb-3">
              <thead>
                <tr>
                  <th>DESCRIPTION</th>
                  <th>RATE</th>
                  <th>QTY</th>
                  <th>AMOUNT</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {formData.items.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <Form.Control
                        placeholder={
                          voucherType === "Payment" ? "Payment for..." : 
                          voucherType === "Receipt" ? "Received for..." : 
                          "Item description"
                        }
                        value={item.description}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        placeholder="0.00"
                        value={item.rate}
                        onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value) || 0)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        placeholder="1"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                      />
                    </td>
                    <td>₹{item.amount.toFixed(2)}</td>
                    <td>
                      <Button 
                        variant="danger" 
                        size="sm" 
                        onClick={() => removeItem(index)}
                        disabled={formData.items.length <= 1}
                      >
                        <FaTimes />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button 
              variant="outline-primary" 
              size="sm" 
              className="mb-4"
              onClick={addNewItem}
            >
              + Add {voucherType === "Payment" ? "Payment Item" : voucherType === "Receipt" ? "Receipt Item" : "Item"}
            </Button>

            {/* Totals */}
            <Row className="mb-4">
              <Col md={{ span: 4, offset: 8 }}>
                <Table borderless>
                  <tbody>
                    <tr>
                      <td className="fw-bold">Subtotal</td>
                      <td className="text-end">₹{calculateTotal().toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">
                        {voucherType === "Payment" ? "Amount Paid" : 
                         voucherType === "Receipt" ? "Amount Received" : 
                         "Balance Due"}
                      </td>
                      <td className="text-end">₹{calculateTotal().toFixed(2)}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>

            {/* Notes */}
            <h6 className="fw-bold mb-3 border-bottom pb-2">Notes</h6>
            <Form.Group className="mb-4">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder={
                  voucherType === "Payment" ? "Payment notes (terms, reference, etc.)" : 
                  voucherType === "Receipt" ? "Receipt notes (payment method, reference, etc.)" : 
                  "Notes - any relevant information not covered, additional terms and conditions"
                }
                name="note"
                value={formData.note}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Signature */}
            <h6 className="fw-bold mb-3 border-bottom pb-2">Signature</h6>
            <Form.Group className="mb-4">
              <div className="d-flex align-items-center gap-3 flex-wrap">
                {formData.signature ? (
                  <>
                    <div className="border p-2" style={{ width: "200px", height: "80px" }}>
                      <img 
                        src={formData.signature} 
                        alt="Signature" 
                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                      />
                    </div>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={handleRemoveSignature}
                    >
                      <FaTimes /> Remove
                    </Button>
                  </>
                ) : (
                  <Button 
                    style={{ backgroundColor: "#53b2a5", borderColor: "#53b2a5" }}
                    size="sm"
                    onClick={() => setShowSignatureModal(true)}
                  >
                    <FaSignature /> Add Signature
                  </Button>
                )}
              </div>
            </Form.Group>

            {/* Photo Upload */}
            <h6 className="fw-bold mb-3 border-bottom pb-2">Photos</h6>
            <Form.Group className="mb-4">
              <div className="d-flex align-items-center gap-3 flex-wrap">
                {formData.photo ? (
                  <>
                    <div className="border p-2" style={{ width: "200px", height: "150px" }}>
                      <img 
                        src={formData.photo} 
                        alt="Attached" 
                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                      />
                    </div>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleRemovePhoto('photo')}
                    >
                      <FaTimes /> Remove
                    </Button>
                  </>
                ) : (
                  <Button 
                    style={{ backgroundColor: "#53b2a5", borderColor: "#53b2a5" }}
                    size="sm"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <FaCamera /> Add Photo
                  </Button>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => handlePhotoUpload(e, 'photo')}
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </div>
            </Form.Group>

            <div className="d-flex justify-content-end mt-4 gap-2">
              <Button
                variant="outline-secondary"
                className="rounded-pill"
                onClick={onHide}
              >
                Cancel
              </Button>
              <Button
                style={{
                  backgroundColor: "#53b2a5",
                  border: "none",
                  borderRadius: "50px",
                  fontWeight: 600,
                }}
                onClick={handleSubmit}
              >
                {editData ? "Update Voucher" : "Save Voucher"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Signature Modal */}
      <Modal show={showSignatureModal} onHide={() => setShowSignatureModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Signature</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="border" style={{ width: "100%", height: "200px" }}>
            <SignatureCanvas
              ref={sigCanvas}
              penColor="black"
              canvasProps={{
                width: "100%",
                height: "200px",
                className: "sigCanvas",
              }}
            />
          </div>
          <div className="d-flex justify-content-between mt-3">
            <Button variant="secondary" onClick={handleClearSignature}>
              Clear
            </Button>
            <Button variant="primary" style={{backgroundColor:"#53b2a5", borderColor:"#53b2a5"}} onClick={handleSaveSignature}> 
              Save Signature
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
const VoucherViewModal = ({ show, onHide, voucher }) => {
  const calculateTotal = (items) => {
    return items?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;
  };

  return (
    <Modal show={show} onHide={onHide} centered size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Voucher Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {voucher ? (
          <div>
            <div className="d-flex justify-content-between align-items-start mb-4">
              <div>
                <h4 className="fw-bold">{voucher.voucherType}</h4>
              </div>
              {voucher.logo && (
                <div>
                  <img 
                    src={voucher.logo} 
                    alt="Logo" 
                    style={{ width: "100px", height: "100px", objectFit: "contain" }}
                    className="border p-1"
                  />
                </div>
              )}
            </div>

            <Row className="mb-4">
              <Col md={6}>
                <h6 className="fw-bold mb-3 border-bottom pb-2">From</h6>
                <p><strong>{voucher.partyName}</strong></p>
                <p>{voucher.partyEmail}</p>
                <p>{voucher.partyAddress}</p>
                <p>{voucher.partyPhone}</p>
              </Col>

              <Col md={6}>
                <h6 className="fw-bold mb-3 border-bottom pb-2">Bill To</h6>
                <p><strong>{voucher.customerVendor}</strong></p>
                <p>{voucher.customerEmail}</p>
                <p>{voucher.customerAddress}</p>
                <p>{voucher.customerPhone}</p>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <p><strong>Invoice Number:</strong> {voucher.voucherNo}</p>
              </Col>
              <Col md={6}>
                <p><strong>Date:</strong> {voucher.date}</p>
              </Col>
            </Row>

            <h6 className="fw-bold mb-3 border-bottom pb-2">DESCRIPTION</h6>
            <Table bordered responsive className="mb-3 responsive" >
              <thead>
                <tr>
                  <th>DESCRIPTION</th>
                  <th>RATE</th>
                  <th>QTY</th>
                  <th>AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {voucher.items?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.description}</td>
                    <td>₹{item.rate?.toFixed(2)}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.amount?.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Row className="mb-4">
              <Col md={{ span: 4, offset: 8 }}>
                <Table borderless>
                  <tbody>
                    <tr>
                      <td className="fw-bold">Subtotal</td>
                      <td className="text-end">₹{calculateTotal(voucher.items).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Balance Due</td>
                      <td className="text-end">₹{calculateTotal(voucher.items).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>

            {voucher.note && (
              <>
                <h6 className="fw-bold mb-3 border-bottom pb-2">Notes</h6>
                <p className="mb-4">{voucher.note}</p>
              </>
            )}

            {voucher.signature && (
              <>
                <h6 className="fw-bold mb-3 border-bottom pb-2">Signature</h6>
                <div className="mb-4">
                  <img 
                    src={voucher.signature} 
                    alt="Signature" 
                    style={{ maxWidth: "200px", border: "1px solid #ddd" }}
                  />
                </div>
              </>
            )}

            {voucher.photo && (
              <>
                <h6 className="fw-bold mb-3 border-bottom pb-2">Photos</h6>
                <div className="mb-4">
                  <img 
                    src={voucher.photo} 
                    alt="Attached" 
                    style={{ maxWidth: "300px", border: "1px solid #ddd" }}
                  />
                </div>
              </>
            )}
          </div>
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

const VoucherPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [editVoucher, setEditVoucher] = useState(null);
  const [viewVoucher, setViewVoucher] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [vouchers, setVouchers] = useState([]);

  const handleSaveVoucher = (voucher) => {
    if (editVoucher !== null) {
      const updated = [...vouchers];
      updated[editVoucher] = voucher;
      setVouchers(updated);
      setEditVoucher(null);
    } else {
      setVouchers([...vouchers, voucher]);
    }
    setShowModal(false);
  };

  const handleEdit = (idx) => {
    setEditVoucher(idx);
    setShowModal(true);
  };

  const handleView = (idx) => {
    setViewVoucher(vouchers[idx]);
    setShowViewModal(true);
  };

  const handleDelete = (idx) => {
    setVouchers(vouchers.filter((_, i) => i !== idx));
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Vouchers</h4>
        <Button
          style={{
            backgroundColor: "#53b2a5",
            border: "none",
            borderRadius: "50px",
            fontWeight: 600,
          }}
          className="rounded-pill"
          onClick={() => { setEditVoucher(null); setShowModal(true); }}
        >
          Create Voucher
        </Button>
      </div>

      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Date</th>
            <th>Party</th>
            <th>Customer/Vendor</th>
            <th>Voucher No</th>
            <th>Amount</th>
            <th>Mode</th>
            <th>Bill No</th>
            <th>Reference</th>
            <th>Note</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {vouchers.map((v, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{v.voucherType}</td>
              <td>{v.date}</td>
              <td>{v.partyName}</td>
              <td>{v.customerVendor}</td>
              <td>{v.voucherNo}</td>
              <td>{v.amount}</td>
              <td>{v.paymentMode}</td>
              <td>{v.billNo}</td>
              <td>{v.reference}</td>
              <td>{v.note}</td>
              <td>
                <div className="d-flex gap-2">
                  <Button variant="link" className="text-info p-0" onClick={() => handleView(i)}>
                    <FaEye />
                  </Button>
                  <Button variant="link" className="text-warning p-0" onClick={() => handleEdit(i)}>
                    <FaEdit />
                  </Button>
                  <Button variant="link" className="text-danger p-0" onClick={() => handleDelete(i)}>
                    <FaTrash />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
          {vouchers.length === 0 && (
            <tr>
              <td colSpan="12" className="text-center">
                No vouchers added yet
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <CreateVoucherModal
        show={showModal}
        onHide={() => { setShowModal(false); setEditVoucher(null); }}
        onSave={handleSaveVoucher}
        editData={editVoucher !== null ? vouchers[editVoucher] : null}
      />

      <VoucherViewModal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        voucher={viewVoucher}
      />
    </div>
  );
};

export default VoucherPage;