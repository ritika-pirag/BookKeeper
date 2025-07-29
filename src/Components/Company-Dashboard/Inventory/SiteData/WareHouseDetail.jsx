import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Table, Badge, Dropdown } from "react-bootstrap";
import { FaArrowLeft, FaWarehouse, FaBoxes, FaFilter } from "react-icons/fa";

const warehouseProductsMap = {
    "1": [
        {
            category: "Electronics",
            products: [
                { name: "TV", stock: 20 },
                { name: "Speakers", stock: 15 },
                { name: "Camera", stock: 10 },
            ],
        },
        {
            category: "Furniture",
            products: [
                { name: "Chair", stock: 50 },
                { name: "Desk", stock: 30 },
            ],
        },
    ],
    "2": [
        {
            category: "Food",
            products: [
                { name: "Rice", stock: 100 },
                { name: "Wheat", stock: 80 },
            ],
        },
        {
            category: "Beverages",
            products: [
                { name: "Soda", stock: 60 },
                { name: "Juice", stock: 40 },
            ],
        },
    ],
};

const WareHouseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [warehouse, setWarehouse] = useState(null);
    const [productData, setProductData] = useState([]);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        const dummyData = [
            { _id: "1", name: "Central Warehouse", location: "Delhi" },
            { _id: "2", name: "North Zone", location: "Noida" },
            { _id: "3", name: "South Depot", location: "Bangalore" },
        ];
        const wh = dummyData.find((w) => w._id === id);
        setWarehouse(wh || null);
        setProductData(warehouseProductsMap[id] || []);
    }, [id]);

    const handleFilterChange = (category) => setFilter(category);

    const filteredProducts = productData.flatMap((cat) =>
        filter === "All" || cat.category === filter
            ? cat.products.map((product) => ({
                category: cat.category,
                name: product.name,
                stock: product.stock,
            }))
            : []
    );

    const getCategoryBadgeColor = (category) => {
        const map = {
            Electronics: "primary",
            Furniture: "secondary",
            Food: "success",
            Beverages: "warning",
        };
        return map[category] || "info";
    };

    return (
        <div className="container py-5">
            <div className="d-flex align-items-center justify-content-between mb-4">
                <Button
                    variant="outline-dark"
                    onClick={() => navigate(-1)}
                    className="d-flex align-items-center rounded-pill px-3 shadow-sm"
                >
                    <FaArrowLeft className="me-2" />
                    Back
                </Button>
                <h3 className="fw-bold mb-0 text-primary-emphasis d-flex">
                    <FaBoxes className="me-2 text-warning" />
                    <span className="text-gradient">Stock by Warehouse</span>
                </h3>
            </div>

            {warehouse ? (
                <>
                    <Card className="shadow-lg border-0 mb-4">
                        <Card.Body className="bg-light">
                            <h4 className="fw-bold text-primary mb-1 d-flex align-items-center">
                                <FaWarehouse className="me-2" />
                                {warehouse.name}
                            </h4>
                            <p className="mb-0 text-muted">
                                <strong>📍 Location:</strong> {warehouse.location}
                            </p>
                        </Card.Body>
                    </Card>

                    <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
                        <h5 className="fw-bold text-secondary">
                            📁 Products by Categories
                        </h5>
                        <Dropdown>
                            <Dropdown.Toggle variant="outline-primary" id="dropdown-basic" className="d-flex align-items-center">
                                <FaFilter className="me-2" />
                                {filter === "All" ? "All Categories" : filter}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleFilterChange("All")}>
                                    All
                                </Dropdown.Item>
                                {productData.map((cat) => (
                                    <Dropdown.Item
                                        key={cat.category}
                                        onClick={() => handleFilterChange(cat.category)}
                                    >
                                        {cat.category}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <Card className="shadow border-0 mb-4">
                        <Card.Header className="bg-white border-bottom">
                            <div className="d-flex justify-content-between">
                                <strong>Inventory List</strong>
                                <div className="text-end">
                                    <strong>Total Stock: </strong>
                                    <Badge bg="dark" pill className="px-3 py-2">
                                        {filteredProducts.reduce((sum, item) => sum + item.stock, 0)}
                                    </Badge>
                                </div>
                            </div>
                        </Card.Header>

                        <Card.Body className="p-0">
                            <Table striped hover responsive className="mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th style={{ width: "10%" }}>#</th>
                                        <th>Category</th>
                                        <th>Product</th>
                                        <th>Stock</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProducts.length > 0 ? (
                                        filteredProducts.map((item, index) => (
                                            <tr key={index}>
                                                <td className="text-muted">{index + 1}</td>
                                                <td>
                                                    <Badge bg={getCategoryBadgeColor(item.category)}>
                                                        {item.category}
                                                    </Badge>
                                                </td>
                                                <td className="fw-semibold">{item.name}</td>
                                                <td>
                                                    <Badge
                                                        bg={item.stock > 30 ? "success" : item.stock > 10 ? "warning" : "danger"}
                                                        className="px-3 py-2 rounded-pill"
                                                    >
                                                        {item.stock}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center text-muted py-4">
                                                No products found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </>
            ) : (
                <Card className="text-center p-5 border-0 shadow-sm bg-light">
                    <p className="text-muted">Warehouse not found.</p>
                </Card>
            )}
        </div>
    );
};

export default WareHouseDetail;
