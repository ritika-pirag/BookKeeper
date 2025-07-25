
import React, { useState, useRef, useMemo } from 'react';
import { Table, Button, Badge, Form, Row, Col, InputGroup, Modal } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaUpload, FaFile, FaCalendarAlt, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const initialDeliveries = [
  { 
    id: 1, 
    challanNo: 'DC-1001', 
    orderNo: 'SO-2045', 
    customer: 'Client A', 
    date: '20-07-2025', 
    items: 3, 
    status: 'Delivered', 
    amount: 15000,
    deliveryAddress: '123 Main St, City A',
    contactPerson: 'John Doe',
    contactPhone: '9876543210'
  },
  { 
    id: 2, 
    challanNo: 'DC-1002', 
    orderNo: 'SO-2046', 
    customer: 'Client B', 
    date: '21-07-2025', 
    items: 2, 
    status: 'Pending', 
    amount: 25000,
    deliveryAddress: '456 Park Ave, City B',
    contactPerson: 'Jane Smith',
    contactPhone: '8765432109'
  }
];

const getStatusBadge = (status) => {
  if (status === 'Delivered') return <Badge bg="success">Delivered</Badge>;
  if (status === 'Pending') return <Badge bg="warning" text="dark">Pending</Badge>;
  return <Badge bg="secondary">{status}</Badge>;
};

