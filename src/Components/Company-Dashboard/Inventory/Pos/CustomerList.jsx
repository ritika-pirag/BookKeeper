import { useState, useEffect } from "react";
import AddCustomer from "../Customer/AddCustomer";

// ✅ Updated: Using _id instead of id
const sampleCustomers = [
  { _id: 1, first_name: "John", last_name: "Doe" },
  { _id: 2, first_name: "Jane", last_name: "Smith" },
  { _id: 3, first_name: "Amit", last_name: "Sharma" },
];

const CustomerList = ({ onSelectCustomer }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Simulate API call
    setCustomers(sampleCustomers);
  }, []);

  const handleSelectCustomer = (customer) => {
    onSelectCustomer(customer);
    setIsDropdownOpen(false);
  };

  const handleAddCustomer = (newCustomer) => {
    setCustomers((prev) => [...prev, newCustomer]);
    setIsModalOpen(false);
  };

  const handleBlur = () => {
    setTimeout(() => setIsDropdownOpen(false), 150);
  };

  const filteredCustomers = customers.filter((customer) =>
    `${customer.first_name} ${customer.last_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="customer-search-container position-relative mx-3 my-3">
      <div className="input-group mt-4">
        <span className="input-group-text">Customer</span>
        <input
          type="text"
          className="form-control"
          placeholder="Search customer"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsDropdownOpen(true);
          }}
          onFocus={() => setIsDropdownOpen(true)}
          onBlur={handleBlur}
        />
        <span
          className="input-group-text btn bg-dark text-white"
          style={{ cursor: "pointer" }}
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <i className="fa fa-plus"></i>
        </span>
      </div>

      {isDropdownOpen && (
        <ul
          className="list-group position-absolute bg-white border shadow-sm"
          style={{
            maxHeight: "200px",
            overflowY: "auto",
            width: "100%",
            zIndex: 1000,
          }}
        >
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer) => (
              <li
                key={customer._id} // ✅ Updated key here
                className="list-group-item"
                onClick={() => handleSelectCustomer(customer)}
                style={{ cursor: "pointer" }}
              >
                {customer.first_name} {customer.last_name}
              </li>
            ))
          ) : (
            <li className="list-group-item text-muted">No customers found</li>
          )}
        </ul>
      )}

      {isModalOpen && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div
            className="modal-dialog modal-lg"
            style={{ maxWidth: "850px", marginLeft: "auto" }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <button
                  className="btn-close"
                  onClick={() => setIsModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <AddCustomer
                  onClose={() => setIsModalOpen(false)}
                  onAdd={handleAddCustomer}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerList;
