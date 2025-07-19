import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField, Modal, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchProducts,
} from "../../../redux/slices/productSlice";
import Swal from "sweetalert2";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";

const Productt = () => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const productList = Array.isArray(products?.data) ? products.data : [];

  const filteredProducts = productList.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearchChange = (e) => setSearch(e.target.value);

  const handleDeleteProduct = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await dispatch(deleteProduct(productId)).unwrap();
          if (response) {
            Swal.fire("Deleted!", "Product has been deleted.", "success");
            dispatch(fetchProducts());
          }
        } catch (error) {
          console.error("Delete Error:", error);
          Swal.fire("Error!", error || "Failed to delete product.", "error");
        }
      }
    });
  };

  const handleViewClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const columns = [
    {
      field: "images",
      headerName: "Image",
      width: 150,
      renderCell: (params) => {
        const images = params.row.images || [];
        const image1 =
          images.length > 0 ? images[0] : "https://via.placeholder.com/80";
        return (
          <img
            src={image1}
            alt={params.row.name}
            style={{
              width: 60,
              height: 30,
              objectFit: "cover",
              cursor: "pointer",
            }}
          />
        );
      },
    },
    { field: "sku", headerName: "SKU Id", width: 150 },
    { field: "name", headerName: "Service Name", width: 150 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 130 },
    { field: "IMEI", headerName: "IMEI No", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "6px" }}>
        <Button
          variant="outlined"
          color="success"
          size="small"
          onClick={() => handleViewClick(params.row)}
          title="View Product"
        >
          <FaEye size={12} />
        </Button>
      
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => handleDeleteProduct(params.row._id)}
          title="Delete Product"
        >
          <FaTrash size={12} />
        </Button>
      
        <Link to={`/company/update-product/${params.row._id}`}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            title="Edit Product"
          >
            <FaPen size={14} />
          </Button>
        </Link>
      </div>
      
      ),
    },
  ];

  return (
    <div className="mx-3 mx-md-5 my-5 card p-3">
      <div className="align-items-center mb-2">
        <div className="row d-flex justify-content-between mt-2 mb-2">
          <div className="col-md-9 mb-2">
            <h3>Product List</h3>
          </div>
          <div className="col-md-3 mb-2 text-md-end">
            <Link to="/company/createproduct" title="Add New Product">
              <button className="set_btn text-black rounded px-4 py-2 fw-semibold w-100">
                + Create New Product
              </button>
            </Link>
          </div>
        </div>

        <TextField
          label="Search Service"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          style={{ marginBottom: "20px", width: "100%" }}
        />

        <div style={{ padding: "5px", width: "100%" }}>
          <DataGrid
            rows={filteredProducts.map((product) => ({
              ...product,
              id: product._id,
            }))}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[20, 25, 30, 35]}
            loading={loading}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      </div>

      {/* View Modal */}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="view-product-title"
        aria-describedby="view-product-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          {selectedProduct && (
            <>
              <Typography id="view-product-title" variant="h6" component="h2">
                {selectedProduct.name}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <strong>SKU:</strong> {selectedProduct.sku}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                <strong>Category:</strong> {selectedProduct.category}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                <strong>Quantity:</strong> {selectedProduct.quantity}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                <strong>IMEI:</strong> {selectedProduct.IMEI}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                <strong>Description:</strong>{" "}
                {selectedProduct.description || "N/A"}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                <strong>Created:</strong>{" "}
                {new Date(selectedProduct.createdAt).toLocaleString()}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Productt;
