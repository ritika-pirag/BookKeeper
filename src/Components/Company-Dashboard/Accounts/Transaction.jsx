import React, { useState } from 'react';
import { Button, Form, Modal, Row, Col, Table } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const Transaction = () => {
  const [transactions, setTransactions] = useState([
    {
      date: '2025-07-01',
      type: 'Receive',
      amount: 1200,
      fromTo: 'Customer A',
      account: 'Cash in Hand',
      linkedParty: 'Invoice #1023',
      note: 'Advance Payment'
    },
    {
      date: '2025-07-03',
      type: 'Payment',
      amount: 800,
      fromTo: 'Vendor X',
      account: 'Bank Account',
      linkedParty: 'Bill #5491',
      note: 'Material Purchase'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [form, setForm] = useState({
    date: '',
    type: 'Receive',
    amount: '',
    fromTo: '',
    account: '',
    linkedParty: '',
    note: ''
  });

  const accountTypes = [
    "Cash in Hand",
    "Bank Account",
    "Sales",
    "Purchases",
    "Loan",
    "Direct Expense",
    "Direct Income"
  ];

  const handleSave = () => {
    if (selectedTransaction !== null) {
      const updated = [...transactions];
      updated[selectedTransaction] = form;
      setTransactions(updated);
    } else {
      setTransactions([...transactions, form]);
    }
    setShowModal(false);
    setSelectedTransaction(null);
    setForm({ date: '', type: 'Receive', amount: '', fromTo: '', account: '', linkedParty: '', note: '' });
  };

  const handleEdit = (idx) => {
    setSelectedTransaction(idx);
    setForm(transactions[idx]);
    setShowModal(true);
  };

  const handleView = (idx) => {
    setSelectedTransaction(idx);
    setShowViewModal(true);
  };

  const handleDelete = (idx) => {
    const updated = transactions.filter((_, i) => i !== idx);
    setTransactions(updated);
  };

  const customBtn = {
    backgroundColor: '#27b2b6',
    border: 'none',
    borderRadius: '50px',
    padding: '6px 16px',
    color: '#fff'
  };

  return (
    <div className="p-3">
      <Row className="mb-3">
        <Col><h4>Transactions</h4></Col>
        <Col className="text-end">
          <Button style={customBtn} onClick={() => setShowModal(true)}> Add Transaction</Button>
        </Col>
      </Row>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>From/To</th>
            <th>Account</th>
            <th>Linked Party</th>
            <th>Note</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? transactions.map((txn, idx) => (
            <tr key={idx}>
              <td>{txn.date}</td>
              <td>{txn.type}</td>
              <td>{txn.amount}</td>
              <td>{txn.fromTo}</td>
              <td>{txn.account}</td>
              <td>{txn.linkedParty}</td>
              <td>{txn.note}</td>
              <td>
                <Button variant="link" onClick={() => handleView(idx)}><FaEye /></Button>
                <Button variant="link" onClick={() => handleEdit(idx)}><FaEdit /></Button>
                <Button variant="link" onClick={() => handleDelete(idx)} className="text-danger"><FaTrash /></Button>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="8" className="text-center">No transactions found</td></tr>
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedTransaction !== null ? 'Edit' : 'Add'} Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Type</Form.Label>
              <Form.Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option value="Receive">Receive</option>
                <option value="Payment">Payment</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Amount</Form.Label>
              <Form.Control type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>From / To</Form.Label>
              <Form.Control type="text" value={form.fromTo} onChange={(e) => setForm({ ...form, fromTo: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Account</Form.Label>
              <Form.Select value={form.account} onChange={(e) => setForm({ ...form, account: e.target.value })}>
                <option value="">Select Account</option>
                {accountTypes.map((a, idx) => <option key={idx} value={a}>{a}</option>)}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Linked Party</Form.Label>
              <Form.Control type="text" value={form.linkedParty} onChange={(e) => setForm({ ...form, linkedParty: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Note</Form.Label>
              <Form.Control type="text" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button style={customBtn} onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Transaction Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTransaction !== null && (
            <div>
              <p><strong>Date:</strong> {transactions[selectedTransaction].date}</p>
              <p><strong>Type:</strong> {transactions[selectedTransaction].type}</p>
              <p><strong>Amount:</strong> {transactions[selectedTransaction].amount}</p>
              <p><strong>From/To:</strong> {transactions[selectedTransaction].fromTo}</p>
              <p><strong>Account:</strong> {transactions[selectedTransaction].account}</p>
              <p><strong>Linked Party:</strong> {transactions[selectedTransaction].linkedParty}</p>
              <p><strong>Note:</strong> {transactions[selectedTransaction].note}</p>
            </div>
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
