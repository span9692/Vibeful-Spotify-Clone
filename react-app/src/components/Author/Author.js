import React from "react";
import "./Author.css";

const Author = () => {
    const authors = [
        {
        name: "David Le",
        github: "https://github.com/davidvous",
        linkedin: "https://www.linkedin.com/in/david-vu-le/",
      }, {
        name: "Sean Pan",
        github: "https://github.com/span9692",
        linkedin: "https://www.linkedin.com/in/sean-pan-395a4593/",
      },
      {
        name: "Anthony Fahden",
        github: "https://github.com/juniporous",
        linkedin: "https://www.linkedin.com/in/anthony-fahden-a9251260/",
      },
      {
        name: "Travis Ly",
        github: "https://github.com/lytravis",
        linkedin: "https://www.linkedin.com/in/lytravis/",
      }
    ];

  return (
    <>
      {authors.map((each) => (
        <div className="author-box-info">
          <div className='namebox'>
            <h3>{each.name}</h3>
          </div>
          <div className='gitbox'>
            <a href={`${each.github}`}>
              <img
                className="github_icon"
                alt="github_icon"
                src="https://cdn.discordapp.com/attachments/907133739128217621/907463508101316659/github.png"
              />
            </a>
          </div>
          <div className='linkedbox'>
            <a href={`${each.linkedin}`}>
              <img
                className="linkedin_icon"
                alt="linkedin_icon"
                src="https://media.discordapp.net/attachments/907133739128217621/907465323828084746/linkedin.png"
              />
            </a>
          </div>
        </div>
      ))}
    </>
  );
};

export default Author;
