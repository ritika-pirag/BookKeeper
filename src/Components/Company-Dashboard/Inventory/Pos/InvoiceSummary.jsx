
import { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button, Table, Alert } from "react-bootstrap";
import { FaDownload, FaPrint } from "react-icons/fa";
import { jsPDF } from "jspdf";
import axiosInstance from "../../../../utils/axiosInstance";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import CustomerList from "./CustomerList";

// import Loader from "../../LayOut/Loader";
import { useSelector } from "react-redux";
import axios from "axios";
import { apiUrl } from "../../../../utils/conflig";
// import InvoiceModal from "./InvoiceModal";
import { Modal} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
const InvoiceSummary = () => {
  const [invoiceData, setInvoiceData] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const invoiceRef = useRef();

  const [isEditMode, setIsEditMode] = useState(false);
  const [show, setShow] = useState(false);

 

  const invoiceDataFromState = location.state?.invoiceData;

 
  const [alert, setAlert] = useState({ type: "", msg: "" });
  const [alertType, setAlertType] = useState(""); 

  const showAlert = (type, msg) => {
    setAlert({ type, msg });
  
    setTimeout(() => {
      setAlert({ type: "", msg: "" });
    }, 3000);
  };
  {alertMsg && (
    <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
      {alertMsg}
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={() => setAlertMsg("")}
      ></button>
    </div>
  )}
  
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
  // Add terms & conditions with word wrap to fit within the width
  const [termsText, setTermsText] = useState([
    "Repairs:",
    "All repaired or replacement parts are covered by the specified days of My Fone Repairs' limited warranty.",
    "The warranty is void if the device:",
    "- Shows any physical damage (including damage to a screen protector).",
    "- Has liquid damage.",
    "- Has been opened or repaired by an unauthorized person or third-party technician.",
    "Repairs for liquid-damaged devices are not covered under the warranty.",
    "",
    "Mutual Respect:",
    "Customers are kindly requested to remain patient when addressing warranty issues.",
    "My Fone Repairs has a zero-tolerance policy for illegal or offensive behavior toward staff.",
    "Such actions will result in strict legal consequences.",
    "",
    "Liability:",
    "My Fone Repairs is not liable for:",
    "- Any data loss that may occur during repair, testing, or at any other time.",
    "- Component failures that arise during repair attempts or afterward.",
    "- Direct, indirect, special, incidental, or consequential damages resulting from the repair service.",
    "",
    "Accessories:",
    "Limited warranties are available for certain accessories, as specified on the receipt.",
    "",
    "Change of Mind:",
    "My Fone Repairs does not offer returns or refunds for change of mind (e.g., finding better alternatives).",
  ].map(text =>
    text
    .replace(/My Fone Repairs/, "Shop")

    
  ));
  
  useEffect(() => {
    const savedFormData = localStorage.getItem("companyInfo");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);
  const [invoiceEditableData, setInvoiceEditableData] = useState({
    repairParts: [],
    subTotal: 0,
    tax: { taxClass: "GST", taxValue: 10 },
    total: 0,
    accessories: [], // New state to store accessories data
  });

  const handleAccessoryPriceChange = (productId, price) => {
    const updatedAccessories = [...invoiceEditableData.accessories];
    const index = updatedAccessories.findIndex((acc) => acc._id === productId);
    if (index > -1) {
      updatedAccessories[index].price = price;
    }
    setInvoiceEditableData({
      ...invoiceEditableData,
      accessories: updatedAccessories,
    });
    calculateTotal(); // Recalculate total
  };

  const [error, setError] = useState(""); // Error state

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
const navigate = useNavigate();
  const totalPaid =
    (amounts.cash || 0) + (amounts.eftpos || 0) + (amounts.afterpay || 0);

    useEffect(() => {
      const fetchInvoice = async () => {
        try {
          setLoading(true);
          const response = await axiosInstance.get(
            `/invoice/${invoiceDataFromState._id}`
          );
          console.log("Invoice Data received (InvoiceSummary):", response.data.data);
    
          setInvoiceData(response.data?.data);
    
          setInvoiceEditableData({
            repairParts: response.data?.data.repairParts || [],
            subTotal: response.data?.data.subTotal || 0,
            tax: response.data?.data.tax || { taxClass: "GST", taxValue: 10 },
            total: response.data?.data.total || 0,
            productDetails: response.data?.data.productDetails || [],  // ✅ Added this
          });
    
        } catch (error) {
          console.error("Error fetching invoice:", error);
        } finally {
          setLoading(false);
        }
      };
    
      if (invoiceDataFromState && invoiceDataFromState._id) {
        fetchInvoice();
      }
    }, [invoiceDataFromState]);
    
    const updateTotal = () => {
      const productsTotal = invoiceEditableData.productDetails.reduce(
        (acc, item) => acc + ((parseFloat(item.price) || 0) * (item.quantity || 1)),
        0
      );
    
      const repairPartsTotal = invoiceEditableData.repairParts.reduce(
        (acc, part) => acc + (parseFloat(part.price) || 0),
        0
      );
    
      const updatedTotal = productsTotal + repairPartsTotal;
      const updatedSubTotal = updatedTotal / (1 + invoiceEditableData.tax.taxValue / 100);
    
      setInvoiceEditableData((prev) => ({
        ...prev,
        subTotal: parseFloat(updatedSubTotal.toFixed(2)),
        total: parseFloat(updatedTotal.toFixed(2)),
      }));
    };
    

  if (loading) {
    return <Loader />;
  }
  // console.log("invoice ------ ", invoiceData)

  if (!invoiceData) {
    return <div>No invoice data found.</div>;
  }

  const {
    productDetails = [],
    repairParts = [],
    subTotal = 0,
    total = 0,
    customerId = "",
    tax = {},
  } = invoiceData;


 
  
  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedFormData);
    localStorage.setItem("companyInfo", JSON.stringify(updatedFormData)); // Save to localStorage
  };
  

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    printCompactInvoice(formData);
 
  };
  const handlePrintAndPost = async (func,shouldNavigate =false ) => {
    const generatedNumber = Math.floor(Math.random() * 1000000);
    const invoiceNumber = `# ${generatedNumber}`;
    // 1. Print function call
    if (func) {
      func(invoiceNumber);
    }
    // printCompactInvoice(invoiceNumber);
    // printInvoice(invoiceNumber);  
  
    // 2. Post data to backend
    try {
     
      const payload = { 
        invoiceNumber: invoiceNumber,

        subtotal: invoiceEditableData.subTotal.toFixed(2),
        tax: (invoiceEditableData.total - invoiceEditableData.subTotal).toFixed(2),
        total: invoiceEditableData.total.toFixed(2),
        total_paid: totalPaid.toFixed(2),
        due_amount: (invoiceEditableData.total - totalPaid).toFixed(2),
        cash: amounts.cash,
        eftpos: amounts.eftpos,
        afterpay: amounts.afterpay,
      
        productDetails: invoiceEditableData.productDetails.map((item) => ({
          productId: item.productId?._id,
          name: item.productId?.name,
          quantity: item.quantity,
          price: item.price,
        })),
      
        repairParts: invoiceEditableData.repairParts.map((part) => ({
          name: part.repair_name,
          quantity: 1,
          price: part.price,
          categoryId: part.categoryId,  // include categoryId
          brandId: part.brandId,        // include brandId
          deviceId: part.deviceId     
        })),
      };
      
      // ✅ Only add customer_id if it's available
      if (selectedCustomer?._id) {
        payload.customer_id = selectedCustomer._id;
      }
    
      const response = await axiosInstance.post(`${apiUrl}/summary`, payload);
    
      console.log('Invoice posted:', response.data);
        // ✅ New Sale pe click hua hai to navigate
    if (shouldNavigate) {
      navigate('/PointOfSale');
    }
    } catch (error) {
      console.error('Error posting invoice:', error);
    }
  };
  
  const printInvoice = (invoiceNumber) => {
    // Set up the jsPDF document with A4 size (210mm x 297mm)
    const doc = new jsPDF({ unit: "mm", format: "a4" });

    // Margins for A4 size page
    const marginLeft = 10;
    const marginTop = 10;
    const x = marginLeft;
    let y = marginTop;

    // Title (Invoice Number)
    doc.setFontSize(15).setFont("helvetica", "bold");
    doc.text(`Invoice Number: ${invoiceNumber}`, x, y); 
    y += 10;

    // Invoice Type
    doc.setFontSize(10).setFont("helvetica", "normal");
    doc.text(`Invoice Type: Sale`, x, y);
    y += 8;

    // Shop Information
    doc.setFontSize(12).setFont("helvetica", "bold");
    doc.text(`${selectedShop.name}`, x, y);
    y += 8;

    doc.setFontSize(10);
    doc.text(`${formData.address || selectedShop.address}`, x, y);
    y += 6;
    doc.text(`Phone: ${formData.phone || selectedShop.phone}`, x, y);
    y += 6;
    doc.text(`Email: ${formData.email || selectedShop.email}`, x, y);
    y += 8;

    doc.text(
      `Date: ${new Date().toLocaleString("en-AU", { timeZone: "Australia/Sydney" })}`,
      x,
      y
    );
    y += 8;
    

    // Add space before table header
    y += 10;  // Add space before table

   // Table Header: ITEM | QTY | PRICE
doc.setFont("helvetica", "bold");
doc.text(`ITEM`, x, y);
doc.text(`QTY`, x + 100, y, { align: "center" });
doc.text(`PRICE`, x + 150, y, { align: "right" });
y += 5;
doc.line(x, y, 200, y);  // Draw line under the header
y += 5;

// Product Details Table Content
doc.setFont("helvetica", "normal");
invoiceEditableData.productDetails.forEach(item => {
  const wrappedText = doc.splitTextToSize(item.productId?.name, 90);
  doc.text(wrappedText, x, y);
  doc.text(`${item.quantity}`, x + 100, y, { align: "center" });
  doc.text(`A$${item.price}`, x + 150, y, { align: "right" });

  // Adjust Y position for next row
  y += wrappedText.length * 4 + 5;  // 5px extra space between rows
});

// Add extra space after product details
y += 10;


// Repair Parts Table Content
invoiceEditableData.repairParts.forEach(part => {
  // Category Name
  const categoryText = doc.splitTextToSize(part.category_name || "N/A", 35);
  doc.text(categoryText, x, y);
  y += categoryText.length * 4;

  // Brand Name
  const brandText = doc.splitTextToSize(part.brand_name || "N/A", 35);
  doc.text(brandText, x, y);
  y += brandText.length * 4;

  // Device Name
  const deviceText = doc.splitTextToSize(part.device_name || "N/A", 35);
  doc.text(deviceText, x, y);
  y += deviceText.length * 4;

  // Repair Name
  const repairText = doc.splitTextToSize(part.repair_name || "N/A", 35);
  doc.text(repairText, x, y);

  // Quantity (fixed 1)
  doc.text(`1`, x + 100, y, { align: "center" });

  // Price
  doc.text(`A$${part.price || "0.00"}`, x + 150, y, { align: "right" });

  // Adjust Y for next row
  y += repairText.length * 4 + 8;  // 8px extra spacing after each repair part group
});



    // Subtotal, GST, and Total
    y += 10;
    doc.line(x, y, 200, y);  // Line before totals
    y += 5;

    // Subtotal
    doc.setFont("helvetica", "bold");
    doc.text(`Subtotal:`, x, y);
    doc.text(`A$${invoiceEditableData.subTotal.toFixed(2)}`, x + 150, y, { align: "right" });
    y += 6;

    // GST
    doc.text(`GST (${invoiceEditableData.tax.taxValue}%):`, x, y);
    doc.text(`A$${(invoiceEditableData.total - invoiceEditableData.subTotal).toFixed(2)}`, x + 150, y, { align: "right" });
    y += 6;

    // Total
    doc.text(`TOTAL:`, x, y);
    doc.text(`A$${invoiceEditableData.total.toFixed(2)}`, x + 150, y, { align: "right" });
    y += 10;

    doc.line(x, y, 200, y);  // Line after totals
    y += 6;

    // Terms & Conditions
    doc.setFont("helvetica", "bold");
    doc.text("Terms & Conditions:", x, y);
    y += 10;

    doc.setFont("helvetica", "normal").setFontSize(8);
    termsText.forEach(line => {
      const wrappedText = doc.splitTextToSize(line, 190);
      doc.text(wrappedText, x, y);
      y += wrappedText.length * 3;  // Adjust for wrapped text
    });

    // Open the generated PDF in a new window/tab
    window.open(doc.output('bloburl'), '_blank');
};

