import React, { useState } from 'react';

const SignUp = ({ onClose , onOpenLogin , handleRegister }) => {  // استخدم handleRegister

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e)=>{
    e.preventDefault();
    handleRegister(userName,password);  // نفذ handleRegister مش handleSignUp
  }

  return (
    <div className="signup-model-overlay">
      <div className="signup-modal">
        <button className="close-modal" onClick={onClose}>×</button>
        <h2>Create Account</h2>
        <p className="subtitle">Join NumberComm and start sharing numbers!</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              name='username' 
              onChange={(e)=> setUserName(e.target.value)} 
              placeholder="Choose a username" 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              name='password' 
              onChange={(e)=> setPassword(e.target.value)} 
              placeholder="At least 8 characters" 
            />
          </div>

          <button className="submit-btn" type='submit'>Submit</button>
        </form>

        <p className="sign-p">
          Already have an account? 
          <a 
            onClick={() => { onOpenLogin(); onClose(); }} 
            href="#"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
