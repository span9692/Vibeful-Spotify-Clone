import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";

import { showFollowing, unfollowUser } from "../../store/follow";

const Follows = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const follows = useSelector((state) => Object.values(state.follow));
  //   console.log("THISBEDAFOLLOWS-------------->", follows);

  useEffect(() => {
    dispatch(showFollowing(id));
  }, [dispatch, id]);

  const handleDelete = (id) => {
    dispatch(unfollowUser(id));
  };

  return (
    <div>
      <h1>FOLLOWS</h1>
      {follows.map((follow) => (
        <div key={follow.id}>
          {follow.follower_id} -- {follow.followee_id}
          <button onClick={() => handleDelete(follow.id)}>Unfollow user</button>
        </div>
      ))}
    </div>
  );
};

export default Follows;