const SalesDelivery = () => {
  const [deliveries, setDeliveries] = useState(initialDeliveries);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [amountMin, setAmountMin] = useState('');
  const [amountMax, setAmountMax] = useState('');
  const [customerFilter, setCustomerFilter] = useState('');
  
  const navigate = useNavigate();
  const fileInputRef = useRef();

  // View Modal State
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  // Edit Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editDelivery, setEditDelivery] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this delivery note?")) {
      setDeliveries(deliveries.filter(delivery => delivery.id !== id));
    }
  };

  const handleExportAll = () => {
    let csv = `Challan No,Order No,Customer,Date,Items,Amount,Status\n`;
    deliveries.forEach(d => {
      csv += `${d.challanNo},${d.orderNo},${d.customer},${d.date},${d.items},${d.amount},${d.status}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "All-Delivery-Challans.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownload = (delivery) => {
    const csv = `Challan No,Order No,Customer,Date,Items,Amount,Status\n${delivery.challanNo},${delivery.orderNo},${delivery.customer},${delivery.date},${delivery.items},${delivery.amount},${delivery.status}`;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${delivery.challanNo}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Filter deliveries
  const filteredDeliveries = useMemo(() => {
    return deliveries.filter(delivery => {
      const matchesSearch = 
        delivery.challanNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.customer.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || delivery.status === statusFilter;
      
      const matchesCustomer = customerFilter === '' || delivery.customer === customerFilter;
      
      let matchesDate = true;
      if (dateFrom && dateTo) {
        const deliveryDate = new Date(delivery.date.split('-').reverse().join('-'));
        const fromDate = new Date(dateFrom);
        const toDate = new Date(dateTo);
        matchesDate = deliveryDate >= fromDate && deliveryDate <= toDate;
      } else if (dateFrom) {
        const deliveryDate = new Date(delivery.date.split('-').reverse().join('-'));
        const fromDate = new Date(dateFrom);
        matchesDate = deliveryDate >= fromDate;
      } else if (dateTo) {
        const deliveryDate = new Date(delivery.date.split('-').reverse().join('-'));
        const toDate = new Date(dateTo);
        matchesDate = deliveryDate <= toDate;
      }
      
      let matchesAmount = true;
      if (amountMin && amountMax) {
        matchesAmount = delivery.amount >= parseFloat(amountMin) && delivery.amount <= parseFloat(amountMax);
      } else if (amountMin) {
        matchesAmount = delivery.amount >= parseFloat(amountMin);
      } else if (amountMax) {
        matchesAmount = delivery.amount <= parseFloat(amountMax);
      }
      
      return matchesSearch && matchesStatus && matchesCustomer && matchesDate && matchesAmount;
    });
  }, [deliveries, searchTerm, statusFilter, customerFilter, dateFrom, dateTo, amountMin, amountMax]);

  // Handle Edit Save
  const handleEditSave = (updatedDelivery) => {
    setDeliveries(deliveries.map(d => 
      d.id === updatedDelivery.id ? updatedDelivery : d
    ));
    setShowEditModal(false);
  };

  return (
    <div className="p-4 my-4 px-4">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
        <h5 className="mb-0">Sales Deliveries</h5>

        <div className="d-flex gap-2">
          <Button className="rounded-pill px-4 d-flex align-items-center"
            variant="success"
            onClick={() => fileInputRef.current.click()}
          >
            <FaUpload className="me-2 text-white" /> Import
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            accept=".csv"
            style={{ display: 'none' }}
            onChange={(e) => alert(`Imported file: ${e.target.files[0].name}`)}
          />
          <Button className="rounded-pill px-4 d-flex align-items-center"
            style={{ backgroundColor: "#fd7e14", borderColor: "#fd7e14" }}
            onClick={handleExportAll}
          >
            <FaFile className="me-2" /> Export
          </Button>
        </div>
      </div>

      <Row className="align-items-center mb-3 g-2">
        <Col md={3}>
          <Form.Select size="sm" defaultValue="10">
            <option value="10">Show 10 entries</option>
            <option value="25">Show 25 entries</option>
            <option value="50">Show 50 entries</option>
          </Form.Select>
        </Col>
        <Col md={{ span: 3, offset: 6 }}>
          <Form.Control 
            size="sm" 
            type="text" 
            placeholder="Search" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>

      <div className="table-responsive">
        <Table bordered hover className="align-middle text-center">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Challan No</th>
              <th>Order No</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDeliveries.map((delivery, idx) => (
              <tr key={delivery.id}>
                <td>{idx + 1}</td>
                <td>{delivery.challanNo}</td>
                <td>{delivery.orderNo}</td>
                <td>{delivery.customer}</td>
                <td>{delivery.date}</td>
                <td>{delivery.items}</td>
                <td className="fw-bold text-success">₹{delivery.amount.toLocaleString('en-IN')}</td>
                <td>{getStatusBadge(delivery.status)}</td>
                <td className="d-flex gap-2 justify-content-center">
                  <button 
                    className="btn btn-sm btn-outline-info"
                    onClick={() => {
                      setSelectedDelivery(delivery);
                      setShowViewModal(true);
                    }}
                  >
                    <FaEye size={16} />
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-warning"
                    onClick={() => {
                      setEditDelivery({...delivery});
                      setShowEditModal(true);
                    }}
                  >
                    <FaEdit size={16} />
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-danger" 
                    onClick={() => handleDelete(delivery.id)}
                  >
                    <FaTrash size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <span className="small text-muted">Showing 1 to {filteredDeliveries.length} of {filteredDeliveries.length} results</span>
        <ul className="pagination pagination-sm mb-0">
          <li className="page-item disabled"><button className="page-link">&laquo;</button></li>
          <li className="page-item active"><button className="page-link" style={{ backgroundColor: '#3daaaa', borderColor: '#3daaaa' }}>1</button></li>
          <li className="page-item"><button className="page-link">2</button></li>
          <li className="page-item"><button className="page-link">&raquo;</button></li>
        </ul>
      </div>

      {/* View Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Delivery Challan Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDelivery && (
            <div className="table-responsive">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td className="fw-bold">Challan No</td>
                    <td>{selectedDelivery.challanNo}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Order No</td>
                    <td>{selectedDelivery.orderNo}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Customer</td>
                    <td>{selectedDelivery.customer}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Date</td>
                    <td>{selectedDelivery.date}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Items</td>
                    <td>{selectedDelivery.items}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Amount</td>
                    <td>₹{selectedDelivery.amount.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Status</td>
                    <td>{getStatusBadge(selectedDelivery.status)}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Delivery Address</td>
                    <td>{selectedDelivery.deliveryAddress}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Contact Person</td>
                    <td>{selectedDelivery.contactPerson}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Contact Phone</td>
                    <td>{selectedDelivery.contactPhone}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Delivery Challan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editDelivery && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Challan No</Form.Label>
                <Form.Control 
                  type="text" 
                  value={editDelivery.challanNo}
                  onChange={(e) => setEditDelivery({...editDelivery, challanNo: e.target.value})}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Order No</Form.Label>
                <Form.Control 
                  type="text" 
                  value={editDelivery.orderNo}
                  onChange={(e) => setEditDelivery({...editDelivery, orderNo: e.target.value})}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Customer</Form.Label>
                <Form.Control 
                  type="text" 
                  value={editDelivery.customer}
                  onChange={(e) => setEditDelivery({...editDelivery, customer: e.target.value})}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control 
                  type="text" 
                  value={editDelivery.date}
                  onChange={(e) => setEditDelivery({...editDelivery, date: e.target.value})}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Items</Form.Label>
                <Form.Control 
                  type="number" 
                  value={editDelivery.items}
                  onChange={(e) => setEditDelivery({...editDelivery, items: parseInt(e.target.value)})}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control 
                  type="number" 
                  value={editDelivery.amount}
                  onChange={(e) => setEditDelivery({...editDelivery, amount: parseFloat(e.target.value)})}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={editDelivery.status}
                  onChange={(e) => setEditDelivery({...editDelivery, status: e.target.value})}
                >
                  <option value="Delivered">Delivered</option>
                  <option value="Pending">Pending</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Delivery Address</Form.Label>
                <Form.Control 
                  type="text" 
                  value={editDelivery.deliveryAddress}
                  onChange={(e) => setEditDelivery({...editDelivery, deliveryAddress: e.target.value})}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contact Person</Form.Label>
                <Form.Control 
                  type="text" 
                  value={editDelivery.contactPerson}
                  onChange={(e) => setEditDelivery({...editDelivery, contactPerson: e.target.value})}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contact Phone</Form.Label>
                <Form.Control 
                  type="text" 
                  value={editDelivery.contactPhone}
                  onChange={(e) => setEditDelivery({...editDelivery, contactPhone: e.target.value})}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={() => handleEditSave(editDelivery)}
            style={{ backgroundColor: '#3daaaa', borderColor: '#3daaaa' }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SalesDelivery;