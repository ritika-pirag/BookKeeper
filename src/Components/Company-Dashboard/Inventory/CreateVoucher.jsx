// import React, { useState } from "react";
// import { Tabs, Tab, Button, Row, Col, Form } from "react-bootstrap";
// import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// const CreateVoucher = () => {
//   const [activeTab, setActiveTab] = useState("sales");
//   const navigate = useNavigate();

//   const voucherData = [
//     {
//       itemName: "Voucher Item 1",
//       hsn: "1234",
//       quantity: 10,
//       cost: 100,
//       value: 1000,
//       status: "In Stock",
//     },
//     {
//       itemName: "Voucher Item 2",
//       hsn: "5678",
//       quantity: 0,
//       cost: 200,
//       value: 0,
//       status: "Out of Stock",
//     },
//   ];

//   const [salesSearchTerm, setSalesSearchTerm] = useState("");
//   const [purchaseSearchTerm, setPurchaseSearchTerm] = useState("");

//   const filteredSales = voucherData.filter((item) =>
//     item.itemName.toLowerCase().includes(salesSearchTerm.toLowerCase())
//   );

//   const filteredPurchase = voucherData.filter((item) =>
//     item.itemName.toLowerCase().includes(purchaseSearchTerm.toLowerCase())
//   );

//   return (
//     <div className="mt-4 p-3">
//       <Row className="align-items-center mb-3">
//         <Col md={12}>
//           <h4 className="fw-bold mb-0">Create Voucher</h4>
//         </Col>
//       </Row>

//       <Row className="align-items-center mb-3">
//         <Col md={6}>
//           <Tabs
//             id="voucher-tabs"
//             activeKey={activeTab}
//             onSelect={(k) => setActiveTab(k)}
//             className="mb-0"
//           >
//             <Tab eventKey="sales" title="Sales Voucher" />
//             <Tab eventKey="purchase" title="Purchase Voucher" />
//           </Tabs>
//         </Col>

//         <Col md={6} className="text-end">
//         {activeTab === "sales" ? (
//   <Button
//     style={{
//       backgroundColor: '#27b2b6',
//       border: 'none',
//       color: '#fff',
//       padding: '6px 16px',
//     }}
//     onClick={() => navigate("/company/salesvoucher")}
//   >
//     Add Sales Voucher
//   </Button>
// ) : (
//   <Button
//     style={{
//       backgroundColor: '#27b2b6',
//       border: 'none',
//       color: '#fff',
//       padding: '6px 16px',
//     }}
//     onClick={() => navigate("/company/purchasevoucher")}
//   >
//     Add Purchase Voucher
//   </Button>
// )}

//         </Col>
//       </Row>

//       {activeTab === "sales" && (
//         <>
//           <Row className="mb-3">
//             <Col md={4}>
//               <Form.Control
//                 type="text"
//                 placeholder="Search sales voucher..."
//                 className="rounded-pill"
//                 value={salesSearchTerm}
//                 onChange={(e) => setSalesSearchTerm(e.target.value)}
//               />
//             </Col>
//           </Row>
//           <div className="card bg-white rounded-3 p-3">
//             <div className="table-responsive">
//               <table className="table table-hover align-middle mb-0">
//                 <thead className="table-light">
//                   <tr>
//                     <th>Name</th>
//                     <th>HSN</th>
//                     <th>Quantity</th>
//                     <th>Cost</th>
//                     <th>Value</th>
//                     <th>Status</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredSales.length > 0 ? (
//                     filteredSales.map((item, idx) => (
//                       <tr key={idx}>
//                         <td>{item.itemName}</td>
//                         <td>{item.hsn}</td>
//                         <td>{item.quantity}</td>
//                         <td>{item.cost}</td>
//                         <td>{item.value}</td>
//                         <td>
//                           <span
//                             className={`badge px-3 py-1 rounded-pill fw-semibold ${
//                               item.status === "In Stock"
//                                 ? "bg-success text-white"
//                                 : "bg-danger text-white"
//                             }`}
//                           >
//                             {item.status}
//                           </span>
//                         </td>
//                         <td>
//                                   <div className="d-flex gap-2">
//                                   <Button
//   variant="link"
//   className="text-info p-0"
//   onClick={() => navigate("/company/salesvoucherview")}
// >
//   <FaEye />
// </Button>

