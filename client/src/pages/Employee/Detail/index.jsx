import { useEffect, useState } from "react";
import "./index.css";
import { useParams } from "react-router-dom";

import { Button, Form, Input } from "antd";
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const EmployeeDetails = (props) => {
  let { id } = useParams();
  const [form] = Form.useForm();
  const [employeeDetails, setEmployeeDetails] = useState({
    name: "",
    email: "",
    phone_number: "",
  });

  useEffect(() => {
    console.log(`/employee/${id}`);
    fetch(`${import.meta.env.VITE_SERVER_URL}/employee/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setEmployeeDetails(json.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(employeeDetails);
    form.setFieldsValue({
      name: employeeDetails.name,
      email: employeeDetails.email_address,
      phone_number: employeeDetails.phone_number 
    });
  }, [form, employeeDetails]);

  return (
    <div className="home">
      <span className="header">Employees Details</span>
      <Form
        name="basic"
        style={{
          maxWidth: 600,
        }}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Employee Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input employee name.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email address"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input email address.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone number"
          name="phone_number"
          rules={[
            {
              required: true,
              message: "Please input phone number.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EmployeeDetails;
