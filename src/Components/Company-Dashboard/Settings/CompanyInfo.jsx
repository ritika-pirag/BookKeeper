import React, { useState } from 'react';
import { Form, Button, Container, Image } from 'react-bootstrap';
import { FaBuilding, FaImage, FaMapMarkerAlt } from 'react-icons/fa';

const CompanyInfo = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    companyEmail: '',
    phoneNumber: '',
    fax: '',
    website: false,
    companyImages: false,
    companyIcon: null,
    favicon: null,
    companyLogo: null,
    companyDarkLogo: null,
    addressInfo: false,
    address: '',
    country: '',
    city: '',
    state: '',
    portalCode: '',
    uploadImages: [false, false, false]
  });

  const [previewImages, setPreviewImages] = useState({
    companyIcon: null,
    favicon: null,
    companyLogo: null,
    companyDarkLogo: null
  });

  const countryOptions = [
    { value: '', label: 'Select' },
    { value: 'USA', label: 'USA' },
    { value: 'India', label: 'India' },
    { value: 'French', label: 'French' },
    { value: 'Australia', label: 'Australia' }
  ];

  const stateOptions = [
    { value: '', label: 'Select' },
    { value: 'Alaska', label: 'Alaska' },
    { value: 'Mexico', label: 'Mexico' },
    { value: 'Tasmania', label: 'Tasmania' }
  ];

  const cityOptions = [
    { value: '', label: 'Select' },
    { value: 'Anchorage', label: 'Anchorage' },
    { value: 'Tijuana', label: 'Tijuana' },
    { value: 'Hobart', label: 'Hobart' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImages(prev => ({
          ...prev,
          [name]: reader.result
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const uploadButtonStyle = {
    backgroundColor: '#002d4d',
    borderColor: '#002d4d',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px'
  };

  const previewImageStyle = {
    width: '100px',
    height: '100px',
    objectFit: 'contain',
    borderRadius: '6px',
    border: '1px solid #ddd',
    backgroundColor: '#f9f9f9',
    padding: '4px'
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '20px 0' }}>
      <Container className="p-4" style={{ maxWidth: '100%' }}>
        <h1 className="mb-3" style={{ fontSize: '24px', fontWeight: '600' }}>Settings</h1>
        <p className="mb-4 text-muted">Manage your settings on portal.</p>

        <div className="bg-white p-4 rounded shadow-sm">
          <h2 className="mb-4" style={{ fontSize: '20px', fontWeight: '600' }}>Company Settings</h2>

          {/* Company Information */}
          <Form.Group className="mb-4">
            <div className="d-flex align-items-center mb-3">
              <FaBuilding className="me-2" style={{ color: '#002d4d' }} />
              <h5 style={{ marginBottom: 0 }}>Company Information</h5>
            </div>
            <Form.Control type="text" placeholder="Company Name *" className="mb-3" />
            <Form.Control type="email" placeholder="Company Email Address *" className="mb-3" />
            <Form.Control type="tel" placeholder="Phone Number *" className="mb-3" />
            <Form.Control type="text" placeholder="Fax *" className="mb-3" />
            <Form.Control type="text" placeholder="Website *" className="mb-3" />
          </Form.Group>

          <hr className="my-4" />

          {/* Company Images Section */}
          <div className="d-flex align-items-center mb-3">
            <FaImage className="me-2" style={{ color: '#002d4d' }} />
            <h5 style={{ marginBottom: 0 }}>Company Images</h5>
          </div>

          {/* Upload Sections */}
          {["companyIcon", "favicon", "companyLogo", "companyDarkLogo"].map((field) => (
            <Form.Group className="mb-4" key={field}>
              <Form.Label className="fw-bold d-block mb-2">
                {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </Form.Label>
              <div className="d-flex align-items-center">
                <Button as="label" htmlFor={`${field}-upload`} style={uploadButtonStyle}>
                  Choose File
                  <Form.Control
                    type="file"
                    id={`${field}-upload`}
                    className="d-none"
                    name={field}
                    onChange={handleChange}
                    accept="image/*"
                  />
                </Button>
                {previewImages[field] && (
                  <Image
                    src={previewImages[field]}
                    alt={`${field} Preview`}
                    style={previewImageStyle}
                  />
                )}
              </div>
              <Form.Text className="text-muted">
                Upload {field.replace(/([A-Z])/g, ' $1').toLowerCase()} of your company
              </Form.Text>
            </Form.Group>
          ))}

          {/* Address Information */}
          <div className="d-flex align-items-center mb-3">
            <FaMapMarkerAlt className="me-2" style={{ color: '#002d4d' }} />
            <h5 style={{ marginBottom: 0 }}>Address Information</h5>
          </div>

          <Form.Group className="mb-4">
            <Form.Control as="textarea" rows={3} placeholder="Address *" />
          </Form.Group>

          {/* Country and City */}
          <div className="row mb-4">
            <div className="col-md-6 mb-3 mb-md-0">
              <Form.Label className="fw-bold">Country *</Form.Label>
              <Form.Select name="country" value={formData.country} onChange={handleChange}>
                {countryOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </Form.Select>
            </div>
            <div className="col-md-6">
              <Form.Label className="fw-bold">City *</Form.Label>
              <Form.Select name="city" value={formData.city} onChange={handleChange}>
                {cityOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </Form.Select>
            </div>
          </div>

          {/* State and Portal Code */}
          <div className="row mb-4">
            <div className="col-md-6 mb-3 mb-md-0">
              <Form.Label className="fw-bold">State *</Form.Label>
              <Form.Select name="state" value={formData.state} onChange={handleChange}>
                {stateOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </Form.Select>
            </div>
            <div className="col-md-6">
              <Form.Label className="fw-bold">Portal Code *</Form.Label>
              <Form.Control
                type="text"
                name="portalCode"
                value={formData.portalCode}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-end mt-4">
            <Button variant="outline-secondary" className="me-3 px-4 py-2">Cancel</Button>
            <Button
              className="px-4 py-2"
              style={{
                borderRadius: '4px',
                backgroundColor: '#002d4d',
                borderColor: '#002d4d',
                border: 'none',
                color: '#fff'
              }}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CompanyInfo;