//                                     {/* <Button variant="link" className="text-warning p-0" ><FaEdit /></Button> */}
//                                     <Button variant="link" className="text-danger p-0" ><FaTrash /></Button>
//                                   </div>
//                                 </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="7" className="text-center">
//                         No items found.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </>
//       )}

//       {activeTab === "purchase" && (
//         <>
//           <Row className="mb-3">
//             <Col md={4}>
//               <Form.Control
//                 type="text"
//                 placeholder="Search purchase voucher..."
//                 className="rounded-pill"
//                 value={purchaseSearchTerm}
//                 onChange={(e) => setPurchaseSearchTerm(e.target.value)}
//               />
//             </Col>
//           </Row>
//           <div className="card bg-white rounded-3 p-3">
//             <div className="table-responsive">
//               <table className="table table-hover align-middle mb-0">
//                 <thead className="table-light">
//                   <tr>
//                     <th>Name</th>
//                     <th>HSN</th>
//                     <th>Quantity</th>
//                     <th>Cost</th>
//                     <th>Value</th>
//                     <th>Status</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredPurchase.length > 0 ? (
//                     filteredPurchase.map((item, idx) => (
//                       <tr key={idx}>
//                         <td>{item.itemName}</td>
//                         <td>{item.hsn}</td>
//                         <td>{item.quantity}</td>
//                         <td>{item.cost}</td>
//                         <td>{item.value}</td>
//                         <td>
//                           <span
//                             className={`badge px-3 py-1 rounded-pill fw-semibold ${
//                               item.status === "In Stock"
//                                 ? "bg-success text-white"
//                                 : "bg-danger text-white"
//                             }`}
//                           >
//                             {item.status}
//                           </span>
//                         </td>

//                         <td>
//                                   <div className="d-flex gap-2">
//                                   <Button
//   variant="link"
//   className="text-info p-0"
//   onClick={() => navigate("/company/purchasevoucherview")}
// >
//   <FaEye />
// </Button>

//                                     {/* <Button variant="link" className="text-warning p-0" ><FaEdit /></Button> */}
//                                     <Button variant="link" className="text-danger p-0" ><FaTrash /></Button>
//                                   </div>
//                                 </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="7" className="text-center">
//                         No items found.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default CreateVoucher;




// import React, { useState } from "react";
// import { Button, Form, Table, Offcanvas } from "react-bootstrap";
// import { FaArrowRight } from "react-icons/fa";

// const VOUCHER_TYPES = [
//   "Sales",
//   "Purchase",
//   "Receipt",
//   "Payment",
//   "Expense",
//   "Contra",
//   "Journal",
//   "Credit Note",
//   "Debit Note",
//   "Stock/Inventory Adjustment",
//   "Opening Balance",
// ];

// const voucherFieldsMap = {
//   common: ["date", "partyName", "amount", "paymentMode", "narration", "reference", "billNo"],
//   Sales: ["items"],
//   Purchase: ["items"],
//   "Stock/Inventory Adjustment": ["stockAdjustmentType", "items"],
// };

// const initialFormData = {
//   date: "",
//   partyName: "",
//   amount: "",
//   paymentMode: "",
//   items: "",
//   narration: "",
//   reference: "",
//   stockAdjustmentType: "",
//   billNo: "",
// };

// const CreateVoucherModal = ({ show, onHide, onSave }) => {
//   const [voucherType, setVoucherType] = useState("");
//   const [formData, setFormData] = useState(initialFormData);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = () => {
//     if (!voucherType) return;
//     onSave({ voucherType, ...formData, status: "Pending" });
//     setFormData(initialFormData);
//     setVoucherType("");
//     onHide();
//   };

//   const visibleFields = [
//     ...voucherFieldsMap.common,
//     ...(voucherFieldsMap[voucherType] || []),
//   ];