const printCompactInvoice = (invoiceNumber) => {
  const doc = new jsPDF({ unit: "mm", format: [58, 200] }); // 58mm width
  let y = 8;
  const x = 3; // Smaller padding for narrow paper

  // Header
  doc.setFontSize(11).setFont("helvetica", "bold");
  doc.text(`${invoiceNumber}`, x, y);
  y += 5;

  doc.setFontSize(6.5).setFont("helvetica", "normal");
  doc.text(`Invoice Type: Sale`, x, y);
  y += 3.5;

  doc.setFontSize(7.5).setFont("helvetica", "bold");
  doc.text(`${formData.companyName}`, x, y);

  y += 4;

  doc.setFontSize(5.8);
  doc.text(`${formData.address}`, x, y);
  doc.text(`${formData.phone}`, x, y);
  doc.text(`${formData.email}`, x, y);
  
  doc.text(`Date: ${new Date().toLocaleString("en-AU", { timeZone: "Australia/Sydney" })}`, x, y);
  y += 4;

  // Table Headers
  y += 2.5;
  doc.setFont("helvetica", "bold").setFontSize(6.2);
  doc.text(`ITEM`, x, y);
  doc.text(`QTY`, x + 28, y, { align: "center" });
  doc.text(`PRICE`, x + 52, y, { align: "right" });
  y += 2;
  doc.line(x, y, x + 52, y);
  y += 2;

  // Product Items
  doc.setFont("helvetica", "normal").setFontSize(5.8);
  invoiceEditableData.productDetails.forEach(item => {
    const wrappedText = doc.splitTextToSize(item.productId?.name, 25);
    doc.text(wrappedText, x, y);
    doc.text(`${item.quantity}`, x + 28, y, { align: "center" });
    doc.text(`A$${item.price}`, x + 52, y, { align: "right" });
    y += wrappedText.length * 2.8;
  });

  // Repair Parts
  invoiceEditableData.repairParts.forEach(part => {
    const addBlock = (txt) => {
      const lines = doc.splitTextToSize(txt || "N/A", 25);
      doc.text(lines, x, y);
      y += lines.length * 2.8;
    };

    addBlock(part.category_name);
    addBlock(part.brand_name);
    addBlock(part.device_name);

    const repairLines = doc.splitTextToSize(part.repair_name || "N/A", 25);
    doc.text(repairLines, x, y);
    doc.text(`1`, x + 28, y, { align: "center" });
    doc.text(`A$${part.price || "0.00"}`, x + 52, y, { align: "right" });
    y += repairLines.length * 2.8;

    y += 3;
  });

  // Totals
  y += 2;
  doc.line(x, y, x + 52, y);
  y += 2.8;

  doc.setFont("helvetica", "bold").setFontSize(6.2);
  doc.text(`Subtotal:`, x, y);
  doc.text(`A$${invoiceEditableData.subTotal.toFixed(2)}`, x + 52, y, { align: "right" });
  y += 3;

  doc.text(`GST (${invoiceEditableData.tax.taxValue}%):`, x, y);
  doc.text(`A$${(invoiceEditableData.total - invoiceEditableData.subTotal).toFixed(2)}`, x + 52, y, { align: "right" });
  y += 3;

  doc.text(`TOTAL:`, x, y);
  doc.text(`A$${invoiceEditableData.total.toFixed(2)}`, x + 52, y, { align: "right" });
  y += 4;

  doc.line(x, y, x + 52, y);
  y += 3;

  // Terms & Conditions
  doc.setFont("helvetica", "bold").setFontSize(6).text("Terms & Conditions:", x, y);
  y += 2.5;

  doc.setFont("helvetica", "normal").setFontSize(5);
  termsText.forEach(line => {
    const wrapped = doc.splitTextToSize(line, 52);
    doc.text(wrapped, x, y);
    y += wrapped.length * 2.3;
  });

  // Output
  window.open(doc.output('bloburl'), '_blank');
};


  
  const handleSendInvoice = () => {
    alert('✅ Invoice sent to customer!');
  };

  const recalculateInvoiceTotals = () => {
    const productsTotal = invoiceEditableData.productDetails.reduce(
      (acc, item) => acc + ((parseFloat(item.productId?.price) || 0) * (item.quantity || 1)),
      0
    );
  
    const repairPartsTotal = invoiceEditableData.repairParts.reduce(
      (acc, part) => acc + (parseFloat(part.price) || 0),
      0
    );
  
    const updatedTotal = productsTotal + repairPartsTotal;
    const updatedSubTotal = updatedTotal / (1 + invoiceEditableData.tax.taxValue / 100);
  
    setInvoiceEditableData((prev) => ({
      ...prev,
      subTotal: parseFloat(updatedSubTotal.toFixed(2)),
      total: parseFloat(updatedTotal.toFixed(2)),
    }));
  };
   const handleCancel = () => {
      navigate("/PointOfSale");
   }
  // console.log("productDetails", productDetails, repairParts);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <Container className="">
      <h3 className="text-center mb-4">Invoice Summary</h3>
      <Button className="mb-2"
        variant={isEditMode ? "warning" : "primary"}
        onClick={() => setIsEditMode(!isEditMode)}>
        {isEditMode ? "Save & Preview Invoice" : "Edit Invoice Info"}
      </Button>

      {/* Action Buttons */}
      <span className="float-end d-flex gap-2">
      <Button onClick={handleCancel} variant="secondary" className="mb-2 mr-8">
      Cancel
