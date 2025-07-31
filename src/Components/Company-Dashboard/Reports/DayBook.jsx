import React, { useState } from "react";
import {
  FaFilePdf,
  FaFileExcel,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Daybook.css";

const Daybook = () => {
  const [entries, setEntries] = useState([
    {
      id: 1,
      voucherDate: "2024-12-24",
      voucherNo: "VCH-001",
      voucherType: "Payment",
      debit: "Electricity Expense",
      credit: "Bank A/C",
      debitAmount: 500,
      creditAmount: 500,
    },
    {
      id: 2,
      voucherDate: "2024-12-26",
      voucherNo: "VCH-002",
      voucherType: "Receipt",
      debit: "Bank A/C",
      credit: "Client Payment",
      debitAmount: 700,
      creditAmount: 700,
    },
    {
      id: 3,
      voucherDate: "2025-01-05",
      voucherNo: "VCH-003",
      voucherType: "Journal",
      debit: "Salaries Expense",
      credit: "Cash",
      debitAmount: 1500,
      creditAmount: 1500,
    },
    {
      id: 4,
      voucherDate: "2025-01-07",
      voucherNo: "VCH-004",
      voucherType: "Contra",
      debit: "Cash",
      credit: "Bank A/C",
      debitAmount: 1000,
      creditAmount: 1000,
    },
    {
      id: 5,
      voucherDate: "2025-01-10",
      voucherNo: "VCH-005",
      voucherType: "Payment",
      debit: "Office Supplies",
      credit: "Cash",
      debitAmount: 250,
      creditAmount: 250,
    },
    {
      id: 6,
      voucherDate: "2025-01-12",
      voucherNo: "VCH-006",
      voucherType: "Receipt",
      debit: "Bank A/C",
      credit: "Customer A",
      debitAmount: 900,
      creditAmount: 900,
    },
    {
      id: 7,
      voucherDate: "2025-01-15",
      voucherNo: "VCH-007",
      voucherType: "Journal",
      debit: "Depreciation",
      credit: "Equipment",
      debitAmount: 400,
      creditAmount: 400,
    },
    {
      id: 8,
      voucherDate: "2025-01-18",
      voucherNo: "VCH-008",
      voucherType: "Payment",
      debit: "Rent Expense",
      credit: "Bank A/C",
      debitAmount: 1200,
      creditAmount: 1200,
    },
    {
      id: 9,
      voucherDate: "2025-01-20",
      voucherNo: "VCH-009",
      voucherType: "Receipt",
      debit: "Bank A/C",
      credit: "Interest Income",
      debitAmount: 300,
      creditAmount: 300,
    },
    {
      id: 10,
      voucherDate: "2025-01-22",
      voucherNo: "VCH-010",
      voucherType: "Contra",
      debit: "Bank B",
      credit: "Bank A/C",
      debitAmount: 2000,
      creditAmount: 2000,
    },
  ]);

  const [editEntry, setEditEntry] = useState(null);
  const [deleteEntry, setDeleteEntry] = useState(null);

  // Filters
  const [voucherTypeFilter, setVoucherTypeFilter] = useState("");
  const [dateFromFilter, setDateFromFilter] = useState("");
  const [dateToFilter, setDateToFilter] = useState("");
  const [minAmountFilter, setMinAmountFilter] = useState("");
  const [maxAmountFilter, setMaxAmountFilter] = useState("");

  const filteredEntries = entries.filter((entry) => {
    const isVoucherTypeMatch =
      !voucherTypeFilter || entry.voucherType === voucherTypeFilter;
    const isDateInRange =
      (!dateFromFilter || entry.voucherDate >= dateFromFilter) &&
      (!dateToFilter || entry.voucherDate <= dateToFilter);
    const isAmountInRange =
      (!minAmountFilter || entry.debitAmount >= parseFloat(minAmountFilter)) &&
      (!maxAmountFilter || entry.debitAmount <= parseFloat(maxAmountFilter));
    return isVoucherTypeMatch && isDateInRange && isAmountInRange;
  });

  const handleAddEntry = (e) => {
    e.preventDefault();
    const form = e.target;
    const newEntry = {
      id: entries.length + 1,
      voucherDate: form.voucherDate.value,
      voucherNo: form.voucherNo.value,
      voucherType: form.voucherType.value,
      debit: form.debit.value,
      credit: form.credit.value,
      debitAmount: parseFloat(form.debitAmount.value),
      creditAmount: parseFloat(form.creditAmount.value),
    };
    setEntries([...entries, newEntry]);
    form.reset();
    document.getElementById("addEntryModal").querySelector(".btn-close").click();
  };

  const handleEdit = (entry) => setEditEntry({ ...entry });

  const handleUpdateEntry = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedEntry = {
      ...editEntry,
      voucherDate: form.voucherDate.value,
      voucherNo: form.voucherNo.value,
      voucherType: form.voucherType.value,
      debit: form.debit.value,
      credit: form.credit.value,
      debitAmount: parseFloat(form.debitAmount.value),
      creditAmount: parseFloat(form.creditAmount.value),
    };
    setEntries(entries.map((entry) => (entry.id === editEntry.id ? updatedEntry : entry)));
    document.getElementById("editEntryModal").querySelector(".btn-close").click();
  };

  const handleDelete = (entry) => setDeleteEntry(entry);
  const confirmDelete = () => {
    setEntries(entries.filter((entry) => entry.id !== deleteEntry.id));
    setDeleteEntry(null);
  };

  return (
    <div className="container-fluid bg-light py-4 px-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="fw-bold mb-1">DayBook</h5>
          <p className="text-muted mb-0">Manage Your Vouchers</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-light border text-danger"><FaFilePdf /></button>
          <button className="btn btn-light border text-success"><FaFileExcel /></button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="row mb-3" style={{ gap: "10px" }}>
        <div className="col-md-auto">
          <select
            className="form-select"
            value={voucherTypeFilter}
            onChange={(e) => setVoucherTypeFilter(e.target.value)}
            style={{ minWidth: "140px" }}
          >
            <option value="">All Voucher Types</option>
            <option value="Payment">Payment</option>
            <option value="Receipt">Receipt</option>
            <option value="Journal">Journal</option>
            <option value="Contra">Contra</option>
          </select>
        </div>
        <div className="col-md-auto">
          <input
            type="date"
            className="form-control"
            value={dateFromFilter}
            onChange={(e) => setDateFromFilter(e.target.value)}
            placeholder="From Date"
          />
        </div>
        <div className="col-md-auto">
          <input
            type="date"
            className="form-control"
            value={dateToFilter}
            onChange={(e) => setDateToFilter(e.target.value)}
            placeholder="To Date"
          />
        </div>
        <div className="col-md-auto">
          <input
            type="number"
            className="form-control"
            placeholder="Min Amount"
            value={minAmountFilter}
            onChange={(e) => setMinAmountFilter(e.target.value)}
          />
        </div>
        <div className="col-md-auto">
          <input
            type="number"
            className="form-control"
            placeholder="Max Amount"
            value={maxAmountFilter}
            onChange={(e) => setMaxAmountFilter(e.target.value)}
          />
        </div>
      </div>

{/* Table */}
<div className="table-responsive">
  <table className="table table-bordered align-middle">
    <thead className="table-light">
      <tr>
        <th>Voucher Date</th>
        <th>Voucher No</th>
        <th>Voucher Type</th>
        <th>Debit</th>
        <th>Credit</th>
        <th>Debit Amount</th>
        <th>Credit Amount</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {filteredEntries.length > 0 ? (
        filteredEntries.map((entry) => (
          <tr key={entry.id}>
            <td>{entry.voucherDate}</td>
            <td>{entry.voucherNo}</td>
            <td>{entry.voucherType}</td>
            <td>{entry.debit}</td>
            <td>{entry.credit}</td>
            <td>${entry.debitAmount}</td>
            <td>${entry.creditAmount}</td>
            <td className="d-flex gap-2 justify-content-center">
              <button
                className="btn btn-sm text-warning"
                data-bs-toggle="modal"
                data-bs-target="#editEntryModal"
                onClick={() => handleEdit(entry)}
              >
                <FaEdit size={16} />
              </button>
              <button
                className="btn btn-sm text-danger"
                data-bs-toggle="modal"
                data-bs-target="#deleteEntryModal"
                onClick={() => handleDelete(entry)}
              >
                <FaTrash size={16} />
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="8" className="text-center">
            No records found
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

{/* Static Pagination UI */}
<div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
  <small className="text-muted ms-2">
    Showing 1 to {filteredEntries.length} of {filteredEntries.length} entries
  </small>
  <nav>
    <ul className="pagination mb-0">
      <li className="page-item disabled">
        <button className="page-link">&laquo;</button>
      </li>
      <li className="page-item active">
        <button className="page-link">1</button>
      </li>
      <li className="page-item">
        <button className="page-link">2</button>
      </li>
      <li className="page-item">
        <button className="page-link">&raquo;</button>
      </li>
    </ul>
  </nav>
</div>


      {/* Pagination & Modals remain unchanged below this point */}
      {/* ... Keep your Add, Edit, and Delete modals from previous code ... */}
    </div>
  );
};

export default Daybook;
