import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFilePdf, FaFileExcel } from 'react-icons/fa';
import { BsGear } from 'react-icons/bs';
import { BiSolidReport, BiSolidDollarCircle } from 'react-icons/bi';

const Salesreport = () => {
  return (
    <div className="container my-4">
      <div className="mb-4">
        <h4 className="fw-bold">Sales Report</h4>
        <p className="text-muted">Manage your Sales report</p>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-3">
          <div className="shadow-sm rounded p-3 bg-white border border-success d-flex align-items-center justify-content-between w-100">
            <div>
              <small className="text-muted">Total Amount</small>
              <h5 className="fw-bold">$4,56,000</h5>
            </div>
            <BiSolidDollarCircle size={28} color="#4CAF50" />
          </div>
        </div>

        <div className="col-12 col-md-3">
          <div className="shadow-sm rounded p-3 bg-white border border-primary d-flex align-items-center justify-content-between w-100">
            <div>
              <small className="text-muted">Total Paid</small>
              <h5 className="fw-bold">$2,56,42</h5>
            </div>
            <BiSolidDollarCircle size={28} color="#1A73E8" />
          </div>
        </div>

        <div className="col-12 col-md-3">
          <div className="shadow-sm rounded p-3 bg-white border border-warning d-flex align-items-center justify-content-between w-100">
            <div>
              <small className="text-muted">Total Unpaid</small>
              <h5 className="fw-bold">$1,52,45</h5>
            </div>
            <BiSolidDollarCircle size={28} color="#EF6C00" />
          </div>
        </div>

        <div className="col-12 col-md-3">
          <div className="shadow-sm rounded p-3 bg-white border border-danger d-flex align-items-center justify-content-between w-100">
            <div>
              <small className="text-muted">Overdue</small>
              <h5 className="fw-bold">$2,56,12</h5>
            </div>
            <BiSolidReport size={28} color="#D32F2F" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-3 rounded mb-3 shadow-sm row g-3">
        <div className="col-12 col-md-3">
          <label className="form-label">Choose Date</label>
          <input type="date" className="form-control" />
        </div>

        <div className="col-12 col-md-3">
          <label className="form-label">Store</label>
          <select className="form-select">
            <option>All</option>
            <option>Lenovo</option>
            <option>Beats</option>
            <option>Nike</option>
          </select>
        </div>

        <div className="col-12 col-md-3">
          <label className="form-label">Products</label>
          <select className="form-select">
            <option>All</option>
            <option>Lenovo IdeaPad 3</option>
            <option>Beats Pro</option>
            <option>Nike Jordan</option>
          </select>
        </div>

        <div className="col-12 col-md-3 d-flex align-items-end">
          <button className="btn w-100" style={{ backgroundColor: '#ffa726', color: '#fff' }}>Generate Report</button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded p-3 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <h5 className="fw-bold mb-0">Sales Report</h5>
          <div className="d-flex gap-2">
            <button className="btn btn-light">
              <FaFilePdf className="text-danger" />
            </button>
            <button className="btn btn-light">
              <FaFileExcel className="text-success" />
            </button>
            <button className="btn btn-light">
              <BsGear />
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>SKU</th>
                <th>Product Name</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Sold Qty</th>
                <th>Sold Amount</th>
                <th>Instock Qty</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>PT001</td>
                <td><img src="https://via.placeholder.com/25" alt="" className="me-2" /> Lenovo IdeaPad 3</td>
                <td>Lenovo</td>
                <td>Computers</td>
                <td>05</td>
                <td>$3000</td>
                <td>100</td>
              </tr>
              <tr>
                <td>PT002</td>
                <td><img src="https://via.placeholder.com/25" alt="" className="me-2" /> Beats Pro</td>
                <td>Beats</td>
                <td>Electronics</td>
                <td>10</td>
                <td>$1600</td>
                <td>140</td>
              </tr>
              <tr>
                <td>PT003</td>
                <td><img src="https://via.placeholder.com/25" alt="" className="me-2" /> Nike Jordan</td>
                <td>Nike</td>
                <td>Shoe</td>
                <td>08</td>
                <td>$880</td>
                <td>300</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Salesreport;
