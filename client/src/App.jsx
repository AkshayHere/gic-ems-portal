import "./App.css";
import "antd/dist/reset.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ListEmployees from "./pages/Employee/List";
import React from "react";
import NavBar from "./components/common/navbar";
import ListCafes from "./pages/Cafe/List";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route path="/home" element={<Navigate to={"/"} />} />
            <Route path="/" element={<Home />} />
            <Route path="/employees" element={<ListEmployees />} />
            <Route path="/cafes" element={<ListCafes />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
