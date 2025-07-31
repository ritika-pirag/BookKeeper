// import React, { useState } from 'react';
// import { Modal, Button, Form, Table } from 'react-bootstrap';
// import './ManageStock.css';
// import { FaEdit, FaFileExcel, FaFilePdf, FaPlusCircle, FaTrash, FaEye } from 'react-icons/fa';

// const { referenceElementsReducer } = require("recharts/types/state/referenceElementsSlice");

// const initialProductData = [
//   {
//     date: '24 Dec 2024', product: 'Lenovo IdeaPad 3', sku: 'LP-1234', category: 'Laptop', transaction: 'Purchase', qty: 100, unitPrice: 500, totalAmount: 50000, party: 'James Kirwin', stock: 200, remarks: 'Initial stock',
//   },
//   {
//     date: '10 Dec 2024', product: 'Beats Pro', sku: 'BP-5678', category: 'Audio', transaction: 'Sale', qty: 40, unitPrice: 250, totalAmount: 10000, party: 'Francis Chang', stock: 160, remarks: 'Online order',
//   },
//   {
//     date: '25 Jul 2023', product: 'Nike Jordan', sku: 'NJ-7890', category: 'Footwear', transaction: 'Purchase', qty: 70, unitPrice: 150, totalAmount: 10500, party: 'Steven Paul', stock: 130, remarks: 'New arrival',
//   },
//   {
//     date: '24 Jul 2023', product: 'Amazon Echo Dot', sku: 'ED-2345', category: 'Smart Home', transaction: 'Sale', qty: 30, unitPrice: 45, totalAmount: 1350, party: 'Kevin Hardy', stock: 100, remarks: 'Retail sale',
//   },
// ];

// const MangeStock = () => {
//   const [productList, setProductList] = useState(initialProductData);

//   return (
//     <div className="manage-product-wrapper py-3 px-3">
//       <h5 className="fw-bold mb-3">Inventory & Transaction Details</h5>
//       <div className="card p-3 shadow-sm">
//         <div className="table-responsive">
//           <Table bordered hover className="text-center align-middle mb-0">
//             <thead className="bg-dark text-white">
//               <tr>
//                 <th>#</th>
//                 <th>Date</th>
//                 <th>Product</th>
//                 <th>SKU</th>
//                 <th>Category</th>
//                 <th>Transaction Type</th>
//                 <th>Quantity</th>
//                 <th>Unit Price</th>
//                 <th>Total Amount</th>
//                 <th>Supplier/Customer</th>
//                 <th>Stock Balance</th>
//                 <th>Remarks</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {productList.map((item, index) => (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>{item.date}</td>
//                   <td>{item.product}</td>
//                   <td>{item.sku}</td>
//                   <td>{item.category}</td>
//                   <td>{item.transaction}</td>
//                   <td>{item.qty}</td>
//                   <td>${item.unitPrice}</td>
//                   <td>${item.totalAmount}</td>
//                   <td>{item.party}</td>
//                   <td>{item.stock}</td>
//                   <td>{item.remarks}</td>
//                   <td>
//                     <div className="d-flex justify-content-center gap-2">
//                       <button className="btn btn-sm border text-primary" title="View">
//                         <FaEye size={14} />
//                       </button>
//                       <button className="btn btn-sm border text-warning" title="Edit">
//                         <FaEdit size={14} />
//                       </button>
//                       <button className="btn btn-sm border text-danger" title="Delete">
//                         <FaTrash size={14} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>
//       </div>
//     </div>
//   );
// };



