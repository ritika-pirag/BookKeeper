// import React, { useState } from "react";
// import {
//   Table,
//   Container,
//   Card,
//   Button,
//   Row,
//   Col,
//   Modal,
//   Form,
// } from "react-bootstrap";
// import { FaUserPlus, FaUserFriends } from "react-icons/fa";

// const accountData = [
//   { type: "Cash-in-hand", rows: [{ name: "Cash", bal: "0.00" },{ name: "  ", bal: "  " }] },
//   { type: "Bank A/Cs", rows: [{ name: "Bank", bal: "0.00" }] },
//   {
//     type: "Sundry Debtors",
//     rows: [
//       { name: "Customer A", bal: "0.00" },
//       { name: "Customer B", bal: "0.00" },
//       { name: "Customer C", bal: "0.00" },
//     ],
//   },
//   {
//     type: "Sundry Creditors",
//     rows: [
//       { name: "Supplier A", bal: "0.00" },
//       { name: "Supplier B", bal: "0.00" },
//     ],
//   },
//   { type: "Purchases A/C", rows: [{ name: "Purchase", bal: "0.00" }] },
//   { type: "Purchases Return", rows: [{ name: "Purchases Return", bal: "0.00" }] },
//   { type: "Sales A/C", rows: [{ name: "Sales", bal: "0.00" }] },
//   { type: "Sales Return", rows: [{ name: "Sales Return", bal: "0.00" }] },
//   {
//     type: "Capital A/C",
//     rows: [
//       { name: "Capital", bal: "0.00" },
//       { name: "Profit & Loss A/c", bal: "0.00" },
//     ],
//   },
//   {
//     type: "Direct Expenses",
//     rows: [
//       { name: "Cartage", bal: "0.00" },
//       { name: "Discount On Sale", bal: "0.00" },
//       { name: "Discount given", bal: "0.00" },
//     ],
//   },
//   {
//     type: "Indirect Expenses",
//     rows: [{ name: "Advertisement expenses", bal: "0.00" }],
//   },
// ];


// const AllAccounts = () => {
//   const [showVendorModal, setShowVendorModal] = useState(false);
//   const [showCustomerModal, setShowCustomerModal] = useState(false);


  
// const [customerFormData, setCustomerFormData] = useState({
//   name: "",
//   accountType: "Sundry Debtors",
//   payable: "",
//   creationDate: "",
//   bankAccountNumber: "",
//   bankIFSC: "",
//   bankName: "",
//   country: "",
//   state: "",
//   pincode: "",
//   address: "",
//   stateCode: "",
//   shippingAddress: "",
//   phone: "",
//   email: "",
//   creditPeriod: "",
//   gstin: "",
//   gstType: "Registered",
//   taxEnabled: true,
//   taxNumber: "",
// });

// // Vendor Form State (add above return):
// const [vendorFormData, setVendorFormData] = useState({
//   name: "",
//   accountType: "Sundry Creditors",
//   payable: "",
//   creationDate: "",
//   bankAccountNumber: "",
//   bankIFSC: "",
//   bankName: "",
//   country: "",
//   state: "",
//   pincode: "",
//   address: "",
//   stateCode: "",
//   shippingAddress: "",
//   phone: "",
//   email: "",
//   creditPeriod: "",
//   gstin: "",
//   gstType: "Registered",
//   taxEnabled: true,
//   taxNumber: "",
// });

// // Save Vendor Handler
// const handleSaveVendor = () => {
//   console.log("Vendor Saved:", vendorFormData);
//   setShowVendorModal(false);
// };

// const handleSaveCustomer = () => {
//   console.log("Customer Saved:", customerFormData);
//   setShowCustomerModal(false);
// };


//   const [accountType, setAccountType] = useState("Sundry Creditors");
//   const [isTaxEnabled, setIsTaxEnabled] = useState(true);
//   const [taxNumber, setTaxNumber] = useState("TAX123456");
//   const [showNewAccountModal, setShowNewAccountModal] = useState(false);
//   const [showBankDetails, setShowBankDetails] = useState(false);
  
//   const [newAccountData, setNewAccountData] = useState({
//     type: "",
//     name: "",
//     bankAccountNumber: "",
//     bankIFSC: "",
//     bankNameBranch: ""
//   });
//   const accountTypeOptions = [
//     "Cash-in-hand",
//     "Bank A/Cs",
//     "Sundry Debtors",
//     "Sundry Creditors",
//     "Purchases A/C",
//     "Purchase Return",
//     "Sales A/C",
//     "Sales Return",
//     "Capital A/C",
//     "Direct Expenses",
//     "Indirect Expenses",
//     "Direct Income",
//     "Indirect Income",
//     "Current Assets",
//     "Current Liabilities",
//     "Misc. Expenses",
//     "Loans (Liability)",
//     "Loans & Advance",
//     "Fixed Assets",
//     "Investments",
//     "Bank OD A/C",
//     "Deposits (Assets)",
//     "Provisions",
//   ];
  
  
//   return (
//     <Container fluid className="py-4">
//       {/* Header Row */}
//       <Row className="align-items-center justify-content-between mb-3">
//         <Col xs={12} md="auto">
//           <h4 className="fw-bold text-start mb-2 mb-md-0">All Accounts</h4>
//         </Col>
//         <Col xs={12} md="auto" className="d-flex gap-2">
//         <Button
//   style={{ backgroundColor: "#53b2a5", border: "none", padding: "8px 16px" }}
//   className="d-flex align-items-center gap-2 text-white fw-semibold"
//   onClick={() => setShowNewAccountModal(true)}
// >
//   + Add New Account
// </Button>

