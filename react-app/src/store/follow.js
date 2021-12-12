const GET_FOLLOWINGS = "follows/GET_FOLLOWINGS";
const REMOVE_FOLLOW = "follows/REMOVE_FOLLOWS";
const ADD_FOLLOW = "follows/ADD_FOLLOWS";

const showFollowings = (data) => {
  return {
    type: GET_FOLLOWINGS,
    data
  };
};

const removeFollow = (data) => {
  return {
    type: REMOVE_FOLLOW,
    data,
  };
};

const addFollow = (data) => {
  console.log('action creator', data)
  return {
    type: ADD_FOLLOW,
    data,
  };
};
//pass in array of all users
export const showFollowing = () => async (dispatch) => {
  const res = await fetch(`/api/users/yolo/dashboard`);
  if (res.ok) {
    const data = await res.json();
    dispatch(showFollowings(data));
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
    console.log("************DATA**************", data);
    dispatch(removeFollow(data));
  }
};

export const followUser = (follower_id, followee_id) => async (dispatch) => {
  console.log('-------->', follower_id, followee_id, '<------------')
  const res = await fetch("/api/follow/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ "follower":follower_id, "followee":followee_id  }),
  });

  if (res.ok) {
    const data = await res.json();
    console.log(data)
    dispatch(addFollow(data));
  }
};

export default function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case GET_FOLLOWINGS:
      newState = action.data
      return newState;
    case ADD_FOLLOW:
      console.log('state', state)
      console.log('in action.data', action.data)
      console.log('first newState', newState)
      newState = {...state};
      console.log('in newState before update', newState)
      if (!(action.data["follower_id"]['id'] in newState)) {
        newState[action.data["follower_id"]['id']] = [];
      }
      newState[action.data["follower_id"]['id']]['followees'].push(action.data["followee_id"]);
      newState[action.data["followee_id"]['id']]['followers'].push(action.data["follower_id"]);
      console.log('in newState after update', newState)
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
