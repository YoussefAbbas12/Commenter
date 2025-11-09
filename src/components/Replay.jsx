import React, { useState } from 'react';

const Replay = ({ rootNumber=0, author, responses , isRoot ,result ,operand , operation }) => {
  const [expanded, setExpanded] = useState(false);

//   if(!rootNumber&!author&!responses&!result&!operand&!operation){return "Loading..."}

  return (
    <div className="comment-body">
      <div className="number-container">
        <div onClick={() => setExpanded(!expanded)} style={responses.length != 0?{cursor: "pointer"}:{}} className="number">
            {isRoot==0?<div className="operation-display">{operation}{operand}=</div>:""}            
          <span>{rootNumber != 0? rootNumber : result}</span> By {author}
        </div>
      </div>

      {responses && responses.length > 0 && (
          <div className="expand-btn" onClick={() => setExpanded(!expanded)}>
          {expanded ? "-" + responses.length : "+" + responses.length}
        </div>
      )}

      {expanded && responses && responses.length > 0 && (
          <div className="responses">
          {responses.map((resp) => (
              <Replay
              key={resp.id}
              rootNumber={resp.result}
              operation={resp.operation}
              operand={resp.operand}
              result={resp.result}
              author={resp.author}
              timestamp={resp.timestamp}
              responses={resp.responses}
              isRoot={false}
              />
            ))}
        </div>
      )}
      {isRoot == true}
    </div>
  );
};

export default Replay;
