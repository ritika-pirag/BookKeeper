import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaArrowUp, FaArrowDown, FaShoppingCart, FaUndo, FaDownload, FaTimes, FaFilePdf, FaFileCsv, FaChevronRight } from 'react-icons/fa';

const chartData = [
    { name: 'Jan', totalOrders: 850, delivered: 820, returnRate: 3.5 },
    { name: 'Feb', totalOrders: 920, delivered: 890, returnRate: 3.2 },
    { name: 'Mar', totalOrders: 880, delivered: 850, returnRate: 3.8 },
    { name: 'Apr', totalOrders: 950, delivered: 920, returnRate: 3.1 },
    { name: 'May', totalOrders: 1020, delivered: 990, returnRate: 2.9 },
    { name: 'Jun', totalOrders: 980, delivered: 940, returnRate: 4.1 },
    { name: 'Jul', totalOrders: 1100, delivered: 1050, returnRate: 4.5 }
];

const Reports = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('7 Days');
    const [showExportModal, setShowExportModal] = useState(false);

    const handleExport = (format) => {
        console.log(`Exporting as ${format}`);
        setShowExportModal(false);
    };

    return (
        <div className="container-fluid bg-light min-vh-100 py-4">
            <div className="container">
                <div className="mb-4">
                    <h1 className="display-6 fw-bold text-dark">Reports</h1>
                    <p className="text-muted">Here's what's happening with your business today.</p>
                </div>

                <div className="row g-4 mb-4">
                    <div className="col-md-6">
                        <div className="card shadow-sm">
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="text-muted small mb-1">Total Orders</p>
                                    <h3 className="fw-bold">1,847</h3>
                                    <div className="d-flex align-items-center text-success">
                                        <FaArrowUp className="me-1" />
                                        <span>+15.3%</span>
                                    </div>
                                </div>
                                <div className="bg-primary bg-opacity-10 rounded-circle p-3">
                                    <FaShoppingCart className="text-primary fs-4" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card shadow-sm">
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="text-muted small mb-1">Return Rate vs Fulfilled</p>
                                    <h3 className="fw-bold">3.7%</h3>
                                    <div className="d-flex align-items-center text-success">
                                        <FaArrowDown className="me-1" />
                                        <span>-0.8%</span>
                                    </div>
                                </div>
                                <div className="bg-danger bg-opacity-10 rounded-circle p-3">
                                    <FaUndo className="text-danger fs-4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card shadow-sm mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Order Analytics</h5>
                        <div className="d-flex gap-2">
                            {['7 Days', '30 Days', '90 Days'].map(period => (
                                <button
                                    key={period}
                                    className={`btn btn-sm ${selectedPeriod === period ? 'btn-primary text-white' : 'btn-outline-secondary'}`}
                                    onClick={() => setSelectedPeriod(period)}
                                >
                                    {period}
                                </button>
                            ))}
                            <button className="btn btn-outline-secondary btn-sm" onClick={() => setShowExportModal(true)}>
                                <FaDownload className="me-1" /> Export
                            </button>
                        </div>
                    </div>
                    <div className="card-body">
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={chartData}>
                                <XAxis dataKey="name" />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `${v}%`} />
                                <Tooltip />
                                <Legend />
                                <Line yAxisId="left" type="monotone" dataKey="totalOrders" name="Total Orders" stroke="#3B82F6" />
                                <Line yAxisId="left" type="monotone" dataKey="delivered" name="Delivered Orders" stroke="#10B981" />
                                <Line yAxisId="right" type="monotone" dataKey="returnRate" name="Return Rate vs Fulfilled" stroke="#EF4444" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card shadow-sm">
                    <div className="card-header">
                        <h5 className="mb-0">Recent Order Activities</h5>
                    </div>
                    <div className="table-responsive">
                        <table className="table align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>Order ID</th>
                                    <th>Store</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ['#ORD-2024-001', 'Fashion Hub', 'Processing', '2 hours ago', 'primary'],
                                    ['#ORD-2024-002', 'Tech Store', 'Shipped', '4 hours ago', 'warning'],
                                    ['#ORD-2024-003', 'Home Decor', 'Delivered', '6 hours ago', 'success'],
                                    ['#ORD-2024-004', 'Sports World', 'Pending', '8 hours ago', 'orange'],
                                    ['#ORD-2024-005', 'Book Corner', 'Cancelled', '10 hours ago', 'danger']
                                ].map(([id, store, status, time, variant], idx) => (
                                    <tr key={idx}>
                                        <td>{id}</td>
                                        <td>{store}</td>
                                        <td>
                                            <span className={`badge bg-${variant} bg-opacity-10 text-${variant}`}>{status}</span>
                                        </td>
                                        <td>{time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {showExportModal && (
                    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Export Report</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowExportModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <p>Choose the format you want to export your report in:</p>
                                    <div className="list-group">
                                        <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center" onClick={() => handleExport('PDF')}>
                                            <div className="d-flex align-items-center">
                                                <FaFilePdf className="text-danger me-3 fs-4" />
                                                <div>
                                                    <div className="fw-bold">PDF Format</div>
                                                    <div className="text-muted small">Best for printing and sharing</div>
                                                </div>
                                            </div>
                                            <FaChevronRight />
                                        </button>
                                        <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center" onClick={() => handleExport('CSV')}>
                                            <div className="d-flex align-items-center">
                                                <FaFileCsv className="text-success me-3 fs-4" />
                                                <div>
                                                    <div className="fw-bold">CSV Format</div>
                                                    <div className="text-muted small">Best for data analysis</div>
                                                </div>
                                            </div>
                                            <FaChevronRight />
                                        </button>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={() => setShowExportModal(false)}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reports;
