



// import React, { useState } from 'react';
// import {
//   Button,
//   Form,
//   Modal,
//   Row,
//   Col,
//   Table,
//   Dropdown
// } from 'react-bootstrap';
// import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';

// const Transaction = () => {
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

//   const accountTypes = ["Assets", "Liabilities", "Income", "Expenses"];

//   const predefinedAccounts = {
//     Assets: [
//       "Cash in Hand", "Bank Account", "Petty Cash", "Accounts Receivable", "Inventory",
//       "Fixed Assets", "Prepaid Expenses", "Investments", "Advance to Suppliers", "Deposits",
//       "Furniture & Fixtures", "Land", "Building", "Vehicles", "Machinery",
//       "Tools", "Computer Equipment", "Office Equipment", "Intangible Assets", "Goodwill",
//       "Loan to Employees", "Security Deposits", "Advance Tax", "Deferred Tax Asset", "Accrued Income",
//       "Work in Progress", "Raw Materials", "Spare Parts", "Prepaid Insurance", "Other Current Assets"
//     ],
//     Liabilities: [
//       "Accounts Payable", "Loans Payable", "Accrued Expenses", "Credit Card", "Deferred Revenue",
//       "GST Payable", "TDS Payable", "Provident Fund Payable", "ESIC Payable", "Salary Payable",
//       "Advance from Customers", "Interest Payable", "Bills Payable", "Mortgage Payable", "Unearned Income",
//       "Long-term Loans", "Short-term Loans", "Duties & Taxes Payable", "Contingent Liability", "Bonus Payable",
//       "Gratuity Payable", "Audit Fees Payable", "Professional Tax Payable", "Rent Payable", "Outstanding Expenses",
//       "Security Deposit Received", "Bank Overdraft", "Statutory Dues", "Tax Provision", "Other Current Liabilities"
//     ],
//     Income: [
//       "Sales", "Service Income", "Commission Received", "Interest Income", "Rental Income",
//       "Discount Received", "Dividend Income", "Profit on Sale of Assets", "Foreign Exchange Gain", "Consultancy Income",
//       "Freight Collected", "Other Operating Revenue", "Non-Operating Income", "Sponsorship Income", "Incentive Received",
//       "Miscellaneous Income", "Royalty Income", "Grant Received", "Reimbursement Received", "Insurance Claim Received",
//       "Admission Fee", "Training Fee", "Tuition Fee", "Subscription Income", "Workshop Income",
//       "Software Sales", "Digital Products", "Hosting Services", "Consulting Projects", "Other Income"
//     ],
//     Expenses: [
//       "Rent", "Salaries", "Wages", "Electricity", "Internet Charges",
//       "Office Supplies", "Postage & Courier", "Travel Expenses", "Fuel Expenses", "Telephone",
//       "Legal Fees", "Audit Fees", "Bank Charges", "Insurance", "Repairs & Maintenance",
//       "Advertising", "Marketing", "Printing & Stationery", "Software Subscription", "Freight Outward",
//       "Training Expenses", "Staff Welfare", "Interest Paid", "Depreciation", "Consulting Charges",
//       "Security Expenses", "Packing Expenses", "License Fees", "GST Paid", "Miscellaneous Expenses"
//     ],
//   };
//   const [showModal, setShowModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [selectedTransaction, setSelectedTransaction] = useState(null);
//   const emptyForm = {
//     date: '',
//     type: 'Receive',
//     amount: '',
//     fromTo: '',
//     account: '',
//     linkedParty: '',
//     note: ''
//   };
//   const [form, setForm] = useState({ ...emptyForm });

//   const customerList = ['Customer A', 'Customer B', 'Customer C'];
//   const vendorList   = ['Vendor X', 'Vendor Y', 'Vendor Z'];
//   const linkedPartyOptions = {
//     Customer: ['Invoice #1023', 'Order #9981'],
//     Vendor:   ['Bill #5491', 'Purchase #4312'],
//     Loan: ['Loan #1234', 'Loan #5678', 'Loan #9012'], 
//     other: ['Miscellaneous', 'Adjustment', 'Transfer'] 
//   };

