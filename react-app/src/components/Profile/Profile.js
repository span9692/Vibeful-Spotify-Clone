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
  const allUsers = useSelector(state => Object.values(state.alluser))
  const updateFollow = useSelector(state => state.follow)

  console.log('updateFollow', updateFollow)

  // console.log('MMMMMMMMMMMMM')
  let realCurrentUser = allUsers.filter(el => el.id == urlId)[0]
  // console.log(realCurrentUser,'realCurrentUser')
  // console.log(currentUser, 'currentUser')

  useEffect(()=> {
    dispatch(showFollowing(urlId))
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
        <ProfileModal currentUser={realCurrentUser} />
        </div>
        <div className="library_profile_right">
          <div className="library_profile_right_t">
            <h1>
              {realCurrentUser.first_name} {realCurrentUser.last_name}
            </h1>
            <div className="userInfo">{realCurrentUser.first_name} {realCurrentUser.last_name}</div>
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
