// Payments.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, Tab, Nav, Table, Badge, Form, Alert } from 'react-bootstrap';

const initialPayments = [
  { id: 'TXN-23456', date: 'Jun 27, 2025', customer: 'John Smith', method: 'Credit Card', amount: 1299.99, status: 'Success' },
  { id: 'TXN-23455', date: 'Jun 27, 2025', customer: 'Emily Johnson', method: 'PayPal', amount: 499.50, status: 'Success' },
  { id: 'TXN-23454', date: 'Jun 26, 2025', customer: 'Michael Brown', method: 'Credit Card', amount: 899.00, status: 'Failed', reason: 'Insufficient funds' },
  { id: 'TXN-23453', date: 'Jun 26, 2025', customer: 'Sarah Williams', method: 'Bank Transfer', amount: 149.99, status: 'Success' },
  { id: 'TXN-23452', date: 'Jun 25, 2025', customer: 'David Miller', method: 'Credit Card', amount: 2499.00, status: 'Pending' },
  { id: 'TXN-23451', date: 'Jun 25, 2025', customer: 'Jessica Davis', method: 'Digital Wallet', amount: 349.95, status: 'Success' },
  { id: 'TXN-23450', date: 'Jun 24, 2025', customer: 'Robert Wilson', method: 'Credit Card', amount: 799.50, status: 'Failed', reason: 'Expired card' },
];

