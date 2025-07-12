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
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./BatchExpiry.css";

const BatchExpiry = () => {
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [editBatch, setEditBatch] = useState(null);
  const [deleteBatch, setDeleteBatch] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const batches = [
    {
      batchNo: "BTCH001",
      productName: "Paracetamol 500mg",
      Warehouse: "Main Warehouse",
      stockQty: 500,
      manufactureDate: "2024-12-01",
      expiryDate: "2026-11-30",
      status: "Valid"
    },
    {
      batchNo: "BTCH002",
      productName: "Vitamin C Tablets",
      Warehouse: "Warehouse A",
      stockQty: 300,
      manufactureDate: "2023-05-15",
      expiryDate: "2025-05-15",
      status: "Expiring Soon"
    },
    {
      batchNo: "BTCH003",
      productName: "Amoxicillin 250mg",
      Warehouse: "Cold Storage",
      stockQty: 1200,
      manufactureDate: "2022-01-20",
      expiryDate: "2024-07-01",
      status: "Expired"
    },
    {
      batchNo: "BTCH009",
      productName: "Vitamin C Chewable",
      Warehouse: "Dry Storage",
      stockQty: 100,
      manufactureDate: "2021-11-10",
      expiryDate: "2023-11-10",
      status: "Expired"
    },
    {
      batchNo: "BTCH017",
      productName: "Azithromycin 500mg",
      Warehouse: "Cold Storage",
      stockQty: 300,
      manufactureDate: "2023-01-01",
      expiryDate: "2025-01-01",
      status: "Valid"
    },
    {
      batchNo: "BTCH021",
      productName: "Ibuprofen 200mg",
      Warehouse: "Main Warehouse",
      stockQty: 500,
      manufactureDate: "2023-08-01",
      expiryDate: "2026-08-01",
      status: "Valid"
    },
    {
      batchNo: "BTCH025",
      productName: "Paracetamol 500mg",
      Warehouse: "Main Storage",
      stockQty: 850,
      manufactureDate: "2023-06-15",
      expiryDate: "2025-06-30",
      status: "Valid"
    }
  ];

    // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = batches.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(batches.length / rowsPerPage);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Valid":
        return "badge bg-success";
      case "Expiring Soon":
        return "badge bg-warning text-dark";
      case "Expired":
        return "badge bg-danger";
      default:
        return "badge bg-secondary";
    }
  };

  // Show Edit Modal
  const handleEdit = (batch) => {
    setEditBatch(batch);
  };

  // Show Delete Modal
  const handleDelete = (batch) => {
    setDeleteBatch(batch);
  };

  // Confirm Delete (implement your delete logic here)
  const confirmDelete = () => {
    // ...delete logic here (e.g. API call or state update)
    setDeleteBatch(null);
  };

    // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle rows per page change
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing rows per page
  };

  return (
    <div className=" bg-light py-2 product-header">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-4 mb-4">
        <div>
          <h5 className="fw-bold mb-1">Batch / Expiry</h5>
          <p className="text-muted mb-0">Track batch-wise expiry and stock details</p>
        </div>

        <div className="d-flex align-items-center gap-2 flex-wrap">
          <button className="btn btn-light border text-danger product-btn-icon">
            <FaFilePdf />
          </button>
          <button className="btn btn-light border text-success product-btn-icon">
            <FaFileExcel />
          </button>
          {/* <button
            className="btn text-white d-flex align-items-center gap-2"
            style={{ backgroundColor: "#FFA646" }}
            data-bs-toggle="modal"
            data-bs-target="#addBatchModal"
          >
            <FaPlusCircle />
            Add Batch
          </button> */}
        </div>
      </div>

     {/* Filters */}
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-2">
        <div className="input-group w-60">

          <input 
            type="text" 
            className="form-control border-start-0" 
            placeholder="Search" 
            // style={{ width: "60%" }}
          />
        </div>
      </div>


      {/* Table */}
      <div className="table-responsive mt-2">
        <table className="table table-bordered text-center align-middle product-table mb-0">
          <thead className="table-light text-white">
            <tr>
              <th className="py-3">Batch No.</th>
              <th className="py-3">Product Name</th>
              <th className="py-3">Warehouse</th>
              <th className="py-3">Stock Qty</th>
              <th className="py-3">Manufacture Date</th>
              <th className="py-3">Expiry Date</th>
              <th className="py-3">Status</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {batches.map((batch, idx) => (
              <tr key={idx}>
                <td>{batch.batchNo}</td>
                <td>{batch.productName}</td>
                <td>{batch.Warehouse}</td>
                <td>{batch.stockQty}</td>
                <td>{batch.manufactureDate}</td>
                <td>{batch.expiryDate}</td>
                <td>
                  <span className={getStatusBadge(batch.status)}>{batch.status}</span>
                </td>
                <td className="d-flex justify-content-center gap-1">
                  <button
        className="btn outline-info btn-sm py-1 px-1 text-info"
                    data-bs-toggle="modal"
                    data-bs-target="#batchDetailModal"
                    onClick={() => setSelectedBatch(batch)}
                  >
                    <FaEye size={16} />
                  </button>
                  <button
                    className="btn outline-warning btn-sm text-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#editBatchModal"
                    onClick={() => handleEdit(batch)}
                  >
                    <FaEdit size={16} />
                  </button>
                  <button
                className="btn outline-primary btn-sm text-danger py-2 px-1"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteBatchModal"
                    onClick={() => handleDelete(batch)}
                  >
                    <FaTrash size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          
        </table>
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

      
      {/* Add Batch Modal */}
      <div
        className="modal fade"
        id="addBatchModal"
        tabIndex="-1"
        aria-labelledby="addBatchModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold" id="addBatchModalLabel">
                Batch Information
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
                    {/* Batch No */}
                    <div className="col-md-6">
                      <label className="form-label">
                        Batch No. <span className="text-danger">*</span>
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                    {/* Product Name */}
                    <div className="col-md-6">
                      <label className="form-label">
                        Product Name <span className="text-danger">*</span>
                      </label>
                      <select className="form-select">
                        <option>Select Product</option>
                        <option>Paracetamol 500mg</option>
                        <option>Vitamin C Tablets</option>
                        <option>Amoxicillin 250mg</option>
                        <option>Azithromycin 500mg</option>
                        <option>Ibuprofen 200mg</option>
                      </select>
                    </div>
                    {/* Warehouse */}
                    <div className="col-md-6">
                      <label className="form-label">
                        Warehouse <span className="text-danger">*</span>
                      </label>
                      <select className="form-select">
                        <option>Select Warehouse</option>
                        <option>Main Warehouse</option>
                        <option>Warehouse A</option>
                        <option>Cold Storage</option>
                        <option>Dry Storage</option>
                        <option>Main Storage</option>
                      </select>
                    </div>
                    {/* Stock Quantity */}
                    <div className="col-md-6">
                      <label className="form-label">
                        Stock Quantity <span className="text-danger">*</span>
                      </label>
                      <input type="number" className="form-control" />
                    </div>
                    {/* Manufacture Date */}
                    <div className="col-md-6">
                      <label className="form-label">
                        Manufacture Date <span className="text-danger">*</span>
                      </label>
                      <input type="date" className="form-control" />
                    </div>
                    {/* Expiry Date */}
                    <div className="col-md-6">
                      <label className="form-label">
                        Expiry Date <span className="text-danger">*</span>
                      </label>
                      <input type="date" className="form-control" />
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
                  {/* <button type="submit" className="btn btn-warning text-white">
                    Add Batch
                  </button> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Batch Details Modal (FaEye) */}
      <div
        className="modal fade"
        id="batchDetailModal"
        tabIndex="-1"
        aria-labelledby="batchDetailModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold" id="batchDetailModalLabel">
                Batch Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setSelectedBatch(null)}
              ></button>
            </div>
            <div className="modal-body">
              {selectedBatch && (
                <div className="table-responsive">
                  <table className="table table-bordered mb-0">
                    <tbody>
                      <tr>
                        <td className="fw-semibold">Batch No.</td>
                        <td>{selectedBatch.batchNo}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Product Name</td>
                        <td>{selectedBatch.productName}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Warehouse</td>
                        <td>{selectedBatch.Warehouse}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Stock Quantity</td>
                        <td>{selectedBatch.stockQty}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Manufacture Date</td>
                        <td>{selectedBatch.manufactureDate}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Expiry Date</td>
                        <td>{selectedBatch.expiryDate}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Status</td>
                        <td>{selectedBatch.status}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Batch Modal (FaEdit) */}
      <div
        className="modal fade"
        id="editBatchModal"
        tabIndex="-1"
        aria-labelledby="editBatchModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold" id="editBatchModalLabel">
                Edit Batch
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setEditBatch(null)}
              ></button>
            </div>
            <div className="modal-body">
              {editBatch && (
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Batch No.</label>
                      <input type="text" className="form-control" defaultValue={editBatch.batchNo} readOnly />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Product Name</label>
                      <input type="text" className="form-control" defaultValue={editBatch.productName} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Warehouse</label>
                      <select className="form-select" defaultValue={editBatch.Warehouse}>
                        <option>Main Warehouse</option>
                        <option>Warehouse A</option>
                        <option>Cold Storage</option>
                        <option>Dry Storage</option>
                        <option>Main Storage</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Stock Quantity</label>
                      <input type="number" className="form-control" defaultValue={editBatch.stockQty} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Manufacture Date</label>
                      <input type="date" className="form-control" defaultValue={editBatch.manufactureDate} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Expiry Date</label>
                      <input type="date" className="form-control" defaultValue={editBatch.expiryDate} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Status</label>
                      <select className="form-select" defaultValue={editBatch.status}>
                        <option>Valid</option>
                        <option>Expiring Soon</option>
                        <option>Expired</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4 d-flex justify-content-end gap-2">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-warning text-white">
                      Update Batch
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Batch Modal */}
      <div
        className="modal fade"
        id="deleteBatchModal"
        tabIndex="-1"
        aria-labelledby="deleteBatchModalLabel"
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
              <h4 className="fw-bold mb-2">Delete Batch</h4>
              <p className="mb-4" style={{ color: "#555", fontSize: "1.08rem" }}>
                Are you sure you want to delete this batch record?
              </p>
              <div className="d-flex justify-content-center gap-3">
                <button
                  className="btn btn-dark px-4 py-2"
                  data-bs-dismiss="modal"
                  onClick={() => setDeleteBatch(null)}
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

export default BatchExpiry;