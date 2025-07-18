import { useEffect, useState } from "react";
import {
  Container,
  Alert,
  Modal,
  Button,
  Form,
  Row,
  Col
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomerList from "./CustomerList";
import Productlistsel from "./Productlistsel";
import { fetchProducts } from "../../../../redux/slices/productSlice";
import axiosInstance from "../../../../utils/axiosInstance";
import { fetchTaxes } from "../../../../redux/slices/taxSlice";
import jsPDF from "jspdf";

const PointOfSale = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [quantityError, setQuantityError] = useState("");
  const [selectedTax, setSelectedTax] = useState({ taxValue: 0 });
  const [paymentStatus, setPaymentStatus] = useState("0");
  const [priceMap, setPriceMap] = useState({});
  const [price, setPrice] = useState(0);

  const { products } = useSelector((state) => state.product);
  const { taxes } = useSelector((state) => state.tax);
  const [updatedTaxes, setTaxes] = useState(taxes);

  const productList = Array.isArray(products?.data) ? products.data : [];

  useEffect(() => {
    if (taxes?.length > 0) {
      setSelectedTax(taxes[0]);
    }
  }, [taxes]);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchTaxes());
  }, [dispatch]);

  useEffect(() => {
    setTaxes(taxes);
  }, [taxes]);

  const handleTaxSelect = (e) => {
    const value = e.target.value;
    const tax = updatedTaxes.find((tax) => tax._id === value);
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
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [productId]: quantityValue,
    }));
    setQuantityError("");
  };

  const handleProductSelection = (product) => {
    const productIndex = selectedProducts.findIndex((p) => p._id === product._id);
    if (productIndex > -1) {
      const updatedProducts = [...selectedProducts];
      updatedProducts[productIndex] = {
        ...updatedProducts[productIndex],
        quantity: quantity[product._id] || 1,
      };
      setSelectedProducts(updatedProducts);
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
    const productIndex = selectedProducts.findIndex((p) => p._id === currentProduct._id);
    const updatedProducts = [...selectedProducts];
    if (productIndex > -1) {
      updatedProducts[productIndex] = {
        ...updatedProducts[productIndex],
        quantity: quantity[currentProduct._id] || 1,
      };
    } else {
      updatedProducts.push({
        ...currentProduct,
        quantity: quantity[currentProduct._id] || 1,
      });
    }
    setSelectedProducts(updatedProducts);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleRemoveProduct = (productId) => {
    const updatedProducts = selectedProducts.filter((product) => product._id !== productId);
    setSelectedProducts(updatedProducts);
  };

  const handleCreateInvoice = async () => {
    if (selectedProducts.length === 0) {
      alert("Please select at least one product.");
      return;
    }

    const subTotal = calculateSubTotal();
    const total = calculateTotal();

    if (subTotal <= 0 || total <= 0) {
      alert("Subtotal and Total must be greater than zero.");
      return;
    }

    // Get shopId from localStorage
    const shopId = localStorage.getItem("shopId");
    if (!shopId) {
      alert("Shop ID not found. Please login again or select a shop.");
      return;
    }

    const data = {
      customerId: selectedCustomer ? selectedCustomer._id : null,
      productDetails: selectedProducts.map((product) => ({
        productId: product._id,
        quantity: quantity[product._id] || 1,
        price: priceMap[product._id] ?? product.price,
      })),
      tax: selectedTax ? selectedTax._id : null,
      subTotal: subTotal,
      total: total,
      status: paymentStatus,
      shopId: shopId, // <-- Add shopId here
    };

    try {
      const response = await axiosInstance.post("invoice/", data);
      if (response.status === 201) {
        // Generate PDF invoice using jsPDF
        const invoiceData = response.data.data;
        generatePDFInvoice(invoiceData);
      } else {
        throw new Error("Failed to create invoice");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong.");
    }
  };

  // PDF generation function (simple version, you can enhance as needed)
  function generatePDFInvoice(invoiceData) {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    let y = 10;
    doc.setFontSize(16).text("Invoice", 10, y);
    y += 10;
    doc.setFontSize(10).text(`Invoice ID: ${invoiceData._id || "-"}`, 10, y);
    y += 6;
    doc.text(`Customer: ${invoiceData.customerId?.first_name || ""} ${invoiceData.customerId?.last_name || ""}`, 10, y);
    y += 6;
    doc.text(`Date: ${new Date(invoiceData.createdAt).toLocaleString()}`, 10, y);
    y += 10;
    doc.text("Products:", 10, y);
    y += 6;
    invoiceData.productDetails.forEach((item, idx) => {
      doc.text(
        `${idx + 1}. ${item.productId?.name || ""} x${item.quantity} @ A$${item.price}`,
        12,
        y
      );
      y += 6;
    });
    y += 4;
    doc.text(`Subtotal: A$${invoiceData.subTotal}`, 10, y);
    y += 6;
    doc.text(`Tax: A$${invoiceData.taxValue || 0}`, 10, y);
    y += 6;
    doc.text(`Total: A$${invoiceData.total}`, 10, y);
    doc.save("invoice.pdf");
  }

  const handleClear = () => {
    setSelectedCustomer(null);
    setSelectedProducts([]);
    setQuantity({});
  };

  return (
    <Container fluid className="mt-4 p-3 rounded-4 bg-white">
      <Row>
        <Col md={6} className="px-2">
          <CustomerList onSelectCustomer={setSelectedCustomer} />
          {selectedCustomer && (
            <Alert variant="info" className="mt-2">
              Selected Customer: {selectedCustomer.first_name} {selectedCustomer.last_name}
            </Alert>
          )}

          <Productlistsel products={productList} onProductSelect={handleProductSelection} showModal={showModal} />
       
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
              <Form.Select value={selectedTax?._id} onChange={handleTaxSelect}>
                {taxes?.map((tax) => (
                  <option key={tax._id} value={tax._id}>
                    {tax.taxClass} - {tax.taxValue}% Tax
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col>
              <Form.Select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
              >
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
                value="10%"
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
              onChange={(e) => handleQuantityChange(currentProduct._id, parseInt(e.target.value))}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price per unit (A$)</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={handlePriceChange}
              placeholder="Enter price"
            />
          </Form.Group>
          <p className="mt-3">
            <strong>Total Price:</strong> A${
              isNaN(price * (quantity[currentProduct?._id] || 1))
                ? "0.00"
                : (price * (quantity[currentProduct?._id] || 1)).toFixed(2)
            }
          </p>
          {quantityError && <div className="text-danger">{quantityError}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
          <Button variant="primary" onClick={handleOk}>OK</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PointOfSale;
