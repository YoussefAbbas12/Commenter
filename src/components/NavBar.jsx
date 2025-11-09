import React from "react";

const NavBar = ({ onOpenSignUp }) => {
  return (
    <header>
      <h1>NumberComm</h1>
      <div className="nav-buttons">
        <button onClick={onOpenSignUp} className="nav-btn login-btn">
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
