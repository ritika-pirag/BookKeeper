import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Container } from "react-bootstrap";
import CustomerList from "./CustomerList";
import Productlistsel from "./Productlistsel";

const PointOfSale = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [quantityError, setQuantityError] = useState("");
  const [selectedTax, setSelectedTax] = useState({ taxValue: 10 });
  const [paymentStatus, setPaymentStatus] = useState("0");
  const [priceMap, setPriceMap] = useState({});
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();
  const [taxes, setTaxes] = useState([
    { _id: "1", taxClass: "Standard", taxValue: 10 },
    { _id: "2", taxClass: "Reduced", taxValue: 5 },
  ]);
  const [products, setProducts] = useState([
    { _id: "101", name: "Item A", price: 100 },
    { _id: "102", name: "Item B", price: 200 },
  ]);

  const handleTaxSelect = (e) => {
    const taxId = e.target.value;
    const tax = taxes.find((t) => t._id === taxId);
    if (tax) setSelectedTax(tax);
  };

  const calculateSubTotal = () => {
    return selectedProducts
      .reduce((total, item) => {
        const productPrice = parseFloat(priceMap[item._id] ?? item.price);
        const productQuantity = quantity[item._id] || 1;
        const priceWithoutGST =
          productPrice / (1 + (selectedTax.taxValue || 0) / 100);
        return total + priceWithoutGST * productQuantity;
      }, 0)
      .toFixed(2);
  };

  const calculateTotal = () => {
    return selectedProducts
      .reduce((sum, item) => {
        const productPrice = parseFloat(priceMap[item._id] ?? item.price);
        const qty = quantity[item._id] || 1;
        return sum + productPrice * qty;
      }, 0)
      .toFixed(2);
  };

  const handleQuantityChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val > 0) {
      setQuantity((prev) => ({ ...prev, [currentProduct._id]: val }));
      setQuantityError("");
    } else {
      setQuantityError("Quantity must be a positive number");
    }
  };

  const handlePriceChange = (e) => {
    const val = e.target.value;
    setPrice(val);
    const newPrice = parseFloat(val);
    if (!isNaN(newPrice)) {
      setPriceMap((prev) => ({ ...prev, [currentProduct._id]: newPrice }));
    }
  };

  const handleProductSelection = (product) => {
    const index = selectedProducts.findIndex((p) => p._id === product._id);
    if (index > -1) {
      const updated = [...selectedProducts];
      updated[index] = {
        ...updated[index],
        quantity: quantity[product._id] || 1,
      };
      setSelectedProducts(updated);
    } else {
      setSelectedProducts((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  };

  const showModal = (product) => {
    setCurrentProduct(product);
    setPrice(product.price);
    setQuantity((prev) => ({ ...prev, [product._id]: prev[product._id] || 1 }));
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (!quantity[currentProduct._id] || quantity[currentProduct._id] < 1) {
      setQuantityError("Quantity must be at least 1");
      return;
    }

    const index = selectedProducts.findIndex(
      (p) => p._id === currentProduct._id
    );
    const updated = [...selectedProducts];
    if (index > -1) {
      updated[index] = {
        ...updated[index],
        quantity: quantity[currentProduct._id],
      };
    } else {
      updated.push({
        ...currentProduct,
        quantity: quantity[currentProduct._id],
      });
    }
    setSelectedProducts(updated);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts((prev) => prev.filter((p) => p._id !== productId));
  };

  const handleCreateInvoice = () => {
    const subtotal = calculateSubTotal();
    const total = calculateTotal();
  
    const invoiceData = {
      customerName: selectedCustomer
        ? `${selectedCustomer.first_name} ${selectedCustomer.last_name}`
        : "Walk-in Customer",
      productDetails: selectedProducts.map((product) => ({
        productId: product._id,
        name: product.name,
        quantity: quantity[product._id] || 1,
        price: priceMap[product._id] ?? product.price,
      })),
      tax: selectedTax._id,
      taxName: selectedTax.taxClass,
      taxValue: selectedTax.taxValue,
      subTotal: subtotal,
      total: total,
      status: paymentStatus,
    };
  
    navigate("/company/invoice-summary", { state: { invoiceData } });
  };
  
  const handleClear = () => {
    setSelectedCustomer(null);
    setSelectedProducts([]);
    setQuantity({});
  };

  return (
    <div className="mt-4 p-4   bg-white">
      <div className="row">
        <div className="col-md-6 px-2">
          <CustomerList onSelectCustomer={setSelectedCustomer} />
          {selectedCustomer && (
            <div className="alert alert-info mt-2">
              Selected Customer: {selectedCustomer.first_name} {selectedCustomer.last_name}
            </div>
          )}

          <Productlistsel
            products={products}
            onProductSelect={handleProductSelection}
            showModal={showModal}
          />

          <div className="m-2 border-2 p-3">
            <h4>Selected Products</h4>
            <ul>
              {selectedProducts.map((product) => {
                const qty = quantity[product._id] || 1;
                const unitPrice = parseFloat(priceMap[product._id] ?? product.price) || 0;
                const total = unitPrice * qty;

                return (
                  <li key={product._id} className="mb-3">
                    {product.name} - {qty} x A${unitPrice.toFixed(2)} = A${total.toFixed(2)}
                    <button
                      className="btn btn-danger btn-sm ms-2"
                      onClick={() => handleRemoveProduct(product._id)}
                    >
                      Remove
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="col-md-6 p-4 border rounded bg-light">
          <div className="mb-3">
            <label>Tax</label>
            <select
              className="form-select"
              value={selectedTax?._id || ""}
              onChange={handleTaxSelect}
            >
              {taxes.map((tax) => (
                <option key={tax._id} value={tax._id}>
                  {tax.taxClass} - {tax.taxValue}%
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label>Payment Status</label>
            <select
              className="form-select"
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
            >
              <option value="1">Paid</option>
              <option value="0">Unpaid</option>
            </select>
          </div>

          <div className="border p-3 rounded bg-white">
            <div className="d-flex justify-content-between mb-3">
              <strong>Subtotal:</strong>
              <span>A${calculateSubTotal()}</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <strong>GST:</strong>
              <span>{selectedTax?.taxValue || 0}%</span>
            </div>
            <div className="d-flex justify-content-between border-top pt-2">
              <h5>Total:</h5>
              <h5>A${calculateTotal()}</h5>
            </div>
          </div>

          <div className="mt-3 d-flex gap-2 flex-column flex-sm-row-reverse">
            <button
              className="btn btn-primary"
              onClick={handleCreateInvoice}
              disabled={selectedProducts.length === 0}
            >
              Generate Invoice 🧾
            </button>
            <button
              className="btn btn-danger"
              onClick={handleClear}
              disabled={selectedProducts.length === 0}
            >
              Clear Selection ❌
            </button>
          </div>
        </div>
      </div>

      {isModalVisible && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Enter Product Quantity</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCancel}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <h5>{currentProduct?.name}</h5>
                <input
                  type="number"
                  min="1"
                  className="form-control my-3"
                  value={quantity[currentProduct?._id] || 1}
                  onChange={handleQuantityChange}
                />
                <label>Price per unit:</label>
                <input
                  type="number"
                  className="form-control mb-3"
                  value={price}
                  onChange={handlePriceChange}
                  placeholder="Enter price"
                  min="0"
                />
                <p>
                  <strong>Total Price:</strong> A$
                  {isNaN(price * (quantity[currentProduct?._id] || 1))
                    ? "0.00"
                    : (price * (quantity[currentProduct._id] || 1)).toFixed(2)}
                </p>
                {quantityError && (
                  <div className="text-danger">{quantityError}</div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleOk}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PointOfSale;
