import React, { useState } from "react";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import PostContainer from "./components/PostContainer";
import SignUp from "./components/SignUp";

function App() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="app">
      <NavBar onOpenSignUp={() => setShowPopup(true)} />
      <PostContainer />
      {showPopup && <SignUp onClose={() => setShowPopup(false)} />}
      <Footer />
    </div>
  );
}

export default App;
