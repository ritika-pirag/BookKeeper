import React, { useState } from "react";
import { BsListUl, BsPencilSquare, BsEye } from "react-icons/bs";
import { Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PlansPricing.css";

const initialPlans = [
  { name: "Basic", price: "$9.99", billing: "Monthly", status: "Active", subscribers: "1,243" },
  { name: "Silver", price: "$14.99", billing: "Monthly", status: "Active", subscribers: "857" },
  { name: "Gold", price: "$24.99", billing: "Monthly", status: "Active", subscribers: "512" },
  { name: "Platinum", price: "$49.99", billing: "Monthly", status: "Active", subscribers: "326" },
];

const EditPlanModal = ({ show, handleClose, plan, handleSave }) => {
  const [formData, setFormData] = useState(plan || {});

  React.useEffect(() => {
    setFormData(plan || {});
  }, [plan]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSave = () => {
    handleSave(formData);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header style={{ backgroundColor: "#FFA64D", color: "#fff" }}>
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
        <Button style={{ backgroundColor: "#FFA64D", borderColor: "#FFA64D" }} onClick={onSave}>
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
  });

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
              <option value="Deprecated">Deprecated</option>
            </Form.Select>
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

  const handleEditClick = (plan, index) => {
    setSelectedPlan({ ...plan, index });
    setShowModal(true);
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
    setPlans([...plans, newPlan]);
    setShowAddModal(false);
  };

  return (
    <div className="plans-page container py-4 mt-4 mt-md-0">
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

      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex align-items-center gap-3">
              <BsListUl size={30} className="text-primary" />
              <div>
                <h6 className="fw-semibold mb-1">View All Plans</h6>
                <p className="text-muted small mb-0">Review and manage your existing plans</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card ">
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
                  <th>Subscribers</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan, i) => (
                  <tr key={i}>
                    <td>
                      <span
                        className="badge px-3 py-2 rounded-pill fw-semibold"
                        style={{
                          backgroundColor:
                            plan.name === "Platinum"
                              ? "#e5e4e2"
                              : plan.name === "Gold"
                              ? "#ffd700"
                              : plan.name === "Silver"
                              ? "#c0c0c0"
                              : "#b2dfdb",
                          color: "#000",
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
                    <td>{plan.subscribers}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm text-warning p-0" onClick={() => handleEditClick(plan, i)}>
                          <BsPencilSquare size={18} />
                        </button>
                        <button
                          className="btn btn-sm text-info p-0"
                          onClick={() => handleViewClick(plan)}
                          title="View"
                        >
                          <BsEye size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