//           <Button
//             style={{ backgroundColor: "#53b2a5", border: "none", padding: "8px 16px" }}
//             className="d-flex align-items-center gap-2 text-white fw-semibold"
//             onClick={() => setShowVendorModal(true)}
//           >
//             <FaUserPlus size={18} />
//             Add Vendor
//           </Button>
//           <Button
//   style={{ backgroundColor: "#53b2a5", border: "none" }}
//   className="d-flex align-items-center gap-2"
//   onClick={() => setShowCustomerModal(true)}
// >
//   <FaUserFriends />
//   Add Customer
// </Button>

//         </Col>
//       </Row>

//       {/* Table */}
//       <Card>
//         <Card.Body>
//           <div className="table-responsive">
//             <Table bordered hover className="align-middle text-center">
//               <thead className="table-light">
//                 <tr>
//                   <th className="text-start">Account Type</th>
//                   <th className="text-start">Account Name</th>
//                   <th>Balance</th>
//                   <th>Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {accountData.map((group, i) =>
//                   group.rows.map((row, j) => (
//                     <tr key={`${i}-${j}`}>
//                       {j === 0 && (
//                         <td
//                           rowSpan={group.rows.length}
//                           className="text-start fw-semibold bg-light"
//                         >
//                           {group.type}
//                         </td>
//                       )}
//                       <td className="text-start">{row.name}</td>
//                       <td>{row.bal}</td>
//                       <td>{row.bal}</td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </Table>
//           </div>
//         </Card.Body>
//       </Card>

//       {/* Vendor Modal */}
//       <Modal
//   show={showVendorModal}
//   onHide={() => setShowVendorModal(false)}
//   size="lg"
//   centered
//   backdrop="static"
// >
//   <Modal.Header closeButton className="bg-light">
//     <Modal.Title>Add Vendor</Modal.Title>
//   </Modal.Header>
//   <Modal.Body>
//     <Form>
//       <Row className="mb-3">
//         <Col md={6}>
//           <Form.Group>
//             <Form.Label>Name</Form.Label>
//             <Form.Control
//               type="text"
//               value={vendorFormData.name}
//               onChange={(e) => setVendorFormData({ ...vendorFormData, name: e.target.value })}
//             />
//           </Form.Group>
//         </Col>
//         <Col md={6}>
//         <Form.Group>
//   <Form.Label>Account Type</Form.Label>
//   <Form.Control
//     as="select"
//     value={vendorFormData.accountType}
//     onChange={(e) =>
//       setVendorFormData({ ...vendorFormData, accountType: e.target.value })
//     }
//   >
//     <option value="">-- Select Account Type --</option>
//     {accountTypeOptions.map((type, index) => (
//       <option key={index} value={type}>
//         {type}
//       </option>
//     ))}
//   </Form.Control>
// </Form.Group>

//         </Col>
//       </Row>

//       <Row className="mb-3">
//         <Col md={6}>
//           <Form.Group>
//             <Form.Label>Opening Balance</Form.Label>
//             <Form.Control
//               type="number"
//               value={vendorFormData.payable}
//               onChange={(e) => setVendorFormData({ ...vendorFormData, payable: e.target.value })}
//             />
//           </Form.Group>
//         </Col>
//         <Col md={6}>
//           <Form.Group>
//             <Form.Label>Creation Date</Form.Label>
//             <Form.Control
//               type="date"
//               value={vendorFormData.creationDate}
//               onChange={(e) => setVendorFormData({ ...vendorFormData, creationDate: e.target.value })}
//             />
//           </Form.Group>
//         </Col>
//       </Row>

//       <Row className="mb-3">
//         <Col md={6}>
//           <Form.Group>
//             <Form.Label>Bank Account Number</Form.Label>
//             <Form.Control
//               type="text"
//               value={vendorFormData.bankAccountNumber}
//               onChange={(e) => setVendorFormData({ ...vendorFormData, bankAccountNumber: e.target.value })}
//             />
//           </Form.Group>
//         </Col>
//         <Col md={6}>
//           <Form.Group>
//             <Form.Label>Bank IFSC</Form.Label>
//             <Form.Control
//               type="text"
//               value={vendorFormData.bankIFSC}
//               onChange={(e) => setVendorFormData({ ...vendorFormData, bankIFSC: e.target.value })}
//             />
//           </Form.Group>
//         </Col>
//       </Row>

//       <Row className="mb-3">
//         <Col md={12}>
//           <Form.Group>
//             <Form.Label>Bank Name & Branch</Form.Label>
//             <Form.Control
//               type="text"
//               value={vendorFormData.bankName}
//               onChange={(e) => setVendorFormData({ ...vendorFormData, bankName: e.target.value })}
//             />
//           </Form.Group>
//         </Col>
//       </Row>

//       <Row className="mb-3">
//         <Col md={6}>
//           <Form.Group>
//             <Form.Label>Country</Form.Label>
//             <Form.Control
//               type="text"
//               value={vendorFormData.country}
//               onChange={(e) => setVendorFormData({ ...vendorFormData, country: e.target.value })}
//             />
//           </Form.Group>
//         </Col>
//         <Col md={6}>
//           <Form.Group>
//             <Form.Label>State</Form.Label>
//             <Form.Control
//               type="text"
//               value={vendorFormData.state}
//               onChange={(e) => setVendorFormData({ ...vendorFormData, state: e.target.value })}
//             />
//           </Form.Group>
//         </Col>
//       </Row>

//       <Row className="mb-3">
//         <Col md={6}>
//           <Form.Group>
//             <Form.Label>Pincode</Form.Label>
//             <Form.Control
//               type="text"
//               value={vendorFormData.pincode}
//               onChange={(e) => setVendorFormData({ ...vendorFormData, pincode: e.target.value })}
//             />
//           </Form.Group>
//         </Col>
//         <Col md={6}>
//           <Form.Group>
//             <Form.Label>Address</Form.Label>
//             <Form.Control
//               type="text"
//               value={vendorFormData.address}
//               onChange={(e) => setVendorFormData({ ...vendorFormData, address: e.target.value })}
//             />
//           </Form.Group>
//         </Col>
//       </Row>

