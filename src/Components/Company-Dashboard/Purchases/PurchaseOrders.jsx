import React, { useState } from "react";
import {
  Container,
  Card,
  Table,
  Form,
  InputGroup,
  Button,
  Modal,
  Row,
  Col,
} from "react-bootstrap";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const sortOptions = ["Last 7 Days", "Last 30 Days", "This Month", "This Year"];

const initialData = [
  {
    id: "P1001",
    name: "Lenovo IdeaPad 3",
    warehouse: "Mumbai",
    vendors: "Lenovo India",
    amount: "$1000",
    qty: 40,
    payment: "Online",
    date: "2025-07-10",
  },
  {
    id: "P1002",
    name: "Beats Pro",
    warehouse: "Delhi",
    vendors: "Beats Inc.",
    amount: "$1500",
    qty: 25,
    payment: "Cash",
    date: "2025-07-12",
  },
];

const PurchaseOrders = () => {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState(sortOptions[0]);
  const [showAdd, setShowAdd] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selected, setSelected] = useState(null);

  const [form, setForm] = useState({
    id: "",
    name: "",
    warehouse: "",
    vendors: "",
    amount: "",
    qty: "",
    payment: "",
    date: "",
  });

  const filtered = data.filter((row) =>
    row.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    setData([...data, form]);
    setForm({ id: "", name: "", warehouse: "", vendors: "", amount: "", qty: "", payment: "", date: "" });
    setShowAdd(false);
  };

  const handleEdit = () => {
    setData(data.map((item) => (item.id === form.id ? form : item)));
    setShowEdit(false);
  };

  const handleDelete = () => {
    setData(data.filter((item) => item.id !== selected.id));
    setShowDelete(false);
  };

  return (
    <div style={{ background: "#f7f7f7", minHeight: "100vh", paddingBottom: 40 }}>
      <Container className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h3 style={{ fontWeight: 700, color: "#002d4d" }}>Purchase Order</h3>
            <div style={{ color: "#888" }}>Manage your Purchase Orders</div>
          </div>
          <Button style={{ backgroundColor: "#002d4d", border: "none" }} onClick={() => setShowAdd(true)}>
            + Add Order
          </Button>
        </div>

        <Card className="mb-4">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
              <InputGroup style={{ maxWidth: 300 }}>
                <Form.Control
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
              <Form.Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ maxWidth: 200 }}
              >
                {sortOptions.map((opt) => (
                  <option key={opt}>{`Sort By : ${opt}`}</option>
                ))}
              </Form.Select>
            </div>

            <div style={{ overflowX: "auto" }}>
              <Table striped bordered hover className="align-middle">
                <thead style={{ background: "#f5f6fa" }}>
                  <tr>
                    <th>Product ID</th>
                    <th>Product</th>
                    <th>QTY</th>
                    <th>Warehouse</th>
                    <th>Vendors</th>
                    <th>Amount</th>
                    <th>Payment Type</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.id}</td>
                      <td>{row.name}</td>
                      <td>{row.qty}</td>
                      <td>{row.warehouse}</td>
                      <td>{row.vendors}</td>
                      <td>{row.amount}</td>
                      <td>{row.payment}</td>
                      <td>{row.date}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button size="sm" variant="outline-primary" onClick={() => { setSelected(row); setShowView(true); }}>
                            <FaEye />
                          </Button>
                          <Button size="sm" variant="outline-success" onClick={() => { setForm(row); setShowEdit(true); }}>
                            <FaEdit />
                          </Button>
                          <Button size="sm" variant="outline-danger" onClick={() => { setSelected(row); setShowDelete(true); }}>
                            <FaTrash />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>

        {/* Add Order Modal */}
        <Modal show={showAdd} onHide={() => setShowAdd(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Product ID</Form.Label>
                <Form.Control name="id" value={form.id} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Product</Form.Label>
                <Form.Control name="name" value={form.name} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Quantity</Form.Label>
                <Form.Control name="qty" value={form.qty} onChange={handleChange} type="number" />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Warehouse</Form.Label>
                <Form.Control name="warehouse" value={form.warehouse} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Vendors</Form.Label>
                <Form.Control name="vendors" value={form.vendors} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Amount</Form.Label>
                <Form.Control name="amount" value={form.amount} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Payment Type</Form.Label>
                <Form.Control name="payment" value={form.payment} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Date</Form.Label>
                <Form.Control name="date" value={form.date} onChange={handleChange} type="date" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAdd(false)}>
              Cancel
            </Button>
            <Button style={{ backgroundColor: "#002d4d", border: "none" }} onClick={handleAdd}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        {/* View Modal */}
        <Modal show={showView} onHide={() => setShowView(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>View Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selected && (
              <div>
                <p><b>Product ID:</b> {selected.id}</p>
                <p><b>Product:</b> {selected.name}</p>
                <p><b>Quantity:</b> {selected.qty}</p>
                <p><b>Warehouse:</b> {selected.warehouse}</p>
                <p><b>Vendors:</b> {selected.vendors}</p>
                <p><b>Amount:</b> {selected.amount}</p>
                <p><b>Payment Type:</b> {selected.payment}</p>
                <p><b>Date:</b> {selected.date}</p>
              </div>
            )}
          </Modal.Body>
        </Modal>

        {/* Edit Modal */}
        <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Product ID</Form.Label>
                <Form.Control name="id" value={form.id} onChange={handleChange} readOnly />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Product</Form.Label>
                <Form.Control name="name" value={form.name} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Quantity</Form.Label>
                <Form.Control name="qty" value={form.qty} onChange={handleChange} type="number" />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Warehouse</Form.Label>
                <Form.Control name="warehouse" value={form.warehouse} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Vendors</Form.Label>
                <Form.Control name="vendors" value={form.vendors} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Amount</Form.Label>
                <Form.Control name="amount" value={form.amount} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Payment Type</Form.Label>
                <Form.Control name="payment" value={form.payment} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Date</Form.Label>
                <Form.Control name="date" value={form.date} onChange={handleChange} type="date" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEdit(false)}>
              Cancel
            </Button>
            <Button style={{ backgroundColor: "#002d4d", border: "none" }} onClick={handleEdit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Delete Modal */}
        <Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this record?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDelete(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default PurchaseOrders;
