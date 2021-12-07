import React from 'react';
import './Splash.css';
import Author from '../Author/Author.js'

const Splash = () => {
const stockImages = {
  google:
    "https://cdn.discordapp.com/attachments/917541871457275925/917571215416246283/google-play-badge.png",
  apple:
    "https://cdn.discordapp.com/attachments/917541871457275925/917574021829230702/apple_badge.png",
};
    return (
      <>
        <div className="main">
          <div className="main-content">
            <div className="main-content-heading">
              <h1>You bring the vibes, we bring the music.</h1>
              <span>
                Discover songs, playlists, and albums. With friends. And jam
                out. <span className="vibeText">It's a vibeful day.</span>
              </span>
            </div>
            <div className="main-content-text">
                <a href="apple.com"><img alt="" className="appleBadge" src={`${stockImages.apple}`}/></a>
                <a href="google.com"><img alt="" className="googleBadge" src={`${stockImages.google}`}/></a>
            </div>
            <div className="main-content-author">
              <Author />
            </div>
          </div>
        </div>
      </>
    );
}

export default Splash;