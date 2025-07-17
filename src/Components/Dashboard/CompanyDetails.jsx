// BusinessAccounts.js
import React from "react";
import { BsFilter, BsToggleOn, BsPencil } from "react-icons/bs";
import "./CompanyDetails.css";

const businesses = [
  {
    name: "Acme Corporation",
    plan: "Enterprise Plan",
    status: "Active",
    date: "Aug 15, 2025",
    logo: "https://img.icons8.com/emoji/48/000000/check-mark-emoji.png",
  },
  {
    name: "Global Innovations Ltd",
    plan: "Professional Plan",
    status: "Active",
    date: "Jul 30, 2025",
    logo: "https://img.icons8.com/ios/40/server.png",
  },
  {
    name: "Tech Solutions Inc",
    plan: "Standard Plan",
    status: "Pending",
    date: "Jul 5, 2025",
    logo: "https://img.icons8.com/ios-filled/40/monitor--v1.png",
  },
  {
    name: "Creative Studios",
    plan: "Professional Plan",
    status: "Expired",
    date: "Jun 15, 2025",
    logo: "https://img.icons8.com/ios/40/edit.png",
  },
  {
    name: "Quantum Enterprises",
    plan: "Enterprise Plan",
    status: "Active",
    date: "Sep 20, 2025",
    logo: "https://img.icons8.com/ios/40/landscape.png",
  },
  {
    name: "Summit Financial Group",
    plan: "Enterprise Plan",
    status: "Active",
    date: "Aug 25, 2025",
    logo: "https://img.icons8.com/ios/40/shopping-bag.png",
  },
  {
    name: "Horizon Media",
    plan: "Standard Plan",
    status: "Warning",
    date: "Jul 1, 2025",
    logo: "https://img.icons8.com/ios/40/sun.png",
  },
  {
    name: "Evergreen Solutions",
    plan: "Professional Plan",
    status: "Expired",
    date: "Jun 10, 2025",
    logo: "https://img.icons8.com/ios/40/dog.png",
  },
];

// 🧠 Plan-color mapping function
const getPlanColor = (plan) => {
  switch (plan) {
    case "Bronze Plan":
      return "#cd7f32"; // Bronze
    case "Standard Plan":
      return "#87CEEB"; // Sky Blue
    case "Professional Plan":
      return "#9370DB"; // Purple
    case "Enterprise Plan":
      return "#228B22"; // Green
    default:
      return "#f0f0f0"; // Light grey
  }
};

const ExpirySection = () => {
  const expired = businesses.filter((b) => b.status === "Expired");
  const warning = businesses.filter((b) => b.status === "Warning" || b.status === "Pending");
  const active = businesses.filter((b) => b.status === "Active");

  return (
    <div className="card border-0 shadow-sm mt-4 mt-4 mt-md-0">
      <div className="card-body">
        <h6 className="fw-bold mb-3">Account Expiry Management</h6>
        <div className="row g-3">
          <div className="col-12 col-md-4">
            <div className="p-3 rounded" style={{ backgroundColor: '#ffe5e5' }}>
              <h6 className="text-danger fw-bold d-flex align-items-center gap-2">
                Expired Accounts <span className="badge bg-danger">{expired.length}</span>
              </h6>
              {expired.map((e, i) => (
                <div key={i} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                  <div>
                    <div className="fw-semibold">{e.name}</div>
                    <div className="small text-muted">Expired on {e.date}</div>
                  </div>
                  <button className="btn btn-sm text-white" style={{ backgroundColor: '#ff0000' }}>Renew Now</button>
                </div>
              ))}
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="p-3 rounded" style={{ backgroundColor: '#fff8dc' }}>
              <h6 className="text-warning fw-bold d-flex align-items-center gap-2">
                Expiring Soon <span className="badge bg-warning text-dark">{warning.length}</span>
              </h6>
              {warning.map((e, i) => (
                <div key={i} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                  <div>
                    <div className="fw-semibold">{e.name}</div>
                    <div className="small text-muted">Expires on {e.date}</div>
                  </div>
                  <button className="btn btn-sm btn-warning text-white">Extend</button>
                </div>
              ))}
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="p-3 rounded" style={{ backgroundColor: '#e6f7ee' }}>
              <h6 className="text-success fw-bold d-flex align-items-center gap-2">
                Active Accounts <span className="badge bg-success">{active.length}</span>
              </h6>
              {active.map((e, i) => (
                <div key={i} className="py-1">
                  <span className="fw-semibold">{e.name}</span>{" "}
                  <span className="text-muted small">
                    - {(new Date(e.date) - new Date()) / (1000 * 60 * 60 * 24) | 0} days left
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CompanyDetails = () => {
  return (
    <div className="business-accounts container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <h5 className="fw-bold d-flex align-items-center gap-2">
          <span role="img" aria-label="building">🏢</span> Business Accounts
        </h5>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary btn-sm">
            <BsFilter className="me-1" /> All Plans
          </button>
          <button className="btn btn-outline-secondary btn-sm">
            <BsToggleOn className="me-1" /> All Status
          </button>
        </div>
      </div>

      <input
        type="text"
        className="form-control mb-3 business-search"
        placeholder="Search business accounts..."
      />

      <div className="card border-0 shadow-sm">
        <div className="list-group list-group-flush">
          {businesses.map((biz, i) => {
            const planLabel = biz.plan === "Basic Plan" ? "Bronze Plan" : biz.plan;
            return (
              <div
                className="list-group-item d-flex justify-content-between align-items-center business-row"
                key={i}
                style={{ backgroundColor: getPlanColor(planLabel) }}
              >
                <div className="d-flex align-items-center gap-3">
                  <img src={biz.logo} alt="logo" className="biz-logo" />
                  <div>
                    <h6 className="mb-1 fw-semibold">{biz.name}</h6>
                    <div className="d-flex gap-2 align-items-center">
                      <span className={`badge status-badge status-${biz.status.toLowerCase()}`}>
                        {biz.status}
                      </span>
                      <span className="text-muted small">{planLabel}</span>
                    </div>
                  </div>
                </div>
                <div className="text-end">
                  <div className="text-muted small">Expiry Date</div>
                  <div className="fw-semibold">
                    {biz.date} <BsPencil className="ms-1 edit-icon" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expiry Status Section */}
      <ExpirySection />
    </div>
  );
};

export default CompanyDetails;
