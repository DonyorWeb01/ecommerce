import React from "react";
import { FaStar } from "react-icons/fa";
import "./Stars.scss";

function Stars({stars}) {
  return (
    <div className="imgs">
      {Array.from({length: 5}, (_, index) => (
        <FaStar
          key={index}
          color={index < stars ? "gold" : "gray"} 
        />
      ))}
    </div>
  );
}

export default Stars;
