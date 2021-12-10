import React from "react";
import "./Library.css"
import { useSelector } from "react-redux";
import SongList from "../Songs";
import SinglePlaylist from "../SinglePlaylist";
import Search from '../Search';
import Follows from "../Follows";
import SongLibrary from "../SongLibrary";



const Library = () => {

  const user = useSelector((state) => state.session.user);

  let options = null;

  if (window.location.href.endsWith("songs")) {
    options = (
      <div className="library_songs_meta"><SongList /></div>
    )
  } else if (window.location.href.endsWith("dashboard")) {
    options = (
      <div className="library_profile">
          <div className="library_profile_left">
            <div className="library_profile_left_top">
              Welcome {user.first_name}!
            </div>
            <div className="library_profile_left_bot">
              NaN followers and following NaN people.
            </div>
          </div>
          <div className="library_profile_right">
            <img
              className="userProfile"
              alt="sample_profile_pic"
              src="https://media.discordapp.net/attachments/917541871457275925/917916180486971402/sample_prof.png"
            />
          </div>
        </div>
    )
  } else if (window.location.href.includes("playlist/")) {
    options = (
      <div className="library_songs_meta"><SinglePlaylist /></div>
    )
  } else if (window.location.href.endsWith('search')) {
    options = (
      <div className="library_songs_meta"><Search /></div>
    )
  } else if (window.location.href.endsWith('library')) {
    options = (
      <div className="library_songs_meta"><SongLibrary /></div>
    )
  } else if (window.location.href.endsWith('social')) {
    options = (
      <div className="library_songs_meta"><Follows /></div>
    )
  }

  // <div className="library_profile">
  //   <div className="library_profile_left">
  //     <div className="library_profile_left_top">
  //       Welcome {user.first_name}!
  //     </div>
  //     <div className="library_profile_left_bot">
  //       NaN followers and following NaN people.
  //     </div>
  //   </div>
  //   <div className="library_profile_right">
  //     <img
  //       className="userProfile"
  //       alt="sample_profile_pic"
  //       src="https://media.discordapp.net/attachments/917541871457275925/917916180486971402/sample_prof.png"
  //     />
  //   </div>
  // </div>
  // <div className="library_songs_meta"><SongList /></div>
  return (
    <>
      <div className="libray-container">
        {options}
      </div>
    </>
  );
};

export default Library;
