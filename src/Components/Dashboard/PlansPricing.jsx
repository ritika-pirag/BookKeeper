import React, { useState } from "react";
import { BsListUl, BsPencilSquare, BsEye, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PlansPricing.css";
import { BsTrash } from "react-icons/bs";
import Swal from "sweetalert2";

const initialPlans = [
  {
    name: "Bronze",
    price: "$9.99",
    billing: "Monthly",
    status: "Active",
    subscribers: "1,243",
    descriptions: ["Basic access", "Community support", "Limited features"],
  },
  {
    name: "Silver",
    price: "$14.99",
    billing: "Monthly",
    status: "Active",
    subscribers: "857",
    descriptions: ["Priority email support", "Extended features", "Access to updates"],
  },
  {
    name: "Gold",
    price: "$24.99",
    billing: "Monthly",
    status: "Active",
    subscribers: "512",
    descriptions: ["All Silver features", "Advanced analytics", "Custom branding"],
  },
  {
    name: "Platinum",
    price: "$49.99",
    billing: "Monthly",
    status: "Active",
    subscribers: "326",
    descriptions: ["All Gold features", "Dedicated account manager", "24/7 support"],
  },
];

const badgeStyles = {
  Bronze: {
    backgroundImage: "linear-gradient(to right, #ad7c59, #cd7f32, #a97142)",
    color: "#fff",
    boxShadow: "0 0 6px rgba(173, 124, 89, 0.5)",
  },
  Silver: {
    backgroundImage: "linear-gradient(to right, #c0c0c0, #d8d8d8, #b0b0b0)",
    color: "#000",
    boxShadow: "0 0 6px rgba(192, 192, 192, 0.6)",
  },
  Gold: {
    backgroundImage: "linear-gradient(to right, #f5d76e, #ffd700, #e6be8a)",
    color: "#000",
    boxShadow: "0 0 6px rgba(255, 215, 0, 0.5)",
  },
  Platinum: {
    backgroundImage: "linear-gradient(to right, #e5e4e2, #f9f9fb, #cfd8dc)",
    color: "#000",
    boxShadow: "0 0 6px rgba(180, 200, 220, 0.5)",
  },
};

const EditPlanModal = ({ show, handleClose, plan, handleSave }) => {
  // const [formData, setFormData] = useState(plan || {});
  const [formData, setFormData] = useState({ ...plan, descriptions: plan?.descriptions || [""] });


  
  React.useEffect(() => {
    setFormData(plan ? { ...plan, descriptions: plan.descriptions || [""] } : {});
  }, [plan]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSave = () => {
    handleSave(formData);


    
  };
  const handleDescriptionChange = (index, value) => {
    const updated = [...formData.descriptions];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, descriptions: updated }));
  };
  
  const addDescriptionField = () => {
    setFormData((prev) => ({
      ...prev,
      descriptions: [...(prev.descriptions || []), ""],
    }));
  };
  

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header style={{ backgroundColor: "#53b2a5", color: "#fff" }}>
        <Modal.Title>Edit Plan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Plan Name</Form.Label>
            <Form.Control name="name" value={formData.name || ""} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control name="price" value={formData.price || ""} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Billing Cycle</Form.Label>
            <Form.Select name="billing" value={formData.billing || ""} onChange={handleChange}>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </Form.Select>
          </Form.Group>
          
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleClose}>Close</Button>
        <Button style={{ backgroundColor: "#53b2a5", borderColor: "#53b2a5" }} onClick={onSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const ViewPlanModal = ({ show, handleClose, plan }) => {
  if (!plan) return null;
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header style={{ backgroundColor: "#53b2a5", color: "#fff" }}>
        <Modal.Title>View Plan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <p><strong>Plan Name:</strong> {plan.name}</p>
<p><strong>Price:</strong> {plan.price}</p>
<p><strong>Billing:</strong> {plan.billing}</p>
<p><strong>Status:</strong> {plan.status}</p>
<p><strong>Subscribers:</strong> {plan.subscribers}</p>

{plan.descriptions && plan.descriptions.length > 0 && (
  <div>
    <strong>Descriptions:</strong>
    <ul>
      {plan.descriptions.map((desc, i) => (
        <li key={i}>{desc}</li>
      ))}
    </ul>
  </div>
)}

        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

const AddPlanModal = ({ show, handleClose, handleAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    billing: "Monthly",
    status: "Active",
    subscribers: "0",
    descriptions: [""]
    

  });



  const handleDescriptionChange = (index, value) => {
    const updated = [...formData.descriptions];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, descriptions: updated }));
  };
  
  const addDescriptionField = () => {
    setFormData((prev) => ({ ...prev, descriptions: [...prev.descriptions, ""] }));
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onAdd = () => {
    handleAdd(formData);
    setFormData({ name: "", price: "", billing: "Monthly", status: "Active", subscribers: "0" });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header style={{ backgroundColor: "#53b2a5", color: "#fff" }}>
        <Modal.Title>Add New Plan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Plan Name</Form.Label>
            <Form.Control name="name" value={formData.name} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control name="price" value={formData.price} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Billing Cycle</Form.Label>
            <Form.Select name="billing" value={formData.billing} onChange={handleChange}>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select name="status" value={formData.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Deprecated">InActive</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
  <Form.Label>Descriptions</Form.Label>
  {formData.descriptions.map((desc, idx) => (
    <div key={idx} className="d-flex mb-2 gap-2 align-items-center">
      <Form.Control
        value={desc}
        onChange={(e) => handleDescriptionChange(idx, e.target.value)}
        placeholder={`Description ${idx + 1}`}
      />
      {idx === formData.descriptions.length - 1 && (
        <Button variant="outline-success" size="sm" onClick={addDescriptionField}>
          +
        </Button>
      )}
    </div>
  ))}
</Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleClose}>Close</Button>
        <Button style={{ backgroundColor: "#53b2a5", borderColor: "#53b2a5" }} onClick={onAdd}>
          Add Plan
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const PlanPricing = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [viewPlan, setViewPlan] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPlans = plans.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(plans.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleEditClick = (plan, index) => {
    setSelectedPlan({ ...plan, index });
    setShowModal(true);
  };
  const handleDeleteClick = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This plan will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedPlans = [...plans];
        updatedPlans.splice(index, 1);
        setPlans(updatedPlans);
        Swal.fire("Deleted!", "The plan has been deleted.", "success");
      }
    });
  };
  
  

  const handleModalClose = () => setShowModal(false);

  const handleSaveChanges = (updatedPlan) => {
    const newPlans = [...plans];
    newPlans[updatedPlan.index] = {
      ...newPlans[updatedPlan.index],
      name: updatedPlan.name,
      price: updatedPlan.price,
      billing: updatedPlan.billing,
    };
    setPlans(newPlans);
    setShowModal(false);
  };

  const handleViewClick = (plan) => {
    setViewPlan(plan);
    setViewModal(true);
  };

  const handleAddPlan = (newPlan) => {
    setPlans([newPlan, ...plans]);
    setShowAddModal(false);
    setCurrentPage(1); // Reset to first page when adding new plan
  };

  return (
    <div className="plans-page  p-4">
      <div className="header-section mb-4 d-flex justify-content-between align-items-center">
        <div>
          <h4 className="fw-bold d-flex align-items-center gap-2">
            <span role="img" aria-label="coin">💰</span> Plans & Pricing
          </h4>
          <p className="text-muted">
            Manage your subscription plans, pricing options.
          </p>
        </div>
        <Button variant="primary" onClick={() => setShowAddModal(true)} style={{ backgroundColor: "#53b2a5", borderColor: "#53b2a5" }}>
          + Add Plan
        </Button>
      </div>

  
      <div className="card">
        <div className="card-body">
          <h6 className="fw-semibold mb-3">View All Plans</h6>
          <div className="table-responsive">
            <table className="table table-hover plans-table">
              <thead className="table-light">
                <tr>
                  <th>Plan Name</th>
                  <th>Price</th>
                  <th>Billing Cycle</th>
                  <th>Status</th>
                  <th>Descriptions</th>
                  <th>Subscribers</th>
                 

                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPlans.map((plan, i) => (
                  <tr key={i}>
                    <td>
                 <span
  className="badge px-3 py-2 rounded-pill fw-semibold"
  style={{
    ...(badgeStyles[plan.name] || {
      backgroundColor: "#b2dfdb",
      color: "#000",
    }),
  }}
>
  {plan.name}
</span>

                    </td>
                    <td>{plan.price}</td>
                    <td>{plan.billing}</td>
                    <td>
                      <span className={`badge ${plan.status === "Deprecated" ? "bg-warning text-dark" : "bg-success"}`}>
                        {plan.status}
                      </span>
                    </td>

                    <td>
  {plan.descriptions && plan.descriptions.length > 0 ? (
    <ul className="mb-0 ps-3 small">
      {plan.descriptions.map((desc, idx) => (
        <li key={idx}>{desc}</li>
      ))}
    </ul>
  ) : (
    <span className="text-muted">—</span>
  )}
</td>

                    <td>{plan.subscribers}</td>
                    <td>



                      <div className="d-flex gap-2">
                        <button 
                          className="btn btn-sm text-warning p-0" 
                          onClick={() => handleEditClick(plan, indexOfFirstItem + i)}
                          title="Edit"
                        >
                          <BsPencilSquare size={18} />
                        </button>
                        <button
                          className="btn btn-sm text-info p-0"
                          onClick={() => handleViewClick(plan)}
                          title="View"
                        >
                          <BsEye size={18} />
                        </button>
                      
                        <button
  className="btn btn-sm text-danger p-0"
  onClick={() => handleDeleteClick(indexOfFirstItem + i)}
  title="Delete"
>
  <BsTrash size={18} />
</button>






                   
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            


          </div>
                  {/* Pagination */}
<div className="d-flex justify-content-between align-items-center px-2 py-2">
  <div className="text-muted small">
    Showing 1 to 5 of 9 results
  </div>
  <div className="d-flex align-items-center gap-2">
    <button
      className="btn btn-sm "
      style={{
        backgroundColor: "#f8f9fa",
        color: "#6c757d",
        borderColor: "#53b2a5",
      }}
    >
      <BsChevronLeft />
    </button>
    <div className="d-flex gap-1">
      <button
        className="btn btn-sm "
        style={{
          backgroundColor: "#53b2a5",
          color: "white",
          borderColor: "#53b2a5",
        }}
      >
        1
      </button>
      <button
        className="btn btn-sm "
        style={{
          backgroundColor: "white",
          color: "#53b2a5",
          borderColor: "#53b2a5",
        }}
      >
        2
      </button>
    </div>
    <button
      className="btn btn-sm rounded"
      style={{
        backgroundColor: "#53b2a5",
        color: "white",
        borderColor: "#53b2a5",
      }}
    >
      <BsChevronRight />
    </button>
  </div>
</div>
        </div>
      </div>

      {selectedPlan && (
        <EditPlanModal
          show={showModal}
          handleClose={handleModalClose}
          plan={selectedPlan}
          handleSave={handleSaveChanges}
        />
      )}
      {viewPlan && (
        <ViewPlanModal
          show={viewModal}
          handleClose={() => setViewModal(false)}
          plan={viewPlan}
        />
      )}
      {showAddModal && (
        <AddPlanModal
          show={showAddModal}
          handleClose={() => setShowAddModal(false)}
          handleAdd={handleAddPlan}
        />
      )}
    </div>
  );
};

export default PlanPricing;