const paymentMethods = [
  { id: 'credit_card', name: 'Credit Card', enabled: true, processingFee: 2.5 },
  { id: 'paypal', name: 'PayPal', enabled: true, processingFee: 3.0 },
  { id: 'bank_transfer', name: 'Bank Transfer', enabled: false, processingFee: 1.0 },
  { id: 'digital_wallet', name: 'Digital Wallet', enabled: true, processingFee: 2.0 },
];

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [viewData, setViewData] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [methods, setMethods] = useState(paymentMethods);
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const savedData = localStorage.getItem('payments');
    if (savedData) setPayments(JSON.parse(savedData));
    else setPayments(initialPayments);
    
    const savedMethods = localStorage.getItem('paymentMethods');
    if (savedMethods) setMethods(JSON.parse(savedMethods));
  }, []);

  useEffect(() => {
    localStorage.setItem('payments', JSON.stringify(payments));
    localStorage.setItem('paymentMethods', JSON.stringify(methods));
  }, [payments, methods]);

  const handleDelete = (id) => {
    const updated = payments.filter((p) => p.id !== id);
    setPayments(updated);
  };

  const handleMethodToggle = (id) => {
    const updated = methods.map(method => 
      method.id === id ? { ...method, enabled: !method.enabled } : method
    );
    setMethods(updated);
  };

  const handleFeeChange = (id, fee) => {
    const updated = methods.map(method => 
      method.id === id ? { ...method, processingFee: parseFloat(fee) || 0 } : method
    );
    setMethods(updated);
  };

  const saveSettings = () => {
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const filteredPayments = payments.filter((p) =>
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const failedPayments = payments.filter(p => p.status === 'Failed');

  const getStatusBadge = (status, reason) => {
    switch (status) {
      case 'Success': return <Badge bg="success">Success</Badge>;
      case 'Pending': return <Badge bg="warning">Pending</Badge>;
      case 'Failed': return <Badge bg="danger">Failed<br/><small>{reason}</small></Badge>;
      default: return null;
    }
  };

  const calculateFailedStats = () => {
    const totalFailed = failedPayments.length;
    const totalAmount = failedPayments.reduce((sum, p) => sum + p.amount, 0);
    const commonReason = failedPayments.reduce((acc, p) => {
      acc[p.reason] = (acc[p.reason] || 0) + 1;
      return acc;
    }, {});
    const mostCommonReason = Object.keys(commonReason).length > 0 
      ? Object.entries(commonReason).sort((a, b) => b[1] - a[1])[0][0]
      : 'N/A';
    
    return { totalFailed, totalAmount, mostCommonReason };
  };

  const failedStats = calculateFailedStats();

  // Responsive table columns handler
  const responsiveTableColumns = {
    all: {
      xs: ['id', 'customer', 'amount', 'status'],
      sm: ['id', 'date', 'customer', 'amount', 'status'],
      md: ['id', 'date', 'customer', 'method', 'amount', 'status', 'actions']
    },
    failed: {
      xs: ['id', 'amount', 'reason'],
      sm: ['id', 'customer', 'amount', 'reason'],
      md: ['id', 'date', 'customer', 'amount', 'reason', 'actions']
    }
  };

  const shouldShowColumn = (column, tab) => {
    if (window.innerWidth < 576) { // xs
      return responsiveTableColumns[tab]?.xs.includes(column);
    } else if (window.innerWidth < 768) { // sm
      return responsiveTableColumns[tab]?.sm.includes(column);
    } else { // md and up
      return true;
    }
  };

  return (
    <div className="container-fluid mt-3 px-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold mb-0">Payments</h4>
          <p className="text-muted small mb-0 d-none d-sm-block">Manage all your payment transactions</p>
        </div>
        <div className="d-sm-none">
          <Form.Select 
            size="sm" 
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option value="all">All Payments</option>
            <option value="failed">Failed</option>
            <option value="settings">Settings</option>
          </Form.Select>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-4">
          <div className="p-3 bg-white rounded shadow-sm h-100">
            <p className="small mb-1">Total Revenue</p>
            <h5 className="mb-0">$12,345.67</h5>
            <small className="text-success">↑ 12.5% from last month</small>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-4">
          <div className="p-3 bg-white rounded shadow-sm h-100">
            <p className="small mb-1">Success Rate</p>
            <h5 className="mb-0">94.2%</h5>
            <small className="text-success">↑ 2.1% from last month</small>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-4">
          <div className="p-3 bg-white rounded shadow-sm h-100">
            <p className="small mb-1">Failed Transactions</p>
            <h5 className="mb-0 text-danger">24</h5>
            <small className="text-danger">↓ 5.3% from last month</small>
          </div>
        </div>
      </div>

      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <Nav variant="tabs" className="d-none d-sm-flex">
          <Nav.Item><Nav.Link eventKey="all">All Payments</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="failed">Failed Transactions</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="settings">Payment Settings</Nav.Link></Nav.Item>
        </Nav>

        <Tab.Content className="mt-3">
          <Tab.Pane eventKey="all">
            <Form.Control
              type="text"
              placeholder="Search by transaction ID or customer name"
              className="mb-3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="table-responsive">
              <Table bordered hover className="mb-0">
                <thead className="d-none d-md-table-header-group">
                  <tr>
                    {shouldShowColumn('id', 'all') && <th>Transaction ID</th>}
                    {shouldShowColumn('date', 'all') && <th>Date</th>}
                    {shouldShowColumn('customer', 'all') && <th>Customer</th>}
                    {shouldShowColumn('method', 'all') && <th>Payment Method</th>}
                    {shouldShowColumn('amount', 'all') && <th>Amount</th>}
                    {shouldShowColumn('status', 'all') && <th>Status</th>}
                    {shouldShowColumn('actions', 'all') && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((p) => (
                    <tr key={p.id}>
                      {shouldShowColumn('id', 'all') && (
                        <td data-label="Transaction ID">
                          {p.id}
                          {window.innerWidth < 768 && (
                            <div className="small text-muted">{p.date}</div>
                          )}
                        </td>
                      )}
                      {shouldShowColumn('date', 'all') && window.innerWidth >= 768 && (
                        <td data-label="Date">{p.date}</td>
                      )}
                      {shouldShowColumn('customer', 'all') && (
                        <td data-label="Customer">{p.customer}</td>
                      )}
                      {shouldShowColumn('method', 'all') && (
                        <td data-label="Method">{p.method}</td>
                      )}
                      {shouldShowColumn('amount', 'all') && (
                        <td data-label="Amount">${p.amount.toFixed(2)}</td>
                      )}
                      {shouldShowColumn('status', 'all') && (
                        <td data-label="Status">{getStatusBadge(p.status, p.reason)}</td>
                      )}
                      {shouldShowColumn('actions', 'all') && (
                        <td data-label="Actions" className="text-nowrap">
                          <Button size="sm" variant="link" className="p-0 me-2" onClick={() => { setViewData(p); setShowViewModal(true); }}>
                            <i className="bi bi-eye" />
                          </Button>
                          <Button size="sm" variant="link" className="p-0" onClick={() => handleDelete(p.id)}>
                            <i className="bi bi-trash text-danger" />
                          </Button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            {filteredPayments.length === 0 && (
              <Alert variant="info" className="mt-3">No payments found matching your search.</Alert>
            )}
          </Tab.Pane>

          <Tab.Pane eventKey="failed">
            {failedPayments.length > 0 ? (
              <>
                <div className="row g-3 mb-4">
                  <div className="col-12 col-md-4">
                    <div className="p-3 bg-white rounded shadow-sm h-100">
                      <h6 className="small">Total Failed Transactions</h6>
                      <h3 className="text-danger">{failedStats.totalFailed}</h3>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="p-3 bg-white rounded shadow-sm h-100">
                      <h6 className="small">Total Amount</h6>
                      <h3 className="text-danger">${failedStats.totalAmount.toFixed(2)}</h3>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="p-3 bg-white rounded shadow-sm h-100">
                      <h6 className="small">Most Common Reason</h6>
                      <h3>{failedStats.mostCommonReason}</h3>
                    </div>
                  </div>
                </div>

                <div className="table-responsive">
                  <Table bordered hover className="mb-0">
                    <thead className="d-none d-md-table-header-group">
                      <tr>
                        {shouldShowColumn('id', 'failed') && <th>Transaction ID</th>}
                        {shouldShowColumn('date', 'failed') && <th>Date</th>}
                        {shouldShowColumn('customer', 'failed') && <th>Customer</th>}
                        {shouldShowColumn('amount', 'failed') && <th>Amount</th>}
                        {shouldShowColumn('reason', 'failed') && <th>Reason</th>}
                        {shouldShowColumn('actions', 'failed') && <th>Actions</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {failedPayments.map((p) => (
                        <tr key={p.id}>
                          {shouldShowColumn('id', 'failed') && (
                            <td data-label="Transaction ID">
                              {p.id}
                              {window.innerWidth < 768 && (
                                <div className="small text-muted">{p.customer}</div>
                              )}
                            </td>
                          )}
                          {shouldShowColumn('date', 'failed') && window.innerWidth >= 768 && (
                            <td data-label="Date">{p.date}</td>
                          )}
                          {shouldShowColumn('customer', 'failed') && window.innerWidth >= 768 && (
                            <td data-label="Customer">{p.customer}</td>
                          )}
                          {shouldShowColumn('amount', 'failed') && (
                            <td data-label="Amount">${p.amount.toFixed(2)}</td>
                          )}
                          {shouldShowColumn('reason', 'failed') && (
                            <td data-label="Reason">{p.reason}</td>
                          )}
                          {shouldShowColumn('actions', 'failed') && (
                            <td data-label="Actions" className="text-nowrap">
                              <Button size="sm" variant="link" className="p-0 me-2" onClick={() => { setViewData(p); setShowViewModal(true); }}>
                                <i className="bi bi-eye" />
                              </Button>
                              <Button size="sm" variant="link" className="p-0" onClick={() => handleDelete(p.id)}>
                                <i className="bi bi-trash text-danger" />
                              </Button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </>
            ) : (
              <Alert variant="info">No failed transactions found.</Alert>
            )}
          </Tab.Pane>

          <Tab.Pane eventKey="settings">
            {settingsSaved && (
              <Alert variant="success" onClose={() => setSettingsSaved(false)} dismissible>
                Payment settings saved successfully!
              </Alert>
            )}
            
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">Payment Methods</h5>
                <p className="text-muted small mb-0">Enable/disable available payment methods</p>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <Table bordered className="mb-0">
                    <thead>
                      <tr>
                        <th>Method</th>
                        <th style={{ width: '120px' }}>Status</th>
                        <th style={{ width: '150px' }}>Processing Fee (%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {methods.map((method) => (
                        <tr key={method.id}>
                          <td>{method.name}</td>
                          <td>
                            <Form.Check 
                              type="switch"
                              id={`enable-${method.id}`}
                              checked={method.enabled}
                              onChange={() => handleMethodToggle(method.id)}
                              label={method.enabled ? 'Enabled' : 'Disabled'}
                              className="d-flex align-items-center"
                            />
                          </td>
                          <td>
                            <Form.Control
                              type="number"
                              value={method.processingFee}
                              onChange={(e) => handleFeeChange(method.id, e.target.value)}
                              disabled={!method.enabled}
                              min="0"
                              step="0.1"
                              size="sm"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Payment Gateway Settings</h5>
              </div>
              <div className="card-body">
                <Form>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <Form.Label>Default Currency</Form.Label>
                      <Form.Select size="sm">
                        <option>USD - US Dollar</option>
                        <option>EUR - Euro</option>
                        <option>GBP - British Pound</option>
                        <option>JPY - Japanese Yen</option>
                      </Form.Select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <Form.Label>Payment Timeout</Form.Label>
                      <Form.Select size="sm">
                        <option>15 minutes</option>
                        <option>30 minutes</option>
                        <option>1 hour</option>
                        <option>2 hours</option>
                      </Form.Select>
                    </div>

                    <div className="col-12 mb-3">
                      <Form.Label>Refund Policy</Form.Label>
                      <Form.Control as="textarea" rows={3} placeholder="Enter your refund policy details" size="sm" />
                    </div>

                    <div className="col-12">
                      <Button variant="primary" size="sm" onClick={saveSettings}>
                        Save Settings
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>

      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewData && (
            <ul className="list-unstyled">
              <li className="mb-2"><strong>ID:</strong> {viewData.id}</li>
              <li className="mb-2"><strong>Date:</strong> {viewData.date}</li>
              <li className="mb-2"><strong>Customer:</strong> {viewData.customer}</li>
              <li className="mb-2"><strong>Method:</strong> {viewData.method}</li>
              <li className="mb-2"><strong>Amount:</strong> ${viewData.amount.toFixed(2)}</li>
              <li className="mb-2"><strong>Status:</strong> {viewData.status}</li>
              {viewData.reason && <li className="mb-2"><strong>Reason:</strong> {viewData.reason}</li>}
            </ul>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Payment;