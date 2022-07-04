import React from "react";

const Layout = ({ children }: any) => {
  return (
    <div
      className="d-flex align-items-center "
      style={{ minHeight: "100vh", background: "#E5E5E5" }}
    >
      <div className="container py-5">{children}</div>
    </div>
  );
};

export default Layout;
