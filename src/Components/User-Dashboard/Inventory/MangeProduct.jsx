import React, { useState } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import './MangeProduct.css';
import { FaEdit, FaFileExcel, FaFilePdf, FaPlusCircle, FaTrash, FaEye } from 'react-icons/fa';

const initialProductData = [
  {
    warehouse: 'Lavish Warehouse', store: 'Electro Mart', product: 'Lenovo IdeaPad 3', img: 'https://i.ibb.co/cSd48MWC/p1.png', date: '24 Dec 2024', person: 'James Kirwin', qty: 100,
  },
  {
    warehouse: 'Quaint Warehouse', store: 'Quantum Gadgets', product: 'Beats Pro', img: 'https://i.ibb.co/QFT0zW6w/p2.png', date: '10 Dec 2024', person: 'Francis Chang', qty: 140,
  },
  {
    warehouse: 'Lobar Handy', store: 'Prime Bazaar', product: 'Nike Jordan', img: 'https://i.ibb.co/rRQbH603/p3.png', date: '25 Jul 2023', person: 'Steven Paul', qty: 120,
  },
  {
    warehouse: 'Traditional Warehouse', store: 'Volt Vault', product: 'Amazon Echo Dot', img: 'https://i.ibb.co/wFTQyMjF/p5.png', date: '24 Jul 2023', person: 'Kevin Hardy', qty: 140,
  },
  {
    warehouse: 'Cool Warehouse', store: 'Elite Retail', product: 'Wireless Headphones', img: 'https://i.ibb.co/QFQpmHkT/p7.png', date: '15 Jul 2023', person: 'Grillo Adams', qty: 150,
  },
  {
    warehouse: 'Retail Supply Hub', store: 'Prime Mart', product: 'Red Premium Satchel', img: 'https://i.ibb.co/8gmwwrJH/p8.png', date: '14 Oct 2024', person: 'Gary Hennessy', qty: 700,
  },
  {
    warehouse: 'EdgeWare Solutions', store: 'NeoTech Store', product: 'iPhone 14 Pro', img: 'https://i.ibb.co/svxxf0cW/p6.png', date: '03 Oct 2024', person: 'Eleanor Panek', qty: 630,
  },
  {
    warehouse: 'North Zone Warehouse', store: 'Urban Mart', product: 'Gaming Chair', img: 'https://i.ibb.co/qL5rH8NB/p9.png', date: '20 Sep 2024', person: 'William Levy', qty: 410,
  },
  {
    warehouse: 'Fulfillment Hub', store: 'Travel Mart', product: 'Borealis Backpack', img: 'https://i.ibb.co/vvvFMgm6/p10.png', date: '10 Sep 2024', person: 'Charlotte Klotz', qty: 550,
  },
];

const MangeProduct = () => {
  const [productList, setProductList] = useState(initialProductData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [newProduct, setNewProduct] = useState({
    warehouse: '', store: '', product: '', date: '', person: '', qty: '',
  });

  const filteredData = productList.filter((item) =>
    Object.values(item).some((val) =>
      val.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const handleSelectAll = () => {
    const all = !selectAll;
    setSelectAll(all);
    setSelectedRows(all ? productList.map((_, i) => i) : []);
  };

  const handleRowSelect = (index) => {
    const updated = selectedRows.includes(index)
      ? selectedRows.filter((i) => i !== index)
      : [...selectedRows, index];
    setSelectedRows(updated);
    setSelectAll(updated.length === productList.length);
  };

  const handleEdit = (item) => {
    setSelectedProduct(item);
    setShowEditModal(true);
  };

  const handleDelete = (item) => {
    setSelectedProduct(item);
    setShowDeleteModal(true);
  };

  const handleView = (item) => {
    setSelectedProduct(item);
    setShowViewModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = () => {
    setProductList([
      ...productList,
      {
        ...newProduct,
        img: 'https://i.ibb.co/cSd48MWC/p1.png',
      },
    ]);
    setNewProduct({ warehouse: '', store: '', product: '', date: '', person: '', qty: '' });
    setShowAddModal(false);
  };

  return (
    <div className="manage-product-wrapper py-2 px-2">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-4 mb-2">
        <div>
          <h5 className="fw-bold">Manage Product</h5>
          <p className="text-muted">Manage your product</p>
        </div>
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <button className="btn btn-light border text-danger">
            <FaFilePdf />
          </button>
          <button className="btn btn-light border text-success">
            <FaFileExcel />
          </button>
          <button
            className="btn text-black border d-flex align-items-center gap-2"
            style={{ backgroundColor: '#FFA646' }}
            onClick={() => setShowAddModal(true)}
          >
            <FaPlusCircle /> Add Product
          </button>
        </div>
      </div>

      <div className="mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Search products..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="card p-3">
        <div className="table-responsive">
          <Table bordered className="text-center align-middle">
            <thead className="table-grey text-white">
              <tr>
                <th>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Warehouse</th>
                <th>Store</th>
                <th>Product</th>
                <th>Date</th>
                <th>Person</th>
                <th>Qty</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check-input"
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
                      />
                      <span className="text-truncate">{item.product}</span>
                    </div>
                  </td>
                  <td>{item.date}</td>
                  <td>{item.person}</td>
                  <td>{item.qty}</td>
                  <td>
                    <div className="d-flex gap-2 justify-content-center">
                      <button className="btn btn-sm text-primary py-1 px-2 border" onClick={() => handleView(item)}>
                        <FaEye size={14} />
                      </button>
                      <button className="btn btn-sm text-warning py-1 px-2 border" onClick={() => handleEdit(item)}>
                        <FaEdit size={14} />
                      </button>
                      <button className="btn btn-sm text-danger py-1 px-2 border" onClick={() => handleDelete(item)}>
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

      {/* Add Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Warehouse</Form.Label>
              <Form.Control name="warehouse" value={newProduct.warehouse} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Store</Form.Label>
              <Form.Control name="store" value={newProduct.store} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Product</Form.Label>
              <Form.Control name="product" value={newProduct.product} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" name="date" value={newProduct.date} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Person</Form.Label>
              <Form.Control name="person" value={newProduct.person} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" name="qty" value={newProduct.qty} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
          <Button style={{ backgroundColor: '#ffa646', color: '#fff' }} onClick={handleAddProduct}>Add Product</Button>
        </Modal.Footer>
      </Modal>

      {/* View Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <div>
              <p><strong>Warehouse:</strong> {selectedProduct.warehouse}</p>
              <p><strong>Store:</strong> {selectedProduct.store}</p>
              <p><strong>Product:</strong> {selectedProduct.product}</p>
              <p><strong>Date:</strong> {selectedProduct.date}</p>
              <p><strong>Person:</strong> {selectedProduct.person}</p>
              <p><strong>Quantity:</strong> {selectedProduct.qty}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MangeProduct;
