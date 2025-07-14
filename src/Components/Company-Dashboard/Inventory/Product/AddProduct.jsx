import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createProduct,
  fetchProducts,
  updateProduct,
} from "../../../../redux/slices/productSlice";
import { showErrorToast, showSuccessToast } from "../../../../utils/toastUtils";
import { fetchBrands } from "../../../../redux/slices/createBrand";
import { fetchCategories } from "../../../../redux/slices/createCategory";
// import { fetchTaxes } from "../../../../redux/slices/taxSlice";
import { fetchDevices } from "../../../../redux/slices/deviceSlice";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { categories } = useSelector((state) => state.categories);
  // console.log("category", categories)
  const { brands } = useSelector((state) => state.brands);
  // console.log("brand", brands)
  const { devices } = useSelector((state) => state.devices);
  // console.log("device", devices)
  const { products } = useSelector((state) => state.product);
  // const { selectedShop } = useSelector((state) => state.auth);

  // State to track selected category & brand
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  // Handle Category Change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedBrand(""); // Reset brand when category changes
  };

  // Handle Brand Change
  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
  };
  // Add state to store selected device
  const handleDeviceChange = (e) => {
    const selectedDeviceId = e.target.value;
    const selectedDevice = devices.find(
      (device) => device?._id === selectedDeviceId
    );

    setFormData((prev) => ({
      ...prev,
      device: selectedDeviceId, // Storing ID
      device_name: selectedDevice ? selectedDevice?.device_name : "", // Storing Name
    }));
  };

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchCategories());
    // dispatch(fetchTaxes());
    dispatch(fetchProducts());
    dispatch(fetchDevices());
  }, [dispatch]);

  useEffect(() => {
    if (id && products.data.length > 0) {
      const foundProduct = products.data.find((prod) => prod?._id === id);
      console.log("singledata", foundProduct);
      if (foundProduct) {
        setFormData({
          ...foundProduct,
        });
      }
    }
  }, [id, products]);

  const [formData, setFormData] = useState({
    // shop_id: selectedShop ? selectedShop._id : null,
    name: "",
    category: "",
    price: "",
    brand: "",
    description: "",
    IMEI: "",
    quantity: "",
    device: "",
    warranty: "no",
    warrantyPeriod: "",
    sku: "",
    images: [],
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      category: selectedCategory, // Ensure category is included
      brand: selectedBrand, // Ensure brand is included
      device: formData.device_name, // Ensure device is included
    };

    try {
      if (id) {
        const res = await dispatch(
          updateProduct({ id, productData: finalData })
        ).unwrap();
        showSuccessToast(res.message || "Product updated successfully!");
      } else {
        const res = await dispatch(createProduct(finalData)).unwrap();
        showSuccessToast(res.message || "Product created successfully!");
      }
      navigate("/company/product");
    } catch {
      showSuccessToast("Product updated successfully!");
      navigate("/company/product");
    }
  };

  return (
    <div className="mx-5 mt-3">
      <div className="container-fluid shadow p-4">
        <h3 className="mb-2 fw-semibold">
          {id ? "Edit Product" : "Add Product"}
        </h3>

        <form className="row g-3 mt-1 p-4" onSubmit={handleSubmit}>
          <>
            <h5>Add Product</h5>
            {/* Name */}
            <div className="col-md-6 col-lg-6">
              <label className="form-label fw-semibold"> Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Category Dropdown */}
            <div className="col-md-6 col-lg-6">
              <label className="form-label fw-semibold">Category</label>
              <select
                className="form-control"
                name="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
                required
              >
                <option value="">Select Category</option>
                {categories &&
                  categories.map((cat) => (
                    <option key={cat._id} value={cat.category_name}>
                      {cat.category_name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Brand Dropdown */}
            <div className="col-md-6 col-lg-6">
              <label className="form-label fw-semibold">
                Brand / Manufacturer
              </label>
              <select
                className="form-control"
                name="brand"
                value={selectedBrand}
                onChange={handleBrandChange}
                disabled={!selectedCategory} // Disable until category is selected
              >
                <option value="">Select Brand</option>
                {brands &&
                  brands
                    .filter(
                      (brand) =>
                        brand?.category?.category_name === selectedCategory
                    ) // Filter brands based on category
                    .map((brand) => (
                      <option key={brand._id} value={brand.brand_name}>
                        {brand.brand_name}
                      </option>
                    ))}
              </select>
            </div>

            {/* Device Dropdown */}
            <div className="col-md-6 col-lg-6">
              <label className="form-label fw-semibold">Device</label>
              <select
                className="form-control"
                name="device"
                onChange={handleDeviceChange}
                disabled={!selectedBrand}
              >
                <option value="">Select Device</option>
                {devices &&
                  devices
                    .filter(
                      (device) => device?.brand?.brand_name === selectedBrand
                    )
                    .map((device) => (
                      <option key={device._id} value={device._id}>
                        {device.device_name}
                      </option>
                    ))}
              </select>
            </div>
            {/* Quantity */}
            <div className="col-md-6 col-lg-6">
              <label className="form-label fw-semibold">Quantity</label>
              <input
                type="text"
                className="form-control"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
              />
            </div>
            {/* Warranty Dropdown */}
            <div className="col-md-6 col-lg-6">
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

            {/* Warranty Period (Conditional) */}
            {formData.warranty === "Warranty" && (
              <div className="col-md-6 col-lg-6">
                <label className="form-label fw-semibold">
                  Warranty Period
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="warrantyPeriod"
                  value={formData.warrantyPeriod}
                  onChange={handleChange}
                />
              </div>
            )}

            {/* SKU */}
            {/* <div className="col-md-6 col-lg-6">
              <label className="form-label fw-semibold">SKU</label>
              <input type="text" className="form-control" name="sku" value={formData.sku} onChange={handleChange} required />
            </div> */}
            {/* price */}
            <div className="col-md-6 col-lg-6">
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
            {/* SKU */}
            <div className="col-md-6 col-lg-6">
              <label className="form-label fw-semibold">IMEI No.</label>
              <input
                type="text"
                className="form-control"
                name="IMEI"
                value={formData.IMEI}
                onChange={handleChange}
              />
            </div>

            {/* Image Upload */}
            <div className="col-md-6 col-lg-6">
              <label className="form-label fw-semibold">Images</label>
              <input
                type="file"
                className="form-control"
                multiple
                onChange={handleImageChange}
              />
            </div>
            {/* Description */}
            <div className="col-md-6 col-lg-12">
              <label className="form-label fw-semibold">Description</label>
              <textarea
                className="form-control"
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
