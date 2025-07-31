// import React, { useState, useEffect, useRef } from "react";
// import {
//   Table,
//   Button,
//   Modal,
//   Row,
//   Col,
//   Form,
//   Card,
//   InputGroup,
// } from "react-bootstrap";
// import { FaTrash, FaDownload, FaEye, FaEdit, FaPlus, FaFileImport, FaFileExport } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import * as XLSX from "xlsx";

// const invoices = [
//   { id: 1083, customer: "Shawn Hoowod", date: "15-07-2025", amount: 0.0, status: "Due" },
//   { id: 1082, customer: "Shawn Hoowod", date: "15-07-2025", amount: 0.0, status: "Due" },
//   { id: 1081, customer: "Elijah Allan", date: "15-07-2025", amount: 890.0, status: "Paid" },
//   { id: 1080, customer: "Jere Swayne", date: "15-07-2025", amount: 2085.12, status: "Partial" },
//   { id: 1075, customer: "Prince Stamper", date: "12-07-2025", amount: 91.27, status: "Due" },
// ];

// const getStatusVariant = (status) => {
//   switch (status) {
//     case "Paid":
//       return "success";
//     case "Due":
//       return "danger";
//     case "Partial":
//       return "primary";
//     default:
//       return "secondary";
//   }
// };

// const invoiceTableColumns = [
//   { label: "No", key: "no" },
//   { label: "voucher no", key: "id" },
//   { label: "Customer", key: "customer" },
//   { label: "Date", key: "date" },
//   { label: "Amount", key: "amount" },
//   { label: "Status", key: "status" },
// ];

// const Invoice = () => {
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showCategoryModal, setShowCategoryModal] = useState(false);
//   const [selectedInvoice, setSelectedInvoice] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const navigate = useNavigate();

//   // For import
//   const [invoiceList, setInvoiceList] = useState(invoices);
//   const fileInputRef = useRef();

//   // Form state
//   const [formData, setFormData] = useState({
//     customer: "",
//     issueDate: "",
//     invoiceNumber: "#INVO00010",
//     refNumber: "",
//     dueDate: "",
//     category: "",
//     items: [{
//       item: "",
//       quantity: 1,
//       price: 0,
//       discount: 0,
//       tax: 0,
//       amount: 0
//     }],
//     subTotal: 0,
//     totalDiscount: 0,
//     totalTax: 0,
//     totalAmount: 0,
//     taxEnabled: false
//   });

//   // Remove item handler
//   const removeItem = (index) => {
//     if (formData.items.length <= 1) return;
//     const updatedItems = formData.items.filter((_, i) => i !== index);
//     setFormData(prev => ({
//       ...prev,
//       items: updatedItems
//     }));
//   };

//   // Calculate totals whenever items or taxEnabled changes
//   useEffect(() => {
//     let subTotal = 0;
//     let totalDiscount = 0;
//     let totalTax = 0;
//     let totalAmount = 0;

//     formData.items.forEach(item => {
//       const itemAmount = item.quantity * item.price;
//       const discount = item.discount || 0;
//       const taxable = formData.taxEnabled ? ((itemAmount - discount) * (item.tax || 0) / 100) : 0;
//       subTotal += itemAmount;
//       totalDiscount += discount;
//       totalTax += taxable;
//     });
//     totalAmount = subTotal - totalDiscount + (formData.taxEnabled ? totalTax : 0);

//     setFormData(prev => ({
//       ...prev,
//       subTotal,
//       totalDiscount,
//       totalTax: formData.taxEnabled ? totalTax : 0,
//       totalAmount
//     }));
//     // eslint-disable-next-line
//   }, [formData.items, formData.taxEnabled]);

//   // Edit handler
//   const handleEdit = (invoice) => {
//     setEditMode(true);
//     setShowCreateModal(true);
//     setFormData({
//       customer: invoice.customer,
//       issueDate: "2025-07-15",
//       invoiceNumber: `#INVO${invoice.id}`,
//       refNumber: "",
//       dueDate: "2025-07-20",
//       category: "",
//       items: [{
//         item: "Sample Item",
//         quantity: 1,
//         price: invoice.amount,
//         discount: 0,
//         tax: 0,
//         amount: invoice.amount
//       }],
//       subTotal: invoice.amount,
//       totalDiscount: 0,
//       totalTax: 0,
//       totalAmount: invoice.amount,
//       taxEnabled: false
//     });
//   };

