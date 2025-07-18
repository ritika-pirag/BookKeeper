// Daybook.js
import React, { useState } from "react";
import {
  FaFilePdf,
  FaFileExcel,
  FaPlusCircle,
  FaEdit,
  FaTrash
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
      creditAmount: 500
    },
    {
      id: 2,
      voucherDate: "2024-12-26",
      voucherNo: "VCH-002",
      voucherType: "Receipt",
      debit: "Bank A/C",
      credit: "Client Payment",
      debitAmount: 700,
      creditAmount: 700
    },
    {
      id: 3,
      voucherDate: "2025-01-05",
      voucherNo: "VCH-003",
      voucherType: "Journal",
      debit: "Salaries Expense",
      credit: "Cash",
      debitAmount: 1500,
      creditAmount: 1500
    },
    {
      id: 4,
      voucherDate: "2025-01-07",
      voucherNo: "VCH-004",
      voucherType: "Contra",
      debit: "Cash",
      credit: "Bank A/C",
      debitAmount: 1000,
      creditAmount: 1000
    },
    {
      id: 5,
      voucherDate: "2025-01-10",
      voucherNo: "VCH-005",
      voucherType: "Payment",
      debit: "Office Supplies",
      credit: "Cash",
      debitAmount: 250,
      creditAmount: 250
    },
    {
      id: 6,
      voucherDate: "2025-01-12",
      voucherNo: "VCH-006",
      voucherType: "Receipt",
      debit: "Bank A/C",
      credit: "Customer A",
      debitAmount: 900,
      creditAmount: 900
    },
    {
      id: 7,
      voucherDate: "2025-01-15",
      voucherNo: "VCH-007",
      voucherType: "Journal",
      debit: "Depreciation",
      credit: "Equipment",
      debitAmount: 400,
      creditAmount: 400
    },
    {
      id: 8,
      voucherDate: "2025-01-18",
      voucherNo: "VCH-008",
      voucherType: "Payment",
      debit: "Rent Expense",
      credit: "Bank A/C",
      debitAmount: 1200,
      creditAmount: 1200
    },
    {
      id: 9,
      voucherDate: "2025-01-20",
      voucherNo: "VCH-009",
      voucherType: "Receipt",
      debit: "Bank A/C",
      credit: "Interest Income",
      debitAmount: 300,
      creditAmount: 300
    },
    {
      id: 10,
      voucherDate: "2025-01-22",
      voucherNo: "VCH-010",
      voucherType: "Contra",
      debit: "Bank B",
      credit: "Bank A/C",
      debitAmount: 2000,
      creditAmount: 2000
    }
  ]);

  const [editEntry, setEditEntry] = useState(null);
  const [deleteEntry, setDeleteEntry] = useState(null);

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
    document.getElementById('addEntryModal').querySelector('.btn-close').click();
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
    setEntries(entries.map(entry => entry.id === editEntry.id ? updatedEntry : entry));
    document.getElementById('editEntryModal').querySelector('.btn-close').click();
  };

  const handleDelete = (entry) => setDeleteEntry(entry);

  const confirmDelete = () => {
    setEntries(entries.filter(entry => entry.id !== deleteEntry.id));
    setDeleteEntry(null);
  };

  return (
    <div className="container-fluid bg-light py-4 px-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="fw-bold mb-1">DayBook</h5>
          <p className="text-muted mb-0">Manage Your Vouchers</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-light border text-danger"><FaFilePdf /></button>
          <button className="btn btn-light border text-success"><FaFileExcel /></button>
          <button className="btn text-white" style={{ backgroundColor: "#53b2a5" }} data-bs-toggle="modal" data-bs-target="#addEntryModal">
            <FaPlusCircle /> Add Voucher
          </button>
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
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.voucherDate}</td>
                <td>{entry.voucherNo}</td>
                <td>{entry.voucherType}</td>
                <td>{entry.debit}</td>
                <td>{entry.credit}</td>
                <td>${entry.debitAmount}</td>
                <td>${entry.creditAmount}</td>
                <td className="d-flex gap-2 justify-content-center">
                  <button className="btn btn-sm text-warning" data-bs-toggle="modal" data-bs-target="#editEntryModal" onClick={() => handleEdit(entry)}><FaEdit /></button>
                  <button className="btn btn-sm text-danger" data-bs-toggle="modal" data-bs-target="#deleteEntryModal" onClick={() => handleDelete(entry)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between mt-3 small text-muted">
        <span>Showing 1 to {entries.length} of {entries.length} entries</span>
        <nav>
          <ul className="pagination pagination-sm mb-0">
            <li className="page-item disabled"><button className="page-link">&laquo;</button></li>
            <li className="page-item active"><button className="page-link">1</button></li>
            <li className="page-item"><button className="page-link">2</button></li>
            <li className="page-item"><button className="page-link">&raquo;</button></li>
          </ul>
        </nav>
      </div>

      {/* Add Modal */}
      <div className="modal fade" id="addEntryModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered"><div className="modal-content">
          <div className="modal-header border-0"><h5 className="modal-title">Add Voucher</h5><button className="btn-close" data-bs-dismiss="modal"></button></div>
          <div className="modal-body">
            <form onSubmit={handleAddEntry}>
              <div className="mb-2"><label className="form-label">Voucher Date</label><input type="date" name="voucherDate" className="form-control" required /></div>
              <div className="mb-2"><label className="form-label">Voucher No</label><input type="text" name="voucherNo" className="form-control" required /></div>
              <div className="mb-2"><label className="form-label">Voucher Type</label><input type="text" name="voucherType" className="form-control" required /></div>
              <div className="mb-2"><label className="form-label">Debit</label><input type="text" name="debit" className="form-control" required /></div>
              <div className="mb-2"><label className="form-label">Credit</label><input type="text" name="credit" className="form-control" required /></div>
              <div className="mb-2"><label className="form-label">Debit Amount</label><input type="number" name="debitAmount" className="form-control" required /></div>
              <div className="mb-2"><label className="form-label">Credit Amount</label><input type="number" name="creditAmount" className="form-control" required /></div>
              <div className="d-flex justify-content-end mt-3">
                <button className="btn btn-outline-secondary me-2" data-bs-dismiss="modal">Cancel</button>
                <button className="btn text-white" style={{ backgroundColor: "#53b2a5" }}>Add</button>
              </div>
            </form>
          </div>
        </div></div>
      </div>

      {/* Edit Modal */}
      <div className="modal fade" id="editEntryModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered"><div className="modal-content">
          <div className="modal-header border-0"><h5 className="modal-title">Edit Voucher</h5><button className="btn-close" data-bs-dismiss="modal"></button></div>
          <div className="modal-body">
            {editEntry && (
              <form onSubmit={handleUpdateEntry}>
                <div className="mb-2"><label>Voucher Date</label><input type="date" name="voucherDate" className="form-control" defaultValue={editEntry.voucherDate} required /></div>
                <div className="mb-2"><label>Voucher No</label><input type="text" name="voucherNo" className="form-control" defaultValue={editEntry.voucherNo} required /></div>
                <div className="mb-2"><label>Voucher Type</label><input type="text" name="voucherType" className="form-control" defaultValue={editEntry.voucherType} required /></div>
                <div className="mb-2"><label>Debit</label><input type="text" name="debit" className="form-control" defaultValue={editEntry.debit} required /></div>
                <div className="mb-2"><label>Credit</label><input type="text" name="credit" className="form-control" defaultValue={editEntry.credit} required /></div>
                <div className="mb-2"><label>Debit Amount</label><input type="number" name="debitAmount" className="form-control" defaultValue={editEntry.debitAmount} required /></div>
                <div className="mb-2"><label>Credit Amount</label><input type="number" name="creditAmount" className="form-control" defaultValue={editEntry.creditAmount} required /></div>
                <div className="d-flex justify-content-end mt-3">
                  <button className="btn btn-outline-secondary me-2" data-bs-dismiss="modal">Cancel</button>
                  <button className="btn text-white" style={{ backgroundColor: "#3daaaa" }}>Save</button>
                </div>
              </form>
            )}
          </div>
        </div></div>
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

export default Daybook;
