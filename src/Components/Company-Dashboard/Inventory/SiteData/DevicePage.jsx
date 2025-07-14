import { useEffect, useState } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { fetchCategories } from "../../../../redux/slices/createCategory";
import {
  createDevice,
  deleteDevice,
  fetchDevices,
  updateDevice,
} from "../../../../redux/slices/deviceSlice";
import { fetchBrands } from "../../../../redux/slices/createBrand";
import { Pagination } from "@mui/material"; // Import MUI Pagination component
import { FaEdit, FaTrash } from "react-icons/fa";
const DevicePage = () => {
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.brands);
  const { categories } = useSelector((state) => state.categories);
  const { devices } = useSelector((state) => state.devices);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [devicesPerPage] = useState(10); // Number of devices to show per page
  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [deviceId, setDeviceId] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [deviceName, setDeviceName] = useState("");

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchCategories());
    dispatch(fetchDevices());
  }, [dispatch]);

  // Pagination Logic: Get current devices based on page
  const filteredDevices = devices.filter((device) =>
    device?.device_name?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  const indexOfLastDevice = currentPage * devicesPerPage;
  const indexOfFirstDevice = indexOfLastDevice - devicesPerPage;
  const currentDevices = filteredDevices.slice(
    indexOfFirstDevice,
    indexOfLastDevice
  );

  const totalPages = Math.ceil(filteredDevices.length / devicesPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditMode(false);
    setDeviceId(null);
    setCategoryId("");
    setBrandId("");
    setDeviceName("");
  };

  const handleModalShow = () => setShowModal(true);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!deviceName || !brandId || !categoryId) {
      Swal.fire("Error", "All fields are required!", "error");
      return;
    }
    const deviceData = {
      device_name: deviceName,
      brandId,
      categoryId,
    };

    if (editMode) {
      dispatch(updateDevice({ deviceId, updatedData: deviceData }))
        .unwrap()
        .then(() => {
          Swal.fire("Success", "Device updated successfully!", "success");
          dispatch(fetchDevices());
          handleModalClose();
        })
        .catch((error) => {
          Swal.fire("Error", error.message || "Something went wrong", "error");
        });
    } else {
      dispatch(createDevice(deviceData))
        .unwrap()
        .then(() => {
          Swal.fire("Success", "Device created successfully!", "success");
          dispatch(fetchDevices());
          handleModalClose();
        })
        .catch((error) => {
          Swal.fire("Error", error.message || "Something went wrong", "error");
        });
    }
  };

  const handleEditDevice = (device) => {
    setDeviceId(device._id); // ✅ Ensure ID is set
    setDeviceName(device.device_name);
    setBrandId(device.brand?._id);
    setCategoryId(device.category?._id);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDeleteDevice = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteDevice(id));
        Swal.fire("Deleted!", "Device has been deleted.", "success");
      }
    });
  };

  return (
    <div>
      <div className="mx-md-5 mt-5 mx-3">
        <div className="shadow p-4">
          <div className="row align-items-center justify-content-between mb-3">
            <div className="col-md-6 col-12">
              <h3 className="fw-semibold mb-2 mb-md-0">Manage Device</h3>
            </div>

            <div className="col-md-4 col-12 mt-2 mt-md-0">
              <input
                type="text"
                className="form-control"
                placeholder="Search device by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="col-md-2 col-12 mt-3 mt-md-0 text-md-end">
              <button
                className="btn set_btn text-white rounded px-4 py-2 fw-semibold w-100"
                onClick={handleModalShow}
              >
                <i className="fa-solid fa-plus me-2" />
                Create Device
              </button>
            </div>
          </div>
          <div className="table-responsive">
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Category Name</th>
                  <th>Brand Name</th>
                  <th>Device Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {devices.length > 0 ? (
                  currentDevices.map((device, index) => (
                    <tr key={device._id}>
                      <td>{index + 1 + (currentPage - 1) * devicesPerPage}</td>
                      <td>{device.category?.category_name || "N/A"}</td>
                      <td>{device.brand?.brand_name || "N/A"}</td>
                      <td>{device?.device_name}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEditDevice(device)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteDevice(device._id)}
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No devices found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          {/* Pagination Component */}
          <div className="d-flex justify-content-center mt-4">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        </div>
      </div>

      {/* Modal for Adding/Editing Device */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editMode ? "Edit Device" : "Create New Device"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mt-3">
              <Form.Label>Select Category</Form.Label>
              <Form.Select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {categories?.map((category) => (
                  <option key={category?._id} value={category?._id}>
                    {category?.category_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Select Brand</Form.Label>
              <Form.Select
                value={brandId}
                onChange={(e) => setBrandId(e.target.value)}
                required
                disabled={!categoryId}
              >
                <option value="">Select Brand</option>
                {brands
                  .filter((brand) => brand?.category?._id === categoryId)
                  .map((brand) => (
                    <option key={brand?._id} value={brand?._id}>
                      {brand?.brand_name}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Device Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Device Name"
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              {editMode ? "Update" : "Submit"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DevicePage;
