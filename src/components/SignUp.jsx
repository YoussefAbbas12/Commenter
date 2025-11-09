import React from 'react';

const SignUp = ({ onClose , onOpenLogin }) => {
  return (
    <div className="signup-model-overlay">
      <div className="signup-modal">
        <button className="close-modal" onClick={onClose}>×</button>
        <h2>Create Account</h2>
        <p className="subtitle">Join NumberComm and start sharing numbers!</p>

        <form>
          <div className="form-group">
            <label>Username</label>
            <input type="text" placeholder="Choose a username" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="your.email@example.com" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="At least 8 characters" />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Re-enter the password" />
          </div>
        </form>

        <p className="sign-p">
          Already have an account? <a onClick={onOpenLogin} href="#"><p onClick={onClose} style={{display:"inline"}}>Login</p></a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