//   return (
//     <Offcanvas show={show} onHide={onHide} placement="end" className="position-absolute pt-5 px-4" style={{ width: '75%' }}>
//       <Offcanvas.Body>
//         <Button
//           variant="light"
//           onClick={onHide}
//           className="position-absolute"
//           style={{
//             top: "20px",
//             left: "-12px",
//             zIndex: 1051,
//             borderRadius: "50%",
//             padding: "6px 10px",
//             boxShadow: "0 0 6px rgba(0,0,0,0.2)",
//           }}
//         >
//           <FaArrowRight size={20} color="#3daaaa" />
//         </Button>

//         <h5 className="mb-4">Create Voucher</h5>

//         <Form>
//           <Form.Group className="mb-3">
//             <Form.Label>Voucher Type</Form.Label>
//             <Form.Select
//               value={voucherType}
//               onChange={(e) => setVoucherType(e.target.value)}
//             >
//               <option value="">Select Type</option>
//               {VOUCHER_TYPES.map((type) => (
//                 <option key={type}>{type}</option>
//               ))}
//             </Form.Select>
//           </Form.Group>

//           {visibleFields.includes("date") && (
//             <Form.Group className="mb-3">
//               <Form.Label>Date</Form.Label>
//               <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} />
//             </Form.Group>
//           )}

//           {visibleFields.includes("partyName") && (
//             <Form.Group className="mb-3">
//               <Form.Label>Party Name</Form.Label>
//               <Form.Control name="partyName" value={formData.partyName} onChange={handleChange} />
//             </Form.Group>
//           )}

//           {visibleFields.includes("amount") && (
//             <Form.Group className="mb-3">
//               <Form.Label>Amount</Form.Label>
//               <Form.Control type="number" name="amount" value={formData.amount} onChange={handleChange} />
//             </Form.Group>
//           )}

//           {visibleFields.includes("paymentMode") && (
//             <Form.Group className="mb-3">
//               <Form.Label>Payment Mode</Form.Label>
//               <Form.Select name="paymentMode" value={formData.paymentMode} onChange={handleChange}>
//                 <option value="">Select</option>
//                 <option>Cash</option>
//                 <option>Bank</option>
//                 <option>Wallet</option>
//               </Form.Select>
//             </Form.Group>
//           )}

//           {visibleFields.includes("billNo") && (
//             <Form.Group className="mb-3">
//               <Form.Label>Bill / Invoice No</Form.Label>
//               <Form.Control name="billNo" value={formData.billNo} onChange={handleChange} />
//             </Form.Group>
//           )}

//           {visibleFields.includes("items") && (
//             <Form.Group className="mb-3">
//               <Form.Label>Items</Form.Label>
//               <Form.Control as="textarea" rows={3} name="items" value={formData.items} onChange={handleChange} />
//             </Form.Group>
//           )}

//           {visibleFields.includes("stockAdjustmentType") && (
//             <Form.Group className="mb-3">
//               <Form.Label>Stock Adjustment Type</Form.Label>
//               <Form.Select name="stockAdjustmentType" value={formData.stockAdjustmentType} onChange={handleChange}>
//                 <option value="">Select</option>
//                 <option>Lost</option>
//                 <option>Damaged</option>
//                 <option>Manual</option>
//               </Form.Select>
//             </Form.Group>
//           )}

//           {visibleFields.includes("reference") && (
//             <Form.Group className="mb-3">
//               <Form.Label>Reference</Form.Label>
//               <Form.Control name="reference" value={formData.reference} onChange={handleChange} />
//             </Form.Group>
//           )}

//           {visibleFields.includes("narration") && (
//             <Form.Group className="mb-3">
//               <Form.Label>Narration</Form.Label>
//               <Form.Control as="textarea" rows={2} name="narration" value={formData.narration} onChange={handleChange} />
//             </Form.Group>
//           )}

//           <div className="d-flex justify-content-end mt-4">
//             <Button style={{ backgroundColor: '#3E3F3F', borderColor: '#8E8E8E' }} onClick={onHide}>Cancel</Button>
//             <Button variant="primary" className="ms-2" onClick={handleSubmit}>Save Voucher</Button>
//           </div>
//         </Form>
//       </Offcanvas.Body>
//     </Offcanvas>
//   );
// };

// const VoucherPage = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [vouchers, setVouchers] = useState([]);

