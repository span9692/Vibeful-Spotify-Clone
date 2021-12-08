import React from "react";
import "./Library.css"
import { useSelector } from "react-redux";

const Library = () => {

  const user = useSelector((state) => state.session.user);

  return (
    <>
      <div className="libray-container">
        <div className="library_profile">
          <div className="library_profile_left">
            <div className="library_profile_left_top">
              Welcome {user.first_name}!
            </div>
            <div className="library_profile_left_bot">
              >> NaN followers and following NaN people.
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
        <div className="library_songs_meta"></div>
      </div>
    </>
  );
};

export default Library;