import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
          </div>
        </div>

        <div className="col-12 col-md-3">
          <div className="shadow-sm rounded p-3 bg-white border border-primary d-flex align-items-center justify-content-between w-100">
            <div>
              <small className="text-muted">Total Paid</small>
              <h5 className="fw-bold">$2,56,42</h5>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-3">
          <div className="shadow-sm rounded p-3 bg-white border border-warning d-flex align-items-center justify-content-between w-100">
            <div>
              <small className="text-muted">Total Unpaid</small>
              <h5 className="fw-bold">$1,52,45</h5>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-3">
          <div className="shadow-sm rounded p-3 bg-white border border-info d-flex align-items-center justify-content-between w-100">
            <div>
              <small className="text-muted">Sales </small>
              <h5 className="fw-bold">$7,00,87</h5>
            </div>
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
          <button className="btn w-100" style={{ backgroundColor: '#53b2a5', color: '#fff' }}>Generate Report</button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded p-3 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <h5 className="fw-bold mb-0">Sales Report</h5>
          <div className="d-flex gap-2">
            <button className="btn btn-light">PDF</button>
            <button className="btn btn-light">Excel</button>
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
                <td>Lenovo IdeaPad 3</td>
                <td>Lenovo</td>
                <td>Computers</td>
                <td>05</td>
                <td>$3000</td>
                <td>100</td>
              </tr>
              <tr>
                <td>PT002</td>
                <td>Beats Pro</td>
                <td>Beats</td>
                <td>Electronics</td>
                <td>10</td>
                <td>$1600</td>
                <td>140</td>
              </tr>
              <tr>
                <td>PT003</td>
                <td>Nike Jordan</td>
                <td>Nike</td>
                <td>Shoe</td>
                <td>08</td>
                <td>$880</td>
                <td>300</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-3 px-2">
          <span className="small text-muted">Showing 1 to 3 of 3 results</span>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className="page-item disabled">
                <button className="page-link rounded-start">&laquo;</button>
              </li>
              <li className="page-item active">
                <button className="page-link" style={{ backgroundColor: '#3daaaa', borderColor: '#3daaaa' }}>1</button>
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
        <small className="text-dark">
      A Report summary that presents daily sales, product-wise totals, and income analysis to support smart business decisions.
      </small>
      </div>
     
    </div>
    
  );
};

export default Salesreport;
