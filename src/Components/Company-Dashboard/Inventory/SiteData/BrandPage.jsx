import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { fetchCategories } from "../../../../redux/slices/createCategory";
import {
  createBrand,
  fetchBrands,
  deleteBrand,
  updateBrand,
} from "../../../../redux/slices/createBrand";
import { Pagination } from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
const BrandPage = () => {
  const dispatch = useDispatch();
  const { brands, loading } = useSelector((state) => state.brands);
  const { categories } = useSelector((state) => state.categories);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [brandsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [editBrandId, setEditBrandId] = useState(null);

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchCategories());
  }, [dispatch]);

  // Calculate current brands to show on the page
  const filteredBrands = brands.filter((brand) =>
    brand?.brand_name?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  const indexOfLastBrand = currentPage * brandsPerPage;
  const indexOfFirstBrand = indexOfLastBrand - brandsPerPage;
  const currentBrands = filteredBrands.slice(
    indexOfFirstBrand,
    indexOfLastBrand
  );

  const totalPages = Math.ceil(filteredBrands.length / brandsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setBrandName("");
    setCategoryId("");
    setEditBrandId(null);
  };

  const handleModalShow = (brand = null) => {
    if (brand) {
      setBrandName(brand.brand_name);
      setCategoryId(brand.category?._id);
      setEditBrandId(brand._id);
    }
    setShowModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!brandName || !categoryId) return;

    const brandData = {
      brand_name: brandName,
      categoryId: categoryId,
    };

    if (editBrandId) {
      dispatch(updateBrand({ id: editBrandId, data: brandData }));
    } else {
      dispatch(createBrand(brandData));
      dispatch(fetchBrands());
    }

    handleModalClose();
  };

  const handleDeleteBrand = (id) => {
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
        dispatch(deleteBrand(id));
        Swal.fire("Deleted!", "Brand has been deleted.", "success");
      }
    });
  };

  return (
    <div>
      <div className="mx-md-5 mt-5 mx-3">
        <div className="shadow p-4">
          <div className="row align-items-center justify-content-between mb-3">
            <div className="col-md-6 col-12">
              <h3 className="fw-semibold mb-2 mb-md-0">Manage Brands</h3>
            </div>

            <div className="col-md-4 col-12 mt-2 mt-md-0">
              <input
                type="text"
                className="form-control"
                placeholder="Search brand by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="col-md-2 col-12 mt-3 mt-md-0 text-md-end">
              <button
                type="button"
                className="btn set_btn text-black rounded px-4 py-2 fw-semibold w-100  outline-light"
                onClick={() => handleModalShow()}
              >
                <i className="fa-solid fa-plus me-2" />
                Create Brand
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Brand Name</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="text-center">
                      Loading...
                    </td>
                  </tr>
                ) : currentBrands.length > 0 ? (
                  currentBrands?.map((brand, index) => (
                    <tr key={brand._id}>
                      <td>{index + 1 + (currentPage - 1) * brandsPerPage}</td>
                      <td>{brand?.brand_name}</td>
                      <td>{brand.category?.category_name}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleModalShow(brand)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteBrand(brand._id)}
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No brands found.
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

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editBrandId ? "Edit Brand" : "Create New Brand"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
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
                  <option key={category?._id} value={category?._id}>
                    {category?.category_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              {editBrandId ? "Update Brand" : "Submit"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BrandPage;
