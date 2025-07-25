import React, { useState } from "react";
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  InputGroup,
} from "react-bootstrap";
import {
  FaEdit,
  FaTrash,
  FaUsers,
  FaEye, // Added Eye icon
} from "react-icons/fa";

// Default roles data
const defaultRoles = [
  {
    id: 1,
    name: "Admin",
    users: 2,
    permissions: ["Full Access"],
    lastModified: "12 Sep 2024",
    type: "superadmin",
    // Added modulePermissions for existing roles (example data)
    modulePermissions: {
      "Account": ["Create", "View", "Update", "Delete"],
      "Inventory": ["Create", "View", "Update", "Delete"],
      "POS": ["Create", "View", "Update", "Delete"],
      "Debitors": ["Create", "View", "Update", "Delete"],
      "Creditors": ["Create", "View", "Update", "Delete"],
      "Sales": ["Create", "View", "Update", "Delete"],
      "Purchase": ["Create", "View", "Update", "Delete"],
      "GST": ["Create", "View", "Update", "Delete"],
      "User Management": ["Create", "View", "Update", "Delete"],
      "Report": ["View"],
      "Setting": ["View", "Update"]
    }
  },
  {
    id: 2,
    name: "Manager",
    users: 3,
    permissions: ["View", "Create", "Edit"],
    lastModified: "24 Oct 2024",
    type: "company",
    modulePermissions: {
      "Account": ["View"],
      "Inventory": ["Create", "View", "Update"],
      "POS": ["Create", "View"],
      "Sales": ["Create", "View", "Update"],
      "Purchase": ["Create", "View"],
      "Report": ["View"]
    }
  },
  {
    id: 3,
    name: "Salesman",
    users: 4,
    permissions: ["View", "Create"],
    lastModified: "18 Feb 2024",
    type: "user",
    modulePermissions: {
      "POS": ["Create", "View"],
      "Sales": ["Create", "View"],
      "Inventory": ["View"]
    }
  },
  // ... other default roles
];

// All available general permissions
const allPermissions = ["View", "Create", "Edit", "Full Access"];

// Modules and their specific permissions (Updated structure)
const tallyModules = [
  { name: "Account", permissions: ["Create", "View", "Update", "Delete"] },
  { name: "Inventory", permissions: ["Create", "View", "Update", "Delete"] },
  { name: "POS", permissions: ["Create", "View", "Update", "Delete"] },
  { name: "Debitors", permissions: ["Create", "View", "Update", "Delete"] },
  { name: "Creditors", permissions: ["Create", "View", "Update", "Delete"] },
  { name: "Sales", permissions: ["Create", "View", "Update", "Delete"] },
  { name: "Purchase", permissions: ["Create", "View", "Update", "Delete"] },
  { name: "GST", permissions: ["Create", "View", "Update", "Delete"] },
  { name: "User Management", permissions: ["Create", "View", "Update", "Delete"] },
  { name: "Report", permissions: ["View"] },
  { name: "Setting", permissions: ["View", "Update"] }
];