//       <Row className="mb-3">
//         <Col md={6}>
//           <Form.Group>
//             <Form.Label>State Code</Form.Label>
//             <Form.Control
//               type="text"
//               value={vendorFormData.stateCode}
//               onChange={(e) => setVendorFormData({ ...vendorFormData, stateCode: e.target.value })}
//             />
//           </Form.Group>
//         </Col>
//         <Col md={6}>
//           <Form.Group>
//             <Form.Label>Shipping Address</Form.Label>
//             <Form.Control
//               type="text"
//               value={vendorFormData.shippingAddress}
//               onChange={(e) => setVendorFormData({ ...vendorFormData, shippingAddress: e.target.value })}
//             />
//           </Form.Group>
//         </Col>
//       </Row>

//       <Row className="mb-3">
//         <Col md={6}>
//           <Form.Group>
//             <Form.Label>Phone</Form.Label>
//             <Form.Control
//               type="text"
//               value={vendorFormData.phone}
//               onChange={(e) => setVendorFormData({ ...vendorFormData, phone: e.target.value })}
//             />
//           </Form.Group>
//         </Col>
//         <Col md={6}>
//           <Form.Group>
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               type="email"
//               value={vendorFormData.email}
//               onChange={(e) => setVendorFormData({ ...vendorFormData, email: e.target.value })}
//             />
//           </Form.Group>
//         </Col>
//       </Row>

//       <Row className="mb-3">
//         <Col md={6}>
//           <Form.Group>
//             <Form.Label>Credit Period (days)</Form.Label>
//             <Form.Control
//               type="number"
//               value={vendorFormData.creditPeriod}
//               onChange={(e) => setVendorFormData({ ...vendorFormData, creditPeriod: e.target.value })}
//             />
//           </Form.Group>
//         </Col>
//         <Col md={6}>
//           <Form.Group>
//             <Form.Label>GSTIN</Form.Label>
//             <Form.Control
//               type="text"
//               value={vendorFormData.gstin}
//               onChange={(e) => setVendorFormData({ ...vendorFormData, gstin: e.target.value })}
//             />
//           </Form.Group>
//         </Col>
//       </Row>

//       <Row className="mb-3">
//         <Col md={6}>
//           <Form.Group>
//             <Form.Label>GST Type</Form.Label>
//             <Form.Control
//               as="select"
//               value={vendorFormData.gstType}
//               onChange={(e) => setVendorFormData({ ...vendorFormData, gstType: e.target.value })}
//             >
//               <option>Registered</option>
//               <option>Unregistered</option>
//               <option>Composition</option>
//             </Form.Control>
//           </Form.Group>
//         </Col>
//         <Col md={6}>
//           <Form.Group>
//             <Form.Label>Tax Enabled</Form.Label>
//             <Form.Check
//               type="switch"
//               checked={vendorFormData.taxEnabled}
//               onChange={(e) => setVendorFormData({ ...vendorFormData, taxEnabled: e.target.checked })}
//               label={vendorFormData.taxEnabled ? "Yes" : "No"}
//             />
//             {vendorFormData.taxEnabled && (
//               <Form.Control
//                 type="text"
//                 placeholder="Tax Number"
//                 className="mt-2"
//                 value={vendorFormData.taxNumber}
//                 onChange={(e) => setVendorFormData({ ...vendorFormData, taxNumber: e.target.value })}
//               />
//             )}
//           </Form.Group>
//         </Col>
//       </Row>
//     </Form>
//   </Modal.Body>
//   <Modal.Footer>
//     <Button variant="secondary" onClick={() => setShowVendorModal(false)}>
//       Cancel
//     </Button>
//     <Button
//       style={{ backgroundColor: "#53b2a5", border: "none" }}
//       onClick={handleSaveVendor}
//     >
//       Save Vendor
//     </Button>
//   </Modal.Footer>
// </Modal>

// {/* Customer Modal */}
// <Modal
//   show={showCustomerModal}
//   onHide={() => setShowCustomerModal(false)}
//   size="lg"
//   centered
//   backdrop="static"
// >
//   <Modal.Header closeButton className="bg-light">
//     <Modal.Title>Add Customer</Modal.Title>
//   </Modal.Header>
//   <Modal.Body>
//     <Form>
//       <Row className="mb-3">
//         <Col md={6}>
//           <Form.Group>
//             <Form.Label>Name</Form.Label>
//             <Form.Control
//               type="text"
//               value={customerFormData.name}
//               onChange={(e) => setCustomerFormData({ ...customerFormData, name: e.target.value })}
//             />
//           </Form.Group>
//         </Col>
//         <Col md={6}>
//         <Form.Control
//   as="select"
//   value={customerFormData.accountType}
//   onChange={(e) =>
//     setCustomerFormData({ ...customerFormData, accountType: e.target.value })
//   }
// >
//   <option value="">-- Select Account Type --</option>
//   {accountTypeOptions.map((type, index) => (
//     <option key={index} value={type}>
//       {type}
//     </option>
//   ))}
// </Form.Control>

//         </Col>
//       </Row>

//       <Row className="mb-3">
//         <Col md={6}>
//           <Form.Group>
//             <Form.Label>Opening Balance</Form.Label>
//             <Form.Control
//               type="number"
//               value={customerFormData.payable}
//               onChange={(e) => setCustomerFormData({ ...customerFormData, payable: e.target.value })}
//             />
//           </Form.Group>
//         </Col>
//         <Col md={6}>
//           <Form.Group>
//             <Form.Label>Creation Date</Form.Label>
//             <Form.Control
//               type="date"
//               value={customerFormData.creationDate}
//               onChange={(e) => setCustomerFormData({ ...customerFormData, creationDate: e.target.value })}
//             />
//           </Form.Group>
//         </Col>
//       </Row>

