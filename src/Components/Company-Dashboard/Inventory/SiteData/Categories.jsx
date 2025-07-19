import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, fetchCategories, updateCategory } from "../../../../redux/slices/createCategory";

const Categories = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [editCategoryId, setEditCategoryId] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    // Reset fields when modal opens
    if (!show) {
      setCategoryName("");
      setImage(null);
      setEditCategoryId(null);
    }
  }, [show]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryName) return;

    const categoryData = {
      category_name: categoryName,
      p_image: image || categories.find(cat => cat._id === editCategoryId)?.p_image,
    };

    if (editCategoryId) {
      dispatch(updateCategory({ categoryId: editCategoryId, updatedData: categoryData }));
    } else {
      dispatch(createCategory(categoryData));
    }

    handleClose(); // Close after submit
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editCategoryId ? "Edit Category" : "Add Category"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="categoryName">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="image" className="mt-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
          </Form.Group>

          {image && (
            <div className="mt-3 text-center">
              <img src={image} alt="Preview" style={{ maxWidth: "100%", maxHeight: "150px", objectFit: "cover" }} />
            </div>
          )}

          <div className="d-flex justify-content-end mt-3">
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button variant="primary" type="submit" className="ms-2">
              {editCategoryId ? "Update" : "Create"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Categories;
