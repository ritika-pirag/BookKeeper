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

const PaymentMode = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [editPayment, setEditPayment] = useState(null);
  const [deletePayment, setDeletePayment] = useState(null);

  const payments = [
    {
      date: "9 Jul 2025",
      paymentNumber: "77751",
      referenceNumber: "68243",
      vendorName: "Christian",
      billNumber: "34250",
      mode: "Standard Chartered Bank",
      amount: "₹584.00",
      unusedAmount: "₹545.00"
    },
    {
      date: "9 Jul 2025",
      paymentNumber: "39877",
      referenceNumber: "48818",
      vendorName: "Grayson",
      billNumber: "24330",
      mode: "Standard Chartered Bank",
      amount: "₹547.00",
      unusedAmount: "₹776.00"
    },
    {
      date: "9 Jul 2025",
      paymentNumber: "64244",
      referenceNumber: "46087",
      vendorName: "Amara",
      billNumber: "35614",
      mode: "ICICI Bank",
      amount: "₹647.00",
      unusedAmount: "₹563.00"
    },
    {
      date: "9 Jul 2025",
      paymentNumber: "13783",
      referenceNumber: "89836",
      vendorName: "Cheyenne",
      billNumber: "54491",
      mode: "Standard Chartered Bank",
      amount: "₹317.00",
      unusedAmount: "₹582.00"
    }
  ];

  // Show Edit Modal
  const handleEdit = (payment) => {
    setEditPayment(payment);
  };

  // Show Delete Modal
  const handleDelete = (payment) => {
    setDeletePayment(payment);
  };

  // Confirm Delete
  const confirmDelete = () => {
    // ...delete logic here (e.g. API call or state update)
    setDeletePayment(null);
  };

  return (
    <div className="container bg-light py-4 px-4 product-header">
      {/* Header */}
      <div className="d-flex justify-content-between gap-4 mb-4">
        <div>
          <h5 className="fw-bold mb-1">All Payments</h5>
          <p className="text-muted mb-0">Manage your payments</p>
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
            data-bs-target="#addPaymentModal"
          >
            <FaPlusCircle />
            Add Payment
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
          {/* Vendor Dropdown */}
          <div className="dropdown flex-grow-1 mb-2 mb-sm-0">
            <button 
               style={{ backgroundColor: "#3daaaa" }}
              className="btn btn-orange dropdown-toggle w-100" 
              type="button" 
              id="vendorDropdown"
              data-bs-toggle="dropdown" 
              aria-expanded="false"
            >
              Vendor
            </button>
             <ul className="dropdown-menu w-100" aria-labelledby="vendorDropdown">
    <li>
      <a
        href="#"
        className="dropdown-item"
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
        All
      </a>
    </li>
              <li><a className="dropdown-item" href="#">Christian</a></li>
              <li><a className="dropdown-item" href="#">Grayson</a></li>
              <li><a className="dropdown-item" href="#">Amara</a></li>
              <li><a className="dropdown-item" href="#">Cheyenne</a></li>
            </ul>
          </div>

          {/* Mode Dropdown */}
          <div className="dropdown flex-grow-1 mb-2 mb-sm-0">
            <button 
              style={{ backgroundColor: "#3daaaa" }}
              className="btn btn-orange dropdown-toggle w-100" 
              type="button" 
              id="modeDropdown"
              data-bs-toggle="dropdown" 
              aria-expanded="false"
            >
              Mode
            </button>
            <ul className="dropdown-menu w-150" aria-labelledby="vendorDropdown">
    <li>
      <a
        href="#"
        className="dropdown-item"
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
        All
      </a>
    </li>
              <li><a className="dropdown-item" href="#">Standard Chartered Bank</a></li>
              <li><a className="dropdown-item" href="#">ICICI Bank</a></li>
            </ul>
          </div>

          {/* Sort By Dropdown */}
          <div className="dropdown flex-grow-1">
            <button 
              style={{ backgroundColor: "#3daaaa" }}
              className="btn btn-orange dropdown-toggle w-100" 
              type="button" 
              id="sortDropdown"
              data-bs-toggle="dropdown" 
              aria-expanded="false"
            >
              Sort By: Date
            </button>
              <ul className="dropdown-menu w-120" aria-labelledby="vendorDropdown">
    <li>
      <a
        href="#"
        className="dropdown-item"
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
        Date
      </a>
    </li>
              <li><a className="dropdown-item" href="#">Amount (High to Low)</a></li>
              <li><a className="dropdown-item" href="#">Amount (Low to High)</a></li>
              <li><a className="dropdown-item" href="#">Payment Number</a></li>
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
              <th className="py-3">PAYMENT </th>
              <th className="py-3">REFERENCE</th>
              <th className="py-3">VENDOR NAME</th>
              <th className="py-3">BILL#</th>
              <th className="py-3">MODE</th>
              <th className="py-3">AMOUNT</th>
              <th className="py-3">UNUSED AMOUNT</th>
              <th className="py-3">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, idx) => (
              <tr key={idx}>
                <td>{payment.date}</td>
                <td>{payment.paymentNumber}</td>
                <td>{payment.referenceNumber}</td>
                <td>{payment.vendorName}</td>
                <td>{payment.billNumber}</td>
                <td>{payment.mode}</td>
                <td>{payment.amount}</td>
                <td>{payment.unusedAmount}</td>
                <td className="d-flex justify-content-center gap-1">
                  <button
                    className="btn outlin-info btn-sm  text-info"
                    data-bs-toggle="modal"
                    data-bs-target="#paymentDetailModal"
                    onClick={() => setSelectedPayment(payment)}
                  >
                    <FaEye size={16}/>
                  </button>
                  <button
                    className="btn outlin-warning btn-sm text-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#editPaymentModal"
                    onClick={() => handleEdit(payment)}
                  >
                    <FaEdit size={16}/>
                  </button>
                  <button
                    className="btn outline-danger btn-sm text-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#deletePaymentModal"
                    onClick={() => handleDelete(payment)}
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

      {/* Add Payment Modal */}
      <div
        className="modal fade"
        id="addPaymentModal"
        tabIndex="-1"
        aria-labelledby="addPaymentModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold" id="addPaymentModalLabel">
                Add Payment
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
                    Payment Number <span className="text-danger">*</span>
                  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter payment number" 
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

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Vendor Name <span className="text-danger">*</span>
                  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter vendor name" 
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Bill Number <span className="text-danger">*</span>
                  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter bill number" 
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Mode <span className="text-danger">*</span>
                  </label>
                  <select className="form-select">
                    <option>Select payment mode</option>
                    <option>Standard Chartered Bank</option>
                    <option>ICICI Bank</option>
                    <option>Other Bank</option>
                  </select>
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
                  <label className="form-label fw-semibold">
                    Unused Amount <span className="text-danger">*</span>
                  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter unused amount" 
                  />
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
                    style={{ backgroundColor: "#3daaaa" }}
                  >
                    Add Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Details Modal */}
      <div
        className="modal fade"
        id="paymentDetailModal"
        tabIndex="-1"
        aria-labelledby="paymentDetailModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold" id="paymentDetailModalLabel">
                Payment Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setSelectedPayment(null)}
              ></button>
            </div>
            <div className="modal-body">
              {selectedPayment && (
                <div className="table-responsive">
                  <table className="table table-bordered mb-0">
                    <tbody>
                      <tr>
                        <td className="fw-semibold">Date</td>
                        <td>{selectedPayment.date}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Payment Number</td>
                        <td>{selectedPayment.paymentNumber}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Reference Number</td>
                        <td>{selectedPayment.referenceNumber}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Vendor Name</td>
                        <td>{selectedPayment.vendorName}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Bill Number</td>
                        <td>{selectedPayment.billNumber}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Mode</td>
                        <td>{selectedPayment.mode}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Amount</td>
                        <td>{selectedPayment.amount}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Unused Amount</td>
                        <td>{selectedPayment.unusedAmount}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Payment Modal */}
      <div
        className="modal fade"
        id="editPaymentModal"
        tabIndex="-1"
        aria-labelledby="editPaymentModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold" id="editPaymentModalLabel">
                Edit Payment
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setEditPayment(null)}
              ></button>
            </div>
            <div className="modal-body">
              {editPayment && (
                <form>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Date <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="date" 
                      className="form-control" 
                      defaultValue={editPayment.date}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Payment Number <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      defaultValue={editPayment.paymentNumber}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Reference Number <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      defaultValue={editPayment.referenceNumber}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Vendor Name <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      defaultValue={editPayment.vendorName}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Bill Number <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      defaultValue={editPayment.billNumber}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Mode <span className="text-danger">*</span>
                    </label>
                    <select className="form-select" defaultValue={editPayment.mode}>
                      <option>Standard Chartered Bank</option>
                      <option>ICICI Bank</option>
                      <option>Other Bank</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Amount <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      defaultValue={editPayment.amount}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Unused Amount <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      defaultValue={editPayment.unusedAmount}
                    />
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

      {/* Delete Payment Modal */}
      <div
        className="modal fade"
        id="deletePaymentModal"
        tabIndex="-1"
        aria-labelledby="deletePaymentModalLabel"
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
              <h4 className="fw-bold mb-2">Delete Payment</h4>
              <p className="mb-4" style={{ color: "#555", fontSize: "1.08rem" }}>
                Are you sure you want to delete this payment?
              </p>
              <div className="d-flex justify-content-center gap-3">
                <button
                  className="btn btn-dark px-4 py-2"
                  data-bs-dismiss="modal"
                  onClick={() => setDeletePayment(null)}
                >
                  No, Cancel
                </button>
                <button
                  className="btn"
                  style={{ background: "#3daaaa", color: "#fff", fontWeight: 600, padding: "0.5rem 2rem" }}
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

export default PaymentMode;