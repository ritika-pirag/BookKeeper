import React from "react";
import { Input, Button, Form, Modal, Select } from "antd";
import { useDispatch } from "react-redux";
import { createCategory } from "../../../../redux/slices/categorySlice";
import { createBrand } from "../../../../redux/slices/createBrand";
import { createDevice } from "../../../../redux/slices/deviceSlice";

const CommonModal = ({
  modalType,
  visible,
  onCancel,
  onOk,
  categories,
  brands,
  devices,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  // Handle form submission for different modal types
  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        switch (modalType) {
          case "category":
            dispatch(createCategory({ categoryName: values.name }));
            break;
          case "brand":
            dispatch(
              createBrand({
                categoryId: values.category,
                brandName: values.name,
              })
            );
            break;
          case "device":
            dispatch(
              createDevice({
                categoryId: values.category,
                brandId: values.brand,
                deviceName: values.name,
              })
            );
            break;
          default:
            break;
        }
        onOk(); // Close modal after submission
      })
      .catch((errorInfo) => {
        console.log("Failed:", errorInfo);
      });
  };

  // Render form fields based on modal type
  const renderForm = () => {
    switch (modalType) {
      case "category":
        return (
          <>
            <Form.Item
              label="Category Name"
              name="name"
              rules={[
                { required: true, message: "Please input category name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </>
        );
      case "brand":
        return (
          <>
            <Form.Item
              label="Select Category"
              name="category"
              rules={[{ required: true, message: "Please select a category!" }]}
            >
              <Select>
                {categories.map((category) => (
                  <Select.Option key={category._id} value={category._id}>
                    {category.category_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Brand Name"
              name="name"
              rules={[{ required: true, message: "Please input brand name!" }]}
            >
              <Input />
            </Form.Item>
          </>
        );
      case "device":
        return (
          <>
            <Form.Item
              label="Select Category"
              name="category"
              rules={[{ required: true, message: "Please select a category!" }]}
            >
              <Select>
                {categories.map((category) => (
                  <Select.Option key={category._id} value={category._id}>
                    {category.category_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Select Brand"
              name="brand"
              rules={[{ required: true, message: "Please select a brand!" }]}
            >
              <Select>
                {brands.map((brand) => (
                  <Select.Option key={brand._id} value={brand._id}>
                    {brand.brand_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Device Name"
              name="name"
              rules={[{ required: true, message: "Please input device name!" }]}
            >
              <Input />
            </Form.Item>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      title={`Add ${modalType.charAt(0).toUpperCase() + modalType.slice(1)}`}
      visible={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      okText="Submit"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical">
        {renderForm()}
      </Form>
    </Modal>
  );
};

export default CommonModal;
