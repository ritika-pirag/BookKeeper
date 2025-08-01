import React, { useState } from "react";
import { Button, Form, Table, Modal } from "react-bootstrap";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

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

const voucherFieldsMap = {
  common: [
    "date",
    "partyName",
    "customerVendor",
    "voucherNo",
    "amount",
    "paymentMode",
    "note",
    "reference",
    "billNo",
  ],
  Sales: ["items"],
  Purchase: ["items"],
  "Stock/Inventory Adjustment": ["stockAdjustmentType", "items"],
};

const initialFormData = {
  date: "",
  partyName: "",
  customerVendor: "",
  voucherNo: "",
  amount: "",
  paymentMode: "",
  items: "",
  note: "",
  reference: "",
  stockAdjustmentType: "",
  billNo: "",
};

const CreateVoucherModal = ({ show, onHide, onSave, editData }) => {
  const [voucherType, setVoucherType] = useState(editData?.voucherType || "");
  const [formData, setFormData] = useState(editData || initialFormData);

  React.useEffect(() => {
    if (editData) {
      setVoucherType(editData.voucherType);
      setFormData(editData);
    } else {
      setVoucherType("");
      setFormData(initialFormData);
    }
  }, [editData, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (!voucherType) return;
    onSave({ voucherType, ...formData, status: "Pending" });
    setFormData(initialFormData);
    setVoucherType("");
    onHide();
  };

  const visibleFields = [
    ...voucherFieldsMap.common,
    ...(voucherFieldsMap[voucherType] || []),
  ];

  return (
    <Modal show={show} onHide={onHide} centered   size="xl">
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

          {visibleFields.includes("date") && (
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </Form.Group>
          )}

          {visibleFields.includes("partyName") && (
            <Form.Group className="mb-3">
              <Form.Label>Party Name</Form.Label>
              <Form.Control
                name="partyName"
                value={formData.partyName}
                onChange={handleChange}
              />
            </Form.Group>
          )}

          {visibleFields.includes("customerVendor") && (
            <Form.Group className="mb-3">
              <Form.Label>Customer / Vendor</Form.Label>
              <Form.Select
                name="customerVendor"
                value={formData.customerVendor}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {CUSTOMERS_VENDORS.map((cv) => (
                  <option key={cv}>{cv}</option>
                ))}
              </Form.Select>
            </Form.Group>
          )}

          {visibleFields.includes("voucherNo") && (
            <Form.Group className="mb-3">
              <Form.Label>Voucher No</Form.Label>
              <Form.Control
                name="voucherNo"
                value={formData.voucherNo}
                onChange={handleChange}
              />
            </Form.Group>
          )}

          {visibleFields.includes("amount") && (
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
              />
            </Form.Group>
          )}

          {visibleFields.includes("paymentMode") && (
            <Form.Group className="mb-3">
              <Form.Label>Payment Mode</Form.Label>
              <Form.Select
                name="paymentMode"
                value={formData.paymentMode}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>Cash</option>
                <option>Bank</option>
                <option>Wallet</option>
              </Form.Select>
            </Form.Group>
          )}

          {visibleFields.includes("billNo") && (
            <Form.Group className="mb-3">
              <Form.Label>Bill / Invoice No</Form.Label>
              <Form.Control
                name="billNo"
                value={formData.billNo}
                onChange={handleChange}
              />
            </Form.Group>
          )}

          {visibleFields.includes("items") && (
            <Form.Group className="mb-3">
              <Form.Label>Items</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="items"
                value={formData.items}
                onChange={handleChange}
              />
            </Form.Group>
          )}

          {visibleFields.includes("stockAdjustmentType") && (
            <Form.Group className="mb-3">
              <Form.Label>Stock Adjustment Type</Form.Label>
              <Form.Select
                name="stockAdjustmentType"
                value={formData.stockAdjustmentType}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>Lost</option>
                <option>Damaged</option>
                <option>Manual</option>
              </Form.Select>
            </Form.Group>
          )}

          {visibleFields.includes("reference") && (
            <Form.Group className="mb-3">
              <Form.Label>Reference</Form.Label>
              <Form.Control
                name="reference"
                value={formData.reference}
                onChange={handleChange}
              />
            </Form.Group>
          )}

          {visibleFields.includes("note") && (
            <Form.Group className="mb-3">
              <Form.Label>Note</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="note"
                value={formData.note}
                onChange={handleChange}
              />
            </Form.Group>
          )}

          <div className="d-flex justify-content-end mt-4">
            <Button
              style={{
                backgroundColor: "#53b2a5",
                border: "none",
                borderRadius: "50px",
                fontWeight: 600,
              }}
              onClick={onHide}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              className="ms-2 rounded-pill"
              style={{
                backgroundColor: "#53b2a5",
                border: "none",
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
  );
};

const VoucherViewModal = ({ show, onHide, voucher }) => (
<Modal show={show} onHide={onHide} centered size="xl">
    <Modal.Header closeButton>
      <Modal.Title>Voucher Details</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {voucher ? (
        <div>
          <p><strong>Type:</strong> {voucher.voucherType}</p>
          <p><strong>Date:</strong> {voucher.date}</p>
          <p><strong>Party Name:</strong> {voucher.partyName}</p>
          <p><strong>Customer/Vendor:</strong> {voucher.customerVendor}</p>
          <p><strong>Voucher No:</strong> {voucher.voucherNo}</p>
          <p><strong>Amount:</strong> {voucher.amount}</p>
          <p><strong>Payment Mode:</strong> {voucher.paymentMode}</p>
          <p><strong>Bill No:</strong> {voucher.billNo}</p>
          <p><strong>Reference:</strong> {voucher.reference}</p>
          <p><strong>Note:</strong> {voucher.note}</p>
          <p><strong>Status:</strong> {voucher.status}</p>
        </div>
      ) : null}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
);

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