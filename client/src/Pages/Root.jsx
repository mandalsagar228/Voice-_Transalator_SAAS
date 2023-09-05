import { Outlet } from "react-router-dom";
import Header from "../Component/Header";

const Root = () => {
  return (
    <>
      <Header />

      <Outlet />
    </>
  );
};

export default Root;
