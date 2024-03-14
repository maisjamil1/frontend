import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Details from "./Details";
import { FC } from "react";
import Login from "./Login";
const Pages: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/details/:id" element={<Details />} />
    </Routes>
  );
};

export default Pages;
