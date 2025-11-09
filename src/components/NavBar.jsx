import React from "react";

const NavBar = ({ onOpenSignUp , onOpenLogin }) => {
  return (
    <header>
      <h1>NumberComm</h1>
      <div className="nav-buttons">
        <button onClick={onOpenLogin} className="nav-btn login-btn">
          Log In
        </button>
        <button onClick={onOpenSignUp} className="nav-btn signup-btn">
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default NavBar;
