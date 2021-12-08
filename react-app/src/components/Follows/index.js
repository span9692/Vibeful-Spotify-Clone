import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";

import { showFollowing, unfollowUser } from "../../store/follow";

const Follows = () => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const { id } = useParams();
  const followers = useSelector((state) =>
    Object.values(state.follow.myFollows)
  )[0];

  const follows = useSelector((state) =>
    Object.values(state.follow.myFollows)
  )[1];

  console.log("THISBEDA FOLLOWERS-------------->", followers);
  console.log("THISBEDA FOLLOWS-------------->", follows);

  useEffect(() => {
    dispatch(showFollowing(id)).then(() => setLoad(true));
  }, [dispatch, id]);

  const handleDelete = (id) => {
    dispatch(unfollowUser(id));
  };

  return (
    load && (
      <div>
        <div>
          <h1>FOLLOWING</h1>
          {follows.map((follow) => (
            <div key={follow.id}>
              {follow.first_name} {follow.last_name}
              <button onClick={() => handleDelete(follow.id)}>
                Unfollow user
              </button>
            </div>
          ))}
        </div>
        <div>
          <h1>FOLLOWERS</h1>
          {followers.map((follower) => (
            <div key={follower.id}>
              {follower.first_name} {follower.last_name}
              <button onClick={() => handleDelete(follower.id)}>
                Unfollow user
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Follows;
