import React from "react";
import "./CompanyDashboard.css"
import {
  Card,
  Row,
  Col,
  Table,
  Dropdown,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import {
  FaUser,
  FaUserCheck,
  FaFileInvoice,
  FaFileInvoiceDollar,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { BsBagDashFill } from "react-icons/bs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CompanyDashboard = () => {
  const summaryCards = [
    {
      label: "Total Purchase Due",
      amount: "$307,144",
      icon: <BsBagDashFill size={30} className="text-warning" />,
      color: "#fff3cd",
    },
    {
      label: "Total Sales Due",
      amount: "$4,385",
      icon: <FaFileInvoiceDollar size={30} className="text-success" />,
      color: "#d4edda",
    },
    {
      label: "Total Sale Amount",
      amount: "$385,656.50",
      icon: <FaFileInvoice size={30} className="text-info" />,
      color: "#cce5ff",
    },
    {
      label: "Total Expense",
      amount: "$40,000",
      icon: <FaFileInvoiceDollar size={30} className="text-danger" />,
      color: "#f8d7da",
    },
  ];

  const stats = [
    {
      label: "Customers",
      count: 100,
      bg: "#FFE8CC",            
      icon: <FaUser size={28} className="text-warning" />
    },
    {
      label: "Suppliers",
      count: 110,
      bg: "#D0EBFF",            
      icon: <FaUserCheck size={28} className="text-info" />
    },
    {
      label: "Purchase Invoice",
      count: 150,
      bg: "#E3D7FF",             
      icon: <FaFileInvoice size={28} className="text-primary" />
    },
    {
      label: "Sales Invoice",
      count: 170,
      bg: "#D8F5E8",            
      icon: <FaFileInvoiceDollar size={28} className="text-success" />
    },
  ];
  
  const data = [
    { name: "Jan", Sales: 120, Purchase: 100 },
    { name: "Feb", Sales: 200, Purchase: 150 },
    { name: "Mar", Sales: 300, Purchase: 180 },
    { name: "Apr", Sales: 290, Purchase: 100 },
    { name: "May", Sales: 140, Purchase: 40 },
    { name: "Jun", Sales: 60, Purchase: 30 },
    { name: "Jul", Sales: 200, Purchase: 90 },
    { name: "Aug", Sales: 250, Purchase: 110 },
    { name: "Sep", Sales: 100, Purchase: 70 },
  ];

  const products = [
    { id: 1, name: "Lenevo 3rd Generation",    price: "$12,500", dateAdded: "2025-06-15" },
    { id: 2, name: "Bold V3.2",                 price: "$1,600",  dateAdded: "2025-06-20" },
    { id: 3, name: "Nike Jordan",              price: "$2,000",  dateAdded: "2025-06-25" },
    { id: 4, name: "Apple Series 5 Watch",     price: "$800",    dateAdded: "2025-07-01" },
    { id: 5, name: "Samsung Galaxy S21",       price: "$1,200",  dateAdded: "2025-07-05" },
    { id: 6, name: "Dell XPS 13 Laptop",       price: "$1,400",  dateAdded: "2025-07-08" },
    { id: 7, name: "Sony WH-1000XM4 Headphones",price: "$300",    dateAdded: "2025-07-10" },
    { id: 8, name: "GoPro HERO9 Black",        price: "$350",    dateAdded: "2025-07-12" },
  ];
  
  const expiredProducts = [
    {
      id: 1,
      name: "Red Premium Handy",
      sku: "PT006",
      mfg: "17 Jan 2023",
      exp: "29 Mar 2023",
      img: "https://i.imgur.com/XSA2Oom.png",
    },
    {
      id: 2,
      name: "Iphone 14 Pro",
      sku: "PT007",
      mfg: "22 Feb 2023",
      exp: "04 Apr 2023",
      img: "https://i.imgur.com/YZ8fT71.png",
    },
    {
      id: 3,
      name: "Black Slim 200",
      sku: "PT008",
      mfg: "18 Mar 2023",
      exp: "13 May 2023",
      img: "https://i.imgur.com/Xz2MEpO.png",
    },
    {
      id: 4,
      name: "Woodcraft Sandal",
      sku: "PT009",
      mfg: "29 Mar 2023",
      exp: "27 May 2023",
      img: "https://i.imgur.com/IDFsXDu.png",
    },
    {
      id: 5,
      name: "Apple Series 5 Watch",
      sku: "PT010",
      mfg: "24 Mar 2023",
      exp: "26 May 2023",
      img: "https://i.imgur.com/Vj1KQ7e.png",
    },
  ];

  return (
<div className="container-fluid mt-3 mt-sm-3" >
  {/* Summary Cards */}
  <Row className="g-4">
    {summaryCards.map((card, i) => (
      <Col md={3} key={i}>
        <Card className="shadow-sm border-0 rounded-3" style={{ backgroundColor: card.color }}>
          <Card.Body className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="fw-semibold mb-1 text-dark">{card.amount}</h5>
              <div className="text-muted small">{card.label}</div>
            </div>
            <div className="bg-white rounded-circle p-2 d-flex align-items-center justify-content-center shadow-sm">
              {card.icon}
            </div>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>

  {/* Stats Cards */}
  <Row className="my-4 g-4">
    {stats.map((stat, i) => (
      <Col md={3} key={i}>
        <Card className="shadow-sm border-0 p-3 rounded-3 text-black" style={{ backgroundColor: stat.bg }}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4 className="fw-bold mb-0">{stat.count}</h4>
              <div className="small">{stat.label}</div>
            </div>
            <div className="fs-3">{stat.icon}</div>
          </div>
        </Card>
      </Col>
    ))}
  </Row>

{/* Chart + Products */}
<Row className="g-4 align-items-stretch">
  {/* 📊 Sales & Purchase Report */}
  <Col md={8}>
    <Card
      className="h-100 border-0 shadow-sm rounded-4 p-4"
    //   style={{ backgroundColor: "#fff3cd" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <h6 className="fw-semibold mb-0" style={{ color: "#1a237e" }}>
          📊 Sales & Purchase Report
        </h6>
        <Dropdown>
          <Dropdown.Toggle
            variant="light"
            className="border rounded-3 shadow-sm"
            size="sm"
          >
            2025
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>2024</Dropdown.Item>
            <Dropdown.Item>2025</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <RechartTooltip />
          <Legend />
          <Bar dataKey="Sales" fill="#1a237e" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Purchase" fill="#53b2a5" radius={[4, 4, 0, 0]} /> {/* ✅ Updated Color */}
        </BarChart>
      </ResponsiveContainer>
    </Card>
  </Col>

  {/* 🛍️ Recently Added Products */}
  <Col md={4}>
    <Card
      className="h-100 shadow-sm border-0 rounded-4 p-4"
    //   style={{ backgroundColor: "#fff3cd" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-semibold mb-0" style={{ color: "#1a237e" }}>
          🛍️ Recently Added Products
        </h6>
        <a href="#" className="small text-decoration-none text-primary">
          View All
        </a>
      </div>

      <div style={{ overflowY: "auto", maxHeight: "300px" }}>
        <Table borderless hover responsive className="mb-0">
          <thead>
            <tr>
              <th className="text-secondary small">#</th>
              <th className="text-secondary small">Products</th>
              <th className="text-secondary small text-end">Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="align-middle">
                <td className="small">{p.id}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <span className="small">{p.name}</span>
                  </div>
                </td>
                <td className="small text-end">{p.price.replace(/\$/, "")}</td>
              </tr>
            ))}
          </tbody>
        </Table>
 

      </div>
    </Card>
  </Col>
</Row>




  {/* Expired Products */}
  <Row className="g-4 mt-2">
    <Col md={12}>
      <Card className="bg-white shadow-sm rounded-3 p-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="fw-semibold mb-0">Expired Products</h6>
          <a href="#" className="text-decoration-none small text-primary">View All</a>
        </div>
        <Table hover responsive className="mt-3 mb-0">
          <thead className="table-light text-white">
            <tr className="align-middle">
              <th className="py-3">
                <input type="checkbox text-light" className="form-check-input" />
              </th>
              <th  className="py-3">Product</th>
              <th className="py-3">SKU</th>
              <th className="py-3"> MFG Date</th>
              <th className="py-3">EXP Date</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {expiredProducts.map((item) => (
              <tr key={item.id} className="align-middle">
                <td>
                  <input type="checkbox" className="form-check-input" />
                </td>
                <td className="d-flex align-items-center">
                  <img
                    src={item.img}
                    alt="product"
                    className="me-2 rounded"
                    style={{ width: "40px", height: "40px", objectFit: "cover" }}
                  />
                  <span>{item.name}</span>
                </td>
                <td>{item.sku}</td>
                <td>{item.mfg}</td>
                <td>{item.exp}</td>
                <td>
                  <div className="d-flex gap-2">
                  <button
                                                className="btn outline-primary  btn-sm text-warning py-1 px-1"
                                                // onClick={() => handleEditClick(item)}
                                            >
                                                <FaEdit size={16} />
                                            </button>
                    <button
                                                className="btn outline-primary btn-sm text-danger py-2 px-1"
                                                // onClick={() => handleDeleteClick(item)}
                                            >
                                                <FaTrash size={16} />
                                            </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
               {/* Pagination */}
<div className="d-flex justify-content-between align-items-center mt-3 px-3">
  <span className="small text-muted">
    Showing 1 to {expiredProducts.length} of {expiredProducts.length} results
  </span>

  <nav>
    <ul className="pagination pagination-sm mb-0">
      <li className="page-item disabled">
        <button className="page-link rounded-start">&laquo;</button>
      </li>
      <li className="page-item active">
        <button className="page-link" style={{ backgroundColor: '#3daaaa', borderColor: '#3daaaa' }}>1</button>
      </li>
      <li className="page-item">
        <button className="page-link">2</button>
      </li>
      <li className="page-item">
        <button className="page-link rounded-end">&raquo;</button>
      </li>
    </ul>
  </nav>
</div>
      </Card>
    </Col>
  </Row>
</div>

  );
}; 

export default CompanyDashboard;
