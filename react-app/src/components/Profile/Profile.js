import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { showFollowing } from "../../store/follow";
import "./Profile.css";
import { editUser, getUser } from "../../store/user";
import ProfileModal from "../Profile/ProfileModal/index.js";
import EditProfile from "../Profile/ProfileModal/EditProfile"
import { useHistory } from "react-router-dom";


function Profile({ user, urlId, followInfo }) {

  const history = useHistory();
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user)
  const allUsers = useSelector(state => Object.values(state.alluser))


  // console.log('followInfo', followInfo)
  // console.log('updateFollow', updateFollow)

  const timeNow = () => {
    const currentHour = new Date().getHours()
    if (currentHour >= 4 && currentHour < 12) return "Good morning!"; 
    else if (12 <= currentHour && currentHour < 18 ) return 'Good afternoon!'
    return 'Good evening!'
  }

    const goSocial = () => {
      history.push(`/users/${realCurrentUser.id}/social`);
    };

  let realCurrentUser = allUsers.filter(el => el.id == urlId)[0]

  useEffect(()=> {
    dispatch(showFollowing())
    dispatch(getUser(user.id))
  }, [dispatch])

  return (
    <div className="library_profile">
      <div className="library_profile_left">
        <div className="library_profile_left_user">
          <img
            className="userProfile"
            alt="sample_profile_pic"
            src={realCurrentUser.profile_pic}
          />
          <ProfileModal currentUser={realCurrentUser} followInfo={followInfo} />
        </div>
        <div className="library_profile_right">
          <div className="library_profile_right_t">
            {currentUser.id == realCurrentUser.id ? <h2>{timeNow()}</h2> : null}
            <h1>
              {realCurrentUser.first_name} {realCurrentUser.last_name}
            </h1>
            <div className="userInfo">
              <span className="pointer" onClick={() => goSocial()}>{followInfo[urlId].followees?.length} Following</span>
              <span>
                <i class="fas fa-link"></i>
              </span>
              <span className="pointer" onClick={() => goSocial()}>{followInfo[urlId].followers?.length} Followers </span>
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
