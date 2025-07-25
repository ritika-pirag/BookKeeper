import React, { useState } from "react";
import { Button, Collapse, Card } from "react-bootstrap";
import { FaTimes, FaCheck } from "react-icons/fa";

const Settings = ({ onClose }) => {
  const [layoutOpen, setLayoutOpen] = useState(true);
  const [widthOpen, setWidthOpen] = useState(true);
  const [topbarOpen, setTopbarOpen] = useState(true);

  const [selectedLayout, setSelectedLayout] = useState("Default");
  const [selectedWidth, setSelectedWidth] = useState("Fluid");
  const [selectedTopbar, setSelectedTopbar] = useState("#1f2d3d");

  const layoutOptions = [
    {
      name: "Default",
      img: "https://i.ibb.co/x8MX5hr/layout-default.png", // Replace with actual layout image
    },
    {
      name: "Mini",
      img: "https://i.ibb.co/hfLRFbJ/layout-mini.png", // Replace with actual layout image
    },
    {
      name: "Without Header",
      img: "https://i.ibb.co/kDrz3mC/layout-no-header.png", // Replace with actual layout image
    },
  ];

  const solidColors = [
    "#1f2d3d", "#ffffff", "#f5f5f5", "#343a40",
    "#0d6efd", "#6f42c1", "#20c997", "#5e35b1"
  ];

  const gradientColors = [
    "linear-gradient(to right, #1e3c72, #2a5298)",
    "linear-gradient(to right, #6a11cb, #2575fc)",
    "linear-gradient(to right, #20e2d7, #0ed2f7)",
    "linear-gradient(to right, #f64f59, #c471ed)",
    "linear-gradient(to right, #ff6a00, #ee0979)",
  ];

  const renderColorBox = (color, selected, setSelected) => (
    <div
      key={color}
      onClick={() => setSelected(color)}
      style={{
        background: color,
        width: 32,
        height: 32,
        borderRadius: "4px",
        border: selected === color ? "2px solid #4caf50" : "1px solid #ccc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      {selected === color && <FaCheck style={{ color: "#fff", fontSize: 12 }} />}
    </div>
  );

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "350px",
        height: "100vh",
        backgroundColor: "#fff",
        boxShadow: "-2px 0 8px rgba(0,0,0,0.15)",
        zIndex: 1050,
        overflowY: "auto",
      }}
    >
      {/* Header */}
      <div style={{ backgroundColor: "#0a1a2f", padding: "1rem", color: "#fff" }}>
        <div className="d-flex justify-content-between align-items-center">
          <strong>Theme Customizer</strong>
          <Button
            variant="light"
            size="sm"
            style={{ borderRadius: "50%" }}
            onClick={onClose}
          >
            <FaTimes />
          </Button>
        </div>
        <div style={{ fontSize: "0.85rem" }}>Choose your themes & layouts etc.</div>
      </div>

      <div style={{ padding: "1rem" }}>
        {/* Layout Selection */}
        <Card className="mb-3">
          <Card.Header
            style={{ cursor: "pointer" }}
            onClick={() => setLayoutOpen(!layoutOpen)}
          >
            Select Layouts
          </Card.Header>
          <Collapse in={layoutOpen}>
            <div className="p-3 d-flex gap-3">
              {layoutOptions.map((layout) => (
                <div
                  key={layout.name}
                  className="text-center"
                  onClick={() => setSelectedLayout(layout.name)}
                  style={{ position: "relative", cursor: "pointer" }}
                >
                  <img
                    src={layout.img}
                    alt={layout.name}
                    className={`border rounded ${
                      selectedLayout === layout.name ? "border-success" : ""
                    }`}
                    style={{ width: 60, height: 40 }}
                  />
                  <div style={{ fontSize: 12 }}>{layout.name}</div>
                  {selectedLayout === layout.name && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        border: "2px solid #4caf50",
                        borderRadius: 5,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </Collapse>
        </Card>

        {/* Layout Width */}
        <Card className="mb-3">
          <Card.Header
            style={{ cursor: "pointer" }}
            onClick={() => setWidthOpen(!widthOpen)}
          >
            Layout Width
          </Card.Header>
          <Collapse in={widthOpen}>
            <div className="p-3 d-flex gap-2">
              <Button
                variant={selectedWidth === "Fluid" ? "secondary" : "outline-secondary"}
                onClick={() => setSelectedWidth("Fluid")}
              >
                Fluid Layout
              </Button>
              <Button
                variant={selectedWidth === "Boxed" ? "secondary" : "outline-secondary"}
                onClick={() => setSelectedWidth("Boxed")}
              >
                Boxed Layout
              </Button>
            </div>
          </Collapse>
        </Card>

        {/* Top Bar Color */}
        <Card className="mb-3">
          <Card.Header
            style={{ cursor: "pointer" }}
            onClick={() => setTopbarOpen(!topbarOpen)}
          >
            Top Bar Color
          </Card.Header>
          <Collapse in={topbarOpen}>
            <div className="p-3">
              <div className="mb-2 fw-bold">Solid Colors</div>
              <div className="d-flex flex-wrap gap-2 mb-3">
                {solidColors.map((color) =>
                  renderColorBox(color, selectedTopbar, setSelectedTopbar)
                )}
              </div>
              <div className="mb-2 fw-bold">Gradient Colors</div>
              <div className="d-flex flex-wrap gap-2">
                {gradientColors.map((color) =>
                  renderColorBox(color, selectedTopbar, setSelectedTopbar)
                )}
              </div>
            </div>
          </Collapse>
        </Card>

        {/* Footer Buttons */}
        <div className="d-flex justify-content-between">
          <Button variant="outline-secondary">🔄 Reset</Button>
          <Button style={{ backgroundColor: "#ff8c00", color: "#fff", border: "none" }}>
            🛒 Buy Product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
