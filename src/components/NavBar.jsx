import React from "react";

const NavBar = ({ onOpenSignUp, onOpenLogin , handleLogout }) => {
  const isAutharised = localStorage.getItem("isAuth");

  return (
    <header>
      <h1>NumberComm</h1>
      <div className="nav-buttons">
        {isAutharised ? (
          <>
            <p className="user-name"><i className="fa-solid fa-user"></i> {localStorage.getItem("username")}</p>
            <button
              onClick={handleLogout}
              className="nav-btn logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <button onClick={onOpenLogin} className="nav-btn login-btn">
              Log In
            </button>
            <button onClick={onOpenSignUp} className="nav-btn signup-btn">
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default NavBar;
