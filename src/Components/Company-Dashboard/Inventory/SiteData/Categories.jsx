import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { createCategory, fetchCategories, deleteCategory, updateCategory } from "../../../../redux/slices/createCategory";
import { Pagination } from '@mui/material'; // Importing MUI Pagination
import { FaEdit, FaTrash } from "react-icons/fa";
const Categories = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.categories);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(10); // Number of categories to show per page

  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [editCategoryId, setEditCategoryId] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Pagination Logic: Get current categories based on page
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

  const totalPages = Math.ceil(categories.length / categoriesPerPage); // Total pages calculation

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCategoryName("");
    setImage(null);
    setEditCategoryId(null);
  };

  const handleModalShow = (category = null) => {
    if (category) {
      setEditCategoryId(category._id);
      setCategoryName(category.category_name);
      setImage(category.p_image);
    }
    setShowModal(true);
  };

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!categoryName) return;

    const categoryData = {
      category_name: categoryName,
      p_image: image || categories.find(cat => cat._id === editCategoryId)?.p_image,
    };

    if (editCategoryId) {
      dispatch(updateCategory({ categoryId: editCategoryId, updatedData: categoryData }));
      dispatch(fetchCategories());
    } else {
      dispatch(createCategory(categoryData));
    }

    handleModalClose();
  };

  const handleDeleteCategory = (id) => {
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
        dispatch(deleteCategory(id));
        Swal.fire("Deleted!", "Category has been deleted.", "success");
      }
    });
  };

  return (
    <div>
      <div className="mx-md-5 mt-5 mx-3">
        <div className="shadow p-4">
          <div className="row d-flex justify-content-between">
            <div className="col-md-9">
              <h3 className="mb-md-4 mb-2 fw-semibold">Manage Categories</h3>
            </div>
            <div className="col-md-3 text-md-end">
              <button
                type="button"
                className="btn set_btn text-black rounded px-4 py-2 fw-semibold mt-4"
                onClick={() => handleModalShow()}
              >
                <i className="fa-solid fa-plus" /> Create Category
              </button>
            </div>
          </div>
<div className="table-responsive">
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Category Name</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" className="text-center">Loading...</td></tr>
              ) : currentCategories.length > 0 ? (
                currentCategories.map((category, index) => (
                  <tr key={category._id}>
                    <td>{index + 1 + (currentPage - 1) * categoriesPerPage}</td>
                    <td>{category.category_name}</td>
                    <td>
                      <img
                        src={category.p_image}
                        alt={category.category_name}
                        style={{ width: "80px", height: "50px", objectFit: "cover" }}
                      />
                    </td>
                    <td>
                   <Button variant="warning" size="sm" className="me-2" onClick={() => handleModalShow(category)}>
  <FaEdit />
</Button>

<Button variant="danger" size="sm" onClick={() => handleDeleteCategory(category._id)}>
  <FaTrash />
</Button>

                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4" className="text-center">No categories found.</td></tr>
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

      {/* Create / Edit Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editCategoryId ? "Edit Category" : "Create Category"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
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
              <Button variant="secondary" onClick={handleModalClose}>Close</Button>
              <Button variant="primary" type="submit" className="ms-2">
                {editCategoryId ? "Update Category" : "Create Category"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Categories;
