import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../config";

const PlanRequest = () => {
  const [plans, setPlans] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  const fetchPlans = async () => {
    try {
      const response = await axios.get(`${BASE_URL}plan-booking`);

      console.log("Fetched plans:", response.data);
      setPlans(response.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(
        `${BASE_URL}update-status/${id}`,
        {
          status: "Approved",
        }
      );

      // Update local UI state
      const updatedPlans = plans.map((plan) =>
        plan._id === id ? { ...plan, status: "Approved" } : plan
      );
      setPlans(updatedPlans);
    } catch (error) {
      console.error("Error approving plan:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(
        `${BASE_URL}update-status/${id}`,
        {
          status: "Rejected",
        }
      );

      // Update local UI state
      const updatedPlans = plans.map((plan) =>
        plan._id === id ? { ...plan, status: "Rejected" } : plan
      );
      setPlans(updatedPlans);
    } catch (error) {
      console.error("Error rejecting plan:", error);
    }
  };

  const filteredPlans = plans.filter((plan) => {
    const matchesSearch =
      plan.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.plan?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || plan.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPlans = filteredPlans.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPlans.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "bg-warning text-dark";
      case "Approved":
        return "bg-success";
      case "Rejected":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  const getPlanBadge = (plan) => {
    switch (plan) {
      case "Gold":
        return "bg-warning text-dark";
      case "Premium":
        return "bg-info text-dark";
      case "Basic":
        return "bg-primary";
      case "Silver":
        return "bg-secondary";
      default:
        return "bg-light text-dark";
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <i className="fas fa-file-alt text-primary me-2 fs-5"></i>
        <h4 className="mb-0 fw-bold text-dark">Requested Plans</h4>
      </div>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="input-group mb-2">
            <span className="input-group-text bg-white border-end-0">
              <i className="fas fa-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search by company, email or plan..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
        <div className="col-md-4">
          <select
            className="form-select mb-2"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div className="col-md-4 d-flex justify-content-end mb-2">
          <button className="btn btn-primary">
            <i className="fas fa-download me-2"></i> Export
          </button>
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="table-responsive">
            {isLoading ? (
              <div className="text-center py-4">Loading...</div>
            ) : (
              <table className="table table-hover mb-0">
                <thead style={{ backgroundColor: "#f8f9fa" }}>
                  <tr>
                    <th className="px-4 py-3">Company</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Plan</th>
                    <th className="px-4 py-3">Billing</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPlans.length > 0 ? (
                    currentPlans.map((plan, index) => (
                      <tr key={plan.id || index}>
                        <td className="px-4 py-3">{plan.company}</td>
                        <td className="px-4 py-3">{plan.email}</td>
                        <td className="px-4 py-3">{plan.phone}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`badge ${getPlanBadge(
                              plan.plan
                            )} px-3 py-2 rounded-pill`}
                          >
                            {plan.plan}
                          </span>
                        </td>
                        <td className="px-4 py-3">{plan.billing}</td>
                        <td className="px-4 py-3">{plan.date}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`badge ${getStatusBadge(
                              plan.status
                            )} px-3 py-2 rounded-pill`}
                          >
                            {plan.status || "Pending"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="d-flex gap-2">
                            <button
                              className={`btn btn-outline-primary btn-sm px-3 py-1 rounded-pill ${
                                plan.status === "Approved" ? "disabled" : ""
                              }`}
                              onClick={() => handleApprove(plan._id)}
                            >
                              Approve
                            </button>
                            <button
                              className={`btn btn-outline-danger btn-sm px-3 py-1 rounded-pill ${
                                plan.status === "Rejected" ? "disabled" : ""
                              }`}
                              onClick={() => handleReject(plan._id)}
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-4">
                        No matching records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {filteredPlans.length > 0 && (
            <div className="d-flex justify-content-between align-items-center px-4 py-3 border-top bg-light bg-opacity-50">
              <div className="text-muted small">
                Showing {indexOfFirstItem + 1} to{" "}
                {Math.min(indexOfLastItem, filteredPlans.length)} of{" "}
                {filteredPlans.length} results
              </div>
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage - 1)}
                    >
                      &laquo;
                    </button>
                  </li>
                  {[...Array(totalPages)].map((_, i) => (
                    <li
                      key={i}
                      className={`page-item ${
                        currentPage === i + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => paginate(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage + 1)}
                    >
                      &raquo;
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanRequest ;
