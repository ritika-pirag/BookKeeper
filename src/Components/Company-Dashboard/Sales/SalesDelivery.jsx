import React, { useState, useRef, useMemo } from 'react';
import { Table, Button, Badge, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { FaEye, FaDownload, FaTrash, FaUpload, FaFile, FaCalendarAlt, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const initialDeliveries = [
  { id: 1, challanNo: 'DC-1001', orderNo: 'SO-2045', customer: 'Client A', date: '20-07-2025', items: 3, status: 'Delivered', amount: 15000 },
  { id: 2, challanNo: 'DC-1002', orderNo: 'SO-2046', customer: 'Client B', date: '21-07-2025', items: 2, status: 'Pending', amount: 25000 },
  { id: 3, challanNo: 'DC-1003', orderNo: 'SO-2047', customer: 'Client C', date: '22-07-2025', items: 5, status: 'Delivered', amount: 35000 },
  { id: 4, challanNo: 'DC-1004', orderNo: 'SO-2048', customer: 'Client A', date: '23-07-2025', items: 1, status: 'Pending', amount: 10000 },
  { id: 5, challanNo: 'DC-1005', orderNo: 'SO-2049', customer: 'Client D', date: '24-07-2025', items: 4, status: 'Delivered', amount: 45000 }
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

  // Get unique customers for filter dropdown
  const uniqueCustomers = [...new Set(initialDeliveries.map(d => d.customer))];

  // Filter and search deliveries
  const filteredDeliveries = useMemo(() => {
    return deliveries.filter(delivery => {
      // Search filter
      const matchesSearch = 
        delivery.challanNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.customer.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      const matchesStatus = statusFilter === 'All' || delivery.status === statusFilter;
      
      // Customer filter
      const matchesCustomer = customerFilter === '' || delivery.customer === customerFilter;
      
      // Date filter
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
      
      // Amount filter
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

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this delivery note?")) {
      setDeliveries(deliveries.filter(delivery => delivery.id !== id));
    }
  };

  const handleExportAll = () => {
    let csv = `Challan No,Order No,Customer,Date,Items,Amount,Status\n`;
    deliveries.forEach(d => {
      csv += `${d.challanNo},${d.orderNo},${d.customer},${d.date},${d.items},${d.amount}, ${d.status}\n`;
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

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setDateFrom('');
    setDateTo('');
    setAmountMin('');
    setAmountMax('');
    setCustomerFilter('');
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

      {/* Filters Section */}
      <div className="bg-light p-3 rounded mb-4">
        <Row className="g-3">
          {/* Search */}
          <Col md={3}>
            <InputGroup>
              <InputGroup.Text><FaSearch /></InputGroup.Text>
              <Form.Control 
                type="text" 
                placeholder="Search Challan/Order/Customer" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
          
          {/* Customer Filter */}
          <Col md={2}>
            <Form.Select 
              value={customerFilter}
              onChange={(e) => setCustomerFilter(e.target.value)}
            >
              <option value="">All Customers</option>
              {uniqueCustomers.map((customer, idx) => (
                <option key={idx} value={customer}>{customer}</option>
              ))}
            </Form.Select>
          </Col>
          
          {/* Status Filter */}
          <Col md={2}>
            <Form.Select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Delivered">Delivered</option>
              <option value="Pending">Pending</option>
            </Form.Select>
          </Col>
          
          {/* Date From */}
          <Col md={2}>
            <InputGroup>
              <InputGroup.Text><FaCalendarAlt /></InputGroup.Text>
              <Form.Control 
                type="date" 
                placeholder="From Date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </InputGroup>
          </Col>
          
          {/* Date To */}
          <Col md={2}>
            <InputGroup>
              <InputGroup.Text><FaCalendarAlt /></InputGroup.Text>
              <Form.Control 
                type="date" 
                placeholder="To Date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </InputGroup>
          </Col>
          
          {/* Clear Filters */}
          <Col md={1}>
            <Button 
              variant="outline-secondary" 
              onClick={clearFilters}
              size="sm"
            >
              Clear
            </Button>
          </Col>
        </Row>
        
        {/* Amount Filters */}
        <Row className="g-3 mt-2">
          <Col md={2}>
            <Form.Control 
              type="number" 
              placeholder="Min Amount"
              value={amountMin}
              onChange={(e) => setAmountMin(e.target.value)}
            />
          </Col>
          <Col md={2}>
            <Form.Control 
              type="number" 
              placeholder="Max Amount"
              value={amountMax}
              onChange={(e) => setAmountMax(e.target.value)}
            />
          </Col>
        </Row>
      </div>

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
              <th>Amount (₹)</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDeliveries.length > 0 ? (
              filteredDeliveries.map((delivery, idx) => (
                <tr key={delivery.id}>
                  <td>{idx + 1}</td>
                  <td><strong>{delivery.challanNo}</strong></td>
                  <td>{delivery.orderNo}</td>
                  <td className="text-start">{delivery.customer}</td>
                  <td>{delivery.date}</td>
                  <td>{delivery.items}</td>
                  <td className="fw-bold">₹{delivery.amount.toLocaleString('en-IN')}</td>
                  <td>{getStatusBadge(delivery.status)}</td>
                  <td className="d-flex gap-2 justify-content-center">
                    <button 
                      className="btn btn-sm btn-outline-info" 
                      onClick={() => navigate('/company/deliveryview')}
                      title="View Details"
                    >
                      <FaEye size={16} />
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-warning" 
                      onClick={() => handleDownload(delivery)}
                      title="Download"
                    >
                      <FaDownload size={16} />
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger" 
                      onClick={() => handleDelete(delivery.id)}
                      title="Delete"
                    >
                      <FaTrash size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  No delivery challans found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <span className="small text-muted">
          Showing 1 to {filteredDeliveries.length} of {filteredDeliveries.length} results
        </span>
        <ul className="pagination pagination-sm mb-0">
          <li className="page-item disabled"><button className="page-link">&laquo;</button></li>
          <li className="page-item active"><button className="page-link" style={{ backgroundColor: '#3daaaa', borderColor: '#3daaaa' }}>1</button></li>
          <li className="page-item"><button className="page-link">2</button></li>
          <li className="page-item"><button className="page-link">&raquo;</button></li>
        </ul>
      </div>
    </div>
  );
};

export default SalesDelivery;