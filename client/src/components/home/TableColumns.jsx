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
    // TODO: Move this logic to the backend
    // {
    //   title: "Cafe Id",
    //   dataIndex: "cafe_id",
    //   key: "cafe_id",
    //   render: async (text) => {
    //     let data = await fetch(
    //       `${import.meta.env.VITE_SERVER_URL}/cafe/${text}`
    //     )
    //       .then((res) => res.json())
    //       .then((json) => {
    //         console.log("json: ", json);
    //         return json.data;
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //     console.log("data: ", data.name);
    //     return <a>{data.name ?? text}</a>;
    //   },
    // },
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
