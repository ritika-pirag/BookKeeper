import axios from "axios";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../../config"; // Adjust the import path as necessary

const PlanPackages = () => {
  // State for plans data and UI
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [id, setId] = useState("");

  // State for sorting and filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // State for modals and forms
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [planToDelete, setPlanToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    priceMonthly: "",
    priceYearly: "",
    description: "",
    features: ["", "", ""], // Initialize with 3 empty feature slots
  });

  const toggleStatus = async (id) => {
    try {
      setIsLoading(true);
      const response = await axios.put(`${BASE_URL}plans/${id}/toggle-status`);

      // Optional: show toast or success message here

      // Update local state
      const updatedPlans = plans.map((plan) =>
        plan.id === id
          ? {
              ...plan,
              status: plan.status === "Active" ? "Inactive" : "Active",
            }
          : plan
      );
      setPlans(updatedPlans);
      setId("");
    } catch (err) {
      console.error(err);
      setError("Failed to toggle status.");
    } finally {
      setIsLoading(false);
    }
  };

  const [errors, setErrors] = useState({});

  // Fetch plans from API
  const fetchPlans = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${BASE_URL}plan`);

      const transformedData = res.data.data.map((item) => ({
        id: item._id,
        name: item.name,
        priceMonthly: item.priceMonthly,
        priceYearly: item.priceYearly,
        description: item.description,
        features: item.features || [], // Add features array
        status: item.status, // Adding status as it's used in your UI
        subscribers: Math.floor(Math.random() * 10000), // Random subscribers for demo
      }));

      setPlans(transformedData);
      setFilteredPlans(transformedData);
      setError(null);
    } catch (err) {
      console.error("Error fetching plan data", err);
      setError("Failed to load plans. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // Filter and sort plans whenever dependencies change
  useEffect(() => {
    if (isLoading) return;

    const filtered = plans.filter((plan) => {
      // Apply search filter
      const matchesSearch =
        !searchTerm ||
        plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (plan.description &&
          plan.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (plan.features &&
          plan.features.some((feature) =>
            feature.toLowerCase().includes(searchTerm.toLowerCase())
          ));

      // Apply status filter
      const matchesStatus =
        filterStatus === "All" || plan.status === filterStatus;

      return matchesSearch && matchesStatus;
    });

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      // Convert to number if sorting by price
      if (sortBy === "priceMonthly" || sortBy === "priceYearly") {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      }
      // Convert to lowercase if string comparison
      else if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      // Determine sort order
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      return 0;
    });

    setFilteredPlans(sorted);
  }, [plans, searchTerm, filterStatus, sortBy, sortOrder, isLoading]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  // Handle feature input changes
  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  // Add a new feature field
  const addFeatureField = () => {
    setFormData({
      ...formData,
      features: [...formData.features, ""],
    });
  };

  // Remove a feature field
  const removeFeatureField = (index) => {
    const newFeatures = [...formData.features];
    newFeatures.splice(index, 1);
    setFormData({
      ...formData,
      features: newFeatures,
    });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Plan name is required";
      isValid = false;
    }

    if (!formData.priceMonthly || parseFloat(formData.priceMonthly) <= 0) {
      newErrors.priceMonthly = "Monthly price must be greater than 0";
      isValid = false;
    }

    if (!formData.priceYearly || parseFloat(formData.priceYearly) <= 0) {
      newErrors.priceYearly = "Yearly price must be greater than 0";
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }

    // Validate features - at least one non-empty feature
    const hasFeatures = formData.features.some(
      (feature) => feature.trim() !== ""
    );
    if (!hasFeatures) {
      newErrors.features = "At least one feature is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsLoading(true);

      // Prepare features array - remove empty strings and trim
      const preparedFeatures = formData.features
        .map((feature) => feature.trim())
        .filter((feature) => feature !== "");

      if (editingPlan) {
        // Update existing plan
        const updatedPlanData = {
          name: formData.name.trim(),
          priceMonthly: parseFloat(formData.priceMonthly),
          priceYearly: parseFloat(formData.priceYearly),
          description: formData.description.trim(),
          features: preparedFeatures,
        };

        await axios.put(`${BASE_URL}plan/${id}`, updatedPlanData);

        // Refetch plans after update
        await fetchPlans();
      } else {
        // Add new plan
        const newPlanData = {
          name: formData.name.trim(),
          priceMonthly: parseFloat(formData.priceMonthly),
          priceYearly: parseFloat(formData.priceYearly),
          description: formData.description.trim(),
          features: preparedFeatures,
        };

        await axios.post(`${BASE_URL}plan`, newPlanData);

        // Refetch plans after create
        await fetchPlans();
      }

      setShowModal(false);
      resetForm();
    } catch (err) {
      console.error("Error saving plan", err);
      setError("Failed to save plan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      name: "",
      priceMonthly: "",
      priceYearly: "",
      description: "",
      features: ["", "", ""],
    });
    setErrors({});
    setEditingPlan(null);
    setIsEditing(false);
  };

  // Prepare form for editing
  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setIsEditing(true);
    setId(plan.id);
    setFormData({
      name: plan.name,
      priceMonthly: plan.priceMonthly.toString(),
      priceYearly: plan.priceYearly.toString(),
      description: plan.description,
      features: plan.features.length > 0 ? [...plan.features] : ["", "", ""],
    });
    setShowModal(true);
  };

  // Prepare for deletion
  const handleDelete = (plan) => {
    setPlanToDelete(plan);
    setId(plan.id);
    setShowDeleteConfirm(true);
  };

  // Confirm deletion
  const confirmDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`${BASE_URL}plan/${id}`);

      // Refetch plans after delete
      await fetchPlans();

      setShowDeleteConfirm(false);
      setPlanToDelete(null);
      setId("");
    } catch (err) {
      console.error("Error deleting plan", err);
      setError("Failed to delete plan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle plan status

  return (
    <div className=" p-2">
      <div className=" p-3">
        {/* Header */}
        <div className="card-header mb-4">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="h2 mb-1 text-dark fw-bold">Plans & Packages</h1>
              <p className="text-muted mb-0">
                Manage your subscription plans and pricing options
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="card-body">
          <div className="row g-3 align-items-center mb-4">
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search plans..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="col-md-5 text-end">
              <button
                className="btn btn-primary"
                onClick={() => {
                  resetForm();
                  setShowModal(true);
                }}
              >
                <i className="bi bi-plus-circle me-2"></i>
                Add New Plan
              </button>
            </div>
          </div>
        </div>

        {/* Plans Cards */}
        <div className="card-body">
          {isLoading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-4 text-danger">{error}</div>
          ) : filteredPlans.length === 0 ? (
            <div className="text-center py-4">
              No plans found matching your criteria
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {filteredPlans.map((plan) => (
                <div className="col" key={plan.id}>

                  <div
                    className="plan-card bg-white"
                    style={{
                      border: "1px solid #dee2e6", // light border
                      borderRadius: "1rem",
                      boxShadow: "30px 30px 30px 30px rgba(0, 0, 0, 0.08)", // more elevated shadow
                      transition: "all 0.3s ease-in-out",
                      padding: "1.5rem",
                      height: "100%",
                      backgroundColor: "#ffffff", // clean white
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h3 className="h5 text-dark fw-bold mb-0">{plan.name}</h3>
                      <span
                        className={`badge rounded-pill px-3 py-1 ${
                          plan.status === "Active"
                            ? "bg-success-subtle text-success"
                            : "bg-danger-subtle text-danger"
                        }`}
                        style={{ fontSize: "0.75rem", cursor: "pointer" }}
                        onClick={() => toggleStatus(plan.id)}
                      >
                        {plan.status}
                      </span>
                    </div>

                    
                    <div className="d-flex justify-content-between align-items-center my-3">
                      <div>
                        <div className="text-muted small">Monthly</div>
                        <div className="h4 text-dark fw-bold">
                          ${plan.priceMonthly.toFixed(2)}
                        </div>
                      </div>
                      <div className="text-end">
                        <div className="text-muted small">Yearly</div>
                        <div className="h4 text-dark fw-bold">
                          ${plan.priceYearly.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <p
                      className="text-muted small mb-4"
                      style={{ minHeight: "50px" }}
                    >
                      {plan.description}
                    </p>

                    <div className="mb-4">
                      <h6 className="fw-semibold small mb-2">Features:</h6>
                      <ul className="list-unstyled small mb-0">
                        {plan.features && plan.features.length > 0 ? (
                          plan.features.map((feature, index) => (
                            <li key={index} className="mb-1 text-dark">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              {feature}
                            </li>
                          ))
                        ) : (
                          <li className="text-muted">No features specified</li>
                        )}
                      </ul>
                    </div>

                    <div className="d-flex justify-content-end">
                      <div className="btn-group gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEdit(plan)}
                          title="Edit"
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(plan)}
                          title="Delete"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Results Footer */}
        <div className="card-footer bg-light">
          <div className="row align-items-center">
            <div className="col">
              <small className="text-muted">
                Showing {filteredPlans.length} of {plans.length} plans
              </small>
            </div>
            <div className="col-auto">
              <small className="text-muted">
                Total subscribers:{" "}
                {plans
                  .reduce((sum, plan) => sum + plan.subscribers, 0)
                  .toLocaleString()}
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Plan Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {isEditing ? "Edit Plan" : "Add New Plan"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  aria-label="Close"
                ></button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  {/* Plan Name */}
                  <div className="mb-3">
                    <label
                      htmlFor="planName"
                      className="form-label fw-semibold"
                    >
                      Plan Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="planName"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      placeholder="Enter plan name"
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>

                  {/* Price Monthly */}
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="priceMonthly"
                          className="form-label fw-semibold"
                        >
                          Monthly Price ($){" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          id="priceMonthly"
                          name="priceMonthly"
                          value={formData.priceMonthly}
                          onChange={handleInputChange}
                          min="0"
                          step="0.01"
                          className={`form-control ${
                            errors.priceMonthly ? "is-invalid" : ""
                          }`}
                          placeholder="0.00"
                        />
                        {errors.priceMonthly && (
                          <div className="invalid-feedback">
                            {errors.priceMonthly}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Price Yearly */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="priceYearly"
                          className="form-label fw-semibold"
                        >
                          Yearly Price ($){" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          id="priceYearly"
                          name="priceYearly"
                          value={formData.priceYearly}
                          onChange={handleInputChange}
                          min="0"
                          step="0.01"
                          className={`form-control ${
                            errors.priceYearly ? "is-invalid" : ""
                          }`}
                          placeholder="0.00"
                        />
                        {errors.priceYearly && (
                          <div className="invalid-feedback">
                            {errors.priceYearly}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-3">
                    <label
                      htmlFor="description"
                      className="form-label fw-semibold"
                    >
                      Description <span className="text-danger">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className={`form-control ${
                        errors.description ? "is-invalid" : ""
                      }`}
                      placeholder="Enter plan description"
                      rows="3"
                    />
                    {errors.description && (
                      <div className="invalid-feedback">
                        {errors.description}
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Features <span className="text-danger">*</span>
                    </label>
                    {formData.features.map((feature, index) => (
                      <div key={index} className="input-group mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder={`Feature ${index + 1}`}
                          value={feature}
                          onChange={(e) =>
                            handleFeatureChange(index, e.target.value)
                          }
                        />
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => removeFeatureField(index)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    ))}
                    {errors.features && (
                      <div className="text-danger small mb-2">
                        {errors.features}
                      </div>
                    )}
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      onClick={addFeatureField}
                    >
                      <i className="bi bi-plus me-1"></i> Add Feature
                    </button>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-1"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        {isEditing ? "Updating..." : "Creating..."}
                      </>
                    ) : isEditing ? (
                      "Update Plan"
                    ) : (
                      "Create Plan"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-exclamation-triangle-fill text-warning me-2"></i>
                  Delete Plan
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setPlanToDelete(null);
                  }}
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <p className="mb-3">
                  Are you sure you want to delete the{" "}
                  <strong>"{planToDelete?.name}"</strong> plan?
                </p>
                <div className="alert alert-warning">
                  <small>
                    <strong>Warning:</strong> This action cannot be undone and
                    will affect{" "}
                    <strong>
                      {planToDelete?.subscribers.toLocaleString()}
                    </strong>{" "}
                    subscribers.
                  </small>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setPlanToDelete(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDelete}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-1"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Deleting...
                    </>
                  ) : (
                    "Delete Plan"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanPackages ;