//   const accountsList = [
//     {
//       category: 'Assets',
//       items: [
//         'Cash in Hand',
//         'Bank Account',
//         'Petty Cash',
//         'Accounts Receivable',
//         'Inventory',
//         'Fixed Assets',
//         'Advance to Supplier',
//         'Prepaid Expenses'
//       ]
//     },
//     {
//       category: 'Liabilities',
//       items: [
//         'Accounts Payable',
//         'Loan (Short Term)',
//         'Loan (Long Term)',
//         'Advance from Customer',
//         'Tax Payable (GST/VAT)',
//         'Salary Payable',
//         'Credit Card Payable'
//       ]
//     },
//     {
//       category: 'Income',
//       items: [
//         'Sales',
//         'Service Income',
//         'Other Income',
//         'Interest Received',
//         'Discounts Received'
//       ]
//     },
//     {
//       category: 'Expenses',
//       items: [
//         'Purchases',
//         'Direct Expense',
//         'Rent',
//         'Salaries',
//         'Utilities (Electricity/Water)',
//         'Transportation',
//         'Advertising',
//         'Maintenance',
//         'Office Supplies',
//         'Internet & Communication',
//         'Entertainment'
//       ]
//     },
//     {
//       category: 'Equity',
//       items: [
//         "Owner's Capital",
//         "Owner's Drawings",
//         'Retained Earnings',
//         'Partner Capital'
//       ]
//     }
//   ];

//   const [fromToType, setFromToType]           = useState('Customer');
//   const [linkedPartyType, setLinkedPartyType] = useState('Customer');

//   const customBtn = {
//     backgroundColor: '#27b2b6',
//     border: 'none',
//     borderRadius: '50px',
//     padding: '6px 16px',
//     color: '#fff'
//   };

//   const handleSave = () => {
//     const updated = [...transactions];
//     if (selectedTransaction !== null) {
//       updated[selectedTransaction] = form;
//       setTransactions(updated);
//     } else {
//       setTransactions([...transactions, form]);
//     }

//     // reset everything
//     setShowModal(false);
//     setSelectedTransaction(null);
//     setForm({ ...emptyForm });
//     setFromToType('Customer');
//     setLinkedPartyType('Customer');
//   };

//   const handleEdit = (idx) => {
//     setSelectedTransaction(idx);
//     setForm(transactions[idx]);
//     // derive dropdown types
//     setFromToType(
//       customerList.includes(transactions[idx].fromTo) ? 'Customer' : 'Vendor'
//     );
//     setLinkedPartyType(
//       linkedPartyOptions.Customer.includes(transactions[idx].linkedParty)
//         ? 'Customer'
//         : 'Vendor'
//     );
//     setShowModal(true);
//   };

//   const handleView = (idx) => {
//     setSelectedTransaction(idx);
//     setShowViewModal(true);
//   };

//   const handleDelete = (idx) => {
//     setTransactions(transactions.filter((_, i) => i !== idx));
//   };

//   return (
//     <div className="p-3">
//       <Row className="mb-3">
//         <Col><h4>Transactions</h4></Col>
//         <Col className="text-end">
//           <Button
//             style={customBtn}
//             onClick={() => {
//               // clear form before opening
//               setSelectedTransaction(null);
//               setForm({ ...emptyForm });
//               setFromToType('Customer');
//               setLinkedPartyType('Customer');
//               setShowModal(true);
//             }}
//           >
//              Add Transaction
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
//                   <Button
//                     variant="link"
//                     onClick={() => handleDelete(idx)}
//                     className="text-danger"
//                   >
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

//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {selectedTransaction !== null ? 'Edit' : 'Add'} Transaction
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             {/* Date */}
//             <Form.Group className="mb-2">
//               <Form.Label>Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 value={form.date}
//                 onChange={(e) =>
//                   setForm({ ...form, date: e.target.value })
//                 }
//               />
//             </Form.Group>

