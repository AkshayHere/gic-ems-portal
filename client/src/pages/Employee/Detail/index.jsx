import { useEffect, useState } from "react";
import "./index.css";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Form, Input, Col, Row, Radio, Popconfirm, Select } from "antd";

const EmployeeDetails = (props) => {
  let { id } = useParams();
  const [form] = Form.useForm();
  const history = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const [employeeDetails, setEmployeeDetails] = useState({
    name: "",
    email_address: "",
    phone_number: "",
    gender: "",
    cafe_id: null,
  });

  const [cafeDetails, setCafeDetails] = useState([]);

  const onFinish = () => {
    const employeeDetails = form.getFieldsValue(true);
    form
      .validateFields((error, values) => {
        if (error) {
          console.error("error while validating");
          return;
        }
      })
      .then((values) => {
        // TODO: fetch data from server
        fetch(`${import.meta.env.VITE_SERVER_URL}/employee/${id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employeeDetails),
        })
          .then((res) => res.json())
          .then((json) => {
            if (json.success) {
              // So that we get the latest data from backend.
              window.location.reload();
            }
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((errorInfo) => {
        console.error("errorInfo:", errorInfo);
      });
  };

  const onDelete = () => {
    try {
      fetch(`${import.meta.env.VITE_SERVER_URL}/employee/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            history("/employees");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.error("Unable to delete employee.");
      console.error(error);
    }
  };

  const onFinishFailed = (employeeDetails) => {
    form.setFieldsValue(employeeDetails);
  };

  useEffect(() => {
    // Get employee details
    fetch(`${import.meta.env.VITE_SERVER_URL}/employee/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setEmployeeDetails(json.data);
      })
      .catch((err) => {
        console.error(err);
      });

    // Populate cafe details
    fetch(`${import.meta.env.VITE_SERVER_URL}/cafes`)
      .then((res) => res.json())
      .then((json) => {
        const cafes = json.data.cafes;
        const formatCafes = cafes.map((cafe) => {
          return {
            value: cafe.id,
            label: cafe.name,
          };
        });
        setCafeDetails(formatCafes);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      name: employeeDetails.name,
      email_address: employeeDetails.email_address,
      phone_number: employeeDetails.phone_number,
      gender: employeeDetails.gender,
      cafe_id: employeeDetails.cafe_id,
    });
  }, [form, employeeDetails]);

  return (
    <div className="home">
      <Row gutter={[16, 16]}>
        <Col className="header" span={6}>
          <Button
            type="primary"
            color="none"
            htmlType="submit"
            onClick={() => {
              history("/employees");
            }}
            variant="outlined"
            block
          >
            &larr; Go Back
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className="header" span={12}>
          Employees Details
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form
            name="basic"
            style={{
              maxWidth: 600,
            }}
            form={form}
            disabled={disabled}
            onFinishFailed={() => {
              onFinishFailed(employeeDetails);
            }}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Employee Name"
              name="name"
              rules={[
                {
                  required: true,
                  min: 6,
                  max: 10,
                  message: "Please input employee name.",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email address"
              name="email_address"
              rules={[
                {
                  required: true,
                  email: true,
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
                  pattern: /^[89]\d{7}$/,
                  message: "Please input phone number.",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={"Gender"}
              name="gender"
              rules={[
                {
                  required: true,
                  message: "Please select gender.",
                },
              ]}
            >
              <Radio.Group>
                <Radio value={"MALE"}>Male</Radio>
                <Radio value={"FEMALE"}>Female</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label={"Cafe Details"}
              name="cafe_id"
              rules={[
                {
                  required: true,
                  message: "Please select cafe.",
                },
              ]}
            >
              <Select
                defaultValue={form.cafe_id}
                block
                // onChange={() => {
                //   console.log("onChange");
                // }}
                options={cafeDetails}
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col className="header" span={6}>
          <Button
            type="primary"
            color="green"
            htmlType="submit"
            onClick={(event) => {
              setDisabled(false);
              // TODO: Tricky logic to update the submit. Relook this logic.
              if (event.target.textContent === "Update") {
                onFinish();
              }
            }}
            block
          >
            {disabled ? "Edit" : "Update"}
          </Button>
        </Col>
        <Col
          className="header"
          span={6}
          style={{ display: !disabled ? "none" : "block" }}
        >
          <Popconfirm
            title="Are you sure delete this employee ?"
            onConfirm={() => {
              onDelete();
            }}
            // onCancel={() => {}}
            okText="Yes"
            cancelText="No"
          >
            <Button variant="solid" color="red" block>
              Delete
            </Button>
          </Popconfirm>
        </Col>
        <Col
          className="header"
          span={6}
          style={{ display: disabled ? "none" : "block" }}
        >
          <Button
            color="grey"
            onClick={() => {
              setDisabled(true);
              onFinishFailed(employeeDetails);
            }}
            block
          >
            Cancel
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default EmployeeDetails;
