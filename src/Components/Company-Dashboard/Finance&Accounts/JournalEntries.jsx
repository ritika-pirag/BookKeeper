import React, { useState, useMemo } from "react"; // Added useMemo import
import {
  FaFilePdf,
  FaFileExcel,
  FaPlusCircle,
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
    // ... (your existing entries array remains the same)
    {
      id: 1,
      date: "2025-06-20",
      reference: "JE-2025-001",
      description: "Purchase of raw materials",
      debitAccount: "Raw Materials",
      creditAccount: "Cash",
      amount: "$25000",
      status: "Posted"
    },
    {
      id: 2,
      date: "2025-06-21",
      reference: "JE-2025-002",
      description: "Payment of rent",
      debitAccount: "Rent Expense",
      creditAccount: "Bank",
      amount: "$15000",
      status: "Posted"
    },
    {
      id: 3,
      date: "2025-06-22",
      reference: "JE-2025-003",
      description: "Sales revenue",
      debitAccount: "Bank",
      creditAccount: "Sales Revenue",
      amount: "$45000",
      status: "Posted"
    },
    {
      id: 4,
      date: "2025-06-23",
      reference: "JE-2025-004",
      description: "Salary payment",
      debitAccount: "Salary Expense",
      creditAccount: "Bank",
      amount: "$35000",
      status: "Posted"
    }
  ]);

  // State for filter values
  const [filterDate, setFilterDate] = useState("");
  const [filterAmount, setFilterAmount] = useState("");

  // Filter entries based on date and amount
  const filteredEntries = useMemo(() => {
    return entries.filter(entry => {
      const matchesDate = filterDate ? entry.date === filterDate : true;
      // Remove dollar sign and convert amount to number for comparison
      const entryAmount = parseFloat(entry.amount.replace('$', '')) || 0;
      const filterAmountValue = parseFloat(filterAmount) || 0;
      const matchesAmount = filterAmount ? entryAmount === filterAmountValue : true;

      return matchesDate && matchesAmount;
    });
  }, [entries, filterDate, filterAmount]); // Recalculate when entries or filters change

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

  const handleEdit = (entry) => setEditEntry({ ...entry });
  const handleDelete = (entry) => setDeleteEntry(entry);

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
    document.getElementById("addEntryModal")?.querySelector(".btn-close")?.click(); // Added optional chaining
  };

  // Function to clear filters
  const clearFilters = () => {
    setFilterDate("");
    setFilterAmount("");
  };

  return (
    <div className="bg-light p-4 mt-2">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-4 mb-4">
        <div>
          <h5 className="fw-bold mb-1">Journal Entries</h5>
          <p className="text-muted">Manage your journal entries here.</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-success d-flex align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#addEntryModal">
            <FaPlusCircle />
            Add Entry
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="row mb-3">
        <div className="col-md-4 mb-2">
          <label htmlFor="filterDate" className="form-label">Filter by Date:</label>
          <input
            type="date"
            id="filterDate"
            className="form-control"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
        <div className="col-md-4 mb-2">
          <label htmlFor="filterAmount" className="form-label">Filter by Amount:</label>
          <input
            type="number"
            id="filterAmount"
            className="form-control"
            placeholder="Enter amount"
            value={filterAmount}
            onChange={(e) => setFilterAmount(e.target.value)}
            min="0"
            step="0.01"
          />
        </div>
        <div className="col-md-4 d-flex align-items-end mb-2">
          <button className="btn btn-outline-secondary" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-light text-white bg-secondary">
            <tr>
              <th>Date</th>
              <th>Reference</th>
              <th>Description</th>
              <th>Debit Account</th>
              <th>Credit Account</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Use filteredEntries instead of entries */}
            {filteredEntries.length > 0 ? (
              filteredEntries.map((entry) => (
                <tr key={entry.id}>
                  <td>{formatDate(entry.date)}</td>
                  <td>{entry.reference}</td>
                  <td>{entry.description}</td>
                  <td>{entry.debitAccount}</td>
                  <td>{entry.creditAccount}</td>
                  <td>{entry.amount}</td>
                  <td><span className={getStatusBadge(entry.status)}>{entry.status}</span></td>
                  <td className="d-flex justify-content-center gap-1">
                    <button
                      className="btn btn-sm text-warning"
                      data-bs-toggle="modal"
                      data-bs-target="#editEntryModal"
                      onClick={() => handleEdit(entry)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm text-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteEntryModal"
                      onClick={() => handleDelete(entry)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No journal entries found matching the filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modals remain the same */}
      {/* Add Entry Modal */}
      <div className="modal fade" id="addEntryModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold">Add Journal Entry</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAddEntry}>
                <div className="mb-3">
                  <label>Date</label>
                  <input type="date" className="form-control" name="date" required />
                </div>
                <div className="mb-3">
                  <label>Description</label>
                  <input type="text" className="form-control" name="description" required />
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label>Debit Account</label>
                    <input type="text" className="form-control" name="debitAccount" required />
                  </div>
                  <div className="col">
                    <label>Credit Account</label>
                    <input type="text" className="form-control" name="creditAccount" required />
                  </div>
                </div>
                <div className="mb-3">
                  <label>Amount</label>
                  <input type="number" name="amount" className="form-control" min="0" step="0.01" required />
                </div>
                <div className="mb-3">
                  <label>Status</label>
                  <select className="form-select" name="status">
                    <option value="Posted">Posted</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
                <div className="d-flex justify-content-end gap-2">
                  <button className="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                  <button type="submit" className="btn btn-success">Add Entry</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <div className="modal fade" id="editEntryModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold">Edit Entry</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              {editEntry && (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target;
                  const updated = {
                    ...editEntry,
                    date: form.date.value,
                    description: form.description.value,
                    debitAccount: form.debitAccount.value,
                    creditAccount: form.creditAccount.value,
                    amount: `$${form.amount.value}`,
                    status: form.status.value
                  };
                  setEntries(entries.map(ent => ent.id === editEntry.id ? updated : ent));
                  document.getElementById("editEntryModal")?.querySelector(".btn-close")?.click(); // Added optional chaining
                }}>
                  <div className="mb-3">
                    <label>Date</label>
                    <input type="date" name="date" className="form-control" defaultValue={editEntry.date} required />
                  </div>
                  <div className="mb-3">
                    <label>Description</label>
                    <input type="text" name="description" className="form-control" defaultValue={editEntry.description} required />
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <label>Debit Account</label>
                      <input type="text" name="debitAccount" className="form-control" defaultValue={editEntry.debitAccount} required />
                    </div>
                    <div className="col">
                      <label>Credit Account</label>
                      <input type="text" name="creditAccount" className="form-control" defaultValue={editEntry.creditAccount} required />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label>Amount</label>
                    <input type="number" name="amount" className="form-control" defaultValue={editEntry.amount.replace('$', '')} required />
                  </div>
                  <div className="mb-3">
                    <label>Status</label>
                    <select className="form-select" name="status" defaultValue={editEntry.status}>
                      <option value="Posted">Posted</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>
                  <div className="d-flex justify-content-end gap-2">
                    <button className="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <div className="modal fade" id="deleteEntryModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content text-center p-4">
            <FaTrash size={40} className="text-danger mb-3" />
            <h5>Are you sure you want to delete?</h5>
            <div className="d-flex justify-content-center gap-3 mt-4">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button className="btn btn-danger" onClick={confirmDelete} data-bs-dismiss="modal">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalEntries;