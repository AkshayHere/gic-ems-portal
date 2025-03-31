import React from "react";

export const employeeColumns = (employeeList = []) => {
  const employeeFilters = employeeList.map((employee) => {
    return {
      text: employee.name,
      value: employee.name,
    };
  });

  const cafeName = [...new Set(employeeList.map(a => a.cafe_name))]
  const cafeFilters = cafeName.map((cafeName) => {
    return {
      text: cafeName,
      value: cafeName,
    };
  });
  console.log("employeeFilters: ", employeeFilters);
  console.log("cafeFilters: ", cafeFilters);

  return [
    {
      title: "Employee Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      filters: employeeFilters,
      filterMode: "menu",
      filterSearch: true,
      onFilter: (value, record) => {
        console.log('Column > Employee Name');
        return record.name.includes(value)
      },
      sorter: (a, b) => a.name.localeCompare(b.name),
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
      filters: cafeFilters,
      filterMode: "menu",
      filterSearch: true,
      onFilter: (value, record) => record.cafe_name.includes(value),
      sorter: (a, b) => a.cafe_name.localeCompare(b.cafe_name),
    },
  ];
};

export const cafeColumns = () => [
  {
    title: "Cafe name",
    dataIndex: "name",
    key: "name",
    render: (text, record) => {
      console.log("text: ", text);
      console.log("record: ", record.id);
      const redirectUrl = `/cafes/detail/${record.id}`;
      return <a href={redirectUrl}>{text}</a>;
    },
    sorter: (a, b) => a.name.localeCompare(b.name),
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
    sorter: (a, b) => a.location.localeCompare(b.location),
  },
];
