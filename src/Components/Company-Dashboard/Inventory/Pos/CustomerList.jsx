import { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import AddCustomer from "../Customer/AddCustomer";
import { getCustomers } from "../../../../redux/slices/customerSlice";

const CustomerList = ({ onSelectCustomer, selectedShop }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { customers } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch, selectedShop]);



  // Handle selecting a customer
  const handleSelectCustomer = (customer) => {
    onSelectCustomer(customer);
    setIsDropdownOpen(false);
  };

  // Handle adding a new customer
  const handleAddCustomer = () => {
    setIsModalOpen(false);
    dispatch(getCustomers());
  };

  // Handle input blur to close dropdown
  const handleBlur = () => {
    // Delay hiding dropdown to allow for selection click
    setTimeout(() => setIsDropdownOpen(false), 150);
  };

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
          onBlur={handleBlur} // Close dropdown when input loses focus
        />
        <span
          className="input-group-text btn bg-[#1d1b31] text-white"
          style={{ backgroundColor: "#1d1b31", cursor: "pointer" }}
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
          {customers.length > 0 ? (
            customers.map((customer) => (
              <li
                key={customer.id}
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
      {/* Customer Form Modal */}
      {isModalOpen && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}>
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

export default CustomerList ;
