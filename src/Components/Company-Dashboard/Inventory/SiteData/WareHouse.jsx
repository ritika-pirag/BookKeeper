// import React, { useEffect, useState } from "react";
// import { Table, Modal, Button, Form } from "react-bootstrap";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import * as XLSX from "xlsx";
// import { useNavigate } from "react-router-dom";

// const WareHouse = () => {
//   const [warehouses, setWarehouses] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [warehouseName, setWarehouseName] = useState("");
//   const [location, setLocation] = useState("");
//   const [editId, setEditId] = useState(null);
//   const navigate = useNavigate();


//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     const dummyData = [
//       { _id: "1", name: "Central Warehouse", location: "Delhi", totalStocks: 125 },
//       { _id: "2", name: "North Zone", location: "Noida", totalStocks: 200 },
//       { _id: "3", name: "South Depot", location: "Bangalore", totalStocks: 100 },
//       { _id: "4", name: "East Godown", location: "Kolkata", totalStocks: 350 },
//       { _id: "5", name: "West Hub", location: "Mumbai", totalStocks: 105 },
//       { _id: "6", name: "Spare Store", location: "Hyderabad", totalStocks: 10 },
//       { _id: "7", name: "Test Depot", location: "Pune", totalStocks: 600 },
//       { _id: "8", name: "Central Hub", location: "Lucknow", totalStocks: 90 },
//     ];
//     setWarehouses(dummyData);
//   }, []);

//   const handleModalClose = () => {
//     setShowModal(false);
//     setWarehouseName("");
//     setLocation("");
//     setEditId(null);
//   };

