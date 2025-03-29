import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Space, Table, Pagination } from "antd";

const CustomTable = (props) => {
  const { data, page, total, columns, limit } = props;

  console.log(data);
  console.log(page);
  console.log(total);

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
          showSizeChanger: true,
          current: page,
          pageSize: limit,
          onChange: (page, pageSize) => {
            console.log("page: ", page);
            console.log("pageSize: ", pageSize);
            props.onPageChange(page, pageSize);
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
  limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onPageChange: PropTypes.func,
};

export default CustomTable;
