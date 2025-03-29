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

  const getCafes = (page) => {
    console.log("getCafes");
    console.log("page:", page);
    console.log("pagination:", pagination);
    fetch(
      `${import.meta.env.VITE_SERVER_URL}/cafes?page=${pagination.page}&limit=${
        pagination.limit
      }`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log("json.data:", json.data);
        console.log("json.data.employees:", json.data.employees);
        setCafes(json.data.cafes);
        setPagination((prevState) => ({
          ...prevState,
          page,
          total: json.data.total,
        }));
      })
      .catch((err) => {
        console.log(err);
        setCafes([]);
      });
  };

  useEffect(() => {
    getCafes(pagination.page);
  }, []);

  const handlePageChange = (page) => {
    console.log("handlePageChange");
    console.log("handlePageChange > page: ", page);
    getCafes(page);
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
