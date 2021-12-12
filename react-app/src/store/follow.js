const GET_FOLLOWINGS = "follows/GET_FOLLOWINGS";
const REMOVE_FOLLOW = "follows/REMOVE_FOLLOWS";
const ADD_FOLLOW = "follows/ADD_FOLLOWS";

const showFollowings = (data) => {
  return {
    type: GET_FOLLOWINGS,
    data,
  };
};

const removeFollow = (data) => {
  return {
    type: REMOVE_FOLLOW,
    data,
  };
};

const addFollow = (data) => {
  return {
    type: ADD_FOLLOW,
    data,
  };
};

export const showFollowing = (id) => async (dispatch) => {
  // console.log("THISISTHEID------------------>", id);
  const res = await fetch(`/api/users/${id}/dashboard`);
  // console.log("----------->", res);
  if (res.ok) {
    const data = await res.json();
    // console.log("THISBEDADADADADATA------------------>", data);
    dispatch(showFollowings(data, id));
  }
};

export const unfollowUser = (follower_id, followee_id) => async (dispatch) => {
  // console.log("*****----------> follower_id", follower_id);
  // console.log("*****----------> followee_id", followee_id);
  const res = await fetch("/api/follow/delete", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ follower_id, followee_id }),
  });
  // console.log("****************res*******************", res);
  // console.log("****************res.body*******************", res.body);
  if (res.ok) {
    // console.log("****************res.ok*******************", res);
    const data = await res.json();
    // console.log("************DATA**************", data);
    dispatch(removeFollow(data));
  }
};

export const followUser = (follower_id, followee_id) => async (dispatch) => {
  // console.log("*****----------> follower_id", follower_id);
  // console.log("*****----------> followee_id", followee_id);
  const res = await fetch("/api/follow/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ follower_id, followee_id }),
  });
  // console.log("**********THIS IS THE res**********", res);
  if (res.ok) {
    const data = await res.json();
    // console.log("**********THIS IS THE data**********", data);
    dispatch(addFollow(data));
  }
};

export default function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case GET_FOLLOWINGS:
      newState = { ...state };
      newState = action.data;
      return newState;
    case ADD_FOLLOW:
      newState = { ...state };
      if (!(action.data["follower_id"] in newState)) {
        newState[action.data["follower_id"]] = [];
      }
      newState[action.data["follower_id"]].push(action.data["followee_id"]);
      return newState;
    case REMOVE_FOLLOW:
      newState = { ...state };
      let index = newState[action.data["follower_id"]].indexOf(
        action.data["followee_id"]
      );
      newState[action.data["follower_id"]].splice(index, 1);
      return newState;
    // newState = { ...state };
    // delete newState[action.data];
    // return newState;
    default:
      return state;
  }
}
