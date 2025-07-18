import React, { useState, useEffect } from "react";

const Productlistsel = ({ products = [], onProductSelect, showModal }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (!Array.isArray(products)) return;

    let updatedList = products;

    if (searchQuery) {
      updatedList = updatedList.filter(
        (product) =>
          product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.device?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.sku?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    updatedList = [...updatedList].sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

    setFilteredProducts(updatedList);
  }, [searchQuery, sortOrder, products]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handleSelectProduct = (product) => {
    onProductSelect((prev) => {
      const exists = prev.some((p) => p.sku === product.sku);
      return exists
        ? prev.filter((p) => p.sku !== product.sku)
        : [...prev, { ...product, quantity: 1 }];
    });
  };

  const getStockStatus = (quantity) => {
    if (quantity < 5) return { color: "red", label: "Low Stock" };
    if (quantity <= 10) return { color: "orange", label: "Medium Stock" };
    return { color: "green", label: "In Stock" };
  };

  return (
    <div className=" p-3 ml-2">
      <h5 className="my-3">📦 Product List</h5>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          placeholder="Search by Name, Brand, Device, or SKU..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control w-50"
        />
        <button
          className="btn btn-dark ms-3"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          Sort by Price {sortOrder === "asc" ? "🔼" : "🔽"}
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Brand</th>
              <th>Device</th>
              <th>Price</th>
              <th>Qty</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => {
              const { color } = getStockStatus(product.quantity);
              return (
                <tr
                  key={product.sku}
                  onClick={() => showModal(product)}
                  style={{ cursor: "pointer" }}
                >
                  <td>
                    <img
                      src={product.images?.[0] || "https://via.placeholder.com/80"}
                      alt="Product"
                      style={{ width: 50, height: 50 }}
                    />
                  </td>
                  <td>
                    <small>{product.sku}</small>
                    <br />
                    <small>{product.name}</small>
                  </td>
                  <td>{product.brand}</td>
                  <td>{product.device}</td>
                  <td>A${product.price}</td>
                  <td style={{ color }}>{product.quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn btn-primary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          ⬅️ Prev
        </button>
        <span className="align-self-center">Page {currentPage}</span>
        <button
          className="btn btn-primary"
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
