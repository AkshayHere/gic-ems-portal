import { useEffect, useState } from "react";
import "./index.css";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Form, Input, Col, Row, Radio, Popconfirm, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

const CafeDetails = (props) => {
  let { id } = useParams();
  const history = useNavigate();
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(true);
  const [cafeDetails, setCafeDetails] = useState({
    name: "",
    description: "",
    employees: 0,
    location: "",
    cafe_id: null,
  });

  const onFinish = () => {
    console.log("Success:");
    const employeeDetails = form.getFieldsValue(true);
    console.log("employeeDetails:", employeeDetails);
    form
      .validateFields((error, values) => {
        console.log("validateFields");
        console.log("error:", error);
        console.log("values:", values);
        if (error) {
          console.error("error while validating");
          return;
        }
      })
      .then((values) => {
        console.log("valid values:", values);
        // TODO: fetch data from server
        fetch(`${import.meta.env.VITE_SERVER_URL}/cafe/${id}`, {
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
              window.location.reload();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((errorInfo) => {
        console.log("errorInfo:", errorInfo);
      });
  };

  const onDelete = () => {
    console.log("onDelete");
    try {
      fetch(`${import.meta.env.VITE_SERVER_URL}/cafe/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            history('/cafes');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Unable to delete cafe.");
      console.error(error);
    }
  };

  const onFinishFailed = (cafeDetails) => {
    console.log("Failed:", cafeDetails);
    console.log("form.getFieldsValue():", form.getFieldsValue(true));
    form.setFieldsValue({
      name: cafeDetails.name,
      description: cafeDetails.description,
      location: cafeDetails.location,
      employees: cafeDetails.employees.length,
      cafe_id: cafeDetails.cafe_id,
    });
  };

  useEffect(() => {
    console.log(`/cafe/${id}`);
    // Get employee details
    fetch(`${import.meta.env.VITE_SERVER_URL}/cafe/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setCafeDetails(json.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(cafeDetails);
    form.setFieldsValue({
      name: cafeDetails.name,
      description: cafeDetails.description,
      location: cafeDetails.location,
      employees: cafeDetails.employees.length,
      cafe_id: cafeDetails.cafe_id,
    });
  }, [form, cafeDetails]);

  return (
    <div className="home">
      <Row gutter={[16, 16]}>
        <Col className="header" span={6}>
          <Button
            type="primary"
            color="none"
            htmlType="submit"
            onClick={() => {
              history('/cafes');
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
          Cafe Details
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
              onFinishFailed(cafeDetails);
            }}
            autoComplete="off"
            layout="vertical"
            onValuesChange={(changedValues, allValues) => {
              console.log("onValuesChange");
              console.log(changedValues);
              console.log(allValues);
              console.log(cafeDetails);
            }}
          >
            <Form.Item
              label="Cafe Name"
              name="name"
              rules={[
                {
                  required: true,
                  min: 6,
                  max: 10,
                  message: "Please input cafe name.",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please provide description.",
                },
              ]}
            >
              <TextArea rows={4} placeholder="Please provide description." />
            </Form.Item>
            <Form.Item
              label="Location"
              name="location"
              rules={[
                {
                  required: true,
                  min: 6,
                  max: 30,
                  message: "Please enter location.",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Employees" name="employees">
              <Input disabled={true} />
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
              setDisabled(false);
              console.log(form.fields);
              console.log(event.target.textContent);
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
            title="Are you sure delete this cafe ?"
            onConfirm={() => {
              console.log("onConfirm");
              onDelete();
            }}
            onCancel={() => {
              console.log("onCancel");
            }}
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
              console.log("Cancel");
              setDisabled(true);
              onFinishFailed(cafeDetails);
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

export default CafeDetails;
