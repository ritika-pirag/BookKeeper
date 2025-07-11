import React, { useState } from "react";
import { FaFileInvoice, FaPlus, FaEye, FaTrash, FaSearch } from "react-icons/fa";

const defaultTerms = `1. Payment due within 15 days of invoice date.
2. Quality check will be performed upon delivery.
3. Goods must match the specifications provided.`;

const PurchaseInvoice = () => {
    const [items, setItems] = useState([
        {
            product: 'Cocoa Beans',
            description: 'Premium cocoa beans from Ghana',
            qty: 50,
            price: 500,
            tax: 18,
            discount: 5,
        }
    ]);

    const [notes, setNotes] = useState('');
    const [terms, setTerms] = useState(defaultTerms);
    const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');
    const [paymentStatus, setPaymentStatus] = useState('Unpaid');

    // Calculate totals
    const subtotal = items.reduce((acc, item) => acc + item.qty * item.price, 0);
    const discountTotal = items.reduce((acc, item) => {
        const base = item.qty * item.price;
        return acc + (base * item.discount) / 100;
    }, 0);
    const taxTotal = items.reduce((acc, item) => {
        const base = item.qty * item.price;
        const discountAmount = (base * item.discount) / 100;
        return acc + ((base - discountAmount) * item.tax) / 100;
    }, 0);
    const grandTotal = subtotal - discountTotal + taxTotal;

    const calculateTotal = (item) => {
        const base = item.qty * item.price;
        const discountAmount = (base * item.discount) / 100;
        const taxAmount = ((base - discountAmount) * item.tax) / 100;
        return (base - discountAmount + taxAmount).toFixed(2);
    };

    const addItem = () => {
        setItems([
            ...items,
            {
                product: '',
                description: '',
                qty: 0,
                price: 0,
                tax: 0,
                discount: 0,
            }
        ]);
    };

    const removeItem = (index) => {
        const updated = [...items];
        updated.splice(index, 1);
        setItems(updated);
    };

    const handleChange = (index, field, value) => {
        const updated = [...items];
        updated[index][field] = field === 'description' || field === 'product' ? value : Number(value);
        setItems(updated);
    };

    const handleCancel = () => { };
    const handleSaveDraft = () => { };
    const handleCreate = () => { };

    return (
        <div className="container-fluid p-0" style={{ background: '#f7f7f7', minHeight: '100vh' }}>
            <div className="container py-4">
                <div className="card shadow-sm border-0" style={{
                    borderRadius: '16px',
                    border: '1px solid #fbeee1',
                    backgroundColor: '#fff'
                }}>
                    <div className="card-body p-4">
                        {/* Header */}
                        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                            <h2 className="fw-bold m-0 text-dark">
                                Create Purchase Invoice
                            </h2>

                            <div className="d-flex flex-wrap gap-2 mt-3 mt-md-0">
                                <button
                                    className="btn btn-outline-yellow d-flex align-items-center gap-2"
                                >
                                    <FaEye /> Preview
                                </button>

                                <button
                                    className="btn btn-yellow text-white fw-semibold"
                                >
                                    Save
                                </button>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="row g-4 mb-4">
                            {/* Vendor Info */}
                            <div className="col-md-6">
                                <div className="text-yellow-600 fw-medium mb-2">Vendor Information</div>
                                <div className="p-3 rounded" style={{ backgroundColor: '#f7f7f7' }}>
                                    <label className="fw-semibold mb-1 text-dark">
                                        Select Vendor
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control border-end-0"
                                            placeholder="Search vendor by name or GSTIN..."
                                        />
                                        <span className="input-group-text bg-white border-start-0">
                                            <FaSearch className="text-yellow-600" />
                                        </span>
                                    </div>
                                    <div className="mt-2 text-dark cursor-pointer fw-medium">
                                        <span className="me-1 text-yellow-600">+</span> Add New Vendor
                                    </div>
                                </div>
                            </div>

                            {/* Invoice Info */}
                            <div className="col-md-6">
                                <div className="text-yellow-600 fw-medium mb-2">Purchase Invoice Details</div>
                                <div className="p-3 rounded" style={{ backgroundColor: '#f7f7f7' }}>
                                    <div className="row g-3">
                                        <div className="col-sm-6 col-md-6">
                                            <label className="fw-semibold mb-1 text-dark">Invoice Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value="PI-2025-056"
                                                readOnly
                                            />
                                        </div>
                                        <div className="col-sm-6 col-md-6">
                                            <label className="fw-semibold mb-1 text-dark">Invoice Date</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                value="2025-06-26"
                                            />
                                        </div>
                                        <div className="col-sm-6 col-md-6">
                                            <label className="fw-semibold mb-1 text-dark">Due Date</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                value="2025-07-10"
                                            />
                                        </div>
                                        <div className="col-sm-6 col-md-6">
                                            <label className="fw-semibold mb-1 text-dark">Reference</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="PO Number, etc."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Table */}
                        <div className="mt-4">
                            <div className="text-yellow-600 fw-medium mb-2">Purchase Items</div>
                            <div className="table-responsive">
                                <table className="table table-hover" style={{ minWidth: 900 }}>
                                    <thead className="bg-yellow-50 text-yellow-700">
                                        <tr>
                                            <th className="fw-semibold">PRODUCT</th>
                                            <th className="fw-semibold">DESCRIPTION</th>
                                            <th className="fw-semibold">QTY</th>
                                            <th className="fw-semibold">PRICE (₹)</th>
                                            <th className="fw-semibold">TAX (%)</th>
                                            <th className="fw-semibold">DISCOUNT (%)</th>
                                            <th className="fw-semibold">TOTAL (₹)</th>
                                            <th className="text-center"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item, idx) => (
                                            <tr key={idx} className="align-middle">
                                                <td>
                                                    <select
                                                        className="form-select"
                                                        style={{ borderColor: '#fbeee1' }}
                                                        value={item.product}
                                                        onChange={(e) => handleChange(idx, 'product', e.target.value)}
                                                    >
                                                        <option>Cocoa Beans</option>
                                                        <option>Milk</option>
                                                        <option>Sugar</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        style={{ borderColor: '#fbeee1' }}
                                                        value={item.description}
                                                        onChange={(e) => handleChange(idx, 'description', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        style={{ borderColor: '#fbeee1' }}
                                                        value={item.qty}
                                                        onChange={(e) => handleChange(idx, 'qty', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        style={{ borderColor: '#fbeee1' }}
                                                        value={item.price}
                                                        onChange={(e) => handleChange(idx, 'price', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        style={{ borderColor: '#fbeee1' }}
                                                        value={item.tax}
                                                        onChange={(e) => handleChange(idx, 'tax', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        style={{ borderColor: '#fbeee1' }}
                                                        value={item.discount}
                                                        onChange={(e) => handleChange(idx, 'discount', e.target.value)}
                                                    />
                                                </td>
                                                <td className="fw-semibold text-dark">
                                                    ₹{calculateTotal(item)}
                                                </td>
                                                <td className="text-center">
                                                    <button
                                                        className="btn btn-link p-0 text-danger"
                                                        onClick={() => removeItem(idx)}
                                                        title="Delete"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <button
                                className="btn btn-outline-yellow mt-3 d-flex align-items-center gap-2"
                                onClick={addItem}
                            >
                                <FaPlus /> Add Item
                            </button>
                        </div>

                        {/* Notes & Terms + Purchase Summary */}
                        <div className="row g-4 mt-4">
                            {/* Notes & Terms */}
                            <div className="col-lg-6">
                                <div className="text-yellow-600 fw-medium mb-2">
                                    Notes & Terms
                                </div>
                                <div className="p-3 rounded" style={{ backgroundColor: '#f7f7f7' }}>
                                    <div className="mb-3">
                                        <label className="fw-semibold mb-1 text-dark">
                                            Notes
                                        </label>
                                        <textarea
                                            className="form-control"
                                            style={{ minHeight: '54px' }}
                                            placeholder="Any additional notes for the vendor..."
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="fw-semibold mb-1 text-dark">
                                            Terms & Conditions
                                        </label>
                                        <textarea
                                            className="form-control"
                                            style={{ minHeight: '144px' }}
                                            value={terms}
                                            onChange={(e) => setTerms(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Purchase Summary */}
                            <div className="col-lg-6">
                                <div className="text-yellow-600 fw-medium mb-2">
                                    Purchase Summary
                                </div>
                                <div className="p-3 rounded" style={{ backgroundColor: '#f7f7f7' }}>
                                    <div className="mb-3">
                                        <div className="d-flex justify-content-between mb-2">
                                            <span>Subtotal:</span>
                                            <span>₹{subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-2">
                                            <span>Discount:</span>
                                            <span>₹{discountTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-3">
                                            <span>Tax:</span>
                                            <span>₹{taxTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                                        </div>
                                        <hr className="my-2 border-dark" />
                                        <div className="d-flex justify-content-between fw-bold fs-5 mb-3 text-dark">
                                            <span>Grand Total:</span>
                                            <span>₹{grandTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="fw-semibold mb-1 text-dark">
                                            Payment Method
                                        </label>
                                        <select
                                            className="form-select mb-3"
                                            value={paymentMethod}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        >
                                            <option>Bank Transfer</option>
                                            <option>UPI</option>
                                            <option>Cheque</option>
                                            <option>Cash</option>
                                        </select>
                                        <label className="fw-semibold mb-1 text-dark">
                                            Payment Status
                                        </label>
                                        <select
                                            className="form-select"
                                            value={paymentStatus}
                                            onChange={(e) => setPaymentStatus(e.target.value)}
                                        >
                                            <option>Unpaid</option>
                                            <option>Paid</option>
                                            <option>Partial</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="d-flex flex-wrap gap-3 justify-content-end mt-4">
                                    <button
                                        className="btn btn-outline-yellow"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="btn btn-outline-yellow"
                                        onClick={handleSaveDraft}
                                    >
                                        Save as Draft
                                    </button>
                                    <button
                                        className="btn btn-yellow text-white fw-semibold"
                                        onClick={handleCreate}
                                    >
                                        Create Purchase Invoice
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom CSS for yellow theme */}
            <style jsx>{`
    .bg-yellow-50 {
        background-color: #fff6f0;
    }
    .border-yellow-100 {
        border: 1px solid #fdeede;
    }
    .text-yellow-600 {
        color: #fcb900; /* brighter yellow */
    }
    .btn-yellow {
        background-color: #fcb900;
        border-color: #fcb900;
        color: white;
    }
    .btn-yellow:hover {
        background-color: #e0a800;
        border-color: #e0a800;
    }
    .btn-outline-yellow {
        color: #fcb900;
        border-color: #fcb900;
        background-color: white;
    }
    .btn-outline-yellow:hover {
        background-color: #fff6f0;
        border-color: #fcb900;
        color: #fcb900;
    }
    .table-hover tbody tr:hover {
        background-color: #fffaf0 !important;
    }
    .form-control:hover, .form-select:hover {
        border-color: #fcb900 !important;
    }
    .form-control:focus, .form-select:focus {
        border-color: #fcb900 !important;
        box-shadow: 0 0 0 0.25rem rgba(252, 185, 0, 0.25);
    }
`}</style>

        </div>
    );
};

export default PurchaseInvoice;