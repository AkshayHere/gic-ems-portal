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
    console.log("Success:");
    const cafeDetails = form.getFieldsValue(true);
    console.log("cafeDetails:", cafeDetails);
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
            console.log(err);
          });
      })
      .catch((errorInfo) => {
        console.log("errorInfo:", errorInfo);
      });
  };

  const onFinishFailed = (cafeDetails) => {
    console.log("Failed:", cafeDetails);
    console.log("form.getFieldsValue():", form.getFieldsValue(true));
    form.setFieldsValue({
      name: cafeDetails.name,
      description: cafeDetails.description,
      location: cafeDetails.location,
      cafe_id: cafeDetails.cafe_id,
    });
  };

  useEffect(() => {}, []);

  useEffect(() => {
    console.log(cafeDetails);
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
            Create Cafe
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default CreateCafe;
