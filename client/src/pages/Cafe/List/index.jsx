import { useEffect, useState } from "react";
import "./index.css";
import CustomTable from "../../../components/home/Table";
import { cafeColumns } from "../../../components/home/TableColumns";

const ListCafes = () => {
  const [cafes, setCafes] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    total: 0,
  });

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_SERVER_URL}/cafes?page=${
        pagination.page
      }&limit=${pagination.limit}`
    )
      .then((res) => res.json())
      .then((json) => {
        setCafes(json.data.cafes);
        setPagination((prevState) => ({
          ...prevState,
          total: json.data.total,
        }));
      })
      .catch((err) => {
        console.log(err);
        setCafes([]);
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
      <span className="header">Cafes ({pagination.total})</span>
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
