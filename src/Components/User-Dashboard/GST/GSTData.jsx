import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEye, FaEdit, FaTrash, FaArrowDown, FaArrowUp, FaRupeeSign } from 'react-icons/fa';
import { Modal, Button, Form, Badge } from 'react-bootstrap';

const summaryData = [
  {
    label: 'Total Tax Liability',
    value: '₹45,000',
    icon: <FaRupeeSign size={28} className="text-secondary" />,
  },
  {
    label: 'Input Tax Credit',
    value: '₹32,500',
    icon: <FaArrowDown size={28} className="text-primary" />,
  },
  {
    label: 'Next Tax Payable',
    value: '₹12,500',
    icon: <FaArrowUp size={28} className="text-info" />,
  },
  {
    label: 'Pending Returns',
    value: '3',
    icon: <FaArrowUp size={28} className="text-warning" />,
  },
];

const returns = [
  {
    period: 'June 2025',
    type: 'GSTR-1',
    due: '2025-07-11',
    value: '₹185,000',
    igst: '₹0',
    cgst: '₹16,650',
    sgst: '₹16,650',
    status: 'Not Filed',
  },
  {
    period: 'June 2025',
    type: 'GSTR-2A',
    due: '2025-07-15',
    value: '₹135,000',
    igst: '₹0',
    cgst: '₹12,150',
    sgst: '₹12,150',
    status: 'Not Filed',
  },
  {
    period: 'June 2025',
    type: 'GSTR-3B',
    due: '2025-07-20',
    value: '₹185,000',
    igst: '₹0',
    cgst: '₹16,650',
    sgst: '₹16,650',
    status: 'Not Filed',
  },
];

const GSTData = () => {
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState(null);

  const handleAction = (action, item) => {
    setSelectedReturn(item);
    if (action === 'view') setShowView(true);
    if (action === 'edit') setShowEdit(true);
    if (action === 'delete') setShowDelete(true);
  };

  return (
    <div className="container-fluid px-2 px-md-5 mt-4">
      <h4 className="fw-bold mb-4" style={{ color: '#3daaaa' }}>GST Returns</h4>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        {summaryData.map((item, i) => (
          <div className="col-6 col-md-3" key={i}>
            <div className="card border-0 shadow-sm h-100 rounded-3 text-center">
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <div className="mb-2">{item.icon}</div>
                <div className="text-muted small">{item.label}</div>
                <div className="fs-4 fw-bold text-dark">{item.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="row g-2 mb-3">
        <div className="col-12">
          <input type="text" className="form-control" placeholder="Search returns..." />
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Period</th>
              <th>Return Type</th>
              <th>Due Date</th>
              <th>Taxable Value (₹)</th>
              <th>IGST (₹)</th>
              <th>CGST (₹)</th>
              <th>SGST (₹)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {returns.map((item, idx) => (
              <tr key={idx}>
                <td>{item.period}</td>
                <td>{item.type}</td>
                <td>{item.due}</td>
                <td>{item.value}</td>
                <td>{item.igst}</td>
                <td>{item.cgst}</td>
                <td>{item.sgst}</td>
                <td>
                  <Badge bg="outline-danger" style={{ color: '#d32f2f', border: '1px solid #d32f2f' }}>
                    Not Filed
                  </Badge>
                </td>
                <td className="d-flex justify-content-center gap-1">
                  <button  className="btn outlin-info btn-sm  text-info"onClick={() => handleAction('view', item)}><FaEye  size={16}/></button>
                  <button  className="btn outlin-warning btn-sm text-warning" onClick={() => handleAction('edit', item)}><FaEdit size={16}/></button>
                  <button   className='btn outline-danger btn-sm text-danger' onClick={() => handleAction('delete', item)}><FaTrash size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

   
{/* Pagination UI */}
<div className="d-flex justify-content-between align-items-center mt-3 px-3 flex-wrap">
  <span className="small text-muted">Showing 1 to 5 of 10 results</span>
  <nav>
    <ul className="pagination pagination-sm mb-0 mt-2 mt-md-0">
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
      <li className="page-item">
        <button className="page-link">2</button>
      </li>
      <li className="page-item">
        <button className="page-link rounded-end">&raquo;</button>
      </li>
    </ul>
  </nav>
</div>

      {/* View Modal */}
      <Modal show={showView} onHide={() => setShowView(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Return Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReturn && (
            <ul className="list-group">
              {Object.entries(selectedReturn).map(([k, v]) => (
                <li className="list-group-item d-flex justify-content-between" key={k}>
                  <span className="text-capitalize text-secondary">{k.replace('_', ' ')}</span>
                  <span className="fw-semibold text-dark">{v}</span>
                </li>
              ))}
            </ul>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowView(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Return</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReturn && (
            <Form>
              {Object.entries(selectedReturn).map(([k, v]) => (
                <Form.Group className="mb-3" key={k}>
                  <Form.Label className="text-capitalize">{k}</Form.Label>
                  <Form.Control type="text" defaultValue={v} />
                </Form.Group>
              ))}
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>
            Cancel
          </Button>
          <Button   style={{ backgroundColor: "#3daaaa", borderColor: "#3daaaa" }} onClick={() => setShowEdit(false)} >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelete(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => setShowDelete(false)}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GSTData;