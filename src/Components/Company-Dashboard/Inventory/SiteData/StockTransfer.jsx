// import React, { useState, useEffect } from "react";
// import { Form, Button, Row, Col, Card, Table, ListGroup } from "react-bootstrap";

// const productOptions = [
//   "Product A",
//   "Product B",
//   "Product C",
//   "Product D",
//   "Box Large",
//   "Box Small",
//   "Tape",
//   "Glue"
// ];

// const StockTransfer = () => {
//   const [formData, setFormData] = useState({
//     receiptNo: "",
//     transferFrom: "NewYork Warehouse",
//     transferTo: "Mumbai Warehouse"
//   });

//   const [searchInput, setSearchInput] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [transferItems, setTransferItems] = useState([]);

//   useEffect(() => {
//     const autoNo = `TRF-${Date.now().toString().slice(-6)}`;
//     setFormData((prev) => ({ ...prev, receiptNo: autoNo }));
//   }, []);

//   useEffect(() => {
//     const filtered = productOptions.filter((item) =>
//       item.toLowerCase().includes(searchInput.toLowerCase())
//     );
//     setSuggestions(searchInput ? filtered : []);
//   }, [searchInput]);

//   const handleAddProduct = (nameFromList) => {
//     const name = nameFromList || searchInput.trim();
//     if (!name) return;
//     const already = transferItems.some((item) => item.name === name);
//     if (already) return;
//     setTransferItems((prev) => [...prev, { id: Date.now(), name, qty: "" }]);
//     setSearchInput("");
//     setSuggestions([]);
//   };

//   const updateQty = (id, qty) => {
//     setTransferItems((prev) =>
//       prev.map((item) =>
//         item.id === id
//           ? { ...item, qty: qty === "" ? "" : Math.max(1, parseInt(qty) || "") }
//           : item
//       )
//     );
//   };

//   const removeItem = (id) => {
//     setTransferItems((prev) => prev.filter((item) => item.id !== id));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.receiptNo || formData.transferFrom === formData.transferTo || transferItems.length === 0) {
//       alert("Please complete all required fields.");
//       return;
//     }
//     if (transferItems.some((item) => item.qty === "")) {
//       alert("Enter quantity for each product.");
//       return;
//     }
//     const payload = {
//       ...formData,
//       products: transferItems.map(({ name, qty }) => ({ name, quantity: qty }))
//     };
//     console.log("Submitted Payload:", payload);
//     // Send payload to backend here
//   };

//   return (
//     <div className="py-4 px-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
//       <Card className="p-4 w-100" style={{ backgroundColor: "#fff", borderRadius: 8 }}>
//         <h5 style={{ color: "#002d4d", marginBottom: 24 }}>📦 Stock Transfer</h5>

//         <Form onSubmit={handleSubmit}>
//           {/* Receipt No */}
//           <Row className="mb-3">
//             <Form.Label column sm={2}>Receipt No.</Form.Label>
//             <Col sm={10}>
//               <Form.Control
//                 type="text"
//                 name="receiptNo"
//                 value={formData.receiptNo}
//                 onChange={handleChange}
//                 required
//               />
//             </Col>
//           </Row>

//           {/* Transfer From */}
//           <Row className="mb-3">
//             <Form.Label column sm={2}>Transfer From</Form.Label>
//             <Col sm={10}>
//               <Form.Select name="transferFrom" value={formData.transferFrom} onChange={handleChange}>
//                 <option>NewYork Warehouse</option>
//                 <option>Delhi Warehouse</option>
//                 <option>Bangalore Warehouse</option>
//               </Form.Select>
//             </Col>
//           </Row>

//           {/* Transfer To */}
//           <Row className="mb-3">
//             <Form.Label column sm={2}>Transfer To</Form.Label>
//             <Col sm={10}>
//               <Form.Select name="transferTo" value={formData.transferTo} onChange={handleChange}>
//                 <option>Mumbai Warehouse</option>
//                 <option>Chennai Warehouse</option>
//                 <option>Kolkata Warehouse</option>
//               </Form.Select>
//             </Col>
//           </Row>

