import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createProduct, fetchProducts, updateProduct } from "../../../../redux/slices/productSlice";
import { showErrorToast, showSuccessToast } from "../../../../utils/toastUtils";
import { fetchBrands } from "../../../../redux/slices/createBrand";
import { fetchCategories } from "../../../../redux/slices/createCategory";
import { fetchTaxes } from "../../../../redux/slices/taxSlice";
import { fetchDevices } from "../../../../redux/slices/deviceSlice";

// 🧩 Import your modal components (adjust path as needed)

import Categories from "../SiteData/Categories";
import BrandPage from "../SiteData/BrandPage";
import DevicePage from "../SiteData/DevicePage";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { categories } = useSelector((state) => state.categories);
  const { brands } = useSelector((state) => state.brands);
  const { devices } = useSelector((state) => state.devices);
  const { products } = useSelector((state) => state.product);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  const [formData, setFormData] = useState({
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

  // 🔘 Modal states
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [showDeviceModal, setShowDeviceModal] = useState(false);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedBrand("");
  };

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
  };

  const handleDeviceChange = (e) => {
    const selectedDeviceId = e.target.value;
    const selectedDevice = devices.find((device) => device?._id === selectedDeviceId);
    setFormData((prev) => ({
      ...prev,
      device: selectedDeviceId,
      device_name: selectedDevice ? selectedDevice.device_name : "",
    }));
  };

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchCategories());
    dispatch(fetchTaxes());
    dispatch(fetchProducts());
    dispatch(fetchDevices());
  }, [dispatch]);

  useEffect(() => {
    if (id && products.data.length > 0) {
      const foundProduct = products.data.find((prod) => prod?._id === id);
      if (foundProduct) {
        setFormData({ ...foundProduct });
        setSelectedCategory(foundProduct.category || "");
        setSelectedBrand(foundProduct.brand || "");
      }
    }
  }, [id, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      category: selectedCategory,
      brand: selectedBrand,
      device: formData.device_name,
    };

    try {
      if (id) {
        const res = await dispatch(updateProduct({ id, productData: finalData })).unwrap();
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
        <h3 className="mb-2 fw-semibold">{id ? "Edit Product" : "Add Product"}</h3>

        <form className="row g-3 mt-1 p-4" onSubmit={handleSubmit}>
          <>
            <h5>Add Product</h5>

            <div className="col-md-6 col-lg-6">
              <label className="form-label fw-semibold"> Name</label>
              <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            {/* ✅ Category with + Add */}
            <div className="col-md-6 col-lg-6">
              <label className="form-label fw-semibold d-flex justify-content-between align-items-center">
                Category
                <button type="button" className="btn btn-sm btn-outline-primary ms-2" onClick={() => setShowCategoryModal(true)}>
                  + Add
                </button>
              </label>
              <select className="form-control" name="category" value={selectedCategory} onChange={handleCategoryChange} required>
                <option value="">Select Category</option>
                {categories &&
                  categories.map((cat) => (
                    <option key={cat._id} value={cat.category_name}>
                      {cat.category_name}
                    </option>
                  ))}
              </select>
            </div>

            {/* ✅ Brand with + Add */}
            <div className="col-md-6 col-lg-6">
              <label className="form-label fw-semibold d-flex justify-content-between align-items-center">
                Brand / Manufacturer
                <button type="button" className="btn btn-sm btn-outline-primary ms-2" onClick={() => setShowBrandModal(true)}>
                  + Add
                </button>
              </label>
              <select
                className="form-control"
                name="brand"
                value={selectedBrand}
                onChange={handleBrandChange}
                disabled={!selectedCategory}
              >
                <option value="">Select Brand</option>
                {brands &&
                  brands
                    .filter((brand) => brand?.category?.category_name === selectedCategory)
                    .map((brand) => (
                      <option key={brand._id} value={brand.brand_name}>
                        {brand.brand_name}
                      </option>
                    ))}
              </select>
            </div>

            {/* ✅ Device with + Add */}
            <div className="col-md-6 col-lg-6">
              <label className="form-label fw-semibold d-flex justify-content-between align-items-center">
                Device
                <button type="button" className="btn btn-sm btn-outline-primary ms-2" onClick={() => setShowDeviceModal(true)}>
                  + Add
                </button>
              </label>
              <select className="form-control" name="device" onChange={handleDeviceChange} disabled={!selectedBrand}>
                <option value="">Select Device</option>
                {devices &&
                  devices
                    .filter((device) => device?.brand?.brand_name === selectedBrand)
                    .map((device) => (
                      <option key={device._id} value={device._id}>
                        {device.device_name}
                      </option>
                    ))}
              </select>
            </div>

            <div className="col-md-6 col-lg-6">
              <label className="form-label fw-semibold">Quantity</label>
              <input type="text" className="form-control" name="quantity" value={formData.quantity} onChange={handleChange} />
            </div>

            <div className="col-md-6 col-lg-6">
              <label className="form-label fw-semibold">Warranty</label>
              <select className="form-control" name="warranty" value={formData.warranty} onChange={handleChange}>
                <option value="No Warranty">No Warranty</option>
                <option value="Warranty">Warranty</option>
              </select>
            </div>

            {formData.warranty === "Warranty" && (
              <div className="col-md-6 col-lg-6">
                <label className="form-label fw-semibold">Warranty Period</label>
                <input type="text" className="form-control" name="warrantyPeriod" value={formData.warrantyPeriod} onChange={handleChange} />
              </div>
            )}

            <div className="col-md-6 col-lg-6">
              <label className="form-label fw-semibold">Price</label>
              <input type="text" className="form-control" name="price" value={formData.price} onChange={handleChange} required />
            </div>

            <div className="col-md-6 col-lg-6">
              <label className="form-label fw-semibold">IMEI No.</label>
              <input type="text" className="form-control" name="IMEI" value={formData.IMEI} onChange={handleChange} />
            </div>

            <div className="col-md-6 col-lg-6">
              <label className="form-label fw-semibold">Images</label>
              <input type="file" className="form-control" multiple onChange={handleImageChange} />
            </div>

            <div className="col-md-6 col-lg-12">
              <label className="form-label fw-semibold">Description</label>
              <textarea className="form-control" rows={4} name="description" value={formData.description} onChange={handleChange} />
            </div>

            <div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </>
        </form>
      </div>

      {/* 🔘 MODALS */}
      {showCategoryModal && <Categories show={showCategoryModal} handleClose={() => setShowCategoryModal(false)}/>}
      {showBrandModal && <BrandPage show={showBrandModal} handleClose={() => setShowBrandModal(false)}/>}
      {showDeviceModal && <DevicePage show={showDeviceModal} handleClose={() => setShowDeviceModal(false)}/>}

    </div>
  );
};

export default AddProduct;
