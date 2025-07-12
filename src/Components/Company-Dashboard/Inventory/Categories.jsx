import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [editCategoryId, setEditCategoryId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const dummyData = [
      { _id: "1", category_name: "Electronics", p_image: "" },
      { _id: "2", category_name: "Clothing", p_image: "" },
      { _id: "3", category_name: "Books", p_image: "" },
      { _id: "4", category_name: "Groceries", p_image: "" },
      { _id: "5", category_name: "Shoes", p_image: "" },
      { _id: "6", category_name: "Toys", p_image: "" },
    ];
    setCategories(dummyData);
  }, []);

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
      reader.onloadend = () => setImage(reader.result);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newCategory = {
      _id: editCategoryId || Date.now().toString(),
      category_name: categoryName,
      p_image: image || "",
    };

    if (editCategoryId) {
      setCategories(categories.map((cat) => (cat._id === editCategoryId ? newCategory : cat)));
    } else {
      setCategories([...categories, newCategory]);
    }

    handleModalClose();
  };

  const handleDeleteCategory = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (confirmDelete) {
      setCategories(categories.filter((cat) => cat._id !== id));
      alert("Category deleted successfully.");
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const currentItems = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="mx-md-5 mt-5 mx-3">
      <div className="shadow p-4">
        <div className="d-flex justify-content-between">
          <h4 className="fw-semibold">Manage Categories</h4>
          <Button className="set_btn text-white fw-semibold" onClick={() => handleModalShow()}>
            <i className="fa fa-plus me-2"></i> Create Category
          </Button>
        </div>

        <div className="table-responsive mt-3">
          <Table bordered striped hover  >
            <thead className=" table-light">
              <tr>
                <th className="px-3 py-3">#</th>
                <th>Category Name</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((cat, index) => (
                  <tr key={cat._id}>
                    <td className="px-3 py-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>{cat.category_name}</td>
                    <td>
                      {cat.p_image ? (
                        <img src={cat.p_image} alt="Category" width="80" height="50" />
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>
                      <Button variant="warning" size="sm" className="me-2" onClick={() => handleModalShow(cat)}>
                        <FaEdit />
                      </Button>
                      <Button variant="danger  " size="sm" onClick={() => handleDeleteCategory(cat._id)}>
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4" className="text-center">No categories found</td></tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-center gap-2 mt-4">
          <Button
            variant="secondary"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </Button>
          <span className="align-self-center">Page {currentPage} of {totalPages}</span>
          <Button
            variant="secondary"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editCategoryId ? "Edit Category" : "Create Category"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group>
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
            </Form.Group>

            {image && (
              <div className="text-center mt-3">
                <img src={image} alt="Preview" style={{ width: "100%", maxHeight: "150px" }} />
              </div>
            )}

            <div className="d-flex justify-content-end mt-3">
              <Button variant="secondary" onClick={handleModalClose}>Close</Button>
              <Button variant="primary" type="submit" className="ms-2">
                {editCategoryId ? "Update" : "Create"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Categories;