//           {/* Search Product */}
//           <Row className="mb-3">
//             <Form.Label column sm={2}>Search Product</Form.Label>
//             <Col sm={7} style={{ position: "relative" }}>
//               <Form.Control
//                 type="text"
//                 placeholder="Type product name"
//                 value={searchInput}
//                 onChange={(e) => setSearchInput(e.target.value)}
//                 autoComplete="off"
//               />
//               {suggestions.length > 0 && (
//                 <ListGroup style={{
//                   position: "absolute",
//                   zIndex: 1000,
//                   width: "100%",
//                   maxHeight: "200px",
//                   overflowY: "auto",
//                   boxShadow: "0px 2px 8px rgba(0,0,0,0.15)"
//                 }}>
//                   {suggestions.map((item, idx) => (
//                     <ListGroup.Item
//                       key={idx}
//                       action
//                       onClick={() => handleAddProduct(item)}
//                     >
//                       {item}
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>
//               )}
//             </Col>
//             <Col sm={3}>
//               <Button variant="secondary" onClick={() => handleAddProduct()}>+ Add Product</Button>
//             </Col>
//           </Row>

//           {/* Product Table */}
//           {transferItems.length > 0 && (
//             <Row className="mb-3">
//               <Col>
//                 <Table bordered striped hover>
//                   <thead>
//                     <tr>
//                       <th>#</th>
//                       <th>Product</th>
//                       <th>Quantity</th>
//                       <th>Remove</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {transferItems.map((item, index) => (
//                       <tr key={item.id}>
//                         <td>{index + 1}</td>
//                         <td>{item.name}</td>
//                         <td className="d-flex align-items-center gap-2">
//                           <Form.Control
//                             type="number"
//                             value={item.qty}
//                             min="1"
//                             placeholder="Qty"
//                             style={{ width: "80px" }}
//                             onChange={(e) => updateQty(item.id, e.target.value)}
//                           />
//                           <span style={{ fontSize: "0.9rem", color: "#666" }}>pcs</span>
//                         </td>
//                         <td>
//                           <Button variant="danger" size="sm" onClick={() => removeItem(item.id)}>X</Button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </Col>
//             </Row>
//           )}

//           {/* Submit Button */}
//           <div className="text-end">
//             <Button
//               type="submit"
//               style={{
//                 backgroundColor: "#002d4d",
//                 border: "none",
//                 padding: "8px 24px",
//                 fontWeight: 600
//               }}
//             >
//               Save Transfer
//             </Button>
//           </div>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default StockTransfer;



import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card, Table, ListGroup } from "react-bootstrap";

const productOptions = [
  "Product A",
  "Product B",
  "Product C",
  "Product D",
  "Box Large",
  "Box Small",
  "Tape",
  "Glue"
];

