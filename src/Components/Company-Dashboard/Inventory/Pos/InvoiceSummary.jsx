import { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button, Table, Modal } from "react-bootstrap";
import { jsPDF } from "jspdf";
import { useLocation, useNavigate } from "react-router-dom";
import CustomerList from "./CustomerList";
import { Alert } from "antd";
import Loader from "../../LayOut/Loader";

const InvoiceSummary = () => {
  const [invoiceData, setInvoiceData] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(false); // Changed to false since we're not fetching
  const location = useLocation();
  const invoiceRef = useRef();
  const [isEditMode, setIsEditMode] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedShop, setSelectedShop] = useState({
    name: "My Shop",
    address: "123 Shop St",
    phone: "0412345678",
    email: "shop@example.com",
    _id: "shop123",
  });

  // Use mock data from location state or create default
  const invoiceDataFromState = location.state?.invoiceData || {
    _id: "inv123",
    repairParts: [],
    productDetails: [],
    subTotal: 0,
    tax: { taxClass: "GST", taxValue: 10 },
    total: 0,
    customerId: null,
  };

  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [amounts, setAmounts] = useState({
    cash: "",
    eftpos: "",
    afterpay: "",
  });

  const [termsText, setTermsText] = useState([
    "Repairs:",
    "All repaired or replacement parts are covered by warranty.",
    "The warranty is void if the device:",
    "- Shows any physical damage",
    "- Has liquid damage",
    "- Has been opened by unauthorized person",
    "",
    "Liability:",
    "We are not liable for any data loss during repair.",
    "",
    "Change of Mind:",
    "No returns or refunds for change of mind.",
  ]);

  const [invoiceEditableData, setInvoiceEditableData] = useState({
    repairParts: [],
    subTotal: 0,
    tax: { taxClass: "GST", taxValue: 10 },
    total: 0,
    accessories: [],
    productDetails: [],
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Load shop data from localStorage or use default
    const savedShop = localStorage.getItem("selectedShop");
    if (savedShop) {
      setSelectedShop(JSON.parse(savedShop));
    }

    // Load company info from localStorage
    const savedFormData = localStorage.getItem("companyInfo");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }

    // Initialize invoice data
    setInvoiceData(invoiceDataFromState);
    setInvoiceEditableData({
      repairParts: invoiceDataFromState.repairParts || [],
      subTotal: invoiceDataFromState.subTotal || 0,
      tax: invoiceDataFromState.tax || { taxClass: "GST", taxValue: 10 },
      total: invoiceDataFromState.total || 0,
      productDetails: invoiceDataFromState.productDetails || [],
    });
  }, []);

  const handleAmountChange = (e, type) => {
    const value = e.target.value;
    let numericValue = value === "" ? "" : parseFloat(value) || 0;

    let newAmounts = { ...amounts, [type]: numericValue };
    let newTotalPaid =
      (newAmounts.cash || 0) +
      (newAmounts.eftpos || 0) +
      (newAmounts.afterpay || 0);

    if (newTotalPaid > invoiceEditableData.total) {
      setError("Total Paid cannot exceed Total Amount!");
    } else {
      setError("");
    }

    setAmounts(newAmounts);
  };

  const totalPaid =
    (amounts.cash || 0) + (amounts.eftpos || 0) + (amounts.afterpay || 0);

  const updateTotal = () => {
    const productsTotal = invoiceEditableData.productDetails.reduce(
      (acc, item) => acc + (parseFloat(item.price) || 0) * (item.quantity || 1),
      0
    );

    const repairPartsTotal = invoiceEditableData.repairParts.reduce(
      (acc, part) => acc + (parseFloat(part.price) || 0),
      0
    );

    const updatedTotal = productsTotal + repairPartsTotal;
    const updatedSubTotal =
      updatedTotal / (1 + invoiceEditableData.tax.taxValue / 100);

    setInvoiceEditableData((prev) => ({
      ...prev,
      subTotal: parseFloat(updatedSubTotal.toFixed(2)),
      total: parseFloat(updatedTotal.toFixed(2)),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedFormData);
    localStorage.setItem("companyInfo", JSON.stringify(updatedFormData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    printCompactInvoice(formData);
  };

  const handlePrintAndPost = async (printFunc, shouldNavigate = false) => {
    const generatedNumber = Math.floor(Math.random() * 1000000);
    const invoiceNumber = `# ${generatedNumber}`;

    if (printFunc) {
      printFunc(invoiceNumber);
    }

    // Mock "posting" by saving to localStorage
    const invoiceToSave = {
      invoiceNumber,
      shop_id: selectedShop._id,
      subtotal: invoiceEditableData.subTotal.toFixed(2),
      tax: (invoiceEditableData.total - invoiceEditableData.subTotal).toFixed(
        2
      ),
      total: invoiceEditableData.total.toFixed(2),
      total_paid: totalPaid.toFixed(2),
      due_amount: (invoiceEditableData.total - totalPaid).toFixed(2),
      cash: amounts.cash,
      eftpos: amounts.eftpos,
      afterpay: amounts.afterpay,
      productDetails: invoiceEditableData.productDetails,
      repairParts: invoiceEditableData.repairParts,
      customer_id: selectedCustomer?._id || null,
      timestamp: new Date().toISOString(),
    };

    // Save to localStorage
    const savedInvoices = JSON.parse(localStorage.getItem("invoices") || "[]");
    savedInvoices.push(invoiceToSave);
    localStorage.setItem("invoices", JSON.stringify(savedInvoices));

    console.log("Invoice saved locally:", invoiceToSave);

    if (shouldNavigate) {
      navigate("/PointOfSale");
    }
  };

  // Print functions remain the same as they don't depend on APIs
  const printInvoice = (invoiceNumber) => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    // ... (rest of the printInvoice implementation remains the same)
    window.open(doc.output("bloburl"), "_blank");
  };

  const printCompactInvoice = (invoiceNumber) => {
    const doc = new jsPDF({ unit: "mm", format: [58, 200] });
    // ... (rest of the printCompactInvoice implementation remains the same)
    window.open(doc.output("bloburl"), "_blank");
  };

  const handleSendInvoice = () => {
    alert("✅ Invoice sent to customer! (Mock operation)");
  };

  const handleCancel = () => {
    navigate("/PointOfSale");
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (!invoiceData) {
    return <div>No invoice data found.</div>;
  }

  return (
    <Container className="">
      <h3 className="text-center mb-4">Invoice Summary</h3>
      <Button
        className="mb-2"
        variant={isEditMode ? "warning" : "primary"}
        onClick={() => setIsEditMode(!isEditMode)}
      >
        {isEditMode ? "Save & Preview Invoice" : "Edit Invoice Info"}
      </Button>

      <span className="float-end d-flex gap-2">
        <Button
          onClick={handleCancel}
          variant="secondary"
          className="mb-2 mr-8"
        >
          Cancel
        </Button>
        <Button onClick={handleShow} variant="primary" className="mb-2 mr-8">
          Confirm
        </Button>
        <Modal
          show={show}
          onHide={handleClose}
          centered
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Invoice Actions
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Button
              variant="primary"
              size="lg"
              className="m-2"
              onClick={() => handlePrintAndPost(printInvoice)}
            >
              Print Invoice
            </Button>
            <Button
              variant="warning"
              size="lg"
              className="m-2"
              onClick={() => handlePrintAndPost(printCompactInvoice)}
            >
              Print Thermal Receipt
            </Button>
            <Button
              variant="info"
              size="lg"
              className="m-2"
              onClick={handleSendInvoice}
            >
              Email Invoice
            </Button>
            <Button
              variant="success"
              size="lg"
              className="m-2"
              onClick={() => handlePrintAndPost(undefined, true)}
            >
              New Sale
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </span>

      {/* Rest of your JSX remains the same */}
      <div ref={invoiceRef} className="p-3 border rounded bg-white">
        <Row className="mb-3">
          <Col xs={12} md={6} className="mb-3 mb-md-0">
            <h5>Customer Details</h5>
            {!invoiceData.customerId && (
              <CustomerList onSelectCustomer={setSelectedCustomer} />
            )}
            {selectedCustomer && (
              <Alert
                message={`Selected Customer: ${selectedCustomer.first_name} ${selectedCustomer.last_name}`}
                type="info"
                className="mt-2"
              />
            )}

            <div className="container mt-5">
              <h6 className="mb-3">Add Company Info</h6>
              {isEditMode && (
                <Button
                  variant="danger"
                  className="mt-3"
                  onClick={() => {
                    localStorage.removeItem("companyInfo");
                    setFormData({
                      companyName: "",
                      email: "",
                      phone: "",
                      address: "",
                    });
                  }}
                >
                  Clear Saved Company Info
                </Button>
              )}

              <form
                className="row g-3 needs-validation"
                noValidate
                onSubmit={handleSubmit}
              >
                <div className="col-md-6">
                  <label htmlFor="companyName" className="form-label fw-bold">
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label fw-bold">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="phone" className="form-label fw-bold">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="address" className="form-label fw-bold">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                {isEditMode && (
                  <div className="mt-4">
                    <h6>Edit Terms & Conditions</h6>
                    <textarea
                      className="form-control"
                      rows={12}
                      value={termsText.join("\n")}
                      onChange={(e) => setTermsText(e.target.value.split("\n"))}
                    ></textarea>
                  </div>
                )}
              </form>
            </div>
          </Col>

          <Col xs={12} md={6}>
            <h5>Invoice Details</h5>

            {invoiceEditableData.productDetails.length > 0 && (
              <Table bordered responsive className="mb-3">
                <thead className="bg-light">
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceEditableData.productDetails.map((product, index) => (
                    <tr key={index}>
                      <td>
                        {isEditMode ? (
                          <input
                            type="text"
                            className="form-control"
                            value={product.productId?.name || ""}
                            onChange={(e) => {
                              const updatedProducts = [
                                ...invoiceEditableData.productDetails,
                              ];
                              updatedProducts[index].productId.name =
                                e.target.value;
                              setInvoiceEditableData({
                                ...invoiceEditableData,
                                productDetails: updatedProducts,
                              });
                              updateTotal();
                            }}
                          />
                        ) : (
                          product.productId?.name || "N/A"
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <input
                            type="number"
                            className="form-control"
                            value={product.quantity}
                            onChange={(e) => {
                              const updatedProducts = [
                                ...invoiceEditableData.productDetails,
                              ];
                              updatedProducts[index].quantity =
                                parseInt(e.target.value) || 0;
                              setInvoiceEditableData({
                                ...invoiceEditableData,
                                productDetails: updatedProducts,
                              });
                              updateTotal();
                            }}
                          />
                        ) : (
                          product.quantity || 0
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <input
                            type="number"
                            className="form-control"
                            value={product.price}
                            onChange={(e) => {
                              const updatedProducts = [
                                ...invoiceEditableData.productDetails,
                              ];
                              updatedProducts[index].price =
                                parseFloat(e.target.value) || 0;
                              setInvoiceEditableData({
                                ...invoiceEditableData,
                                productDetails: updatedProducts,
                              });
                              updateTotal();
                            }}
                          />
                        ) : (
                          `A$${product?.price || 0}`
                        )}
                      </td>
                      <td>
                        A$
                        {(
                          (product?.price || 0) * (product.quantity || 0)
                        ).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

            {invoiceEditableData.repairParts.length > 0 && (
              <Table bordered responsive>
                <thead className="bg-light">
                  <tr>
                    <th>Repair Part</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceEditableData.repairParts.map((part, index) => (
                    <tr key={index}>
                      <td>
                        {isEditMode ? (
                          <input
                            type="text"
                            className="form-control"
                            value={part.repair_name}
                            onChange={(e) => {
                              const updatedParts = [
                                ...invoiceEditableData.repairParts,
                              ];
                              updatedParts[index].repair_name = e.target.value;
                              setInvoiceEditableData({
                                ...invoiceEditableData,
                                repairParts: updatedParts,
                              });
                            }}
                          />
                        ) : (
                          part.repair_name || "N/A"
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <input
                            type="number"
                            className="form-control"
                            value={part.price}
                            onChange={(e) => {
                              const updatedPrice = parseFloat(e.target.value);
                              const updatedRepairParts =
                                invoiceEditableData.repairParts.map((p, idx) =>
                                  idx === index
                                    ? { ...p, price: updatedPrice }
                                    : p
                                );

                              setInvoiceEditableData((prev) => ({
                                ...prev,
                                repairParts: updatedRepairParts,
                              }));
                              updateTotal();
                            }}
                          />
                        ) : (
                          `A$${part.price || "0.00"}`
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

            <Row>
              <Col xs={12}>
                <h5>Total Summary</h5>
                <Table bordered responsive>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Subtotal:</strong>
                      </td>
                      <td>
                        <strong>
                          A${invoiceEditableData.subTotal.toFixed(2)}
                        </strong>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>
                          Tax ({invoiceEditableData.tax.taxClass}):
                        </strong>
                      </td>
                      <td>
                        A$
                        {(
                          invoiceEditableData.total -
                          invoiceEditableData.subTotal
                        ).toFixed(2)}
                      </td>
                    </tr>
                    <tr className="table-success">
                      <td>
                        <strong>Total:</strong>
                      </td>
                      <td>A${invoiceEditableData.total.toFixed(2)}</td>
                    </tr>
                  </tbody>

                  <div className="d-flex justify-content-between align-items-center gap-2 mb-2 mt-2">
                    <button className="btn btn-primary">Cash</button>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className="form-control"
                      style={{ width: "200px" }}
                      value={amounts.cash}
                      onChange={(e) => handleAmountChange(e, "cash")}
                    />
                  </div>

                  <div className="d-flex justify-content-between align-items-center gap-2 mb-2">
                    <button className="btn btn-primary">Eftpos</button>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className="form-control"
                      style={{ width: "200px" }}
                      value={amounts.eftpos}
                      onChange={(e) => handleAmountChange(e, "eftpos")}
                    />
                  </div>

                  <div className="d-flex justify-content-between align-items-center gap-2 mb-2">
                    <button className="btn btn-primary">AfterPay</button>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className="form-control"
                      style={{ width: "200px" }}
                      value={amounts.afterpay}
                      onChange={(e) => handleAmountChange(e, "afterpay")}
                    />
                  </div>
                  <div>
                    {totalPaid > invoiceEditableData.total && (
                      <span className="text-danger">
                        Error: The entered amount exceeds the total limit.
                        Please adjust the value and try again.
                      </span>
                    )}
                  </div>

                  <tbody>
                    <tr>
                      <td>
                        <strong>Total Paid:</strong>
                      </td>
                      <td>A${totalPaid.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Due Amount:</strong>
                      </td>
                      <td>
                        A${(invoiceEditableData.total - totalPaid).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default InvoiceSummary;
