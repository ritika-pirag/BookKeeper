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
import { IoIosAttach } from "react-icons/io";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
// import "./Coupons.css";

const Estimates = () => {
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [editCoupon, setEditCoupon] = useState(null);
  const [deleteCoupon, setDeleteCoupon] = useState(null);
const getStatusBadge = (status) => {
    switch (status) {
      case "RECEIVED":
        return "badge bg-success"; // Green for Received
      case "PENDING":
        return "badge bg-warning text-dark"; // Yellow for Pending
      case "ORDERED":
        return "badge bg-info text-dark"; // Blue for Ordered
      case "DRAFT":
        return "badge bg-secondary"; // Grey for Draft
      case "ACCEPTED":
        return "badge bg-primary"; // Blue for Accepted
      case "SEND":
        return "badge bg-info text-dark"; // Blue for Send (same as Ordered)
      default:
        return "badge bg-secondary";
    }
  };

  // Update the estimates data to include the new statuses
  const estimates = [
    {
      date: "29 Sep 2024",
      estimateNumber: "EST-73841",
      referenceNumber: "61576",
      customerName: "Rosie",
      status: "DRAFT",
      amount: "274.00"
    },
    {
      date: "26 Apr 2025",
      estimateNumber: "EST-45137",
      referenceNumber: "13008",
      customerName: "Alf",
      status: "ACCEPTED",
      amount: "279.00"
    },
    {
      date: "25 Aug 2024",
      estimateNumber: "EST-29065",
      referenceNumber: "77403",
      customerName: "Clotilde",
      status: "ACCEPTED",
      amount: "987.00"
    },
    {
      date: "30 Aug 2024",
      estimateNumber: "EST-65732",
      referenceNumber: "97029",
      customerName: "Addison",
      status: "SENT",
      amount: "540.00"
    }
  ];

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
    <div className=" bg-light py-2  mt-2  product-header">
      {/* Header */}
      <div className="d-flex justify-content-between align-items gap-4 mb-4">
        <div>
          <h5 className="fw-bold mb-1">Estimates</h5>
      
        </div>

        <div className="d-flex align-items-center gap-2 flex-wrap">
      
          <button
            className="btn text-black border bg-white  d-flex align-items-center gap-2"
            // style={{ backgroundColor: "#FFA646" }}
            data-bs-toggle="modal"
            data-bs-target="#addCouponModal"
          >
            <FaPlusCircle />
           New
          </button>
          {/* <button className="btn text-white d-flex align-items-center gap-2" style={{ backgroundColor: "#FFA646" }}>
            <FaDownload />
            Import Coupons
          </button> */}
        </div>
      </div>


      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered  mb-0 rounded">
          <thead className="table-light text-white">
            <tr>
              <th className="py-3">DATE</th>
              <th className="py-3">ESTIMATE NUMBER</th>
              <th className="py-3">REFERENCE NUMBER</th>
              <th className="py-3">CUSTOMER NAME</th>
              <th className="py-3">STATUS</th>
              <th className="py-3">AMOUNT</th>
              <th className="py-3">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {estimates.map((estimate, idx) => (
              <tr key={idx}>
                <td>{estimate.date}</td>
                <td>{estimate.estimateNumber}</td>
                <td>{estimate.referenceNumber}</td>
                <td>{estimate.customerName}</td>
                <td>
                  <span className={getStatusBadge(estimate.status)}>{estimate.status}</span>
                </td>
                <td>{estimate.amount}</td>
                <td className="d-flex justify-content-center gap-1">
                  <button
                    className="btn outline-warning btn-sm text-warning"
                   
                  >
                    <IoIosAttach  size={20}/>
                  </button>

           
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
{/* Add Estimate Modal */}
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
          Add New Estimate
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
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Date <span className="text-danger">*</span>
              </label>
              <input 
                type="date" 
                className="form-control" 
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Estimate Number <span className="text-danger">*</span>
              </label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="EST-XXXXX" 
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              Customer Name <span className="text-danger">*</span>
            </label>
            <select className="form-select" required>
              <option value="">Select Customer</option>
              <option value="Rosie">Rosie</option>
              <option value="Alf">Alf</option>
              <option value="Clotilde">Clotilde</option>
              <option value="Addison">Addison</option>
            </select>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Reference Number <span className="text-danger">*</span>
              </label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter reference number" 
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Amount (¥) <span className="text-danger">*</span>
              </label>
              <input 
                type="number" 
                className="form-control" 
                placeholder="0.00" 
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              Status <span className="text-danger">*</span>
            </label>
            <select className="form-select" required>
              <option value="">Select Status</option>
              <option value="DRAFT">DRAFT</option>
              <option value="SEND">SEND</option>
              <option value="ACCEPTED">ACCEPTED</option>
              <option value="EXPIRED">EXPIRED</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Notes</label>
            <textarea 
              className="form-control" 
              rows="3" 
              placeholder="Additional notes (optional)"
              maxLength="500"
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Attachments</label>
            <div className="input-group">
              <input 
                type="file" 
                className="form-control" 
                multiple
              />
              <button className="btn btn-outline-secondary" type="button">
                <IoIosAttach />
              </button>
            </div>
            <small className="text-muted">Max file size: 5MB</small>
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
              Create Estimate
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

export default Estimates;