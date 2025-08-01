// Replace your code with this full updated version
import React, { useState } from 'react';
import {
  Button,
  Form,
  Modal,
  Row,
  Col,
  Table,
  Card
} from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaEye, FaFileImport, FaFileExport, FaDownload, FaBook } from 'react-icons/fa';
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

const Transaction = () => {
  const navigate = useNavigate();
  const [filterVoucherType, setFilterVoucherType] = useState('');
  const [filterVoucherNo, setFilterVoucherNo] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const [transactions, setTransactions] = useState([
    {
      date: '2025-07-01',
      balanceType: 'Receive',
      voucherType: 'Sales',
      amount: 1200,
      fromTo: 'Customer A',
      accountType: 'Assets',
      accountname: 'Cash in Hand',
      voucherNo: 'VCH001',
      note: 'Advance Payment'
    },
    {
      date: '2025-07-03',
      balanceType: 'Make Payment',
      voucherType: 'Purchase',
      amount: 800,
      fromTo: 'Vendor X',
      accountType: 'Liabilities',
      accountname: 'Bank Account',
      voucherNo: 'VCH002',
      note: 'Material Purchase'
    },
    {
      date: '2025-07-05',
      balanceType: 'Receive',
      voucherType: 'Receipt',
      amount: 500,
      fromTo: 'Customer B',
      accountType: 'Income',
      accountname: 'Sales',
      voucherNo: 'VCH003',
      note: 'Product Sale'
    },
    {
      date: '2025-07-06',
      balanceType: 'Make Payment',
      voucherType: 'Expense',
      amount: 200,
      fromTo: 'Vendor Y',
      accountType: 'Expenses',
      accountname: 'Rent',
      voucherNo: 'VCH004',
      note: 'Office Rent'
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

  // Voucher types as per Book Keeper style
  const voucherTypes = [
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
    "Opening Balance"
  ];

  const emptyForm = {
    date: '',
    balanceType: 'Receive',
    voucherType: '',
    amount: '',
    fromTo: '',
    accountType: '',
    accountname: '',
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
        voucherType: row["Voucher Type"] || "",
        amount: row["Amount"] || "",
        fromTo: row["From/To"] || "",
        accountType: row["Account Type"] || "",
        accountname: row["Account Name"] || "",
        voucherNo: row["Voucher No"] || "",
        note: row["Note"] || ""
      }));
      setTransactions((prev) => [...prev, ...imported]);
    };
    reader.readAsBinaryString(file);
  };

  const handleExport = () => {
    const data = transactions
      .filter((txn) =>
        (filterVoucherType === '' || txn.voucherType === filterVoucherType) &&
        (filterVoucherNo === '' || txn.voucherNo.toLowerCase().includes(filterVoucherNo.toLowerCase())) &&
        (filterDate === '' || txn.date === filterDate)
      )
      .map((txn, idx) => ({
        Date: txn.date,
        "Balance Type": txn.balanceType,
        "Voucher Type": txn.voucherType,
        Amount: txn.amount,
        "From/To": txn.fromTo,
        "Account Type": txn.accountType,
        "Account Name": txn.accountname,
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
      "Voucher Type": "",
      Amount: "",
      "From/To": "",
      "Account Type": "",
      "Account Name": "",
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
      <Row className="mb-3 align-items-center">
        <Col>
          <h4>Transactions</h4>
        </Col>

        <Col className="text-end">
          <div
            className="d-flex justify-content-end align-items-center gap-2 flex-nowrap"
            style={{ overflowX: "auto" }} // optional for scroll on small screens
          >
            <input
              type="file"
              accept=".xlsx, .xls"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImport}
            />

            <Button
              variant="success"
              size="sm"
              className="d-flex align-items-center gap-1"
              onClick={() => fileInputRef.current.click()}
              title="Import Excel"
            >
              <FaFileImport /> Import
            </Button>

            <Button
              variant="primary"
              size="sm"
              className="d-flex align-items-center gap-1"
              onClick={handleExport}
              title="Export Excel"
            >
              <FaFileExport /> Export
            </Button>

            <Button
              variant="warning"
              size="sm"
              className="d-flex align-items-center gap-1"
              onClick={handleDownloadBlank}
              title="Download Blank Excel"
            >
              <FaDownload /> Download
            </Button>

            <Button
              size="sm"
              style={{
                ...customBtn,

              }}
              onClick={() => {
                setSelectedTransaction(null);
                setForm({ ...emptyForm });
                setFromToType("Customer");
                setShowModal(true);
              }}
            >
              Add Transaction
            </Button>

            <Button
              variant="info"

              size="sm"
              style={{
                ...customBtn,

              }}
              onClick={() => navigate("/company/ledger")}
              title="Go to Ledger"
            >
              Go to Ledger
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Filter by Voucher Type</Form.Label>
            <Form.Select
              value={filterVoucherType}
              onChange={(e) => setFilterVoucherType(e.target.value)}
            >
              <option value="">All</option>
              {voucherTypes.map((type, i) => (
                <option key={i} value={type}>{type}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group>
            <Form.Label>Filter by Voucher No</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Voucher No"
              value={filterVoucherNo}
              onChange={(e) => setFilterVoucherNo(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group>
            <Form.Label>Filter by Date</Form.Label>
            <Form.Control
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Date</th>
            <th>Balance Type</th>
            <th>Voucher Type</th>
            <th>Voucher No</th>
            <th>Amount</th>
            <th>From/To</th>
            <th>Account Type</th>
            <th>Account Name</th>
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
                <td>{txn.voucherType}</td>
                <td>{txn.voucherNo}</td>
                <td>{txn.amount}</td>
                <td>{txn.fromTo}</td>
                <td>{txn.accountType}</td>
                <td>{txn.accountname}</td>
                <td>{txn.note}</td>
                <td>
                  <Button variant="link" onClick={() => handleView(idx)}><FaEye /></Button>
                  <Button variant="link" onClick={() => handleEdit(idx)}><FaEdit /></Button>
                  <Button variant="link" onClick={() => handleDelete(idx)} className="text-danger"><FaTrash /></Button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="10" className="text-center">No transactions found</td></tr>
          )}
        </tbody>
      </Table>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
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
                <option value="Make Payment">Make Payment</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Voucher Type</Form.Label>
              <Form.Select
                value={form.voucherType}
                onChange={(e) => setForm({ ...form, voucherType: e.target.value })}
              >
                <option value="">Select Voucher Type</option>
                {voucherTypes.map((type, i) => (
                  <option key={type} value={type}>{type}</option>
                ))}
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
                  setForm({ ...form, accountType: e.target.value, accountname: '' })
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
                  value={form.accountname}
                  onChange={(e) => setForm({ ...form, accountname: e.target.value })}
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
              <p><strong>Voucher Type:</strong> {transactions[selectedTransaction].voucherType}</p>
              <p><strong>Voucher No:</strong> {transactions[selectedTransaction].voucherNo}</p>
              <p><strong>Amount:</strong> {transactions[selectedTransaction].amount}</p>
              <p><strong>From/To:</strong> {transactions[selectedTransaction].fromTo}</p>
              <p><strong>Account Type:</strong> {transactions[selectedTransaction].accountType}</p>
              <p><strong>Account Name:</strong> {transactions[selectedTransaction].accountname}</p>
              <p><strong>Note:</strong> {transactions[selectedTransaction].note}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Page Description */}
      <Card className="mb-4 p-3 shadow rounded-4 mt-2">
  <Card.Body>
    <p className="text-muted text-center fs-6 mb-0">
    This page allows you to manage all financial transactions including import, export, and filtering by voucher type.
    </p>
  </Card.Body>
</Card>
    </div>
  );
};

export default Transaction;