//       <Row className="mb-3">
//         <Col md={6}>
//           <Form.Group>
//             <Form.Label>Bank Account Number</Form.Label>
//             <Form.Control
//               type="text"
//               value={customerFormData.bankAccountNumber}
//               onChange={(e) => setCustomerFormData({ ...customerFormData, bankAccountNumber: e.target.value })}
//             />
//           </Form.Group>
//         </Col>
//         <Col md={6}>
//           <Form.Group>
//             <Form.Label>Bank IFSC</Form.Label>
//             <Form.Control
//               type="text"
//               value={customerFormData.bankIFSC}
//               onChange={(e) => setCustomerFormData({ ...customerFormData, bankIFSC: e.target.value })}
//             />
//           </Form.Group>
//         </Col>
//       </Row>

//       <Row className="mb-3">
//         <Col md={12}>
//           <Form.Group>
//             <Form.Label>Bank Name & Branch</Form.Label>
//             <Form.Control
//               type="text"
//               value={customerFormData.bankName}
//               onChange={(e) => setCustomerFormData({ ...customerFormData, bankName: e.target.value })}
//             />
//           </Form.Group>
//         </Col>
//       </Row>

//       <Row className="mb-3">
//         <Col md={6}>
//           <Form.Group>
//             <Form.Label>Country</Form.Label>
//             <Form.Control
//               type="text"
//               value={customerFormData.country}
//               onChange={(e) => setCustomerFormData({ ...customerFormData, country: e.target.value })}
//             />
//           </Form.Group>
//         </Col>
//         <Col md={6}>
//           <Form.Group>
//             <Form.Label>State</Form.Label>
//             <Form.Control
//               type="text"
//               value={customerFormData.state}
//               onChange={(e) => setCustomerFormData({ ...customerFormData, state: e.target.value })}
//             />
//           </Form.Group>
//         </Col>
//       </Row>

//       <Row className="mb-3">
//         <Col md={6}>
//           <Form.Group>
//             <Form.Label>Pincode</Form.Label>
//             <Form.Control
//               type="text"
//               value={customerFormData.pincode}
//               onChange={(e) => setCustomerFormData({ ...customerFormData, pincode: e.target.value })}
//             />
//           </Form.Group>
//         </Col>
//         <Col md={6}>
//           <Form.Group>
//             <Form.Label>Address</Form.Label>
//             <Form.Control
//               type="text"
//               value={customerFormData.address}
//               onChange={(e) => setCustomerFormData({ ...customerFormData, address: e.target.value })}
//             />
//           </Form.Group>
//         </Col>
//       </Row>

//       <Row className="mb-3">
//         <Col md={6}>
//           <Form.Group>
//             <Form.Label>State Code</Form.Label>
//             <Form.Control
//               type="text"
//               value={customerFormData.stateCode}
//               onChange={(e) => setCustomerFormData({ ...customerFormData, stateCode: e.target.value })}
//             />
//           </Form.Group>
//         </Col>
//         <Col md={6}>
//           <Form.Group>
//             <Form.Label>Shipping Address</Form.Label>
//             <Form.Control
//               type="text"
//               value={customerFormData.shippingAddress}
//               onChange={(e) => setCustomerFormData({ ...customerFormData, shippingAddress: e.target.value })}
//             />
//           </Form.Group>
//         </Col>
//       </Row>

//       <Row className="mb-3">
//         <Col md={6}>
//           <Form.Group>
//             <Form.Label>Phone</Form.Label>
//             <Form.Control
//               type="text"
//               value={customerFormData.phone}
//               onChange={(e) => setCustomerFormData({ ...customerFormData, phone: e.target.value })}
//             />
//           </Form.Group>
//         </Col>
//         <Col md={6}>
//           <Form.Group>
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               type="email"
//               value={customerFormData.email}
//               onChange={(e) => setCustomerFormData({ ...customerFormData, email: e.target.value })}
//             />
//           </Form.Group>
//         </Col>
//       </Row>

//       <Row className="mb-3">
//         <Col md={6}>
//           <Form.Group>
//             <Form.Label>Credit Period (days)</Form.Label>
//             <Form.Control
//               type="number"
//               value={customerFormData.creditPeriod}
//               onChange={(e) => setCustomerFormData({ ...customerFormData, creditPeriod: e.target.value })}
//             />
//           </Form.Group>
//         </Col>
//         <Col md={6}>
//           <Form.Group>
//             <Form.Label>GSTIN</Form.Label>
//             <Form.Control
//               type="text"
//               value={customerFormData.gstin}
//               onChange={(e) => setCustomerFormData({ ...customerFormData, gstin: e.target.value })}
//             />
//           </Form.Group>
//         </Col>
//       </Row>

//       <Row className="mb-3">
//         <Col md={6}>
//           <Form.Group>
//             <Form.Label>GST Type</Form.Label>
//             <Form.Control
//               as="select"
//               value={customerFormData.gstType}
//               onChange={(e) => setCustomerFormData({ ...customerFormData, gstType: e.target.value })}
//             >
//               <option>Registered</option>
//               <option>Unregistered</option>
//               <option>Composition</option>
//             </Form.Control>
//           </Form.Group>
//         </Col>
//         <Col md={6}>
//           <Form.Group>
//             <Form.Label>Tax Enabled</Form.Label>
//             <Form.Check
//               type="switch"
//               checked={customerFormData.taxEnabled}
//               onChange={(e) => setCustomerFormData({ ...customerFormData, taxEnabled: e.target.checked })}
//               label={customerFormData.taxEnabled ? "Yes" : "No"}
//             />
//             {customerFormData.taxEnabled && (
//               <Form.Control
//                 type="text"
//                 placeholder="Tax Number"
//                 className="mt-2"
//                 value={customerFormData.taxNumber}
//                 onChange={(e) => setCustomerFormData({ ...customerFormData, taxNumber: e.target.value })}
//               />
//             )}
//           </Form.Group>
//         </Col>
//       </Row>
//     </Form>
//   </Modal.Body>
//   <Modal.Footer>
//     <Button variant="secondary" onClick={() => setShowCustomerModal(false)}>
//       Cancel
//     </Button>
//     <Button
//       style={{ backgroundColor: "#53b2a5", border: "none" }}
//       onClick={handleSaveCustomer}
//     >
//       Save Customer
//     </Button>
//   </Modal.Footer>
// </Modal>

