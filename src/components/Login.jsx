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
            <label>Username</label>
            <input type="text" name='username' placeholder="Choose a username" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name='password' placeholder="Enter your password" />
          </div>
          <button className="submit-btn" type='submit'>Submit</button>
        </form>

        <p className="sign-p">
            Don't have an account? <a onClick={onOpenSignUp} href="#"><p onClick={onClose} style={{display:"inline"}}>Sign up</p></a>
        </p>
      </div>
    </div>
  );
};

export default Login;
