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
  FaFilePdf,
  FaFileExcel,
} from "react-icons/fa";

const defaultRoles = [
  {
    id: 1,
    name: "Admin",
    users: 2,
    permissions: ["Full Access"],
    lastModified: "12 Sep 2024",
    type: "superadmin",
  },
  {
    id: 2,
    name: "Manager",
    users: 3,
    permissions: ["View", "Create", "Edit"],
    lastModified: "24 Oct 2024",
    type: "company",
  },
  {
    id: 3,
    name: "Salesman",
    users: 4,
    permissions: ["View", "Create"],
    lastModified: "18 Feb 2024",
    type: "user",
  },
  {
    id: 4,
    name: "Supervisor",
    users: 2,
    permissions: ["View", "Create"],
    lastModified: "17 Oct 2024",
    type: "user",
  },
  {
    id: 5,
    name: "Store Keeper",
    users: 1,
    permissions: ["View"],
    lastModified: "20 Jul 2024",
    type: "user",
  },
];

const allPermissions = ["View", "Create", "Edit", "Full Access"];

const badgeColor = (perm) =>
  perm === "Full Access"
    ? { background: "#ffe6c7", color: "#FFA94D", fontWeight: 600 }
    : { background: "#f5f0eb", color: "#b47b3a", fontWeight: 500 };

