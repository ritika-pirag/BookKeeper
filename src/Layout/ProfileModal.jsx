import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { MdOutlineCancel } from 'react-icons/md';

const ProfileModal = ({ show, handleClose }) => {
  // State to manage input values
  const [formData, setFormData] = useState({
    firstName: 'Jeffry',
    lastName: 'Jordan',
    email: 'jeffry@example.com',
    phone: '+17468314286',
    username: 'Jeffry Jordan',
    password: '********'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Modal show={show} onHide={handleClose} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title>User Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="card p-3">
          <h5 className="mb-3">
            <span className="badge bg-warning text-dark fs-5">Profile</span>
          </h5>
          <h6 className="text-primary mb-3">
            <FaUserCircle className="me-2" /> Basic Information
          </h6>

          <div className="d-flex align-items-center mb-4">
            <div className="position-relative me-3">
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="Profile"
                className="img-thumbnail rounded"
                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
              />
              <button
                className="btn btn-sm btn-danger position-absolute top-0 start-100 translate-middle"
                style={{ borderRadius: '50%' }}
              >
                <MdOutlineCancel />
              </button>
            </div>
            <div>
              <button className="btn btn-warning">Change Image</button>
              <p className="text-muted small mt-1 mb-0">
                Upload an image below 2 MB, JPG/PNG only.
              </p>
            </div>
          </div>

          <div className="row g-2">
            <div className="col-md-6">
              <label className="form-label">First Name *</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Last Name *</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Email *</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Phone Number *</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">User Name *</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Password *</label>
              <div className="input-group">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button className="btn btn-outline-secondary" type="button">
                  <i className="bi bi-eye"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="dark" onClick={handleClose}>Cancel</Button>
            <Button variant="warning" className="text-white">Save Changes</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProfileModal;
