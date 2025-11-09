import React, { useState } from "react";
import Footer from "./components/Footer"; 
import NavBar from "./components/NavBar";
import PostContainer from "./components/PostContainer";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

function App() {
  const [showSignUpPopup, setShowSignUpPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  return (
    <div className="app">
      <NavBar onOpenSignUp={() => setShowSignUpPopup(true)} onOpenLogin={() => setShowLoginPopup(true)} />
      <PostContainer />
      {showSignUpPopup && <SignUp onClose={() => setShowSignUpPopup(false)} onOpenLogin={() => setShowLoginPopup(true)} />}
      {showLoginPopup && <Login onClose={() => setShowLoginPopup(false)} onOpenSignUp={() => setShowSignUpPopup(true)}  />}
      <Footer />
    </div>
  );
}

export default App;
