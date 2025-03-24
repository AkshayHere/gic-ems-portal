import React from "react";

export const employeeColumns = () => {
  return [
    {
      title: "Employee Name",
      dataIndex: "name",
      key: "name",
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
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Days worked in the café",
      dataIndex: "days_worked",
      key: "days_worked",
      render: (text) => <span>{text} days</span>,
    },
    {
      title: "Cafe Name",
      dataIndex: "cafe_name",
      key: "cafe_name",
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
