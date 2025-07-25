import React, { useState, useRef, useMemo } from 'react'; // Added useMemo
import { FaEye, FaDownload, FaTrash, FaUpload, FaFile } from 'react-icons/fa';
import { Table, Button, Badge, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const initialOrders = [
  { id: 1, orderNo: 2045, vendor: "Client A", date: "15-07-2025", amount: "$ 110.90", status: "Paid" },
  { id: 2, orderNo: 2044, vendor: "Client B", date: "14-07-2025", amount: "$ 500.00", status: "Partial" },
  { id: 3, orderNo: 2043, vendor: "Client C", date: "13-07-2025", amount: "$ 325.00", status: "Paid" },
  { id: 4, orderNo: 2042, vendor: "Client D", date: "12-07-2025", amount: "$ 275.00", status: "Unpaid" },
];

const getStatusBadge = (status) => {
  if (status === 'Paid') return <Badge bg="success">Paid</Badge>;
  if (status === 'Partial') return <Badge bg="info">Partial</Badge>;
  if (status === 'Unpaid') return <Badge bg="danger">Unpaid</Badge>;
  return <Badge bg="secondary">{status}</Badge>;
};

const SalesOrder = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [filterDate, setFilterDate] = useState(""); // State for date filter
  const [filterAmount, setFilterAmount] = useState(""); // State for amount filter
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const navigate = useNavigate();
  const fileInputRef = useRef();

  // Filter and search logic
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      // Date filter (assuming date format in data is DD-MM-YYYY)
      const matchesDate = filterDate ? order.date === filterDate : true;

      // Amount filter (convert amount string to number for comparison)
      const orderAmount = parseFloat(order.amount.replace('$', '').replace(' ', '')) || 0;
      const filterAmountValue = parseFloat(filterAmount) || 0;
      const matchesAmount = filterAmount ? orderAmount === filterAmountValue : true;

      // Search term filter (search in vendor, orderNo, date, amount, status)
      const lowerSearchTerm = searchTerm.toLowerCase();
      const matchesSearch = searchTerm ?
        order.vendor.toLowerCase().includes(lowerSearchTerm) ||
        order.orderNo.toString().includes(searchTerm) ||
        order.date.includes(searchTerm) ||
        order.amount.replace('$', '').replace(' ', '').includes(searchTerm) ||
        order.status.toLowerCase().includes(lowerSearchTerm)
        : true;

      return matchesDate && matchesAmount && matchesSearch;
    });
  }, [orders, filterDate, filterAmount, searchTerm]); // Recalculate when these change

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders(orders.filter(order => order.id !== id));
    }
  };

  const handleDownloadBlankClients = () => {
    const blankOrders = orders.filter(order => !order.vendor);
    if (blankOrders.length === 0) {
      alert("No blank client data to download.");
      return;
    }
    let csv = `Order No,Customer,Date,Amount,Status\n`; // Changed Client to Customer
    blankOrders.forEach(order => {
      csv += `${order.orderNo},-,${order.date},${order.amount},${order.status}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "Blank-Customer-Sales.csv"; // Updated filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportAll = () => {
    let csv = `Order No,Customer,Date,Amount,Status\n`; // Changed Client to Customer
    filteredOrders.forEach(order => { // Export only filtered data
      csv += `${order.orderNo},${order.vendor || '-'},${order.date},${order.amount},${order.status}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "Filtered-Sales.csv"; // Updated filename to reflect filtering
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
    alert(`Imported file: ${file.name}`);
    e.target.value = null;
  };

  const handleDownload = (order) => {
    // Changed Client to Customer in CSV header
    const csvContent = `Order No,Customer,Date,Amount,Status\n${order.orderNo},${order.vendor || '-'},${order.date},${order.amount},${order.status}`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Sales-${order.orderNo}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Function to clear filters
  const clearFilters = () => {
    setFilterDate("");
    setFilterAmount("");
    setSearchTerm(""); // Also clear search term
  };

  return (
    <div className="p-4 my-4 px-4">
      {/* Header */}
      <div className="mb-3 d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div><h5 className="mb-0">Sales Orders</h5></div>

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

          <Button className="rounded-pill px-4 d-flex align-items-center"
            style={{ backgroundColor: "#fd7e14", borderColor: "#fd7e14" }}
            onClick={handleExportAll}>
            <FaFile size={18} className="me-2" /> Export
          </Button>

          <Button
            className="rounded-pill px-4 d-flex align-items-center"
            style={{ backgroundColor: '#ffc107', borderColor: '#ffc107' }}
            onClick={handleDownloadBlankClients}
          >
            <FaDownload size={18} className="me-2" /> Download
          </Button>
        </div>
      </div>

      {/* Filter + Search */}
      <Row className="align-items-center mb-3 g-2">
        {/* Date Filter */}
        <Col xs={12} md={3}>
          <Form.Control
            size="sm"
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            placeholder="Filter by Date"
          />
        </Col>

        {/* Amount Filter */}
        <Col xs={12} md={3}>
          <Form.Control
            size="sm"
            type="number"
            value={filterAmount}
            onChange={(e) => setFilterAmount(e.target.value)}
            placeholder="Filter by Amount"
            min="0"
            step="0.01"
          />
        </Col>



        {/* Search and Clear Filters */}
        <Col xs={12} md={3} className="d-flex gap-2">
          <Form.Control
            size="sm"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline-secondary" size="sm" onClick={clearFilters}>
            Clear
          </Button>
        </Col>
      </Row>

      {/* Orders Table */}
      <div className="table-responsive">
        <Table bordered hover className="align-middle text-center">
          <thead className="table-light">
            <tr>
              <th>No</th>
              <th>Invoice No</th>
              {/* Changed Client to Customer */}
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Use filteredOrders instead of orders */}
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <tr key={order.id}>
                  <td>{index + 1}</td>
                  <td>{order.orderNo}</td>
                  {/* Changed Client to Customer */}
                  <td>{order.vendor || '-'}</td>
                  <td>{order.date}</td>
                  <td>{order.amount}</td>
                  <td>{getStatusBadge(order.status)}</td>
                  <td className="d-flex gap-2 justify-content-center">
                    <button className="btn outline-info btn-sm py-1 px-1 text-info" onClick={() => navigate('/company/salesview')}>
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
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No sales orders found matching the filters or search.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mt-3 gap-2">
        {/* Update count based on filtered results */}
        <span className="small text-muted">
          Showing 1 to {filteredOrders.length} of {filteredOrders.length} results
        </span>
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

export default SalesOrder;