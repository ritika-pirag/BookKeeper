import React, { useState } from 'react';
import { Modal, Button, Form, Col, Row, Table } from 'react-bootstrap';
import { FaEdit, FaFileExcel, FaFilePdf, FaPlusCircle, FaTrash,FaEye } from 'react-icons/fa';

const salesReturnData = [
    {
        product: 'Lenovo IdeaPad 3',
        img: 'https://i.ibb.co/cSd48MWC/p1.png',
        date: '19 Nov 2022',
        customer: 'Carl Evans',
        status: 'Received',
        total: 1000,
        paid: 1000,
        due: 0,
        paymentStatus: 'Paid',
    },
    {
        product: 'Apple tablet',
        img: 'https://i.ibb.co/QFT0zW6w/p2.png',
        date: '19 Nov 2022',
        customer: 'Minerva Rameriz',
        status: 'Pending',
        total: 1500,
        paid: 0,
        due: 1500,
        paymentStatus: 'Unpaid',
    },
    {
        product: 'Headphone',
        img: 'https://i.ibb.co/rRQbH603/p3.png',
        date: '19 Nov 2022',
        customer: 'Robert Lamon',
        status: 'Received',
        total: 2000,
        paid: 1000,
        due: 1000,
        paymentStatus: 'Overdue',
    },
    {
        product: 'Nike Jordan',
        img: 'https://i.ibb.co/21wF56v5/p4.png',
        date: '19 Nov 2022',
        customer: 'Mark Joslyn',
        status: 'Received',
        total: 1500,
        paid: 1500,
        due: 0,
        paymentStatus: 'Paid',
    },
    {
        product: 'Macbook Pro',
        img: 'https://i.ibb.co/wFTQyMjF/p5.png',
        date: '19 Nov 2022',
        customer: 'Patricia Lewis',
        status: 'Received',
        total: 800,
        paid: 800,
        due: 0,
        paymentStatus: 'Paid',
    },
    {
        product: 'Red Premium Satchel',
        img: 'https://i.ibb.co/8gmwwrJH/p8.png',
        date: '19 Nov 2022',
        customer: 'Marsha Betts',
        status: 'Pending',
        total: 750,
        paid: 0,
        due: 750,
        paymentStatus: 'Unpaid',
    },
    {
        product: 'Apple Earpods',
        img: 'https://i.ibb.co/QFQpmHkT/p7.png',
        date: '19 Nov 2022',
        customer: 'Daniel Jude',
        status: 'Received',
        total: 1300,
        paid: 1300,
        due: 0,
        paymentStatus: 'Paid',
    },
    {
        product: 'Iphone 14 Pro',
        img: 'https://i.ibb.co/svxxf0cW/p6.png',
        date: '19 Nov 2022',
        customer: 'Emma Bates',
        status: 'Received',
        total: 1100,
        paid: 1100,
        due: 0,
        paymentStatus: 'Paid',
    },
];