//   const handleSaveVoucher = (voucher) => {
//     setVouchers([...vouchers, voucher]);
//   };

//   return (
//     <div className="container py-4">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h4>Vouchers</h4>
//         <Button onClick={() => setShowModal(true)}>Create Voucher</Button>
//       </div>

//       <Table bordered hover>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Type</th>
//             <th>Date</th>
//             <th>Party</th>
//             <th>Amount</th>
//             <th>Mode</th>
//             <th>Bill No</th>
//             <th>Reference</th>
//             <th>Narration</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {vouchers.map((v, i) => (
//             <tr key={i}>
//               <td>{i + 1}</td>
//               <td>{v.voucherType}</td>
//               <td>{v.date}</td>
//               <td>{v.partyName}</td>
//               <td>{v.amount}</td>
//               <td>{v.paymentMode}</td>
//               <td>{v.billNo}</td>
//               <td>{v.reference}</td>
//               <td>{v.narration}</td>
//               <td>{v.status}</td>
//             </tr>
//           ))}
//           {vouchers.length === 0 && (
//             <tr>
//               <td colSpan="10" className="text-center">
//                 No vouchers added yet
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </Table>

//       <CreateVoucherModal
//         show={showModal}
//         onHide={() => setShowModal(false)}
//         onSave={handleSaveVoucher}
//       />
//     </div>
//   );
// };

// export default VoucherPage;


import React, { useState } from "react";
import { Button, Form, Table, Offcanvas } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";

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
    "amount",
    "paymentMode",
    "narration",
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
  amount: "",
  paymentMode: "",
  items: "",
  narration: "",
  reference: "",
  stockAdjustmentType: "",
  billNo: "",
};

const CreateVoucherModal = ({ show, onHide, onSave }) => {
  const [voucherType, setVoucherType] = useState("");
  const [formData, setFormData] = useState(initialFormData);

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
    <Offcanvas
      show={show}
      onHide={onHide}
      placement="end"
      className="position-absolute pt-5 px-4"
      style={{ width: "75%" }}
    >
      <Offcanvas.Body>
        <Button
          variant="light"
          onClick={onHide}
          className="position-absolute"
          style={{
            top: "20px",
            left: "-12px",
            zIndex: 1051,
            borderRadius: "50%",
            padding: "6px 10px",
            boxShadow: "0 0 6px rgba(0,0,0,0.2)",
          }}
        >
          <FaArrowRight size={20} color="#3daaaa" />
        </Button>

        <h5 className="mb-4">Create Voucher</h5>

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

          {visibleFields.includes("narration") && (
            <Form.Group className="mb-3">
              <Form.Label>Narration</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="narration"
                value={formData.narration}
                onChange={handleChange}
              />
            </Form.Group>
          )}

          <div className="d-flex justify-content-end mt-4">
            <Button
              style={{
                backgroundColor: "#3E3F3F",
                borderColor: "#8E8E8E",
              }}
              onClick={onHide}
            >
              Cancel
            </Button>
            <Button variant="primary" className="ms-2" onClick={handleSubmit}>
              Save Voucher
            </Button>
          </div>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

const VoucherPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [vouchers, setVouchers] = useState([]);

  const handleSaveVoucher = (voucher) => {
    setVouchers([...vouchers, voucher]);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Vouchers</h4>
        <Button onClick={() => setShowModal(true)}>Create Voucher</Button>
      </div>

      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Date</th>
            <th>Party</th>
            <th>Customer/Vendor</th>
            <th>Amount</th>
            <th>Mode</th>
            <th>Bill No</th>
            <th>Reference</th>
            <th>Narration</th>
            <th>Status</th>
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
              <td>{v.amount}</td>
              <td>{v.paymentMode}</td>
              <td>{v.billNo}</td>
              <td>{v.reference}</td>
              <td>{v.narration}</td>
              <td>{v.status}</td>
            </tr>
          ))}
          {vouchers.length === 0 && (
            <tr>
              <td colSpan="11" className="text-center">
                No vouchers added yet
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <CreateVoucherModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleSaveVoucher}
      />
    </div>
  );
};

export default VoucherPage;
