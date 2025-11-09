import React from 'react';

const Login = ({ onClose , onOpenSignUp  }) => {
  return (
    <div className="signup-model-overlay">
      <div className="signup-modal">
        <button className="close-modal" onClick={onClose}>×</button>
        <h2>Login to NumberComm</h2>
        <p className="subtitle">Welcome back! Enter your credentials to continue</p>

        <form method='post'>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="your.email@example.com" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>
        </form>

        <p className="sign-p">
            Don't have an account? <a onClick={onOpenSignUp} href="#"><p onClick={onClose} style={{display:"inline"}}>Sign up</p></a>
        </p>
      </div>
    </div>
  );
};

export default Login;
