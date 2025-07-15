import React from 'react';
import { Row, Col, Card, Table, Button, Badge, Form } from 'react-bootstrap';
import { FaEye, FaDownload, FaTrash } from 'react-icons/fa';

const orders = [
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
  return (
    <div className="container my-4">
      <Card className="bg-white shadow-sm rounded-3 p-3">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <h5 className="fw-semibold mb-0">Purchase Orders</h5>
          <Badge pill bg="warning" className="text-dark">
            Recent Orders
          </Badge>
        </div>

        {/* Filters */}
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
          <Table hover responsive bordered className="align-middle text-center mb-0">
            <thead className="table-light">
              <tr>
                <th className="py-3">No</th>
                <th className="py-3">Order</th>
                <th className="py-3">Supplier</th>
                <th className="py-3">Date</th>
                <th className="py-3">Amount</th>
                <th className="py-3">Status</th>
                <th className="py-3">Actions</th>
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
                  <td>
                    <div className="d-flex justify-content-center gap-2 flex-wrap">
                      <Button variant="outline-primary" size="sm"><FaEye /></Button>
                      <Button variant="outline-success" size="sm"><FaDownload /></Button>
                      <Button variant="outline-danger" size="sm"><FaTrash /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mt-3 px-2 gap-2">
          <span className="small text-muted">
            Showing 1 to {orders.length} of {orders.length} entries
          </span>
          <nav>
            <ul className="pagination pagination-sm mb-0 flex-wrap">
              <li className="page-item disabled">
                <button className="page-link rounded-start">&laquo;</button>
              </li>
              <li className="page-item active">
                <button
                  className="page-link"
                  style={{ backgroundColor: '#3daaaa', borderColor: '#3daaaa' }}
                >
                  1
                </button>
              </li>
              <li className="page-item"><button className="page-link">2</button></li>
              <li className="page-item">
                <button className="page-link rounded-end">&raquo;</button>
              </li>
            </ul>
          </nav>
        </div>
      </Card>
    </div>
  );
};

export default PurchaseOrders;