</Button>
<Button   onClick={handleShow} variant="primary" className="mb-2 mr-8">
      Confirm
</Button>
 <Modal show={show}
       onHide={handleClose}
       centered
       size="lg"
       aria-labelledby="contained-modal-title-vcenter">
       <Modal.Header closeButton>
         <Modal.Title id="contained-modal-title-vcenter">
           You probably want to do one of the following
         </Modal.Title>
       </Modal.Header>
 
       <Modal.Body>
           <Button variant="primary" size="lg" className="m-2 " onClick={()=>{handlePrintAndPost(printInvoice)}}>
             Print Invoice
           </Button>
           <Button variant="warning" size="lg" className="m-2" onClick={()=>{handlePrintAndPost(printCompactInvoice)}}>
             Print Thermal Receipt
           </Button>
           <Button variant="" size="lg" className="m-2 btn btn-info" onClick={handleSendInvoice }>
            Email Invoice
        </Button>
           <Button variant="secondary" size="lg" className="m-2 btn btn-success" onClick={() => handlePrintAndPost(undefined, true)}>
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
      <div ref={invoiceRef} className="p-3 border rounded bg-white">
        {/* Customer & Invoice Details */}
        <Row className="mb-3">
          <Col xs={12} md={6} className="mb-3 mb-md-0">
            <h5>Customer Details</h5>
            {!customerId && (
              <CustomerList onSelectCustomer={setSelectedCustomer} />
            )}
    <Alert variant="info" className="mt-2">
  Selected Customer: {customerId.first_name} {customerId.last_name}
