import React, { useState } from "react";
import {
  FaFilePdf,
  FaFileExcel,
  FaPlusCircle,
  FaDownload,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaPrint,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Expenses = () => {
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [editExpense, setEditExpense] = useState(null);
  const [deleteExpense, setDeleteExpense] = useState(null);

  const expenses = [
    {
      date: "3 Sep 2035",
      expenseAccount: "delectus",
      reference: "REF-001",
      vendorName: "Vendor A",
      paidThrough: "Bank Transfer",
      customerName: "Customer X",
      status: "Paid",
      amount: " 222.01"
    },
    {
      date: "2 Dec 2031",
      expenseAccount: "accusantium",
      reference: "REF-002",
      vendorName: "Vendor B",
      paidThrough: "Credit Card",
      customerName: "Customer Y",
      status: "Pending",
      amount: " 3182.56"
    },
    {
      date: "10 Nov 2031",
      expenseAccount: "deserunt",
      reference: "REF-003",
      vendorName: "Vendor C",
      paidThrough: "PayPal",
      customerName: "Customer Z",
      status: "Paid",
      amount: "4814.85"
    },
    {
      date: "27 Nov 2031",
      expenseAccount: "aut",
      reference: "REF-004",
      vendorName: "Vendor D",
      paidThrough: "Bank Transfer",
      customerName: "Customer W",
      status: "Rejected",
      amount: "4557.35"
    },
    {
      date: "15 Jan 2032",
      expenseAccount: "dummy",
      reference: "REF-005",
      vendorName: "Vendor E",
      paidThrough: "Cash",
      customerName: "Customer V",
      status: "Paid",
      amount: " 1200.00"
    },
    {
      date: "22 Feb 2032",
      expenseAccount: "example",
      reference: "REF-006",
      vendorName: "Vendor F",
      paidThrough: "Credit Card",
      customerName: "Customer U",
      status: "Pending",
      amount: " 750.50"
    },
    {
      date: "5 Mar 2032",
      expenseAccount: "test",
      reference: "REF-007",
      vendorName: "Vendor G",
      paidThrough: "Bank Transfer",
      customerName: "Customer T",
      status: "Paid",
      amount: " 3200.00"
    },
    {
      date: "18 Apr 2032",
      expenseAccount: "sample",
      reference: "REF-008",
      vendorName: "Vendor H",
      paidThrough: "PayPal",
      customerName: "Customer S",
      status: "Rejected",
      amount: " 1890.25"
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Paid":
        return "badge bg-success";
      case "Pending":
        return "badge bg-warning text-dark";
      case "Rejected":
        return "badge bg-danger";
      default:
        return "badge bg-secondary";
    }
  };

  // Show Edit Modal
  const handleEdit = (expense) => {
    setEditExpense(expense);
  };

  // Show Delete Modal
  const handleDelete = (expense) => {
    setDeleteExpense(expense);
  };

  // Confirm Delete
  const confirmDelete = () => {
    // ...delete logic here (e.g. API call or state update)
    setDeleteExpense(null);
  };

  return (
    <div className=" bg-light py-2 mt-1 product-header">
      {/* Header */}
      <div className="d-flex justify-content-between gap-4 mb-4">
        <div>
          <h5 className="fw-bold mb-1">Expense</h5>
          <p className="text-muted mb-0">Manage your Expense</p>
        </div>

        <div className="d-flex align-items-center gap-2 flex-wrap">
          <button className="btn btn-light border text-danger coupon-btn-icon">
            <FaFilePdf />
          </button>
          <button className="btn btn-light border text-success coupon-btn-icon">
            <FaFileExcel />
          </button>
          <button
            className="btn text-white d-flex align-items-center gap-2"
            style={{ backgroundColor: "#3daaaa" }}
            data-bs-toggle="modal"
            data-bs-target="#addExpenseModal"
          >
            <FaPlusCircle />
            Add Expenses
          </button>
        </div>
      </div>

      {/* Filters - Mobile Responsive */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center gap-3 mb-3">
        {/* Search Input - Full width on mobile, auto width on larger screens */}
        <div className="input-group flex-grow-1 flex-md-grow-0" style={{ minWidth: "250px" }}>
          <input 
            type="text" 
            className="form-control border-start-0" 
            placeholder="Search" 
          />
        </div>

        {/* Dropdowns - Stack vertically on small screens, horizontally on larger ones */}
        <div className="d-flex flex-column flex-sm-row gap-2 flex-grow-1 flex-md-grow-0 w-100 w-md-auto">
          {/* Expense Account Dropdown */}
     <div className="dropdown flex-grow-1 mb-2 mb-sm-0">
  <button
    className="btn text-white border dropdown-toggle w-100"
    type="button"
    id="accountDropdown"
    data-bs-toggle="dropdown"
    aria-expanded="false"
    style={{ backgroundColor: "#3daaaa", color: "white" }}
  >
    Expense Account
  </button>
  <ul className="dropdown-menu w-100" aria-labelledby="accountDropdown">
    {["All", "delectus", "accusantium", "deserunt", "aut"].map((item, index) => (
      <li key={index}>
        <a
          className="dropdown-item"
          href="#"
          style={{ color: "#3daaaa" }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#3daaaa";
            e.target.style.color = "white";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "";
            e.target.style.color = "#3daaaa";
          }}
        >
          {item}
        </a>
      </li>
    ))}
  </ul>
</div>


          {/* Status Dropdown */}
        <div className="dropdown flex-grow-1 mb-2 mb-sm-0">
  <button
    className="btn text-white border dropdown-toggle w-100"
    type="button"
    id="statusDropdown"
    data-bs-toggle="dropdown"
    aria-expanded="false"
    style={{ backgroundColor: "#3daaaa", color: "white" }}
  >
    Status
  </button>
  <ul className="dropdown-menu w-100" aria-labelledby="statusDropdown">
    {["All", "Paid", "Pending", "Rejected"].map((item, index) => (
      <li key={index}>
        <a
          className="dropdown-item"
          href="#"
          style={{ color: "#3daaaa" }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#3daaaa";
            e.target.style.color = "white";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "";
            e.target.style.color = "#3daaaa";
          }}
        >
          {item}
        </a>
      </li>
    ))}
  </ul>
</div>


          {/* Sort By Dropdown */}
        <div className="dropdown flex-grow-1 mb-2 mb-sm-0">
  <button
    className="btn text-white border dropdown-toggle w-100"
    type="button"
    id="sortDropdown"
    data-bs-toggle="dropdown"
    aria-expanded="false"
    style={{ backgroundColor: "#3daaaa", color: "white" }}
  >
    Sort By: Date
  </button>
  <ul className="dropdown-menu w-120" aria-labelledby="sortDropdown">
    {["Date", "Amount (High to Low)", "Amount (Low to High)", "Vendor Name"].map((item, index) => (
      <li key={index}>
        <a
          className="dropdown-item"
          href="#"
          style={{ color: "#3daaaa" }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#3daaaa";
            e.target.style.color = "white";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "";
            e.target.style.color = "#3daaaa";
          }}
        >
          {item}
        </a>
      </li>
    ))}
  </ul>
</div>

        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered text-center align-middle product-table mb-0">
          <thead className="table-light text-white">
            <tr>
              <th className="py-3">DATE</th>
              <th className="py-3">EXPENSE ACCOUNT</th>
              <th className="py-3">REFERENCE#</th>
              <th className="py-3">VENDOR NAME</th>
              <th className="py-3">PAID THROUGH</th>
              <th className="py-3">CUSTOMER NAME</th>
              <th className="py-3">STATUS</th>
              <th className="py-3">AMOUNT</th>
              <th className="py-3">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, idx) => (
              <tr key={idx}>
                <td>{expense.date}</td>
                <td>{expense.expenseAccount}</td>
                <td>{expense.reference}</td>
                <td>{expense.vendorName}</td>
                <td>{expense.paidThrough}</td>
                <td>{expense.customerName}</td>
                <td>
                  <span className={getStatusBadge(expense.status)}>{expense.status}</span>
                </td>
                <td>{expense.amount}</td>
                <td className="d-flex justify-content-center gap-1">
                  <button
                    className="btn outlin-info btn-sm  text-info"
                    data-bs-toggle="modal"
                    data-bs-target="#expenseDetailModal"
                    onClick={() => setSelectedExpense(expense)}
                  >
                    <FaEye  size={16}/>
                  </button>
                  <button
                    className="btn outline-warning btn-sm text-warning "
                    data-bs-toggle="modal"
                    data-bs-target="#editExpenseModal"
                    onClick={() => handleEdit(expense)}
                  >
                    <FaEdit size={16} />
                  </button>
                  <button
                    className="btn outline-danger btn-sm text-danger "
                    data-bs-toggle="modal"
                    data-bs-target="#deleteExpenseModal"
                    onClick={() => handleDelete(expense)}
                  >
                    <FaTrash size={16}/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
{/* Pagination UI */}
<div className="d-flex justify-content-between align-items-center mt-3 px-3 flex-wrap">
  <span className="small text-muted">Showing 1 to 5 of 10 results</span>
  <nav>
    <ul className="pagination pagination-sm mb-0 mt-2 mt-md-0">
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
      {/* Add Expense Modal */}
      <div
        className="modal fade"
        id="addExpenseModal"
        tabIndex="-1"
        aria-labelledby="addExpenseModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold" id="addExpenseModalLabel">
                Add Expense
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Date <span className="text-danger">*</span>
                  </label>
                  <input 
                    type="date" 
                    className="form-control" 
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Expense Account <span className="text-danger">*</span>
                  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter expense account" 
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Reference Number <span className="text-danger">*</span>
                  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter reference number" 
                  />
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Vendor Name <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Enter vendor name" 
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Paid Through <span className="text-danger">*</span>
                    </label>
                    <select className="form-select">
                      <option>Select payment method</option>
                      <option>Bank Transfer</option>
                      <option>Credit Card</option>
                      <option>PayPal</option>
                      <option>Cash</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Customer Name
                  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter customer name" 
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Amount <span className="text-danger">*</span>
                  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter amount" 
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Status</label>
                  <select className="form-select">
                    <option>Paid</option>
                    <option>Pending</option>
                    <option>Rejected</option>
                  </select>
                </div>

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
                    style={{ backgroundColor: "#3daaaa", borderColor : "#3daaaa"  }}
                  >
                    Add Expense
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Expense Details Modal */}
      <div
        className="modal fade"
        id="expenseDetailModal"
        tabIndex="-1"
        aria-labelledby="expenseDetailModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold" id="expenseDetailModalLabel">
                Expense Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setSelectedExpense(null)}
              ></button>
            </div>
            <div className="modal-body">
              {selectedExpense && (
                <div className="table-responsive">
                  <table className="table table-bordered mb-0">
                    <tbody>
                      <tr>
                        <td className="fw-semibold">Date</td>
                        <td>{selectedExpense.date}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Expense Account</td>
                        <td>{selectedExpense.expenseAccount}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Reference Number</td>
                        <td>{selectedExpense.reference}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Vendor Name</td>
                        <td>{selectedExpense.vendorName}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Paid Through</td>
                        <td>{selectedExpense.paidThrough}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Customer Name</td>
                        <td>{selectedExpense.customerName}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Status</td>
                        <td>{selectedExpense.status}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Amount</td>
                        <td>{selectedExpense.amount}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Expense Modal */}
      <div
        className="modal fade"
        id="editExpenseModal"
        tabIndex="-1"
        aria-labelledby="editExpenseModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold" id="editExpenseModalLabel">
                Edit Expense
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setEditExpense(null)}
              ></button>
            </div>
            <div className="modal-body">
              {editExpense && (
                <form>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Date <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="date" 
                      className="form-control" 
                      defaultValue={editExpense.date}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Expense Account <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      defaultValue={editExpense.expenseAccount}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Reference Number <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      defaultValue={editExpense.reference}
                    />
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Vendor Name <span className="text-danger">*</span>
                      </label>
                      <input 
                        type="text" 
                        className="form-control" 
                        defaultValue={editExpense.vendorName}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Paid Through <span className="text-danger">*</span>
                      </label>
                      <select className="form-select" defaultValue={editExpense.paidThrough}>
                        <option>Bank Transfer</option>
                        <option>Credit Card</option>
                        <option>PayPal</option>
                        <option>Cash</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Customer Name
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      defaultValue={editExpense.customerName}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Amount <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      defaultValue={editExpense.amount}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Status</label>
                    <select className="form-select" defaultValue={editExpense.status}>
                      <option>Paid</option>
                      <option>Pending</option>
                      <option>Rejected</option>
                    </select>
                  </div>

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
                      className="btn btn- text-white px-4"
                      style={{ backgroundColor: "#3daaaa" }}
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

      {/* Delete Expense Modal */}
      <div
        className="modal fade"
        id="deleteExpenseModal"
        tabIndex="-1"
        aria-labelledby="deleteExpenseModalLabel"
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
              <h4 className="fw-bold mb-2">Delete Expense</h4>
              <p className="mb-4" style={{ color: "#555", fontSize: "1.08rem" }}>
                Are you sure you want to delete this expense?
              </p>
              <div className="d-flex justify-content-center gap-3">
                <button
                  className="btn btn-dark px-4 py-2"
                  data-bs-dismiss="modal"
                  onClick={() => setDeleteExpense(null)}
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

export default Expenses;