import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Card,
  Row,
  Col,
  Badge,
  InputGroup,
  Dropdown,
} from "react-bootstrap";
import { FaTrash, FaEye, FaPlus, FaEdit, FaSearch, FaFilter } from "react-icons/fa";

const emptyCustomer = {
  name: "",
  contact: "",
  email: "",
  taxNumber: "",
  altMobile: "",
  balance: "",
  taxEnabled: false,
  billing: {
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  },
  shipping: {
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  },
};

const CustomerTable = () => {
  const [customersList, setCustomersList] = useState([
    {
      name: "Lalit Singh",
      contact: "09752100980",
      email: "lalit@example.com",
      taxNumber: "GSTIN123",
      altMobile: "0987654321",
      balance: "5000",
      taxEnabled: true,
      billing: {
        name: "Lalit Singh",
        phone: "09752100980",
        address: "34 Mahal Kachhari Road",
        city: "Indore",
        state: "Madhya Pradesh",
        country: "India",
        zip: "452001",
      },
      shipping: {
        name: "Lalit Singh",
        phone: "09752100980",
        address: "34 Mahal Kachhari Road",
        city: "Indore",
        state: "Madhya Pradesh",
        country: "India",
        zip: "452001",
      },
    }
  ]);
  
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(JSON.parse(JSON.stringify(emptyCustomer)));
  const [currentIndex, setCurrentIndex] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [addressFilter, setAddressFilter] = useState("all");
  const [addressFilterValue, setAddressFilterValue] = useState("");

  const handleOpenAddEditModal = (mode, customer = null, index = null) => {
    setEditMode(mode === "edit");
    
    if (mode === "add") {
      setCurrentCustomer(JSON.parse(JSON.stringify(emptyCustomer)));
    } else {
      setCurrentCustomer(JSON.parse(JSON.stringify(customer)));
    }
    
    setCurrentIndex(index);
    setShowAddEditModal(true);
  };

  const handleOpenViewModal = (customer) => {
    setCurrentCustomer(customer);
    setShowViewModal(true);
  };

  const handleSave = () => {
    const newCustomer = JSON.parse(JSON.stringify(currentCustomer));
    
    if (editMode && currentIndex !== null) {
      const updatedList = [...customersList];
      updatedList[currentIndex] = newCustomer;
      setCustomersList(updatedList);
    } else {
      setCustomersList([...customersList, { ...newCustomer, id: customersList.length + 1 }]);
    }
    
    setShowAddEditModal(false);
    resetModal();
  };

  const handleDelete = () => {
    const updated = customersList.filter((_, idx) => idx !== deleteIndex);
    setCustomersList(updated);
    setShowConfirmDelete(false);
  };

  const resetModal = () => {
    setCurrentCustomer(JSON.parse(JSON.stringify(emptyCustomer)));
    setEditMode(false);
    setCurrentIndex(null);
  };

  const updateField = (path, value) => {
    const keys = path.split(".");
    const updated = JSON.parse(JSON.stringify(currentCustomer));
    let obj = updated;
    
    while (keys.length > 1) {
      if (!obj[keys[0]]) obj[keys[0]] = {};
      obj = obj[keys.shift()];
    }
    
    obj[keys[0]] = value;
    setCurrentCustomer(updated);
  };

  const copyBillingToShipping = () => {
    setCurrentCustomer(prev => ({
      ...prev,
      shipping: { ...prev.billing }
    }));
  };

  // Filter customers based on search term and address filter
  const filteredCustomers = customersList.filter(customer => {
    // Search term matching (name, email, contact)
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.contact.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Address filter matching
    let matchesAddress = true;
    if (addressFilter !== "all" && addressFilterValue) {
      const addressField = addressFilter === "billing" ? customer.billing : customer.shipping;
      matchesAddress = 
        addressField.address.toLowerCase().includes(addressFilterValue.toLowerCase()) ||
        addressField.city.toLowerCase().includes(addressFilterValue.toLowerCase()) ||
        addressField.state.toLowerCase().includes(addressFilterValue.toLowerCase());
    }
    
    return matchesSearch && matchesAddress;
  });

  return (
    <div className="p-4 mt-2">
      <Card className="rounded-3 p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-semibold mb-0">Customer Table</h6>
          <Button variant="info" size="sm" onClick={() => handleOpenAddEditModal("add")}> 
            <FaPlus className="me-1" /> Add Customer 
          </Button>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-3">
          <Row>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by name, email or phone"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={6}>
         
            </Col>
          </Row>
        </div>

        <Table bordered hover responsive>
          <thead className="table-light">
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Balance</th>
              <th>Tax</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((cust, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{cust.name}</td>
                  <td>{cust.contact}</td>
                  <td>{cust.email}</td>
                  <td>${parseFloat(cust.balance || 0).toFixed(2)}</td>
                  <td>
                    <Badge bg={cust.taxEnabled ? "success" : "secondary"}>
                      {cust.taxEnabled ? "ON" : "OFF"}
                    </Badge>
                  </td>
                  <td>
                    <div className="d-flex gap-2 justify-content-center">
                      <Button variant="outline-info" size="sm" onClick={() => handleOpenViewModal(cust)}>
                        <FaEye />
                      </Button>
                      <Button variant="outline-warning" size="sm" onClick={() => handleOpenAddEditModal("edit", cust, idx)}>
                        <FaEdit />
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => { setDeleteIndex(idx); setShowConfirmDelete(true); }}>
                        <FaTrash />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted py-4">
                  {customersList.length === 0 ? "No customers found. Add your first customer!" : "No matching customers found."}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>

      {/* Add/Edit Modal */}
      <Modal show={showAddEditModal} onHide={() => { setShowAddEditModal(false); resetModal(); }} size="lg" centered>
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>{editMode ? "Edit Customer" : "Add Customer"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}><Form.Group className="mb-2"><Form.Label>Name *</Form.Label><Form.Control type="text" value={currentCustomer.name} onChange={(e) => updateField("name", e.target.value)} /></Form.Group></Col>
              <Col md={6}><Form.Group className="mb-2"><Form.Label>Contact *</Form.Label><Form.Control type="text" value={currentCustomer.contact} onChange={(e) => updateField("contact", e.target.value)} /></Form.Group></Col>
              <Col md={6}><Form.Group className="mb-2"><Form.Label>Email *</Form.Label><Form.Control type="email" value={currentCustomer.email} onChange={(e) => updateField("email", e.target.value)} /></Form.Group></Col>
              <Col md={6}><Form.Group className="mb-2"><Form.Label>Alternate Mobile</Form.Label><Form.Control type="text" value={currentCustomer.altMobile} onChange={(e) => updateField("altMobile", e.target.value)} /></Form.Group></Col>
              <Col md={6}><Form.Group className="mb-2"><Form.Label>Tax Number</Form.Label><Form.Control type="text" value={currentCustomer.taxNumber} onChange={(e) => updateField("taxNumber", e.target.value)} /></Form.Group></Col>
              <Col md={6}><Form.Group className="mb-2"><Form.Label>Tax Enabled</Form.Label><Form.Check type="switch" checked={currentCustomer.taxEnabled} onChange={(e) => updateField("taxEnabled", e.target.checked)} /></Form.Group></Col>
              <Col md={6}><Form.Group className="mb-2"><Form.Label>Balance</Form.Label><Form.Control type="number" value={currentCustomer.balance} onChange={(e) => updateField("balance", e.target.value)} /></Form.Group></Col>
            </Row>
            <hr />
            <h6>Billing Address</h6>
            <Row>
              {Object.entries(currentCustomer.billing).map(([key, value], i) => (
                <Col md={6} key={i}><Form.Group className="mb-2"><Form.Label className="text-capitalize">{key}</Form.Label><Form.Control type="text" value={value} onChange={(e) => updateField(`billing.${key}`, e.target.value)} /></Form.Group></Col>
              ))}
            </Row>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="mb-0">Shipping Address</h6>
              <Button size="sm" variant="outline-primary" onClick={copyBillingToShipping}>Same as Billing Address</Button>
            </div>
            <Row className="mt-2">
              {Object.entries(currentCustomer.shipping).map(([key, value], i) => (
                <Col md={6} key={i}><Form.Group className="mb-2"><Form.Label className="text-capitalize">{key}</Form.Label><Form.Control type="text" value={value} onChange={(e) => updateField(`shipping.${key}`, e.target.value)} /></Form.Group></Col>
              ))}
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { setShowAddEditModal(false); resetModal(); }}>Close</Button>
          <Button variant="primary" onClick={handleSave}>{editMode ? "Update" : "Save"}</Button>
        </Modal.Footer>
      </Modal>

      {/* View Modal - Different styling */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg" centered>
        <Modal.Header closeButton className="bg-info text-white">
          <Modal.Title>Customer Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mb-3">
            <Card.Header className="bg-light">
              <h5 className="mb-0">Basic Information</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <p><strong>Name:</strong> {currentCustomer.name}</p>
                  <p><strong>Contact:</strong> {currentCustomer.contact}</p>
                  <p><strong>Email:</strong> {currentCustomer.email}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Alternate Mobile:</strong> {currentCustomer.altMobile || "-"}</p>
                  <p><strong>Tax Number:</strong> {currentCustomer.taxNumber || "-"}</p>
                  <p>
                    <strong>Tax Enabled:</strong> 
                    <Badge bg={currentCustomer.taxEnabled ? "success" : "secondary"} className="ms-2">
                      {currentCustomer.taxEnabled ? "ON" : "OFF"}
                    </Badge>
                  </p>
                  <p><strong>Balance:</strong> ${parseFloat(currentCustomer.balance || 0).toFixed(2)}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Header className="bg-light">
              <h5 className="mb-0">Billing Address</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                {Object.entries(currentCustomer.billing).map(([key, value], i) => (
                  <Col md={6} key={i}>
                    <p className="mb-2">
                      <strong className="text-capitalize">{key}:</strong> {value || "-"}
                    </p>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header className="bg-light">
              <h5 className="mb-0">Shipping Address</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                {Object.entries(currentCustomer.shipping).map(([key, value], i) => (
                  <Col md={6} key={i}>
                    <p className="mb-2">
                      <strong className="text-capitalize">{key}:</strong> {value || "-"}
                    </p>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showConfirmDelete} onHide={() => setShowConfirmDelete(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this customer?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmDelete(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomerTable;


// // 🚀 Updated React component with Add, Edit, View, Delete (with confirmation)
// import React, { useState } from "react";
// import {
//   Table,
//   Button,
//   Modal,
//   Form,
//   Card,
//   Row,
//   Col,
// } from "react-bootstrap";
// import { FaTrash, FaEye, FaPlus, FaEdit } from "react-icons/fa";

// const emptyCustomer = {
//   name: "",
//   contact: "",
//   email: "",
//   taxNumber: "",
//   altMobile: "",
//   balance: "",
//   taxEnabled: false,
//   billing: {
//     name: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     country: "",
//     zip: "",
//   },
//   shipping: {
//     name: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     country: "",
//     zip: "",
//   },
// };

// const CustomerTable = () => {
//   const [customersList, setCustomersList] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [viewMode, setViewMode] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [currentCustomer, setCurrentCustomer] = useState(emptyCustomer);
//   const [currentIndex, setCurrentIndex] = useState(null);
//   const [showConfirmDelete, setShowConfirmDelete] = useState(false);
//   const [deleteIndex, setDeleteIndex] = useState(null);

//   const handleOpenModal = (mode, customer = emptyCustomer, index = null) => {
//     setViewMode(mode === "view");
//     setEditMode(mode === "edit");
//     setCurrentCustomer({ ...customer });
//     setCurrentIndex(index);
//     setShowModal(true);
//   };

//   const handleSave = () => {
//     if (editMode && currentIndex !== null) {
//       const updatedList = [...customersList];
//       updatedList[currentIndex] = currentCustomer;
//       setCustomersList(updatedList);
//     } else {
//       setCustomersList([...customersList, { ...currentCustomer, id: customersList.length + 1 }]);
//     }
//     setShowModal(false);
//     resetModal();
//   };

//   const handleDelete = () => {
//     const updated = customersList.filter((_, idx) => idx !== deleteIndex);
//     setCustomersList(updated);
//     setShowConfirmDelete(false);
//   };

//   const resetModal = () => {
//     setCurrentCustomer(emptyCustomer);
//     setViewMode(false);
//     setEditMode(false);
//     setCurrentIndex(null);
//   };

//   const updateField = (path, value) => {
//     const keys = path.split(".");
//     const updated = { ...currentCustomer };
//     let obj = updated;
//     while (keys.length > 1) obj = obj[keys.shift()];
//     obj[keys[0]] = value;
//     setCurrentCustomer(updated);
//   };

//   return (
//     <div className="p-4 mt-2">
//       <Card className="rounded-3 p-3">
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h6 className="fw-semibold mb-0">Customer Table</h6>
//           <Button variant="info" size="sm" onClick={() => handleOpenModal("add")}> <FaPlus className="me-1" /> Add Customer </Button>
//         </div>

//         <Table bordered hover responsive>
//           <thead className="table-light">
//             <tr>
//               <th>No</th>
//               <th>Name</th>
//               <th>Contact</th>
//               <th>Email</th>
//               <th>Balance</th>
//               <th>Tax</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {customersList.map((cust, idx) => (
//               <tr key={idx}>
//                 <td>{idx + 1}</td>
//                 <td>{cust.name}</td>
//                 <td>{cust.contact}</td>
//                 <td>{cust.email}</td>
//                 <td>${parseFloat(cust.balance || 0).toFixed(2)}</td>
//                 <td>{cust.taxEnabled ? "ON" : "OFF"}</td>
//                 <td>
//                   <div className="d-flex gap-2 justify-content-center">
//                     <Button variant="outline-info" size="sm" onClick={() => handleOpenModal("view", cust, idx)}><FaEye /></Button>
//                     <Button variant="outline-warning" size="sm" onClick={() => handleOpenModal("edit", cust, idx)}><FaEdit /></Button>
//                     <Button variant="outline-danger" size="sm" onClick={() => { setDeleteIndex(idx); setShowConfirmDelete(true); }}><FaTrash /></Button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </Card>

//       {/* Add/Edit/View Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
//         <Modal.Header closeButton>
//           <Modal.Title>{viewMode ? "Customer Details" : editMode ? "Edit Customer" : "Add Customer"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Row>
//               <Col md={6}><Form.Group className="mb-2"><Form.Label>Name *</Form.Label><Form.Control type="text" value={currentCustomer.name} onChange={(e) => updateField("name", e.target.value)} disabled={viewMode} /></Form.Group></Col>
//               <Col md={6}><Form.Group className="mb-2"><Form.Label>Contact *</Form.Label><Form.Control type="text" value={currentCustomer.contact} onChange={(e) => updateField("contact", e.target.value)} disabled={viewMode} /></Form.Group></Col>
//               <Col md={6}><Form.Group className="mb-2"><Form.Label>Email *</Form.Label><Form.Control type="email" value={currentCustomer.email} onChange={(e) => updateField("email", e.target.value)} disabled={viewMode} /></Form.Group></Col>
//               <Col md={6}><Form.Group className="mb-2"><Form.Label>Alternate Mobile</Form.Label><Form.Control type="text" value={currentCustomer.altMobile} onChange={(e) => updateField("altMobile", e.target.value)} disabled={viewMode} /></Form.Group></Col>
//               <Col md={6}><Form.Group className="mb-2"><Form.Label>Tax Number</Form.Label><Form.Control type="text" value={currentCustomer.taxNumber} onChange={(e) => updateField("taxNumber", e.target.value)} disabled={viewMode} /></Form.Group></Col>
//               <Col md={6}><Form.Group className="mb-2"><Form.Label>Tax Enabled</Form.Label><Form.Check type="switch" checked={currentCustomer.taxEnabled} onChange={(e) => updateField("taxEnabled", e.target.checked)} disabled={viewMode} /></Form.Group></Col>
//               <Col md={6}><Form.Group className="mb-2"><Form.Label>Balance</Form.Label><Form.Control type="number" value={currentCustomer.balance} onChange={(e) => updateField("balance", e.target.value)} disabled={viewMode} /></Form.Group></Col>
//             </Row>
//             <hr />
//             <h6>Billing Address</h6>
//             <Row>
//               {Object.entries(currentCustomer.billing).map(([key, value], i) => (
//                 <Col md={6} key={i}><Form.Group className="mb-2"><Form.Label className="text-capitalize">{key}</Form.Label><Form.Control type="text" value={value} onChange={(e) => updateField(`billing.${key}`, e.target.value)} disabled={viewMode} /></Form.Group></Col>
//               ))}
//             </Row>
//             <hr />
//             <h6>Shipping Address</h6>
//             <Row>
//               {Object.entries(currentCustomer.shipping).map(([key, value], i) => (
//                 <Col md={6} key={i}><Form.Group className="mb-2"><Form.Label className="text-capitalize">{key}</Form.Label><Form.Control type="text" value={value} onChange={(e) => updateField(`shipping.${key}`, e.target.value)} disabled={viewMode} /></Form.Group></Col>
//               ))}
//             </Row>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
//           {!viewMode && <Button variant="primary" onClick={handleSave}>{editMode ? "Update" : "Save"}</Button>}
//         </Modal.Footer>
//       </Modal>

//       {/* Delete Confirmation Modal */}
//       <Modal show={showConfirmDelete} onHide={() => setShowConfirmDelete(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Delete</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Are you sure you want to delete this customer?</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowConfirmDelete(false)}>Cancel</Button>
//           <Button variant="danger" onClick={handleDelete}>Delete</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default CustomerTable;
