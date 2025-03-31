import { useEffect, useState } from "react";
import "./index.css";
import CustomTable from "../../../components/home/Table";
import { cafeColumns } from "../../../components/home/TableColumns";
import { Button, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";

const ListCafes = () => {
  const [cafes, setCafes] = useState([]);
  const history = useNavigate();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    total: 0,
  });

  const getCafes = (page, limit) => {
    console.log("getCafes");
    console.log("page:", page);
    console.log("pagination:", pagination);
    fetch(
      // `${import.meta.env.VITE_SERVER_URL}/cafes?page=${page}&limit=${limit}`
      `${import.meta.env.VITE_SERVER_URL}/cafes/all`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log("json.data:", json.data);
        console.log("json.data.employees:", json.data.employees);
        setCafes(json.data.cafes);
        setPagination((prevState) => ({
          ...prevState,
          page,
          limit,
          total: json.data.employees.length,
        }));
      })
      .catch((err) => {
        console.log(err);
        setCafes([]);
      });
  };

  useEffect(() => {
    getCafes(pagination.page, pagination.limit);
  }, []);

  const handlePageChange = (page, limit) => {
    console.log("handlePageChange");
    console.log("handlePageChange > page: ", page);
    getCafes(page, limit);
  };

  return (
    <div className="home">
      <span className="header">Cafes ({pagination.total})</span>
      <Row gutter={[16, 16]}>
        <Col className="header" span={6}>
          <Button
            variant="solid"
            color="green"
            onClick={() => {
              history("/cafes/create");
            }}
            block
          >
            Create Cafe
          </Button>
        </Col>
      </Row>
      <CustomTable
        data={cafes}
        page={pagination.page}
        total={pagination.total}
        limit={pagination.limit}
        onPageChange={handlePageChange}
        columns={cafeColumns()}
      />
    </div>
  );
};

export default ListCafes;
