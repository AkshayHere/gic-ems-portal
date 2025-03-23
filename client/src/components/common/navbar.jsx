import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { Outlet } from "react-router-dom";

const items = [
  {
    key: "grp",
    label: "Endpoints",
    type: "group",
    children: [
      {
        key: "/",
        label: "Home",
      },
      {
        key: "/employees",
        label: "Get all employees",
      },
      {
        key: "/cafes",
        label: "Get all cafes",
      },
    ],
  },
];

const NavBar = () => {
  const [current, setCurrent] = useState("/");
  const onClick = (e) => {
    setCurrent(e.key);
    window.location.href = e.key;
  };

  useEffect(() => {
    // console.log("current: ", window.location.pathname);
    setCurrent(window.location.pathname);
  }, []);

  return (
    <div>
      <header>
        <h1 style={{ paddingLeft: "20px", paddingTop: "13px" }}>EMS Portal</h1>
        <nav style={{ position: "absolute", height: "100%" }}>
          <Menu
            onClick={onClick}
            style={{
              width: 256,
              height: "100%",
            }}
            mode="inline"
            selectedKeys={[current]}
            items={items}
          />
        </nav>
      </header>
      <main style={{ paddingLeft: "270px", paddingRight: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default NavBar;
