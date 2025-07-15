import React, { useState } from 'react';
import { Table, Button, Badge, Form, Row, Col } from 'react-bootstrap';
import { FaEye, FaDownload, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const initialOrders = [
  { id: 1, orderNo: 1045, supplier: "Haroun Spiers", date: "15-07-2025", amount: "$ 10.90", status: "Paid" },
  { id: 2, orderNo: 1044, supplier: "", date: "15-07-2025", amount: "$ 325.00", status: "Paid" },
  { id: 3, orderNo: 1043, supplier: "Maureen Dotson", date: "12-07-2025", amount: "$ 75.00", status: "Paid" },
  { id: 4, orderNo: 1042, supplier: "", date: "11-07-2025", amount: "$ 247.00", status: "Partial" },
  { id: 5, orderNo: 1041, supplier: "", date: "09-07-2025", amount: "$ 100.00", status: "Partial" },
];

const getStatusBadge = (status) => {
  if (status === 'Paid') return <Badge bg="success">Paid</Badge>;
  if (status === 'Partial') return <Badge bg="info">Partial</Badge>;
  return <Badge bg="secondary">{status}</Badge>;
};

const PurchaseOrders = () => {
  const [orders, setOrders] = useState(initialOrders); // ✅ useState to update rows
  const navigate = useNavigate();

  // ✅ Handle Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders(orders.filter(order => order.id !== id));
    }
  };

  // ✅ Handle Download (simulate CSV)
  const handleDownload = (order) => {
    const csvContent = `Order No,Supplier,Date,Amount,Status\n${order.orderNo},${order.supplier || '-'},${order.date},${order.amount},${order.status}`;
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

  return (
    <div className="container my-4">
      <h5 className="mb-3">Purchase Orders</h5>

      {/* Filters Row */}
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

      {/* Table */}
      <div className="table-responsive">
        <Table bordered hover className="align-middle text-center">
          <thead className="table-light">
            <tr>
              <th>No</th>
              <th>Order</th>
              <th>Supplier</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Settings</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.orderNo}</td>
                <td>{order.supplier || '-'}</td>
                <td>{order.date}</td>
                <td>{order.amount}</td>
                <td>{getStatusBadge(order.status)}</td>
                <td className="d-flex justify-content-center flex-wrap gap-1">
                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => navigate('/company/purchaseview')}
                  >
                    <FaEye className="me-1" />
                  </Button>
                  <Button
                    size="sm"
                    variant="info"
                    onClick={() => handleDownload(order)}
                  >
                    <FaDownload />
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(order.id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3 gap-2">
        <span className="text-muted">
          Showing 1 to {orders.length} of {orders.length} entries
        </span>
        <div>
          <Button size="sm" variant="light" className="me-1" disabled>
            Previous
          </Button>
          <Button size="sm" variant="primary" active>
            1
          </Button>
          <Button size="sm" variant="light" className="ms-1" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrders;
