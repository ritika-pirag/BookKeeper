import React, { useState } from "react";
import {
  FaFilePdf,
  FaFileExcel,
  FaPlusCircle,
  FaDownload,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaPrint,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Productdetails.css";

const  Productdetails = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);

  const products = [
    {
      sku: "PT0001",
      name: "Macbook Pro",
      category: "Computers",
      subCategory: "None",
      brand: "None",
      unit: "Piece",
      quantity: 50,
    
      price: "1500.00",
      tax: "0.00 %",
      discountType: "Percentage",
      status: "Active",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      barcode: "86102192",
    },
    {
      sku: "PT0002",
      name: "HP EliteBook",
      category: "Computers",
      unit: "Piece",
      quantity: 3,
    
      price: "$1200.00",
      tax: "5%",
      status: "Low Stock",
    },
    {
      sku: "PT0003",
      name: "Dell Inspiron",
      category: "Computers",
      unit: "Piece",
      quantity: 0,
  
      price: "$1000.00",
      tax: "10%",
      status: "Out Of Stock",
    },
    {
      sku: "PT0004",
      name: "Lenovo ThinkPad",
      category: "Computers",
      unit: "Piece",
      quantity: 2,
      
      price: "$950.00",
      tax: "8%",
      status: "Low Stock",
    },
    {
      sku: "PT0005",
      name: "iPhone 15 Pro",
      category: "Electronics",
      unit: "Piece",
      quantity: 20,
   
      price: "$1099.00",
      tax: "12%",
      status: "In Stock",
    },
    {
      sku: "PT0006",
      name: "Samsung Galaxy S23",
      category: "Electronics",
      unit: "Piece",
      quantity: 8,
      price: "$999.00",
      tax: "10%",
      status: "Low Stock",
    },
    {
      sku: "PT0007",
      name: "Sony WH-1000XM5",
      category: "Electronics",
      unit: "Piece",
      quantity: 15,
    
      price: "$399.00",
      tax: "5%",
      status: "In Stock",
    },
    {
      sku: "PT0008",
      name: "Nike Air Max 270",
      category: "Shoes",
      unit: "Pair",
      quantity: 0,
      
      price: "$150.00",
      tax: "6%",
      status: "Out Of Stock",
    },
    {
      sku: "PT0009",
      name: "Adidas Ultraboost",
      category: "Shoes",
      unit: "Pair",
      quantity: 10,
    
      price: "$180.00",
      tax: "4%",
      status: "In Stock",
    },
    {
      sku: "PT0010",
      name: "Apple Watch Series 9",
      category: "Electronics",
      unit: "Piece",
      quantity: 4,
      
      price: "$499.00",
      tax: "7%",
      status: "Low Stock",
    },
    {
      sku: "PT0011",
      name: "Logitech MX Master 3S",
      category: "Accessories",
      unit: "Piece",
      quantity: 18,
    
      price: "$99.99",
      tax: "5%",
      status: "In Stock",
    },
    {
      sku: "PT0012",
      name: "Canon EOS R10",
      category: "Electronics",
      unit: "Piece",
      quantity: 6,
      
      price: "$980.00",
      tax: "12%",
      status: "In Stock",
    },
    {
      sku: "PT0013",
      name: "Beats Studio Buds",
      category: "Electronics",
      unit: "Piece",
      quantity: 3,
      
      price: "$149.00",
      tax: "6%",
      status: "Low Stock",
    },
    {
      sku: "PT0014",
      name: "Fitbit Charge 6",
      category: "Accessories",
      unit: "Piece",
      quantity: 0,
    
      price: "$129.00",
      tax: "5%",
      status: "Out Of Stock",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "In Stock":
        return "badge bg-success";
      case "Low Stock":
        return "badge bg-warning text-dark";
      case "Out Of Stock":
        return "badge bg-danger";
      default:
        return "badge bg-secondary";
    }
  };

  // Show Edit Modal
  const handleEdit = (prod) => {
    setEditProduct(prod);
  };

  // Show Delete Modal
  const handleDelete = (prod) => {
    setDeleteProduct(prod);
  };

  // Confirm Delete (implement your delete logic here)
  const confirmDelete = () => {
    // ...delete logic here (e.g. API call or state update)
    setDeleteProduct(null);
  };

  return (
    <div className="container-fluid bg-light py-4 px-2 product-header mt-3 mt-md-0">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-4 mb-4">
        <div>
          <h5 className="fw-bold mb-1">Products</h5>
          <p className="text-muted mb-0">Manage your products</p>
        </div>

        <div className="d-flex align-items-center gap-2 flex-wrap">
     
        <button
  className="btn text-black border d-flex align-items-center gap-2 custom-action-btn"
  data-bs-toggle="modal"
  data-bs-target="#addProductModal"
>
  <FaPlusCircle />
  Add Product
</button>

<button className="btn text-black border d-flex align-items-center gap-2 custom-action-btn">
  <FaDownload />
  Import Product
</button>

        </div>
      </div>

      {/* Filters */}
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-3 gap-3">
        <div className="input-group w-auto" style={{ minWidth: "250px" }}>
          <span className="input-group-text bg-white border-end-0">
            <FaSearch className="text-muted" />
          </span>
          <input type="text" className="form-control border-start-0" placeholder="Search" />
        </div>

        <div className="d-flex gap-2 flex-wrap">
          {/* Product Dropdown */}
          <div className="dropdown">
            <button className="btn border dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Product
            </button>
            <ul className="dropdown-menu custom-dropdown">
              <li><a className="dropdown-item active-orange" href="#">Lenovo IdeaPad 3</a></li>
              <li><a className="dropdown-item" href="#">Beats Pro</a></li>
              <li><a className="dropdown-item" href="#">Nike Jordan</a></li>
              <li><a className="dropdown-item" href="#">Apple Watch</a></li>
            </ul>
          </div>

   

          {/* Category Dropdown */}
          <div className="dropdown">
            <button className="btn border dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Category
            </button>
            <ul className="dropdown-menu custom-dropdown">
              <li><a className="dropdown-item active-orange" href="#">Computers</a></li>
              <li><a className="dropdown-item" href="#">Electronics</a></li>
              <li><a className="dropdown-item" href="#">Shoes</a></li>
            </ul>
          </div>

          {/* Brand Dropdown */}
      

          {/* Sort By Dropdown */}
          <div className="dropdown">
            <button className="btn border dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Sort By: Last 7 Days
            </button>
            <ul className="dropdown-menu custom-dropdown">
              <li><a className="dropdown-item" href="#">Recently Added</a></li>
              <li><a className="dropdown-item" href="#">Price: Low to High</a></li>
              <li><a className="dropdown-item" href="#">Price: High to Low</a></li>
              <li><a className="dropdown-item" href="#">Out Of Stock</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
      <table className="table table-bordered text-center align-middle product-table mb-0 rounded">

        <thead class="table-light align-middle">
  <tr class="py-3">
    <th class="py-3">SKU</th>
    <th class="py-3">Product</th>
    <th class="py-3">Category</th>
    <th class="py-3">Unit</th>
    <th class="py-3">Quantity</th>
 
    <th class="py-3">Price</th>
    <th class="py-3">Tax</th>
    <th class="py-3">Status</th>
    <th class="py-3">Action</th>
  </tr>
</thead>

          <tbody>
            {products.map((prod, idx) => (
              <tr key={idx}>
                <td>{prod.sku}</td>
                <td>{prod.name}</td>
                <td>{prod.category}</td>
                <td>{prod.unit}</td>
                <td>{prod.quantity}</td>
            
                <td>{prod.price}</td>
                <td>{prod.tax}</td>
                <td>
                  <span className={getStatusBadge(prod.status)}>{prod.status}</span>
                </td>
                <td className="d-flex justify-content-center gap-1">
                  <button
                    className="btn outline-info btn-sm py-1 px-1 text-info"
                    data-bs-toggle="modal"
                    data-bs-target="#productDetailModal"
                    onClick={() => setSelectedProduct(prod)}
                  >
                    <FaEye  size={16}/>
                  </button>
                  <button
                                                className="btn outline-primary  btn-sm text-warning py-1 px-1"
             
                    data-bs-toggle="modal"
                    data-bs-target="#editProductModal"
                    onClick={() => handleEdit(prod)}
                  >
                    <FaEdit size={16} />
                  </button>
                  <button
       className="btn outline-primary btn-sm text-danger py-2 px-1"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteProductModal"
                    onClick={() => handleDelete(prod)}
                  >
                    <FaTrash  size={16}/>
                  </button>



                </td>
              </tr>
            ))}
          </tbody>
          
        </table>
       
      </div>

      {/* Add Product Modal */}
      <div
        className="modal fade"
        id="addProductModal"
        tabIndex="-1"
        aria-labelledby="addProductModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold" id="addProductModalLabel">
                Product Information
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="container-fluid">
                  <div className="row g-3">
                    {/* Store */}
                
                    {/* Warehouse */}
                    <div className="col-md-6">
                      <label className="form-label">
                        Warehouse <span className="text-danger">*</span>
                      </label>
                      <select className="form-select">
                        <option>Select</option>
                        <option>Warehouse 1</option>
                        <option>Warehouse 2</option>
                      </select>
                    </div>
                    {/* Product Name */}
                    <div className="col-md-6">
                      <label className="form-label">
                        Product Name <span className="text-danger">*</span>
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                    {/* Slug */}
               
                    {/* SKU */}
                    <div className="col-md-6 d-flex align-items-end">
                      <div className="w-100">
                        <label className="form-label">
                          SKU <span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                      <button type="button" className="btn btn-outline-warning ms-2 mb-1">
                        Generate
                      </button>
                    </div>
                    {/* Selling Type */}
                    <div className="col-md-6">
                      <label className="form-label">
                        Selling Type <span className="text-danger">*</span>
                      </label>
                      <select className="form-select">
                        <option>Select</option>
                        <option>Retail</option>
                        <option>Wholesale</option>
                      </select>
                    </div>
                    {/* Category */}
                    <div className="col-md-6 d-flex align-items-end">
                      <div className="w-100">
                        <label className="form-label">
                          Category <span className="text-danger">*</span>
                        </label>
                        <select className="form-select">
                          <option>Select</option>
                          <option>Computers</option>
                          <option>Electronics</option>
                          <option>Shoes</option>
                        </select>
                      </div>
                      <button type="button" className="btn btn-link text-orange ms-2 mb-1">
                        <FaPlusCircle /> Add New
                      </button>
                    </div>
                    {/* Sub Category */}
              
              

                    {/* Unit */}
                    <div className="col-md-6">
                      <label className="form-label">
                        Unit <span className="text-danger">*</span>
                      </label>
                      <select className="form-select">
                        <option>Select</option>
                        <option>Piece</option>
                        <option>Pair</option>
                      </select>
                    </div>
                    {/* Barcode Symbology */}
             
                    {/* Item Barcode */}
                    <div className="col-md-6 d-flex align-items-end">
                      <div className="w-100">
                        <label className="form-label">
                          Item Barcode <span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                      <button type="button" className="btn btn-outline-warning ms-2 mb-1">
                        Generate
                      </button>
                    </div>
                    {/* Barcode Symbology (right) */}
                    <div className="col-md-6">
                      <label className="form-label">Status</label>
                      <select className="form-select">
                        <option>Choose</option>
                        <option>Low stock </option>
                        <option>Out of stock</option>
                        <option>In Stock</option>
                      </select>
                    </div>
                    <div className="row g-3">
  <div className="col-md-6">
    <label className="form-label">Tax</label>
    <input type="text" className="form-control" placeholder="Enter Tax %" />
  </div>
  <div className="col-md-6">
    <label className="form-label">Quantity</label>
    <input type="number" className="form-control" placeholder="Enter Quantity" />
  </div>
</div>


                          {/* Brand */}
                          <div className="d-flex align-items-center gap-1">
  <label className="mb-0 fw-semibold" htmlFor="priceFilter">Price:</label>
  <input
    type="number"
    id="priceFilter"
    className="form-control"
    placeholder="Enter price"
    style={{ width: "150px" }}
  />
</div>
                  </div>
                </div>
                <div className="mt-4 d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-warning text-white">
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Modal (FaEye) */}
      <div
        className="modal fade"
        id="productDetailModal"
        tabIndex="-1"
        aria-labelledby="productDetailModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold" id="productDetailModalLabel">
                Product Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setSelectedProduct(null)}
              ></button>
            </div>
            <div className="modal-body">
              {selectedProduct && (
                <div>
                  <div className="mb-3 d-flex flex-wrap gap-3 align-items-center">
                    <div
                      className="bg-white border rounded p-3 d-flex flex-column align-items-center"
                      style={{ minWidth: 280, maxWidth: 320 }}
                    >
                      {/* Barcode */}
                      <img
                        src={`https://barcode.tec-it.com/barcode.ashx?data=${selectedProduct.barcode}&code=Code128&translate-esc=false`}
                        alt="barcode"
                        style={{ width: "180px", height: "60px" }}
                      />
                      <span className="mt-2">{selectedProduct.barcode}</span>
                    </div>
                    <button className="btn btn-outline-secondary ms-2" title="Print">
                      <FaPrint />
                    </button>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-bordered mb-0">
                      <tbody>
                        <tr>
                          <td className="fw-semibold">Product</td>
                          <td>{selectedProduct.name}</td>
                        </tr>
                        <tr>
                          <td className="fw-semibold">Category</td>
                          <td>{selectedProduct.category}</td>
                        </tr>
                        {/* <tr>
                          <td className="fw-semibold">Sub Category</td>
                          <td>{selectedProduct.subCategory || "None"}</td>
                        </tr> */}
                        {/* <tr>
                          <td className="fw-semibold">Brand</td>
                          <td>{selectedProduct.brand || "None"}</td>
                        </tr> */}
                        <tr>
                          <td className="fw-semibold">Unit</td>
                          <td>{selectedProduct.unit}</td>
                        </tr>
                        <tr>
                          <td className="fw-semibold">SKU</td>
                          <td>{selectedProduct.sku}</td>
                        </tr>
                      
                        <tr>
                          <td className="fw-semibold">Quantity</td>
                          <td>{selectedProduct.quantity}</td>
                        </tr>
                        <tr>
                          <td className="fw-semibold">Tax</td>
                          <td>{selectedProduct.tax}</td>
                        </tr>
                        {/* <tr>
                          <td className="fw-semibold">Discount Type</td>
                          <td>{selectedProduct.discountType || "Percentage"}</td>
                        </tr> */}
                        <tr>
                          <td className="fw-semibold">Price</td>
                          <td>{selectedProduct.price}</td>
                        </tr>
                        <tr>
                          <td className="fw-semibold">Status</td>
                          <td>{selectedProduct.status || "Active"}</td>
                        </tr>
                        {/* <tr>
                          <td className="fw-semibold">Description</td>
                          <td>{selectedProduct.description}</td>
                        </tr> */}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Product Modal (FaEdit) */}
      <div
        className="modal fade"
        id="editProductModal"
        tabIndex="-1"
        aria-labelledby="editProductModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold" id="editProductModalLabel">
                Edit Product
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setEditProduct(null)}
              ></button>
            </div>
            <div className="modal-body">
              {editProduct && (
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Product Name</label>
                      <input type="text" className="form-control" defaultValue={editProduct.name} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Category</label>
                      <input type="text" className="form-control" defaultValue={editProduct.category} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Unit</label>
                      <input type="text" className="form-control" defaultValue={editProduct.unit} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Quantity</label>
                      <input type="number" className="form-control" defaultValue={editProduct.quantity} />
                    </div>
                    {/* <div className="col-md-6">
                      <label className="form-label">Min Qty</label>
                      <input type="number" className="form-control" defaultValue={editProduct.minQty} />
                    </div> */}
                    <div className="col-md-6">
                      <label className="form-label">Price</label>
                      <input type="text" className="form-control" defaultValue={editProduct.price} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Tax</label>
                      <input type="text" className="form-control" defaultValue={editProduct.tax} />
                    </div>
                    <div className="col-md-6">
  <label className="form-label">Status</label>
  <select className="form-select" defaultValue={editProduct.status}>
    <option value="In Stock">In Stock</option>
    <option value="Low Stock">Low Stock</option>
    <option value="Out Of Stock">Out Of Stock</option>
  </select>
</div>

                  </div>
                  <div className="mt-4 d-flex justify-content-end gap-2">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-warning text-white">
                      Update Product
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Product Modal */}
      <div
        className="modal fade"
        id="deleteProductModal"
        tabIndex="-1"
        aria-labelledby="deleteProductModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0" style={{ borderRadius: 16 }}>
            <div className="modal-body text-center py-4">
              <div
                className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                style={{
                  width: 70,
                  height: 70,
                  background: "#FFF5F2",
                  borderRadius: "50%",
                }}
              >
                <FaTrash size={32} color="#F04438" />
              </div>
              <h4 className="fw-bold mb-2">Delete Stock</h4>
              <p className="mb-4" style={{ color: "#555", fontSize: "1.08rem" }}>
                Are you sure you want to delete product from stock?
              </p>
              <div className="d-flex justify-content-center gap-3">
                <button
                  className="btn btn-dark px-4 py-2"
                  data-bs-dismiss="modal"
                  onClick={() => setDeleteProduct(null)}
                >
                  No, Cancel
                </button>
                <button
                  className="btn"
                  style={{ background: "#FFA646", color: "#fff", fontWeight: 600, padding: "0.5rem 2rem" }}
                  data-bs-dismiss="modal"
                  onClick={confirmDelete}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productdetails;
