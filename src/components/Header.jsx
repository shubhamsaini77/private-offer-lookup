import React from "react";

const Header = (props) => {
  const headerName = "Mastermind";
  return (
      <div className="common-header">
        <div className="header-logo">
          <span className="header-logo-up"></span>
          <span className="header-logo-down"></span>
        </div>
        <div className="headerName">{headerName}</div>
      </div>
  );
};

export default Header;
