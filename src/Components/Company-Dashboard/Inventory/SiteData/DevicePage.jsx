import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../../redux/slices/createCategory";
import { fetchBrands } from "../../../../redux/slices/createBrand";
import { createDevice, updateDevice, fetchDevices } from "../../../../redux/slices/deviceSlice";
import Swal from "sweetalert2";

const DevicePage = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.brands);
  const { categories } = useSelector((state) => state.categories);

  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [deviceId, setDeviceId] = useState(null);

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!show) {
      resetForm();
    }
  }, [show]);

  const resetForm = () => {
    setCategoryId("");
    setBrandId("");
    setDeviceName("");
    setEditMode(false);
    setDeviceId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryId || !brandId || !deviceName) {
      Swal.fire("Error", "All fields are required!", "error");
      return;
    }

    const deviceData = {
      categoryId,
      brandId,
      device_name: deviceName,
    };

    try {
      if (editMode && deviceId) {
        await dispatch(updateDevice({ deviceId, updatedData: deviceData })).unwrap();
        Swal.fire("Success", "Device updated successfully!", "success");
      } else {
        await dispatch(createDevice(deviceData)).unwrap();
        Swal.fire("Success", "Device created successfully!", "success");
      }

      dispatch(fetchDevices());
      handleClose();
    } catch (error) {
      Swal.fire("Error", error?.message || "Something went wrong", "error");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editMode ? "Edit Device" : "Create Device"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mt-2">
            <Form.Label>Select Category</Form.Label>
            <Form.Select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.category_name}
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
                .filter((b) => b.category?._id === categoryId)
                .map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.brand_name}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Device Name</Form.Label>
            <Form.Control
              type="text"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              placeholder="Enter device name"
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end mt-4">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="ms-2">
              {editMode ? "Update" : "Create"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default DevicePage;
