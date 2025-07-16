import React, { useState } from "react";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaPrint,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Ledger = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [editTransaction, setEditTransaction] = useState(null);
  const [deleteTransaction, setDeleteTransaction] = useState(null);

  const transactions = [
    {
      date: "2025-06-20",
      type: "Invoice",
      reference: "INV-2025-001",
      amount: "50,000",
      balance: "50,000",
      dueDate: "2025-07-20",
      status: "Unpaid"
    },
    {
      date: "2025-06-15",
      type: "Invoice",
      reference: "INV-2025-002",
      amount: "75,000",
      balance: "75,000",
      dueDate: "2025-07-15",
      status: "Unpaid"
    },
    {
      date: "2025-06-10",
      type: "Payment",
      reference: "PAY-2025-001",
      amount: "-35,000",
      balance: "-35,000",
      dueDate: "2025-06-10",
      status: "Completed"
    },
    {
      date: "2025-06-05",
      type: "Invoice",
      reference: "INV-2025-003",
      amount: "45,000",
      balance: "45,000",
      dueDate: "2025-07-05",
      status: "Partially Paid"
    },
    {
      date: "2025-06-01",
      type: "Credit Note",
      reference: "CN-2025-001",
      amount: "-10,000",
      balance: "-10,000",
      dueDate: "2025-06-01",
      status: "Completed"
    },
    {
      date: "2025-05-25",
      type: "Invoice",
      reference: "INV-2025-004",
      amount: "60,000",
      balance: "0",
      dueDate: "2025-06-25",
      status: "Paid"
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Unpaid":
        return "badge bg-danger";
      case "Completed":
      case "Paid":
        return "badge bg-success";
      case "Partially Paid":
        return "badge bg-warning text-dark";
      default:
        return "badge bg-secondary";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Invoice":
        return "text-primary";
      case "Payment":
        return "text-success";
      case "Credit Note":
        return "text-danger";
      default:
        return "";
    }
  };

  const getAmountColor = (amount) => {
    return amount.startsWith("-") ? "text-danger" : "text-success";
  };

  const getBalanceColor = (balance) => {
    return balance.startsWith("-") ? "text-danger" : "text-success";
  };

