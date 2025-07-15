import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  const categories = [
    { _id: "1", category_name: "Smartphones" },
    { _id: "2", category_name: "Laptops" },
  ];

  const brands = [
    { _id: "1", brand_name: "Apple", category: { category_name: "Smartphones" } },
    { _id: "2", brand_name: "Samsung", category: { category_name: "Smartphones" } },
    { _id: "3", brand_name: "Dell", category: { category_name: "Laptops" } },
  ];

  const devices = [
    { _id: "1", device_name: "iPhone 13", brand: { brand_name: "Apple" } },
    { _id: "2", device_name: "Galaxy S22", brand: { brand_name: "Samsung" } },
    { _id: "3", device_name: "Dell XPS 13", brand: { brand_name: "Dell" } },
  ];

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    brand: "",
    description: "",
    IMEI: "",
    quantity: "",
    device: "",
    device_name: "",
    warranty: "No Warranty",
    warrantyPeriod: "",
    sku: "",
    images: [],
  });

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    setSelectedBrand("");
    setFormData({ ...formData, category: value });
  };

  const handleBrandChange = (e) => {
    const value = e.target.value;
    setSelectedBrand(value);
    setFormData({ ...formData, brand: value });
  };

  const handleDeviceChange = (e) => {
    const selectedDeviceId = e.target.value;
    const selectedDevice = devices.find((device) => device._id === selectedDeviceId);

    setFormData((prev) => ({
      ...prev,
      device: selectedDeviceId,
      device_name: selectedDevice?.device_name || "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: files }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Product:", formData);
    alert("Form submitted! Check console for output.");
  };

  return (
    <div className="container px-2 px-md-4 mt-4" style={{ maxWidth: "calc(100% - 220px)" }}>
      <div className="shadow p-4 bg-white rounded">
        {/* Back Button */}
        <button
          type="button"
          className="btn btn-outline-secondary mb-3"
          onClick={() => navigate("/company/product")}
        >
          ← Back
        </button>

        <h3 className="mb-4 fw-semibold">Add Product</h3>

        <form className="row g-3" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Category */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Category</label>
            <select
              className="form-control"
              value={selectedCategory}
              onChange={handleCategoryChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.category_name}>
                  {cat.category_name}
                </option>
              ))}
            </select>
          </div>

          {/* Brand */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Brand / Manufacturer</label>
            <select
              className="form-control"
              value={selectedBrand}
              onChange={handleBrandChange}
              disabled={!selectedCategory}
              required
            >
              <option value="">Select Brand</option>
              {brands
                .filter((b) => b.category.category_name === selectedCategory)
                .map((brand) => (
                  <option key={brand._id} value={brand.brand_name}>
                    {brand.brand_name}
                  </option>
                ))}
            </select>
          </div>

          {/* Device */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Device</label>
            <select
              className="form-control"
              name="device"
              onChange={handleDeviceChange}
              disabled={!selectedBrand}
            >
              <option value="">Select Device</option>
              {devices
                .filter((d) => d.brand.brand_name === selectedBrand)
                .map((device) => (
                  <option key={device._id} value={device._id}>
                    {device.device_name}
                  </option>
                ))}
            </select>
          </div>

          {/* Quantity */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Quantity</label>
            <input
              type="text"
              className="form-control"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>

          {/* Warranty */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Warranty</label>
            <select
              className="form-control"
              name="warranty"
              value={formData.warranty}
              onChange={handleChange}
            >
              <option value="No Warranty">No Warranty</option>
              <option value="Warranty">Warranty</option>
            </select>
          </div>

          {/* Warranty Period */}
          {formData.warranty === "Warranty" && (
            <div className="col-md-6">
              <label className="form-label fw-semibold">Warranty Period</label>
              <input
                type="text"
                className="form-control"
                name="warrantyPeriod"
                value={formData.warrantyPeriod}
                onChange={handleChange}
              />
            </div>
          )}

          {/* Price */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Price</label>
            <input
              type="text"
              className="form-control"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          {/* IMEI */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">IMEI No.</label>
            <input
              type="text"
              className="form-control"
              name="IMEI"
              value={formData.IMEI}
              onChange={handleChange}
            />
          </div>

          {/* Images */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Images</label>
            <input
              type="file"
              className="form-control"
              multiple
              onChange={handleImageChange}
            />
          </div>

          {/* Description */}
          <div className="col-md-12">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control"
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Submit */}
          <div className="col-12">
            <button type="submit" className="btn btn-primary px-4">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