//             {/* Type */}
//             <Form.Group className="mb-2">
//               <Form.Label>Type</Form.Label>
//               <Form.Select
//                 value={form.type}
//                 onChange={(e) =>
//                   setForm({ ...form, type: e.target.value })
//                 }
//               >
//                 <option value="Receive">Receive</option>
//                 <option value="Payment">Payment</option>
//               </Form.Select>
//             </Form.Group>

//             {/* Amount */}
//             <Form.Group className="mb-2">
//               <Form.Label>Amount</Form.Label>
//               <Form.Control
//                 type="number"
//                 value={form.amount}
//                 onChange={(e) =>
//                   setForm({ ...form, amount: e.target.value })
//                 }
//               />
//             </Form.Group>

//             {/* From / To */}
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
//                     onChange={(e) =>
//                       setForm({ ...form, fromTo: e.target.value })
//                     }
//                   >
//                     <option value="">
//                       Select {fromToType}
//                     </option>
//                     {(fromToType === 'Customer'
//                       ? customerList
//                       : vendorList
//                     ).map((name, i) => (
//                       <option key={i} value={name}>
//                         {name}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Col>
//               </Row>
//             </Form.Group>

//             {/* Account with scrollable menu */}
       

// {/* Account Type Dropdown */}
// <Form.Group className="mb-3">
// <Form.Label>Account Type</Form.Label>
// <Form.Select
// value={newAccountData.type}
// onChange={(e) => {
// const selectedType = e.target.value;
// setNewAccountData({
// ...newAccountData,
// type: selectedType,
// name: "", // reset name when type changes
// });
// }}
// >
// <option value="">Select Account Type</option>
// {accountTypes.map((type) => (
// <option key={type} value={type}>
// {type}
// </option>
// ))}
// </Form.Select>
// </Form.Group>

// {/* Account Name Dropdown Based on Type */}
// {newAccountData.type && (
// <Form.Group className="mb-3">
// <Form.Label>Account Name</Form.Label>
// <Form.Select
// value={newAccountData.name}
// onChange={(e) =>
// setNewAccountData({ ...newAccountData, name: e.target.value })
// }
// >
// <option value="">Select Account Name</option>
// {predefinedAccounts[newAccountData.type].map((accName, i) => (
// <option key={i} value={accName}>
//   {accName}
// </option>
// ))}
// </Form.Select>
// </Form.Group>
// )}




//             {/* Linked Party */}
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
//                     <option value="Loan">Loan</option>
//                     <option value="other">Other</option>

                 
//                   </Form.Select>
//                 </Col>
//                 <Col>
//                   <Form.Select
//                     value={form.linkedParty}
//                     onChange={(e) =>
//                       setForm({ ...form, linkedParty: e.target.value })
//                     }
//                   >
//                     <option value="">Select Linked Party</option>
//                     {linkedPartyOptions[linkedPartyType].map(
//                       (lp, i) => (
//                         <option key={i} value={lp}>
//                           {lp}
//                         </option>
//                       )
//                     )}
//                   </Form.Select>
//                 </Col>
//               </Row>
//             </Form.Group>

