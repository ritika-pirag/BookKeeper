import React, { useState } from 'react';

import { Modal, Button, Form, Table } from 'react-bootstrap';
import './ManageStock.css';
import { FaEdit, FaFileExcel, FaFilePdf, FaPlusCircle, FaTrash } from 'react-icons/fa';
const stockData = [
    {
        warehouse: 'Lavish Warehouse',
        store: 'Electro Mart',
        product: 'Lenovo IdeaPad 3',
        img: 'https://i.ibb.co/cSd48MWC/p1.png',
        date: '24 Dec 2024',
        person: 'James Kirwin',
        qty: 100,
    },
    {
        warehouse: 'Quaint Warehouse',
        store: 'Quantum Gadgets',
        product: 'Beats Pro',
        img: 'https://i.ibb.co/QFT0zW6w/p2.png',
        date: '10 Dec 2024',
        person: 'Francis Chang',
        qty: 140,
    },
    {
        warehouse: 'Lobar Handy',
        store: 'Prime Bazaar',
        product: 'Nike Jordan',
        img: 'https://i.ibb.co/rRQbH603/p3.png',
        date: '25 Jul 2023',
        person: 'Steven',
        qty: 120,
    },
    {
        warehouse: 'Quaint Warehouse',
        store: 'Gadget World',
        product: 'Apple Series 5 Watch',
        img: 'https://i.ibb.co/21wF56v5/p4.png',
        date: '28 Jul 2023',
        person: 'Gravely',
        qty: 130,
    },
    {
        warehouse: 'Traditional Warehouse',
        store: 'Volt Vault',
        product: 'Amazon Echo Dot',
        img: 'https://i.ibb.co/wFTQyMjF/p5.png',
        date: '24 Jul 2023',
        person: 'Kevin',
        qty: 140,
    },
    {
        warehouse: 'Cool Warehouse',
        store: 'Elite Retail',
        product: 'Lobar Handy',
        img: 'https://i.ibb.co/QFQpmHkT/p7.png',
        date: '15 Jul 2023',
        person: 'Grillo',
        qty: 150,
    },
    {
        warehouse: 'Retail Supply Hub',
        store: 'Prime Mart',
        product: 'Red Premium Satchel',
        img: 'https://i.ibb.co/8gmwwrJH/p8.png',
        date: '14 Oct 2024',
        person: 'Gary Hennessy',
        qty: 700,
    },
    {
        warehouse: 'EdgeWare Solutions',
        store: 'NeoTech Store',
        product: 'Iphone 14 Pro',
        img: 'https://i.ibb.co/svxxf0cW/p6.png',
        date: '03 Oct 2024',
        person: 'Eleanor Panek',
        qty: 630,
    },
    {
        warehouse: 'North Zone Warehouse',
        store: 'Urban Mart',
        product: 'Gaming Chair',
        img: 'https://i.ibb.co/qL5rH8NB/p9.png',
        date: '20 Sep 2024',
        person: 'William Levy',
        qty: 410,
    },
    {
        warehouse: 'Fulfillment Hub',
        store: 'Travel Mart',
        product: 'Borealis Backpack',
        img: 'https://i.ibb.co/vvvFMgm6/p10.png',
        date: '10 Sep 2024',
        person: 'Charlotte Klotz',
        qty: 550,
    },
];

