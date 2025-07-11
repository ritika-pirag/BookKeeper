import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import "./Pos.css";

const categories = [
  { name: "All Categories", items: [
    { id: 1, name: "Apple Airpods 2", price: 120 },
    { id: 7, name: "Red Boot Shoes", price: 600 },
    { id: 2, name: "Vacuum Cleaner", price: 800 },
    { id: 3, name: "Realme 8 Pro", price: 700 },
    { id: 4, name: "Apple Watch Series", price: 300 },
    { id: 5, name: "Bracelet", price: 1430 },
   
  ] },
  { name: "Headphones", items: [{ id: 1, name: "Apple Airpods 2", price: 120 }] },
  { name: "Shoes", items: [{ id: 7, name: "Red Boot Shoes", price: 600 }] },
  { name: "Mobiles", items: [
    { id: 2, name: "Vacuum Cleaner", price: 800 },
    { id: 3, name: "Realme 8 Pro", price: 700 }
  ] },
  { name: "Watches", items: [
    { id: 4, name: "Apple Watch Series", price: 300 },
    { id: 5, name: "Bracelet", price: 1430 }
  ] },

];

const initialOrder = [
  { id: 101, name: "Iphone 11S", price: 400, stock: 10, qty: 4 },
  { id: 102, name: "Samsung Galaxy S21", price: 400, stock: 6, qty: 1 },
  { id: 103, name: "Red Boot Shoes", price: 600, stock: 4, qty: 3 },
];

const Pos = () => {
  const [orderItems, setOrderItems] = useState(initialOrder);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const updateQty = (id, delta) => {
    setOrderItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const deleteItem = (id) => {
    setOrderItems((prev) => prev.filter((item) => item.id !== id));
  };

  const getSubtotal = () => {
    return orderItems.reduce((sum, item) => sum + item.price, 0);
  };

  const currentProducts = categories.find((cat) => cat.name === selectedCategory)?.items || [];

  return (

<div className=" mt-1 py-2">
  <div className="row min-vh-100">
    
        {/* Left side */}
        <div className="col-md-7 p-3  mt-3 border rounded d-flex flex-column overflow-auto">
          <div className="d-flex justify-content-between align-items-center mb-3">
     
            <input className="form-control w-25" placeholder="Search Product" />
          </div>

          <div className="d-flex mb-3 gap-3 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.name}
                className={`btn btn-sm ${selectedCategory === cat.name ? "btn-primary" : "btn-outline-secondary"}`}
                onClick={() => setSelectedCategory(cat.name)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="row">
            {currentProducts.map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="border text-center p-2 position-relative rounded h-100">
                  <div className="bg-light d-flex align-items-center justify-content-center mb-2" style={{ height: "150px" }}>
                    <span className="text-muted">350 x 234</span>
                  </div>
                  <h6 className="mb-1">{product.name}</h6>
                  <p className="text-muted">${product.price}</p>
                  <button className="btn btn-sm btn-success position-absolute top-0 end-0 m-1 rounded-circle">
                    <FaPlus size={10} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side */}
        <div className="col-md-5 p-3 overflow-auto">
          <div className="border p-3 rounded">
            <h5>Order List</h5>
            <div className="mb-2">Transaction ID : #65565</div>
            <input type="date" className="form-control mb-2" defaultValue="2025-07-08" />
            <input type="text" className="form-control mb-2" placeholder="Type Ref Number" />
            <select className="form-select mb-2">
              <option>Walk in Customer</option>
            </select>
            <div className="d-flex gap-2 mb-2">
              <select className="form-select">
                <option>USD</option>
                <option>Rs</option>
                <option>Euro</option>
              </select>
              <input
                type="text"
                className="form-control"
                placeholder="Currency Exchange Rate"
              />
            </div>

            <hr />
            <h6 className="mb-3">Order Details</h6>
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="d-flex align-items-center justify-content-between border-bottom py-2 gap-2"
              >
                <div className="flex-grow-1">
                  <strong>{item.name}</strong>
                  <div className="text-muted small">In Stock: {item.stock}</div>
                </div>
                <input className="form-control w-25" placeholder="Batch No" />
                <div>${item.price}</div>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => updateQty(item.id, -1)}
                  >
                    <FaMinus />
                  </button>
                  <span className="px-2">{item.qty}</span>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => updateQty(item.id, 1)}
                  >
                    <FaPlus />
                  </button>
                </div>
                <div>${item.price}</div>
                <button className="btn btn-sm text-danger" onClick={() => deleteItem(item.id)}>
                  <FaTrash />
                </button>
              </div>
            ))}

<div className="mt-4">
  <div className="border p-3 rounded">
    <div className="d-flex justify-content-between mb-2">
      <span>Sub Total</span>
      <strong>${getSubtotal()}</strong>
    </div>
    <div className="d-flex justify-content-between mb-2">
      <span>Shipping</span>
      <strong>$35</strong>
    </div>
    <div className="d-flex justify-content-between mb-2">
      <span>Tax</span>
      <strong>$7</strong>
    </div>
    <div className="d-flex justify-content-between mb-2">
      <span>Coupon</span>
      <strong>$25</strong>
    </div>
    <div className="d-flex justify-content-between mb-2 text-danger">
      <span>Discount</span>
      <strong>-$24</strong>
    </div>
    <hr />
    <div className="d-flex justify-content-between fs-5">
      <strong>Grand Total</strong>
      <strong>
        $
        {getSubtotal() + 35 + 7 - 25 - 24}
      </strong>
    </div>
  </div>
</div>


            <hr />
            <h6 className="mb-2">Payment Method</h6>
            <select
              className="form-select mb-3"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="Cash">Cash Payment</option>
              <option value="UPI">UPI Payment</option>
              <option value="Card">Card Payment</option>
            </select>

            <div className="text-end">
              <button className="btn btn-primary">Confirm & Pay</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pos;