//   // Reset modal on close
//   const handleCloseCreateModal = () => {
//     setShowCreateModal(false);
//     setEditMode(false);
//     setFormData({
//       customer: "",
//       issueDate: "",
//       invoiceNumber: "#INVO00010",
//       refNumber: "",
//       dueDate: "",
//       category: "",
//       items: [{
//         item: "",
//         quantity: 1,
//         price: 0,
//         discount: 0,
//         tax: 0,
//         amount: 0
//       }],
//       subTotal: 0,
//       totalDiscount: 0,
//       totalTax: 0,
//       totalAmount: 0,
//       taxEnabled: false
//     });
//   };

//   const handleDelete = (invoice) => {
//     setSelectedInvoice(invoice);
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = () => {
//     alert(`Deleted invoice #${selectedInvoice.id}`);
//     setShowDeleteModal(false);
//   };

//   const handleDownload = (invoice) => {
//     const blob = new Blob([`Invoice PDF for ${invoice.customer}`], {
//       type: "application/pdf",
//     });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `Invoice_${invoice.id}.pdf`;
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleItemChange = (index, field, value) => {
//     const updatedItems = [...formData.items];
//     updatedItems[index][field] = value;
//     updatedItems[index].amount = updatedItems[index].quantity * updatedItems[index].price;
//     setFormData(prev => ({
//       ...prev,
//       items: updatedItems
//     }));
//   };

//   const addNewItem = () => {
//     setFormData(prev => ({
//       ...prev,
//       items: [...prev.items, {
//         item: "",
//         quantity: 1,
//         price: 0,
//         discount: 0,
//         tax: 0,
//         amount: 0
//       }]
//     }));
//   };

//   // --- Import/Export/Download Logic ---
//   // Export Excel (only visible columns)
//   const handleExport = () => {
//     const data = invoiceList.map((inv, idx) => ({
//       No: idx + 1,
//       "#": inv.id,
//       Customer: inv.customer,
//       Date: inv.date,
//       Amount: inv.amount,
//       Status: inv.status,
//     }));
//     const ws = XLSX.utils.json_to_sheet(data);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Invoices");
//     XLSX.writeFile(wb, "invoices.xlsx");
//   };

//   // Download Blank Excel (only visible columns)
//   const handleDownloadBlank = () => {
//     const blankRow = {
//       No: "",
//       "#": "",
//       Customer: "",
//       Date: "",
//       Amount: "",
//       Status: "",
//     };
//     const ws = XLSX.utils.json_to_sheet([blankRow]);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Invoices");
//     XLSX.writeFile(wb, "invoice_template.xlsx");
//   };

//   // Import Excel
//   const handleImport = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = (evt) => {
//       const bstr = evt.target.result;
//       const wb = XLSX.read(bstr, { type: "binary" });
//       const wsname = wb.SheetNames[0];
//       const ws = wb.Sheets[wsname];
//       const data = XLSX.utils.sheet_to_json(ws, { defval: "" });
//       // Map imported data to invoice structure
//       const imported = data.map((row, idx) => ({
//         id: row["#"] || `IMP${Date.now()}${idx}`,
//         customer: row["Customer"] || "",
//         date: row["Date"] || "",
//         amount: Number(row["Amount"]) || 0,
//         status: row["Status"] || "Due",
//       }));
//       setInvoiceList((prev) => [...prev, ...imported]);
//     };
//     reader.readAsBinaryString(file);
//   };

//   return (
//     <div className="p-4 mt-2">
//       <div className="d-flex justify-content-between align-items-center mb-1">
//         <h5 className="fw-semibold mb-0">Sales Order</h5>
//         <div className="d-flex gap-2 align-items-center mb-1">
//           {/* Import Button */}
//           <input
//             type="file"
//             accept=".xlsx, .xls"
//             ref={fileInputRef}
//             style={{ display: "none" }}
//             onChange={handleImport}
//           />
//           <Button
//             variant="success"
//             className="rounded-pill d-flex align-items-center"
//             style={{ fontWeight: 600 }}
//             onClick={() => fileInputRef.current.click()}
//             title="Import Excel"
//           >
//             <FaFileImport className="me-2" /> Import
//           </Button>
//           {/* Export Button */}
//           <Button
//             variant="primary"
//             className="rounded-pill d-flex align-items-center"
//             style={{ fontWeight: 600 }}
//             onClick={handleExport}
//             title="Export Excel"
//           >
//             <FaFileExport className="me-2" /> Export
//           </Button>
//           {/* Download Blank Button */}
//           <Button
//             variant="warning"
//             className="rounded-pill d-flex align-items-center"
//             style={{ fontWeight: 600, color: "#fff" }}
//             onClick={handleDownloadBlank}
//             title="Download Blank Excel"
//           >
//             <FaDownload className="me-2" /> Download
//           </Button>
//           {/* Create Invoice */}
//           <Button
//             onClick={() => {
//               setShowCreateModal(true);
//               setEditMode(false);
//             }}
//             className="me-2 text-white d-flex align-items-center justify-content-center rounded-pill"
//             style={{
//               minWidth: 180,
//               backgroundColor: "#53b2a5",
//               borderColor: "#53b2a5",
//             }}
//           >
//             <FaPlus className="me-2" />
//             <span>Create Invoice</span>
//           </Button>
//         </div>
//       </div>
//       <Row className="g-4">
//         <Col md={12}>
//           <Card className="rounded-3 p-3">


//             <Row className="mb-3 align-items-center">
//               <Col md={6} sm={12}>
//                 <Form.Group controlId="entriesPerPage" className="d-flex align-items-center">
//                   <Form.Label className="me-2 mb-0">Show</Form.Label>
//                   <Form.Select
//                     size="sm"
//                     style={{ width: "80px", marginRight: "10px" }}
//                     defaultValue="10"
//                   >
//                     <option>10</option>
//                     <option>25</option>
//                     <option>50</option>
//                   </Form.Select>
//                   <span className="mb-0">entries</span>
//                 </Form.Group>
//               </Col>
//               <Col md={6} sm={12} className="text-md-end mt-2 mt-md-0">
//                 <Form.Control
//                   type="text"
//                   placeholder="Search..."
//                   style={{ maxWidth: "200px", display: "inline-block" }}
//                 />
//               </Col>
//             </Row>

//             <div className="table-responsive">
//               <Table bordered hover className="mt-3 mb-0">
//                 <thead className="table-light">
//                   <tr>
//                     <th>No</th>
//                     <th>Invoice no</th>
//                     <th>Customer</th>
//                     <th>Date</th>
//                     <th>Amount</th>
//                     <th>Status</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {invoiceList.map((invoice, index) => (
//                     <tr key={invoice.id}>
//                       <td>{index + 1}</td>
//                       <td>{invoice.id}</td>
//                       <td>{invoice.customer}</td>
//                       <td>{invoice.date}</td>
//                       <td>${invoice.amount.toFixed(2)}</td>
//                       <td>
//                         <span className={`badge bg-${getStatusVariant(invoice.status)}`}>
//                           {invoice.status}
//                         </span>
//                       </td>
//                       <td>
//                         <div className="d-flex gap-2 justify-content-center">
//                           <button
//                             className="p-0 text-info"
//                             variant="outline-info"
//                             size="sm"
//                             onClick={() => navigate("/company/viewinvoicee")}
//                           >
//                             <FaEye size={16} />
//                           </button>
//                           <button
//                             className="p-0 text-warning"
//                             variant="outline-warning"
//                             size="sm"
//                             onClick={() => handleEdit(invoice)}
//                           >
//                             <FaEdit size={16} />
//                           </button>
//                           <button
//                             variant="outline-primary"
//                             size="sm"
//                             onClick={() => handleDownload(invoice)}
//                           >
//                             <FaDownload size={16} />
//                           </button>
//                           <button
//                             className="p-0 text-danger"
//                             variant="outline-danger"
//                             size="sm"
//                             onClick={() => handleDelete(invoice)}
//                           >
//                             <FaTrash size={16} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             </div>

//             {/* Pagination */}
//             <div className="d-flex justify-content-between align-items-center mt-3 px-3">
//               <span className="small text-muted">
//                 Showing 1 to {invoices.length} of {invoices.length} results
//               </span>

//               <nav>
//                 <ul className="pagination pagination-sm mb-0">
//                   <li className="page-item disabled">
//                     <button className="page-link rounded-start">&laquo;</button>
//                   </li>
//                   <li className="page-item active">
//                     <button
//                       className="page-link"
//                       style={{ backgroundColor: '#3daaaa', borderColor: '#3daaaa' }}
//                     >
//                       1
//                     </button>
//                   </li>
//                   <li className="page-item">
//                     <button className="page-link">2</button>
//                   </li>
//                   <li className="page-item">
//                     <button className="page-link rounded-end">&raquo;</button>
//                   </li>
//                 </ul>
//               </nav>
//             </div>
//           </Card>
//         </Col>
//       </Row>

//       {/* Delete Modal */}
//       <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Are you sure?</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           Are you sure you want to delete invoice #{selectedInvoice?.id}?
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={confirmDelete}>
//             Yes, Delete
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* create modal */}
//       <Modal
//         show={showCreateModal}
//         onHide={handleCloseCreateModal}
//         size="lg"
//         width="100%"
//         dialogClassName="custom-modal-lg"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>{editMode ? "Edit Invoice" : "Create Invoice"}</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           <Form>
//             <Row className="mb-3">
//               <Col md={8}>
//                 <Form.Group>
//                   <Form.Label className="fw-semibold">Customer*</Form.Label>
//                   <InputGroup>
//                     <Form.Select
//                       name="customer"
//                       value={formData.customer}
//                       onChange={handleInputChange}
//                       className="border-end-0"
//                     >
//                       <option>Select Customer</option>
//                       {invoices.map(inv => (
//                         <option key={inv.id} value={inv.customer}>{inv.customer}</option>
//                       ))}
//                     </Form.Select>
//                     <Button
//                       variant="outline-secondary"
//                       size="sm"
//                       className="border-start-0"
//                       onClick={() => navigate("/company/vendorscreditors")}
//                       title="Add Customer"
//                     >
//                       <FaPlus size={12} />
//                     </Button>
//                   </InputGroup>
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group>
//                   <Form.Label className="fw-semibold">Invoice Number*</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="invoiceNumber"
//                     value={formData.invoiceNumber}
//                     onChange={handleInputChange}
//                     readOnly
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row className="mt-3">
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label className="fw-semibold">Issue Date*</Form.Label>
//                   <Form.Control
//                     type="date"
//                     name="issueDate"
//                     value={formData.issueDate}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//               </Col>
//               {/* <Col md={6}>
//           <Form.Group>
//             <Form.Label className="fw-semibold">Due Date*</Form.Label>
//             <Form.Control
//               type="date"
//               name="dueDate"
//               value={formData.dueDate}
//               onChange={handleInputChange}
//             />
//           </Form.Group>
//         </Col>
//       */}
//             </Row>

//             <Row className=" mt-4 mb-3">
//               <Col md={6}>
//                 <Form.Group className="d-flex align-items-center">
//                   <Form.Label className="fw-semibold">Ref Number</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="refNumber"
//                     value={formData.refNumber}
//                     onChange={handleInputChange}
//                     placeholder="Optional"
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="d-flex align-items-center">
//                   <Form.Label className="fw-semibold me-3">Tax Status</Form.Label>
//                   <Button
//                     size="sm"
//                     className="me-2"
//                     onClick={() => setFormData({ ...formData, taxEnabled: !formData.taxEnabled })}
//                     style={{
//                       backgroundColor: formData.taxEnabled ? "#53b2a5" : "transparent",
//                       borderColor: "#53b2a5",
//                       color: formData.taxEnabled ? "#fff" : "#53b2a5",
//                     }}
//                   >
//                     {formData.taxEnabled ? "ON" : "OFF"}
//                   </Button>
//                   <span className="small text-muted">
//                     {formData.taxEnabled ? "Tax will be applied" : "Tax excluded"}
//                   </span>
//                 </Form.Group>
//               </Col>


//             </Row>

//             {/* Products Table */}
//             <h6 className="fw-semibold mb-3">Products & Services*</h6>
//             <div className="table-responsive">
//               <Table bordered className="mb-3">
//                 <thead className="table-light">
//                   <tr>
//                     <th width="30%">PRODUCT*</th>
//                     <th width="10%">QTY*</th>
//                     <th width="15%">PRICE*</th>
//                     <th width="15%">DISCOUNT*</th>
//                     {formData.taxEnabled && <th width="10%">TAX (%)</th>}
//                     <th width="15%">AMOUNT</th>
//                     <th width="5%"></th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {formData.items.map((item, index) => (
//                     <tr key={index}>
//                       <td>
//                         <Form.Control
//                           type="text"
//                           value={item.item}
//                           onChange={(e) => handleItemChange(index, 'item', e.target.value)}
//                           placeholder="Product name or description"
//                         />
//                       </td>
//                       <td>
//                         <Form.Control
//                           type="number"
//                           min="1"
//                           value={item.quantity}
//                           onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 1)}
//                         />
//                       </td>
//                       <td>
//                         <InputGroup>
//                           <InputGroup.Text>$</InputGroup.Text>
//                           <Form.Control
//                             type="number"
//                             min="0"
//                             step="0.01"
//                             value={item.price}
//                             onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value) || 0)}
//                           />
//                         </InputGroup>
//                       </td>
//                       <td>
//                         <InputGroup>
//                           <InputGroup.Text>$</InputGroup.Text>
//                           <Form.Control
//                             type="number"
//                             min="0"
//                             step="0.01"
//                             value={item.discount}
//                             onChange={(e) => handleItemChange(index, 'discount', parseFloat(e.target.value) || 0)}
//                           />
//                         </InputGroup>
//                       </td>
//                       {formData.taxEnabled && (
//                         <td>
//                           <InputGroup>
//                             <Form.Control
//                               type="number"
//                               min="0"
//                               max="100"
//                               value={item.tax}
//                               onChange={(e) => handleItemChange(index, 'tax', parseFloat(e.target.value) || 0)}
//                             />
//                             <InputGroup.Text>%</InputGroup.Text>
//                           </InputGroup>
//                         </td>
//                       )}
//                       <td className="align-middle">${item.amount.toFixed(2)}</td>
//                       <td className="align-middle text-center">
//                         <Button
//                           variant="outline-danger"
//                           size="sm"
//                           onClick={() => removeItem(index)}
//                           disabled={formData.items.length <= 1}
//                         >
//                           <FaTrash size={12} />
//                         </Button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             </div>

//             <Button
//               size="sm"
//               onClick={addNewItem}
//               className="mt-3 d-flex align-items-center"
//               style={{ backgroundColor: "#53b2a5", borderColor: "#53b2a5", color: "white" }}
//             >
//               <FaPlus className="me-1" /> Add Product
//             </Button>


//             {/* Totals Section */}
//             <Card className="border-0 bg-light mt-3">
//               <Card.Body className="p-3">
//                 <Row>
//                   <Col md={{ span: 4, offset: 8 }}>
//                     <div className="d-flex justify-content-between mb-2">
//                       <span className="fw-semibold">Subtotal:</span>
//                       <span>${formData.subTotal.toFixed(2)}</span>
//                     </div>
//                     <div className="d-flex justify-content-between mb-2">
//                       <span className="fw-semibold">Discount:</span>
//                       <span className="text-danger">-${formData.totalDiscount.toFixed(2)}</span>
//                     </div>
//                     {formData.taxEnabled && (
//                       <div className="d-flex justify-content-between mb-2">
//                         <span className="fw-semibold">
//                           Tax ({formData.items.length > 0 ? (formData.items.reduce((sum, item) => sum + (item.tax || 0), 0) / formData.items.length).toFixed(2) : 0}%):
//                         </span>
//                         <span>${formData.totalTax.toFixed(2)}</span>
//                       </div>
//                     )}
//                     <div className="d-flex justify-content-between fw-bold fs-5 border-top pt-2 mt-2">
//                       <span>Total:</span>
//                       <span>${formData.totalAmount.toFixed(2)}</span>
//                     </div>
//                   </Col>
//                 </Row>
//               </Card.Body>
//             </Card>
//           </Form>
//         </Modal.Body>

//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseCreateModal}>
//             Cancel
//           </Button>
//           <Button

//             style={{ backgroundColor: "#53b2a5", borderColor: "#53b2a5", color: "white" }}
//             onClick={() => {
//               alert(editMode ? 'Invoice updated successfully!' : 'Invoice created successfully!');
//               handleCloseCreateModal();
//             }}
//           >
//             {editMode ? "Update Invoice" : "Create Invoice"}
//           </Button>
//         </Modal.Footer>
//       </Modal>


//     </div>
//   );
// };

// export default Invoice;

// import React, { useState } from 'react';
// import {
//   Table, Button, Badge, Form, Row, Col, Modal, Nav,
//   Card,
// } from 'react-bootstrap';

// const initialOrders = [
//   {
//     id: 1,
//     orderNo: 2045,
//     vendor: 'Client A',
//     date: '15-07-2025',
//     amount: '$ 110.90',
//     quotationStatus: 'Done',
//     salesOrderStatus: 'Done',
//     invoiceStatus: 'Pending',
//     paymentStatus: 'Pending',
//   },
//   {
//     id: 2,
//     orderNo: 2044,
//     vendor: 'Client B',
//     date: '14-07-2025',
//     amount: '$ 500.00',
//     quotationStatus: 'Done',
//     salesOrderStatus: 'Pending',
//     invoiceStatus: 'Pending',
//     paymentStatus: 'Pending',
//   },
// ];

// const statusBadge = (status) => {
//   const variant = status === 'Done' ? 'success' : status === 'Pending' ? 'secondary' : 'warning';
//   return <Badge bg={variant}>{status}</Badge>;
// };

// const steps = ['quotationStatus', 'salesOrderStatus', 'invoiceStatus', 'paymentStatus'];

// const stepForms = [
//   { key: 'quotation', fields: [] },
//   { key: 'salesOrder', fields: [] },
//   { key: 'invoice', fields: [] },
//   { key: 'payment', fields: [] },
// ];

// const Invoice = () => {
//   const [orders, setOrders] = useState(initialOrders);
//   const [stepModal, setStepModal] = useState(false);
//   const [activeStep, setActiveStep] = useState(0);
//   const [currentOrder, setCurrentOrder] = useState(null);
//   const [formData, setFormData] = useState({
//     quotation: {
//       subject: '', description: '', amount: '', customerName: '', email: '', phone: '', address: '', taxId: '', projectName: '', notes: ''
//     },
//     salesOrder: {
//       reference: '', deliveryDate: '', shippingAddress: '', billingAddress: '', deliveryMethod: '', shippingCost: '', notes: ''
//     },
//     invoice: {
//       invoiceNumber: '', invoiceDate: '', dueDate: '', billingEmail: '', taxRate: '', subtotal: '', total: '', notes: ''
//     },
//     payment: {
//       method: '', amountPaid: '', transactionId: '', paymentDate: '', reference: '', status: '', notes: ''
//     },
//   });

//   const handleCreateNewInvoice = () => {
//     const newOrderNo = orders.length ? orders[0].orderNo + 1 : 2045;
//     const today = new Date().toISOString().split('T')[0];
//     const newOrder = {
//       id: orders.length + 1,
//       orderNo: newOrderNo,
//       vendor: 'New Client',
//       date: today,
//       amount: '$ 0.00',
//       quotationStatus: 'Pending',
//       salesOrderStatus: 'Pending',
//       invoiceStatus: 'Pending',
//       paymentStatus: 'Pending',
//     };
//     setOrders([newOrder, ...orders]);
//     setCurrentOrder(newOrder);
//     setActiveStep(0);
//     setStepModal(true);
//   };

//   const handleOpenStepForm = (order, stepIndex) => {
//     setCurrentOrder(order);
//     setActiveStep(stepIndex);
//     setStepModal(true);
//   };

//   const handleStepChange = (step, field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [step]: {
//         ...prev[step],
//         [field]: value,
//       },
//     }));
//   };

//   const handleSaveStep = () => {
//     if (!currentOrder) return;
//     const updatedOrders = orders.map((order) => {
//       if (order.id === currentOrder.id) {
//         const statusKey = steps[activeStep];
//         return { ...order, [statusKey]: 'Done' };
//       }
//       return order;
//     });
//     setOrders(updatedOrders);
//   };

//   const handleNext = () => {
//     handleSaveStep();
//     if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
//   };

//   const handlePrev = () => {
//     if (activeStep > 0) setActiveStep((prev) => prev - 1);
//   };

//   const handleCloseModal = () => {
//     setStepModal(false);
//     setActiveStep(0);
//     setCurrentOrder(null);
//     setFormData({
//       quotation: {
//         subject: '', description: '', amount: '', customerName: '', email: '', phone: '', address: '', taxId: '', projectName: '', notes: ''
//       },
//       salesOrder: {
//         reference: '', deliveryDate: '', shippingAddress: '', billingAddress: '', deliveryMethod: '', shippingCost: '', notes: ''
//       },
//       invoice: {
//         invoiceNumber: '', invoiceDate: '', dueDate: '', billingEmail: '', taxRate: '', subtotal: '', total: '', notes: ''
//       },
//       payment: {
//         method: '', amountPaid: '', transactionId: '', paymentDate: '', reference: '', status: '', notes: ''
//       },
//     });
//   };

//   const renderStepForm = () => {
//     const step = stepForms[activeStep];

//     return (
//       <Card className="border-0 shadow-sm">
//         <Card.Body>
//           <Row className="g-4">
//             {Object.entries(formData[step.key]).map(([field, value], idx) => (
//               <Col md={6} key={idx}>
//                 <Form.Group className="form-floating">
//                   <Form.Control
//                     type="text"
//                     id={`${step.key}-${field}`}
//                     placeholder={`Enter ${field}`}
//                     value={value}
//                     onChange={(e) => handleStepChange(step.key, field, e.target.value)}
//                     className="rounded-3 shadow-sm border-primary"
//                   />
//                   <Form.Label htmlFor={`${step.key}-${field}`} className="text-capitalize">
//                     {field.replace(/([A-Z])/g, ' $1')}
//                   </Form.Label>
//                 </Form.Group>
//               </Col>
//             ))}
//           </Row>
//         </Card.Body>
//       </Card>
//     );
//   };


//   return (
//     <div className="p-4">
//       <h5 className="mb-4">Sales Workflow</h5>
//       <Button variant="primary" className="mb-3" onClick={handleCreateNewInvoice}>
//         + Create New Invoice
//       </Button>
//       <Table bordered hover responsive className="text-center align-middle">
//         <thead className="table-light">
//           <tr>
//             <th>#</th>
//             <th>Invoice No</th>
//             <th>Customer</th>
//             <th>Date</th>
//             <th>Amount</th>
//             <th>Quotation</th>
//             <th>Sales Order</th>
//             <th>Invoice</th>
//             <th>Payment</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order, idx) => (
//             <tr key={order.id}>
//               <td>{idx + 1}</td>
//               <td>{order.orderNo}</td>
//               <td>{order.vendor}</td>
//               <td>{order.date}</td>
//               <td>{order.amount}</td>
//               <td>{statusBadge(order.quotationStatus)}</td>
//               <td>{statusBadge(order.salesOrderStatus)}</td>
//               <td>{statusBadge(order.invoiceStatus)}</td>
//               <td>{statusBadge(order.paymentStatus)}</td>
//               <td>
//                 {steps.map((statusKey, i) => (
//                   <Button
//                     key={i}
//                     size="sm"
//                     className="me-1 mb-1"
//                     variant="outline-primary"
//                     onClick={() => handleOpenStepForm(order, i)}
//                   >
//                     {stepForms[i].key}
//                   </Button>
//                 ))}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//       <Modal show={stepModal} onHide={handleCloseModal} size="lg" centered>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {stepForms[activeStep]?.key.toUpperCase()} - Order #{currentOrder?.orderNo}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Nav variant="pills" className="justify-content-center mb-4">
//             {stepForms.map((step, i) => (
//               <Nav.Item key={i}>
//                 <Nav.Link active={i === activeStep} onClick={() => setActiveStep(i)}>
//                   {step.key}
//                 </Nav.Link>
//               </Nav.Item>
//             ))}
//           </Nav>
//           {renderStepForm()}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handlePrev} disabled={activeStep === 0}>
//             Previous
//           </Button>
//           <Button variant="primary" onClick={handleNext} disabled={activeStep === steps.length - 1}>
//             Next
//           </Button>
//           <Button variant="success" onClick={handleSaveStep}>
//             Save Step
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default Invoice;
import React, { useState } from 'react';
import { Table, Button, Badge, Modal } from 'react-bootstrap';
import MultiStepPurchaseForm from './MultiStepPurchaseForm';

const initialOrders = [];

const statusBadge = (status) => {
  const variant = status === 'Done' ? 'success' : status === 'Pending' ? 'secondary' : 'warning';
  return <Badge bg={variant}>{status}</Badge>;
};

const Invoice = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [stepModal, setStepModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleCreateNewInvoice = (order = null) => {
    setSelectedOrder(order);
    setStepModal(true);
  };

  const handleCloseModal = () => {
    setStepModal(false);
    setSelectedOrder(null);
  };

  const handleFormSubmit = (formData, lastStep = 'quotation') => {
    const isEdit = selectedOrder?.id;
    const newOrderNo = orders.length ? orders[0].orderNo + 1 : 2045;
    const today = new Date().toISOString().split('T')[0];

    const newOrder = {
      id: isEdit ? selectedOrder.id : Date.now(),
      orderNo: isEdit ? selectedOrder.orderNo : newOrderNo,
      vendor: formData.quotation.customer || '',
      date: today,
      amount: `$ ${formData.payment?.amount || 0}`,
      quotation: formData.quotation,
      salesOrder: formData.salesOrder,
      invoice: formData.invoice,
      payment: formData.payment,
      quotationStatus: formData.quotation?.quotationNo ? 'Done' : 'Pending',
      salesOrderStatus: formData.salesOrder?.orderNo ? 'Done' : 'Pending',
      invoiceStatus: formData.invoice?.invoiceNo ? 'Done' : 'Pending',
      paymentStatus: formData.payment?.amount ? 'Done' : 'Pending',
      draftStep: lastStep,
    };

    setOrders(prev =>
      isEdit
        ? prev.map(o => (o.id === selectedOrder.id ? newOrder : o))
        : [newOrder, ...prev]
    );

    handleCloseModal();
  };

  return (
    <div className="p-4">
      <h5 className="mb-4">Sales Workflow</h5>
      <Button variant="primary" className="mb-3" onClick={() => handleCreateNewInvoice()} 
                    style={{ backgroundColor: "#53b2a5", border: "none", padding: "8px 16px" }}
        >
        + Create New Invoice
      </Button>
      <Table bordered hover responsive className="text-center align-middle">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Invoice No</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Quotation</th>
            <th>Sales Order</th>
            <th>Invoice</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr key={order.id}>
              <td>{idx + 1}</td>
              <td>{order.invoice?.invoiceNo || '-'}</td>
              <td>{order.vendor}</td>
              <td>{order.date}</td>
              <td>{order.amount}</td>
              <td>{statusBadge(order.quotationStatus)}</td>
              <td>{statusBadge(order.salesOrderStatus)}</td>
              <td>{statusBadge(order.invoiceStatus)}</td>
              <td>{statusBadge(order.paymentStatus)}</td>
              <td>
                <Button
                  size="sm"
                  className="me-1 mb-1"
                  variant="outline-primary"
                  onClick={() => handleCreateNewInvoice(order)}
                >
                  Continue
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={stepModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedOrder ? 'Continue Invoice' : 'Create Invoice'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MultiStepPurchaseForm
            initialData={selectedOrder}
            initialStep={selectedOrder?.draftStep}
            onSubmit={handleFormSubmit}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Invoice;
