import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../../redux/slices/createCategory";
import { createBrand, fetchBrands, updateBrand } from "../../../../redux/slices/createBrand";

const BrandPage = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { brands } = useSelector((state) => state.brands);

  const [brandName, setBrandName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [editBrandId, setEditBrandId] = useState(null);

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!show) {
      // Reset form when modal closes
      setBrandName("");
      setCategoryId("");
      setEditBrandId(null);
    }
  }, [show]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!brandName || !categoryId) return;

    const brandData = {
      brand_name: brandName,
      categoryId,
    };

    if (editBrandId) {
      dispatch(updateBrand({ id: editBrandId, data: brandData }));
    } else {
      dispatch(createBrand(brandData));
    }

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editBrandId ? "Edit Brand" : "Create Brand"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="brandName">
            <Form.Label>Brand Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Brand Name"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="categorySelect" className="mt-3">
            <Form.Label>Select Category</Form.Label>
            <Form.Select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.category_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-end mt-3">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="ms-2">
              {editBrandId ? "Update" : "Create"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BrandPage;