const ManageStock = () => {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingItem, setDeletingItem] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedStock, setSelectedStock] = useState(null);

    const handleEditClick = (stockItem) => {
        setSelectedStock(stockItem);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setSelectedStock(null);
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
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const handleSelectAll = () => {
        const all = !selectAll;
        setSelectAll(all);
        setSelectedRows(all ? stockData.map((_, index) => index) : []);
    };

    const handleRowSelect = (index) => {
        const newSelected = selectedRows.includes(index)
            ? selectedRows.filter(i => i !== index)
            : [...selectedRows, index];
        setSelectedRows(newSelected);
        setSelectAll(newSelected.length === stockData.length);
    };


    return (
        <div className=" py-2 px-2" style={{ backgroundColor: '#f7f7f7', minHeight: '100vh' }}>

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-4 mb-4">
                <div>
                    <h5 className="fw-bold">Manage Stock</h5>
                    <p className="text-muted">Manage your stock</p>
                </div>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                    <button className="btn btn-light border text-danger product-btn-icon">
                        <FaFilePdf />
                    </button>
                    <button className="btn btn-light border text-success product-btn-icon">
                        <FaFileExcel />
                    </button>
                    <button
                        className="btn text-black border bg-white  d-flex align-items-center gap-2"
                        style={{ backgroundColor: "#FFA646" }}

                        onClick={handleShow}
                    >
                        <FaPlusCircle />
                        Add Stock
                    </button>

                </div>
            </div>






            <div className="card p-3">

                <div className="d-flex flex-wrap justify-content-between align-items-center mb-1">
                    <input
                        type="text"
                        className="form-control w-auto mb-2"
                        placeholder="Search"
                        style={{ minWidth: '200px' }}
                    />

                    <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
                        {/* Warehouse Filter */}
                        <div className="filter-dropdown">

                            <select className="form-select form-select-sm bg-light border-0 rounded-2 px-3 py-2">
                                <option>Warehouses</option>
                                <option>Lavish Warehouse</option>
                                <option>Quaint Warehouse</option>
                                <option>Traditional Warehouse</option>
                            </select>
                        </div>

                        {/* Store Filter */}
                        <div className="filter-dropdown">

                            <select className="form-select form-select-sm bg-light border-0 rounded-2 px-3 py-2">
                                <option>Stores</option>
                                <option>Electro Mart</option>
                                <option>Quantum Gadgets</option>
                                <option>Prime Bazaar</option>
                            </select>
                        </div>

                        {/* Product Filter */}
                        <div className="filter-dropdown">

                            <select className="form-select form-select-sm bg-light border-0 rounded-2 px-3 py-2">
                                <option>Products</option>
                                <option>Lenovo IdeaPad 3</option>
                                <option>Beats Pro</option>
                                <option>Nike Jordan</option>
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
    
    /* Hover effect for SELECT BOX only (options stay white) */
    .filter-dropdown:hover select {
        background-color: rgb(249, 193, 8) !important;
        border-color: rgb(249, 193, 8) !important;
        color: #000 !important;
    }
    
    /* Hover effect for LABEL */
    .filter-dropdown:hover .form-label {
        color: rgb(249, 193, 8) !important;
    }
    
    /* Ensure dropdown OPTIONS stay white */
    .filter-dropdown select option {
        background: white !important;
        color: #000 !important;
    }
    
    /* Focus state */
    .filter-dropdown select:focus {
        box-shadow: 0 0 0 0.25rem rgba(249, 193, 8, 0.5);
        border-color: rgb(249, 193, 8);
        outline: none;
    }
`}</style>






                </div>

                <div className="table-responsive">
                    <table className="table table-bordered text-center align-middle product-table mb-0">
                        <thead className="table-grey text-white">
                            <tr>
                                <th style={{ width: '50px' }}>
                                    <input
                                        type="checkbox"
                                        className="form-check-input yellow-checkbox"
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th>Warehouse</th>
                                <th>Store</th>
                                <th>Product</th>
                                <th>Date</th>
                                <th style={{ minWidth: '150px' }}>Person</th>
                                <th>Qty</th>
                                <th style={{ minWidth: '120px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stockData.map((item, index) => (
                                <tr key={index} className="table-row-hover">
                                    <td>
                                        <input
                                            type="checkbox"
                                            className="form-check-input yellow-checkbox"
                                            checked={selectedRows.includes(index)}
                                            onChange={() => handleRowSelect(index)}
                                        />
                                    </td>
                                    <td>{item.warehouse}</td>
                                    <td>{item.store}</td>
                                    <td>
                                        <div className="d-flex align-items-center justify-content-start ps-3">
                                            <img
                                                src={item.img}
                                                alt={item.product}
                                                width={30}
                                                height={30}
                                                className="me-2 rounded-1 object-fit-cover"
                                                style={{ minWidth: '30px' }}
                                            />
                                            <span className="text-truncate">
                                                {item.product}
                                            </span>
                                        </div>
                                    </td>
                                    <td>{item.date}</td>
                                    <td>
                                        <div className="d-flex align-items-center justify-content-center mx-auto" style={{ width: 'fit-content' }}>

                                            <span className="text-truncate">
                                                {item.person}
                                            </span>
                                        </div>
                                    </td>
                                    <td>{item.qty}</td>
                                <td>
                                                                   <div className="d-flex gap-2 justify-content-center">
                                                                       <button
                                                                           className="btn outlin-warning btn-sm text-warning py-1 px-2 border"
                                                                           onClick={() => handleEditClick(item)}
                                                                       >
                                                                           <FaEdit size={14} />
                                                                       </button>
                                                                       <button
                                                                           className="btn outline-danger btn-sm text-danger py-1 px-2 border"
                                                                           onClick={() => handleDeleteClick(item)}
                                                                       >
                                                                           <FaTrash size={14} />
                                                                       </button>
                                                                   </div>
                                                               </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <style>{`
    /* Light yellow hover effect */
    .table-row-hover:hover {
        background-color: #fff9e6 !important;
    }
    
    /* Consistent image sizing */
    .object-fit-cover {
        object-fit: cover;
    }
    
    /* Checkbox styling */
    .yellow-checkbox:checked {
        background-color: #f9c108;
        border-color: #f9c108;
    }
    
    /* Table header color */
    .table-grey {
        background-color: #6c757d;
    }
    
    /* Prevent text overflow */
    .text-truncate {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
        max-width: 120px;
    }
    
    /* Button hover effects */
    .btn-warning:hover {
        background-color: #e0a800 !important;
    }
    .btn-danger:hover {
        background-color: #c82333 !important;
    }
    
    /* Center align person section */
    .product-table td:nth-child(6) > div {
        margin-left: auto;
        margin-right: auto;
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

            {/* Modal */}
            <Modal show={showModal} onHide={handleClose} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold text-dark">Add Stock</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <Form.Group>
                                    <Form.Label>Warehouse</Form.Label>
                                    <Form.Select>
                                        <option>Select Warehouse</option>
                                        <option>Retail Hub</option>
                                        <option>Main Depot</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group>
                                    <Form.Label>Store</Form.Label>
                                    <Form.Select>
                                        <option>Select Store</option>
                                        <option>Urban Mart</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group>
                                    <Form.Label>Product</Form.Label>
                                    <Form.Select>
                                        <option>Select Product</option>
                                        <option>Gaming Chair</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group>
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type="date" />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group>
                                    <Form.Label>Qty</Form.Label>
                                    <Form.Control type="number" placeholder="Enter quantity" />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group>
                                    <Form.Label>Person</Form.Label>
                                    <Form.Control type="text" placeholder="Enter person name" />
                                </Form.Group>
                            </div>
                        </div>

                        <div className="form-check mt-4 d-flex align-items-center">
                            <Form.Check type="checkbox" id="stockCheck" className="me-2" label="" />
                            <label htmlFor="stockCheck" className="form-check-label">
                                I confirm the above stock entry
                            </label>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={handleClose} style={{ backgroundColor: 'black', color: '#fff' }}>Cancel</Button>
                    <Button style={{ backgroundColor: '#ffa54c', color: '#fff' }}>Add Stock</Button>
                </Modal.Footer>
            </Modal>
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
                    <h5 className="fw-bold">Delete Stock</h5>
                    <p className="text-muted">Are you sure you want to delete product from stock?</p>
                    <div className="d-flex justify-content-center gap-3 mt-4">
                        <Button variant="dark" onClick={handleCloseDeleteModal}>No, Cancel</Button>
                        <Button style={{ backgroundColor: '#ffa54c', border: 'none' }} onClick={handleCloseDeleteModal}>Yes, Delete</Button>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal
                show={showEditModal}
                onHide={handleCloseEditModal}
                size="lg"
                centered
                contentClassName="custom-modal"
            >
                <Modal.Header className="border-0 pb-0">
                    <Modal.Title className="fw-bold">Edit Stock</Modal.Title>
                    <button
                        className="btn p-0 ms-auto"
                        onClick={handleCloseEditModal}
                        style={{
                            background: "#fff",
                            border: "none",
                            boxShadow: "none",
                        }}
                    >
                        <span
                            className="fs-4"
                            style={{
                                color: "#e74c3c",
                                lineHeight: 1,
                                fontWeight: 700,
                            }}
                        >
                            &times;
                        </span>
                    </button>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        {/* Warehouse */}
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Warehouse <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Select
                                defaultValue={selectedStock?.warehouse || ""}
                                className="custom-input"
                            >
                                <option>{selectedStock?.warehouse || "Select Warehouse"}</option>
                            </Form.Select>
                        </Form.Group>

                        {/* Store */}
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Store <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Select
                                defaultValue={selectedStock?.store || ""}
                                className="custom-input"
                            >
                                <option>{selectedStock?.store || "Select Store"}</option>
                            </Form.Select>
                        </Form.Group>

                        {/* Responsible Person */}
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Responsible Person <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Select
                                defaultValue={selectedStock?.responsible || ""}
                                className="custom-input"
                            >
                                <option>
                                    {selectedStock?.responsible || "Select Person"}
                                </option>
                            </Form.Select>
                        </Form.Group>

                        {/* Product Search */}
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Product <span className="text-danger">*</span>
                            </Form.Label>
                            <div className="position-relative">
                                <Form.Control
                                    type="text"
                                    placeholder="Nike Jordan"
                                    defaultValue={selectedStock?.product || ""}
                                    className="custom-input ps-5"
                                />
                                <span
                                    className="position-absolute top-50 start-0 translate-middle-y ms-3"
                                    style={{ color: "#818181" }}
                                >
                                    <i className="bi bi-search"></i>
                                </span>
                            </div>
                        </Form.Group>

                    </Form>
                </Modal.Body>

                <Modal.Footer className="justify-content-between border-0 pt-0">
                    <Button
                        style={{
                            background: "#fff",
                            color: "#12263a",
                            border: "none",
                            fontWeight: 600,
                            boxShadow: "0 2px 6px 0 #0001",
                        }}
                        onClick={handleCloseEditModal}
                    >
                        Cancel
                    </Button>
                    <Button
                        style={{
                            backgroundColor: "#ffa54c",
                            border: "none",
                            fontWeight: 600,
                            color: "#fff",
                            boxShadow: "0 2px 6px 0 #ffa54c33",
                        }}
                        onClick={handleCloseEditModal}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
                <style jsx="true">{`
        @media (max-width: 575.98px) {
          .custom-modal {
            min-width: 98vw !important;
            padding: 0 2vw;
          }
          .custom-input {
            font-size: 15px;
            padding: 10px 8px 10px 36px !important;
          }
        }
        .custom-input {
          border-radius: 7px !important;
          background: #fff !important;
          border: 1px solid #e4e7ed !important;
          font-weight: 500;
        }
      `}</style>
            </Modal>


        </div>
    );
};

export default ManageStock;
