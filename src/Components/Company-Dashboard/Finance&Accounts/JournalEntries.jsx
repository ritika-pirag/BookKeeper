import React, { useState } from "react";
import {
  FaFilePdf,
  FaFileExcel,
  FaPlusCircle,
  FaSearch,
  FaEdit,
  FaTrash
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";


const JournalEntries = () => {
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [editEntry, setEditEntry] = useState(null);
  const [deleteEntry, setDeleteEntry] = useState(null);
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: "2025-06-20",
      reference: "JE-2025-001",
      description: "Purchase of raw materials",
      debitAccount: "Raw Materials",
      creditAccount: "Cash",
      amount: "$25,000",
      status: "Posted"
    },
    {
      id: 2,
      date: "2025-06-21",
      reference: "JE-2025-002",
      description: "Payment of rent",
      debitAccount: "Rent Expense",
      creditAccount: "Bank",
      amount: "$15,000",
      status: "Posted"
    },
    {
      id: 3,
      date: "2025-06-22",
      reference: "JE-2025-003",
      description: "Sales revenue",
      debitAccount: "Bank",
      creditAccount: "Sales Revenue",
      amount: "$45,000",
      status: "Posted"
    },
    {
      id: 4,
      date: "2025-06-23",
      reference: "JE-2025-004",
      description: "Salary payment",
      debitAccount: "Salary Expense",
      creditAccount: "Bank",
      amount: "$35,000",
      status: "Posted"
    },
    {
      id: 5,
      date: "2025-06-24",
      reference: "JE-2025-005",
      description: "Utility bills payment",
      debitAccount: "Utility Expense",
      creditAccount: "Cash",
      amount: "$5,000",
      status: "Posted"
    },
    {
      id: 6,
      date: "2025-06-25",
      reference: "JE-2025-006",
      description: "Purchase of packaging materials",
      debitAccount: "Packaging Materials",
      creditAccount: "Accounts Payable",
      amount: "$12,000",
      status: "Draft"
    },
    {
      id: 7,
      date: "2025-06-26",
      reference: "JE-2025-007",
      description: "GST payment",
      debitAccount: "GST Payable",
      creditAccount: "Bank",
      amount: "$8,500",
      status: "Draft"
    }
  ]);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Posted":
        return "badge bg-success";
      case "Draft":
        return "badge bg-warning text-dark";
      default:
        return "badge bg-secondary";
    }
  };

  const handleEdit = (entry) => {
    setEditEntry({...entry});
  };

  const handleDelete = (entry) => {
    setDeleteEntry(entry);
  };

  const confirmDelete = () => {
    setEntries(entries.filter(entry => entry.id !== deleteEntry.id));
    setDeleteEntry(null);
  };

  const handleAddEntry = (e) => {
    e.preventDefault();
    const form = e.target;
    const newEntry = {
      id: entries.length + 1,
      date: form.date.value,
      reference: `JE-2025-${String(entries.length + 1).padStart(3, '0')}`,
      description: form.description.value,
      debitAccount: form.debitAccount.value,
      creditAccount: form.creditAccount.value,
      amount: `$${form.amount.value}`,
      status: form.status.value
    };
    setEntries([...entries, newEntry]);
    form.reset();
    document.getElementById('addEntryModal').querySelector('.btn-close').click();
  };

  const handleUpdateEntry = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedEntry = {
      ...editEntry,
      date: form.date.value,
      description: form.description.value,
      debitAccount: form.debitAccount.value,
      creditAccount: form.creditAccount.value,
      amount: `$${form.amount.value}`,
      status: form.status.value
    };
    setEntries(entries.map(entry => entry.id === editEntry.id ? updatedEntry : entry));
    document.getElementById('editEntryModal').querySelector('.btn-close').click();
  };

  return (
    <div className="bg-light product-header py-2">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-4 mb-4">
        <div>
          <h5 className="fw-bold mb-1">Journal Entries</h5>
        </div>
      </div>

      {/* Filters */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center gap-3 mb-3">
        <div className="input-group flex-grow-1 flex-md-grow-0" style={{ minWidth: "250px" }}>
          <input type="text" className="form-control border-start-0" placeholder="Search" />
        </div>

        <div className="d-flex flex-column flex-sm-row gap-2 flex-grow-1 flex-md-grow-0 w-100 w-md-auto">
      
      

          <div className="dropdown flex-grow-2">
            <button 
              className="btn  w-100" 
              type="button" 
              style={{ backgroundColor: "#53b2a5 " }}
            >
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered align-middle mb-0">
          <thead className="table-light text-white">
            <tr>
              <th className="px-3 py-3">Date</th>
              <th>Reference</th>
              <th>Description</th>
              <th>Debit Account</th>
              <th>Credit Account</th>
              <th>Amount ($)</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td className="px-3 py-3">{formatDate(entry.date)}</td>
                <td>{entry.reference}</td>
                <td>{entry.description}</td>
                <td>{entry.debitAccount}</td>
                <td>{entry.creditAccount}</td>
                <td>{entry.amount}</td>
                <td>
                  <span className={getStatusBadge(entry.status)}>{entry.status}</span>
                </td>
                <td className="d-flex justify-content-center gap-1">
                  <button
                    className="btn btn-warning btn-sm text-white"
                    data-bs-toggle="modal"
                    data-bs-target="#editEntryModal"
                    onClick={() => handleEdit(entry)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-danger btn-sm text-white"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteEntryModal"
                    onClick={() => handleDelete(entry)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
<div className="d-flex justify-content-between align-items-center mt-3 px-3">
  <span className="small text-muted">
    Showing 1 to {entries.length} of {entries.length} results
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

      {/* Add Entry Modal */}
      <div className="modal fade" id="addEntryModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold">Add Journal Entry</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAddEntry}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Date <span className="text-danger">*</span></label>
                  <input 
                    type="date" 
                    className="form-control" 
                    name="date"
                    required 
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Description <span className="text-danger">*</span></label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="description"
                    required 
                  />
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Debit Account <span className="text-danger">*</span></label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="debitAccount"
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Credit Account <span className="text-danger">*</span></label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="creditAccount"
                      required 
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Amount ($) <span className="text-danger">*</span></label>
                  <input 
                    type="number" 
                    className="form-control" 
                    name="amount"
                    min="0"
                    step="0.01"
                    required 
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Status</label>
                  <select className="form-select" name="status">
                    <option value="Posted">Posted</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>

                <div className="d-flex justify-content-end gap-3 mt-4">
                  <button type="button" className="btn btn-outline-secondary px-4" data-bs-dismiss="modal">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-warning text-white px-4" style={{ backgroundColor: "#FFA646" }}>
                    Add Entry
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Entry Modal */}
      <div className="modal fade" id="editEntryModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold">Edit Entry</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {editEntry && (
                <form onSubmit={handleUpdateEntry}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Date <span className="text-danger">*</span></label>
                    <input 
                      type="date" 
                      className="form-control" 
                      name="date"
                      defaultValue={editEntry.date}
                      required 
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Description <span className="text-danger">*</span></label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="description"
                      defaultValue={editEntry.description}
                      required 
                    />
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Debit Account <span className="text-danger">*</span></label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="debitAccount"
                        defaultValue={editEntry.debitAccount}
                        required 
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Credit Account <span className="text-danger">*</span></label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="creditAccount"
                        defaultValue={editEntry.creditAccount}
                        required 
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Amount ($) <span className="text-danger">*</span></label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="amount"
                      defaultValue={editEntry.amount.replace('$', '')}
                      required 
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Status <span className="text-danger">*</span></label>
                    <select className="form-select" name="status" defaultValue={editEntry.status} required>
                      <option value="Posted">Posted</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>

                  <div className="d-flex justify-content-end gap-3 mt-4">
                    <button type="button" className="btn btn-outline-secondary px-4" data-bs-dismiss="modal">
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-warning text-white px-4" style={{ backgroundColor: "#FFA646" }}>
                      Save Changes
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Entry Modal */}
      <div className="modal fade" id="deleteEntryModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0" style={{ borderRadius: "16px" }}>
            <div className="modal-body text-center py-4">
              <div className="mx-auto mb-3 d-flex align-items-center justify-content-center" 
                   style={{ width: "70px", height: "70px", background: "#FFF5F2", borderRadius: "50%" }}>
                <FaTrash size={32} color="#F04438" />
              </div>
              <h4 className="fw-bold mb-2">Delete Entry</h4>
              <p className="mb-4" style={{ color: "#555", fontSize: "1.08rem" }}>
                Are you sure you want to delete this entry?
              </p>
              <div className="d-flex justify-content-center gap-3">
                <button className="btn btn-dark px-4 py-2" data-bs-dismiss="modal">
                  No, Cancel
                </button>
                <button 
                  className="btn px-4 py-2" 
                  style={{ background: "#FFA646", color: "#fff", fontWeight: "600" }}
                  onClick={confirmDelete}
                  data-bs-dismiss="modal"
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

export default JournalEntries;