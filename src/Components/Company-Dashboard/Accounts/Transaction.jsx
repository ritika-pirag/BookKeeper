




// import React, { useState } from 'react';
// import { Button, Form, Modal, Row, Col, Table } from 'react-bootstrap';
// import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';

// const Transaction = () => {
//   // Static demo data lists
//   const customerList = ['Customer A', 'Customer B', 'Customer C'];
//   const vendorList   = ['Vendor X', 'Vendor Y', 'Vendor Z'];
//   const linkedPartyOptions = {
//     Customer: ['Invoice #1023', 'Order #9981', 'Invoice #2045'],
//     Vendor:   ['Bill #5491', 'Purchase #4312', 'Bill #6153']
//   };

//   const [transactions, setTransactions] = useState([
//     {
//       date: '2025-07-01',
//       type: 'Receive',
//       amount: 1200,
//       fromTo: 'Customer A',
//       account: 'Cash in Hand',
//       linkedParty: 'Invoice #1023',
//       note: 'Advance Payment'
//     },
//     {
//       date: '2025-07-03',
//       type: 'Payment',
//       amount: 800,
//       fromTo: 'Vendor X',
//       account: 'Bank Account',
//       linkedParty: 'Bill #5491',
//       note: 'Material Purchase'
//     }
//   ]);

//   const [showModal, setShowModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [selectedTransaction, setSelectedTransaction] = useState(null);

//   // Form state
//   const [form, setForm] = useState({
//     date: '',
//     type: 'Receive',
//     amount: '',
//     fromTo: '',
//     account: '',
//     linkedParty: '',
//     note: ''
//   });

//   // For dynamic From/To and Linked Party selectors
//   const [fromToType, setFromToType] = useState('Customer');
//   const [linkedPartyType, setLinkedPartyType] = useState('Customer');

//   const accountTypes = [
//     "Cash in Hand",
//     "Bank Account",
//     "Sales",
//     "Purchases",
//     "Loan",
//     "Direct Expense",
//     "Direct Income"
//   ];

//   const customBtn = {
//     backgroundColor: '#27b2b6',
//     border: 'none',
//     borderRadius: '50px',
//     padding: '6px 16px',
//     color: '#fff'
//   };

//   // Open Add Modal
//   const openAdd = () => {
//     setSelectedTransaction(null);
//     setForm({ date: '', type: 'Receive', amount: '', fromTo: '', account: '', linkedParty: '', note: '' });
//     setFromToType('Customer');
//     setLinkedPartyType('Customer');
//     setShowModal(true);
//   };

//   // Save Add / Edit
//   const handleSave = () => {
//     const newTransactions = [...transactions];
//     if (selectedTransaction !== null) {
//       newTransactions[selectedTransaction] = form;
//     } else {
//       newTransactions.push(form);
//     }
//     setTransactions(newTransactions);
//     // reset
//     setShowModal(false);
//     setSelectedTransaction(null);
//     setForm({ date: '', type: 'Receive', amount: '', fromTo: '', account: '', linkedParty: '', note: '' });
//     setFromToType('Customer');
//     setLinkedPartyType('Customer');
//   };

//   // Open Edit Modal
//   const handleEdit = (idx) => {
//     const txn = transactions[idx];
//     setSelectedTransaction(idx);
//     setForm(txn);
//     // derive selector types from existing values
//     setFromToType(customerList.includes(txn.fromTo) ? 'Customer' : 'Vendor');
//     setLinkedPartyType(
//       customerList.includes(txn.linkedParty) ? 'Customer' : 'Vendor'
//     );
//     setShowModal(true);
//   };

//   // Open View Modal
//   const handleView = (idx) => {
//     setSelectedTransaction(idx);
//     setShowViewModal(true);
//   };

//   // Delete
//   const handleDelete = (idx) => {
//     setTransactions(transactions.filter((_, i) => i !== idx));
//   };

//   return (
//     <div className="p-3">
//       <Row className="mb-3">
//         <Col><h4>Transactions</h4></Col>
//         <Col className="text-end">
//           <Button style={customBtn} onClick={openAdd}>
//             <FaPlus className="me-1" /> Add Transaction
//           </Button>
//         </Col>
//       </Row>

