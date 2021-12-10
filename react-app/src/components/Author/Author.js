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
                <a href={`${each.github}`}><img className="github_icon" alt="github_icon" src="https://cdn.discordapp.com/attachments/907133739128217621/907463508101316659/github.png"/></a>
                <a href={`${each.linkedin}`}><img className="linkedin_icon" alt="linkedin_icon" src="https://media.discordapp.net/attachments/907133739128217621/907465323828084746/linkedin.png"/></a>
             </div>
          )}
    </>
  );
};

export default Author;