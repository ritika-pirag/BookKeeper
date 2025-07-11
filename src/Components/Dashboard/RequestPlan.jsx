import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEnvelopeOpenText } from "react-icons/fa";
import "./RequestPlan.css";

const initialPlans = [
    { name: "Amit Sharma", email: "amit@example.com", plan: "Pro Annual", billing: "Yearly", date: "2025-06-29", status: "Pending" },
    { name: "Riya Khandelwal", email: "riya@example.com", plan: "Enterprise", billing: "Monthly", date: "2025-06-30", status: "Approved" },
    { name: "John Doe", email: "john@example.com", plan: "Basic Plan", billing: "Monthly", date: "2025-07-01", status: "Rejected" },
    { name: "Fatima Noor", email: "fatima@example.com", plan: "Pro Monthly", billing: "Monthly", date: "2025-06-25", status: "Pending" },
    { name: "Karan Mehta", email: "karan@example.com", plan: "Enterprise", billing: "Yearly", date: "2025-06-28", status: "Approved" },
    { name: "Meera Joshi", email: "meera@example.com", plan: "Pro Annual", billing: "Yearly", date: "2025-07-01", status: "Pending" },
    { name: "Vikram Patel", email: "vikram@example.com", plan: "Basic Plan", billing: "Monthly", date: "2025-07-02", status: "Approved" },
    { name: "Anjali Nair", email: "anjali@example.com", plan: "Enterprise", billing: "Monthly", date: "2025-07-03", status: "Rejected" },
    { name: "Sahil Gupta", email: "sahil@example.com", plan: "Pro Monthly", billing: "Monthly", date: "2025-07-04", status: "Pending" },
    { name: "Divya Rawat", email: "divya@example.com", plan: "Basic Plan", billing: "Yearly", date: "2025-07-05", status: "Pending" },
    { name: "Tanya Singh", email: "tanya@example.com", plan: "Enterprise", billing: "Yearly", date: "2025-07-06", status: "Approved" },
    { name: "Raj Malhotra", email: "raj@example.com", plan: "Pro Annual", billing: "Monthly", date: "2025-07-06", status: "Rejected" },
    { name: "Nidhi Verma", email: "nidhi@example.com", plan: "Basic Plan", billing: "Monthly", date: "2025-07-07", status: "Pending" },
    { name: "Manish Tiwari", email: "manish@example.com", plan: "Enterprise", billing: "Yearly", date: "2025-07-07", status: "Approved" },
    { name: "Alisha Khan", email: "alisha@example.com", plan: "Pro Monthly", billing: "Monthly", date: "2025-07-08", status: "Pending" }
  ];
  
const RequestPlan = () => {
  const [plans, setPlans] = useState(initialPlans);

  const handleAction = (index, newStatus) => {
    const updatedPlans = [...plans];
    updatedPlans[index].status = newStatus;
    setPlans(updatedPlans);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return <span className="badge bg-success px-3 py-2 rounded-pill">Approved</span>;
      case "Pending":
        return <span className="badge bg-warning text-dark px-3 py-2 rounded-pill">Pending</span>;
      case "Rejected":
        return <span className="badge bg-danger px-3 py-2 rounded-pill">Rejected</span>;
      default:
        return <span className="badge bg-secondary px-3 py-2 rounded-pill">{status}</span>;
    }
  };

  const renderActionButtons = (status, index) => {
    if (status === "Pending") {
      return (
        <div className="d-flex gap-2">
          <button className="btn btn-outline-success btn-sm rounded-pill px-3" onClick={() => handleAction(index, "Approved")}>
            Approve
          </button>
          <button className="btn btn-outline-danger btn-sm rounded-pill px-3" onClick={() => handleAction(index, "Rejected")}>
            Reject
          </button>
        </div>
      );
    } else {
      return (
        <button className="btn btn-outline-secondary btn-sm rounded-pill px-3" disabled>
          {status}
        </button>
      );
    }
  };

  return (
    <div className="bg-light py-5 request-plan-page mt-4 mt-md-0">
      <div className="container">
        <div className="d-flex align-items-center mb-4">
          <FaEnvelopeOpenText size={28} className="text-primary me-2" />
          <h3 className="fw-bold m-0">Requested Plans</h3>
        </div>

        <div className="card shadow-lg border-0 rounded-4">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle text-center">
              <thead className="table-primary">
                <tr>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Requested Plan</th>
                  <th>Billing Cycle</th>
                  <th>Requested On</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((user, idx) => (
                  <tr key={idx}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.plan}</td>
                    <td>{user.billing}</td>
                    <td>{user.date}</td>
                    <td>{getStatusBadge(user.status)}</td>
                    <td>{renderActionButtons(user.status, idx)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RequestPlan;
