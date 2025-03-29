import { useEffect, useState } from "react";
import "./index.css";
import { useParams } from "react-router-dom";

import { Button, Form, Input, Col, Row, Radio, Popconfirm, Select } from "antd";

const CreateEmployee = (props) => {
  let { id } = useParams();
  const [form] = Form.useForm();
  const [employeeDetails, setEmployeeDetails] = useState({
    name: "",
    email_address: "",
    phone_number: "",
    gender: "",
    cafe_id: null,
  });

  const [cafeDetails, setCafeDetails] = useState([]);

  const onFinish = () => {
    console.log("Success:");
    const employeeDetails = form.getFieldsValue(true);
    console.log("employeeDetails:", employeeDetails);
    form.validateFields((error, values) => {
      if (error) {
        console.error("error while validating");
        return;
      }
    });

    // TODO: fetch data from server
    fetch(`${import.meta.env.VITE_SERVER_URL}/employee`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeDetails),
    })
      .then((res) => res.json())
      .then((json) => {
        // setEmployeeDetails(json.data);
        // console.log("json:", json);
        if (json.success) {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onFinishFailed = (employeeDetails) => {
    console.log("Failed:", employeeDetails);
    console.log("form.getFieldsValue():", form.getFieldsValue(true));
    form.setFieldsValue(employeeDetails);
  };

  useEffect(() => {
    // Populate cafe details
    fetch(`${import.meta.env.VITE_SERVER_URL}/cafes/all`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json.data.cafes);
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
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(employeeDetails);
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
              window.history.back();
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
            // onSubmit={() => {
            //   onFinish();
            // }}
            onFinishFailed={() => {
              onFinishFailed(employeeDetails);
            }}
            autoComplete="off"
            layout="vertical"
            onValuesChange={(changedValues, allValues) => {
              console.log("onValuesChange");
              console.log(changedValues);
              console.log(allValues);
              console.log(employeeDetails);
            }}
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
                onChange={() => {
                  console.log("onChange");
                }}
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
              console.log("Submit");
              console.log(form.fields);
              console.log(event.target.textContent);
              onFinish();
            }}
            block
          >
            Create Employee
          </Button>
        </Col>
        <Col className="header" span={6}>
          <Popconfirm
            title="Are you sure you want to clear the form ?"
            onConfirm={() => {
              console.log("onConfirm");
            }}
            onCancel={() => {
              console.log("onCancel");
              onFinishFailed(employeeDetails);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button
              variant="solid"
              color="red"
              onClick={() => {
                console.log("delete");
              }}
              block
            >
              Clear
            </Button>
          </Popconfirm>
        </Col>
      </Row>
    </div>
  );
};

export default CreateEmployee;