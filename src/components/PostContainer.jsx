import React from "react";
import Comment from "./Comment";
import { useData } from "../data/GetData";

const PostContainer = ({isAutharised}) => {

  const posts = useData();


  if (!posts) return <p>Loading posts...</p>; 

  // console.log(posts)
  return (
    <main className="main-post">
      <div className="sign-bar">
        {localStorage.getItem("isAuth") != true?
          <button className="new-post-btn">+New Post</button>
        :
        <p>
          <a href="#">Create an account</a> or <a href="#">login</a> to create posts and add operations
        </p>
        }
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
