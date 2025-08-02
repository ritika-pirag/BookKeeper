import axios from "axios";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../../config";

const AdminManagement = () => {
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [id, setId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "admin",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [editAdmin, setEditAdmin] = useState({
    name: "",
    email: "",
    region: "North America",
  });

  const [resetPassword, setResetPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  // Fetch admin data
  const fetchAdminData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}getAll-admin`);
      setAdmins(response.data);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}create-admin`, formData);
      console.log("Admin created:", res.data);
      setShowCreateModal(false);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "admin",
      });
      fetchAdminData(); // Refresh the admin list
    } catch (err) {
      console.error("Error creating admin:", err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEditAdmin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.put(`${BASE_URL}update/${id}`, {
        name: editAdmin.name,
        email: editAdmin.email,
      });

      if (response.status === 200) {
        alert("Admin updated successfully!");
        setShowEditModal(false);
        fetchAdminData(); // Refresh the admin list
      }
    } catch (error) {
      console.error("Update failed:", error);
      setError(
        error.response?.data?.message ||
          "Failed to update admin. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAdmin = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`${BASE_URL}delete/${id}`);
      if (response.status === 200) {
        alert("Admin deleted successfully!");
        setShowDeleteModal(false);
        fetchAdminData(); // Refresh the admin list
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert(error.response?.data?.message || "Failed to delete admin.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (resetPassword.newPassword !== resetPassword.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.put(`${BASE_URL}reset-password/${id}`, {
        newPassword: resetPassword.newPassword,
        confirmPassword: resetPassword.confirmPassword,
      });

      if (response.status === 200) {
        alert("Password reset successfully.");
        setShowResetPasswordModal(false);
        setResetPassword({ newPassword: "", confirmPassword: "" });
        fetchAdminData(); // Refresh the admin list
      }
    } catch (err) {
      setError(err.response?.data?.message || "Password reset failed.");
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id) => {
    try {
      const res = await axios.put(`${BASE_URL}toggle-status/${id}`);
      const updatedStatus = res.data.status;

      setAdmins((prev) =>
        prev.map((admin) =>
          admin._id === id ? { ...admin, status: updatedStatus } : admin
        )
      );
      fetchAdminData(); // Refresh the admin list
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return "bg-success text-white";
      case "Deleted":
        return "bg-danger text-white";
      default:
        return "bg-secondary text-white";
    }
  };

  const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
    if (!isOpen) return null;

    return (
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className={`modal-dialog modal-${size}`}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="">
      <div className="">
        {/* Header Section */}
        <div className="mb-3 mb-md-4 p-3">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
            <div className="mb-3 mb-md-0">
              <h1 className="h2 mb-1 mb-md-2">Admin Management</h1>
              <p className="text-muted mb-0">
                Manage admin users, their permissions, and account status across
                different regions.
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn btn-primary  w-md-auto"
            >
              <i className="fas fa-plus me-1 me-md-2"></i>
              <span className="d-none d-md-inline">Create New Admin</span>
              <span className="d-md-none">New Admin</span>
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="card">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th className="d-none d-md-table-cell">Admin ID</th>
                  <th>Name</th>
                  <th className="d-none d-sm-table-cell">Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins
                  .filter((admin) => admin.status !== "Deleted")
                  .map((admin, index) => (
                    <tr key={admin._id}>
                      <td className="fw-semibold d-none d-md-table-cell">
                        {index + 1} {/* Serial number starts from 1 */}
                      </td>
                      <td>{admin.name}</td>
                      <td className="text-muted d-none d-sm-table-cell">
                        {admin.email}
                      </td>
                      <td>
                        <span
                          className={`badge ${getStatusBadge(admin.status)}`}
                          style={{ cursor: "pointer" }}
                          onClick={() => toggleStatus(admin._id)}
                          title="Click to toggle status"
                        >
                          {admin.status}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-1 gap-md-2">
                          <button
                            onClick={() => {
                              setSelectedAdmin(admin);
                              setId(admin._id);
                              setEditAdmin({
                                name: admin.name,
                                email: admin.email,
                              });
                              setShowEditModal(true);
                            }}
                            className="btn btn-sm btn-outline-primary"
                            title="Edit"
                          >
                            <i className="fas fa-edit"></i>
                            <span className="d-none d-md-inline ms-1">
                              Edit
                            </span>
                          </button>

                          <button
                            onClick={() => {
                              setSelectedAdmin(admin);
                              setId(admin._id);
                              setShowResetPasswordModal(true);
                            }}
                            className="btn btn-sm btn-outline-success"
                            title="Reset Password"
                          >
                            <i className="fas fa-key"></i>
                            <span className="d-none d-md-inline ms-1">
                              Reset
                            </span>
                          </button>

                          <button
                            onClick={() => {
                              setSelectedAdmin(admin);
                              setId(admin._id);
                              setShowDeleteModal(true);
                            }}
                            className="btn btn-sm btn-outline-danger"
                            title="Delete"
                          >
                            <i className="fas fa-trash"></i>
                            <span className="d-none d-md-inline ms-1">
                              Delete
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Pagination */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3">
          <div className="text-muted mb-2 mb-md-0">
            Showing 1 to{" "}
            {admins.filter((admin) => admin.status !== "Deleted").length} of{" "}
            {admins.filter((admin) => admin.status !== "Deleted").length}{" "}
            results
          </div>
          <div className="d-flex flex-column flex-sm-row align-items-center gap-2">
            <select
              className="form-select form-select-sm mb-2 mb-sm-0"
              style={{ width: "120px" }}
            >
              <option>10 per page</option>
              <option>25 per page</option>
              <option>50 per page</option>
            </select>
            <nav>
              <ul className="pagination pagination-sm mb-0">
                <li className="page-item disabled">
                  <button className="page-link">Previous</button>
                </li>
                <li className="page-item active">
                  <button className="page-link">1</button>
                </li>
                <li className="page-item">
                  <button className="page-link">Next</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Create Admin Modal */}
      {showCreateModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create New Admin</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowCreateModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <form onSubmit={handleCreateAdmin}>
                  {error && (
                    <div className="alert alert-danger py-2 px-3">{error}</div>
                  )}

                  <div className="mb-3">
                    <label className="form-label">Full Name*</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      className="form-control"
                      placeholder="Enter full name"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email Address*</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      className="form-control"
                      placeholder="Enter email address"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Password*</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      className="form-control"
                      placeholder="Enter password"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Confirm Password*</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      className="form-control"
                      placeholder="Confirm password"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="d-flex justify-content-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="btn btn-outline-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? "Creating..." : "Create Admin"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Admin Modal */}
      {showEditModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Admin</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <form onSubmit={handleEditAdmin}>
                  {error && (
                    <div className="alert alert-danger py-2 px-3">{error}</div>
                  )}

                  <div className="mb-3">
                    <label className="form-label">Full Name*</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editAdmin.name}
                      onChange={(e) =>
                        setEditAdmin((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email Address*</label>
                    <input
                      type="email"
                      className="form-control"
                      value={editAdmin.email}
                      onChange={(e) =>
                        setEditAdmin((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>

                  <div className="d-flex justify-content-end gap-2 pt-2">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowEditModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Admin"
      >
        <div className="text-center">
          <div
            className="mx-auto mb-3 text-danger"
            style={{ fontSize: "3rem" }}
          >
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <p className="mb-4">
            Are you sure you want to delete{" "}
            <strong>{selectedAdmin?.name}</strong>? This action cannot be
            undone.
          </p>
          <div className="d-flex justify-content-center gap-2">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="btn btn-outline-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteAdmin}
              className="btn btn-danger"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete Admin"}
            </button>
          </div>
        </div>
      </Modal>

      {/* Reset Password Modal */}
      {showResetPasswordModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Reset Password</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowResetPasswordModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <p className="mb-3">
                  Reset password for <strong>{selectedAdmin?.name}</strong>
                </p>
                <form onSubmit={handleResetPasswordSubmit}>
                  {error && (
                    <div className="alert alert-danger py-2 px-3">{error}</div>
                  )}

                  <div className="mb-3">
                    <label className="form-label">New Password*</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter new password"
                      value={resetPassword.newPassword}
                      onChange={(e) =>
                        setResetPassword((prev) => ({
                          ...prev,
                          newPassword: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Confirm Password*</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm new password"
                      value={resetPassword.confirmPassword}
                      onChange={(e) =>
                        setResetPassword((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>

                  <div className="d-flex justify-content-end gap-2 pt-2">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowResetPasswordModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-success"
                      disabled={loading}
                    >
                      {loading ? "Resetting..." : "Reset Password"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManagement;
