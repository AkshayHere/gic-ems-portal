import React from "react";

export const employeeColumns = () => {
  return [
    {
      title: "Employee Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      render: (text, record) => {
        console.log("text: ", text);
        console.log("record: ", record.id);
        const redirectUrl = `/employees/detail/${record.id}`;
        return <a href={redirectUrl}>{text}</a>;
      },
    },
    {
      title: "Email Address",
      dataIndex: "email_address",
      key: "email_address",
      width: 150,
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
      width: 150,
    },
    {
      title: "Days worked in the café",
      dataIndex: "days_worked",
      key: "days_worked",
      width: 100,
      render: (text) => <span>{text} days</span>,
    },
    {
      title: "Cafe Name",
      dataIndex: "cafe_name",
      key: "cafe_name",
      width: 200,
    },
  ];
};

export const cafeColumns = () => [
  {
    title: "Cafe name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
];