const SalesReturn = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const allChecked = selectedRows.length === salesReturnData.length;
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingItem, setDeletingItem] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedReturn, setSelectedReturn] = useState(null);
    const [viewingItem, setViewingItem] = useState(null);

    const handleSelectAll = () => {
        if (allChecked) {
            setSelectedRows([]);
        } else {
            setSelectedRows(salesReturnData.map((_, idx) => idx));
        }
    };
    const handleSelectRow = (index) => {
        if (selectedRows.includes(index)) {
            setSelectedRows(selectedRows.filter((i) => i !== index));
        } else {
            setSelectedRows([...selectedRows, index]);
        }
    };
    const handleEditClick = (returnItem) => {
        setSelectedReturn(returnItem);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setSelectedReturn(null);
    };

    const handleDeleteClick = (item) => {
        setDeletingItem(item);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setDeletingItem(null);
    };

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const getStatusBadge = (status) => {
        return status === 'Received'
            ? 'bg-success'
            : 'bg-primary';
    };

    const getPaymentStatusBadge = (paymentStatus) => {
        switch (paymentStatus) {
            case 'Paid': return 'text-success';
            case 'Unpaid': return 'text-danger';
            case 'Overdue': return 'text-warning';
            default: return 'text-secondary';
        }
    };

    return (
        <div className=" mt-1 py-2 px-2" style={{ backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-4 mb-2">
                <div>
                    <h5 className="fw-semibold">Sales Return</h5>
                    <p className="text-muted">Manage your returns</p>
                </div>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                    <button className="btn btn-light border text-danger">
                        <FaFilePdf />
                    </button>
                    <button className="btn btn-light border text-success">
                        <FaFileExcel />
                    </button>
                    {/* <button
                        className="btn text-white d-flex align-items-center gap-2"
                        style={{ backgroundColor: "#FFA646" }}
                        onClick={handleShow}
                    >
                        <FaPlusCircle />
                        Add Sales Return
                    </button> */}
                </div>
            </div>

            <div className="card p-3">
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                    <input
                        type="text"
                        className="form-control w-auto mb-2"
                        placeholder="Search"
                        style={{ minWidth: '200px' }}
                    />

                    <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
                        <div className="filter-dropdown">
                            <select className="form-select form-select-sm bg-light border-0 rounded-2 px-3 py-2">
                                <option>Customer</option>
                                <option>Carl Evans</option>
                                <option>Minerva Rameriz</option>
                                <option>Robert Lamon</option>
                            </select>
                        </div>

                        <div className="filter-dropdown">
                            <select className="form-select form-select-sm bg-light border-0 rounded-2 px-3 py-2">
                                <option>Status</option>
                                <option>Received</option>
                                <option>Pending</option>
                            </select>
                        </div>

                        <div className="filter-dropdown">
                            <select className="form-select form-select-sm bg-light border-0 rounded-2 px-5 py-2">
                                <option>Payment Status</option>
                                <option>Paid</option>
                                <option>Unpaid</option>
                                <option>Overdue</option>
                            </select>
                        </div>

                        <div className="filter-dropdown">
                            <select className="form-select form-select-sm bg-light border-0 rounded-2 px-5 py-2">
                                <option>Sort By : Last 7 Days</option>
                                <option>Last 30 Days</option>
                                <option>Last 90 Days</option>
                            </select>
                        </div>
                    </div>

                    <style>{`
                        .filter-dropdown select {
                            cursor: pointer;
                            transition: all 0.3s ease;
                            appearance: none;
                            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
                            background-repeat: no-repeat;
                            background-position: right 0.75rem center;
                            background-size: 16px 12px;
                        }
                        
                        .filter-dropdown:hover select {
                            background-color: rgb(249, 193, 8) !important;
                            border-color: rgb(249, 193, 8) !important;
                            color: #000 !important;
                        }
                        
                        .filter-dropdown select option {
                            background: white !important;
                            color: #000 !important;
                        }
                        
                        .filter-dropdown select:focus {
                            box-shadow: 0 0 0 0.25rem rgba(249, 193, 8, 0.5);
                            border-color: rgb(249, 193, 8);
                            outline: none;
                        }
                    `}</style>
                </div>

                {/* Table */}
                <div className="table-responsive">
                    <table className="table table-bordered text-center align-middle product-table mb-0">
                        <thead className="table-light text-white">
                            <tr>
                                <th>
                                    <input
                                        type="checkbox"
                                        className="form-check-input yellow-check"
                                        checked={allChecked}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th className="py-3">Product</th>
                                <th  className="py-3">Date</th>
                                <th className="py-3">Customer</th>
                                <th className="py-3">Status</th>
                                <th className="py-3">Total</th>
                                <th className="py-3">Paid</th>
                                <th className="py-3">Due</th>
                                <th className="py-3">Payment Status</th>
                                <th className="py-3" style={{ minWidth: "120px" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salesReturnData.map((item, index) => (
                                <tr
                                    key={index}
                                    className={`table-row-hover ${selectedRows.includes(index) ? "table-active-yellow" : ""
                                        }`}
                                >
                                    <td>
                                        <input
                                            type="checkbox"
                                            className="form-check-input yellow-check"
                                            checked={selectedRows.includes(index)}
                                            onChange={() => handleSelectRow(index)}
                                        />
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center justify-content-start ps-3">
                                            <img
                                                src={item.img}
                                                alt={item.product}
                                                width={30}
                                                height={30}
                                                className="me-2 rounded-1 object-fit-cover"
                                                style={{ minWidth: "30px" }}
                                            />
                                            <span className="text-truncate">{item.product}</span>
                                        </div>
                                    </td>
                                    <td>{item.date}</td>
                                    <td>
                                        <div className="d-flex align-items-center justify-content-center">

                                            <span className="text-truncate">{item.customer}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`badge ${getStatusBadge(item.status)} px-3 py-1`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td>${item.total}</td>
                                    <td>${item.paid}.00</td>
                                    <td>${item.due}.00</td>
                                    <td>
                                        <span className={`fw-bold ${getPaymentStatusBadge(item.paymentStatus)}`}>
                                            • {item.paymentStatus}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="d-flex gap-1 justify-content-center">
                                            <button
                                                className="btn outline-primary  btn-sm text-warning py-1 px-1"
                                                onClick={() => handleEditClick(item)}
                                            >
                                                <FaEdit size={16} />
                                            </button>
                                            {/* View Button */}
                                            <button
                className="btn outline-info btn-sm py-1 px-1 text-info"
                data-bs-toggle="modal"
                data-bs-target="#viewReturnModal"
                onClick={() => setViewingItem(item)}
              >
                <FaEye size={16} />
              </button>
                                            <button
                                                className="btn outline-primary btn-sm text-danger py-2 px-1"
                                                onClick={() => handleDeleteClick(item)}
                                            >
                                                <FaTrash size={16} />
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <style>{`
        .table-row-hover:hover {
          background-color: #fff9e6 !important;
        }

        .table-active-yellow {
          background-color: #fff9cc !important;
        }

        .object-fit-cover {
          object-fit: cover;
        }

        .table-grey {
          background-color: #6c757d;
        }

        .text-truncate {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: inline-block;
          max-width: 120px;
        }

        .btn-warning:hover {
          background-color: #e0a800 !important;
        }

        .btn-danger:hover {
          background-color: #c82333 !important;
        }

        .form-check-input.yellow-check:checked {
          background-color: #ffc107 !important;
          border-color: #ffc107 !important;
        }

        .form-check-input.yellow-check:checked[type="checkbox"] {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='10' fill='black' class='bi bi-check' viewBox='0 0 16 16'%3e%3cpath d='M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l1.94 1.939 3.646-4.293z'/%3e%3c/svg%3e");
        }
      `}</style>


                <div className="d-flex justify-content-between align-items-center mt-3">
                    <div>
                        <label>Row Per Page</label>
                        <select className="form-select d-inline w-auto ms-2">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                    <div>
                        <button className="btn btn-outline-secondary btn-sm me-2">❮</button>
                        <button className="btn btn-warning text-white btn-sm">1</button>
                        <button className="btn btn-outline-secondary btn-sm ms-2">❯</button>
                    </div>
                </div>
            </div>

            {/* Add Modal */}
            <Modal show={showModal} onHide={handleClose} centered size="xl">
                <Modal.Header className="border-0 pb-0">
                    <Modal.Title className="fw-bold text-dark">Add Sales Return</Modal.Title>
                    <button
                        className="btn p-0 ms-auto"
                        onClick={handleClose}
                        style={{
                            background: "#fff",
                            border: "none",
                            boxShadow: "none",
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            backgroundColor: "#e74c3c",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <span className="fs-4" style={{ color: "#fff", lineHeight: 1, fontWeight: 700 }}>
                            &times;
                        </span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* Top Row: Customer, Date, Reference */}
                        <Row className="mb-4">
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Customer Name <span className="text-danger">*</span></Form.Label>
                                    <Form.Select>
                                        <option>Choose Customer</option>
                                        <option>Carl Evans</option>
                                        <option>Minerva Rameriz</option>
                                        <option>Robert Lamon</option>
                                        <option>Thomas</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Date <span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="date"
                                        placeholder="Choose"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Reference <span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter reference number"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Product Selection */}
                        <Row className="mb-4">
                            <Col md={12}>
                                <Form.Group>
                                    <Form.Label>Product <span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Please type product code and select"
                                        style={{ backgroundColor: "#f8f9fa" }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Product Table */}
                        <div className="table-responsive mb-4">
                            <Table bordered hover>
                                <thead style={{ backgroundColor: "#f8f9fa" }}>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Net Unit Price($)</th>
                                        <th>Stock</th>
                                        <th>QTY</th>
                                        <th>Discount($)</th>
                                        <th>Tax %</th>
                                        <th>Subtotal ($)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Empty row for new entries - will be populated when products are selected */}
                                    <tr>
                                        <td colSpan="7" className="text-center text-muted py-4">
                                            No products selected. Please search and select products above.
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>

                        {/* Order Summary */}
                        <Row className="mb-4">
                            <Col md={6}></Col>
                            <Col md={6}>
                                <Table borderless className="mb-0">
                                    <tbody>
                                        <tr>
                                            <td className="text-end fw-semibold">Order Tax</td>
                                            <td className="text-end">$ 0.00</td>
                                        </tr>
                                        <tr>
                                            <td className="text-end fw-semibold">Discount</td>
                                            <td className="text-end">$ 0.00</td>
                                        </tr>
                                        <tr>
                                            <td className="text-end fw-semibold">Shipping</td>
                                            <td className="text-end">$ 0.00</td>
                                        </tr>
                                        <tr className="border-top">
                                            <td className="text-end fw-bold">Grand Total</td>
                                            <td className="text-end fw-bold">$ 0.00</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>

                        {/* Bottom Row: Order Tax, Discount, Shipping, Status */}
                        <Row>
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label>Order Tax <span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="number"
                                        defaultValue="0"
                                        placeholder="0"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label>Discount <span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="number"
                                        defaultValue="0"
                                        placeholder="0"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label>Shipping <span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="number"
                                        defaultValue="0"
                                        placeholder="0"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label>Status <span className="text-danger">*</span></Form.Label>
                                    <Form.Select>
                                        <option>Select</option>
                                        <option>Received</option>
                                        <option>Pending</option>
                                        <option>Completed</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="border-0 pt-0">
                    <Button
                        variant="outline-secondary"
                        onClick={handleClose}
                        style={{
                            backgroundColor: '#1f2937',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '8px 20px'
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        style={{
                            backgroundColor: '#ffa54c',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '8px 20px'
                        }}
                    >
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Modal */}
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
                <Modal.Body className="text-center py-4">
                    <div className="mb-3">
                        <div style={{
                            width: '60px',
                            height: '60px',
                            backgroundColor: '#fff0f0',
                            borderRadius: '50%',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: 'auto'
                        }}>
                            <img src="https://img.icons8.com/ios-filled/40/fa314a/delete-forever.png" alt="delete icon" />
                        </div>
                    </div>
                    <h5 className="fw-bold">Delete Sales Return</h5>
                    <p className="text-muted">Are you sure you want to delete this return entry?</p>
                    <div className="d-flex justify-content-center gap-3 mt-4">
                        <Button variant="dark" onClick={handleCloseDeleteModal}>No, Cancel</Button>
                        <Button style={{ backgroundColor: '#ffa54c', border: 'none' }} onClick={handleCloseDeleteModal}>Yes, Delete</Button>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={handleCloseEditModal} size="xl" centered>
                <Modal.Header className="border-0 pb-0">
                    <Modal.Title className="fw-bold">Edit Sales Return</Modal.Title>
                    <button
                        className="btn p-0 ms-auto"
                        onClick={handleCloseEditModal}
                        style={{
                            background: "#fff",
                            border: "none",
                            boxShadow: "none",
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            backgroundColor: "#e74c3c",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <span className="fs-4" style={{ color: "#fff", lineHeight: 1, fontWeight: 700 }}>
                            &times;
                        </span>
                    </button>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        {/* Top Row: Customer, Date, Reference */}
                        <Row className="mb-4">
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Customer Name <span className="text-danger">*</span></Form.Label>
                                    <Form.Select defaultValue={selectedReturn?.customer || "Thomas"}>
                                        <option>Thomas</option>
                                        <option>John</option>
                                        <option>Sarah</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Date <span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="date"
                                        placeholder="Choose"
                                        defaultValue={selectedReturn?.date || ""}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Reference <span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="text"
                                        defaultValue={selectedReturn?.reference || "555444"}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Product Selection */}
                        <Row className="mb-4">
                            <Col md={12}>
                                <Form.Group>
                                    <Form.Label>Product <span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Please type product code and select"
                                        style={{ backgroundColor: "#f8f9fa" }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Product Table */}
                        <div className="table-responsive mb-4">
                            <Table bordered hover>
                                <thead style={{ backgroundColor: "#f8f9fa" }}>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Net Unit Price($)</th>
                                        <th>Stock</th>
                                        <th>QTY</th>
                                        <th>Discount($)</th>
                                        <th>Tax %</th>
                                        <th>Subtotal ($)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div
                                                    className="me-2"
                                                    style={{
                                                        width: "30px",
                                                        height: "30px",
                                                        backgroundColor: "#ddd",
                                                        borderRadius: "4px"
                                                    }}
                                                ></div>
                                                Apple Earpods
                                            </div>
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                defaultValue="300"
                                                size="sm"
                                                style={{ border: "none", backgroundColor: "transparent" }}
                                            />
                                        </td>
                                        <td>400</td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                defaultValue="500"
                                                size="sm"
                                                style={{ border: "none", backgroundColor: "transparent" }}
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                defaultValue="100"
                                                size="sm"
                                                style={{ border: "none", backgroundColor: "transparent" }}
                                            />
                                        </td>
                                        <td>50</td>
                                        <td>300</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div
                                                    className="me-2"
                                                    style={{
                                                        width: "30px",
                                                        height: "30px",
                                                        backgroundColor: "#ddd",
                                                        borderRadius: "4px"
                                                    }}
                                                ></div>
                                                Apple Earpods
                                            </div>
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                defaultValue="150"
                                                size="sm"
                                                style={{ border: "none", backgroundColor: "transparent" }}
                                            />
                                        </td>
                                        <td>500</td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                defaultValue="300"
                                                size="sm"
                                                style={{ border: "none", backgroundColor: "transparent" }}
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                defaultValue="100"
                                                size="sm"
                                                style={{ border: "none", backgroundColor: "transparent" }}
                                            />
                                        </td>
                                        <td>50</td>
                                        <td>300</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>

                        {/* Order Summary */}
                        <Row className="mb-4">
                            <Col md={6}></Col>
                            <Col md={6}>
                                <Table borderless className="mb-0">
                                    <tbody>
                                        <tr>
                                            <td className="text-end fw-semibold">Order Tax</td>
                                            <td className="text-end">$ 0.00</td>
                                        </tr>
                                        <tr>
                                            <td className="text-end fw-semibold">Discount</td>
                                            <td className="text-end">$ 0.00</td>
                                        </tr>
                                        <tr>
                                            <td className="text-end fw-semibold">Shipping</td>
                                            <td className="text-end">$ 0.00</td>
                                        </tr>
                                        <tr className="border-top">
                                            <td className="text-end fw-bold">Grand Total</td>
                                            <td className="text-end fw-bold">$ 0.00</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>

                        {/* Bottom Row: Order Tax, Discount, Shipping, Status */}
                        <Row>
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label>Order Tax <span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="number"
                                        defaultValue="0"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label>Discount <span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="number"
                                        defaultValue="0"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label>Shipping <span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="number"
                                        defaultValue="0"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label>Status <span className="text-danger">*</span></Form.Label>
                                    <Form.Select defaultValue={selectedReturn?.status || ""}>
                                        <option>Select</option>
                                        <option>Received</option>
                                        <option>Pending</option>
                                        <option>Completed</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>

                <Modal.Footer className="border-0 pt-0">
                    <Button
                        variant="outline-secondary"
                        onClick={handleCloseEditModal}
                        style={{
                            backgroundColor: '#1f2937',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '8px 20px'
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCloseEditModal}
                        style={{
                            backgroundColor: '#ffa54c',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '8px 20px'
                        }}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* View Return Details Modal */}
<div
  className="modal fade"
  id="viewReturnModal"
  tabIndex="-1"
  aria-labelledby="viewReturnModalLabel"
  aria-hidden="true"
>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="viewReturnModalLabel">
          Return Details
        </h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div className="modal-body">
        {viewingItem ? (
          <>
            <p><strong>Invoice No:</strong> {viewingItem.invoiceNo}</p>
            <p><strong>Customer:</strong> {viewingItem.customer}</p>
            <p><strong>Date:</strong> {viewingItem.date}</p>
            <p><strong>Total:</strong> ${viewingItem.total}</p>
            <p><strong>Paid:</strong> ${viewingItem.paid}</p>
            <p><strong>Due:</strong> ${viewingItem.due}</p>
            <p><strong>Status:</strong> {viewingItem.status}</p>
            <p><strong>Payment Status:</strong> {viewingItem.paymentStatus}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
          Close
        </button>
      </div>
    </div>
  </div>
</div>
        </div>




    );
};








export default SalesReturn;  