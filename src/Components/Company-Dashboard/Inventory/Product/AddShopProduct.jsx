import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  Button,
  Form,
  Select,
  Upload,
  message,
  Row,
  Col,
  Typography,
  Card,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../../../../redux/slices/createCategory"; // Assuming you have these actions
import { createProduct } from "../../../../redux/slices/productSlice"; // Assuming you have this action

const { Option } = Select;
const { Title, Text } = Typography;

const AddShopProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedShop } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.categories);
  const { brands } = useSelector((state) => state.brands);
  const { devices } = useSelector((state) => state.devices);

  // Form state initialization
  const [formData, setFormData] = useState({
    shop_id: selectedShop ? selectedShop._id : null,
    name: "",
    category: "",
    brand: "",
    device: "",
    price: "",
    description: "",
    IMEI: "",
    warranty: "no", // Default warranty to "no"
    warrantyPeriod: "",
    status: "Pending",
    sku: "",
    taxid: "",
    images: [],
    quantity: "",
  });

  // Handle category change
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (selectedShop) {
      setFormData((prevData) => ({
        ...prevData,
        shop_id: selectedShop._id,
      }));
    }
  }, [selectedShop]);

  // Form validation schema with Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    category: Yup.string().required("Category is required"),
    brand: Yup.string().required("Brand is required"),
    device: Yup.string().required("Device is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive"),
    quantity: Yup.number()
      .required("Quantity is required")
      .positive("Quantity must be positive"),
  });

  // Form handling with Formik
  const formik = useFormik({
    initialValues: formData,
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Data submitted: ", values);
      dispatch(createProduct(values));
      navigate("/products");
    },
  });

  // Handle image upload
  const handleImageChange = (info) => {
    const maxImages = 5;
    if (info.fileList.length > maxImages) {
      message.error(`You can only upload up to ${maxImages} images.`);
      return;
    }
    console.log(info);
    if (info.file) {
      message.success(`${info.file.name} file uploaded successfully`);
      formik.setFieldValue("images", info.fileList);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  // Handle category change
  const handleCategoryChange = (value) => {
    formik.setFieldValue("category", value);
    setFilteredBrands(brands.filter((brand) => brand.category?._id === value));
  };

  // Handle brand change
  const handleBrandChange = (value) => {
    formik.setFieldValue("brand", value);
    setFilteredDevices(devices.filter((device) => device.brand?._id === value));
  };

  return (
    <div style={{ padding: "30px" }}>
      {/* Header Section */}
      <Card style={{ marginBottom: "20px" }} className="header-card">
        <Title level={2}>Add Product</Title>
        <Text>Fill in the details to add a new product to your shop.</Text>
      </Card>

      {/* Product Form */}
      <Card>
        <Form onFinish={formik.handleSubmit} layout="vertical">
          <Row gutter={16}>
            {/* Product Name */}
            <Col span={24} md={12}>
              <Form.Item label="Product Name">
                <Input
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  placeholder="Enter product name"
                  required
                />
              </Form.Item>
            </Col>

            {/* Category Dropdown */}
            <Col span={24} md={12}>
              <Form.Item label="Category">
                <Select
                  name="category"
                  value={formik.values.category}
                  onChange={handleCategoryChange}
                  required
                  showSearch
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {categories.map((category) => (
                    <Option key={category._id} value={category._id}>
                      {category.category_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {/* Brand Dropdown */}
            <Col span={24} md={12}>
              <Form.Item label="Brand">
                <Select
                  name="brand"
                  value={formik.values.brand}
                  onChange={handleBrandChange}
                  required
                  showSearch
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {filteredBrands.map((brand) => (
                    <Option key={brand._id} value={brand._id}>
                      {brand.brand_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {/* Device Dropdown */}
            <Col span={24} md={12}>
              <Form.Item label="Device">
                <Select
                  name="device"
                  value={formik.values.device}
                  onChange={(value) => formik.setFieldValue("device", value)}
                  required
                  showSearch
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {filteredDevices.map((device) => (
                    <Option key={device._id} value={device._id}>
                      {device.device_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {/* Price */}
            <Col span={24} md={12}>
              <Form.Item label="Price">
                <Input
                  type="number"
                  name="price"
                  onChange={formik.handleChange}
                  value={formik.values.price}
                  placeholder="Enter product price"
                  required
                />
              </Form.Item>
            </Col>

            {/* Quantity */}
            <Col span={24} md={12}>
              <Form.Item label="Quantity">
                <Input
                  type="number"
                  name="quantity"
                  onChange={formik.handleChange}
                  value={formik.values.quantity}
                  placeholder="Enter quantity"
                  required
                />
              </Form.Item>
            </Col>

            {/* Warranty Dropdown */}
            <Col span={24} md={12}>
              <Form.Item label="Warranty">
                <Select
                  name="warranty"
                  value={formik.values.warranty}
                  onChange={(value) => formik.setFieldValue("warranty", value)}
                  required
                >
                  <Option value="no">No</Option>
                  <Option value="yes">Yes</Option>
                </Select>
              </Form.Item>
            </Col>

            {/* Warranty Period (Only if warranty is Yes) */}
            {formik.values.warranty === "yes" && (
              <Col span={24} md={12}>
                <Form.Item
                  label="Warranty Period"
                  name="warrantyPeriod"
                  rules={[
                    {
                      required: true,
                      message: "Please input warranty period!",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    name="warrantyPeriod"
                    onChange={formik.handleChange}
                    value={formik.values.warrantyPeriod}
                    placeholder="Enter warranty period"
                  />
                </Form.Item>
              </Col>
            )}

            {/* IMEI */}
            <Col span={24} md={12}>
              <Form.Item label="IMEI">
                <Input
                  name="IMEI"
                  onChange={formik.handleChange}
                  value={formik.values.IMEI}
                  placeholder="Enter IMEI number"
                />
              </Form.Item>
            </Col>

            {/* Image Upload */}
            <Col span={24} md={12}>
              <Form.Item label="Product Images">
                <Upload
                  name="images"
                  listType="picture"
                  multiple
                  maxCount={5} // Limit to 5 images
                  onChange={handleImageChange}
                  beforeUpload={() => false}
                >
                  <Button icon={<PlusOutlined />}>Upload Images</Button>
                </Upload>
              </Form.Item>
            </Col>

            {/* Description */}
            <Col span={24}>
              <Form.Item label="Description">
                <Input.TextArea
                  name="description"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  placeholder="Enter product description"
                  rows={4}
                />
              </Form.Item>
            </Col>

            {/* Submit Button */}
            <Col span={24}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Add Product
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default AddShopProduct;
