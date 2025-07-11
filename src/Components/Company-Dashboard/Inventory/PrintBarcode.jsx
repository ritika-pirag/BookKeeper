import React, { useState } from "react";
import { FaEye, FaPlus, FaMinus, FaTrash, FaTimes } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Barcode from "react-barcode";
import "./PrintBarcode.css";

const PrintBarcode = () => {
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);

  const handleGenerateBarcode = () => {
    setShowBarcodeModal(true);
  };

  const closeBarcodeModal = () => {
    setShowBarcodeModal(false);
  };

  return (
    <div className="print-barcode-container container-fluid py-4 bg-light min-vh-100">
      <div className="mb-4">
        <h4 className="fw-bold">Print Barcode</h4>
        <small className="text-muted">Manage your barcodes</small>
      </div>

      <div className="bg-white rounded p-4 shadow-sm">
        {/* Warehouse & Store Select */}
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Warehouse <span className="text-danger">*</span>
            </label>
            <select className="form-select select-orange">
              <option>Select</option>
              <option>Lavish Warehouse</option>
              <option>Quaint Warehouse</option>
              <option>Traditional Warehouse</option>
              <option>Cool Warehouse</option>
              <option>Overflow Warehouse</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Store <span className="text-danger">*</span>
            </label>
            <select className="form-select select-orange">
              <option>Select</option>
              <option>Electro Mart</option>
              <option>Quantum Gadgets</option>
              <option>Prime Bazaar</option>
              <option>Gadget World</option>
              <option>Volt Vault</option>
            </select>
          </div>
        </div>

        {/* Product Search */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            Product <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control select-orange"
            placeholder="Search Product by Code"
          />
        </div>

        {/* Product Table */}
        <div className="table-responsive mb-4">
          <table className="table unique-barcode-table">
            <thead>
              <tr className="table-light text-capitalize">
                <th>Product</th>
                <th>SKU</th>
                <th>Code</th>
                <th className="text-center">Qty</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="d-flex align-items-center gap-2">
                  <img
                    src="https://i.ibb.co/rRQbH603/p3.png"
                    alt="Nike Jordan"
                    width="32"
                    height="32"
                    className="rounded"
                  />
                  Nike Jordan
                </td>
                <td>PT002</td>
                <td>HG3FK</td>
                <td className="text-center">
                  <button className="btn btn-light btn-sm me-1">
                    <FaMinus />
                  </button>
                  4
                  <button className="btn btn-light btn-sm ms-1">
                    <FaPlus />
                  </button>
                </td>
                <td>
                  <button className="btn btn-light btn-sm">
                    <FaTrash />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="d-flex align-items-center gap-2">
                  <img
                    src="https://i.ibb.co/21wF56v5/p4.png"
                    alt="Apple Watch"
                    width="32"
                    height="32"
                    className="rounded"
                  />
                  Apple Series 5 Watch
                </td>
                <td>PT003</td>
                <td>TEUIU7</td>
                <td className="text-center">
                  <button className="btn btn-light btn-sm me-1">
                    <FaMinus />
                  </button>
                  4
                  <button className="btn btn-light btn-sm ms-1">
                    <FaPlus />
                  </button>
                </td>
                <td>
                  <button className="btn btn-light btn-sm">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Paper Size & Toggles */}
        <div className="row align-items-center g-3 mb-4">
          <div className="col-md-4">
            <label className="form-label fw-semibold">
              Paper Size <span className="text-danger">*</span>
            </label>
            <select className="form-select select-orange">
              <option>Select</option>
              <option>A3</option>
              <option>A4</option>
              <option>A5</option>
              <option>A6</option>
            </select>
          </div>

          <div className="col d-flex align-items-end justify-content-md-end gap-3 flex-wrap">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                defaultChecked
                style={{ backgroundColor: "#28a745", borderColor: "#28a745" }}
              />
              <label className="form-check-label">Show Store Name</label>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                defaultChecked
                style={{ backgroundColor: "#28a745", borderColor: "#28a745" }}
              />
              <label className="form-check-label">Show Product Name</label>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                defaultChecked
                style={{ backgroundColor: "#28a745", borderColor: "#28a745" }}
              />
              <label className="form-check-label">Show Price</label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex justify-content-end gap-3 flex-wrap">
          <button 
            className="btn btn-orange text-white fw-semibold"
            onClick={handleGenerateBarcode}
          >
            <FaEye className="me-2" /> Generate Barcode
          </button>
          <button className="btn btn-dark fw-semibold">
            <i className="me-2 bi bi-arrow-clockwise"></i> Reset Barcode
          </button>
          <button className="btn btn-danger fw-semibold">
            <i className="me-2 bi bi-printer"></i> Print Barcode
          </button>
        </div>
      </div>

      {/* Barcode Modal */}
       {/* Barcode Modal */}
      {showBarcodeModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Barcode</h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={closeBarcodeModal}
                >
                  <FaTimes />
                </button>
              </div>
              <div className="modal-body">
                <div className="barcode-section mb-4">
                  <h4 className="fw-bold mb-3">Nike Jordan</h4>
                  <div className="barcode-items">
                    <div className="barcode-item mb-3 p-3 border rounded">
                      <h6 className="fw-bold">Grocery Alpha</h6>
                      <p className="mb-1">Nike Jordan</p>
                      <p className="fw-bold">Price: $400</p>
                      <div className="barcode-container">
                        <Barcode 
                          value="HG3FK" 
                          format="CODE128"
                          width={2}
                          height={60}
                          displayValue={false}
                        />
                      </div>
                    </div>
                    <div className="barcode-item mb-3 p-3 border rounded">
                      <h6 className="fw-bold">Grocery Alpha</h6>
                      <p className="mb-1">Nike Jordan</p>
                      <p className="fw-bold">Price: $400</p>
                      <div className="barcode-container">
                        <Barcode 
                          value="HG3FK" 
                          format="CODE128"
                          width={2}
                          height={60}
                          displayValue={false}
                        />
                      </div>
                    </div>
                    <div className="barcode-item mb-3 p-3 border rounded">
                      <h6 className="fw-bold">Grocery Alpha</h6>
                      <p className="mb-1">Nike Jordan</p>
                      <p className="fw-bold">Price: $400</p>
                      <div className="barcode-container">
                        <Barcode 
                          value="HG3FK" 
                          format="CODE128"
                          width={2}
                          height={60}
                          displayValue={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="barcode-section">
                  <h4 className="fw-bold mb-3">Apple Series 5 Watch</h4>
                  <div className="barcode-items">
                    <div className="barcode-item mb-3 p-3 border rounded">
                      <h6 className="fw-bold">Grocery Alpha</h6>
                      <p className="mb-1">Apple Series 5 Watch</p>
                      <p className="fw-bold">Price: $300</p>
                      <div className="barcode-container">
                        <Barcode 
                          value="TEUIU7" 
                          format="CODE128"
                          width={2}
                          height={60}
                          displayValue={false}
                        />
                      </div>
                    </div>
                    <div className="barcode-item p-3 border rounded">
                      <h6 className="fw-bold">TEUUU10</h6>
                      <div className="barcode-container">
                        <Barcode 
                          value="TEUUU10" 
                          format="CODE128"
                          width={2}
                          height={60}
                          displayValue={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={closeBarcodeModal}
                >
                  Close
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                >
                  Print Barcodes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrintBarcode;