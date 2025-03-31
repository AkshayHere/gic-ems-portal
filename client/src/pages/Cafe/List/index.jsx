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

  const getCafes = () => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/cafes`)
      .then((res) => res.json())
      .then((json) => {
        setCafes(json.data.cafes);
        setPagination((prevState) => ({
          ...prevState,
          total: json.data.cafes.length,
        }));
      })
      .catch((err) => {
        console.error(err);
        setCafes([]);
      });
  };

  useEffect(() => {
    getCafes();
  }, []);

  const handleFilterChange = (page, limit, total) => {
    setPagination((prevState) => ({
      ...prevState,
      page,
      limit,
      total,
    }));
  };

  const onRowClick = (rowData) => {
    history(`/cafes/detail/${rowData.id}`);
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
        handleFilterChange={handleFilterChange}
        onRowClick={onRowClick}
        columns={cafeColumns(cafes)}
      />
    </div>
  );
};

export default ListCafes;
