import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../store/alluser";

import { showFollowing, unfollowUser, followUser } from "../../store/follow";

const Follows = ({ follower_id, followee_id }) => {
  // const [users, setUsers] = useState([]);
  // const [load, setLoad] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams();
  const userId = useSelector((state) => state.session.user.id);

  const everyone = useSelector(state => Object.values(state.alluser))
  const followers = useSelector((state) => Object.values(state.follow))[0];
  const followees = useSelector((state) => Object.values(state.follow))[1];

  console.log('everyone', everyone)
  // console.log("THIS IS THE follower_ID", follower_id);
  // console.log("THIS IS THE FOLLOWEE_ID", followee_id);
  // console.log("THISBEDA FOLLOWERS-------------->", followers);
  // console.log("THISBEDA FOLLOWS-------------->", follows);

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch]);

  const handleDelete = (follower_id) => {
    dispatch(unfollowUser(follower_id, followee_id));
  };
  const handleAddFollower = (id) => {
    dispatch(followUser(id));
  };

  // everyone is a list of ALL the users
  // followee is a list of users that YOU follow
  // followers is a list of users that follow you

  return (
      <div className='tablediv'>
        <div className='pageTitle'><div>Social Circle</div></div>
        <div className='subTitle'>Stay connected through music!</div>
        <div className="main_row">
          {everyone.map(individual => (
            <div key={individual.id}>
              <Link className="sub_row" to={`/users/${individual.id}/dashboard`}>
                <img className='subsubrow social_image' src={individual.profile_pic} alt='Image Not Found'></img>
                <div>{individual.first_name} {individual.last_name}</div>
              </Link>
            </div>
          ))}
        </div>
        <div>
          <h1>FOLLOWING</h1>
          {followees.map((followee) => (
            <div key={followee.id}>
              {followee.first_name} {followee.last_name}
            </div>
          ))}
        </div>
        <div>
          <h1>FOLLOWERS</h1>
          {followers.map((follower) => (
            <div key={follower.id}>
              {follower.first_name} {follower.last_name}
            </div>
          ))}
        </div>
      </div>
    )
};

export default Follows;
