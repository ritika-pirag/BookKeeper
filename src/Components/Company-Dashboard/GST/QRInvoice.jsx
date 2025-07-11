import React, { useState } from "react";
import { FaEye, FaPlus, FaMinus, FaTrash, FaTimes } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { QRCodeSVG } from "qrcode.react";
// import "./QrInvoice.css"; 



const QRInvoice = () => {
  const [showQrModal, setShowQrModal] = useState(false);

  const handleGenerateQR = () => {
    setShowQrModal(true);
  };

  const closeQrModal = () => {
    setShowQrModal(false);
  };

  return (
    <div className="print-barcode-container container-fluid py-4 bg-light min-vh-100">
      <div className="mb-4">
        <h4 className="fw-bold">Print QR Code</h4>
        <small className="text-muted">Manage your QR Code</small>
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
              <label className="form-check-label">Reference Number</label>
            </div>
            {/* <div className="form-check form-switch">
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
            </div> */}
          </div>
        </div>

    {/* Action Buttons */}
        <div className="d-flex justify-content-end gap-3 flex-wrap">
          <button 
            className="btn btn-orange text-white fw-semibold"
            onClick={handleGenerateQR}
          >
            <FaEye className="me-2" /> Generate QR
          </button>
          <button className="btn btn-dark fw-semibold">
            <i className="me-2 bi bi-arrow-clockwise"></i> Reset Barcode
          </button>
          <button className="btn btn-danger fw-semibold">
            <i className="me-2 bi bi-printer"></i> Print Barcode
          </button>
        </div>
      </div>

           {/* QR Code Modal */}
      {showQrModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">QR Code</h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={closeQrModal}
                >
                  <FaTimes />
                </button>
              </div>
              <div className="modal-body text-center">
                <div className="mb-4">
                  <h4 className="fw-bold">Nike Jordan</h4>
                </div>
                
                <div className="qr-code-container mb-4">
                  <QRCodeSVG 
                    value="HG3FK" 
                    size={200}
                    level="H"
                    includeMargin={true}
                    fgColor="#000000"
                    bgColor="#ffffff"
                  />
                </div>
                
                <div className="reference-number">
                  <p className="fw-bold mb-1">Ref No: 32RRR554</p>
                </div>
              </div>
              <div className="modal-footer border-0 d-flex justify-content-center">
                <button 
                  className="btn btn-orange text-white fw-semibold px-4"
                  onClick={() => window.print()}
                >
                  Print QR Code
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRInvoice;
