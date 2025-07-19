import React, { useState } from "react";
import {
    BsThreeDotsVertical,
    BsCalendarEvent,
    BsClock,
    BsCalendarWeek,
    BsPeopleFill,
    BsPersonPlusFill,
    BsBuildings,
    BsPlusCircle,
    BsPencilSquare,
    BsTrash,
    BsShieldLock,
    BsGear,
    BsSlashCircle,

    BsEye,
} from "react-icons/bs";

import "./Company.css";
import { useNavigate } from "react-router-dom";

const initialCompanies = [
    {
        name: "Workdo",
        email: "company@example.com",
        plan: "Platinum",
        avatar: "https://i.ibb.co/2f7wxpv/image1.jpg",
        date: "2025-07-03",
        time: "10:30:44",
        expired: "Dec 18, 2025",
        counts: {  users: 890, },
    },
    {
        name: "Murray Group",
        email: "iromaguera@gmail.com",
        plan: "Silver",
        avatar: "https://i.ibb.co/4nKXmCRz/image2.jpg",
        date: "2025-07-03",
        time: "05:04:53",
        expired: "Apr 10, 2025",
        counts: { users: 680, },
    },
    {
        name: "Larson LLC",
        email: "fgoldner@gmail.com",
        plan: "Platinum",
        avatar: "https://i.ibb.co/Pzr45DCB/image5.jpg",
        date: "2025-07-03",
        time: "05:04:53",
        expired: "Apr 10, 2025",
        counts: {  users: 90, },
    },
    {
        name: "Abhishek Dwivedi",
        email: "abhishek@company.com",
        plan: "Silver",
        avatar: "https://i.ibb.co/rL3qL71/image4.jpg",
        date: "2025-07-03",
        time: "05:04:53",
        expired: "Apr 10, 2025",
        counts: { users: 120,  },
    },
    {
        name: "Shiane Mcdowell",
        email: "xygux@mailinator.com",
        plan: "Gold",
        avatar: "https://i.ibb.co/Pzr45DCB/image5.jpg",
        date: "2025-07-03",
        time: "05:04:53",
        expired: "Apr 10, 2025",
        counts: {  users: 80},
    },
    {
        name: "Kylie Lawson",
        email: "kylie@lawsoncorp.com",
        plan: "Bronze",
        avatar: "https://i.ibb.co/9kcymv4q/image6.jpg",
        date: "2025-07-02",
        time: "08:20:10",
        expired: "May 30, 2025",
        counts: { users: 360,  },
    },
    {
        name: "Delta Corp",
        email: "info@deltacorp.com",
        plan: "Silver",
        avatar: "https://i.ibb.co/Pzr45DCB/image5.jpg",
        date: "2025-07-01",
        time: "11:50:33",
        expired: "Jun 11, 2025",
        counts: {  users: 700,  },
    },
    {
        name: "Nova Enterprises",
        email: "contact@novaent.com",
        plan: "Gold",
        avatar: "https://i.ibb.co/Pzr45DCB/image5.jpg",
        date: "2025-07-03",
        time: "09:10:00",
        expired: "May 25, 2025",
        counts: {  users: 100, },
    },
];

