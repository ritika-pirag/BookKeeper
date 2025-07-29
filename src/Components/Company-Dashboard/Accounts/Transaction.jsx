// Replace your code with this full updated version
import React, { useState } from 'react';
import {
  Button,
  Form,
  Modal,
  Row,
  Col,
  Table,
} from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaEye, FaFileImport, FaFileExport, FaDownload } from 'react-icons/fa';
import * as XLSX from "xlsx";

const Transaction = () => {
  const [transactions, setTransactions] = useState([
    {
      date: '2025-07-01',
      balanceType: 'Receive',
      amount: 1200,
      fromTo: 'Customer A',
      accountType: 'Assets',
      account: 'Cash in Hand',
      voucherNo: 'VCH001',
      note: 'Advance Payment'
    },
    {
      date: '2025-07-03',
      balanceType: 'Payment',
      amount: 800,
      fromTo: 'Vendor X',
      accountType: 'Liabilities',
      account: 'Bank Account',
      voucherNo: 'VCH002',
      note: 'Material Purchase'
    }
  ]);

  const accountTypes = ["Assets", "Liabilities", "Income", "Expenses"];

  const predefinedAccounts = {
    Assets: ["Cash in Hand", "Bank Account", "Petty Cash", "Accounts Receivable", "Inventory", "Fixed Assets", "Prepaid Expenses", "Advance to Suppliers", "Deposits"],
    Liabilities: ["Accounts Payable", "Loans Payable", "Accrued Expenses", "GST Payable", "Salary Payable", "Credit Card Payable", "Advance from Customers"],
    Income: ["Sales", "Service Income", "Commission Received", "Interest Income", "Other Operating Revenue"],
    Expenses: ["Rent", "Salaries", "Wages", "Electricity", "Internet Charges", "Office Supplies", "Travel Expenses", "Bank Charges", "Insurance"]
  };

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const emptyForm = {
    date: '',
    balanceType: 'Receive',
    amount: '',
    fromTo: '',
    accountType: '',
    account: '',
    voucherNo: '',
    note: ''
  };
  const [form, setForm] = useState({ ...emptyForm });

  const customerList = ['Customer A', 'Customer B', 'Customer C'];
  const vendorList = ['Vendor X', 'Vendor Y', 'Vendor Z'];

  const [fromToType, setFromToType] = useState('Customer');

  const customBtn = {
    backgroundColor: '#27b2b6',
    border: 'none',
    borderRadius: '50px',
    padding: '6px 16px',
    color: '#fff'
  };

  // Excel Import/Export/Download
  const fileInputRef = React.useRef();

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { defval: "" });
      const imported = data.map((row) => ({
        date: row["Date"] || "",
        balanceType: row["Balance Type"] || "",
        amount: row["Amount"] || "",
        fromTo: row["From/To"] || "",
        accountType: row["Account Type"] || "",
        account: row["Account"] || "",
        voucherNo: row["Voucher No"] || "",
        note: row["Note"] || ""
      }));
      setTransactions((prev) => [...prev, ...imported]);
    };
    reader.readAsBinaryString(file);
  };

  const handleExport = () => {
    const data = transactions.map((txn) => ({
      Date: txn.date,
      "Balance Type": txn.balanceType,
      Amount: txn.amount,
      "From/To": txn.fromTo,
      "Account Type": txn.accountType,
      Account: txn.account,
      "Voucher No": txn.voucherNo,
      Note: txn.note
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transactions");
    XLSX.writeFile(wb, "transactions.xlsx");
  };

  const handleDownloadBlank = () => {
    const blankRow = {
      Date: "",
      "Balance Type": "",
      Amount: "",
      "From/To": "",
      "Account Type": "",
      Account: "",
      "Voucher No": "",
      Note: ""
    };
    const ws = XLSX.utils.json_to_sheet([blankRow]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transactions");
    XLSX.writeFile(wb, "transaction_template.xlsx");
  };

  const handleSave = () => {
    const updated = [...transactions];
    if (selectedTransaction !== null) {
      updated[selectedTransaction] = form;
      setTransactions(updated);
    } else {
      setTransactions([...transactions, form]);
    }
    setShowModal(false);
    setSelectedTransaction(null);
    setForm({ ...emptyForm });
    setFromToType('Customer');
  };

  const handleEdit = (idx) => {
    setSelectedTransaction(idx);
    setForm(transactions[idx]);
    setFromToType(customerList.includes(transactions[idx].fromTo) ? 'Customer' : 'Vendor');
    setShowModal(true);
  };

  const handleView = (idx) => {
    setSelectedTransaction(idx);
    setShowViewModal(true);
  };

  const handleDelete = (idx) => {
    setTransactions(transactions.filter((_, i) => i !== idx));
  };

  return (
    <div className="p-3">
      <Row className="mb-3">
        <Col><h4>Transactions</h4></Col>
        <Col className="text-end d-flex gap-2 justify-content-end">
          <input
            type="file"
            accept=".xlsx, .xls"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImport}
          />
          <Button
            variant="success"
            className="rounded-pill d-flex align-items-center"
            style={{ fontWeight: 600 }}
            onClick={() => fileInputRef.current.click()}
            title="Import Excel"
          >
            <FaFileImport className="me-2" /> Import
          </Button>
          <Button
            variant="primary"
            className="rounded-pill d-flex align-items-center"
            style={{ fontWeight: 600 }}
            onClick={handleExport}
            title="Export Excel"
          >
            <FaFileExport className="me-2" /> Export
          </Button>
          <Button
            variant="warning"
            className="rounded-pill d-flex align-items-center"
            style={{ fontWeight: 600, color: "#fff" }}
            onClick={handleDownloadBlank}
            title="Download Blank Excel"
          >
            <FaDownload className="me-2" /> Download
          </Button>
          <Button
            style={customBtn}
            onClick={() => {
              setSelectedTransaction(null);
              setForm({ ...emptyForm });
              setFromToType('Customer');
              setShowModal(true);
            }}
          >
            
            Add Transaction
          </Button>
        </Col>
      </Row>

      <Table bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Balance Type</th>
            <th>Voucher No</th>
            <th>Amount</th>
            <th>From/To</th>
            <th>Account Type</th>
            <th>Account</th>
            <th>Note</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((txn, idx) => (
              <tr key={idx}>
                <td>{txn.date}</td>
                <td>{txn.balanceType}</td>
                <td>{txn.voucherNo}</td>
                <td>{txn.amount}</td>
                <td>{txn.fromTo}</td>
                <td>{txn.accountType}</td>
                <td>{txn.account}</td>
                <td>{txn.note}</td>
                <td>
                  <Button variant="link" onClick={() => handleView(idx)}><FaEye /></Button>
                  <Button variant="link" onClick={() => handleEdit(idx)}><FaEdit /></Button>
                  <Button variant="link" onClick={() => handleDelete(idx)} className="text-danger"><FaTrash /></Button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="9" className="text-center">No transactions found</td></tr>
          )}
        </tbody>
      </Table>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}  size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedTransaction !== null ? 'Edit' : 'Add'} Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Balance Type</Form.Label>
              <Form.Select
                value={form.balanceType}
                onChange={(e) => setForm({ ...form, balanceType: e.target.value })}
              >
                <option value="Receive">Receive</option>
                <option value="Payment">Payment</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Voucher No</Form.Label>
              <Form.Control
                type="text"
                value={form.voucherNo}
                onChange={(e) => setForm({ ...form, voucherNo: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
              />
            </Form.Group>

            {/* From / To Dropdown */}
            <Form.Group className="mb-2">
              <Form.Label>From / To</Form.Label>
              <Row>
                <Col md={4}>
                  <Form.Select
                    value={fromToType}
                    onChange={(e) => {
                      setFromToType(e.target.value);
                      setForm({ ...form, fromTo: '' });
                    }}
                  >
                    <option value="Customer">Customer</option>
                    <option value="Vendor">Vendor</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Select
                    value={form.fromTo}
                    onChange={(e) => setForm({ ...form, fromTo: e.target.value })}
                  >
                    <option value="">Select {fromToType}</option>
                    {(fromToType === 'Customer' ? customerList : vendorList).map((name, i) => (
                      <option key={i} value={name}>{name}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>

            {/* Account Type & Account Name */}
            <Form.Group className="mb-3">
              <Form.Label>Account Type</Form.Label>
              <Form.Select
                value={form.accountType}
                onChange={(e) =>
                  setForm({ ...form, accountType: e.target.value, account: '' })
                }
              >
                <option value="">Select Account Type</option>
                {accountTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Form.Select>
            </Form.Group>

            {form.accountType && (
              <Form.Group className="mb-3">
                <Form.Label>Account Name</Form.Label>
                <Form.Select
                  value={form.account}
                  onChange={(e) => setForm({ ...form, account: e.target.value })}
                >
                  <option value="">Select Account Name</option>
                  {predefinedAccounts[form.accountType]?.map((acc, i) => (
                    <option key={i} value={acc}>{acc}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}

            <Form.Group className="mb-2">
              <Form.Label>Note</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button style={customBtn} onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* View Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Transaction Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTransaction !== null && (
            <>
              <p><strong>Date:</strong> {transactions[selectedTransaction].date}</p>
              <p><strong>Balance Type:</strong> {transactions[selectedTransaction].balanceType}</p>
              <p><strong>Voucher No:</strong> {transactions[selectedTransaction].voucherNo}</p>
              <p><strong>Amount:</strong> {transactions[selectedTransaction].amount}</p>
              <p><strong>From/To:</strong> {transactions[selectedTransaction].fromTo}</p>
              <p><strong>Account Type:</strong> {transactions[selectedTransaction].accountType}</p>
              <p><strong>Account:</strong> {transactions[selectedTransaction].account}</p>
              <p><strong>Note:</strong> {transactions[selectedTransaction].note}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Transaction;



