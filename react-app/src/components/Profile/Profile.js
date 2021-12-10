import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { showFollowing } from "../../store/follow";
import "./Profile.css";

function Profile({ user, followInfo }) {


  return (
    <div className="library_profile">
      <div className="library_profile_left">
        <div className="library_profile_left_left">
          Following
          <div className="followers-tile">
            {followInfo.following.length} people
          </div>
        </div>
        <div className="library_profile_left_mid">
          Followers
          <div className="followers-tile">
            {followInfo.followers.length} people
          </div>
        </div>
        <div className="library_profile_left_right">
          Welcome {user.first_name}!
          <div className="userInfo">Member since 2021</div>
        </div>
      </div>
      <div className="library_profile_right">
        <img
          className="userProfile"
          alt="sample_profile_pic"
          src="https://media.discordapp.net/attachments/917541871457275925/918846475897798727/default-user.jpeg"
        />
      </div>
    </div>
  );
}

export default Profile;
