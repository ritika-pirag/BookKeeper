import React, { useState } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import './ManageStock.css';
import { FaEdit, FaFileExcel, FaFilePdf, FaPlusCircle, FaTrash, FaEye } from 'react-icons/fa';

const initialProductData = [
  {
    date: '24 Dec 2024', product: 'Lenovo IdeaPad 3', sku: 'LP-1234', category: 'Laptop', transaction: 'Purchase', qty: 100, unitPrice: 500, totalAmount: 50000, party: 'James Kirwin', stock: 200, remarks: 'Initial stock',
  },
  {
    date: '10 Dec 2024', product: 'Beats Pro', sku: 'BP-5678', category: 'Audio', transaction: 'Sale', qty: 40, unitPrice: 250, totalAmount: 10000, party: 'Francis Chang', stock: 160, remarks: 'Online order',
  },
  {
    date: '25 Jul 2023', product: 'Nike Jordan', sku: 'NJ-7890', category: 'Footwear', transaction: 'Purchase', qty: 70, unitPrice: 150, totalAmount: 10500, party: 'Steven Paul', stock: 130, remarks: 'New arrival',
  },
  {
    date: '24 Jul 2023', product: 'Amazon Echo Dot', sku: 'ED-2345', category: 'Smart Home', transaction: 'Sale', qty: 30, unitPrice: 45, totalAmount: 1350, party: 'Kevin Hardy', stock: 100, remarks: 'Retail sale',
  },
];

const MangeStock = () => {
  const [productList, setProductList] = useState(initialProductData);

  return (
    <div className="manage-product-wrapper py-3 px-3">
      <h5 className="fw-bold mb-3">Inventory & Transaction Details</h5>
      <div className="card p-3 shadow-sm">
        <div className="table-responsive">
          <Table bordered hover className="text-center align-middle mb-0">
            <thead className="bg-dark text-white">
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Transaction Type</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total Amount</th>
                <th>Supplier/Customer</th>
                <th>Stock Balance</th>
                <th>Remarks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.date}</td>
                  <td>{item.product}</td>
                  <td>{item.sku}</td>
                  <td>{item.category}</td>
                  <td>{item.transaction}</td>
                  <td>{item.qty}</td>
                  <td>${item.unitPrice}</td>
                  <td>${item.totalAmount}</td>
                  <td>{item.party}</td>
                  <td>{item.stock}</td>
                  <td>{item.remarks}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <button className="btn btn-sm border text-primary" title="View">
                        <FaEye size={14} />
                      </button>
                      <button className="btn btn-sm border text-warning" title="Edit">
                        <FaEdit size={14} />
                      </button>
                      <button className="btn btn-sm border text-danger" title="Delete">
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default MangeStock;
