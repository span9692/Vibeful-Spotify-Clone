import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { showFollowing } from "../../store/follow";
import "./Profile.css";

function Profile({ user, followInfo }) {


  return (
    <div className="library_profile">
      <div className="library_profile_left">
        <img
          className="userProfile"
          alt="sample_profile_pic"
          src="https://media.discordapp.net/attachments/917541871457275925/918846475897798727/default-user.jpeg"
        />
        <div className="library_profile_right">
          <div className="library_profile_right_t">
            <h1>
              {user.first_name} {user.last_name}
            </h1>
            <div className="userInfo">User Meta</div>
          </div>
          <div className="library_profile_right_b">
            <div className="library_profile_right_b1">
              {followInfo.following?.length} Following 
            </div>
            <div className="library_profile_right_b2">
              -{followInfo.followers?.length} Followers
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
