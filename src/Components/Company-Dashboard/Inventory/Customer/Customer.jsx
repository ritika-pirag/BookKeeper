import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Button, TextField } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { deleteCustomer, getCustomers } from "../../../../redux/slices/customerSlice";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

const Customer = () => {
  const dispatch = useDispatch();
  const { customers, loading } = useSelector((state) => state.customer);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  // ✅ Handle Delete Customer
  const handleDeleteCustomer = (id) => {
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
        dispatch(deleteCustomer(id)); // Delete the customer
        Swal.fire("Deleted!", "The customer has been deleted.", "success");
      }
    });
  };

  // ✅ Filter customers based on search query
  const filteredCustomers = customers.filter(
    (customer) =>
      customer?.first_name?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
      customer?.last_name?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
      customer?.email?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
      customer?.city?.toLowerCase()?.includes(searchQuery.toLowerCase())
  );

  const downloadPDF = () => {
    const doc = new jsPDF();
  
    doc.setFontSize(18);
    doc.text("Customer List", 14, 15);
  
    const tableColumn = [
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "Address",
      "Post Code",
      "City",
      "State",
      "Country",
    ];
  
    const tableRows = filteredCustomers.map((customer) => [
      customer.first_name || "",
      customer.last_name || "",
      customer.email || "",
      customer.phone || "",
      customer.address || "",
      customer.post_code || "",
      customer.city || "",
      customer.state || "",
      customer.country || "",
    ]);
  
    // ✅ Use autoTable correctly
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
  
    doc.save("customer-list.pdf");
  };
  

  // ✅ Define DataGrid Columns
  const columns = [
    { field: "first_name", headerName: "First Name", width: 150 },
    { field: "last_name", headerName: "Last Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "address", headerName: "Address", width: 200 },
    { field: "post_code", headerName: "Post Code", width: 120 },
    { field: "city", headerName: "City", width: 150 },
    { field: "state", headerName: "State", width: 150 },
    { field: "country", headerName: "Country", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleDeleteCustomer(params.row._id)}>
            <Delete color="error" />
          </IconButton>
          <Link to={`/UpdateCustomer/${params.row._id}`}>
            <IconButton>
              <Edit />
            </IconButton>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="mx-md-5 m-3 my-5">
      <div
        className="card p-4"
        style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 5px" }}
      >
        {/* ✅ Header Section */}
        <div className="row d-flex justify-content-between align-items-center">
          <div className="col-md-6 mb-2">
            <h3>Manage Customer</h3>
          </div>
          <div className="col-md-6 text-md-end mb-2">
            <Link to="/AddCustomer">
              <button className="btn set_btn text-white rounded px-4 py-2 fw-semibold">
                + Create Customer
              </button>
            </Link>
            <Button
              variant="contained"
              color="secondary"
              onClick={downloadPDF}
              className="ms-2">
              Download 
            </Button>
          </div>
        </div>

        {/* ✅ Search Bar */}
        <div className="my-2">
          <TextField
            label="Search by Name, Email, or City"
            variant="outlined"
            size="small"
            margin="dense"
            fullWidth
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* ✅ DataGrid Table */}
        <div className="custom-data-grid">
          <DataGrid
            rows={filteredCustomers.map((customer) => ({
              ...customer,
              id: customer._id,
            }))}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 25]}
            loading={loading}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      </div>
    </div>
  );
};

export default Customer;