//             {/* Note */}
//             <Form.Group className="mb-2">
//               <Form.Label>Note</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={form.note}
//                 onChange={(e) =>
//                   setForm({ ...form, note: e.target.value })
//                 }
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             variant="secondary"
//             onClick={() => setShowModal(false)}
//           >
//             Cancel
//           </Button>
//           <Button style={customBtn} onClick={handleSave}>
//             Save
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* View Modal */}
//       <Modal
//         show={showViewModal}
//         onHide={() => setShowViewModal(false)}
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Transaction Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedTransaction !== null && (
//             <>
//               <p>
//                 <strong>Date:</strong>{' '}
//                 {transactions[selectedTransaction].date}
//               </p>
//               <p>
//                 <strong>Type:</strong>{' '}
//                 {transactions[selectedTransaction].type}
//               </p>
//               <p>
//                 <strong>Amount:</strong>{' '}
//                 {transactions[selectedTransaction].amount}
//               </p>
//               <p>
//                 <strong>From/To:</strong>{' '}
//                 {transactions[selectedTransaction].fromTo}
//               </p>
//               <p>
//                 <strong>Account:</strong>{' '}
//                 {transactions[selectedTransaction].account}
//               </p>
//               <p>
//                 <strong>Linked Party:</strong>{' '}
//                 {transactions[selectedTransaction].linkedParty}
//               </p>
//               <p>
//                 <strong>Note:</strong>{' '}
//                 {transactions[selectedTransaction].note}
//               </p>
//             </>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             variant="secondary"
//             onClick={() => setShowViewModal(false)}
//           >
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default Transaction;









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
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const Transaction = () => {
  const [transactions, setTransactions] = useState([
    {
      date: '2025-07-01',
      type: 'Receive',
      amount: 1200,
      fromTo: 'Customer A',
      accountType: 'Assets',
      account: 'Cash in Hand',
      linkedParty: 'Invoice #1023',
      note: 'Advance Payment'
    },
    {
      date: '2025-07-03',
      type: 'Payment',
      amount: 800,
      fromTo: 'Vendor X',
      accountType: 'Liabilities',
      account: 'Bank Account',
      linkedParty: 'Bill #5491',
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
    type: 'Receive',
    amount: '',
    fromTo: '',
    accountType: '',
    account: '',
    linkedParty: '',
    note: ''
  };
  const [form, setForm] = useState({ ...emptyForm });

  const customerList = ['Customer A', 'Customer B', 'Customer C'];
  const vendorList = ['Vendor X', 'Vendor Y', 'Vendor Z'];
  const linkedPartyOptions = {
    Customer: ['Invoice #1023', 'Order #9981'],
    Vendor: ['Bill #5491', 'Purchase #4312'],
    Loan: ['Loan #1234', 'Loan #5678', 'Loan #9012'],
    other: ['Miscellaneous', 'Adjustment', 'Transfer']
  };

  const [fromToType, setFromToType] = useState('Customer');
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
    setShowModal(false);
    setSelectedTransaction(null);
    setForm({ ...emptyForm });
    setFromToType('Customer');
    setLinkedPartyType('Customer');
  };

  const handleEdit = (idx) => {
    setSelectedTransaction(idx);
    setForm(transactions[idx]);
    setFromToType(customerList.includes(transactions[idx].fromTo) ? 'Customer' : 'Vendor');
    setLinkedPartyType(linkedPartyOptions.Customer.includes(transactions[idx].linkedParty) ? 'Customer' : 'Vendor');
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
                  <Button variant="link" onClick={() => handleView(idx)}><FaEye /></Button>
                  <Button variant="link" onClick={() => handleEdit(idx)}><FaEdit /></Button>
                  <Button variant="link" onClick={() => handleDelete(idx)} className="text-danger"><FaTrash /></Button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="8" className="text-center">No transactions found</td></tr>
          )}
        </tbody>
      </Table>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
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
              <Form.Label>Type</Form.Label>
              <Form.Select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="Receive">Receive</option>
                <option value="Payment">Payment</option>
              </Form.Select>
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
                    <option value="Loan">Loan</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Select
                    value={form.linkedParty}
                    onChange={(e) => setForm({ ...form, linkedParty: e.target.value })}
                  >
                    <option value="">Select Linked Party</option>
                    {linkedPartyOptions[linkedPartyType].map((lp, i) => (
                      <option key={i} value={lp}>{lp}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-2">
  <Form.Label>Note</Form.Label>
  <Form.Control
    as="textarea"
    rows={3} // You can increase rows as needed
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
              <p><strong>Type:</strong> {transactions[selectedTransaction].type}</p>
              <p><strong>Amount:</strong> {transactions[selectedTransaction].amount}</p>
              <p><strong>From/To:</strong> {transactions[selectedTransaction].fromTo}</p>
              <p><strong>Account Type:</strong> {transactions[selectedTransaction].accountType}</p>
              <p><strong>Account:</strong> {transactions[selectedTransaction].account}</p>
              <p><strong>Linked Party:</strong> {transactions[selectedTransaction].linkedParty}</p>
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