// {/* add new acccount */}
// <Modal
//   show={showNewAccountModal}
//   onHide={() => setShowNewAccountModal(false)}
//   centered
//   backdrop="static"
// >
//   <Modal.Header closeButton className="bg-light">
//     <Modal.Title>Add New Account</Modal.Title>
//   </Modal.Header>

//   <Modal.Body>
//     <Form>
//       {/* Account Type */}
//       <Form.Group className="mb-3">
//         <Form.Label>Account Type</Form.Label>
//         <Form.Control
//           type="text"
//           value={newAccountData.type}
//           onChange={(e) =>
//             setNewAccountData({ ...newAccountData, type: e.target.value })
//           }
//         />
//       </Form.Group>

//       {/* Account Name */}
//       <Form.Group className="mb-3">
//         <Form.Label>Account Name</Form.Label>
//         <Form.Control
//           type="text"
//           value={newAccountData.name}
//           onChange={(e) =>
//             setNewAccountData({ ...newAccountData, name: e.target.value })
//           }
//         />
//       </Form.Group>

//       {/* Always Visible Toggle */}
//       <Form.Group className="mb-3">
//         <Form.Check
//           type="switch"
//           id="bank-details-toggle"
//           label="Add Bank Details"
//           checked={showBankDetails}
//           onChange={() => setShowBankDetails(!showBankDetails)}
//         />
//       </Form.Group>

//       {/* Conditionally Show Bank Fields */}
//       {showBankDetails && (
//         <>
//           <Form.Group className="mb-3">
//             <Form.Label>Account Number</Form.Label>
//             <Form.Control
//               type="text"
//               value={newAccountData.bankAccountNumber}
//               onChange={(e) =>
//                 setNewAccountData({
//                   ...newAccountData,
//                   bankAccountNumber: e.target.value
//                 })
//               }
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>IFSC Code</Form.Label>
//             <Form.Control
//               type="text"
//               value={newAccountData.bankIFSC}
//               onChange={(e) =>
//                 setNewAccountData({
//                   ...newAccountData,
//                   bankIFSC: e.target.value
//                 })
//               }
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Bank Name & Branch</Form.Label>
//             <Form.Control
//               type="text"
//               value={newAccountData.bankNameBranch}
//               onChange={(e) =>
//                 setNewAccountData({
//                   ...newAccountData,
//                   bankNameBranch: e.target.value
//                 })
//               }
//             />
//           </Form.Group>
//         </>
//       )}
//     </Form>
//   </Modal.Body>

//   <Modal.Footer>
//     <Button variant="secondary" onClick={() => setShowNewAccountModal(false)}>
//       Cancel
//     </Button>
//     <Button
//     style={{ backgroundColor: "#53b2a5", border: "none", padding: "8px 16px" }}
//       onClick={() => {
//         console.log("New Account Data:", newAccountData);
//         setShowNewAccountModal(false);
//       }}
//     >
//       Save
//     </Button>
//   </Modal.Footer>
// </Modal>



//     </Container>
//   );
// };

// export default AllAccounts;



import React, { useState, useEffect } from "react"; // Added useEffect import
import {
  Table,
  Container,
  Card,
  Button,
  Row,
  Col,
  Modal,
  Form,
} from "react-bootstrap";
import { FaUserPlus, FaUserFriends } from "react-icons/fa";

// Mock API object for demonstration. Replace with your actual API client.
const api = {
  get: async (url) => {
    if (url === "/accounts/parents") {
       // Mock data for parent accounts
       // In a real app, this would be an API call like: return fetch(`/api${url}`).then(res => res.json());
      return Promise.resolve({ data: [
        { _id: '1', name: 'Assets' },
        { _id: '2', name: 'Liabilities' },
        { _id: '3', name: 'Equity' },
        { _id: '4', name: 'Income' },
        { _id: '5', name: 'Expenses' },
      ]});
    }
    return Promise.resolve({ data: [] });
  },
  post: async (url, data) => {
    console.log("Mock API POST to", url, "with data:", data);
    // In a real app, this would be an API call like: return fetch(`/api${url}`, { method: 'POST', body: JSON.stringify(data) }).then(res => res.json());
    return Promise.resolve({ data: { _id: Date.now().toString(), ...data } });
  }
};

const accountData = [
  { type: "Cash-in-hand", rows: [{ name: "Cash", bal: "0.00" },{ name: "  ", bal: "  " }] },
  { type: "Bank A/Cs", rows: [{ name: "Bank", bal: "0.00" }] },
  {
    type: "Sundry Debtors",
    rows: [
      { name: "Customer A", bal: "0.00" },
      { name: "Customer B", bal: "0.00" },
      { name: "Customer C", bal: "0.00" },
    ],
  },
  {
    type: "Sundry Creditors",
    rows: [
      { name: "Supplier A", bal: "0.00" },
      { name: "Supplier B", bal: "0.00" },
    ],
  },
  { type: "Purchases A/C", rows: [{ name: "Purchase", bal: "0.00" }] },
  { type: "Purchases Return", rows: [{ name: "Purchases Return", bal: "0.00" }] },
  { type: "Sales A/C", rows: [{ name: "Sales", bal: "0.00" }] },
  { type: "Sales Return", rows: [{ name: "Sales Return", bal: "0.00" }] },
  {
    type: "Capital A/C",
    rows: [
      { name: "Capital", bal: "0.00" },
      { name: "Profit & Loss A/c", bal: "0.00" },
    ],
  },
  {
    type: "Direct Expenses",
    rows: [
      { name: "Cartage", bal: "0.00" },
      { name: "Discount On Sale", bal: "0.00" },
      { name: "Discount given", bal: "0.00" },
    ],
  },
  {
    type: "Indirect Expenses",
    rows: [{ name: "Advertisement expenses", bal: "0.00" }],
  },
];

