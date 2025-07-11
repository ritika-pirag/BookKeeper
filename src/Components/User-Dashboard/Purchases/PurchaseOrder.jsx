import React, { useState } from "react";
import { Container, Card, Table, Form, InputGroup, Button } from "react-bootstrap";

const purchaseOrders = [
  {
    name: "Lenovo IdeaPad 3",
    img: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png",
    amount: "$1000",
    qty: 40,
    instock: 30,
  },
  {
    name: "Beats Pro",
    img: "https://cdn-icons-png.flaticon.com/512/1048/1048927.png",
    amount: "$1500",
    qty: 25,
    instock: 18,
  },
  {
    name: "Nike Jordan",
    img: "https://cdn-icons-png.flaticon.com/512/1048/1048926.png",
    amount: "$1500",
    qty: 30,
    instock: 35,
  },
  {
    name: "Apple Series 5 Watch",
    img: "https://cdn-icons-png.flaticon.com/512/1048/1048930.png",
    amount: "$2000",
    qty: 28,
    instock: 30,
  },
  {
    name: "Amazon Echo Dot",
    img: "https://cdn-icons-png.flaticon.com/512/1048/1048931.png",
    amount: "$800",
    qty: 15,
    instock: 10,
  },
  {
    name: "Sanford Chair Sofa",
    img: "https://cdn-icons-png.flaticon.com/512/1048/1048932.png",
    amount: "$750",
    qty: 20,
    instock: 15,
  },
  {
    name: "Red Premium Satchel",
    img: "https://cdn-icons-png.flaticon.com/512/1048/1048933.png",
    amount: "$1300",
    qty: 35,
    instock: 40,
  },
];

const sortOptions = [
  "Last 7 Days",
  "Last 30 Days",
  "This Month",
  "This Year",
];

const OnlineOrders = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState(sortOptions[0]);

  const filtered = purchaseOrders.filter((row) =>
    row.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ background: "#f7f7f7", minHeight: "100vh", paddingBottom: 40 }}>
      <Container fluid className="py-4">
        <div style={{ fontWeight: 700, fontSize: 28, marginBottom: 0 }}>
          Purchase order
        </div>
        <div style={{ color: "#888", fontSize: 17, marginBottom: 24 }}>
          Manage your Purchase order
        </div>
        <Card className="mb-4" style={{ borderRadius: 14 }}>
          <Card.Body style={{ background: "#fff", borderRadius: 14 }}>
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-2 gap-2">
              <InputGroup style={{ maxWidth: 300 }}>
                <Form.Control
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    background: "#f7f7f7",
                    border: "1px solid #eee",
                    borderRadius: 8,
                    fontSize: 17,
                  }}
                />
              </InputGroup>
              <div className="d-flex align-items-center gap-2">
                <Form.Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    width: 200,
                    background: "#fff",
                    border: "1px solid #eee",
                    borderRadius: 8,
                    fontSize: 16,
                  }}
                >
                  {sortOptions.map((opt) => (
                    <option key={opt}>{`Sort By : ${opt}`}</option>
                  ))}
                </Form.Select>
              </div>
            </div>
            <div style={{ overflowX: "auto" }}>
              <Table
                responsive
                className="align-middle mb-0"
                style={{
                  minWidth: 900,
                  fontSize: 17,
                  background: "#fff",
                }}
              >
                <thead>
                  <tr>
                    <th>
                      <Form.Check type="checkbox" />
                    </th>
                    <th>Product</th>
                    <th>Purchased Amount</th>
                    <th>Purchased QTY</th>
                    <th>Instock QTY</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row, idx) => (
                    <tr key={row.name + idx}>
                      <td>
                        <Form.Check type="checkbox" />
                      </td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div
                            style={{
                              width: 38,
                              height: 38,
                              borderRadius: 8,
                              background: "#f5f5f5",
                              overflow: "hidden",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 13,
                              color: "#aaa",
                            }}
                          >
                            <img
                              src={row.img}
                              alt={row.name}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                              }}
                            />
                          </div>
                          <span>{row.name}</span>
                        </div>
                      </td>
                      <td>{row.amount}</td>
                      <td>{row.qty}</td>
                      <td>{row.instock}</td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center text-muted">
                        No records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default OnlineOrders;