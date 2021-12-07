import React from "react";
import "./Author.css";

const Author = () => {
    const authors = [
        {
        name: "David Le",
        github: "https://github.com/davidvous",
        linkedin: "/",
      }, {
        name: "Sean Pan",
        github: "https://github.com/span9692",
        linkedin: "/",
      }, 
      {
        name: "Anthony Fahden",
        github: "https://github.com/juniporous",
        linkedin: "/",
      },
      {
        name: "Travis Ly",
        github: "https://github.com/lytravis",
        linkedin: "/",
      }
    ];

  return (
    <>
         {authors.map(each => 
             <div className="author-box-info">
                <h3>{each.name}</h3>
                <span>{each.github}</span>
                <span>{each.linkedin}</span>
             </div>
          )}
    </>
  );
};

export default Author;