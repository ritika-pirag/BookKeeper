import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

const WareHouse = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [warehouseName, setWarehouseName] = useState("");
  const [location, setLocation] = useState("");
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();


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
      <Modal show={showModal} onHide={handleModalClose} centered>
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
      </Modal>
    </div>
  );
};

export default WareHouse;
