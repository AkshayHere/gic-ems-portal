import { useCallback, useEffect, useState } from "react";
import "./index.css";
import CustomTable from "../../../components/home/Table";
import { employeeColumns } from "../../../components/home/TableColumns";
import { Button, Col, Row } from "antd";

const ListEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    total: 0,
  });

  const getEmployees = (page) => {
    console.log("getEmployees");
    console.log("page:", page);
    console.log("pagination:", pagination);
    fetch(
      `${import.meta.env.VITE_SERVER_URL}/employees?page=${page}&limit=${
        pagination.limit
      }`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log("json.data:", json.data);
        console.log("json.data.employees:", json.data.employees);
        setEmployees(json.data.employees);
        setPagination((prevState) => ({
          ...prevState,
          page,
          total: json.data.total,
        }));
      })
      .catch((err) => {
        console.log(err);
        setEmployees([]);
      });
  };

  useEffect(() => {
    getEmployees(pagination.page);
  }, []);

  const handlePageChange = (page) => {
    console.log("handlePageChange");
    console.log("handlePageChange > page: ", page);
    getEmployees(page);
  };

  return (
    <div className="home">
      <span className="header">Employees ({pagination.total})</span>
      <Row gutter={[16, 16]}>
        <Col className="header" span={6}>
          <Button
            variant="solid"
            color="green"
            onClick={() => {
              window.location.href = "/employees/create";
            }}
            block
          >
            Create Employee
          </Button>
        </Col>
      </Row>
      <CustomTable
        data={employees}
        page={pagination.page}
        total={pagination.total}
        limit={pagination.limit}
        onPageChange={handlePageChange}
        columns={employeeColumns()}
      />
    </div>
  );
};

export default ListEmployees;
