import React, { Fragment } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const AppLayout = ({ children }) => {
  return (
    <Fragment>
      {children}
    </Fragment>
  );
};

export default AppLayout;