//       <Table bordered hover>
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Type</th>
//             <th>Amount</th>
//             <th>From/To</th>
//             <th>Account</th>
//             <th>Linked Party</th>
//             <th>Note</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {transactions.length > 0 ? (
//             transactions.map((txn, idx) => (
//               <tr key={idx}>
//                 <td>{txn.date}</td>
//                 <td>{txn.type}</td>
//                 <td>{txn.amount}</td>
//                 <td>{txn.fromTo}</td>
//                 <td>{txn.account}</td>
//                 <td>{txn.linkedParty}</td>
//                 <td>{txn.note}</td>
//                 <td>
//                   <Button variant="link" onClick={() => handleView(idx)}>
//                     <FaEye />
//                   </Button>
//                   <Button variant="link" onClick={() => handleEdit(idx)}>
//                     <FaEdit />
//                   </Button>
//                   <Button variant="link" onClick={() => handleDelete(idx)} className="text-danger">
//                     <FaTrash />
//                   </Button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="8" className="text-center">
//                 No transactions found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </Table>

//       {/* Add / Edit Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>{selectedTransaction !== null ? 'Edit' : 'Add'} Transaction</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-2">
//               <Form.Label>Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 value={form.date}
//                 onChange={(e) => setForm({ ...form, date: e.target.value })}
//               />
//             </Form.Group>

//             <Form.Group className="mb-2">
//               <Form.Label>Type</Form.Label>
//               <Form.Select
//                 value={form.type}
//                 onChange={(e) => setForm({ ...form, type: e.target.value })}
//               >
//                 <option value="Receive">Receive</option>
//                 <option value="Payment">Payment</option>
//               </Form.Select>
//             </Form.Group>

//             <Form.Group className="mb-2">
//               <Form.Label>Amount</Form.Label>
//               <Form.Control
//                 type="number"
//                 value={form.amount}
//                 onChange={(e) => setForm({ ...form, amount: e.target.value })}
//               />
//             </Form.Group>

//             {/* Dynamic From/To Selector */}
//             <Form.Group className="mb-2">
//               <Form.Label>From / To</Form.Label>
//               <Row>
//                 <Col md={4}>
//                   <Form.Select
//                     value={fromToType}
//                     onChange={(e) => {
//                       setFromToType(e.target.value);
//                       setForm({ ...form, fromTo: '' });
//                     }}
//                   >
//                     <option value="Customer">Customer</option>
//                     <option value="Vendor">Vendor</option>
//                   </Form.Select>
//                 </Col>
//                 <Col>
//                   <Form.Select
//                     value={form.fromTo}
//                     onChange={(e) => setForm({ ...form, fromTo: e.target.value })}
//                   >
//                     <option value="">Select {fromToType}</option>
//                     {(fromToType === 'Customer' ? customerList : vendorList).map((p, i) => (
//                       <option key={i} value={p}>{p}</option>
//                     ))}
//                   </Form.Select>
//                 </Col>
//               </Row>
//             </Form.Group>

//             <Form.Group className="mb-2">
//               <Form.Label>Account</Form.Label>
//               <Form.Select
//                 value={form.account}
//                 onChange={(e) => setForm({ ...form, account: e.target.value })}
//               >
//                 <option value="">Select Account</option>
//                 {accountTypes.map((a, idx) => (
//                   <option key={idx} value={a}>{a}</option>
//                 ))}
//               </Form.Select>
//             </Form.Group>

//             {/* Dynamic Linked Party Selector */}
//             <Form.Group className="mb-2">
//               <Form.Label>Linked Party</Form.Label>
//               <Row>
//                 <Col md={4}>
//                   <Form.Select
//                     value={linkedPartyType}
//                     onChange={(e) => {
//                       setLinkedPartyType(e.target.value);
//                       setForm({ ...form, linkedParty: '' });
//                     }}
//                   >
//                     <option value="Customer">Customer</option>
//                     <option value="Vendor">Vendor</option>
//                   </Form.Select>
//                 </Col>
//                 <Col>
//                   <Form.Select
//                     value={form.linkedParty}
//                     onChange={(e) => setForm({ ...form, linkedParty: e.target.value })}
//                   >
//                     <option value="">Select Linked Party</option>
//                     {linkedPartyOptions[linkedPartyType].map((lp, idx) => (
//                       <option key={idx} value={lp}>{lp}</option>
//                     ))}
//                   </Form.Select>
//                 </Col>
//               </Row>
//             </Form.Group>

//             <Form.Group className="mb-2">
//               <Form.Label>Note</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={form.note}
//                 onChange={(e) => setForm({ ...form, note: e.target.value })}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>

