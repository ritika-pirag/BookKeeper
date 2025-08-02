import React from "react";


const plansData = [
  {
    planId: "PLAN-001",
    user: "John Smith",
    email: "john.smith@company.com",
    planName: "Premium",
    planType: "Monthly",
    startDate: "2025-01-15",
    status: "Active",
  },
  {
    planId: "PLAN-002",
    user: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    planName: "Basic",
    planType: "Yearly",
    startDate: "2024-12-01",
    status: "Expired",
  },
  {
    planId: "PLAN-003",
    user: "Mike Chen",
    email: "mike.chen@company.com",
    planName: "Standard",
    planType: "Quarterly",
    startDate: "2025-03-10",
    status: "Active",
  },
];

const PlanManagement = () => {
  return (
    <div className="">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Plans Management</h2>
        {/* <button className="btn btn-primary">
          + Create New Plan
        </button> */}
      </div>
      <p className="text-muted">
        Manage user plans, track subscriptions, and update plan details.
      </p>

      <table className="table table-bordered table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>Plan ID</th>
            {/* <th>User</th>
            <th>Email</th> */}
            <th>Plan Name</th>
            <th>Plan Type</th>
            <th>Start Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plansData.map((plan, index) => (
            <tr key={index}>
              <td><strong>{plan.planId}</strong></td>
              {/* <td>{plan.user}</td>
              <td>{plan.email}</td> */}
              <td>{plan.planName}</td>
              <td>{plan.planType}</td>
              <td>{plan.startDate}</td>
              <td>
                {plan.status === "Active" ? (
                  <span className="badge bg-success">Active</span>
                ) : (
                  <span className="badge bg-secondary">Expired</span>
                )}
              </td>
              <td>
                <button className="btn btn-outline-primary btn-sm me-2">
                   <i className="fas fa-edit me-1"></i>
                  Edit
                </button>
                <button className="btn btn-outline-danger btn-sm">
                   <i className="fas fa-trash me-1"></i>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlanManagement ;
