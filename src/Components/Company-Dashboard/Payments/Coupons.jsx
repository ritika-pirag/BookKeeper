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
import "./Coupons.css";

const Coupons = () => {
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [editCoupon, setEditCoupon] = useState(null);
  const [deleteCoupon, setDeleteCoupon] = useState(null);

  const coupons = [
    {
      name: "New Year Blast",
      code: "NEWYEAR30",
      description: "30% off on New Year",
      type: "Percentage",
      discount: "30%",
      limit: "01",
      valid: "04 Jan 2025",
      status: "Active"
    },
    {
      name: "Christmas Cheer",
      code: "CHRISTMAS100",
      description: "$100 off holiday packages",
      type: "Fixed Amount",
      discount: "$100",
      limit: "01",
      valid: "27 Dec 2024",
      status: "Active"
    },
    {
      name: "Spooky Savings",
      code: "HALLOWEDK20",
      description: "20% off on Halloween items",
      type: "Percentage",
      discount: "20%",
      limit: "02",
      valid: "28 Nov 2024",
      status: "Active"
    },
    {
      name: "Black Friday",
      code: "BLACKFRIDAY90",
      description: "50% off electronics",
      type: "Percentage",
      discount: "50%",
      limit: "04",
      valid: "18 Nov 2024",
      status: "Better"
    },
    {
      name: "Golden Years Deal",
      code: "SENDER20",
      description: "20% off for senior citizens",
      type: "Percentage",
      discount: "20%",
      limit: "03",
      valid: "06 Nov 2024",
      status: "Active"
    },
    {
      name: "Thanksgiving Special",
      code: "THANKS10",
      description: "10% off for Thanksgiving",
      type: "Percentage",
      discount: "10%",
      limit: "01",
      valid: "31 Oct 2024",
      status: "Active"
    },
    {
      name: "Student Discount",
      code: "STUDENT10",
      description: "10% off for students",
      type: "Percentage",
      discount: "10%",
      limit: "02",
      valid: "14 Oct 2024",
      status: "Active"
    },
    {
      name: "Big Saver Deal",
      code: "SAVE80",
      description: "$50 off orders over $300",
      type: "Fixed Amount",
      discount: "$50",
      limit: "03",
      valid: "03 Oct 2024",
      status: "Better"
    },
    {
      name: "Weekend Exclusive",
      code: "WEEKENDSALE",
      description: "Exclusive15% off on weekends",
      type: "Percentage",
      discount: "15%",
      limit: "04",
      valid: "29 Sep 2024",
      status: "Active"
    },
    {
      name: "Welcome Delight",
      code: "WELCOME10",
      description: "10% off for first-time users",
      type: "Percentage",
      discount: "10%",
      limit: "01",
      valid: "10 Sep 2024",
      status: "Active"
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return "badge bg-success";
      case "Better":
        return "badge bg-primary";
      default:
        return "badge bg-secondary";
    }
  };

  // Show Edit Modal
  const handleEdit = (coupon) => {
    setEditCoupon(coupon);
  };

  // Show Delete Modal
  const handleDelete = (coupon) => {
    setDeleteCoupon(coupon);
  };

  // Confirm Delete
  const confirmDelete = () => {
    // ...delete logic here (e.g. API call or state update)
    setDeleteCoupon(null);
  };

  return (
    <div className=" bg-light py-2 px-2 mt-1 product-header">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-4 mb-4">
        <div>
          <h5 className="fw-bold mb-1">Coupons</h5>
          <p className="text-muted mb-0">Manage your coupons</p>
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
            style={{ backgroundColor: "#FFA646" }}
            data-bs-toggle="modal"
            data-bs-target="#addCouponModal"
          >
            <FaPlusCircle />
            Add Coupon
          </button>
          {/* <button className="btn text-white d-flex align-items-center gap-2" style={{ backgroundColor: "#FFA646" }}>
            <FaDownload />
            Import Coupons
          </button> */}
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
    {/* Customer Dropdown */}
    <div className="dropdown flex-grow-1 mb-2 mb-sm-0">
      <button 
        className="btn btn-orange dropdown-toggle w-100" 
        type="button" 
        id="customerDropdown"
        data-bs-toggle="dropdown" 
        aria-expanded="false"
      >
Type      </button>
      <ul className="dropdown-menu custom-dropdown w-100" aria-labelledby="customerDropdown">
        <li><a className="dropdown-item active-orange" href="#">Fixed</a></li>
        <li><a className="dropdown-item" href="#">Percentage</a></li>
      
      </ul>
    </div>

    {/* Status Dropdown */}
    <div className="dropdown flex-grow-1 mb-2 mb-sm-0">
      <button 
        className="btn btn-orange dropdown-toggle w-100" 
        type="button" 
        id="statusDropdown"
        data-bs-toggle="dropdown" 
        aria-expanded="false"
      >
        Status
      </button>
      <ul className="dropdown-menu custom-dropdown w-100" aria-labelledby="statusDropdown">
        <li><a className="dropdown-item" href="#">Active</a></li>
        <li><a className="dropdown-item" href="#">Inactive</a></li>
      
      </ul>
    </div>

    {/* Sort By Dropdown */}
    <div className="dropdown flex-grow-1">
      <button 
        className="btn btn-orange dropdown-toggle w-100" 
        type="button" 
        id="sortDropdown"
        data-bs-toggle="dropdown" 
        aria-expanded="false"
      >
        Sort By: Last 7 Days
      </button>
      <ul className="dropdown-menu custom-dropdown w-100" aria-labelledby="sortDropdown">
        <li><a className="dropdown-item" href="#">Recently Added</a></li>
        <li><a className="dropdown-item" href="#">Ascending</a></li>
        <li><a className="dropdown-item" href="#">Desending</a></li>
        <li><a className="dropdown-item" href="#">Last Month</a></li>
        <li><a className="dropdown-item" href="#">Last 7 days</a></li>
      </ul>
    </div>
  </div>
</div>
      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered text-center align-middle product-table mb-0">
          <thead className="table-light text-white">
            <tr>
              <th className="py-3">Name</th>
              <th className="py-3">Code</th>
              <th className="py-3"> Description</th>
              <th className="py-3">Type</th>
              <th className="py-3">Discount</th>
              <th className="py-3">Limit</th>
              <th className="py-3">Valid Until</th>
              <th className="py-3">Status</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon, idx) => (
              <tr key={idx}>
                <td className="py-3">{coupon.name}</td>
                <td>{coupon.code}</td>
                <td>{coupon.description}</td>
                <td>{coupon.type}</td>
                <td>{coupon.discount}</td>
                <td>{coupon.limit}</td>
                <td>{coupon.valid}</td>
                <td>
                  <span className={getStatusBadge(coupon.status)}>{coupon.status}</span>
                </td>
                <td className="d-flex justify-content-center gap-1">
                  {/* <button
                    className="btn btn-light btn-sm border"
                    data-bs-toggle="modal"
                    data-bs-target="#couponDetailModal"
                    onClick={() => setSelectedCoupon(coupon)}
                  >
                    <FaEye />
                  </button> */}
                  <button
                    className="btn outline-warning  btn-sm text-warning py-1 px-1"
                    data-bs-toggle="modal"
                    data-bs-target="#editCouponModal"
                    onClick={() => handleEdit(coupon)}
                  >
                    <FaEdit size={16}  />
                  </button>
                  <button
                    className="btn outline-primary btn-sm text-danger py-2 px-1"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteCouponModal"
                    onClick={() => handleDelete(coupon)}
                  >
                    <FaTrash  size={16}  />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     {/* Add Coupon Modal */}
<div
  className="modal fade"
  id="addCouponModal"
  tabIndex="-1"
  aria-labelledby="addCouponModalLabel"
  aria-hidden="true"
>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header border-0">
        <h5 className="modal-title fw-bold" id="addCouponModalLabel">
          Add Coupon
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
              Coupon Name <span className="text-danger">*</span>
            </label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter coupon name" 
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              Coupon Code <span className="text-danger">*</span>
            </label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter coupon code" 
            />
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Type <span className="text-danger">*</span>
              </label>
              <select className="form-select">
                <option>Choose Type</option>
                <option>Percentage</option>
                <option>Fixed Amount</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Discount <span className="text-danger">*</span>
              </label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter discount value" 
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              Limit <span className="text-danger">*</span>
            </label>
            <input 
              type="number" 
              className="form-control" 
              placeholder="Enter 0 for Unlimited" 
            />
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Start Date <span className="text-danger">*</span>
              </label>
              <input 
                type="date" 
                className="form-control" 
                placeholder="dd/mm/yyyy" 
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                End Date <span className="text-danger">*</span>
              </label>
              <input 
                type="date" 
                className="form-control" 
                placeholder="dd/mm/yyyy" 
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              Product <span className="text-danger">*</span>
            </label>
            <select className="form-select mb-2">
              <option>Select</option>
              <option>All Products</option>
              <option>Specific Products</option>
            </select>
            <div className="form-check">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="oncePerCustomer" 
              />
              <label className="form-check-label" htmlFor="oncePerCustomer">
                Once Per Customer
              </label>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea 
              className="form-control" 
              rows="3" 
              placeholder="Maximum 60 Words"
              maxLength="300"
            ></textarea>
            <div className="d-flex justify-content-between mt-1">
              <div>
                <button type="button" className="btn btn-sm btn-light me-1">
                  <strong>B</strong>
                </button>
                <button type="button" className="btn btn-sm btn-light">
                  <em>U</em>
                </button>
              </div>
              <small className="text-muted">Nunito *</small>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Status</label>
            <select className="form-select">
              <option>Active</option>
              <option>Inactive</option>
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
              style={{ backgroundColor: "#FFA646" }}
            >
              Add Coupon
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

      {/* Coupon Details Modal */}
      <div
        className="modal fade"
        id="couponDetailModal"
        tabIndex="-1"
        aria-labelledby="couponDetailModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold" id="couponDetailModalLabel">
                Coupon Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setSelectedCoupon(null)}
              ></button>
            </div>
            <div className="modal-body">
              {selectedCoupon && (
                <div className="table-responsive">
                  <table className="table table-bordered mb-0">
                    <tbody>
                      <tr>
                        <td className="fw-semibold">Name</td>
                        <td>{selectedCoupon.name}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Code</td>
                        <td>{selectedCoupon.code}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Description</td>
                        <td>{selectedCoupon.description}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Type</td>
                        <td>{selectedCoupon.type}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Discount</td>
                        <td>{selectedCoupon.discount}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Usage Limit</td>
                        <td>{selectedCoupon.limit}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Valid Until</td>
                        <td>{selectedCoupon.valid}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Status</td>
                        <td>{selectedCoupon.status}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    {/* Edit Coupon Modal */}
<div
  className="modal fade"
  id="editCouponModal"
  tabIndex="-1"
  aria-labelledby="editCouponModalLabel"
  aria-hidden="true"
>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header border-0">
        <h5 className="modal-title fw-bold" id="editCouponModalLabel">
          Edit Coupon
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => setEditCoupon(null)}
        ></button>
      </div>
      <div className="modal-body">
        {editCoupon && (
          <form>
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Coupon Name <span className="text-danger">*</span>
              </label>
              <input 
                type="text" 
                className="form-control" 
                defaultValue={editCoupon.name}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Coupon Code <span className="text-danger">*</span>
              </label>
              <input 
                type="text" 
                className="form-control" 
                defaultValue={editCoupon.code}
              />
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Type <span className="text-danger">*</span>
                </label>
                <select className="form-select" defaultValue={editCoupon.type}>
                  <option>Percentage</option>
                  <option>Fixed Amount</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Discount <span className="text-danger">*</span>
                </label>
                <input 
                  type="text" 
                  className="form-control" 
                  defaultValue={editCoupon.discount.replace('%', '')}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Limit <span className="text-danger">*</span>
              </label>
              <input 
                type="number" 
                className="form-control" 
                defaultValue={editCoupon.limit}
                placeholder="Enter 0 for Unlimited" 
              />
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Start Date <span className="text-danger">*</span>
                </label>
                <input 
                  type="date" 
                  className="form-control" 
                  defaultValue="2024-12-31"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  End Date <span className="text-danger">*</span>
                </label>
                <input 
                  type="date" 
                  className="form-control" 
                  defaultValue="2025-01-04"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Product <span className="text-danger">*</span>
              </label>
              <select className="form-select mb-2" defaultValue="All">
                <option>All</option>
                <option>Specific Products</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Description</label>
              <textarea 
                className="form-control" 
                rows="3" 
                defaultValue={editCoupon.description}
                maxLength="300"
              ></textarea>
              <div className="d-flex justify-content-between mt-1">
                <div>
                  <button type="button" className="btn btn-sm btn-light me-1">
                    <strong>B</strong>
                  </button>
                  <button type="button" className="btn btn-sm btn-light">
                    <em>U</em>
                  </button>
                </div>
                <small className="text-muted">Nunito *</small>
              </div>
              <small className="text-muted">Maximum 60 Words</small>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Status</label>
              <select className="form-select" defaultValue={editCoupon.status}>
                <option>Active</option>
                <option>Better</option>
                <option>Expired</option>
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

      {/* Delete Coupon Modal */}
      <div
        className="modal fade"
        id="deleteCouponModal"
        tabIndex="-1"
        aria-labelledby="deleteCouponModalLabel"
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
              <h4 className="fw-bold mb-2">Delete Coupon</h4>
              <p className="mb-4" style={{ color: "#555", fontSize: "1.08rem" }}>
                Are you sure you want to delete this coupon?
              </p>
              <div className="d-flex justify-content-center gap-3">
                <button
                  className="btn btn-dark px-4 py-2"
                  data-bs-dismiss="modal"
                  onClick={() => setDeleteCoupon(null)}
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

export default Coupons;