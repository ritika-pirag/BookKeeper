import React, { useState } from 'react';
import { FaFilePdf, FaFileExcel, FaCog } from 'react-icons/fa';

import { FaCalendarAlt } from "react-icons/fa";
const  Accountstatement = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dateRange, setDateRange] = useState('01-Jan-2025 - 12-Dec-2025');
    const [selectedAccount, setSelectedAccount] = useState('Select');

    const transactions = [
        {
            refNo: '#AS842',
            date: '24 Dec 2024',
            category: 'Sale',
            description: 'Sale of goods',
            amount: '+$200',
            type: 'Credit',
            balance: '$4365'
        },
        {
            refNo: '#AS921',
            date: '10 Dec 2024',
            category: 'Refund',
            description: 'Refund Issued',
            amount: '-$50',
            type: 'Debit',
            balance: '$4444'
        },
        {
            refNo: '#AS847',
            date: '27 Nov 2024',
            category: 'Purchase',
            description: 'Inventory restocking',
            amount: '-$800',
            type: 'Debit',
            balance: '$65145'
        },
        {
            refNo: '#AS874',
            date: '18 Nov 2024',
            category: 'Sale',
            description: 'Sale of goods',
            amount: '+$100',
            type: 'Credit',
            balance: '$1848'
        },
        {
            refNo: '#AS887',
            date: '06 Nov 2024',
            category: 'Purchase',
            description: 'Inventory restocking',
            amount: '-$700',
            type: 'Debit',
            balance: '$986'
        },
        {
            refNo: '#AS856',
            date: '25 Oct 2024',
            category: 'Utility Payment',
            description: 'Electricity Bill',
            amount: '-$1000',
            type: 'Debit',
            balance: '$15547'
        },
        {
            refNo: '#AS822',
            date: '14 Oct 2024',
            category: 'Equipment Purchase',
            description: 'New POS terminal purchased',
            amount: '-$1200',
            type: 'Debit',
            balance: '$141645'
        },
        {
            refNo: '#AS844',
            date: '03 Oct 2024',
            category: 'Refund',
            description: 'Refund Issued',
            amount: '-$750',
            type: 'Debit',
            balance: '$4356'
        },
        {
            refNo: '#AS832',
            date: '20 Sep 2024',
            category: 'Withdraw',
            description: 'Withdraw by accountant',
            amount: '-$450',
            type: 'Debit',
            balance: '$614389'
        }
    ];

    const getBadgeClass = (type) => {
        return type === 'Credit' ? 'badge bg-success' : 'badge bg-danger';
    };

    const getBadgeText = (type) => {
        return type === 'Credit' ? 'Credit' : 'Debit';
    };

    return (

        <div className="container-fluid" style={{ backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
            {/* Header */}
            <div className="row  border-bottom">
                <div className="col-12 p-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h4 className="mb-0 text-dark">Account Statement</h4>
                            <small className="text-muted">View Your Statement</small>
                        </div>
                        <div className="d-flex gap-2">
                            <button className="btn btn-outline-danger btn-sm">
                                <FaFilePdf className="me-1" />
                                <span className="d-none d-sm-inline"></span>
                            </button>
                            <button className="btn btn-outline-success btn-sm">
                                <FaFileExcel className="me-1" />
                                <span className="d-none d-sm-inline"></span>
                            </button>

                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="row bg-white border-bottom">
                <div className="col-12 p-3">
                    <div className="row g-3">
                        <div className="col-md-3">
                            <label className="form-label text-muted">Choose Your Date</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaCalendarAlt />
                                </span>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label className="form-label text-muted">Account</label>
                            <select
                                className="form-select"
                                value={selectedAccount}
                                onChange={(e) => setSelectedAccount(e.target.value)}
                            >
                                <option>Select</option>
                                <option>HBSC - 329878430945</option>
                                <option>Account 2</option>
                                <option>Account 3</option>
                            </select>
                        </div>
                        <div className="col-md-2 d-flex align-items-end">
                            <button className="btn btn-warning w-100" style={{ color: "white" }}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statement Content */}
            <div className="row">
                <div className="col-12 p-3">
                    <div className="bg-white rounded shadow-sm ">
                        <div className="p-3  mb-2">
                            <h5 className="mb-0">
                                Statement of Account:
                                <span className="text-warning ms-2">HBSC - 329878430945</span>
                            </h5>
                        </div>

                        {/* Desktop Table */}
                        <div className="d-none d-lg-block">
                            <div className="table-responsive">
                                <table className="table table-bordered table-hover align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th className="py-3" >Reference Number</th>
                                            <th className="py-3">Date</th>
                                            <th className="py-3">Category</th>
                                            <th className="py-3">Description</th>
                                            <th className="py-3">Amount</th>
                                            <th className="py-3">Transaction Type</th>
                                            <th className="py-3">Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactions.map((transaction, index) => (
                                            <tr key={index} >
                                                <td className="text-muted py-3">{transaction.refNo}</td>
                                                <td>{transaction.date}</td>
                                                <td>{transaction.category}</td>
                                                <td>{transaction.description}</td>
                                                <td className={transaction.amount.startsWith('+') ? 'text-success' : 'text-danger'}>
                                                    {transaction.amount}
                                                </td>
                                                <td>
                                                    <span className={getBadgeClass(transaction.type)}>
                                                        {getBadgeText(transaction.type)}
                                                    </span>
                                                </td>
                                                <td>{transaction.balance}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Mobile Cards */}
                        <div className="d-lg-none">
                            {transactions.map((transaction, index) => (
                                <div key={index} className="border-bottom p-3">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <div>
                                            <h6 className="mb-0">{transaction.refNo}</h6>
                                            <small className="text-muted">{transaction.date}</small>
                                        </div>
                                        <span className={getBadgeClass(transaction.type)}>
                                            {getBadgeText(transaction.type)}
                                        </span>
                                    </div>
                                    <div className="row g-2">
                                        <div className="col-6">
                                            <small className="text-muted d-block">Category</small>
                                            <span>{transaction.category}</span>
                                        </div>
                                        <div className="col-6">
                                            <small className="text-muted d-block">Amount</small>
                                            <span className={transaction.amount.startsWith('+') ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                                                {transaction.amount}
                                            </span>
                                        </div>
                                        <div className="col-12">
                                            <small className="text-muted d-block">Description</small>
                                            <span>{transaction.description}</span>
                                        </div>
                                        <div className="col-12">
                                            <small className="text-muted d-block">Balance</small>
                                            <span className="fw-bold">{transaction.balance}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Total */}
                        <div className="p-3 border-top bg-light">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Total</h5>
                                <h5 className="mb-0 text-success">$33268.53</h5>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accountstatement;
