import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Alert,
  Modal,
  Button,
  Form,
  Row,
  Col
} from "react-bootstrap";
import CustomerList from "./CustomerList";
import Productlistsel from "./Productlistsel";

const PointOfSale = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [quantityError, setQuantityError] = useState("");
  const [selectedTax, setSelectedTax] = useState({ taxValue: 10 }); // Default 10% tax
  const [paymentStatus, setPaymentStatus] = useState("0");
  const [priceMap, setPriceMap] = useState({});
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  const [taxes, setTaxes] = useState([
    { _id: "1", taxClass: "GST", taxValue: 10 },
    { _id: "2", taxClass: "Luxury Tax", taxValue: 18 }
  ]);

  const productList = [
    { _id: "p1", name: "Product A", price: 100 },
    { _id: "p2", name: "Product B", price: 200 },
  ];

  const [showAddTaxModal, setShowAddTaxModal] = useState(false);
  const [newTaxClass, setNewTaxClass] = useState("");
  const [newTaxValue, setNewTaxValue] = useState("");

  const handleTaxFormSubmit = (e) => {
    e.preventDefault();
    if (!newTaxClass.trim() || !newTaxValue) return;

    const newTax = {
      _id: Date.now().toString(),
      taxClass: newTaxClass,
      taxValue: parseFloat(newTaxValue),
    };

    setTaxes([...taxes, newTax]);
    setSelectedTax(newTax);
    setShowAddTaxModal(false);
    setNewTaxClass("");
    setNewTaxValue("");
  };

  const handleTaxSelect = (e) => {
    const value = e.target.value;
    const tax = taxes.find((tax) => tax._id === value);
    setSelectedTax(tax);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setPrice(value);
    const newPrice = parseFloat(value);
    if (!isNaN(newPrice)) {
      setPriceMap((prev) => ({
        ...prev,
        [currentProduct._id]: newPrice,
      }));
    }
  };

  const calculateSubTotal = () => {
    const productSubTotal = selectedProducts.reduce((total, item) => {
      const productPrice = parseFloat(priceMap[item._id] ?? item.price);
      const productQuantity = quantity[item._id] || 1;
      const priceWithoutGST = productPrice / (1 + (selectedTax.taxValue || 0) / 100);
      return total + priceWithoutGST * productQuantity;
    }, 0);
    return parseFloat(productSubTotal.toFixed(2));
  };

  const calculateTotal = () => {
    const total = selectedProducts.reduce((sum, item) => {
      const productPrice = parseFloat(priceMap[item._id] ?? item.price);
      const qty = quantity[item._id] || 1;
      return sum + productPrice * qty;
    }, 0);
    return parseFloat(total.toFixed(2));
  };

  const handleQuantityChange = (productId, quantityValue) => {
    setQuantity((prev) => ({
      ...prev,
      [productId]: quantityValue,
    }));
    setQuantityError("");
  };

  const handleProductSelection = (product) => {
    const index = selectedProducts.findIndex((p) => p._id === product._id);
    if (index > -1) {
      const updated = [...selectedProducts];
      updated[index] = { ...updated[index], quantity: quantity[product._id] || 1 };
      setSelectedProducts(updated);
    } else {
      setSelectedProducts((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  };

  const showModal = (product) => {
    setCurrentProduct(product);
    setPrice(product.price);
    setQuantity((prev) => ({
      ...prev,
      [product._id]: prev[product._id] || 1,
    }));
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const index = selectedProducts.findIndex((p) => p._id === currentProduct._id);
    const updated = [...selectedProducts];
    if (index > -1) {
      updated[index] = { ...updated[index], quantity: quantity[currentProduct._id] || 1 };
    } else {
      updated.push({ ...currentProduct, quantity: quantity[currentProduct._id] || 1 });
    }
    setSelectedProducts(updated);
    setIsModalVisible(false);
  };

  const handleCancel = () => setIsModalVisible(false);

  const handleRemoveProduct = (id) => {
    setSelectedProducts(selectedProducts.filter((p) => p._id !== id));
  };

  const handleCreateInvoice = () => {
    navigate("/company/invoice-summary", {
      state: { success: true, message: "Invoice generated successfully!" },
    });
  };
  
  const handleClear = () => {
    setSelectedCustomer(null);
    setSelectedProducts([]);
    setQuantity({});
  };

  return (
    <Container fluid className="mt-4 p-3 rounded-4 bg-white">
      <Row>
        <Col md={6}>
          <CustomerList onSelectCustomer={setSelectedCustomer} />
          {selectedCustomer && (
            <Alert variant="info" className="mt-2">
              Selected Customer: {selectedCustomer.first_name} {selectedCustomer.last_name}
            </Alert>
          )}
          <Productlistsel
            products={productList}
            onProductSelect={handleProductSelection}
            showModal={showModal}
          />

          <div className="m-4 border-2">
            <h4>Accessories</h4>
            <ul>
              {selectedProducts.map((product) => {
                const qty = quantity[product._id] || 1;
                const unitPrice = parseFloat(priceMap[product._id] ?? product.price) || 0;
                const total = unitPrice * qty;
                return (
                  <li key={product._id} className="mb-3">
                    {product.name} - {qty} x A${unitPrice.toFixed(2)} = A${total.toFixed(2)}
                    <Button variant="danger" onClick={() => handleRemoveProduct(product._id)} className="ms-2">
                      Remove
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>
        </Col>

        <Col md={6} className="p-4 border rounded bg-light">
          <Row className="mb-3">
            <Col>
              <Form.Label>Tax</Form.Label>
              <div className="d-flex">
                <Form.Select value={selectedTax?._id} onChange={handleTaxSelect}>
                  {taxes.map((tax) => (
                    <option key={tax._id} value={tax._id}>
                      {tax.taxClass} - {tax.taxValue}%
                    </option>
                  ))}
                </Form.Select>
                <Button variant="success" className="ms-2" onClick={() => setShowAddTaxModal(true)}>
                  ➕
                </Button>
              </div>
            </Col>
            <Col>
              <Form.Label>Payment Status</Form.Label>
              <Form.Select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
                <option value="1">Paid</option>
                <option value="0">Unpaid</option>
              </Form.Select>
            </Col>
          </Row>

          <div className="border p-3 rounded bg-white">
            <div className="d-flex justify-content-between mb-3">
              <strong>Subtotal:</strong>
              <span>A${calculateSubTotal()}</span>
            </div>
            <div className="d-flex mb-2 border-bottom pb-2">
              <strong>GST:</strong>
              <input
                type="text"
                value={`${selectedTax.taxValue}%`}
                readOnly
                className="form-control-plaintext ms-auto text-end"
              />
            </div>
            <div className="d-flex justify-content-between mb-2 border-bottom pb-2">
              <h5>Total:</h5>
              <h5>A${calculateTotal()}</h5>
            </div>
          </div>
        </Col>

        <div className="mt-3 d-flex gap-2 flex-column flex-sm-row-reverse">
          <Button variant="primary" onClick={handleCreateInvoice} disabled={selectedProducts.length === 0}>
            Generate Invoice 🗋️
          </Button>
          <Button variant="danger" onClick={handleClear} disabled={selectedProducts.length === 0}>
            Clear Selection ❌
          </Button>
        </div>
      </Row>

      {/* Quantity Modal */}
      <Modal show={isModalVisible} onHide={handleCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Enter Product Quantity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>{currentProduct?.name}</h5>
          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              min={1}
              value={quantity[currentProduct?._id] || 1}
              onChange={(e) =>
                handleQuantityChange(currentProduct._id, parseInt(e.target.value))
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price per unit (A$)</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={handlePriceChange}
            />
          </Form.Group>
          <p className="mt-3">
            <strong>Total Price:</strong> A$
            {isNaN(price * (quantity[currentProduct?._id] || 1))
              ? "0.00"
              : (price * (quantity[currentProduct?._id] || 1)).toFixed(2)}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleOk}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Tax Modal */}
      <Modal show={showAddTaxModal} onHide={() => setShowAddTaxModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Tax</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleTaxFormSubmit}>
            <Form.Group>
              <Form.Label>Tax Class</Form.Label>
              <Form.Control
                type="text"
                value={newTaxClass}
                onChange={(e) => setNewTaxClass(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Tax Value (%)</Form.Label>
              <Form.Control
                type="number"
                value={newTaxValue}
                onChange={(e) => setNewTaxValue(e.target.value)}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-end mt-3">
              <Button variant="secondary" onClick={() => setShowAddTaxModal(false)}>
                Cancel
              </Button>
              <Button type="submit" className="ms-2" variant="primary">
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default PointOfSale;
