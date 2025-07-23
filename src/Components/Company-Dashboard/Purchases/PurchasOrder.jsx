import React, { useState, useRef } from 'react';
// import { Table, Button, Badge, Form, Row, Col, Modal } from 'react-bootstrap';
import { FaEye, FaDownload, FaTrash, FaUpload, FaFile } from 'react-icons/fa';

import { Table, Button, Badge, Form, Row, Col, Modal, InputGroup } from 'react-bootstrap';
import { BsCalendar, BsBookmark, BsPlusCircle, BsPlus } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

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

const PurchasOrder = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef();
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

  const handleDownloadBlankSuppliers = () => {
    const blankOrders = orders.filter(order => !order.supplier);
    if (blankOrders.length === 0) {
      alert("No blank supplier data to download.");
      return;
    }
    let csv = `Order No,Supplier,Date,Amount,Status\n`;
    blankOrders.forEach(order => {
      csv += `${order.orderNo},-,${order.date},${order.amount},${order.status}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "Blank-Supplier-Orders.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportAll = () => {
    let csv = `Order No,Supplier,Date,Amount,Status\n`;
    orders.forEach(order => {
      csv += `${order.orderNo},${order.supplier || '-'},${order.date},${order.amount},${order.status}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "All-Orders.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleImportFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // TODO: Implement CSV parsing logic here
    alert(`Imported file: ${file.name}`);
    e.target.value = null;
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

  const addRow = () => {
    setItems([
      ...items,
      { name: '', description: '', quantity: 1, rate: '', tax: '', discount: '', amount: 0 }
    ]);
  };

  return (
    <div className="p-4 my-4 px-4">

      {/* Search and Buttons */}
      <div className="mb-3 d-flex justify-content-between align-items-center flex-wrap gap-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Purchase Orders</h5>
     
      </div>
        

<div className="d-flex gap-2 flex-wrap">
  <Button variant="success" className="rounded-pill px-4 d-flex align-items-center" onClick={handleImportClick}>
    <FaUpload size={18} className="me-2 text-white" /> Import
  </Button>
  <input
    type="file"
    ref={fileInputRef}
    accept=".csv"
    style={{ display: 'none' }}
    onChange={handleImportFile}
  />


  <Button  className="rounded-pill px-4 d-flex align-items-center"

  style={{ backgroundColor: "#fd7e14", borderColor: "#fd7e14" }}
  onClick={handleExportAll}>
    <FaFile size={18} className="me-2" /> Export
  </Button>




  <Button
    className="rounded-pill px-4 d-flex align-items-center"
    style={{ backgroundColor: '#ffc107', borderColor: '#ffc107' }}
    onClick={handleDownloadBlankSuppliers}
  >
    <FaDownload size={18} className="me-2 " /> Download
  </Button>
</div>

      </div>
     

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


    </div>
  );
};

export default PurchasOrder;