const Company = () => {
    const [showModal, setShowModal] = useState(false);
    const [companies, setCompanies] = useState(initialCompanies);
    const [activeMenuIndex, setActiveMenuIndex] = useState(null);
    const [editIndex, setEditIndex] = useState(null);
    const [editCompany, setEditCompany] = useState({ name: '', email: '' });
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [resetIndex, setResetIndex] = useState(null);
    const [newPassword, setNewPassword] = useState("");
    const [viewMode, setViewMode] = useState("card"); // 'card' or 'table'

    const [filter, setFilter] = useState({
        plan: "",
        startDate: "",
        endDate: "",
      });
      
    const [newCompany, setNewCompany] = useState({
        name: "",
        email: "",
        date: "",
        expired: "",
        plan: ""
    });
    const filteredCompanies = companies.filter((company) => {
        const matchPlan = filter.plan === "" || company.plan === filter.plan;
        const matchStart =
          filter.startDate === "" || new Date(company.date) >= new Date(filter.startDate);
        const matchEnd =
          filter.endDate === "" || new Date(company.expired) <= new Date(filter.endDate);
        return matchPlan && matchStart && matchEnd;
      });
      
    const navigate = useNavigate();

    const toggleMenu = (index) => {
        setActiveMenuIndex(activeMenuIndex === index ? null : index);
    };
    
    const handleResetPassword = () => {
        // later integrate with API
        console.log("Password reset for:", companies[resetIndex].name, "=>", newPassword);
        setResetIndex(null);
        setNewPassword("");
    };
    
    const handleEdit = (index) => {
        setEditCompany({ ...companies[index] });
        setEditIndex(index);
        setActiveMenuIndex(null);
    };

    const handleDelete = (index) => {
        setDeleteIndex(index);
        setActiveMenuIndex(null);
    };

    const confirmDelete = () => {
        const updated = [...companies];
        updated.splice(deleteIndex, 1);
        setCompanies(updated);
        setDeleteIndex(null);
    };

    const saveChanges = () => {
        const updated = [...companies];
        updated[editIndex] = editCompany;
        setCompanies(updated);
        setEditIndex(null);
    };
    const badgeStyles = {
      Bronze: {
        backgroundImage: "linear-gradient(to right, #ad7c59, #cd7f32, #a97142)",
        color: "#fff",
        boxShadow: "0 0 8px rgba(173, 124, 89, 0.5)",
      },
      Silver: {
        backgroundImage: "linear-gradient(to right, #a9a9a9, #bdbdbd, #d3d3d3)", // Graphite to light silver
        color: "#000",
        boxShadow: "0 0 10px rgba(140, 140, 140, 0.5)",
        buttonColor: "#6e6e6e" // Metallic steel
      },
      
      Gold: {
        backgroundImage: "linear-gradient(to right, #f5d76e, #ffd700, #e6be8a)",
        color: "#000",
        boxShadow: "0 0 8px rgba(255, 215, 0, 0.6)",
      },
      Platinum: {
        backgroundImage: "linear-gradient(to right, #cfe9f9, #e3f2fd, #f5f7fa)", // Frosted bluish white
        color: "#000",
        boxShadow: "0 0 10px rgba(120, 160, 200, 0.4)",
        buttonColor: "#4a6fa5" // Deep ice-blue
      }
      
    };
    
    
    
      
    return (
        <div className="container-fluid py-4 px-4 mt-4 mt-md-0" style={{
            backgroundColor: "#f7f7f7", minHeight: "100vh"
        }}>
{/* Container with vertical spacing */}
<div className="mb-4">

  {/* Heading + Add Company Button Row */}
{/* Heading + Add Company Button Row */}
<div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">

  {/* Left: Heading */}
  <div className="d-flex align-items-center gap-3">
    <h4 className="fw-bold mb-0 d-flex align-items-center">
      <BsBuildings className="me-2 fs-4 text-warning" />
      Manage Companies
    </h4>
  </div>

  {/* Right: View Toggle Buttons + Add Company Button */}

 
  <div className="d-flex align-items-center gap-3">
  {/* 🔄 View Toggle Buttons */}
  <div className="d-flex gap-2">
    <button
      className={`btn btn-sm d-flex align-items-center gap-2 ${
        viewMode === "card" ? "btn-dark" : "btn-outline-secondary"
      }`}
      onClick={() => setViewMode("card")}
      style={{
        backgroundColor: viewMode === "card" ? "#53b2a5" : "transparent",
        color: viewMode === "card" ? "#fff" : "#53b2a5",
        borderColor: "#53b2a5",
        padding: "6px 12px",
        borderRadius: "25px",
        transition: "all 0.3s ease"
      }}
    >
      <i className="fas fa-border-all"></i>
    </button>

    <button
      className={`btn btn-sm d-flex align-items-center gap-2 ${
        viewMode === "table" ? "btn-dark" : "btn-outline-secondary"
      }`}
      onClick={() => setViewMode("table")}
      style={{
        backgroundColor: viewMode === "table" ? "#53b2a5" : "transparent",
        color: viewMode === "table" ? "#fff" : "#53b2a5",
        borderColor: "#53b2a5",
        padding: "6px 12px",
        borderRadius: "25px",
        transition: "all 0.3s ease"
      }}
    >
      <i className="fas fa-list-alt"></i>
    </button>
  </div>

  {/* ➕ Add Company Button */}
  <button
    className="btn btn-sm d-flex align-items-center gap-2"
    onClick={() => setShowModal(true)}
    style={{
      backgroundColor: "#53b2a5",
      borderColor: "#53b2a5",
      color: "#fff",
      padding: "6px 14px",
      borderRadius: "25px",
      fontWeight: "500",
      boxShadow: "0 4px 10px rgba(83, 178, 165, 0.3)",
      transition: "all 0.3s ease"
    }}
  >
    <BsPlusCircle className="fs-6" />
    Add Company
  </button>
</div>


  </div>



  {/* Filters Row - aligned to right end */}
  <div className="d-flex flex-wrap align-items-center justify-content-end gap-3">

{/* Date Filters Row */}
<div className="d-flex align-items-center flex-wrap gap-3 justify-content-end">

  {/* Start Date */}
  <div className="d-flex align-items-center" style={{ minWidth: "220px" }}>
    <label
      className="form-label mb-0 fw-semibold small me-2"
      style={{ width: "80px", whiteSpace: "nowrap" }}
    >
      Start Date
    </label>
    <input type="date" className="form-control form-control-sm" />
  </div>

  {/* Expiry Date */}
  <div className="d-flex align-items-center" style={{ minWidth: "220px" }}>
    <label
      className="form-label mb-0 fw-semibold small me-2"
      style={{ width: "80px", whiteSpace: "nowrap" }}
    >
      Expiry Date
    </label>
    <input type="date" className="form-control form-control-sm" />
  </div>

</div>


    {/* Plan Dropdown */}
    <div className="d-flex align-items-center" style={{ minWidth: "220px" }}>
      <label className="form-label mb-0 fw-semibold small me-2" style={{ width: "80px" }}>
        Plan
      </label>
      <select className="form-select form-select-sm">
        <option value="">All Plans</option>
        <option value="gold">Gold</option>
        <option value="silver">Silver</option>
        <option value="platinum">Platinum</option>
        <option value="bronze">Bronze</option>
        <option value="enterprises">Enterprises</option>
      </select>
    </div>

  </div>
</div>


{/* ✅ Conditional View Rendering */}
{viewMode === "card" ? (
 

<div className="row g-4">
{filteredCompanies.map((company, index) => (
    <div className="col-lg-3 col-md-6" key={index}>
        <div className="card shadow-sm rounded-4 p-3 border-0 card-hover position-relative" style={{ minHeight: "260px" }}>
            {/* Header: Badge + Menu */}
            <div className="d-flex justify-content-between align-items-start mb-3">
                <span
                    className="badge px-3 py-2 rounded-pill fw-semibold"
                    style={badgeStyles[company.plan]}
                >
                    {company.plan}
                </span>

                <div className="dropdown-icon position-relative">
                    <BsThreeDotsVertical
                        className="text-muted"
                        style={{ cursor: "pointer" }}
                        onClick={() => toggleMenu(index)}
                    />
                    {activeMenuIndex === index && (
                <div className="custom-dropdown shadow rounded-3 p-2">
                <div className="d-flex justify-content-between align-items-center gap-2 mb-2">
                  {/* ✏️ Edit Button */}
                  <div
                    className="dropdown-item text-warning fw-semibold flex-grow-1 text-start"
                    onClick={() => handleEdit(index)}
                    style={{ cursor: "pointer", backgroundColor: "#fff", borderRadius: "6px", padding: "6px" }}
                  >
                    <BsPencilSquare className="me-1" />
                    Edit
                  </div>
              
                  {/* 🛡️ Login as Company */}
                  <div
                    className="dropdown-item flex-grow-1 text-center"
                    onClick={() => navigate("/")}
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#fff",
                      borderRadius: "6px",
                      padding: "6px",
                      color: "#338871",
                      fontWeight: "500"
                    }}
                  >
                    <BsShieldLock className="me-1" />
                    Login as Company
                  </div>
                </div>
              
                <hr className="my-1" />
              
                {/* ❌ Login Disable */}
                <div
                  className="dropdown-item text-danger text-center"
                  style={{ padding: "6px", borderRadius: "6px" }}
                >
                  <BsSlashCircle className="me-1" />
                  Login Disable
                </div>
              </div>
              
                    )}
                </div>
            </div>
        
            {/* Avatar & Info */}
            <div className="d-flex align-items-center gap-3 mb-2">
                <img
                    src={company.avatar}
                    alt={company.name}
                    className="rounded-circle"
                    width="45"
                    height="45"
                />
                <div>
                    <h6 className="mb-0 fw-semibold">{company.name}</h6>
                    <small className="text-muted">{company.email}</small>
                </div>
            </div>
        
            {/* Start & Expiry Dates in Separate Rows */}
            <div className="text-muted small mb-2 mt-3 px-1 ">
                <div className="mb-1 d-flex align-items-center">
                    <BsCalendarEvent className="me-3 text-primary" />
                    <strong className="me-1">Start:</strong> {company.date}
                </div>
                <div className="d-flex align-items-center">
                    <BsCalendarEvent className="me-3 text-danger" />
                    <strong className="me-1">End:</strong> {company.expired}
                </div>
            </div>

            {/* Centered Button */}
{/* Centered Buttons in Same Row */}
{/* Centered Small Buttons in Same Row */}
<div className="d-flex justify-content-center gap-2 mt-2">
<button
className="btn btn-sm py-1 px-2 text-white"
style={{
backgroundColor: "#53b2a5",
borderColor: "#53b2a5",
fontSize: "0.75rem",
}}
onClick={() => navigate("/superadmin/planpricing")}
>
Upgrade
</button>

<button
className="btn btn-outline-secondary btn-sm py-1 px-2 text-black "
style={{ fontSize: "0.75rem" }}
title="Total Users"
>
Users: {company.counts.users}
</button>
</div>



        </div>
    </div>
))}
</div>

) : (
  <div className="card mt-4 shadow-sm rounded-4">
                             {/* Company Table View */}
<div className="mt-3 mb-2 rounded-4">
  <div className="card-header bg-white border-bottom-0">
    <h5 className="mb-0 fw-bold">Company Table View</h5>
  </div>
  <div className=" table-responsive">
    <table className="table table-bordered table-hover align-middle">
      <thead className="table-light">
        <tr>
          <th>#</th>
          <th>Avatar</th>
          <th>Name</th>
          <th>Email</th>
          <th>Plan</th>
          <th>Start Date</th>
          <th>Expiry Date</th>
          <th>Total Users</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredCompanies.map((company, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              <img
                src={company.avatar}
                alt={company.name}
                className="rounded-circle"
                width="40"
                height="40"
              />
            </td>
            <td>{company.name}</td>
            <td>{company.email}</td>
            <td>
              <span
                className="badge px-3 py-2 rounded-pill fw-semibold"
                style={badgeStyles[company.plan]}
              >
                {company.plan}
              </span>
            </td>
            <td>{company.date}</td>
            <td>{company.expired}</td>
            <td>{company.counts.users}</td>
            <td>
              <div className="btn-group" role="group">
                <button
                  className="btn btn-sm text-warning p-0" 
                  onClick={() => handleEdit(index)}
                >
                  <BsPencilSquare  size={18}/>
            
                </button>
                <button
                  className="btn btn-sm text-danger  "
                  onClick={() => handleDelete(index)}
                >
                  <BsTrash size={18}/>
                </button>
        

                 
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  </div>
)}















            {showModal && (
                <div className="modal d-flex align-items-center justify-content-center" style={{
                    backgroundColor: "rgba(0,0,0,0.5)",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    zIndex: 1050
                }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content rounded-4 p-3 position-relative">
                            {/* Close Button */}
                            <button
                                type="button"
                                className="btn btn-sm btn-danger rounded-circle position-absolute"
                                style={{
                                    width: "35px", height: "35px", top: "10px", right: "10px", zIndex: 10
                                }}
                                onClick={() => setShowModal(false)}
                            >✕</button>

                            {/* Modal Header */}
                            <div className="modal-header border-0 pt-3 pb-1">
                                <h5 className="modal-title fw-bold">Create Company</h5>
                            </div>

                            {/* Modal Body */}
                            <div className="modal-body pt-1">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Company Name"
                                            value={newCompany.name}
                                            onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            Email <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={newCompany.email}
                                            onChange={(e) => setNewCompany({ ...newCompany, email: e.target.value })}
                                        />
                                    </div>

                                    {/* Start Date */}
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            Start Date <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={newCompany.date}
                                            onChange={(e) => setNewCompany({ ...newCompany, date: e.target.value })}
                                        />
                                    </div>

                                    {/* Expire Date */}
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            Expire Date <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={newCompany.expired}
                                            onChange={(e) => setNewCompany({ ...newCompany, expired: e.target.value })}
                                        />
                                    </div>

                                    {/* Plan Dropdown */}
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            Plan <span className="text-danger">*</span>
                                        </label>
                                        <select
                                            className="form-select"
                                            value={newCompany.plan}
                                            onChange={(e) => setNewCompany({ ...newCompany, plan: e.target.value })}
                                        >
                                            <option value="">Select Plan</option>
                                            <option value="Bronze">Bronze</option>
                                            <option value="Silver">Silver</option>
                                            <option value="Gold">Gold</option>
                                            <option value="Platinum">Platinum</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="modal-footer border-top-0 pt-3">
                                <button className="btn btn-dark px-4" onClick={() => setShowModal(false)}>Cancel</button>
                                <button className="btn btn-success px-4">Create</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {editIndex !== null && (
                <div
                    className="modal d-flex align-items-center justify-content-center"
                    style={{
                        backgroundColor: "rgba(0,0,0,0.5)",
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        zIndex: 1050,
                    }}
                >
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content rounded-4 p-4 position-relative">
                            {/* Close Button */}
                            <button
                                type="button"
                                className="btn btn-sm btn-danger rounded-circle position-absolute"
                                style={{ width: "35px", height: "35px", top: "10px", right: "10px" }}
                                onClick={() => setEditIndex(null)}
                            >
                                ✕
                            </button>

                            {/* Header */}
                            <div className="modal-header border-0 pt-3 pb-1">
                                <h5 className="modal-title fw-bold">Edit Company</h5>
                            </div>

                            {/* Form Body */}
                            <div className="modal-body pt-1">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Company Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={editCompany.name}
                                            onChange={(e) =>
                                                setEditCompany({ ...editCompany, name: e.target.value })
                                            }
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={editCompany.email}
                                            onChange={(e) =>
                                                setEditCompany({ ...editCompany, email: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="modal-footer border-top-0 pt-3">
                                <button className="btn btn-dark px-4" onClick={() => setEditIndex(null)}>
                                    Cancel
                                </button>
                                <button className="btn btn-warning px-4 text-white" onClick={saveChanges}>
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {deleteIndex !== null && (
                <div className="modal d-flex align-items-center justify-content-center" style={{ backgroundColor: "rgba(0,0,0,0.5)", position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 1050 }}>
                    <div className="modal-dialog modal-sm modal-dialog-centered">
                        <div className="modal-content rounded-4 p-4 text-center">
                            <p className="fw-semibold fs-5 mb-4">Are you sure you want to delete this?</p>
                            <div className="d-flex justify-content-center gap-3">
                                <button className="btn btn-dark px-4" onClick={() => setDeleteIndex(null)}>Cancel</button>
                                <button className="btn btn-danger px-4" onClick={confirmDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {resetIndex !== null && (
                <div
                    className="modal d-flex align-items-center justify-content-center"
                    style={{
                        backgroundColor: "rgba(0,0,0,0.5)",
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        zIndex: 1050,
                    }}
                >
                    <div className="modal-dialog modal-md modal-dialog-centered">
                        <div className="modal-content rounded-4 p-4 position-relative">
                            {/* Close Button */}
                            <button
                                type="button"
                                className="btn btn-sm btn-danger rounded-circle position-absolute"
                                style={{
                                    width: "35px",
                                    height: "35px",
                                    top: "10px",
                                    right: "10px",
                                }}
                                onClick={() => setResetIndex(null)}
                            >
                                ✕
                            </button>

                            {/* Header */}
                            <div className="modal-header border-0 pb-1 pt-3">
                                <h5 className="modal-title fw-bold">Reset Password</h5>
                            </div>

                            {/* Body */}
                            <div className="modal-body pt-0">
                                <p className="mb-3">
                                    Set a new password for <strong>{companies[resetIndex].name}</strong>
                                </p>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>

                            {/* Footer */}
                            <div className="modal-footer border-top-0 pt-3">
                                <button className="btn btn-dark px-4" onClick={() => setResetIndex(null)}>
                                    Cancel
                                </button>
                                <button className="btn btn-success px-4" onClick={handleResetPassword}>
                                    Reset Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>



    );
};

export default Company;