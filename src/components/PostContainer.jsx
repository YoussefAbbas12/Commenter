import React from "react";
import Comment from "./Comment";
import { useData } from "../data/data";

const PostContainer = () => {
  const posts = useData();

  if (!posts) return <p>Loading posts...</p>; 

  console.log(posts)
  return (
    <main className="main-post">
      <div className="sign-bar">
        <p>
          <a href="#">Create an account</a> or <a href="#">login</a> to create posts and add operations
        </p>
      </div>

        <div className="posts-container">
        {posts.map((post) => (
            <Comment
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