const RolesPermissions = () => {
  const [roles, setRoles] = useState(defaultRoles);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name: "", permissions: [], type: "user" });
  const [search, setSearch] = useState("");

  const filtered = roles.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    setForm({ name: "", permissions: [], type: "user" });
    setShowAdd(true);
  };

  const handleAddSave = () => {
    setRoles((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: form.name,
        users: 0,
        permissions: form.permissions,
        lastModified: new Date().toISOString().slice(0, 10),
        type: form.type,
      },
    ]);
    setShowAdd(false);
  };

  const handleEdit = (role) => {
    setSelected(role);
    setForm({ name: role.name, permissions: [...role.permissions], type: role.type });
    setShowEdit(true);
  };

  const handleEditSave = () => {
    setRoles((prev) =>
      prev.map((r) =>
        r.id === selected.id
          ? {
              ...r,
              name: form.name,
              permissions: form.permissions,
              lastModified: new Date().toISOString().slice(0, 10),
              type: form.type,
            }
          : r
      )
    );
    setShowEdit(false);
  };

  const handleDelete = (role) => {
    setSelected(role);
    setShowDelete(true);
  };

  const handleDeleteConfirm = () => {
    setRoles((prev) => prev.filter((r) => r.id !== selected.id));
    setShowDelete(false);
  };

  const togglePerm = (perm) => {
    if (perm === "Full Access") {
      setForm((f) => ({ ...f, permissions: f.permissions.includes("Full Access") ? [] : ["Full Access"] }));
    } else {
      setForm((f) => ({
        ...f,
        permissions: f.permissions.includes(perm)
          ? f.permissions.filter((p) => p !== perm)
          : [...f.permissions.filter((p) => p !== "Full Access"), perm],
      }));
    }
  };

  return (
    <div className="p-4" style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 style={{ fontWeight: "600" }}>Roles & Permission</h4>
          <p style={{ marginBottom: 0, color: "#666" }}>Manage your roles</p>
        </div>
        <div className="d-flex gap-2 align-items-center">
          <Button variant="light">
            <FaFilePdf color="#e74c3c" />
          </Button>
          <Button variant="light">
            <FaFileExcel color="#2ecc71" />
          </Button>
          <Button
             style={{ whiteSpace: "nowrap", backgroundColor: "#3daaaa", borderColor: "#3daaaa" }}
            onClick={handleAdd}
          >
            + Add Role
          </Button>
        </div>
      </div>

      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between mb-3">
            <InputGroup style={{ maxWidth: 300 }}>
              <Form.Control
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
            <Form.Select style={{ maxWidth: 180 }}>
              <option>Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </Form.Select>
          </div>

          <div style={{ overflowX: "auto" }}>
            <Table responsive className="align-middle mb-0" style={{ minWidth: 800 }}>
              <thead>
                <tr style={{ background: "#f2f2f2" }}>
                  <th><Form.Check /></th>
                  <th>Role</th>
                  <th>Created Date</th>
                  <th>Status</th>
                  <th style={{ minWidth: 120 }}></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((role) => (
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
                        <Button variant="outline-secondary" size="sm" title="Permissions">
                          <FaUsers />
                        </Button>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          title="Edit"
                          onClick={() => handleEdit(role)}
                        >
                          <FaEdit />
                        </Button>
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
                {filtered.length === 0 && (
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

      <div style={{
        position: "fixed",
        right: 20,
        top: "50%",
        transform: "translateY(-50%)",
        background: "#FFA94D",
        width: 42,
        height: 42,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
      }}>
        <i className="bi bi-gear" style={{ color: "#fff", fontSize: 20 }}></i>
      </div>

      {/* Delete Modal */}
      <Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the role <b>{selected?.name}</b>?
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

      {/* Add Role Modal */}
      <Modal show={showAdd} onHide={() => setShowAdd(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Role Name</Form.Label>
              <Form.Control
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Role Type</Form.Label>
              <Form.Select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="superadmin">Superadmin</option>
                <option value="company">Company</option>
                <option value="user">User</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Permissions</Form.Label>
              <div className="d-flex flex-wrap gap-2">
                {allPermissions.map((perm) => (
                  <Button
                    key={perm}
                    variant={
                      form.permissions.includes(perm)
                        ? "warning"
                        : "outline-warning"
                    }
                    style={{
                      background: form.permissions.includes(perm)
                        ? "#FFA94D"
                        : "#fff",
                      color: form.permissions.includes(perm)
                        ? "#fff"
                        : "#FFA94D",
                      borderColor: "#FFA94D",
                      fontWeight: 500,
                      borderRadius: 8,
                      fontSize: 15,
                      padding: "3px 18px",
                    }}
                    onClick={() => togglePerm(perm)}
                  >
                    {perm}
                  </Button>
                ))}
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAdd(false)}>
            Cancel
          </Button>
          <Button
            style={{ background: "#FFA94D", border: "none" }}
            onClick={handleAddSave}
            disabled={!form.name || form.permissions.length === 0}
          >
            Add Role
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Role Modal - Updated Design */}
{/* Edit Role Modal - Updated Design */}
<Modal show={showEdit} onHide={() => setShowEdit(false)} centered size="lg">
  <Modal.Header closeButton style={{ borderBottom: "1px solid #e9ecef" }}>
    <Modal.Title style={{ fontWeight: 600, fontSize: 18 }}>Role Edit</Modal.Title>
  </Modal.Header>

  <Modal.Body style={{ padding: "20px" }}>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label style={{ fontWeight: 500 }}>Name *</Form.Label>
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

   {/* Department Tags */}
<div className="mb-4">
  <div className="d-flex flex-wrap gap-2">
    {["Inventory", "POS", "Report", "Finance", "Account"].map((dept) => (
      <Button
        key={dept}
        variant="outline"
        size="sm"
        style={{
          background: dept === "Inventory" ? "#53b2a5" : "#fff",
          color: dept === "Inventory" ? "#fff" : "#53b2a5",
          border: "1px solid #53b2a5",
          borderRadius: 4,
          fontSize: 12,
          fontWeight: 500,
          padding: "4px 12px"
        }}
      >
        {dept}
      </Button>
    ))}
  </div>
</div>


      {/* Permissions Section */}
      <div className="mb-3">
        <h6 className="fw-semibold mb-3" style={{ fontSize: 14 }}>
          Assign General Permission to Roles
        </h6>

        <div style={{ overflowX: "auto", maxHeight: "300px" }}>
          <Table responsive="sm" size="sm" style={{ fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#f8f9fa" }}>
                <th style={{ width: 30, border: "none", padding: "8px 12px" }}>
                  <Form.Check />
                </th>
                <th style={{ border: "none", fontWeight: 600, padding: "8px 12px" }}>
                  MODULE
                </th>
                <th
                  style={{
                    border: "none",
                    fontWeight: 600,
                    padding: "8px 12px",
                    textAlign: "center"
                  }}
                >
                  PERMISSIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "User", permissions: ["Manage", "Create", "Edit", "Delete"] },
                { name: "Role", permissions: ["Manage", "Create", "Edit", "Delete"] },
                { name: "Client", permissions: ["Manage", "Create", "Edit", "Delete"] },
                { name: "Product & service", permissions: ["Manage", "Create", "Edit", "Delete"] },
                { name: "Constant unit", permissions: ["Manage", "Create", "Edit", "Delete"] },
                { name: "Constant tax", permissions: ["Manage", "Create", "Edit", "Delete"] },
                { name: "Constant category", permissions: ["Manage", "Create", "Edit", "Delete"] },
                { name: "Zoom meeting", permissions: ["Manage", "Create", "Delete", "Show"] },
                { name: "Company settings", permissions: ["Manage"] },
                { name: "Language", permissions: [] },
                { name: "Permission", permissions: ["Manage", "Create", "Edit", "Delete"] }
              ].map((module, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <td style={{ padding: "8px 12px", border: "none" }}>
                    <Form.Check />
                  </td>
                  <td
                    style={{
                      padding: "8px 12px",
                      border: "none",
                      fontWeight: 500,
                      minWidth: 140
                    }}
                  >
                    {module.name}
                  </td>
                  <td style={{ padding: "8px 12px", border: "none" }}>
                    <div className="d-flex flex-wrap gap-2 justify-content-center">
                      {module.permissions.map((perm) => (
                        <Form.Check
                          key={`${module.name}-${perm}`}
                          type="checkbox"
                          id={`${module.name}-${perm}`}
                          label={perm}
                          style={{
                            fontSize: 12,
                            marginRight: 10,
                            color: "#53b2a5",
                            minWidth: 80
                          }}
                          defaultChecked={["Manage", "Create", "Edit"].includes(perm)}
                        />
                      ))}
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
      disabled={!form.name}
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