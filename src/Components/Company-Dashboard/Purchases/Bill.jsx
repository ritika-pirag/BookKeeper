import React, { useState } from 'react';
import { Table, Button, Badge, Form, Row, Col, Modal, InputGroup } from 'react-bootstrap';
import { FaEye, FaDownload, FaTrash } from 'react-icons/fa';
import { BsCalendar, BsBookmark, BsPlusCircle, BsPlus } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


const initialOrders = [
  { id: 1, orderNo: 1045, vendor: "Haroun Spiers", date: "15-07-2025", amount: "$ 10.90", status: "Paid" },
  { id: 2, orderNo: 1044, vendor: "Crauk", date: "15-07-2025", amount: "$ 325.00", status: "Paid" },
  { id: 3, orderNo: 1043, vendor: "Maureen Dotson", date: "12-07-2025", amount: "$ 75.00", status: "Paid" },
  { id: 4, orderNo: 1042, vendor: "Zaruke", date: "11-07-2025", amount: "$ 247.00", status: "Partial" },
  { id: 5, orderNo: 1041, vendor: "farhan", date: "09-07-2025", amount: "$ 100.00", status: "Partial" },
];

const getStatusBadge = (status) => {
  if (status === 'Paid') return <Badge bg="success">Paid</Badge>;
  if (status === 'Partial') return <Badge bg="info">Partial</Badge>;
  return <Badge bg="secondary">{status}</Badge>;
};