const AllAccounts = () => {
  // State declarations
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showMainAccountModal, setShowMainAccountModal] = useState(false);
  const [mainAccountName, setMainAccountName] = useState("");
  const [customerFormData, setCustomerFormData] = useState({
    name: "",
    accountType: "Sundry Debtors",
    payable: "",
    creationDate: "",
    bankAccountNumber: "",
    bankIFSC: "",
    bankName: "",
    country: "",
    state: "",
    pincode: "",
    address: "",
    stateCode: "",
    shippingAddress: "",
    phone: "",
    email: "",
    creditPeriod: "",
    gstin: "",
    gstType: "Registered",
    taxEnabled: true,
    taxNumber: "",
  });

  const [vendorFormData, setVendorFormData] = useState({
    name: "",
    accountType: "Sundry Creditors",
    payable: "",
    creationDate: "",
    bankAccountNumber: "",
    bankIFSC: "",
    bankName: "",
    country: "",
    state: "",
    pincode: "",
    address: "",
    stateCode: "",
    shippingAddress: "",
    phone: "",
    email: "",
    creditPeriod: "",
    gstin: "",
    gstType: "Registered",
    taxEnabled: true,
    taxNumber: "",
  });

  const [accountType, setAccountType] = useState("Sundry Creditors");
  const [isTaxEnabled, setIsTaxEnabled] = useState(true);
  const [taxNumber, setTaxNumber] = useState("TAX123456");
  const [showNewAccountModal, setShowNewAccountModal] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [newAccountData, setNewAccountData] = useState({
    type: "",
    name: "",
    bankAccountNumber: "",
    bankIFSC: "",
    bankNameBranch: "",
    parentId: "", // Added for parent account selection
    isDefault: false, // Added for main account creation
  });

  // ✅ FIXED: Added state for parentAccounts
  const [parentAccounts, setParentAccounts] = useState([]); // Initialize as empty array
  const [loadingParentAccounts, setLoadingParentAccounts] = useState(false); // Optional: for loading state

  // ✅ FIXED: Added useEffect to fetch parent accounts when the component mounts
  // or when the "Add New Account" modal opens, if needed.
  useEffect(() => {
    const fetchParentAccounts = async () => {
      setLoadingParentAccounts(true);
      try {
        // Replace with your actual API endpoint
        const response = await api.get("/accounts/parents");
        setParentAccounts(response.data);
      } catch (error) {
        console.error("Failed to fetch parent accounts:", error);
        // Optionally, set an error state to display a message to the user
      } finally {
        setLoadingParentAccounts(false);
      }
    };

    // Fetch parent accounts when the component mounts
    // Alternatively, fetch when showNewAccountModal becomes true if preferred.
    fetchParentAccounts();
  }, []); // Empty dependency array means this runs once on mount


  // Handlers
  const handleSaveVendor = () => {
    console.log("Vendor Saved:", vendorFormData);
    setShowVendorModal(false);
  };

  const handleSaveCustomer = () => {
    console.log("Customer Saved:", customerFormData);
    setShowCustomerModal(false);
  };

  const accountTypeOptions = [
    "Cash-in-hand",
    "Bank A/Cs",
    "Sundry Debtors",
    "Sundry Creditors",
    "Purchases A/C",
    "Purchase Return",
    "Sales A/C",
    "Sales Return",
    "Capital A/C",
    "Direct Expenses",
    "Indirect Expenses",
    "Direct Income",
    "Indirect Income",
    "Current Assets",
    "Current Liabilities",
    "Misc. Expenses",
    "Loans (Liability)",
    "Loans & Advance",
    "Fixed Assets",
    "Investments",
    "Bank OD A/C",
    "Deposits (Assets)",
    "Provisions",
  ];

  return (
    <Container fluid className="py-4">
      {/* Header Row */}
      <Row className="align-items-center justify-content-between mb-3">
        <Col xs={12} md="auto">
          <h4 className="fw-bold text-start mb-2 mb-md-0">All Accounts</h4>
        </Col>
        <Col xs={12} md="auto" className="d-flex gap-2">
          <Button
            style={{ backgroundColor: "#53b2a5", border: "none", padding: "8px 16px" }}
            className="d-flex align-items-center gap-2 text-white fw-semibold"
            onClick={() => setShowNewAccountModal(true)}
          >
            + Add New Account
          </Button>
          <Button
            style={{ backgroundColor: "#53b2a5", border: "none", padding: "8px 16px" }}
            className="d-flex align-items-center gap-2 text-white fw-semibold"
            onClick={() => setShowVendorModal(true)}
          >
            <FaUserPlus size={18} />
            Add Vendor
          </Button>
          <Button
            style={{ backgroundColor: "#53b2a5", border: "none" }}
            className="d-flex align-items-center gap-2"
            onClick={() => setShowCustomerModal(true)}
          >
            <FaUserFriends />
            Add Customer
          </Button>
        </Col>
      </Row>

      {/* Table */}
      <Card>
        <Card.Body>
          <div className="table-responsive">
            <Table bordered hover className="align-middle text-center">
              <thead className="table-light">
                <tr>
                  <th className="text-start">Account Type</th>
                  <th className="text-start">Account Name</th>
                  <th>Balance</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {accountData.map((group, i) =>
                  group.rows.map((row, j) => (
                    <tr key={`${i}-${j}`}>
                      {j === 0 && (
                        <td
                          rowSpan={group.rows.length}
                          className="text-start fw-semibold bg-light"
                        >
                          {group.type}
                        </td>
                      )}
                      <td className="text-start">{row.name}</td>
                      <td>{row.bal}</td>
                      <td>{row.bal}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Vendor Modal */}
      <Modal
        show={showVendorModal}
        onHide={() => setShowVendorModal(false)}
        size="lg"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>Add Vendor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={vendorFormData.name}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, name: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Account Type</Form.Label>
                  <Form.Control
                    as="select"
                    value={vendorFormData.accountType}
                    onChange={(e) =>
                      setVendorFormData({ ...vendorFormData, accountType: e.target.value })
                    }
                  >
                    <option value="">-- Select Account Type --</option>
                    {accountTypeOptions.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Opening Balance</Form.Label>
                  <Form.Control
                    type="number"
                    value={vendorFormData.payable}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, payable: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Creation Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={vendorFormData.creationDate}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, creationDate: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Bank Account Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={vendorFormData.bankAccountNumber}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, bankAccountNumber: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Bank IFSC</Form.Label>
                  <Form.Control
                    type="text"
                    value={vendorFormData.bankIFSC}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, bankIFSC: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Bank Name & Branch</Form.Label>
                  <Form.Control
                    type="text"
                    value={vendorFormData.bankName}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, bankName: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    value={vendorFormData.country}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, country: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    value={vendorFormData.state}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, state: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control
                    type="text"
                    value={vendorFormData.pincode}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, pincode: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={vendorFormData.address}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, address: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>State Code</Form.Label>
                  <Form.Control
                    type="text"
                    value={vendorFormData.stateCode}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, stateCode: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Shipping Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={vendorFormData.shippingAddress}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, shippingAddress: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    value={vendorFormData.phone}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, phone: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={vendorFormData.email}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, email: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Credit Period (days)</Form.Label>
                  <Form.Control
                    type="number"
                    value={vendorFormData.creditPeriod}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, creditPeriod: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>GSTIN</Form.Label>
                  <Form.Control
                    type="text"
                    value={vendorFormData.gstin}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, gstin: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>GST Type</Form.Label>
                  <Form.Control
                    as="select"
                    value={vendorFormData.gstType}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, gstType: e.target.value })}
                  >
                    <option>Registered</option>
                    <option>Unregistered</option>
                    <option>Composition</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Tax Enabled</Form.Label>
                  <Form.Check
                    type="switch"
                    checked={vendorFormData.taxEnabled}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, taxEnabled: e.target.checked })}
                    label={vendorFormData.taxEnabled ? "Yes" : "No"}
                  />
                  {vendorFormData.taxEnabled && (
                    <Form.Control
                      type="text"
                      placeholder="Tax Number"
                      className="mt-2"
                      value={vendorFormData.taxNumber}
                      onChange={(e) => setVendorFormData({ ...vendorFormData, taxNumber: e.target.value })}
                    />
                  )}
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowVendorModal(false)}>
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#53b2a5", border: "none" }}
            onClick={handleSaveVendor}
          >
            Save Vendor
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Customer Modal */}
      <Modal
        show={showCustomerModal}
        onHide={() => setShowCustomerModal(false)}
        size="lg"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>Add Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={customerFormData.name}
                    onChange={(e) => setCustomerFormData({ ...customerFormData, name: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                 <Form.Label>Account Type</Form.Label>
                 <Form.Control
                   as="select"
                   value={customerFormData.accountType}
                   onChange={(e) =>
                     setCustomerFormData({ ...customerFormData, accountType: e.target.value })
                   }
                 >
                   <option value="">-- Select Account Type --</option>
                   {accountTypeOptions.map((type, index) => (
                     <option key={index} value={type}>
                       {type}
                     </option>
                   ))}
                 </Form.Control>
               </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Opening Balance</Form.Label>
                  <Form.Control
                    type="number"
                    value={customerFormData.payable}
                    onChange={(e) => setCustomerFormData({ ...customerFormData, payable: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Creation Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={customerFormData.creationDate}
                    onChange={(e) => setCustomerFormData({ ...customerFormData, creationDate: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Bank Account Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={customerFormData.bankAccountNumber}
                    onChange={(e) => setCustomerFormData({ ...customerFormData, bankAccountNumber: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Bank IFSC</Form.Label>
                  <Form.Control
                    type="text"
                    value={customerFormData.bankIFSC}
                    onChange={(e) => setCustomerFormData({ ...customerFormData, bankIFSC: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Bank Name & Branch</Form.Label>
                  <Form.Control
                    type="text"
                    value={customerFormData.bankName}
                    onChange={(e) => setCustomerFormData({ ...customerFormData, bankName: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    value={customerFormData.country}
                    onChange={(e) => setCustomerFormData({ ...customerFormData, country: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    value={customerFormData.state}
                    onChange={(e) => setCustomerFormData({ ...customerFormData, state: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control
                    type="text"
                    value={customerFormData.pincode}
                    onChange={(e) => setCustomerFormData({ ...customerFormData, pincode: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={customerFormData.address}
                    onChange={(e) => setCustomerFormData({ ...customerFormData, address: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>State Code</Form.Label>
                  <Form.Control
                    type="text"
                    value={customerFormData.stateCode}
                    onChange={(e) => setCustomerFormData({ ...customerFormData, stateCode: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Shipping Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={customerFormData.shippingAddress}
                    onChange={(e) => setCustomerFormData({ ...customerFormData, shippingAddress: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    value={customerFormData.phone}
                    onChange={(e) => setCustomerFormData({ ...customerFormData, phone: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={customerFormData.email}
                    onChange={(e) => setCustomerFormData({ ...customerFormData, email: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Credit Period (days)</Form.Label>
                  <Form.Control
                    type="number"
                    value={customerFormData.creditPeriod}
                    onChange={(e) => setCustomerFormData({ ...customerFormData, creditPeriod: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>GSTIN</Form.Label>
                  <Form.Control
                    type="text"
                    value={customerFormData.gstin}
                    onChange={(e) => setCustomerFormData({ ...customerFormData, gstin: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>GST Type</Form.Label>
                  <Form.Control
                    as="select"
                    value={customerFormData.gstType}
                    onChange={(e) => setCustomerFormData({ ...customerFormData, gstType: e.target.value })}
                  >
                    <option>Registered</option>
                    <option>Unregistered</option>
                    <option>Composition</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Tax Enabled</Form.Label>
                  <Form.Check
                    type="switch"
                    checked={customerFormData.taxEnabled}
                    onChange={(e) => setCustomerFormData({ ...customerFormData, taxEnabled: e.target.checked })}
                    label={customerFormData.taxEnabled ? "Yes" : "No"}
                  />
                  {customerFormData.taxEnabled && (
                    <Form.Control
                      type="text"
                      placeholder="Tax Number"
                      className="mt-2"
                      value={customerFormData.taxNumber}
                      onChange={(e) => setCustomerFormData({ ...customerFormData, taxNumber: e.target.value })}
                    />
                  )}
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCustomerModal(false)}>
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#53b2a5", border: "none" }}
            onClick={handleSaveCustomer}
          >
            Save Customer
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add New Account Modal */}
      <Modal
        show={showNewAccountModal}
        onHide={() => setShowNewAccountModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>Add New Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Parent Account Dropdown + Add Main Account Button */}
            <Form.Group className="mb-3">
              <Form.Label>Main Account</Form.Label>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                {/* ✅ FIXED: parentAccounts is now defined and populated */}
                <Form.Select
                  value={newAccountData.parentId || ""}
                  onChange={(e) =>
                    setNewAccountData({
                      ...newAccountData,
                      parentId: e.target.value,
                      // isDefault should be false if selecting a parent
                      isDefault: false,
                    })
                  }
                  disabled={loadingParentAccounts} // Optional: Disable while loading
                >
                  <option value="">Select Parent Account</option>
                  {/* ✅ FIXED: parentAccounts.map now works */}
                  {parentAccounts.map((acc) => (
                    <option key={acc._id} value={acc._id}>{acc.name}</option>
                  ))}
                </Form.Select>
                <Button
  size="sm"
  onClick={() => setShowMainAccountModal(true)}
  style={{
    color: "#53b2a5",
    border: "1px solid #53b2a5",
    backgroundColor: "transparent",
  }}
  onMouseOver={(e) => {
    e.target.style.backgroundColor = "#53b2a5";
    e.target.style.color = "white";
  }}
  onMouseOut={(e) => {
    e.target.style.backgroundColor = "transparent";
    e.target.style.color = "#53b2a5";
  }}
>
  Add Main Account
</Button>

              </div>
              <Form.Text className="text-muted">
                Leave parent blank if creating top-level account.
              </Form.Text>
            </Form.Group>
            {/* Account Type & Name */}
            <Form.Group className="mb-3">
              <Form.Label>Account Type</Form.Label>
              <Form.Control
                type="text"
                value={newAccountData.type}
                onChange={(e) =>
                  setNewAccountData({ ...newAccountData, type: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Account Name</Form.Label>
              <Form.Control
                type="text"
                value={newAccountData.name}
                onChange={(e) =>
                  setNewAccountData({ ...newAccountData, name: e.target.value })
                }
              />
            </Form.Group>
            {/* Bank Toggle */}
            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                label="Add Bank Details"
                checked={showBankDetails}
                onChange={() => setShowBankDetails(!showBankDetails)}
              />
            </Form.Group>
            {/* Bank Fields */}
            {showBankDetails && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Account Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={newAccountData.bankAccountNumber}
                    onChange={(e) =>
                      setNewAccountData({
                        ...newAccountData,
                        bankAccountNumber: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>IFSC Code</Form.Label>
                  <Form.Control
                    type="text"
                    value={newAccountData.bankIFSC}
                    onChange={(e) =>
                      setNewAccountData({
                        ...newAccountData,
                        bankIFSC: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Bank Name & Branch</Form.Label>
                  <Form.Control
                    type="text"
                    value={newAccountData.bankNameBranch}
                    onChange={(e) =>
                      setNewAccountData({
                        ...newAccountData,
                        bankNameBranch: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNewAccountModal(false)}>
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#53b2a5", border: "none", padding: "8px 16px" }}
            onClick={async () => {
              try {
                // Replace with your actual API endpoint
                await api.post("/accounts", newAccountData);
                // Optional: Refresh the account list or parent accounts if needed
                // const refreshed = await api.get("/accounts/parents");
                // setParentAccounts(refreshed.data);
                setShowNewAccountModal(false);
              } catch (error) {
                 console.error("Failed to save new account:", error);
                 // Optionally, show an error message to the user
              }
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Mini Modal for Main Account Name Input */}
      <Modal
        show={showMainAccountModal}
        onHide={() => setShowMainAccountModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Main Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Account Name</Form.Label>
            <Form.Control
              type="text"
              value={mainAccountName}
              onChange={(e) => setMainAccountName(e.target.value)}
              placeholder="Enter account name"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowMainAccountModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={async () => {
             try {
               // Replace with your actual API endpoint
               const res = await api.post("/accounts", {
                 name: mainAccountName,
                 type: "main", // Assuming 'main' is a valid type
                 parentId: null,
                 isDefault: true,
               });
               const newMain = res.data;
               // Update newAccountData with the newly created main account's ID
               setNewAccountData({
                 ...newAccountData,
                 parentId: newMain._id,
                 // If selecting a main account, isDefault might be relevant,
                 // but typically if it's a parent, isDefault is not applicable.
                 // Let's keep it as false unless there's a specific need.
                 // isDefault: true, // Or false, depending on logic
                 isDefault: false, // More likely, as it's now a parent
               });
               // Refresh the parent accounts list to include the new one
               const refreshed = await api.get("/accounts/parents");
               setParentAccounts(refreshed.data);
               setMainAccountName(""); // Clear the input
               setShowMainAccountModal(false); // Close the modal
             } catch (error) {
                console.error("Failed to create main account:", error);
                // Optionally, show an error message to the user
             }
            }}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AllAccounts;