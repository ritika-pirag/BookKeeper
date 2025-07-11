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
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
  FaChevronDown,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Invoice.css";
import logo from '../../../assets/newlogozirakbook.jpeg'

const Invoice = () => {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [editInvoice, setEditInvoice] = useState(null);
  const [deleteInvoice, setDeleteInvoice] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const invoices = [
    {
      invoiceNo: "INV001",
      customer: "Cart Evans",
      dueDate: "24 Dec 2024",
      amount: 1000,
      paid: 1000,
      amountDue: 0,
      status: "Paid"
    },
    {
      invoiceNo: "INV002",
      customer: "Minerva Rameriz",
      dueDate: "24 Dec 2024",
      amount: 1500,
      paid: 0,
      amountDue: 1500,
      status: "Unpaid"
    },
    {
      invoiceNo: "INV003",
      customer: "Robert Lamon",
      dueDate: "24 Dec 2024",
      amount: 1500,
      paid: 0,
      amountDue: 1500,
      status: "Unpaid"
    },
    {
      invoiceNo: "INV004",
      customer: "Patricia Lewis",
      dueDate: "24 Dec 2024",
      amount: 2000,
      paid: 1000,
      amountDue: 1000,
      status: "Overdue"
    },
    {
      invoiceNo: "INV005",
      customer: "Mark Joslyn",
      dueDate: "24 Dec 2024",
      amount: 800,
      paid: 800,
      amountDue: 0,
      status: "Paid"
    },
    {
      invoiceNo: "INV006",
      customer: "Marsha Betts",
      dueDate: "24 Dec 2024",
      amount: 750,
      paid: 0,
      amountDue: 750,
      status: "Unpaid"
    },
    {
      invoiceNo: "INV007",
      customer: "Daniel Jude",
      dueDate: "24 Dec 2024",
      amount: 1300,
      paid: 1300,
      amountDue: 0,
      status: "Paid"
    },
    {
      invoiceNo: "INV008",
      customer: "Emma Bates",
      dueDate: "24 Dec 2024",
      amount: 1100,
      paid: 1100,
      amountDue: 0,
      status: "Paid"
    },
    {
      invoiceNo: "INV009",
      customer: "Richard Fratick",
      dueDate: "24 Dec 2024",
      amount: 2300,
      paid: 2300,
      amountDue: 0,
      status: "Paid"
    },
    {
      invoiceNo: "INV010",
      customer: "Michelle Robison",
      dueDate: "24 Dec 2024",
      amount: 1700,
      paid: 1700,
      amountDue: 0,
      status: "Paid"
    }
  ];

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = invoices.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(invoices.length / rowsPerPage);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Paid":
        return "badge bg-success";
      case "Unpaid":
        return "badge bg-warning text-dark";
      case "Overdue":
        return "badge bg-danger";
      default:
        return "badge bg-secondary";
    }
  };

  // Show Edit Modal
  const handleEdit = (invoice) => {
    setEditInvoice(invoice);
  };

  // Show Delete Modal
  const handleDelete = (invoice) => {
    setDeleteInvoice(invoice);
  };

  // Confirm Delete (implement your delete logic here)
  const confirmDelete = () => {
    // ...delete logic here (e.g. API call or state update)
    setDeleteInvoice(null);
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle rows per page change
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing rows per page
  };

  return (
    <div className=" bg-light py-2 mt-1 px-2 product-header">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-4 mb-3">
        <div>
          <h5 className="fw-bold mb-1">Invoices</h5>
          <p className="text-muted mb-0">Manage your stock invoices</p>
        </div>

        <div className="d-flex align-items-center gap-2 flex-wrap">
          <button className="btn btn-light border text-danger product-btn-icon">
            <FaFilePdf />
            
          </button>
       
         
        </div>
      </div>

{/* Invoices Section */}
<div className="invoices-section mb-4 border card p-4">
  {/* Filters + Table Wrapper */}
  <div className="d-flex flex-column gap-3">
    {/* Filters */}
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center gap-3">
      {/* Search Input */}
      <div className="input-group flex-grow-1 flex-md-grow-0" style={{ minWidth: "250px" }}>
        <input 
          type="text" 
          className="form-control border-start-0" 
          placeholder="Search" 
        />
      </div>

      {/* Dropdowns */}
      <div className="d-flex flex-column flex-sm-row gap-2 flex-grow-1 flex-md-grow-0">
        {/* Customer */}
        <div className="dropdown flex-grow-1">
          <button 
            className="btn btn-grey border dropdown-toggle w-100" 
            type="button" 
            data-bs-toggle="dropdown"
          >
            Customer
          </button>
          <ul className="dropdown-menu custom-dropdown w-100">
            <li><a className="dropdown-item active-orange" href="#">Carl Evans</a></li>
            <li><a className="dropdown-item" href="#">Minerva Rameriz</a></li>
            <li><a className="dropdown-item" href="#">Robert Lamon</a></li>
            <li><a className="dropdown-item" href="#">Patricia Lewis</a></li>
          </ul>
        </div>

        {/* Status */}
        <div className="dropdown flex-grow-1">
          <button 
            className="btn btn-grey border dropdown-toggle w-100" 
            type="button" 
            data-bs-toggle="dropdown"
          >
            Status
          </button>
          <ul className="dropdown-menu custom-dropdown w-100">
            <li><a className="dropdown-item" href="#">Paid</a></li>
            <li><a className="dropdown-item" href="#">Unpaid</a></li>
            <li><a className="dropdown-item" href="#">Overdue</a></li>
          </ul>
        </div>

        {/* Sort By */}
        <div className="dropdown flex-grow-1">
          <button 
            className="btn btn-grey border dropdown-toggle w-100" 
            type="button" 
            data-bs-toggle="dropdown"
          >
            Sort By: Last 7 Days
          </button>
          <ul className="dropdown-menu custom-dropdown w-100">
            <li><a className="dropdown-item" href="#">Recently Added</a></li>
            <li><a className="dropdown-item" href="#">Price: Low to High</a></li>
            <li><a className="dropdown-item" href="#">Price: High to Low</a></li>
            <li><a className="dropdown-item" href="#">Out Of Stock</a></li>
            <li><a className="dropdown-item" href="#">Last 7 Days</a></li>
          </ul>
        </div>
      </div>
    </div>

    {/* Table */}
    <div className="table-responsive">
      <table className="table table-bordered text-center align-middle product-table mb-0">
        <thead className="table-grey text-white">
          <tr>
            <th className="py-3">Invoice No</th>
            <th  className="py-3" >Customer</th>
            <th  className="py-3">Due Date</th>
            <th  className="py-3">Amount</th>
            <th  className="py-3">Paid</th>
            <th  className="py-3">Amount Due</th>
            <th  className="py-3">Status</th>
            <th  className="py-3">  Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((invoice, idx) => (
            <tr key={idx}>
              <td>{invoice.invoiceNo}</td>
              <td>{invoice.customer}</td>
              <td>{invoice.dueDate}</td>
              <td>${invoice.amount.toFixed(2)}</td>
              <td>${invoice.paid.toFixed(2)}</td>
              <td>${invoice.amountDue.toFixed(2)}</td>
              <td>
                <span className={getStatusBadge(invoice.status)}>{invoice.status}</span>
              </td>
              <td className="d-flex justify-content-center gap-1">
                <button
                  className="btn outline-info btn-sm py-1 px-1 text-info"
                  data-bs-toggle="modal"
                  data-bs-target="#invoiceDetailModal"
                  onClick={() => setSelectedInvoice(invoice)}
                >
                  <FaEye size={16}  />
                </button>
                <button
                  className="btn outline-primary btn-sm text-danger py-2 px-1"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteInvoiceModal"
                  onClick={() => handleDelete(invoice)}
                >
                  <FaTrash  size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

      {/* Pagination */}
      {/* <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="d-flex align-items-center">
          <span className="me-2">Row Per Page</span>
          <select 
            className="form-select form-select-sm w-auto" 
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <span className="ms-2">Entries</span>
        </div>
        
        <div className="d-flex align-items-center">
          <button 
            className="btn btn-sm btn-light border mx-1" 
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
          >
            <FaChevronLeft />
          </button>
          
          <span className="mx-2">
            Page {currentPage} of {totalPages}
          </span>
          
          <button 
            className="btn btn-sm btn-light border mx-1"
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
          >
            <FaChevronRight />
          </button>
        </div>
      </div> */}

      {/* Add Invoice Modal */}
      <div
        className="modal fade"
        id="addInvoiceModal"
        tabIndex="-1"
        aria-labelledby="addInvoiceModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold" id="addInvoiceModalLabel">
                Invoice Information
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
                <div className="container-fluid">
                  <div className="row g-3">
                    {/* Invoice No */}
                    <div className="col-md-6">
                      <label className="form-label">
                        Invoice No <span className="text-danger">*</span>
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                    {/* Customer */}
                    <div className="col-md-6">
                      <label className="form-label">
                        Customer <span className="text-danger">*</span>
                      </label>
                      <select className="form-select">
                        <option>Select Customer</option>
                        <option>Cart Evans</option>
                        <option>Minerva Rameriz</option>
                        <option>Robert Lamon</option>
                        <option>Patricia Lewis</option>
                        <option>Mark Joslyn</option>
                      </select>
                    </div>
                    {/* Due Date */}
                    <div className="col-md-6">
                      <label className="form-label">
                        Due Date <span className="text-danger">*</span>
                      </label>
                      <input type="date" className="form-control" />
                    </div>
                    {/* Amount */}
                    <div className="col-md-6">
                      <label className="form-label">
                        Amount <span className="text-danger">*</span>
                      </label>
                      <input type="number" className="form-control" />
                    </div>
                    {/* Paid */}
                    <div className="col-md-6">
                      <label className="form-label">
                        Paid <span className="text-danger">*</span>
                      </label>
                      <input type="number" className="form-control" />
                    </div>
                    {/* Status */}
                    <div className="col-md-6">
                      <label className="form-label">
                        Status <span className="text-danger">*</span>
                      </label>
                      <select className="form-select">
                        <option>Paid</option>
                        <option>Unpaid</option>
                        <option>Overdue</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mt-4 d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-warning text-white">
                    Add Invoice
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
{/* Invoice Details Modal */}
<div
  className="modal fade"
  id="invoiceDetailModal"
  tabIndex="-1"
  aria-labelledby="invoiceDetailModalLabel"
  aria-hidden="true"
>
  <div className="modal-dialog modal-xl">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title fw-bold" id="invoiceDetailModalLabel">
          Invoice Details
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => setSelectedInvoice(null)}
        ></button>
      </div>
      <div className="modal-body">
        {selectedInvoice && (
          <div className="invoice-details">
       {/* Logo and Address */}
<div className="text-center mb-4">
  <img 
    src={logo}  
    alt="Company Logo" 
    style={{ 
      maxHeight: '80px', 
      maxWidth: '200px',
      marginBottom: '10px'
    }}
  />
  <p className="mb-0">3099 Kennedy Court Framingham, MA 01702</p>
</div>

            <div className="row mb-4">
              {/* From Section */}
              <div className="col-md-6">
                <h6 className="fw-bold">From</h6>
                <p className="mb-1">Thomas Lawler</p>
                <p className="mb-1">2077 Chicago Avenue Orosi, CA 93647</p>
                <p className="mb-1">Email: Tarala2445@example.com</p>
                <p className="mb-1">Phone: +1 987 654 3210</p>
              </div>

              {/* To Section */}
              <div className="col-md-6">
                <h6 className="fw-bold">To</h6>
                <p className="mb-1">{selectedInvoice.customer}</p>
                <p className="mb-1">3103 Trainer Avenue Peoria, IL 61602</p>
                <p className="mb-1">Email: Sara_inc34@example.com</p>
                <p className="mb-1">Phone: +1 987 471 6589</p>
              </div>
            </div>

            {/* Payment Status */}
            <div className="d-flex justify-content-between mb-4">
              <div>
                <h6 className="fw-bold">Payment Status</h6>
                <span className={getStatusBadge(selectedInvoice.status)}>
                  {selectedInvoice.status}
                </span>
              </div>
              <div>
                <h6 className="fw-bold">Total</h6>
                <p className="mb-1">${selectedInvoice.amount.toFixed(2)}</p>
              </div>
            </div>

            <hr />

            {/* Invoice For */}
            <h6 className="fw-bold mb-3">Invoice For: Design & development of Website</h6>

            {/* Items Table */}
            <div className="table-responsive mb-4">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Job Description</th>
                    <th>Qty</th>
                    <th>Cost</th>
                    <th>Discount</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>UX Strategy</strong></td>
                    <td>1</td>
                    <td>$500</td>
                    <td>$100</td>
                    <td>$500</td>
                  </tr>
                  <tr>
                    <td><strong>Design System</strong></td>
                    <td>1</td>
                    <td>$5000</td>
                    <td>$100</td>
                    <td>$5000</td>
                  </tr>
                  <tr>
                    <td><strong>Brand Guidelines</strong></td>
                    <td>1</td>
                    <td>$5000</td>
                    <td>$100</td>
                    <td>$5000</td>
                  </tr>
                  <tr>
                    <td><strong>Social Media Template</strong></td>
                    <td>1</td>
                    <td>$5000</td>
                    <td>$100</td>
                    <td>$5000</td>
                  </tr>
                  <tr>
                    <td colSpan="4" className="text-end"><strong>Sub Total</strong></td>
                    <td>$5500</td>
                  </tr>
                  <tr>
                    <td colSpan="4" className="text-end"><strong>Discount (0%)</strong></td>
                    <td>$400</td>
                  </tr>
                  <tr>
                    <td colSpan="4" className="text-end"><strong>VAT (5%)</strong></td>
                    <td>$54</td>
                  </tr>
                  <tr>
                    <td colSpan="4" className="text-end"><strong>Total Amount</strong></td>
                    <td><strong>${selectedInvoice.amount.toFixed(2)}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mb-4">
              <strong>Amount in Words:</strong> Dollar Five thousand Seven Seventy Five
            </p>

            <hr />

            {/* Terms and Conditions */}
            <div className="mb-4">
              <h6 className="fw-bold">Terms and Conditions</h6>
              <p>
                Please pay within 15 days from the date of invoice, overdue interest @ 14% will be charged on delayed payments.
              </p>
            </div>

            {/* Notes */}
            <div className="mb-4">
              <h6 className="fw-bold">Notes</h6>
              <p>Please quote invoice number when remitting funds.</p>
            </div>

            <hr />

            {/* Payment Method */}
            <div className="mb-4">
              <h6 className="fw-bold">Payment Made Via bank transfer / Cheque in the name of Thomas Lawler</h6>
              <p className="mb-1">Bank Name: HDFC Bank</p>
              <p className="mb-1">Account Number: 45366287987</p>
              <p className="mb-1">IFSC: HDFC0018159</p>
            </div>

            {/* Action Buttons */}
            <div className="d-flex justify-content-between">
              <button className="btn btn-light border">
                <FaPrint className="me-2" />
                Print Invoice
              </button>
              <button className="btn btn-light border">
                <FaFilePdf className="me-2" />
                Clone Invoice
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
</div>

      {/* Edit Invoice Modal */}
      <div
        className="modal fade"
        id="editInvoiceModal"
        tabIndex="-1"
        aria-labelledby="editInvoiceModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold" id="editInvoiceModalLabel">
                Edit Invoice
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setEditInvoice(null)}
              ></button>
            </div>
            <div className="modal-body">
              {editInvoice && (
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Invoice No</label>
                      <input type="text" className="form-control" defaultValue={editInvoice.invoiceNo} readOnly />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Customer</label>
                      <input type="text" className="form-control" defaultValue={editInvoice.customer} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Due Date</label>
                      <input type="text" className="form-control" defaultValue={editInvoice.dueDate} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Amount</label>
                      <input type="number" className="form-control" defaultValue={editInvoice.amount} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Paid</label>
                      <input type="number" className="form-control" defaultValue={editInvoice.paid} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Status</label>
                      <select className="form-select" defaultValue={editInvoice.status}>
                        <option>Paid</option>
                        <option>Unpaid</option>
                        <option>Overdue</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4 d-flex justify-content-end gap-2">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-warning text-white">
                      Update Invoice
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Invoice Modal */}
      <div
        className="modal fade"
        id="deleteInvoiceModal"
        tabIndex="-1"
        aria-labelledby="deleteInvoiceModalLabel"
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
              <h4 className="fw-bold mb-2">Delete Invoice</h4>
              <p className="mb-4" style={{ color: "#555", fontSize: "1.08rem" }}>
                Are you sure you want to delete this invoice record?
              </p>
              <div className="d-flex justify-content-center gap-3">
                <button
                  className="btn btn-dark px-4 py-2"
                  data-bs-dismiss="modal"
                  onClick={() => setDeleteInvoice(null)}
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

export default Invoice;