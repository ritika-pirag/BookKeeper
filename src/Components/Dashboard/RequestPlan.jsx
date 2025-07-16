import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEnvelopeOpenText } from "react-icons/fa";
import "./RequestPlan.css";

const initialPlans = [
  { company: "Zerosoft Pvt Ltd", email: "amit@example.com", plan: "Gold", billing: "Yearly", date: "2025-06-29", status: "Pending" },
  { company: "Brightlabs Co.", email: "riya@example.com", plan: "Platinum", billing: "Monthly", date: "2025-06-30", status: "Approved" },
  { company: "NextGen Corp", email: "john@example.com", plan: "Basic", billing: "Monthly", date: "2025-07-01", status: "Rejected" },
  { company: "InnoTech Global", email: "fatima@example.com", plan: "Silver", billing: "Monthly", date: "2025-06-25", status: "Pending" },
  { company: "ThinkByte Solutions", email: "karan@example.com", plan: "Platinum", billing: "Yearly", date: "2025-06-28", status: "Approved" },
  { company: "AlphaEdge Ltd", email: "meera@example.com", plan: "Gold", billing: "Yearly", date: "2025-07-01", status: "Pending" },
  { company: "BlueOcean Inc", email: "vikram@example.com", plan: "Basic", billing: "Monthly", date: "2025-07-02", status: "Approved" },
  { company: "Digify India", email: "anjali@example.com", plan: "Platinum", billing: "Monthly", date: "2025-07-03", status: "Rejected" },
  { company: "Spark Solutions", email: "sahil@example.com", plan: "Silver", billing: "Monthly", date: "2025-07-04", status: "Pending" },
  { company: "Grow360", email: "divya@example.com", plan: "Basic", billing: "Yearly", date: "2025-07-05", status: "Pending" },
  { company: "Brightvision Ltd", email: "tanya@example.com", plan: "Platinum", billing: "Yearly", date: "2025-07-06", status: "Approved" },
  { company: "WebCraft", email: "raj@example.com", plan: "Gold", billing: "Monthly", date: "2025-07-06", status: "Rejected" },
  { company: "Softbridge Inc", email: "nidhi@example.com", plan: "Basic", billing: "Monthly", date: "2025-07-07", status: "Pending" },
  { company: "Zenithware", email: "manish@example.com", plan: "Platinum", billing: "Yearly", date: "2025-07-07", status: "Approved" },
  { company: "EvolveX", email: "alisha@example.com", plan: "Silver", billing: "Monthly", date: "2025-07-08", status: "Pending" }
];
const planMapping = {
  Basic: { display: "Basic", bgColor: "#b2dfdb" },     // Teal
  Silver: { display: "Silver", bgColor: "#c0c0c0" },   // Silver
  Gold: { display: "Gold", bgColor: "#ffd700" },       // Gold
  Platinum: { display: "Platinum", bgColor: "#e5e4e2" } // Light Grey
};


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
        <div className="d-flex gap-2 justify-content-center flex-wrap">
          <button
            className="btn btn-outline-success btn-sm rounded-pill px-3"
            onClick={() => handleAction(index, "Approved")}
          >
            Approve
          </button>
          <button
            className="btn btn-outline-danger btn-sm rounded-pill px-3"
            onClick={() => handleAction(index, "Rejected")}
          >
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
    <div className="bg-light p-4">
      <div className="">
        <div className="d-flex align-items-center mb-3">
          <FaEnvelopeOpenText size={28} className="text-primary me-2" />
          <h3 className="fw-bold m-0">Requested Plans</h3>
        </div>

        <div className="card shadow-lg border-0 rounded-4">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle text-center">
              <thead className="table-light">
                <tr>
                  <th className="px-3 py-4">Company Name</th>
                  <th className="px-3 py-3">Email</th>
                  <th className="px-3 py-3">Requested Plan</th>
                  <th className="px-3 py-3">Billing Cycle</th>
                  <th className="px-3 py-3">Requested On</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((user, idx) => (
                  <tr key={idx}>
                    <td className="px-3 py-4">{user.company}</td>
                    <td>{user.email}</td>
                    <td>
  <span
    className="px-3 py-1 rounded-pill d-inline-block text-dark fw-semibold"
    style={{
      backgroundColor: planMapping[user.plan]?.bgColor || "#dee2e6",
      minWidth: "90px"
    }}
  >
    {planMapping[user.plan]?.display || user.plan}
  </span>
</td>

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