//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Cancel
//           </Button>
//           <Button style={customBtn} onClick={handleSave}>
//             Save
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* View Modal */}
//       <Modal show={showViewModal} onHide={() => setShowViewModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Transaction Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedTransaction !== null && (
//             <div>
//               <p><strong>Date:</strong> {transactions[selectedTransaction].date}</p>
//               <p><strong>Type:</strong> {transactions[selectedTransaction].type}</p>
//               <p><strong>Amount:</strong> {transactions[selectedTransaction].amount}</p>
//               <p><strong>From/To:</strong> {transactions[selectedTransaction].fromTo}</p>
//               <p><strong>Account:</strong> {transactions[selectedTransaction].account}</p>
//               <p><strong>Linked Party:</strong> {transactions[selectedTransaction].linkedParty}</p>
//               <p><strong>Note:</strong> {transactions[selectedTransaction].note}</p>
//             </div>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowViewModal(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default Transaction;




import React, { useState } from 'react';
import {
  Button,
  Form,
  Modal,
  Row,
  Col,
  Table,
  Dropdown
} from 'react-bootstrap';
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
  const emptyForm = {
    date: '',
    type: 'Receive',
    amount: '',
    fromTo: '',
    account: '',
    linkedParty: '',
    note: ''
  };
  const [form, setForm] = useState({ ...emptyForm });

  const customerList = ['Customer A', 'Customer B', 'Customer C'];
  const vendorList   = ['Vendor X', 'Vendor Y', 'Vendor Z'];
  const linkedPartyOptions = {
    Customer: ['Invoice #1023', 'Order #9981'],
    Vendor:   ['Bill #5491', 'Purchase #4312']
  };

  const accountsList = [
    {
      category: 'Assets',
      items: [
        'Cash in Hand',
        'Bank Account',
        'Petty Cash',
        'Accounts Receivable',
        'Inventory',
        'Fixed Assets',
        'Advance to Supplier',
        'Prepaid Expenses'
      ]
    },
    {
      category: 'Liabilities',
      items: [
        'Accounts Payable',
        'Loan (Short Term)',
        'Loan (Long Term)',
        'Advance from Customer',
        'Tax Payable (GST/VAT)',
        'Salary Payable',
        'Credit Card Payable'
      ]
    },
    {
      category: 'Income',
      items: [
        'Sales',
        'Service Income',
        'Other Income',
        'Interest Received',
        'Discounts Received'
      ]
    },
    {
      category: 'Expenses',
      items: [
        'Purchases',
        'Direct Expense',
        'Rent',
        'Salaries',
        'Utilities (Electricity/Water)',
        'Transportation',
        'Advertising',
        'Maintenance',
        'Office Supplies',
        'Internet & Communication',
        'Entertainment'
      ]
    },
    {
      category: 'Equity',
      items: [
        "Owner's Capital",
        "Owner's Drawings",
        'Retained Earnings',
        'Partner Capital'
      ]
    }
  ];

  const [fromToType, setFromToType]           = useState('Customer');
  const [linkedPartyType, setLinkedPartyType] = useState('Customer');

  const customBtn = {
    backgroundColor: '#27b2b6',
    border: 'none',
    borderRadius: '50px',
    padding: '6px 16px',
    color: '#fff'
  };

  const handleSave = () => {
    const updated = [...transactions];
    if (selectedTransaction !== null) {
      updated[selectedTransaction] = form;
      setTransactions(updated);
    } else {
      setTransactions([...transactions, form]);
    }

    // reset everything
    setShowModal(false);
    setSelectedTransaction(null);
    setForm({ ...emptyForm });
    setFromToType('Customer');
    setLinkedPartyType('Customer');
  };

  const handleEdit = (idx) => {
    setSelectedTransaction(idx);
    setForm(transactions[idx]);
    // derive dropdown types
    setFromToType(
      customerList.includes(transactions[idx].fromTo) ? 'Customer' : 'Vendor'
    );
    setLinkedPartyType(
      linkedPartyOptions.Customer.includes(transactions[idx].linkedParty)
        ? 'Customer'
        : 'Vendor'
    );
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
        <Col className="text-end">
          <Button
            style={customBtn}
            onClick={() => {
              // clear form before opening
              setSelectedTransaction(null);
              setForm({ ...emptyForm });
              setFromToType('Customer');
              setLinkedPartyType('Customer');
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
          {transactions.length > 0 ? (
            transactions.map((txn, idx) => (
              <tr key={idx}>
                <td>{txn.date}</td>
                <td>{txn.type}</td>
                <td>{txn.amount}</td>
                <td>{txn.fromTo}</td>
                <td>{txn.account}</td>
                <td>{txn.linkedParty}</td>
                <td>{txn.note}</td>
                <td>
                  <Button variant="link" onClick={() => handleView(idx)}>
                    <FaEye />
                  </Button>
                  <Button variant="link" onClick={() => handleEdit(idx)}>
                    <FaEdit />
                  </Button>
                  <Button
                    variant="link"
                    onClick={() => handleDelete(idx)}
                    className="text-danger"
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedTransaction !== null ? 'Edit' : 'Add'} Transaction
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Date */}
            <Form.Group className="mb-2">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
              />
            </Form.Group>

            {/* Type */}
            <Form.Group className="mb-2">
              <Form.Label>Type</Form.Label>
              <Form.Select
                value={form.type}
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value })
                }
              >
                <option value="Receive">Receive</option>
                <option value="Payment">Payment</option>
              </Form.Select>
            </Form.Group>

            {/* Amount */}
            <Form.Group className="mb-2">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={form.amount}
                onChange={(e) =>
                  setForm({ ...form, amount: e.target.value })
                }
              />
            </Form.Group>

            {/* From / To */}
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
                    onChange={(e) =>
                      setForm({ ...form, fromTo: e.target.value })
                    }
                  >
                    <option value="">
                      Select {fromToType}
                    </option>
                    {(fromToType === 'Customer'
                      ? customerList
                      : vendorList
                    ).map((name, i) => (
                      <option key={i} value={name}>
                        {name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>

            {/* Account with scrollable menu */}
            <Form.Group className="mb-2">
              <Form.Label>Account</Form.Label>
              <Dropdown drop="down">
                <Dropdown.Toggle
                  variant="light"
                  id="account-dropdown"
                  className="w-100 text-start"
                  style={{ border: '1px solid #ced4da' }}
                >
                  {form.account || 'Select Account'}
                </Dropdown.Toggle>
                <Dropdown.Menu
                  style={{
                    maxHeight: '200px',
                    overflowY: 'auto',
                    width: '100%'
                  }}
                >
                  {accountsList.map((grp) => (
                    <React.Fragment key={grp.category}>
                      <Dropdown.Header>
                        {grp.category}
                      </Dropdown.Header>
                      {grp.items.map((acct) => (
                        <Dropdown.Item
                          key={acct}
                          onClick={() =>
                            setForm({ ...form, account: acct })
                          }
                        >
                          {acct}
                        </Dropdown.Item>
                      ))}
                    </React.Fragment>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            {/* Linked Party */}
            <Form.Group className="mb-2">
              <Form.Label>Linked Party</Form.Label>
              <Row>
                <Col md={4}>
                  <Form.Select
                    value={linkedPartyType}
                    onChange={(e) => {
                      setLinkedPartyType(e.target.value);
                      setForm({ ...form, linkedParty: '' });
                    }}
                  >
                    <option value="Customer">Customer</option>
                    <option value="Vendor">Vendor</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Select
                    value={form.linkedParty}
                    onChange={(e) =>
                      setForm({ ...form, linkedParty: e.target.value })
                    }
                  >
                    <option value="">Select Linked Party</option>
                    {linkedPartyOptions[linkedPartyType].map(
                      (lp, i) => (
                        <option key={i} value={lp}>
                          {lp}
                        </option>
                      )
                    )}
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>

            {/* Note */}
            <Form.Group className="mb-2">
              <Form.Label>Note</Form.Label>
              <Form.Control
                type="text"
                value={form.note}
                onChange={(e) =>
                  setForm({ ...form, note: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
          <Button style={customBtn} onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* View Modal */}
      <Modal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Transaction Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTransaction !== null && (
            <>
              <p>
                <strong>Date:</strong>{' '}
                {transactions[selectedTransaction].date}
              </p>
              <p>
                <strong>Type:</strong>{' '}
                {transactions[selectedTransaction].type}
              </p>
              <p>
                <strong>Amount:</strong>{' '}
                {transactions[selectedTransaction].amount}
              </p>
              <p>
                <strong>From/To:</strong>{' '}
                {transactions[selectedTransaction].fromTo}
              </p>
              <p>
                <strong>Account:</strong>{' '}
                {transactions[selectedTransaction].account}
              </p>
              <p>
                <strong>Linked Party:</strong>{' '}
                {transactions[selectedTransaction].linkedParty}
              </p>
              <p>
                <strong>Note:</strong>{' '}
                {transactions[selectedTransaction].note}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowViewModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Transaction;
