import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";

import { showFollowing, unfollowUser, followUser } from "../../store/follow";

const Follows = ({ follower_id, followee_id }) => {
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const { id } = useParams();
  const followers = useSelector((state) => Object.values(state.follow))[0];
  const userId = useSelector((state) => state.session.user.id);
  const follows = useSelector((state) => Object.values(state.follow))[1];

  // console.log("THIS IS THE follower_ID", follower_id);
  // console.log("THIS IS THE FOLLOWEE_ID", followee_id);
  console.log("THISBEDA FOLLOWERS-------------->", followers);
  console.log("THISBEDA FOLLOWS-------------->", follows);

  useEffect(() => {
    dispatch(showFollowing(id)).then(() => setLoad(true));
  }, [dispatch, id]);

  const handleDelete = (follower_id) => {
    dispatch(unfollowUser(follower_id, followee_id));
  };
  const handleAddFollower = (id) => {
    dispatch(followUser(id));
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const userComponents = users.map((user) => {
    return (
      <li key={user.id}>
        <ul>
          {user.first_name} {user.last_name}{" "}
          <button onClick={() => handleDelete(user.id)}>Unfollow user</button>
          <button onClick={() => handleAddFollower(user.id)}>
            Follow user
          </button>
        </ul>
      </li>
    );
  });

  return (
    load && (
      <div>
        <div>
          <div>
            <h1>User List: </h1>
            <ul>{userComponents}</ul>
          </div>
          <h1>FOLLOWING</h1>
          {follows.map((follow) => (
            <div key={follow.id}>
              {follow.first_name} {follow.last_name}
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
  );
};

export default Follows;

// const userComponents = users.map((user) => {
//   return (
//     <li key={user.id}>
//       <NavLink to={`/users/${user.id}`}>
//         {user.first_name} {user.last_name}{" "}
//         <button onClick={() => handleDelete(user.id)}>Unfollow user</button>
//         <button onClick={() => handleAddFollower(user.id)}>
//           Follow user
//         </button>
//       </NavLink>
//     </li>
//   );
// });