//   const handleModalShow = (data = null) => {
//     if (data) {
//       setEditId(data._id);
//       setWarehouseName(data.name);
//       setLocation(data.location);
//     }
//     setShowModal(true);
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     const newWarehouse = {
//       _id: editId || Date.now().toString(),
//       name: warehouseName,
//       location: location,
//     };

//     if (editId) {
//       setWarehouses(warehouses.map((w) => (w._id === editId ? newWarehouse : w)));
//     } else {
//       setWarehouses([...warehouses, newWarehouse]);
//     }

//     handleModalClose();
//   };

//   const handleDelete = (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this warehouse?");
//     if (confirmDelete) {
//       const updated = warehouses.filter((w) => w._id !== id);
//       console.log("Deleted ID:", id, "Updated List:", updated); // Debug
//       setWarehouses(updated);
//       alert("Warehouse deleted successfully.");
//     }
//   };

//   // Pagination logic
//   const totalPages = Math.ceil(warehouses.length / itemsPerPage);
//   const currentItems = warehouses.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );




//   const handleImport = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (evt) => {
//       const bstr = evt.target.result;
//       const workbook = XLSX.read(bstr, { type: "binary" });
//       const sheetName = workbook.SheetNames[0];
//       const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
//       const formatted = data.map((item, index) => ({
//         _id: Date.now().toString() + index,
//         name: item["Warehouse Name"] || "",
//         location: item["Location"] || "",
//       }));
//       setWarehouses(formatted);
//     };
//     reader.readAsBinaryString(file);
//   };

//   const handleExport = () => {
//     const exportData = warehouses.map(({ name, location }) => ({
//       "Warehouse Name": name,
//       Location: location,
//     }));
//     const ws = XLSX.utils.json_to_sheet(exportData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Warehouses");
//     XLSX.writeFile(wb, "warehouse-data.xlsx");
//   };

//   const handleDownloadTemplate = () => {
//     const template = [{ "Warehouse Name": "", Location: "" }];
//     const ws = XLSX.utils.json_to_sheet(template);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Template");
//     XLSX.writeFile(wb, "warehouse-template.xlsx");
//   };

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <div className="mx-md-5 mt-5 mx-3">
//       <div className="shadow p-4">
//         <div className="d-flex justify-content-between flex-wrap gap-2">
//           <h4 className="fw-semibold">Manage Warehouses</h4>
//           <div className="d-flex gap-2 flex-wrap">
//             <Button
//               className="rounded-pill text-white"
//               style={{ backgroundColor: "#28a745", borderColor: "#28a745" }}
//               onClick={() => document.getElementById("excelImport").click()}
//             >
//               <i className="fas fa-file-import me-2" /> Import
//             </Button>

//             <input
//               type="file"
//               id="excelImport"
//               accept=".xlsx, .xls"
//               style={{ display: "none" }}
//               onChange={handleImport}
//             />

//             <Button
//               className="rounded-pill text-white"
//               style={{ backgroundColor: "#fd7e14", borderColor: "#fd7e14" }}
//               onClick={handleExport}
//             >
//               <i className="fas fa-file-export me-2" /> Export
//             </Button>

//             <Button
//               className="rounded-pill text-white"
//               style={{ backgroundColor: "#ffc107", borderColor: "#ffc107" }}
//               onClick={handleDownloadTemplate}
//             >
//               <i className="fas fa-download me-2" /> Download
//             </Button>
//             <Button
//               className="set_btn text-white fw-semibold"
//               style={{ backgroundColor: '#3daaaa', borderColor: '#3daaaa' }}
//               onClick={() => handleModalShow()}
//             >
//               <i className="fa fa-plus me-2"></i> Create Warehouse
//             </Button>
//           </div>


//         </div>

//         <div className="table-responsive mt-3">
//           <Table bordered striped hover>
//             <thead className="table-light">
//               <tr>
//                 <th>#</th>
//                 <th>Warehouse Name</th>
//                 <th>Total Stocks</th>
//                 <th>Location</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentItems.length > 0 ? (
//                 currentItems.map((w, index) => (
//                   <tr key={w._id}>
//                     <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
//                     <td className="text-primary" style={{ cursor: 'pointer' }} onClick={() => navigate(`/company/warehouse/${w._id}`)}><u>{w.name}</u></td>
//                     <td>{w.totalStocks}</td>
//                     <td>{w.location}</td>
//                     <td>







//                       <Button variant="link" className="text-warning p-0 me-2" onClick={() => handleModalShow(w)}   ><FaEdit /></Button>
//                       <Button variant="link" className="text-danger p-0 me-2" onClick={() => handleDelete(w._id)}   ><FaTrash /></Button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr><td colSpan="4" className="text-center">No warehouses found</td></tr>
//               )}
//             </tbody>
//           </Table>
//         </div>

//         {/* Pagination */}
//         <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3 gap-2 px-2">
//           <span className="small text-muted">
//             Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
//             {Math.min(currentPage * itemsPerPage, warehouses.length)} of {warehouses.length} entries
//           </span>
//           <nav>
//             <ul className="pagination pagination-sm mb-0 flex-wrap">
//               <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
//                 <button
//                   className="page-link rounded-start"
//                   onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
//                 >
//                   &laquo;
//                 </button>
//               </li>
//               {Array.from({ length: totalPages }, (_, index) => (
//                 <li
//                   key={index + 1}
//                   className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
//                 >
//                   <button
//                     className="page-link"
//                     style={currentPage === index + 1 ? { backgroundColor: '#3daaaa', borderColor: '#3daaaa' } : {}}
//                     onClick={() => handlePageChange(index + 1)}
//                   >
//                     {index + 1}
//                   </button>
//                 </li>
//               ))}
//               <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
//                 <button
//                   className="page-link rounded-end"
//                   onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
//                 >
//                   &raquo;
//                 </button>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </div>

//       {/* Modal */}
//       <Modal show={showModal} onHide={handleModalClose} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>{editId ? "Edit Warehouse" : "Create Warehouse"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleFormSubmit}>
//             <Form.Group>
//               <Form.Label>Warehouse Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={warehouseName}
//                 onChange={(e) => setWarehouseName(e.target.value)}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mt-3">
//               <Form.Label>Location</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 required
//               />
//             </Form.Group>

//             <div className="d-flex justify-content-end mt-3">
//               <Button variant="secondary" onClick={handleModalClose}>Close</Button>
//               <Button variant="primary" type="submit" className="ms-2" style={{ backgroundColor: '#3daaaa', borderColor: '#3daaaa' }}>
//                 {editId ? "Update" : "Create"}
//               </Button>
//             </div>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default WareHouse;


import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Form, Row, Col } from "react-bootstrap";
import { FaArrowRight, FaBoxes, FaEdit, FaTrash } from "react-icons/fa";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";


