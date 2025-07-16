// Customer.jsx (Backend & Redux removed, UI-only version)

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Customers= () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Sample local data
  const sampleCustomers = [
    {
      _id: "1",
      first_name: "John",
      last_name: "Doe",
      email: "john@example.com",
      phone: "1234567890",
      address: "123 Main St",
      post_code: "12345",
      city: "New York",
      state: "NY",
      country: "USA",
    },
    {
      _id: "2",
      first_name: "Jane",
      last_name: "Smith",
      email: "jane@example.com",
      phone: "0987654321",
      address: "456 Broadway",
      post_code: "54321",
      city: "Los Angeles",
      state: "CA",
      country: "USA",
    },
  ];

  const [customers, setCustomers] = useState(sampleCustomers);

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
        setCustomers(customers.filter((c) => c._id !== id));
        Swal.fire("Deleted!", "The customer has been deleted.", "success");
      }
    });
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer?.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer?.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer?.city?.toLowerCase().includes(searchQuery.toLowerCase())
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
      customer.first_name,
      customer.last_name,
      customer.email,
      customer.phone,
      customer.address,
      customer.post_code,
      customer.city,
      customer.state,
      customer.country,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("customer-list.pdf");
  };

  return (
    <div className="mx-md-5 m-3 my-5">
      <div
        className="card p-4"
        style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 5px" }}
      >
        <div className="row d-flex justify-content-between align-items-center">
          <div className="col-md-6 mb-2">
            <h3>Manage Customer</h3>
          </div>
          <div className="col-md-6 text-md-end mb-2">
            <Link to="/AddCustomer">
              <button className="btn btn-dark text-white rounded px-4 py-2 fw-semibold">
                + Create Customer
              </button>
            </Link>
            <button className="btn btn-secondary ms-2" onClick={downloadPDF}>
              Download
            </button>
          </div>
        </div>

        <div className="my-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Name, Email, or City"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="table-responsive mt-3">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Post Code</th>
                <th>City</th>
                <th>State</th>
                <th>Country</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer._id}>
                  <td>{customer.first_name}</td>
                  <td>{customer.last_name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.address}</td>
                  <td>{customer.post_code}</td>
                  <td>{customer.city}</td>
                  <td>{customer.state}</td>
                  <td>{customer.country}</td>
                  <td>
                    <IconButton
                      onClick={() => handleDeleteCustomer(customer._id)}
                    >
                      <Delete color="error" />
                    </IconButton>
                    <Link to={`/UpdateCustomer/${customer._id}`}>
                      <IconButton>
                        <Edit />
                      </IconButton>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;
