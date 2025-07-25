import React, { useState, useRef, useMemo } from 'react';
import { Table, Button, Badge, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { FaEye, FaDownload, FaTrash, FaUpload, FaFile, FaCalendarAlt, FaSearch, FaRedo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const initialReturns = [
  { 
    id: 1, 
    returnNo: 'SR-1001', 
    invoiceNo: 'INV-2045', 
    customer: 'Client A', 
    date: '20-07-2025', 
    items: 2, 
    status: 'Processed', 
    amount: 15000,
    returnType: 'Sales Return',
    reason: 'Defective Product'
  },
  { 
    id: 2, 
    returnNo: 'SR-1002', 
    invoiceNo: 'INV-2046', 
    customer: 'Client B', 
    date: '21-07-2025', 
    items: 1, 
    status: 'Pending', 
    amount: 8000,
    returnType: 'Credit Note',
    reason: 'Wrong Item'
  },
  { 
    id: 3, 
    returnNo: 'SR-1003', 
    invoiceNo: 'INV-2047', 
    customer: 'Client C', 
    date: '22-07-2025', 
    items: 3, 
    status: 'Approved', 
    amount: 22000,
    returnType: 'Sales Return',
    reason: 'Quality Issue'
  },
  { 
    id: 4, 
    returnNo: 'SR-1004', 
    invoiceNo: 'INV-2048', 
    customer: 'Client A', 
    date: '23-07-2025', 
    items: 1, 
    status: 'Rejected', 
    amount: 5000,
    returnType: 'Credit Note',
    reason: 'No Issue Found'
  },
  { 
    id: 5, 
    returnNo: 'SR-1005', 
    invoiceNo: 'INV-2049', 
    customer: 'Client D', 
    date: '24-07-2025', 
    items: 2, 
    status: 'Processed', 
    amount: 12000,
    returnType: 'Sales Return',
    reason: 'Damaged in Transit'
  }
];

const getStatusBadge = (status) => {
  switch(status) {
    case 'Processed':
      return <Badge bg="success">Processed</Badge>;
    case 'Pending':
      return <Badge bg="warning" text="dark">Pending</Badge>;
    case 'Approved':
      return <Badge bg="info">Approved</Badge>;
    case 'Rejected':
      return <Badge bg="danger">Rejected</Badge>;
    default:
      return <Badge bg="secondary">{status}</Badge>;
  }
};

const getReturnTypeBadge = (returnType) => {
  if (returnType === 'Sales Return') return <Badge bg="primary">Sales Return</Badge>;
  if (returnType === 'Credit Note') return <Badge bg="secondary">Credit Note</Badge>;
  return <Badge bg="light" text="dark">{returnType}</Badge>;
};

const SalesReturn = () => {
  const [returns, setReturns] = useState(initialReturns);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [returnTypeFilter, setReturnTypeFilter] = useState('All');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [amountMin, setAmountMin] = useState('');
  const [amountMax, setAmountMax] = useState('');
  const [customerFilter, setCustomerFilter] = useState('');
  
  const navigate = useNavigate();
  const fileInputRef = useRef();

  // Get unique customers for filter dropdown
  const uniqueCustomers = [...new Set(initialReturns.map(r => r.customer))];
  // Get unique return types
  const uniqueReturnTypes = [...new Set(initialReturns.map(r => r.returnType))];

  // Filter and search returns
  const filteredReturns = useMemo(() => {
    return returns.filter(returnItem => {
      // Search filter
      const matchesSearch = 
        returnItem.returnNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        returnItem.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        returnItem.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        returnItem.reason.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      const matchesStatus = statusFilter === 'All' || returnItem.status === statusFilter;
      
      // Return Type filter
      const matchesReturnType = returnTypeFilter === 'All' || returnItem.returnType === returnTypeFilter;
      
      // Customer filter
      const matchesCustomer = customerFilter === '' || returnItem.customer === customerFilter;
      
      // Date filter
      let matchesDate = true;
      if (dateFrom && dateTo) {
        const returnDate = new Date(returnItem.date.split('-').reverse().join('-'));
        const fromDate = new Date(dateFrom);
        const toDate = new Date(dateTo);
        matchesDate = returnDate >= fromDate && returnDate <= toDate;
      } else if (dateFrom) {
        const returnDate = new Date(returnItem.date.split('-').reverse().join('-'));
        const fromDate = new Date(dateFrom);
        matchesDate = returnDate >= fromDate;
      } else if (dateTo) {
        const returnDate = new Date(returnItem.date.split('-').reverse().join('-'));
        const toDate = new Date(dateTo);
        matchesDate = returnDate <= toDate;
      }
      
      // Amount filter
      let matchesAmount = true;
      if (amountMin && amountMax) {
        matchesAmount = returnItem.amount >= parseFloat(amountMin) && returnItem.amount <= parseFloat(amountMax);
      } else if (amountMin) {
        matchesAmount = returnItem.amount >= parseFloat(amountMin);
      } else if (amountMax) {
        matchesAmount = returnItem.amount <= parseFloat(amountMax);
      }
      
      return matchesSearch && matchesStatus && matchesReturnType && matchesCustomer && matchesDate && matchesAmount;
    });
  }, [returns, searchTerm, statusFilter, returnTypeFilter, customerFilter, dateFrom, dateTo, amountMin, amountMax]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this sales return?")) {
      setReturns(returns.filter(returnItem => returnItem.id !== id));
    }
  };

  const handleExportAll = () => {
    let csv = `Return No,Invoice No,Customer,Date,Items,Amount,Status,Return Type,Reason\n`;
    returns.forEach(r => {
      csv += `"${r.returnNo}","${r.invoiceNo}","${r.customer}","${r.date}",${r.items},${r.amount},"${r.status}","${r.returnType}","${r.reason}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "All-Sales-Returns.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownload = (returnItem) => {
    const csv = `Return No,Invoice No,Customer,Date,Items,Amount,Status,Return Type,Reason\n"${returnItem.returnNo}","${returnItem.invoiceNo}","${returnItem.customer}","${returnItem.date}",${returnItem.items},${returnItem.amount},"${returnItem.status}","${returnItem.returnType}","${returnItem.reason}"`;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${returnItem.returnNo}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setReturnTypeFilter('All');
    setDateFrom('');
    setDateTo('');
    setAmountMin('');
    setAmountMax('');
    setCustomerFilter('');
  };

  return (
    <div className="p-4 my-4 px-4">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
        <div>
          <h5 className="mb-0">Sales Returns</h5>
          <p className="text-muted small mb-0">Manage customer returns and credit notes</p>
        </div>

        <div className="d-flex gap-2">
          <Button 
            className="rounded-pill px-4 d-flex align-items-center"
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
          <Button 
            className="rounded-pill px-4 d-flex align-items-center"
            style={{ backgroundColor: "#fd7e14", borderColor: "#fd7e14" }}
            onClick={handleExportAll}
          >
            <FaFile className="me-2" /> Export
          </Button>
          <Button 
            className="rounded-pill px-4 d-flex align-items-center"
            style={{ backgroundColor: "#3daaaa", borderColor: "#3daaaa" }}
            onClick={() => navigate('/company/create-sales-return')}
          >
            {/* <FaRedo className="me-2" /> */}
             New Return
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
                placeholder="Search Return/Invoice/Customer" 
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
              <option value="Processed">Processed</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </Form.Select>
          </Col>
          
          {/* Return Type Filter */}
          <Col md={2}>
            <Form.Select 
              value={returnTypeFilter}
              onChange={(e) => setReturnTypeFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              {uniqueReturnTypes.map((type, idx) => (
                <option key={idx} value={type}>{type}</option>
              ))}
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
        
        {/* Additional Filters */}
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
        </Row>
      </div>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card border-primary">
            <div className="card-body">
              <h6 className="card-title text-muted">Total Returns</h6>
              <h4 className="text-primary">{returns.length}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-success">
            <div className="card-body">
              <h6 className="card-title text-muted">Processed</h6>
              <h4 className="text-success">
                {returns.filter(r => r.status === 'Processed').length}
              </h4>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-warning">
            <div className="card-body">
              <h6 className="card-title text-muted">Pending</h6>
              <h4 className="text-warning">
                {returns.filter(r => r.status === 'Pending').length}
              </h4>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-danger">
            <div className="card-body">
              <h6 className="card-title text-muted">Total Value</h6>
              <h4 className="text-danger">
                ₹ {returns.reduce((sum, returnItem) => sum + returnItem.amount, 0).toLocaleString('en-IN')}
              </h4>
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <Table bordered hover className="align-middle">
          <thead className="table-light">
            <tr>
              <th className="text-center">#</th>
              <th>Return No</th>
              <th>Invoice No</th>
              <th>Customer</th>
              <th>Date</th>
              <th className="text-center">Items</th>
              <th>Amount (₹)</th>
              <th>Return Type</th>
              <th>Reason</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredReturns.length > 0 ? (
              filteredReturns.map((returnItem, idx) => (
                <tr key={returnItem.id}>
                  <td className="text-center">{idx + 1}</td>
                  <td><strong>{returnItem.returnNo}</strong></td>
                  <td>{returnItem.invoiceNo}</td>
                  <td>{returnItem.customer}</td>
                  <td>{returnItem.date}</td>
                  <td className="text-center">{returnItem.items}</td>
                  <td className="fw-bold text-danger">₹{returnItem.amount.toLocaleString('en-IN')}</td>
                  <td>{getReturnTypeBadge(returnItem.returnType)}</td>
                  <td className="small">{returnItem.reason}</td>
                  <td>{getStatusBadge(returnItem.status)}</td>
                  <td className="d-flex gap-2 justify-content-center">
                    <button 
                      className="btn btn-sm btn-outline-info" 
                      onClick={() => navigate('/company/salesreturnview')}
                      title="View Details"
                    >
                      <FaEye size={14} />
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-success" 
                      onClick={() => handleDownload(returnItem)}
                      title="Download"
                    >
                      <FaDownload size={14} />
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger" 
                      onClick={() => handleDelete(returnItem.id)}
                      title="Delete"
                    >
                      <FaTrash size={14} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="text-center py-4">
                  No sales returns found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <span className="small text-muted">
          Showing 1 to {filteredReturns.length} of {filteredReturns.length} results
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

export default SalesReturn;