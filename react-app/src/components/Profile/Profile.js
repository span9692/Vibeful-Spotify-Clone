import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { showFollowing } from "../../store/follow";
import "./Profile.css";
import { editUser, getUser } from "../../store/user";
import ProfileModal from "../Profile/ProfileModal/index.js";
import EditProfile from "../Profile/ProfileModal/EditProfile"

function Profile({ user, urlId, followInfo }) {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user)


  useEffect(()=> {
    dispatch(getUser(user.id))
  }, [dispatch])


  return (
    <div className="library_profile">
      <div className="library_profile_left">
        <div className="library_profile_left_user">
        <img
          className="userProfile"
          alt="sample_profile_pic"
          src={currentUser.profile_pic}
        />
        <ProfileModal currentUser={currentUser} />
        </div>
        <div className="library_profile_right">
          <div className="library_profile_right_t">
            <h1>
              {currentUser.first_name} {currentUser.last_name}
            </h1>
            <div className="userInfo">{currentUser.first_name} {currentUser.last_name}</div>
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
