import React, { useState } from "react";

const Productlistsel = ({ onProductSelect, showModal }) => {
  const sampleProducts = [
    {
      _id: "1",
      sku: "PROD001",
      name: "Screen Protector",
      brand: "TechBrand",
      device: "iPhone",
      price: 15.99,
      quantity: 8,
      images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQb836dE7n6zzwt1Trmp97DPyLzM-QQM_A7w&s"],
    },
    {
      _id: "2",
      sku: "PROD002",
      name: "Phone Case",
      brand: "Gear",
      device: "Samsung",
      price: 12.5,
      quantity: 3,
      images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTt1KVOtSk4-MKyQvYnQOXkpPIVlt1tQPWnA&s"],
    },
    {
      _id: "3",
      sku: "PROD003",
      name: "USB Cable",
      brand: "CablePro",
      device: "Universal",
      price: 7.99,
      quantity: 15,
      images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvLmUJnzCU3iENMtwP7phDuw4SCsBW9qqfRQ&s"],
    },
  ];

  const [products] = useState(sampleProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredProducts = products
    .filter((product) => {
      const query = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.device.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query)
      );
    })
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const getStockStatus = (quantity) => {
    if (quantity < 5) return { color: "red", label: "Low Stock" };
    if (quantity <= 10) return { color: "orange", label: "Medium Stock" };
    return { color: "green", label: "In Stock" };
  };

  return (
    <div className="container my-4 p-3 border rounded shadow-sm bg-white">
      <h3 className="mb-4 text-dark">📦 Product List</h3>

      {/* Search and Sort */}
      <div className="row mb-4 g-2 align-items-center">
        <div className="col-md-8">
          <input
            type="text"
            placeholder="🔍 Search by Name, Brand, Device, or SKU..."
            className="form-control form-control-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-md-4 text-end">
          <button
            className="btn btn-light border btn-lg w-100 d-flex justify-content-between align-items-center"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            <span>Sort by Price</span>
            <span>{sortOrder === "asc" ? "⬆️" : "⬇️"}</span>
          </button>
        </div>
      </div>

      {/* Product Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover text-center align-middle">
          <thead className="table-light text-black fs-5">
            <tr>
              <th className="px-3 py-3">Image</th>
              <th>SKU & Name</th>
              <th>Brand</th>
              <th>Device</th>
              <th>Price</th>
              <th>Qty</th>
            </tr>
          </thead>
          <tbody className="fs-6">
            {currentProducts.map((product) => {
              const { color, label } = getStockStatus(product.quantity);
              return (
                <tr
                  key={product._id}
                  style={{ cursor: "pointer" }}
                  onClick={() => showModal(product)}
                >
                  <td className="px-3 py-3">
                    <img
                      src={product.images[0]}
                      width="60"
                      height="60"
                      className="rounded"
                      alt="product"
                    />
                  </td>
                  <td>
                    <div className="fw-bold">{product.sku}</div>
                    <div>{product.name}</div>
                  </td>
                  <td>{product.brand}</td>
                  <td>{product.device}</td>
                  <td className="fw-semibold">A${product.price.toFixed(2)}</td>
                  <td style={{ color }}>
                    {product.quantity}
                    <br />
                    <small>{label}</small>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <button
          className="btn btn-outline-secondary btn-lg"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          ⬅️ Previous
        </button>
        <span className="fs-5">Page {currentPage}</span>
        <button
          className="btn btn-outline-secondary btn-lg"
          disabled={indexOfLastItem >= filteredProducts.length}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
};

export default Productlistsel;