const Bill = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(initialOrders);
  const [showModal, setShowModal] = useState(false);
  const [showTaxModal, setShowTaxModal] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);

  const [isTaxOn, setIsTaxOn] = useState(true);
  const [isDiscountOn, setIsDiscountOn] = useState(true);
  const [selectedVendor, setSelectedVendor] = useState('');
  const [taxClass, setTaxClass] = useState('');
  const [taxValue, setTaxValue] = useState('');
  const [discountName, setDiscountName] = useState('');
  const [discountValue, setDiscountValue] = useState('');
  const [items, setItems] = useState([
    { name: '', description: '', quantity: 1, rate: '', tax: '', discount: '', amount: 0 }
  ]);

  const vendors = [
    { id: 1, name: "John Vendor" },
    { id: 2, name: "Emily Vendor" },
    { id: 3, name: "Rajesh Vendor" }
  ];

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders(orders.filter(order => order.id !== id));
    }
  };

  const handleDownload = (order) => {
    const csvContent = `Order No,Vendor,Date,Amount,Status\n${order.orderNo},${order.vendor || '-'},${order.date},${order.amount},${order.status}`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Order-${order.orderNo}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };



  const handleDownloadTemplate = () => {
    const wsData = [
      ["Order No", "Vendor", "Date", "Amount", "Status"],
      ["", "", "", "", ""]
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(wsData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Template");
  
    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "order-template.xlsx");
  };
  
  // ⬇️ Export All Orders to Excel
  const handleExportAllOrders = () => {
    const data = orders.map((order) => ({
      "Order No": order.orderNo,
      "Vendor": order.vendor,
      "Date": order.date,
      "Amount": order.amount,
      "Status": order.status
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
  
    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "purchase-orders.xlsx");
  };
  
  // ⬆️ Import Orders from Excel File
  const handleImportExcel = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const importedData = XLSX.utils.sheet_to_json(sheet);
  
      const newOrders = importedData.map((row, index) => ({
        id: Date.now() + index,
        orderNo: row["Order No"] || '',
        vendor: row["Vendor"] || '',
        date: row["Date"] || '',
        amount: row["Amount"] || '',
        status: row["Status"] || 'Draft'
      }));
  
      setOrders([...orders, ...newOrders]);
    };
  
    reader.readAsArrayBuffer(file);
  };

  const addRow = () => {
    setItems([
      ...items,
      { name: '', description: '', quantity: 1, rate: '', tax: '', discount: '', amount: 0 }
    ]);
  };

  return (
    <div className="p-4 my-4 px-4">


   

      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
  <h5 className="mb-0">Manage Bills</h5>
  <div className="d-flex flex-wrap gap-2">
    <Button
      size="sm"
      style={{ backgroundColor: '#28a745', borderColor: '#28a745' }} // Green
      onClick={handleImportExcel}
    >
      <i className="fas fa-file-import me-2"></i> Import
    </Button>

    <Button
      size="sm"
      style={{ backgroundColor: '#fd7e14', borderColor: '#fd7e14' }} // Orange
      onClick={handleExportAllOrders}
    >
      <i className="fas fa-file-export me-2"></i> Export
    </Button>

    <Button
      size="sm"
      style={{ backgroundColor: '#ffc107', borderColor: '#ffc107', color: 'white' }} // Yellow
      onClick={handleDownloadTemplate}
    >
      <i className="fas fa-download me-2"></i> Download
    </Button>

    <Button
      size="sm"
      style={{ backgroundColor: '#3daaaa', borderColor: '#3daaaa', color: 'white' }} // Teal
      onClick={() => setShowModal(true)}
    >
      <i className="fas fa-plus me-2"></i> Add Bill
    </Button>
  </div>
</div>

{/* Title and Action Buttons */}
   {/* Filter + Search */}
   <Row className="align-items-center mb-3 g-2">
        <Col xs={12} md={3}>
          <Form.Select size="sm" defaultValue="10">
            <option value="10">Show 10 entries</option>
            <option value="25">Show 25 entries</option>
            <option value="50">Show 50 entries</option>
          </Form.Select>
        </Col>
        <Col xs={12} md={{ span: 3, offset: 6 }}>
          <Form.Control size="sm" type="text" placeholder="Search" />
        </Col>
      </Row> 


















      {/* Orders Table */}
      <div className="table-responsive">
        <Table bordered hover className="align-middle text-center">
          <thead className="table-light">
            <tr>
              <th>No</th>
              <th>Bill No</th>
              <th>Vendor</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.orderNo}</td>
                <td>{order.vendor || '-'}</td>
                <td>{order.date}</td>
                <td>{order.amount}</td>
                <td>{getStatusBadge(order.status)}</td>
                <td className="d-flex gap-2 justify-content-center">
                  <button className="btn outline-info btn-sm py-1 px-1 text-info" onClick={() => navigate('/company/purchaseview')}>
                    <FaEye size={16} className="me-1" />
                  </button>
                  <button className="btn outline-primary btn-sm text-warning py-1 px-1" onClick={() => handleDownload(order)}>
                    <FaDownload size={16} />
                  </button>
                  <button className="btn outline-primary btn-sm text-danger py-2 px-1" onClick={() => handleDelete(order.id)}>
                    <FaTrash size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mt-3 gap-2">
        <span className="small text-muted">Showing 1 to {orders.length} of {orders.length} results</span>
        <nav>
          <ul className="pagination pagination-sm mb-0 flex-wrap">
            <li className="page-item disabled"><button className="page-link rounded-start">&laquo;</button></li>
            <li className="page-item active"><button className="page-link" style={{ backgroundColor: '#3daaaa', borderColor: '#3daaaa' }}>1</button></li>
            <li className="page-item"><button className="page-link">2</button></li>
            <li className="page-item"><button className="page-link rounded-end">&raquo;</button></li>
          </ul>
        </nav>
      </div>

      {/* FULL INLINE MODAL WITH FORM */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size='lg' centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Create Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="p-4 mt-4 mb-5 border">
            {/* Vendor Info */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Vendor*</Form.Label>
                  <InputGroup>
                    <Form.Select value={selectedVendor} onChange={(e) => setSelectedVendor(e.target.value)} className="border-end-0">
                      <option value="">Select Vendor</option>
                      {vendors.map(v => (
                        <option key={v.id} value={v.name}>{v.name}</option>
                      ))}
                    </Form.Select>
                    <Button variant="outline-secondary" size="sm" className="border-start-0" onClick={() => navigate("company/vendorscreditors")}>
                      <BsPlus size={12} />
                    </Button>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Label>Bill #</Form.Label>
                <InputGroup><InputGroup.Text><BsCalendar /></InputGroup.Text><Form.Control value="1046" /></InputGroup>
              </Col>
              <Col md={6} className='mt-2'>
                <Form.Label>Reference</Form.Label>
                <InputGroup><InputGroup.Text><BsBookmark /></InputGroup.Text><Form.Control placeholder="Reference #" /></InputGroup>
              </Col>
              <Col md={6}>
                <Form.Label>Order Date</Form.Label>
                <InputGroup><InputGroup.Text><BsCalendar /></InputGroup.Text><Form.Control type="date" value="2025-07-15" /></InputGroup>
              </Col>
              <Col md={6} className='mt-2'>
                <Form.Label>Due Date</Form.Label>
                <InputGroup><InputGroup.Text><BsCalendar /></InputGroup.Text><Form.Control type="date" value="2025-07-15" /></InputGroup>
              </Col>
            </Row>

            {/* Tax & Discount Switches */}
            <Row className="mb-3">
              <Col md={12} className="mb-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-3">
                    <Form.Label className="mb-0 fw-semibold small">Tax</Form.Label>
                    <Form.Check type="switch" label={isTaxOn ? "On" : "Off"} checked={isTaxOn} onChange={() => setIsTaxOn(!isTaxOn)} />
                  </div>
                  <Button size="sm" onClick={() => setShowTaxModal(true)} style={{ backgroundColor: "#3daaaa", borderColor: "#3daaaa" }}>
                    + Add Tax
                  </Button>
                </div>
              </Col>
              <Col md={12}>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-3">
                    <Form.Label className="mb-0 fw-semibold small">Discount</Form.Label>
                    <Form.Check type="switch" label={isDiscountOn ? "On" : "Off"} checked={isDiscountOn} onChange={() => setIsDiscountOn(!isDiscountOn)} />
                  </div>
                  <Button size="sm" onClick={() => setShowDiscountModal(true)} style={{ backgroundColor: "#3daaaa", borderColor: "#3daaaa" }}>
                    + Add Discount
                  </Button>
                </div>
              </Col>
            </Row>

            {/* Items Table */}
            <div className="table-responsive mb-3">
              <table className="table table-bordered align-middle">
                <thead>
                  <tr className="table-light">
                    <th>Product</th><th>Quantity</th><th>Price</th>
                    {isTaxOn && <><th>Tax(%)</th><th>Tax</th></>}
                    {isDiscountOn && <th>Discount</th>}
                    <th>Amount ($)</th><th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td><Form.Control placeholder="Product" className="mb-1" /><Form.Control placeholder="Description" /></td>
                      <td><Form.Control type="number" defaultValue={1} /></td>
                      <td><Form.Control placeholder="Price" /></td>
                      {isTaxOn && <td><Form.Control placeholder="%" /></td>}
                      {isTaxOn && <td>0</td>}
                      {isDiscountOn && <td><Form.Control placeholder="%" /></td>}
                      <td>$ 0</td><td>-</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button className="d-flex align-items-center mt-4 mb-2" style={{ backgroundColor: "#3daaaa", borderColor: "#3daaaa" }} onClick={addRow}>
                <BsPlusCircle className="me-1" /> Add Row
              </Button>
            </div>

            {/* Summary & Generate */}
            <Row className="justify-content-end text-end mb-5">
              <Col md={4}>
                <p>Total Tax: <strong>{isTaxOn ? '$ 0' : '-'}</strong></p>
                <p>Total Discount: <strong>{isDiscountOn ? '$ 0' : '-'}</strong></p>
                <InputGroup className="mb-2"><InputGroup.Text>Shipping</InputGroup.Text><Form.Control placeholder="Value" /></InputGroup>
                <InputGroup className="mb-3"><InputGroup.Text>Grand Total ($)</InputGroup.Text><Form.Control /></InputGroup>
                <Button style={{ backgroundColor: "#3daaaa", borderColor: "#3daaaa" }}>Generate Order</Button>
              </Col>
            </Row>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Bill;
