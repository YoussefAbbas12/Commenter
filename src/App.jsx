import React, { useState } from "react";
import Footer from "./components/Footer"; 
import NavBar from "./components/NavBar";
import PostContainer from "./components/PostContainer";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

function App() {
  const [showSignUpPopup, setShowSignUpPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isAutharised , setIsAutharised] = useState(false)
  const [userName , setUserName] = useState("Gest")

  const handleLogout = () => {
    // مسح بيانات المستخدم
    localStorage.removeItem("username");
    localStorage.removeItem("isAuth");
  
    // تحديث حالات React
    setIsAutharised(false);
    setUserName("Guest");
  
    // لو فيه بوب أب مفتوح، ممكن نقفله
    setShowLoginPopup(false);
    setShowSignUpPopup(false);
  };
  

  const handleLogin = (username, password) => {
    fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          localStorage.setItem("username", username);
          localStorage.setItem("isAuth", "true");
          setShowLoginPopup(false); 
          setIsAutharised(true);
          setUserName(username);
        } else {
          alert(data.message);
        }
      });
  };
  
  const handleRegister = (username, password) => {
    fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === "Account created successfully") {
          setShowSignUpPopup(false);
          localStorage.setItem("username", username);
          localStorage.setItem("isAuth", "true");
          alert("Account created! Now log in.");
        } else {
          alert(data.message);
        }
      });
  };
  

  console.log(userName)


  return (
    <div className="app">
      <NavBar handleLogout={handleLogout} currentUser={userName} isAutharised={isAutharised} onOpenSignUp={() => setShowSignUpPopup(true)} onOpenLogin={() => setShowLoginPopup(true)} />

      <PostContainer isAutharised={isAutharised}/>
      {showSignUpPopup && <SignUp onClose={() => setShowSignUpPopup(false)} onOpenLogin={() => setShowLoginPopup(true)} handleRegister={handleRegister} />}
      {showLoginPopup && <Login onClose={() => setShowLoginPopup(false)} onOpenSignUp={() => setShowSignUpPopup(true)} handleLogin={handleLogin} />}

      <Footer />
    </div>
  );
}

export default App;
