import { useEffect, useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "antd";
import { Table, Divider, Tag } from "antd";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    total: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_SERVER_URL}/users/all?page=${
        pagination.page
      }&limit=${pagination.limit}`
    )
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.data.users);
        setPagination((prevState) => ({
          ...prevState,
          total: json.data.total,
        }));
      })
      .catch((err) => {
        console.log(err);
        setUsers([]);
      });
  }, [pagination.limit, pagination.page]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (tags) => (
        <span>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <a>Invite {record.name}</a>
          <Divider type="vertical" />
          <a>Delete</a>
        </span>
      ),
    },
  ];

  return (
    <div className="home">
      <span className="header">User Listings ({pagination.total})</span>
      <Table dataSource={users} />;
      <table className="table">
        <thead className="thead">
          <tr>
            <th>id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>gender</th>
            <th>phone</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {users.map(({ id, first_name, last_name, email, gender, phone }) => {
            return (
              <tr
                key={id}
                onClick={() => {
                  navigate(`/user/${id}`);
                }}
              >
                <td>{id}</td>
                <td>{first_name}</td>
                <td>{last_name}</td>
                <td>{email}</td>
                <td>{gender}</td>
                <td>{phone}</td>
                <td>
                  <DatePicker />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        {Array(pagination.total / pagination.limit)
          .fill(0)
          .map((element, i) => {
            return (
              <button
                key={i}
                className={i + 1 === pagination.page ? "button-active" : ""}
                onClick={() =>
                  setPagination((prevState) => ({ ...prevState, page: i + 1 }))
                }
              >
                {i + 1}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
