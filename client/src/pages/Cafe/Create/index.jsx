import { useEffect, useState } from "react";
import "./index.css";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Form, Input, Col, Row, Radio, Popconfirm, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

const CreateCafe = (props) => {
  let { id } = useParams();
  const history = useNavigate();
  const [form] = Form.useForm();
  const [cafeDetails, setCafeDetails] = useState({
    name: "",
    description: "",
    location: "",
    cafe_id: null,
  });

  const onFinish = () => {
    const cafeDetails = form.getFieldsValue(true);
    form
      .validateFields((error, values) => {
        if (error) {
          console.error("error while validating");
          return;
        }
      })
      .then((values) => {
        // TODO: fetch data from server
        fetch(`${import.meta.env.VITE_SERVER_URL}/cafe/create`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cafeDetails),
        })
          .then((res) => res.json())
          .then((json) => {
            if (json.success) {
              history('/employees');
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

  const onFinishFailed = (cafeDetails) => {
    form.setFieldsValue({
      name: cafeDetails.name,
      description: cafeDetails.description,
      location: cafeDetails.location,
      cafe_id: cafeDetails.cafe_id,
    });
  };

  useEffect(() => {}, []);

  useEffect(() => {
    form.setFieldsValue({
      name: cafeDetails.name,
      description: cafeDetails.description,
      location: cafeDetails.location,
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
              history("/cafes");
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
                  max: 50,
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
                  min: 10,
                  max: 255,
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
                  min: 10,
                  max: 100,
                  message: "Please enter location.",
                },
              ]}
            >
              <Input />
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
              onFinish();
            }}
            block
          >
            Create Cafe
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default CreateCafe;