const WareHouse = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [warehouseName, setWarehouseName] = useState("");
  const [location, setLocation] = useState("");
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();
  const [showAddStockModal, setShowAddStockModal] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const dummyData = [
      { _id: "1", name: "Central Warehouse", location: "Delhi", totalStocks: 125 },
      { _id: "2", name: "North Zone", location: "Noida", totalStocks: 200 },
      { _id: "3", name: "South Depot", location: "Bangalore", totalStocks: 100 },
      { _id: "4", name: "East Godown", location: "Kolkata", totalStocks: 350 },
      { _id: "5", name: "West Hub", location: "Mumbai", totalStocks: 105 },
      { _id: "6", name: "Spare Store", location: "Hyderabad", totalStocks: 10 },
      { _id: "7", name: "Test Depot", location: "Pune", totalStocks: 600 },
      { _id: "8", name: "Central Hub", location: "Lucknow", totalStocks: 90 },
    ];
    setWarehouses(dummyData);
  }, []);

  const handleModalClose = () => {
    setShowModal(false);
    setWarehouseName("");
    setLocation("");
    setEditId(null);
  };

  const handleModalShow = (data = null) => {
    if (data) {
      setEditId(data._id);
      setWarehouseName(data.name);
      setLocation(data.location);
    }
    setShowModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newWarehouse = {
      _id: editId || Date.now().toString(),
      name: warehouseName,
      location: location,
    };

    if (editId) {
      setWarehouses(warehouses.map((w) => (w._id === editId ? newWarehouse : w)));
    } else {
      setWarehouses([...warehouses, newWarehouse]);
    }

    handleModalClose();
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this warehouse?");
    if (confirmDelete) {
      const updated = warehouses.filter((w) => w._id !== id);
      console.log("Deleted ID:", id, "Updated List:", updated); // Debug
      setWarehouses(updated);
      alert("Warehouse deleted successfully.");
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(warehouses.length / itemsPerPage);
  const currentItems = warehouses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      const formatted = data.map((item, index) => ({
        _id: Date.now().toString() + index,
        name: item["Warehouse Name"] || "",
        location: item["Location"] || "",
      }));
      setWarehouses(formatted);
    };
    reader.readAsBinaryString(file);
  };

  const handleExport = () => {
    const exportData = warehouses.map(({ name, location }) => ({
      "Warehouse Name": name,
      Location: location,
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Warehouses");
    XLSX.writeFile(wb, "warehouse-data.xlsx");
  };

  const handleDownloadTemplate = () => {
    const template = [{ "Warehouse Name": "", Location: "" }];
    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.writeFile(wb, "warehouse-template.xlsx");
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };




  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

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
    itemCategory: "" // New field for item category
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setNewItem({ ...newItem, image: files[0] });
    } else {
      setNewItem({ ...newItem, [name]: value });
    }
  };
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
      cess: 0,
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
  const [selectedItem, setSelectedItem] = useState(null);


  const handleAddItem = () => {
    setItems([...items, newItem]);
    setShowAdd(false);
  };

  const handleUpdateItem = () => {
    const updated = items.map((i) => (i === selectedItem ? { ...newItem } : i));
    setItems(updated);
    setShowEdit(false);
  };

  const handleAddStockModal = (warehouse) => {
    setSelectedWarehouse(warehouse.name);
    // setShowAddStockModal(true);
    setShowAdd(true);
  };



  return (
    <div className="mx-md-5 mt-5 mx-3">
      <div className="shadow p-4">
        <div className="d-flex justify-content-between flex-wrap gap-2">
          <h4 className="fw-semibold">Manage Warehouses</h4>
          <div className="d-flex gap-2 flex-wrap">
            <Button
              className="rounded-pill text-white"
              style={{ backgroundColor: "#28a745", borderColor: "#28a745" }}
              onClick={() => document.getElementById("excelImport").click()}
            >
              <i className="fas fa-file-import me-2" /> Import
            </Button>

            <input
              type="file"
              id="excelImport"
              accept=".xlsx, .xls"
              style={{ display: "none" }}
              onChange={handleImport}
            />

            <Button
              className="rounded-pill text-white"
              style={{ backgroundColor: "#fd7e14", borderColor: "#fd7e14" }}
              onClick={handleExport}
            >
              <i className="fas fa-file-export me-2" /> Export
            </Button>

            <Button
              className="rounded-pill text-white"
              style={{ backgroundColor: "#ffc107", borderColor: "#ffc107" }}
              onClick={handleDownloadTemplate}
            >
              <i className="fas fa-download me-2" /> Download
            </Button>
            <Button
              className="set_btn text-white fw-semibold"
              style={{ backgroundColor: '#3daaaa', borderColor: '#3daaaa' }}
              onClick={() => handleModalShow()}
            >
              <i className="fa fa-plus me-2"></i> Create Warehouse
            </Button>
          </div>


        </div>

        <div className="table-responsive mt-3">
          <Table bordered striped hover>
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Warehouse Name</th>
                <th>Total Stocks</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((w, index) => (
                  <tr key={w._id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="text-primary" style={{ cursor: 'pointer' }} onClick={() => navigate(`/company/warehouse/${w._id}`)}><u>{w.name}</u></td>
                    <td>{w.totalStocks}</td>
                    <td>{w.location}</td>
                    <td>
                      <Button
                        variant="link"
                        className="text-success p-0 me-2"
                        onClick={() => handleAddStockModal(w)} // New handler
                        title="Add Stock"
                      >
                        <FaBoxes />
                      </Button>
                      <Button variant="link" className="text-warning p-0 me-2" onClick={() => handleModalShow(w)}   ><FaEdit /></Button>
                      <Button variant="link" className="text-danger p-0 me-2" onClick={() => handleDelete(w._id)}   ><FaTrash /></Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4" className="text-center">No warehouses found</td></tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3 gap-2 px-2">
          <span className="small text-muted">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, warehouses.length)} of {warehouses.length} entries
          </span>
          <nav>
            <ul className="pagination pagination-sm mb-0 flex-wrap">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link rounded-start"
                  onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                >
                  &laquo;
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    style={currentPage === index + 1 ? { backgroundColor: '#3daaaa', borderColor: '#3daaaa' } : {}}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button
                  className="page-link rounded-end"
                  onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                >
                  &raquo;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Modal */}
      {/* <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Edit Warehouse" : "Create Warehouse"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group>
              <Form.Label>Warehouse Name</Form.Label>
              <Form.Control
                type="text"
                value={warehouseName}
                onChange={(e) => setWarehouseName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end mt-3">
              <Button variant="secondary" onClick={handleModalClose}>Close</Button>
              <Button variant="primary" type="submit" className="ms-2" style={{ backgroundColor: '#3daaaa', borderColor: '#3daaaa' }}>
                {editId ? "Update" : "Create"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal> */}
      {/* <Offcanvas show={showModal} onHide={handleModalClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{editId ? "Edit Warehouse" : "Create Warehouse"}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group>
              <Form.Label>Warehouse Name</Form.Label>
              <Form.Control
                type="text"
                value={warehouseName}
                onChange={(e) => setWarehouseName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end mt-3">
              <Button style={{ backgroundColor: '#3E3F3FFF', borderColor: '#8E8E8EFF' }} onClick={handleModalClose}>Close</Button>
              <Button
                variant="primary"
                type="submit"
                className="ms-2"
                style={{ backgroundColor: "#3daaaa", borderColor: "#3daaaa" }}
              >
                {editId ? "Update" : "Create"}
              </Button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas> */}

      <Offcanvas show={showModal} onHide={handleModalClose} placement="end" className="position-absolute pt-5 px-4">
        <Offcanvas.Body>
          {/* Arrow Button — properly positioned */}
          <Button
            variant="light"
            onClick={handleModalClose}
            className="position-absolute"
            style={{
              top: "20px",
              left: "-12px", // slightly outside the drawer
              zIndex: 1051,
              borderRadius: "50%",
              padding: "6px 10px",
              boxShadow: "0 0 6px rgba(0,0,0,0.2)",
            }}
          >
            <FaArrowRight size={20} color="#3daaaa" />
          </Button>

          {/* Title */}
          <h5 className="mb-4">{editId ? "Edit Warehouse" : "Create Warehouse"}</h5>

          {/* Form */}
          <Form onSubmit={handleFormSubmit}>
            <Form.Group>
              <Form.Label>Warehouse Name</Form.Label>
              <Form.Control
                type="text"
                value={warehouseName}
                onChange={(e) => setWarehouseName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end mt-4">
              <Button
                style={{ backgroundColor: '#3E3F3F', borderColor: '#8E8E8E' }}
                onClick={handleModalClose}
              >
                Close
              </Button>
              <Button
                type="submit"
                className="ms-2"
                style={{ backgroundColor: "#3daaaa", borderColor: "#3daaaa" }}
              >
                {editId ? "Update" : "Create"}
              </Button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>


      <Offcanvas show={showAdd || showEdit} onHide={() => { setShowAdd(false); setShowEdit(false); }} style={{ width: '75%' }} placement="end" className="position-absolute pt-5 px-4">
        {/* <Offcanvas.Header closeButton>
          <Offcanvas.Title>{showAdd ? "Add Product" : "Edit Product"}</Offcanvas.Title>
        </Offcanvas.Header> */}
        <Offcanvas.Body>
          <Button
            variant="light"
            onClick={() => { setShowAdd(false); setShowEdit(false); }}
            className="position-absolute"
            style={{
              top: "20px",
              left: "-12px", // slightly outside the drawer
              zIndex: 1051,
              borderRadius: "50%",
              padding: "6px 10px",
              boxShadow: "0 0 6px rgba(0,0,0,0.2)",
            }}
          >
            <FaArrowRight size={20} color="#3daaaa" />
          </Button>
          <h5 className="mb-4">{showAdd ? "Add Product" : "Edit Product"}</h5>
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
                  {/* <Form.Select name="warehouse" value={newItem.warehouse} onChange={handleChange}> */}
                  <Form.Select name="warehouse" value={selectedWarehouse} onChange={(e) => setSelectedWarehouse(e.target.value)} >
                    <option value="">Select Warehouse</option>
                    <option value="Main Warehouse">Main Warehouse</option>
                    <option value="Central Warehouse">Central Warehouse</option>
                    <option value="North Zone">North Zone</option>
                    <option value="South Depot">South Depot</option>
                    <option value="East Godown">East Godown</option>
                    <option value="Backup Warehouse">Backup Warehouse</option>
                    <option value="West Hub">West Hub</option>
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
              <Col md={6}><Form.Group><Form.Label>As Of Date</Form.Label><Form.Control type="date" name="date" value={newItem.date} onChange={handleChange} /></Form.Group></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Group><Form.Label>Initial Cost/Unit</Form.Label><Form.Control name="cost" value={newItem.cost} onChange={handleChange} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Value</Form.Label><Form.Control name="value" value={newItem.value} onChange={handleChange} /></Form.Group></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Group><Form.Label>Minimum Order Quantity</Form.Label><Form.Control name="minQty" value={newItem.minQty} onChange={handleChange} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Item Image</Form.Label><Form.Control type="file" name="image" onChange={handleChange} /></Form.Group></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Group><Form.Label>Default Tax Account</Form.Label><Form.Control name="taxAccount" value={newItem.taxAccount} onChange={handleChange} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Additional Cess</Form.Label><Form.Control name="cess" value={newItem.cess} onChange={handleChange} /></Form.Group></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Group><Form.Label>Default Purchase Price (Exclusive)</Form.Label><Form.Control name="purchasePriceExclusive" value={newItem.purchasePriceExclusive} onChange={handleChange} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Default Purchase Price (Inclusive)</Form.Label><Form.Control name="purchasePriceInclusive" value={newItem.purchasePriceInclusive} onChange={handleChange} /></Form.Group></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Group><Form.Label>Default Sale Price (Exclusive)</Form.Label><Form.Control name="salePriceExclusive" value={newItem.salePriceExclusive} onChange={handleChange} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Default Sale Price (Inclusive)</Form.Label><Form.Control name="salePriceInclusive" value={newItem.salePriceInclusive} onChange={handleChange} /></Form.Group></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Group><Form.Label>Default Discount %</Form.Label><Form.Control name="discount" value={newItem.discount} onChange={handleChange} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Item Category</Form.Label><Form.Control name="category" value={newItem.category} onChange={handleChange} /></Form.Group></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Group><Form.Label>Item Subcategory</Form.Label><Form.Control name="subcategory" value={newItem.subcategory} onChange={handleChange} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Remarks</Form.Label><Form.Control name="remarks" value={newItem.remarks} onChange={handleChange} /></Form.Group></Col>
            </Row>
            <div className="mb-3 d-flex gap-2 justify-content-end">
              {/* <Button variant="secondary" onClick={() => { setShowAdd(false); setShowEdit(false); }}>Cancel</Button> */}
              <Button style={{ backgroundColor: '#3E3F3FFF', borderColor: '#8E8E8EFF' }} onClick={() => { setShowAdd(false); setShowEdit(false); }}>Cancel</Button>
              <Button style={{ backgroundColor: '#27b2b6', borderColor: '#27b2b6' }} onClick={showAdd ? handleAddItem : handleUpdateItem}>{showAdd ? "Add" : "Update"}</Button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Add/Edit Modal */}
      {/* <Modal show={showAdd || showEdit} onHide={() => { setShowAdd(false); setShowEdit(false); }} centered size="lg">
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
                  <Form.Select name="warehouse" value={selectedWarehouse} onChange={(e) => setSelectedWarehouse(e.target.value)}>
                    <option value="">Select Warehouse</option>
                    <option value="Main Warehouse">Main Warehouse</option>
                    <option value="Central Warehouse">Central Warehouse</option>
                    <option value="North Zone">North Zone</option>
                    <option value="South Depot">South Depot</option>
                    <option value="East Godown">East Godown</option>
                    <option value="Backup Warehouse">Backup Warehouse</option>
                    <option value="West Hub">West Hub</option>
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
              <Col md={6}><Form.Group><Form.Label>As Of Date</Form.Label><Form.Control type="date" name="date" value={newItem.date} onChange={handleChange} /></Form.Group></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Group><Form.Label>Initial Cost/Unit</Form.Label><Form.Control name="cost" value={newItem.cost} onChange={handleChange} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Value</Form.Label><Form.Control name="value" value={newItem.value} onChange={handleChange} /></Form.Group></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Group><Form.Label>Minimum Order Quantity</Form.Label><Form.Control name="minQty" value={newItem.minQty} onChange={handleChange} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Item Image</Form.Label><Form.Control type="file" name="image" onChange={handleChange} /></Form.Group></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Group><Form.Label>Default Tax Account</Form.Label><Form.Control name="taxAccount" value={newItem.taxAccount} onChange={handleChange} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Additional Cess</Form.Label><Form.Control name="cess" value={newItem.cess} onChange={handleChange} /></Form.Group></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Group><Form.Label>Default Purchase Price (Exclusive)</Form.Label><Form.Control name="purchasePriceExclusive" value={newItem.purchasePriceExclusive} onChange={handleChange} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Default Purchase Price (Inclusive)</Form.Label><Form.Control name="purchasePriceInclusive" value={newItem.purchasePriceInclusive} onChange={handleChange} /></Form.Group></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Group><Form.Label>Default Sale Price (Exclusive)</Form.Label><Form.Control name="salePriceExclusive" value={newItem.salePriceExclusive} onChange={handleChange} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Default Sale Price (Inclusive)</Form.Label><Form.Control name="salePriceInclusive" value={newItem.salePriceInclusive} onChange={handleChange} /></Form.Group></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Group><Form.Label>Default Discount %</Form.Label><Form.Control name="discount" value={newItem.discount} onChange={handleChange} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Item Category</Form.Label><Form.Control name="category" value={newItem.category} onChange={handleChange} /></Form.Group></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Group><Form.Label>Item Subcategory</Form.Label><Form.Control name="subcategory" value={newItem.subcategory} onChange={handleChange} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Remarks</Form.Label><Form.Control name="remarks" value={newItem.remarks} onChange={handleChange} /></Form.Group></Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { setShowAdd(false); setShowEdit(false); }}>Cancel</Button>
          <Button style={{ backgroundColor: '#27b2b6', borderColor: '#27b2b6' }} onClick={showAdd ? handleAddItem : handleUpdateItem}>{showAdd ? "Add" : "Update"}</Button>
        </Modal.Footer>
      </Modal> */}

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
          <Button variant="primary" onClick={handleAddCategory}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>


      {/* Page Description */}
      <small className="text-muted text-center w-100 mt-4">
        This page allows users to manage multiple warehouses by viewing, adding, editing, deleting, importing, and exporting warehouse details along with stock and location information.
      </small>
    </div>
  );

};

export default WareHouse;
