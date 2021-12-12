import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../store/alluser";
import './follows.css'

import { showFollowing, unfollowUser, followUser } from "../../store/follow";

const Follows = ({ everyone }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const userId = useSelector((state) => state.session.user.id);

  const allUsers = useSelector(state => Object.values(state.alluser))
  const followers = useSelector((state) => Object.values(state.follow));
  // const followees = useSelector((state) => Object.values(state.follow[userId]))[1];

  const [users, setUsers] = useState(everyone);

  useEffect(() => {
    dispatch(showFollowing(allUsers))
    dispatch(getAllUsers())
  }, [dispatch, users]);

  // const handleDelete = (follower_id) => {
  //   dispatch(unfollowUser(follower_id, followee_id));
  // };
  // const handleAddFollower = (id) => {
  //   dispatch(followUser(id));
  // };

  const showEveryone = () => {
    setUsers(allUsers)
  }

  const showFollowers = () => {
    // setUsers(followers)
  }

  const showFollowees = () => {
    // setUsers(followees)
  }
  // everyone is a list of ALL the users
  // followees is a list of users that YOU follow
  // followers is a list of users that follow you

  return (
      <div className='tablediv'>
        <div className='pageTitle'><div>Social Circle</div></div>
        <div className='subTitle'>Stay connected through the music!</div>
        <button onClick={()=>showEveryone()}>everyone</button>
        <button onClick={()=>showFollowers()}>your followers</button>
        <button onClick={()=>showFollowees()}>people YOU follow</button>
        <div className="main_row1">
          {users.map(individual => (
            <div key={individual.id}>
              <Link className="sub_row1" to={`/users/${individual.id}/dashboard`}>
                <img className='subsubrow1 social_image1' src={individual.profile_pic} alt='Image Not Found'></img>
                <div>{individual.first_name} {individual.last_name}</div>
              </Link>
            </div>
          ))}
        </div>
        <div>
          delete everything below later, use as checker for now
          <h1>FOLLOWING</h1>
          {/* {followees.map((followee) => (
            <div key={followee.id}>
              {followee.first_name} {followee.last_name}
            </div>
          ))} */}
        </div>
        <div>
          <h1>FOLLOWERS</h1>
          {/* {followers.map((follower) => (
            <div key={follower.id}>
              {follower.first_name} {follower.last_name}
            </div>
          ))} */}
        </div>
      </div>
    )
};

export default Follows;