const RolesPermissions = () => {
  const [roles, setRoles] = useState(defaultRoles);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showView, setShowView] = useState(false); // State for View Modal
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name: "", permissions: [], type: "user", modulePermissions: {} });
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Filter roles based on search and status
  const filteredRoles = roles.filter((role) => {
    const matchesSearch = role.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || (statusFilter === "Active" && role.users >= 0); // Simplified status check
    return matchesSearch && matchesStatus;
  });

  // Handle adding a new role
  const handleAdd = () => {
    // Initialize modulePermissions with all modules set to no permissions
    const initialModulePermissions = {};
    tallyModules.forEach(module => {
      initialModulePermissions[module.name] = [];
    });

    setForm({ name: "", permissions: [], type: "user", modulePermissions: initialModulePermissions });
    setShowAdd(true);
  };

  // Save a new role
  const handleAddSave = () => {
    if (!form.name.trim()) return; // Prevent saving without a name

    const newRole = {
      id: Date.now(), // Simple ID generation
      name: form.name,
      users: 0, // New roles start with 0 users
      permissions: [...form.permissions],
      lastModified: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD
      type: form.type,
      // Include module permissions in the new role
      modulePermissions: { ...form.modulePermissions }
    };

    setRoles((prev) => [...prev, newRole]);
    setShowAdd(false);
  };

  // Handle editing a role
  const handleEdit = (role) => {
    setSelected(role);
    setForm({
      name: role.name,
      permissions: [...role.permissions],
      type: role.type,
      modulePermissions: { ...role.modulePermissions } // Copy existing module permissions
    });
    setShowEdit(true);
  };

  // Save edits to a role
  const handleEditSave = () => {
    if (!form.name.trim()) return; // Prevent saving without a name

    setRoles((prev) =>
      prev.map((r) =>
        r.id === selected.id
          ? {
            ...r,
            name: form.name,
            permissions: [...form.permissions],
            lastModified: new Date().toISOString().split('T')[0],
            type: form.type,
            modulePermissions: { ...form.modulePermissions } // Update module permissions
          }
          : r
      )
    );
    setShowEdit(false);
  };

  // Handle deleting a role
  const handleDelete = (role) => {
    setSelected(role);
    setShowDelete(true);
  };

  // Confirm deletion of a role
  const handleDeleteConfirm = () => {
    setRoles((prev) => prev.filter((r) => r.id !== selected.id));
    setShowDelete(false);
  };

  // Handle viewing a role (Eye icon)
  const handleView = (role) => {
    setSelected(role);
    setShowView(true);
  };

  // Toggle a general permission in the form
  const toggleGeneralPerm = (perm) => {
    if (perm === "Full Access") {
      // If Full Access is selected, clear others. If deselected, keep others.
      setForm((f) => ({
        ...f,
        permissions: f.permissions.includes("Full Access") ? [] : ["Full Access"]
      }));
    } else {
      // If a specific permission is toggled
      setForm((f) => {
        const currentPerms = [...f.permissions];
        const fullAccessIndex = currentPerms.indexOf("Full Access");

        if (fullAccessIndex !== -1) {
          // If Full Access was selected, remove it and add the specific permission
          return {
            ...f,
            permissions: [perm]
          };
        } else {
          // Otherwise, toggle the specific permission
          const permIndex = currentPerms.indexOf(perm);
          if (permIndex !== -1) {
            currentPerms.splice(permIndex, 1);
          } else {
            currentPerms.push(perm);
          }
          return {
            ...f,
            permissions: currentPerms
          };
        }
      });
    }
  };

  // Toggle a specific module permission
  const toggleModulePerm = (moduleName, perm) => {
    setForm((prevForm) => {
      const currentModulePerms = prevForm.modulePermissions[moduleName] || [];
      const permIndex = currentModulePerms.indexOf(perm);

      let newModulePerms;
      if (permIndex !== -1) {
        // Permission exists, remove it
        newModulePerms = currentModulePerms.filter(p => p !== perm);
      } else {
        // Permission doesn't exist, add it
        newModulePerms = [...currentModulePerms, perm];
      }

      return {
        ...prevForm,
        modulePermissions: {
          ...prevForm.modulePermissions,
          [moduleName]: newModulePerms
        }
      };
    });
  };

  // Toggle "Full Access" for a specific module
  const toggleModuleFullAccess = (moduleName) => {
    setForm((prevForm) => {
      const module = tallyModules.find(m => m.name === moduleName);
      const allModulePerms = module ? module.permissions : [];
      const hasFullAccess = prevForm.modulePermissions[moduleName]?.includes("Full Access");

      return {
        ...prevForm,
        modulePermissions: {
          ...prevForm.modulePermissions,
          [moduleName]: hasFullAccess ? [] : ["Full Access", ...allModulePerms]
        }
      };
    });
  };


  return (
    <div className="p-4" style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 style={{ fontWeight: "600" }}>Roles & Permission</h4>
          <p style={{ marginBottom: 0, color: "#666" }}>Manage your roles</p>
        </div>
        <div className="d-flex gap-2 align-items-center">
          <Button
            style={{ whiteSpace: "nowrap", backgroundColor: "#3daaaa", borderColor: "#3daaaa" }}
            onClick={handleAdd}
          >
            + Add Role
          </Button>
        </div>
      </div>

      {/* Main Card */}
      <Card className="">
        <Card.Body>
          {/* Filters */}
          <div className="d-flex justify-content-between mb-3">
            <InputGroup style={{ maxWidth: 300 }}>
              <Form.Control
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
            <Form.Select
              style={{ maxWidth: 180 }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Form.Select>
          </div>

          {/* Roles Table */}
          <div style={{ overflowX: "auto" }}>
            <Table responsive className="align-middle mb-0" style={{ minWidth: 800 }}>
              <thead>
                <tr style={{ background: "#f2f2f2" }}>
                  <th><Form.Check /></th>
                  <th>Role</th>
                  <th>Created Date</th>
                  <th>Status</th>
                  <th style={{ minWidth: 150 }}>Actions</th> {/* Increased width for actions */}
                </tr>
              </thead>
              <tbody>
                {filteredRoles.map((role) => (
                  <tr key={role.id}>
                    <td><Form.Check /></td>
                    <td>{role.name}</td>
                    <td>{role.lastModified}</td>
                    <td>
                      <span style={{
                        background: "#27ae60",
                        color: "#fff",
                        padding: "4px 14px",
                        borderRadius: 20,
                        fontSize: 14,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                      }}>
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            background: "#fff",
                            borderRadius: "50%",
                          }}
                        ></span>
                        Active
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        {/* View Button (Eye Icon) */}
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          title="View Details"
                          onClick={() => handleView(role)}
                        >
                          <FaEye size={14} />
                        </Button>
                        {/* Edit Button */}
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          title="Edit"
                          onClick={() => handleEdit(role)}
                        >
                          <FaEdit />
                        </Button>
                        {/* Delete Button */}
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          title="Delete"
                          onClick={() => handleDelete(role)}
                        >
                          <FaTrash color="#d32f2f" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredRoles.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center text-muted">
                      No roles found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the role <b>{selected?.name}</b>? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelete(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* View Role Details Modal */}
      <Modal show={showView} onHide={() => setShowView(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Role Details: {selected?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selected && (
            <>
              <div className="mb-3">
                <h6>General Information</h6>
                <p><strong>Name:</strong> {selected.name}</p>
                <p><strong>Type:</strong> {selected.type}</p>
                <p><strong>Last Modified:</strong> {selected.lastModified}</p>
                <p><strong>Number of Users:</strong> {selected.users}</p>
              </div>

              <div className="mb-3">
                <h6>General Permissions</h6>
                {selected.permissions && selected.permissions.length > 0 ? (
                  <div className="d-flex flex-wrap gap-2">
                    {selected.permissions.map((perm, idx) => (
                      <span
                        key={idx}
                        className="badge"
                        style={{
                          backgroundColor: perm === "Full Access" ? "#ffe6c7" : "#f5f0eb",
                          color: perm === "Full Access" ? "#FFA94D" : "#b47b3a",
                          fontWeight: perm === "Full Access" ? 600 : 500
                        }}
                      >
                        {perm}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted">No general permissions assigned.</p>
                )}
              </div>

              <div>
                <h6>Module Permissions</h6>
                {selected.modulePermissions ? (
                  <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>Module</th>
                          <th>Permissions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(selected.modulePermissions).map(([moduleName, perms]) => (
                          <tr key={moduleName}>
                            <td><strong>{moduleName}</strong></td>
                            <td>
                              {perms && perms.length > 0 ? (
                                <div className="d-flex flex-wrap gap-1">
                                  {perms.map((perm, idx) => (
                                    <span key={idx} className="badge bg-light text-dark me-1">
                                      {perm}
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                <span className="text-muted">No permissions</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-muted">No module permissions defined.</p>
                )}
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowView(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Role Modal */}
      <Modal show={showAdd} onHide={() => setShowAdd(false)} centered size="xl"> {/* Increased size to xl */}
        <Modal.Header closeButton>
          <Modal.Title>Add Role</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}> {/* Scrollable body */}
          <Form>
            {/* Role Name */}
            <Form.Group className="mb-3">
              <Form.Label>Role Name</Form.Label>
              <Form.Control
                placeholder="Enter role name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Form.Group>

            {/* Role Type */}
            <Form.Group className="mb-3">
              <Form.Label>Role Type</Form.Label>
              <Form.Select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="">Select type</option>
                <option value="superadmin">Superadmin</option>
                <option value="company">Company</option>
                <option value="user">User</option>
              </Form.Select>
            </Form.Group>

            {/* General Permissions */}
            <Form.Group className="mb-4">
              <Form.Label>General Permissions</Form.Label>
              <div className="d-flex flex-wrap gap-2">
                {allPermissions.map((perm) => {
                  const isActive = form.permissions.includes(perm);
                  return (
                    <Button
                      key={perm}
                      variant={isActive ? "warning" : "outline-warning"}
                      style={{
                        background: isActive ? "#53b2a5" : "#fff",
                        color: isActive ? "#fff" : "#53b2a5",
                        borderColor: "#53b2a5",
                        fontWeight: 500,
                        borderRadius: 8,
                        fontSize: 15,
                        padding: "3px 18px",
                      }}
                      onClick={() => toggleGeneralPerm(perm)}
                    >
                      {perm}
                    </Button>
                  );
                })}
              </div>
            </Form.Group>

            {/* Module Permissions Section */}
            <div className="mb-3">
              <h6 className="fw-semibold mb-3">
                Assign Module Permissions to Role
              </h6>
              <div style={{ border: "1px solid #dee2e6", borderRadius: "0.375rem" }}>
                <Table responsive="sm" size="sm" style={{ fontSize: 13, marginBottom: 0 }}>
                  <thead style={{ background: "#f8f9fa" }}>
                    <tr>
                      <th style={{ width: 40, border: "none", padding: "10px 12px" }}>
                        {/* Master Checkbox could go here if needed */}
                      </th>
                      <th style={{ border: "none", fontWeight: 600, padding: "10px 12px", minWidth: 150 }}>
                        MODULE
                      </th>
                      <th
                        style={{
                          border: "none",
                          fontWeight: 600,
                          padding: "10px 12px",
                          textAlign: "left"
                        }}
                      >
                        PERMISSIONS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tallyModules.map((module, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid #f0f0f0" }}>
                        <td style={{ padding: "10px 12px", border: "none" }}>
                          {/* Individual row checkbox could go here */}
                        </td>
                        <td
                          style={{
                            padding: "10px 12px",
                            border: "none",
                            fontWeight: 500,
                            minWidth: 150
                          }}
                        >
                          {module.name}
                        </td>
                        <td style={{ padding: "10px 12px", border: "none" }}>
                          {/* Full Access Checkbox */}
                          <div className="mb-1">
                            <Form.Check
                              type="checkbox"
                              id={`add-${module.name}-full-access`}
                              label="Full Access"
                              checked={form.modulePermissions[module.name]?.includes("Full Access") || false}
                              onChange={() => toggleModuleFullAccess(module.name)}
                              style={{
                                fontSize: 13,
                                fontWeight: 500,
                                color: form.modulePermissions[module.name]?.includes("Full Access") ? "#53b2a5" : "inherit"
                              }}
                            />
                          </div>
                          {/* Individual Permissions */}
                          <div className="d-flex flex-wrap gap-2">
                            {module.permissions.map((perm) => {
                              // Disable individual checkboxes if Full Access is granted
                              const isFullAccess = form.modulePermissions[module.name]?.includes("Full Access");
                              const isSelected = form.modulePermissions[module.name]?.includes(perm);
                              
                              return (
                                <Form.Check
                                  key={`add-${module.name}-${perm}`}
                                  type="checkbox"
                                  id={`add-${module.name}-${perm}`}
                                  label={perm}
                                  checked={isSelected}
                                  onChange={() => toggleModulePerm(module.name, perm)}
                                  disabled={isFullAccess} // Disable if Full Access is selected
                                  style={{
                                    fontSize: 13,
                                    marginRight: 15,
                                    color: isSelected ? "#53b2a5" : "inherit",
                                    fontWeight: isSelected ? 500 : 400,
                                    opacity: isFullAccess ? 0.6 : 1 // Visual indication when disabled
                                  }}
                                />
                              );
                            })}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAdd(false)}>
            Cancel
          </Button>
          <Button
            style={{ background: "#53b2a5", border: "none" }}
            onClick={handleAddSave}
            disabled={!form.name.trim()}
          >
            Add Role
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Role Modal - Tally Style */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)} centered size="xl">
        <Modal.Header closeButton style={{ borderBottom: "1px solid #e9ecef" }}>
          <Modal.Title style={{ fontWeight: 600, fontSize: 18 }}>Edit Role: {selected?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "20px", maxHeight: '70vh', overflowY: 'auto' }}> {/* Scrollable body */}
          <Form>
            {/* Role Name */}
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: 500 }}>Role Name *</Form.Label>
              <Form.Control
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 6,
                  padding: "8px 12px",
                  fontSize: 14
                }}
              />
            </Form.Group>

            {/* Role Type */}
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: 500 }}>Role Type</Form.Label>
              <Form.Select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                style={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 6,
                  padding: "8px 12px",
                  fontSize: 14
                }}
              >
                <option value="">Select type</option>
                <option value="superadmin">Superadmin</option>
                <option value="company">Company</option>
                <option value="user">User</option>
              </Form.Select>
            </Form.Group>

            {/* General Permissions */}
            <Form.Group className="mb-4">
              <Form.Label>General Permissions</Form.Label>
              <div className="d-flex flex-wrap gap-2">
                {allPermissions.map((perm) => {
                  const isActive = form.permissions.includes(perm);
                  return (
                    <Button
                      key={perm}
                      variant={isActive ? "warning" : "outline-warning"}
                      style={{
                        background: isActive ? "#53b2a5" : "#fff",
                        color: isActive ? "#fff" : "#53b2a5",
                        borderColor: "#53b2a5",
                        fontWeight: 500,
                        borderRadius: 8,
                        fontSize: 15,
                        padding: "3px 18px",
                      }}
                      onClick={() => toggleGeneralPerm(perm)}
                    >
                      {perm}
                    </Button>
                  );
                })}
              </div>
            </Form.Group>

            {/* Permissions Section */}
            <div className="mb-3">
              <h6 className="fw-semibold mb-3" style={{ fontSize: 14 }}>
                Assign Module Permissions to Role
              </h6>
              <div style={{ border: "1px solid #dee2e6", borderRadius: "0.375rem" }}>
                <Table responsive="sm" size="sm" style={{ fontSize: 13, marginBottom: 0 }}>
                  <thead style={{ background: "#f8f9fa" }}>
                    <tr>
                      <th style={{ width: 40, border: "none", padding: "10px 12px" }}>
                      </th>
                      <th style={{ border: "none", fontWeight: 600, padding: "10px 12px", minWidth: 150 }}>
                        MODULE
                      </th>
                      <th
                        style={{
                          border: "none",
                          fontWeight: 600,
                          padding: "10px 12px",
                          textAlign: "left"
                        }}
                      >
                        PERMISSIONS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tallyModules.map((module, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid #f0f0f0" }}>
                        <td style={{ padding: "10px 12px", border: "none" }}>
                        </td>
                        <td
                          style={{
                            padding: "10px 12px",
                            border: "none",
                            fontWeight: 500,
                            minWidth: 150
                          }}
                        >
                          {module.name}
                        </td>
                        <td style={{ padding: "10px 12px", border: "none" }}>
                          {/* Full Access Checkbox */}
                          <div className="mb-1">
                            <Form.Check
                              type="checkbox"
                              id={`edit-${module.name}-full-access`}
                              label="Full Access"
                              checked={form.modulePermissions[module.name]?.includes("Full Access") || false}
                              onChange={() => toggleModuleFullAccess(module.name)}
                              style={{
                                fontSize: 13,
                                fontWeight: 500,
                                color: form.modulePermissions[module.name]?.includes("Full Access") ? "#53b2a5" : "inherit"
                              }}
                            />
                          </div>
                          {/* Individual Permissions */}
                          <div className="d-flex flex-wrap gap-2">
                            {module.permissions.map((perm) => {
                              // Disable individual checkboxes if Full Access is granted
                              const isFullAccess = form.modulePermissions[module.name]?.includes("Full Access");
                              const isSelected = form.modulePermissions[module.name]?.includes(perm);
                              
                              return (
                                <Form.Check
                                  key={`edit-${module.name}-${perm}`}
                                  type="checkbox"
                                  id={`edit-${module.name}-${perm}`}
                                  label={perm}
                                  checked={isSelected}
                                  onChange={() => toggleModulePerm(module.name, perm)}
                                  disabled={isFullAccess} // Disable if Full Access is selected
                                  style={{
                                    fontSize: 13,
                                    marginRight: 15,
                                    color: isSelected ? "#53b2a5" : "inherit",
                                    fontWeight: isSelected ? 500 : 400,
                                    opacity: isFullAccess ? 0.6 : 1 // Visual indication when disabled
                                  }}
                                />
                              );
                            })}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: "1px solid #e9ecef", padding: "15px 20px" }}>
          <Button
            variant="secondary"
            onClick={() => setShowEdit(false)}
            style={{
              background: "#6c757d",
              border: "none",
              borderRadius: 4,
              padding: "8px 20px",
              fontWeight: 500
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleEditSave}
            disabled={!form.name.trim()}
            style={{
              background: "#53b2a5",
              border: "none",
              borderRadius: 4,
              padding: "8px 20px",
              fontWeight: 500
            }}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RolesPermissions;