import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Space, Table, Pagination } from "antd";

const CustomTable = (props) => {
  const { data, page, total, columns } = props;

  console.log(data);
  console.log(page);
  console.log(total);

  // const onChange = (page, pageSize) => {
  //   console.log(page);
  //   console.log(pageSize);
  // };

  return (
    <React.Fragment>
      <Table
        virtual
        scroll={{ x: "100%" }}
        columns={columns}
        dataSource={data}
        pagination={{
          position: ["bottomCenter"],
          justifyContent: "center",
          total: total,
          current: page,
          pageSize: 5,
          onChange: (page, pageSize) => {
            // onChange(page, pageSize);
            props.onPageChange(page);
          },
        }}
        bordered
      />
    </React.Fragment>
  );
};

CustomTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  total: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onPageChange: PropTypes.func,
};

export default CustomTable;
