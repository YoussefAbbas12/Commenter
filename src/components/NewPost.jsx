// NewPost.jsx
import React, { useState } from "react";

const NewPost = ({ setIsNewPost }) => {
  const [number, setNumber] = useState(0);
  const username = localStorage.getItem("username") || "Guest";

  const handlePost = (e) => {
    fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rootNumber: number, author: username }),

    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          alert(data.message);
          setIsNewPost(false); // Close the form after adding post
        } else {
        }
      });
  };

  return (
    
    <div className="new-post">
      <h3>Create New Post</h3>
      <form onSubmit={handlePost}>
        <input
          type="number"
          className="number-input"
          onChange={(e) => setNumber(Number(e.target.value))}
          placeholder="Enter a number to start..."
          required
        />
        <button type="submit" className="submit-btn">Create Post</button>
        <button type="button" className="nav-btn login-btn" onClick={() => setIsNewPost(false)}>Cancel</button>
      </form>
    </div>
  );
};

export default NewPost;
