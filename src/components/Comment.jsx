import React from "react";
import Replay from "./Replay";

const Comment = ({ rootNumber=0, author, timestamp, responses }) => {
  return (
    <div className="comment-tree">
      <div className="comment-header">
        <h3>{author}</h3>
        <span>{new Date(timestamp).toLocaleString()}</span>
      </div>

        <Replay 
            rootNumber={rootNumber}
            author={author}
            timestamp={timestamp}
            responses={responses}
        />
    </div>
  );
};

export default Comment;
