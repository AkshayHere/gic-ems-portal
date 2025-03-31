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
            console.error(err);
          });
      })
      .catch((errorInfo) => {
        console.error("errorInfo:", errorInfo);
      });
  };

  const onDelete = () => {
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
          console.error(err);
        });
    } catch (error) {
      console.error("Unable to delete cafe.");
      console.error(error);
    }
  };

  const onFinishFailed = (cafeDetails) => {
    form.setFieldsValue({
      name: cafeDetails.name,
      description: cafeDetails.description,
      location: cafeDetails.location,
      employees: cafeDetails.employees.length,
      cafe_id: cafeDetails.cafe_id,
    });
  };

  useEffect(() => {
    // Get employee details
    fetch(`${import.meta.env.VITE_SERVER_URL}/cafe/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setCafeDetails(json.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
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
            title="Are you sure delete this cafe ?"
            onConfirm={() => {
              onDelete();
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
