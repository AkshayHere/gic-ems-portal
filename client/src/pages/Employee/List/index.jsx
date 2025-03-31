import { useEffect, useState } from "react";
import "./index.css";
import CustomTable from "../../../components/home/Table";
import { employeeColumns } from "../../../components/home/TableColumns";
import { Button, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";

const ListEmployees = () => {
  const history = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    total: 0,
  });

  const getEmployees = () => {
    console.log("getEmployees");
    fetch(`${import.meta.env.VITE_SERVER_URL}/employees/all`)
      .then((res) => res.json())
      .then((json) => {
        console.log("json.data:", json.data);
        console.log("json.data.employees:", json.data.employees);
        setEmployees(json.data.employees);
        setPagination((prevState) => ({
          ...prevState,
          total: json.data.employees.length,
        }));
      })
      .catch((err) => {
        console.log(err);
        setEmployees([]);
      });
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const handleFilterChange = (page, limit, total) => {
    console.log("handleFilterChange");
    console.log("handleFilterChange > page: ", page);
    console.log("handleFilterChange > limit: ", limit);
    console.log("handleFilterChange > total: ", total);
    setPagination((prevState) => ({
      ...prevState,
      page,
      limit,
      total,
    }));
  };

  const onRowClick = (rowData) => {
    console.log("onRowClick");
    console.log("rowData: ", rowData);
    history(`/employees/detail/${rowData.id}`);
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
              history("/employees/create");
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
        handleFilterChange={handleFilterChange}
        onRowClick={onRowClick}
        columns={employeeColumns(employees)}
      />
    </div>
  );
};

export default ListEmployees;
