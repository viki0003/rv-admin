import React from "react";
import AdminLogo from "../../Assets/Images/RVLogo.png";
import "./header.css";
import { Link } from "react-router";


const Header = () => {
  
  return (
    <header>
      <div className="header">
        <Link to="/" className="header-logo">
          <img src={AdminLogo} alt="logo" width={200} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