const StockTransfer = () => {
  const [formData, setFormData] = useState({
    receiptNo: "",
    transferFrom: "NewYork Warehouse",
    transferTo: "Mumbai Warehouse"
  });

  const [searchInput, setSearchInput] = useState("");
  const [transferItems, setTransferItems] = useState([]);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    const autoNo = `TRF-${Date.now().toString().slice(-6)}`;
    setFormData((prev) => ({ ...prev, receiptNo: autoNo }));
  }, []);

  const handleAddProduct = (nameFromList) => {
    const name = nameFromList || searchInput.trim();
    if (!name) return;
    const already = transferItems.some((item) => item.name === name);
    if (already) return;
    setTransferItems((prev) => [...prev, { id: Date.now(), name, qty: "" }]);
    setSearchInput(name); // Maintain input value to keep list visible
  };

  const updateQty = (id, qty) => {
    setTransferItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: qty === "" ? "" : Math.max(1, parseInt(qty) || "") }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setTransferItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.receiptNo ||
      formData.transferFrom === formData.transferTo ||
      transferItems.length === 0
    ) {
      alert("Please complete all required fields.");
      return;
    }
    if (transferItems.some((item) => item.qty === "")) {
      alert("Enter quantity for each product.");
      return;
    }
    const payload = {
      ...formData,
      products: transferItems.map(({ name, qty }) => ({
        name,
        quantity: qty
      }))
    };
    console.log("Submitted Payload:", payload);
    // Send payload to backend here
  };

  return (
    <div className="py-4 px-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Card className="p-4 w-100" style={{ backgroundColor: "#fff", borderRadius: 8 }}>
        <h5 style={{ color: "#002d4d", marginBottom: 24 }}>📦 Stock Transfer</h5>

        <Form onSubmit={handleSubmit}>
          {/* Receipt No */}
          <Row className="mb-3">
            <Form.Label column sm={2}>Receipt No.</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="receiptNo"
                value={formData.receiptNo}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>

          {/* Transfer From */}
          <Row className="mb-3">
            <Form.Label column sm={2}>Transfer From</Form.Label>
            <Col sm={10}>
              <Form.Select name="transferFrom" value={formData.transferFrom} onChange={handleChange}>
                <option>NewYork Warehouse</option>
                <option>Delhi Warehouse</option>
                <option>Bangalore Warehouse</option>
              </Form.Select>
            </Col>
          </Row>

          {/* Transfer To */}
          <Row className="mb-3">
            <Form.Label column sm={2}>Transfer To</Form.Label>
            <Col sm={10}>
              <Form.Select name="transferTo" value={formData.transferTo} onChange={handleChange}>
                <option>Mumbai Warehouse</option>
                <option>Chennai Warehouse</option>
                <option>Kolkata Warehouse</option>
              </Form.Select>
            </Col>
          </Row>

          {/* Search Product */}
          <Row className="mb-3">
            <Form.Label column sm={2}>Search Product</Form.Label>
            <Col sm={7} style={{ position: "relative" }}>
              <Form.Control
                type="text"
                placeholder="Type product name"
                value={searchInput}
                onFocus={() => setShowList(true)}
                onBlur={() => setTimeout(() => setShowList(false), 200)}
                onChange={(e) => setSearchInput(e.target.value)}
                autoComplete="off"
              />
              {showList && (
                <ListGroup style={{
                  position: "absolute",
                  zIndex: 1000,
                  width: "100%",
                  maxHeight: "200px",
                  overflowY: "auto",
                  boxShadow: "0px 2px 8px rgba(0,0,0,0.15)"
                }}>
                  {productOptions.map((item, idx) => (
                    <ListGroup.Item
                      key={idx}
                      action
                      onClick={() => handleAddProduct(item)}
                    >
                      {item}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Col>
            <Col sm={3}>
              <Button variant="secondary" onClick={() => handleAddProduct()}>+ Add Product</Button>
            </Col>
          </Row>

          {/* Product Table */}
          {transferItems.length > 0 && (
            <Row className="mb-3">
              <Col>
                <Table bordered striped hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transferItems.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td className="d-flex align-items-center gap-2">
                          <Form.Control
                            type="number"
                            value={item.qty}
                            min="1"
                            placeholder="Qty"
                            style={{ width: "80px" }}
                            onChange={(e) => updateQty(item.id, e.target.value)}
                          />
                          <span style={{ fontSize: "0.9rem", color: "#666" }}>pcs</span>
                        </td>
                        <td>
                          <Button variant="danger" size="sm" onClick={() => removeItem(item.id)}>X</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          )}

          {/* Submit Button */}
          <div className="text-end">
            <Button
              type="submit"
              style={{
                backgroundColor: "#002d4d",
                border: "none",
                padding: "8px 24px",
                fontWeight: 600
              }}
            >
              Save Transfer
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default StockTransfer;
