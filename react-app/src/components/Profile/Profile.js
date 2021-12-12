import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { showFollowing } from "../../store/follow";
import "./Profile.css";
import { editUser, getUser } from "../../store/user";
import ProfileModal from "../Profile/ProfileModal/index.js";
import EditProfile from "../Profile/ProfileModal/EditProfile"


function Profile({ user, urlId, followInfo }) {
  // const [info, setInfo] = useState(followInfo)
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user)
  const allUsers = useSelector(state => Object.values(state.alluser))


  // console.log('followInfo', followInfo)
  // console.log('updateFollow', updateFollow)

  const timeNow = () => {
    const currentHour = new Date().getHours()
    if (currentHour >= 18) return 'Good evening!'
    else if (12 < currentHour && currentHour < 18 ) return 'Good afternoon!'
    return 'Good morning!'
  }

  console.log(timeNow, "<---it is the time now")



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
            <h2>{timeNow()}</h2>
            <h1>
              {realCurrentUser.first_name} {realCurrentUser.last_name}
            </h1>
            <div className="userInfo">
              <span>{followInfo[urlId].followees?.length} Following</span>
              <span>
                <i class="fas fa-link"></i>
              </span>
              <span>{followInfo[urlId].followers?.length} Followers </span>
            </div>
          </div>
          <div>
            <div className="profileVideoContainer">
              <video className="profileVideo" autoPlay loop muted>
                <source
                  src="https://res.cloudinary.com/dpxlirk9q/video/upload/v1639293102/profile_2531140_gci36y.mp4"
                  type="video/mp4"
                />
              </video>
              </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;
