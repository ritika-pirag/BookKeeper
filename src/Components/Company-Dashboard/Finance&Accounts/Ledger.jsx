import React, { useState } from "react";
import { FaEye, FaPrint } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Ledger = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchText, setSearchText] = useState("");

  const transactions = [
    {
      date: "2025-06-20",
      type: "Invoice",
      reference: "INV-2025-001",
      amount: "50,000",
      balance: "50,000",
      dueDate: "2025-07-20",
      status: "Unpaid",
    },
    {
      date: "2025-06-15",
      type: "Invoice",
      reference: "INV-2025-002",
      amount: "75,000",
      balance: "75,000",
      dueDate: "2025-07-15",
      status: "Unpaid",
    },
    {
      date: "2025-06-10",
      type: "Payment",
      reference: "PAY-2025-001",
      amount: "-35,000",
      balance: "-35,000",
      dueDate: "2025-06-10",
      status: "Completed",
    },
    {
      date: "2025-06-05",
      type: "Invoice",
      reference: "INV-2025-003",
      amount: "45,000",
      balance: "45,000",
      dueDate: "2025-07-05",
      status: "Partially Paid",
    },
    {
      date: "2025-06-01",
      type: "Credit Note",
      reference: "CN-2025-001",
      amount: "-10,000",
      balance: "-10,000",
      dueDate: "2025-06-01",
      status: "Completed",
    },
    {
      date: "2025-05-25",
      type: "Invoice",
      reference: "INV-2025-004",
      amount: "60,000",
      balance: "0",
      dueDate: "2025-06-25",
      status: "Paid",
    },
  ];

  const filteredTransactions = transactions.filter((t) => {
    const tDate = new Date(t.date);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    const matchesDate = (!from || tDate >= from) && (!to || tDate <= to);

    const s = searchText.toLowerCase();
    const matchesSearch =
      t.reference.toLowerCase().includes(s) ||
      t.type.toLowerCase().includes(s) ||
      t.amount.toLowerCase().includes(s) ||
      t.balance.toLowerCase().includes(s) ||
      t.status.toLowerCase().includes(s);

    return matchesDate && matchesSearch;
  });

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

  return (
    <div className="mt-3 p-2">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-4 mb-3">
        <div>
          <h5 className="fw-bold mb-1">Ledger Transactions</h5>
          <p className="text-muted mb-0">Manage your ledger transactions</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="d-flex flex-wrap gap-3 mb-3 align-items-end">
        <div>
          <label className="form-label mb-1">From Date</label>
          <input
            type="date"
            className="form-control"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        {/* <div>
          <label className="form-label mb-1">To Date</label>
          <input
            type="date"
            className="form-control"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div> */}
        <div className="flex-grow-1">
          <label className="form-label mb-1">Search</label>
          <input
            type="text"
            className="form-control"
            placeholder="Search by reference, type, amount..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
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
              <th className="py-3">Amount</th>
              <th className="py-3">Balance</th>
              <th className="py-3">Due Date</th>
              <th className="py-3">Status</th>
              <th className="py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction, idx) => (
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
                      className="btn outline-info btn-sm py-1 px-1 text-info"
                      data-bs-toggle="modal"
                      data-bs-target="#transactionDetailModal"
                      onClick={() => setSelectedTransaction(transaction)}
                    >
                      <FaEye size={16} />
                    </button>
                    <button className="btn outline-primary btn-sm text-warning py-1 px-1">
                      <FaPrint size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-3">
                  No transactions found for selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination - static for now */}
      <div className="d-flex justify-content-between align-items-center mt-3 px-3">
        <span className="small text-muted">
          Showing 1 to {filteredTransactions.length} of {filteredTransactions.length} results
        </span>
        <nav>
          <ul className="pagination pagination-sm mb-0">
            <li className="page-item disabled">
              <button className="page-link rounded-start">&laquo;</button>
            </li>
            <li className="page-item active">
              <button
                className="page-link"
                style={{ backgroundColor: "#3daaaa", borderColor: "#3daaaa" }}
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

      {/* Transaction Detail Modal */}
      <div
        className="modal fade"
        id="transactionDetailModal"
        tabIndex="-1"
        aria-labelledby="transactionDetailModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
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
            <div className="modal-body p-0">
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
    </div>
  );
};

export default Ledger;