//   const handleEdit = (transaction) => {
//     setEditTransaction(transaction);
//   };

  const handleDelete = (transaction) => {
    setDeleteTransaction(transaction);
  };

  const confirmDelete = () => {
    // Delete logic here
    setDeleteTransaction(null);
  };

  return (
    <div className="mt-3  p-2">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-4 mb-4">
        <div>
          <h5 className="fw-bold mb-1">Ledger Transactions</h5>
          <p className="text-muted mb-0">Manage your ledger transactions</p>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered text-center align-middle mb-0">
          <thead className="table-light text-white">
            <tr>
              <th className="py-3">Date</th>
              <th className="py-3">Type</th>
              <th className="py-3">Reference</th>
              <th className="py-3">Amount </th>
              <th className="py-3">Balance </th>
              <th className="py-3">Due Date</th>
              <th className="py-3">Status</th>
              <th className="py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, idx) => (
              <tr key={idx}>
                <td>{transaction.date}</td>
                <td className={getTypeColor(transaction.type)}>
                  {transaction.type}
                </td>
                <td>{transaction.reference}</td>
                <td className={getAmountColor(transaction.amount)}>
                  {transaction.amount}
                </td>
                <td className={getBalanceColor(transaction.balance)}>
                  {transaction.balance}
                </td>
                <td>{transaction.dueDate}</td>
                <td>
                  <span className={getStatusBadge(transaction.status)}>
                    {transaction.status}
                  </span>
                </td>
                <td className="d-flex justify-content-center gap-1">
                  <button
                    className="btn btn-light btn-sm border"
                    data-bs-toggle="modal"
                    data-bs-target="#transactionDetailModal"
                    onClick={() => setSelectedTransaction(transaction)}
                  >
                    <FaEye />
                  </button>
                  <button
                    className="btn btn-warning btn-sm text-white"
                    // data-bs-toggle="modal"
                    // data-bs-target="#editTransactionModal"
                    // onClick={() => handleEdit(transaction)}
                  >
                    <FaPrint />
                  </button>
                  {/* <button
                    className="btn btn-danger btn-sm text-white"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteTransactionModal"
                    onClick={() => handleDelete(transaction)}
                  >
                    <FaTrash />
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
<div className="d-flex justify-content-between align-items-center mt-3 px-3">
  <span className="small text-muted">
    Showing 1 to {transactions.length} of {transactions.length} results
  </span>
  <nav>
    <ul className="pagination pagination-sm mb-0">
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

      </div>

      {/* Transaction Details Modal */}
      <div
        className="modal fade"
        id="transactionDetailModal"
        tabIndex="-1"
        aria-labelledby="transactionDetailModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
          <div className="modal-header">
  <h5 className="modal-title fw-bold" id="transactionDetailModalLabel">
    Transaction Details
  </h5>
  <button 
    type="button"
    className="btn-close"
    data-bs-dismiss="modal"
    aria-label="Close"
    onClick={() => setSelectedTransaction(null)}
  ></button>
</div>
            <div className="modal-body">
              {selectedTransaction && (
                <div className="table-responsive">
                  <table className="table table-bordered mb-0">
                    <tbody>
                      <tr>
                        <td className="fw-semibold">Date</td>
                        <td>{selectedTransaction.date}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Type</td>
                        <td className={getTypeColor(selectedTransaction.type)}>
                          {selectedTransaction.type}
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Reference</td>
                        <td>{selectedTransaction.reference}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Amount</td>
                        <td className={getAmountColor(selectedTransaction.amount)}>
                          {selectedTransaction.amount}
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Balance</td>
                        <td className={getBalanceColor(selectedTransaction.balance)}>
                          {selectedTransaction.balance}
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Due Date</td>
                        <td>{selectedTransaction.dueDate}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Status</td>
                        <td>
                          <span className={getStatusBadge(selectedTransaction.status)}>
                            {selectedTransaction.status}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Transaction Modal */}
      <div
        className="modal fade"
        id="editTransactionModal"
        tabIndex="-1"
        aria-labelledby="editTransactionModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold" id="editTransactionModalLabel">
                Edit Transaction
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setEditTransaction(null)}
              ></button>
            </div>
            <div className="modal-body">
              {editTransaction && (
                <form>
                  {/* Edit form fields would go here */}
                  <div className="d-flex justify-content-end gap-3 mt-4">
                    <button
                      type="button"
                      className="btn btn-outline-secondary px-4"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-warning text-white px-4"
                      style={{ backgroundColor: "#FFA646" }}
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Transaction Modal */}
      <div
        className="modal fade"
        id="deleteTransactionModal"
        tabIndex="-1"
        aria-labelledby="deleteTransactionModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0" style={{ borderRadius: 16 }}>
            <div className="modal-body text-center py-4">
              <div
                className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                style={{
                  width: 70,
                  height: 70,
                  background: "#FFF5F2",
                  borderRadius: "50%",
                }}
              >
                <FaTrash size={32} color="#F04438" />
              </div>
              <h4 className="fw-bold mb-2">Delete Transaction</h4>
              <p className="mb-4" style={{ color: "#555", fontSize: "1.08rem" }}>
                Are you sure you want to delete this transaction?
              </p>
              <div className="d-flex justify-content-center gap-3">
                <button
                  className="btn btn-dark px-4 py-2"
                  data-bs-dismiss="modal"
                  onClick={() => setDeleteTransaction(null)}
                >
                  No, Cancel
                </button>
                <button
                  className="btn"
                  style={{ background: "#FFA646", color: "#fff", fontWeight: 600, padding: "0.5rem 2rem" }}
                  data-bs-dismiss="modal"
                  onClick={confirmDelete}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ledger;