import React from "react";

export const employeeColumns = () => {
  return [
    // TODO: Fix Employee Id column
    // {
    //   title: "Employee Id",
    //   dataIndex: "id",
    //   key: "id",
    // },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
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
      title: "Cafe Id",
      dataIndex: "cafe_id",
      key: "cafe_id",
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