</Alert>

     <Alert variant="info" className="mt-2">
  Selected Customer: {selectedCustomer.first_name} {selectedCustomer.last_name}
</Alert>

            {customerId && (
              <>
                {" "}
                <p>
                  <strong>Name:</strong>{" "}
                  {`${customerId.first_name} ${customerId.last_name}`}
                </p>
                <p>
                  <strong>Email:</strong> {customerId.email || "N/A"}
                </p>
              </>
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
    }}>
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
                  <div className="invalid-feedback">
                    Please enter a company name.
                  </div>
                </div>
                {/* Email */}
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label fw-bold">
                    {" "}
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
                {/* Phone */}
                <div className="col-md-6">
                  <label htmlFor="phone" className="form-label fw-bold">
                    {" "}
                    Phone{" "}
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Please enter a 10-digit phone number.
                  </div>
                </div>
                {/* Address */}
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
                  <div className="invalid-feedback">
                    Please enter an address.
                  </div>
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

           {/* Product Details Table */}
           {productDetails.length > 0 && (
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
      {productDetails.map((product, index) => (
        <tr key={index}>
          {/* Editable Product Name */}
          <td>
            {isEditMode ? (
              <input
                type="text"
                className="form-control"
                value={product.productId?.name || ""}
                onChange={(e) => {
                  const updatedProducts = [...productDetails];
                  updatedProducts[index].productId.name = e.target.value;
                  setInvoiceData({ ...invoiceData, productDetails: updatedProducts });
                }}
              />
            ) : (
              product.productId?.name || "N/A"
            )}
          </td>

          {/* Editable Quantity */}
          <td>
            {isEditMode ? (
              <input
                type="number"
                className="form-control"
                value={product.quantity}
                onChange={(e) => {
                  const updatedProducts = [...productDetails];
                  updatedProducts[index].quantity = parseInt(e.target.value) || 0;
                  setInvoiceData({ ...invoiceData, productDetails: updatedProducts });
                  updateTotal(); // Recalculate total
                }}
              />
            ) : (
              product.quantity || 0
            )}
          </td>

          {/* Editable Unit Price */}
          <td>
            {isEditMode ? (
             <input
             type="number"
             className="form-control"
             value={product.price}
             onChange={(e) => {
               const updatedProducts = [...productDetails];
               updatedProducts[index].price = parseFloat(e.target.value) || 0;
               setInvoiceData({ ...invoiceData, productDetails: updatedProducts });
               updateTotal(); // Recalculate total
             }}
           />
           
            ) : (
              `A$${product?.price || 0}`
            )}
          </td>

          {/* Calculated Total */}
          <td>
            A$
            {(
              (product?.price || 0) *
              (product.quantity || 0)
            ).toFixed(2)}
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
)}





            {/* Repair Parts Table */}
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
                        
                            const updatedRepairParts = invoiceEditableData.repairParts.map((p, idx) =>
                              idx === index ? { ...p, price: updatedPrice } : p
                            );
                        
                            // Immediately calculate with updated value
                            const productsTotal = invoiceEditableData.productDetails.reduce(
                              (acc, item) =>
                                acc + ((parseFloat(item.price) || 0) * (item.quantity || 1)),
                              0
                            );
                            
                        
                            const repairPartsTotal = updatedRepairParts.reduce(
                              (acc, part) => acc + (parseFloat(part.price) || 0),
                              0
                            );
                        
                            const updatedTotal = productsTotal + repairPartsTotal;
                            const updatedSubTotal = updatedTotal / (1 + invoiceEditableData.tax.taxValue / 100);
                        
                            setInvoiceEditableData((prev) => ({
                              ...prev,
                              repairParts: updatedRepairParts,
                              subTotal: parseFloat(updatedSubTotal.toFixed(2)),
                              total: parseFloat(updatedTotal.toFixed(2)),
                            }));
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
 {/* 🔥 FINAL WORKING CALCULATION */}
<tr>
  <td><strong>Subtotal:</strong></td>
  <td>
    <strong>
      A${invoiceEditableData.subTotal.toFixed(2)}
    </strong>
  </td>
</tr>

<tr>
  <td>
    <strong>Tax ({invoiceEditableData.tax.taxClass}):</strong>
  </td>
  <td>
    A${(invoiceEditableData.total - invoiceEditableData.subTotal).toFixed(2)}
  </td>
</tr>

<tr className="table-success">
  <td><strong>Total:</strong></td>
  <td>
    A${invoiceEditableData.total.toFixed(2)}
  </td>
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

        {/* Total Summary */}
      </div>
    </Container>
  );
};

export default InvoiceSummary;
