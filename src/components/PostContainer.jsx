// PostContainer.jsx
import React, { useState } from "react";
import Comment from "./Comment";
import { useData } from "../data/GetData";
import NewPost from "./NewPost";

const PostContainer = ({ isAutharised }) => {
  const [isNewPost, setIsNewPost] = useState(false);
  const posts = useData();

  if (!posts) return <p>Loading posts...</p>;

  const isLoggedIn = localStorage.getItem("isAuth") === "true";

  return (
    <main className="main-post">
      <div className="sign-bar">
        {!isLoggedIn && "Create an account or login to create posts and add operations"}

        {isLoggedIn && !isNewPost && (
          <p>
            <button className="new-post-btn" onClick={() => setIsNewPost(true)}>+ New Post</button>
          </p>
        )}

        {isLoggedIn && isNewPost && (
          <NewPost setIsNewPost={setIsNewPost} />
        )}
      </div>

      <div className="posts-container">
        {posts.map((post) => (
          <Comment
            isAutharised={isAutharised}
            key={post.id}
            rootNumber={post.rootNumber}
            author={post.author}
            timestamp={post.timestamp}
            responses={post.responses}
          />
        ))}
      </div>
    </main>
  );
};

export default PostContainer;
