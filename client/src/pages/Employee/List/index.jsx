import { useEffect, useState } from "react";
import "./index.css";
import CustomTable from "../../../components/home/Table";
import { employeeColumns } from "../../../components/home/TableColumns";

const ListEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    total: 0,
  });

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_SERVER_URL}/employees?page=${
        pagination.page
      }&limit=${pagination.limit}`
    )
      .then((res) => res.json())
      .then((json) => {
        setEmployees(json.data.employees);
        setPagination((prevState) => ({
          ...prevState,
          total: json.data.total,
        }));
      })
      .catch((err) => {
        console.log(err);
        setEmployees([]);
      });
  }, [pagination.limit, pagination.page]);

  const handlePageChange = (page) => {
    setPagination((prevState) => ({
      ...prevState,
      page,
    }));
  };

  return (
    <div className="home">
      <span className="header">Employees ({pagination.total})</span>
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
