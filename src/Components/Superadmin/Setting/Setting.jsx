import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

const Setting = () => {
  const [settings, setSettings] = useState({
    siteName: 'My Dashboard',
    email: 'admin@example.com',
    themeColor: 'light',
    notifications: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert('Settings saved!');
    // Save logic here (e.g., API or localStorage)
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">Settings</h5>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSave}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="siteName">
                  <Form.Label>Site Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="siteName"
                    value={settings.siteName}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="email">
                  <Form.Label>Admin Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={settings.email}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="themeColor">
                  <Form.Label>Theme</Form.Label>
                  <Form.Select
                    name="themeColor"
                    value={settings.themeColor}
                    onChange={handleChange}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="blue">Blue</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6} className="d-flex align-items-center mt-4">
                <Form.Check
                  type="switch"
                  id="notifications"
                  label="Enable Notifications"
                  name="notifications"
                  checked={settings.notifications}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <div className="text-end">
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Setting;
