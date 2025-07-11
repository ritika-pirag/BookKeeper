import React from "react";
import { Button, Offcanvas, Form } from "react-bootstrap";
import "./SettingModal.css";

const SettingModal = ({ show, handleClose }) => {
  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton className="border-bottom">
        <Offcanvas.Title className="fw-bold">Theme Customizer</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <small className="text-muted">Choose your themes & layouts etc.</small>

        {/* Layouts */}
        <div className="mt-4">
          <h6 className="fw-semibold">Select Layouts</h6>
          <div className="d-flex gap-3 mt-2">
            <img src="/layout-default.png" alt="Default" className="layout-img border border-primary rounded" />
            <img src="/layout-mini.png" alt="Mini" className="layout-img rounded" />
            <img src="/layout-no-header.png" alt="Without Header" className="layout-img rounded" />
          </div>
        </div>

        {/* Layout Width */}
        <div className="mt-4">
          <h6 className="fw-semibold">Layout Width</h6>
          <div className="d-flex gap-3 mt-2">
            <Button variant="outline-primary" size="sm">Fluid Layout</Button>
            <Button variant="outline-secondary" size="sm">Boxed Layout</Button>
          </div>
        </div>

        {/* Top Bar Color */}
        <div className="mt-4">
          <h6 className="fw-semibold">Top Bar Color</h6>
          <div className="d-flex flex-wrap gap-2 mt-2">
            {["#ffffff", "#000000", "#6c757d", "#0d6efd", "#6610f2", "#20c997", "#6366f1"].map((color, index) => (
              <div key={index} className="color-box rounded" style={{ backgroundColor: color }}></div>
            ))}
          </div>

          {/* Gradient Colors */}
          <div className="d-flex flex-wrap gap-2 mt-2">
            {["#0d6efd", "#6610f2", "#6f42c1", "#20c997", "#d63384", "#6f42c1"].map((color, index) => (
              <div key={index} className="color-box rounded" style={{ background: `linear-gradient(45deg, ${color}, #ffffff)` }}></div>
            ))}
          </div>
        </div>

        {/* Sidebar Color */}
        <div className="mt-4">
          <h6 className="fw-semibold">Sidebar Color</h6>
          <div className="d-flex flex-wrap gap-2 mt-2">
            {["#343a40", "#f8f9fa", "#6f42c1", "#d63384", "#198754"].map((color, index) => (
              <div key={index} className="color-box rounded" style={{ backgroundColor: color }}></div>
            ))}
          </div>

          {/* Gradient Colors */}
          <div className="d-flex flex-wrap gap-2 mt-2">
            {["#0d6efd", "#6610f2", "#6f42c1", "#20c997", "#d63384", "#6f42c1"].map((color, index) => (
              <div key={index} className="color-box rounded" style={{ background: `linear-gradient(45deg, ${color}, #ffffff)` }}></div>
            ))}
          </div>
        </div>

        {/* Theme Mode */}
        <div className="mt-4">
          <h6 className="fw-semibold">Theme Mode</h6>
          <div className="d-flex gap-3 mt-2">
            <Form.Check label="Light" name="mode" type="radio" defaultChecked />
            <Form.Check label="Dark" name="mode" type="radio" />
            <Form.Check label="System" name="mode" type="radio" />
          </div>
        </div>

        {/* Sidebar Background */}
        {/* <div className="mt-4">
          <h6 className="fw-semibold">Sidebar Background</h6>
          <div className="d-flex gap-2 mt-2">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <img key={num} src={`/bg-${num}.jpg`} alt={`bg-${num}`} className="bg-img rounded" />
            ))}
          </div>
        </div> */}

        {/* Theme Actions */}
        <div className="mt-4 d-flex justify-content-between align-items-center">
          <Button variant="outline-secondary" size="sm">Reset</Button>
          <Button variant="warning" size="sm">Buy Product</Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SettingModal;
