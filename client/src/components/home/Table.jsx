import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";

const CustomTable = (props) => {
  const { data, page, total, columns, limit } = props;
  
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
        }}
        onChange={(pagination, filters, sorter, extra) => {
          const { currentDataSource } = extra;
          props.handleFilterChange(
            pagination.current,
            pagination.pageSize,
            currentDataSource.length
          );
        }}
        onRow={(rowData) => ({
          onClick: () => {
            props.onRowClick(rowData);
          },
        })}
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
  handleFilterChange: PropTypes.func,
  onRowClick: PropTypes.func,
};

export default CustomTable;