// export default MangeStock;
import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const InventoryItems = () => {
  const [items, setItems] = useState([
    {
      itemName: "Sample Item",
      hsn: "1234",
      barcode: "ABC123",
      unit: "Numbers",
      description: "Sample inventory item description.",
      quantity: 10,
      date: "2020-04-01",
      cost: 100,
      value: 1000,
      minQty: 5,
      taxAccount: "5% GST",
 
      purchasePriceExclusive: 90,
      purchasePriceInclusive: 95,
      salePriceExclusive: 110,
      salePriceInclusive: 115,
      discount: 5,
      category: "default",
      itemCategory: "Furniture",
      itemType: 'Good',
      subcategory: "default",
      remarks: "Internal only",
      image: null,
      status: "In Stock",
      warehouse: "Main Warehouse",
    },
    {
      itemName: "Out of Stock Item",
      hsn: "5678",
      barcode: "XYZ567",
      unit: "Kg",
      description: "This item is currently out of stock.",
      quantity: 0,
      date: "2024-12-01",
      cost: 200,
      value: 0,
      minQty: 10,
      taxAccount: "12% GST",
      cess: 0,
      purchasePriceExclusive: 180,
      purchasePriceInclusive: 200,
      salePriceExclusive: 220,
      salePriceInclusive: 250,
      discount: 0,
      category: "Electronics",
      subcategory: "Accessories",
      remarks: "Awaiting new shipment",
      image: null,
      status: "Out of Stock",
      warehouse: "Backup Warehouse",
      itemCategory: "Electronics",
      itemType: 'Service',
    }
  ]);

  const [showUOMModal, setShowUOMModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showView, setShowView] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([
    "Electronics",
    "Furniture",
    "Apparel",
    "Food",
    "Books",
    "Automotive",
    "Medical",
    "Software",
    "Stationery",
    "Other",
  ]);

  const handleAddCategory = () => {
    const trimmed = newCategory.trim();
    if (trimmed && !categories.includes(trimmed)) {
      setCategories((prev) => [...prev, trimmed]);
      setNewItem((prev) => ({ ...prev, itemCategory: trimmed }));
    }
    setNewCategory("");
    setShowAddCategoryModal(false);
  };

  const [newItem, setNewItem] = useState({
    itemName: "",
    hsn: "",
    barcode: "",
    unit: "Numbers",
    description: "",
    quantity: 0,
    date: "2020-04-01",
    cost: 0,
    value: 0,
    minQty: 50,
    taxAccount: "",
    cess: 0,
    purchasePriceExclusive: 0,
    purchasePriceInclusive: 0,
    salePriceExclusive: 0,
    salePriceInclusive: 0,
    discount: 0,
    category: "default",
    subcategory: "default",
    remarks: "",
    image: null,
    status: "In Stock",
    itemType: "Good", // New field for item type
    itemCategory: "", // New field for item category
    unit: "",
    weightPerUnit: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setNewItem({ ...newItem, image: files[0] });
    } else {
      setNewItem({ ...newItem, [name]: value });
    }
  };

  const handleAddItem = () => {
    setItems([...items, newItem]);
    setShowAdd(false);
  };

  const handleUpdateItem = () => {
    const updated = items.map((i) => (i === selectedItem ? { ...newItem } : i));
    setItems(updated);
    setShowEdit(false);
  };



  const handleStatusChange = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index].status = value;
    setItems(updatedItems);
  };

  const handleDeleteItem = () => {
    setItems(items.filter((i) => i !== selectedItem));
    setShowDelete(false);
  };

  const handleDownloadTemplate = () => {
    const headers = [[
      "itemName", "hsn", "barcode", "unit", "description", "quantity", "date", "cost", "value", "minQty",
      "taxAccount", "cess", "purchasePriceExclusive", "purchasePriceInclusive", "salePriceExclusive",
      "salePriceInclusive", "discount", "category", "subcategory", "remarks"
    ]];
    const ws = XLSX.utils.aoa_to_sheet(headers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "InventoryTemplate");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "Inventory_Template.xlsx");
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(items);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "InventoryExport");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "Inventory_Export.xlsx");
  };

  const handleImportClick = () => {
    if (window.importFileRef) window.importFileRef.click();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: "binary" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(firstSheet);
      setItems((prev) => [...prev, ...data]);
    };
    reader.readAsBinaryString(file);
  };

  const filteredItems = items.filter((item) =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  return (
    <div className="mt-4 p-2">
      <Row className="align-items-center mb-3 ">
        <Col md={4}>
          <h4 className="fw-bold mb-0">Inventory Product</h4>
        </Col>
        <Col md={8} className="text-md-end d-flex flex-wrap gap-2 justify-content-md-end">
          <Button
            style={{
              backgroundColor: '#00c78c',
              border: 'none',
              color: '#fff',
              padding: '6px 16px',
            }}
            onClick={handleImportClick}
          >
            Import
          </Button>
          <input
            type="file"
            accept=".xlsx, .xls"
            ref={(ref) => (window.importFileRef = ref)}
            onChange={handleImport}
            style={{ display: 'none' }}
          />
          <Button
            style={{
              backgroundColor: '#ff7e00',
              border: 'none',
              color: '#fff',
              padding: '6px 16px',
            }}
            onClick={handleExport}
          >
            Export
          </Button>
          <Button
            style={{
              backgroundColor: '#f6c100',
              border: 'none',
              color: '#000',
              padding: '6px 16px',
            }}
            onClick={handleDownloadTemplate}
          >
            Download Template
          </Button>
          <Button
            style={{
              backgroundColor: '#27b2b6',
              border: 'none',
              color: '#fff',
              padding: '6px 16px',
            }}
            onClick={() => {
              setNewItem({ ...newItem });
              setShowAdd(true);
            }}
          >

            Add Product
          </Button>
        </Col>
      </Row>

      <Row className="mb-3 justify-content-start  card">
        <Col md={4}><Form.Control type="text" placeholder="Search item..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="rounded-pill" /></Col>
      </Row>

      <div className="card bg-white rounded-3 p-4">
    <div className="table-responsive">
  <table className="table table-hover align-middle mb-0">
    <thead className="table-light">
      <tr>
        <th>Name</th>
        <th>Category</th>
        {/* <th>Type</th> */}
        <th>HSN</th>
        <th>Quantity</th>
        <th>Warehouse</th>
        <th>Amount</th>
        <th>Value</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {filteredItems.length > 0 ? (
        filteredItems.map((item, idx) => (
          <tr key={idx}>
            <td>{item.itemName}</td>
            <td>{item.itemCategory}</td>
            {/* <td>{item.itemType}</td> */}
            <td>{item.hsn}</td>
            <td>{item.quantity}</td>
            <td>{item.warehouse}</td>
            <td>{item.cost}</td>
            <td>{item.value}</td>
            <td>
              <span
                className={`badge px-3 py-1 rounded-pill fw-semibold ${
                  item.status === "In Stock"
                    ? "bg-success text-white"
                    : "bg-danger text-white"
                }`}
              >
                {item.status}
              </span>
            </td>
            <td>
              <div className="d-flex gap-2">
                <Button
                  variant="link"
                  className="text-info p-0"
                  onClick={() => {
                    setSelectedItem(item);
                    setShowView(true);
                  }}
                >
                  <FaEye />
                </Button>
                <Button
                  variant="link"
                  className="text-warning p-0"
                  onClick={() => {
                    setSelectedItem(item);
                    setNewItem(item);
                    setShowEdit(true);
                  }}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="link"
                  className="text-danger p-0"
                  onClick={() => {
                    setSelectedItem(item);
                    setShowDelete(true);
                  }}
                >
                  <FaTrash />
                </Button>
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="9" className="text-center">
            No items found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

{/* Static Pagination UI */}
<div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
  <small className="text-muted ms-2">
    Showing 1 to {filteredItems.length} of {filteredItems.length} results
  </small>
  <nav>
    <ul className="pagination mb-0">
      <li className="page-item disabled">
        <button className="page-link">&laquo;</button>
      </li>
      <li className="page-item active">
        <button className="page-link">1</button>
      </li>
      <li className="page-item">
        <button className="page-link">2</button>
      </li>
      <li className="page-item">
        <button className="page-link">&raquo;</button>
      </li>
    </ul>
  </nav>
</div>

      </div>

      {/* View Modal */}
      <Modal show={showView} onHide={() => setShowView(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Item Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <>
              <Row className="mb-3">
                <Col md={6}><strong>Item Name:</strong> {selectedItem.itemName}</Col>
                <Col md={6}><strong>HSN:</strong> {selectedItem.hsn}</Col>
                <Col md={6}><strong>Barcode:</strong> {selectedItem.barcode}</Col>
                <Col md={6}><strong>Unit:</strong> {selectedItem.unit}</Col>
                <Col md={12}><strong>Description:</strong> {selectedItem.description}</Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}><strong>Quantity:</strong> {selectedItem.quantity}</Col>
                <Col md={6}><strong>Date:</strong> {selectedItem.date}</Col>
                <Col md={6}><strong>Cost:</strong> {selectedItem.cost}</Col>
                <Col md={6}><strong>Value:</strong> {selectedItem.value}</Col>
                <Col md={6}><strong>Min Order Qty:</strong> {selectedItem.minQty}</Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}><strong>Tax Account:</strong> {selectedItem.taxAccount}</Col>
                <Col md={6}><strong>Cess:</strong> {selectedItem.cess}</Col>
                {/* <Col md={6}><strong>Purchase Price (Excl):</strong> {selectedItem.purchasePriceExclusive}</Col> */}
                <Col md={6}><strong>Purchase Price (Incl):</strong> {selectedItem.purchasePriceInclusive}</Col>
                {/* <Col md={6}><strong>Sale Price (Excl):</strong> {selectedItem.salePriceExclusive}</Col> */}
                <Col md={6}><strong>Sale Price (Incl):</strong> {selectedItem.salePriceInclusive}</Col>
                <Col md={6}><strong>Discount %:</strong> {selectedItem.discount}</Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}><strong>Category:</strong> {selectedItem.category}</Col>
                <Col md={6}><strong>Subcategory:</strong> {selectedItem.subcategory}</Col>
                <Col md={12}><strong>Remarks:</strong> {selectedItem.remarks}</Col>
              </Row>
              {selectedItem.image && (
                <Row className="mb-3">
                  <Col md={12}><strong>Image Preview:</strong><br /><img src={URL.createObjectURL(selectedItem.image)} alt="item preview" style={{ maxHeight: '200px', marginTop: '10px' }} /></Col>
                </Row>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowView(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Add/Edit Modal */}
      <Modal show={showAdd || showEdit} onHide={() => { setShowAdd(false); setShowEdit(false); }} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{showAdd ? "Add Product" : "Edit Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col md={6}><Form.Group><Form.Label>Item Name</Form.Label><Form.Control name="itemName" value={newItem.itemName} onChange={handleChange} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>HSN</Form.Label><Form.Control name="hsn" value={newItem.hsn} onChange={handleChange} /></Form.Group></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Group><Form.Label>Barcode</Form.Label><Form.Control name="barcode" value={newItem.barcode} onChange={handleChange} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Units of Measure</Form.Label><Form.Select name="unit" value={newItem.unit} onChange={handleChange}><option>Numbers</option><option>Kg</option><option>Litres</option></Form.Select></Form.Group></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Warehouse</Form.Label>
                  <Form.Select name="warehouse" value={newItem.warehouse} onChange={handleChange}>
                    <option value="">Select Warehouse</option>
                    <option value="Main Warehouse">Main Warehouse</option>
                    <option value="Backup Warehouse">Backup Warehouse</option>
                    <option value="East Wing">East Wing</option>
                    <option value="West Wing">West Wing</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <div className="d-flex justify-content-between align-items-center">
                    <Form.Label className="mb-0">Item Category</Form.Label>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => setShowAddCategoryModal(true)}
                      style={{
                        backgroundColor: '#27b2b6',
                        border: 'none',
                        color: '#fff',
                        padding: '6px 16px',
                      }}
                    >
                      + Add New
                    </Button>
                  </div>
                  <Form.Select
                    name="itemCategory"
                    value={newItem.itemCategory}
                    onChange={handleChange}
                    className="mt-2"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat, idx) => (
                      <option key={idx} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>


            <Row className="mb-3">

              <Col md={12}><Form.Group><Form.Label>Item Description</Form.Label><Form.Control as="textarea" rows={2} name="description" value={newItem.description} onChange={handleChange} /></Form.Group></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Group><Form.Label>Initial Quantity On Hand</Form.Label><Form.Control name="quantity" value={newItem.quantity} onChange={handleChange} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Item Image</Form.Label><Form.Control type="file" name="image" onChange={handleChange} /></Form.Group></Col>
            
            </Row>
        
            <Row className="mb-3">
              <Col md={6}><Form.Group><Form.Label>Minimum Order Quantity</Form.Label><Form.Control name="minQty" value={newItem.minQty} onChange={handleChange} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>As Of Date</Form.Label><Form.Control type="date" name="date" value={newItem.date} onChange={handleChange} /></Form.Group></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Group><Form.Label>Default Tax Account</Form.Label><Form.Control name="taxAccount" value={newItem.taxAccount} onChange={handleChange} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Initial Cost/Unit</Form.Label><Form.Control name="cost" value={newItem.cost} onChange={handleChange} /></Form.Group></Col>

              {/* <Col md={6}><Form.Group><Form.Label>Additional Cess</Form.Label><Form.Control name="cess" value={newItem.cess} onChange={handleChange} /></Form.Group></Col> */}
            </Row>
          
            <Row className="mb-3">
              <Col md={6}><Form.Group><Form.Label>Default Sale Price </Form.Label><Form.Control name="salePriceExclusive" value={newItem.salePriceExclusive} onChange={handleChange} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Default Purchase Price </Form.Label><Form.Control name="salePriceInclusive" value={newItem.salePriceInclusive} onChange={handleChange} /></Form.Group></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Group><Form.Label>Default Discount %</Form.Label><Form.Control name="discount" value={newItem.discount} onChange={handleChange} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Remarks</Form.Label><Form.Control name="remarks" value={newItem.remarks} onChange={handleChange} /></Form.Group></Col>

            </Row>
            <Row className="mb-3">
  <Col md={12} className="text-end">
    <Button variant="outline-info" onClick={() => setShowUOMModal(true)}      style={{
              backgroundColor: '#27b2b6',
              border: 'none',
              color: '#fff',
              padding: '6px 16px',
            }}>
      View More Details
    </Button>
  </Col>
</Row>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { setShowAdd(false); setShowEdit(false); }}>Cancel</Button>
          <Button style={{ backgroundColor: '#27b2b6', borderColor: '#27b2b6' }} onClick={showAdd ? handleAddItem : handleUpdateItem}>{showAdd ? "Add" : "Update"}</Button>
        </Modal.Footer>
      </Modal>




      <Modal show={showUOMModal} onHide={() => setShowUOMModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Unit Details</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Unit of Measurement (UOM)</Form.Label>
        <Form.Select name="unit" value={newItem.unit} onChange={handleChange}>
          <option value="">Select Unit</option>
          <option value="Piece">Piece</option>
          <option value="Box">Box</option>
          <option value="KG">KG</option>
          <option value="Meter">Meter</option>
          <option value="Litre">Litre</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Weight per Unit</Form.Label>
        <Form.Control
          name="weightPerUnit"
          value={newItem.weightPerUnit}
          onChange={handleChange}
          placeholder="e.g. 0.5 KG"
          
        />
      </Form.Group>
    </Form>

  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowUOMModal(false)}      style={{
              backgroundColor: '#27b2b6',
              border: 'none',
              color: '#fff',
              padding: '6px 16px',
            }}>Close</Button>
  </Modal.Footer>
</Modal>

      <Modal show={showAddCategoryModal} onHide={() => setShowAddCategoryModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddCategoryModal(false)}>
            Cancel
          </Button>
          <Button class="btn"
          style={{
            backgroundColor: '#27b2b6',
            border: 'none',
            color: '#fff',
            padding: '6px 16px',
          }}
          onClick={handleAddCategory}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
        <Modal.Header closeButton><Modal.Title>Confirm Delete</Modal.Title></Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelete(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteItem}>Delete</Button>
        </Modal.Footer>

      </Modal>
      {/* Page Description */}
<small className="text-muted text-center w-100 mt-4">
An Inventory Product Management Interface displaying product details, status, and actions with options to import/export data and manage records.
</small>
    </div>
  );
};
export default InventoryItems;