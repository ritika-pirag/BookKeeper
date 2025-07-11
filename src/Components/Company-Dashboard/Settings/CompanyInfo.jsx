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

  // Country options from image1
  const countryOptions = [
    { value: '', label: 'Select' },
    { value: 'USA', label: 'USA' },
    { value: 'India', label: 'India' },
    { value: 'French', label: 'French' },
    { value: 'Australia', label: 'Australia' }
  ];

  // State options from image2
  const stateOptions = [
    { value: '', label: 'Select' },
    { value: 'Alaska', label: 'Alaska' },
    { value: 'Mexico', label: 'Mexico' },
    { value: 'Tasmania', label: 'Tasmania' }
  ];

  // City options from image3
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
      
      // Create preview for the image
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

  const handleImageCheckboxChange = (index) => {
    const newUploadImages = [...formData.uploadImages];
    newUploadImages[index] = !newUploadImages[index];
    setFormData({ ...formData, uploadImages: newUploadImages });
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
    <FaBuilding className="me-2" style={{ color: '#fd7e14' }} />
    <h5 style={{ marginBottom: 0 }}>Company Information</h5>
  </div>
  <Form.Control
    type="text"
    placeholder="Company Name *"
    className="mb-3"
    style={{ padding: '10px', borderRadius: '4px' }}
  />
  <Form.Control
    type="email"
    placeholder="Company Email Address *"
    className="mb-3"
    style={{ padding: '10px', borderRadius: '4px' }}
  />
  <Form.Control
    type="tel"
    placeholder="Phone Number *"
     className="mb-3"
    style={{ padding: '10px', borderRadius: '4px' }}
  />
    <Form.Control
    type="email"
    placeholder="Fax *"
    className="mb-3"
    style={{ padding: '10px', borderRadius: '4px' }}
  />
    <Form.Control
    type="email"
    placeholder="Website *"
    className="mb-3"
    style={{ padding: '10px', borderRadius: '4px' }}
  />
  
</Form.Group>


          <hr className="my-4" />


          {/* Company Images Section */}
       <div className="d-flex align-items-center mb-3">
  <FaImage className="me-2" style={{ color: '#fd7e14' }} />
  <h5 style={{ marginBottom: 0 }}>Company Images</h5>
</div>

          <Form.Group className="mb-4">
            <Form.Label className="d-block mb-2">Company Icon</Form.Label>
            <div className="d-flex align-items-center">
              <Button 
                as="label"
                htmlFor="company-icon-upload"
                style={{
                  backgroundColor: '#fd7e14',
                  borderColor: '#fd7e14',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginRight: '10px'
                }}
              >
                Choose File
                <Form.Control
                  type="file"
                  id="company-icon-upload"
                  className="d-none"
                  name="companyIcon"
                  onChange={handleChange}
                  accept="image/*"
                />
              </Button>
              {previewImages.companyIcon && (
                <Image 
                  src={previewImages.companyIcon} 
                  alt="Company Icon Preview" 
                  style={{ 
                    maxWidth: '50px', 
                    maxHeight: '50px',
                    borderRadius: '4px'
                  }} 
                />
              )}
            </div>
            <Form.Text className="text-muted">Upload icon of your Company</Form.Text>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold d-block mb-2">Favicon</Form.Label>
            <div className="d-flex align-items-center">
              <Button 
                as="label"
                htmlFor="favicon-upload"
                style={{
                  backgroundColor: '#fd7e14',
                  borderColor: '#fd7e14',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginRight: '10px'
                }}
              >
                Choose File
                <Form.Control
                  type="file"
                  id="favicon-upload"
                  className="d-none"
                  name="favicon"
                  onChange={handleChange}
                  accept="image/*"
                />
              </Button>
              {previewImages.favicon && (
                <Image 
                  src={previewImages.favicon} 
                  alt="Favicon Preview" 
                  style={{ 
                    maxWidth: '50px', 
                    maxHeight: '50px',
                    borderRadius: '4px'
                  }} 
                />
              )}
            </div>
            <Form.Text className="text-muted">Upload Favicon of your Company</Form.Text>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold d-block mb-2">Company Logo</Form.Label>
            <div className="d-flex align-items-center">
              <Button 
                as="label"
                htmlFor="company-logo-upload"
                style={{
                  backgroundColor: '#fd7e14',
                  borderColor: '#fd7e14',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginRight: '10px'
                }}
              >
                Choose File
                <Form.Control
                  type="file"
                  id="company-logo-upload"
                  className="d-none"
                  name="companyLogo"
                  onChange={handleChange}
                  accept="image/*"
                />
              </Button>
              {previewImages.companyLogo && (
                <Image 
                  src={previewImages.companyLogo} 
                  alt="Company Logo Preview" 
                  style={{ 
                    maxWidth: '50px', 
                    maxHeight: '50px',
                    borderRadius: '4px'
                  }} 
                />
              )}
            </div>
            <Form.Text className="text-muted">Upload Logo of your Company</Form.Text>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold d-block mb-2">Company Dark Logo</Form.Label>
            <div className="d-flex align-items-center">
              <Button 
                as="label"
                htmlFor="company-dark-logo-upload"
                style={{
                  backgroundColor: '#fd7e14',
                  borderColor: '#fd7e14',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginRight: '10px'
                }}
              >
                Choose File
                <Form.Control
                  type="file"
                  id="company-dark-logo-upload"
                  className="d-none"
                  name="companyDarkLogo"
                  onChange={handleChange}
                  accept="image/*"
                />
              </Button>
              {previewImages.companyDarkLogo && (
                <Image 
                  src={previewImages.companyDarkLogo} 
                  alt="Company Dark Logo Preview" 
                  style={{ 
                    maxWidth: '50px', 
                    maxHeight: '50px',
                    borderRadius: '4px'
                  }} 
                />
              )}
            </div>
            <Form.Text className="text-muted">Upload Logo of your Company</Form.Text>
          </Form.Group>

          {/* Address Information */}
      <div className="d-flex align-items-center mb-3">
  <FaMapMarkerAlt className="me-2" style={{ color: '#fd7e14' }} />
  <h5 style={{ marginBottom: 0 }}>Address Information</h5>
</div>

          <Form.Group className="mb-4">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Address*"
              style={{ padding: '10px', borderRadius: '4px' }}
            />
          </Form.Group>

          {/* Country and City */}
          <div className="row mb-4">
            <div className="col-md-6 mb-3 mb-md-0">
              <Form.Label className="fw-bold">Country *</Form.Label>
              <Form.Select 
                name="country"
                value={formData.country}
                onChange={handleChange}
                style={{ padding: '10px', borderRadius: '4px' }}
              >
                {countryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="col-md-6">
              <Form.Label className="fw-bold">City *</Form.Label>
              <Form.Select 
                name="city"
                value={formData.city}
                onChange={handleChange}
                style={{ padding: '10px', borderRadius: '4px' }}
              >
                {cityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </div>
          </div>

          {/* State and Portal Code */}
          <div className="row mb-4">
            <div className="col-md-6 mb-3 mb-md-0">
              <Form.Label className="fw-bold">State *</Form.Label>
              <Form.Select 
                name="state"
                value={formData.state}
                onChange={handleChange}
                style={{ padding: '10px', borderRadius: '4px' }}
              >
                {stateOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
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
                style={{ padding: '10px', borderRadius: '4px' }}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-end mt-4">
            <Button 
              variant="outline-secondary" 
              className="me-3 px-4 py-2"
              style={{ borderRadius: '4px', border: '1px solid #6c757d' }}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              className="px-4 py-2"
              style={{ 
                borderRadius: '4px', 
                backgroundColor: '#fd7e14', 
                borderColor: '#fd7e14',
                border: 'none' 
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