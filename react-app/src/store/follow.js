const GET_FOLLOWINGS = "follows/GET_FOLLOWINGS";
const REMOVE_FOLLOW = "follows/REMOVE_FOLLOWS";
const ADD_FOLLOW = "follows/ADD_FOLLOWS";

const showFollowings = (payload) => {
  return {
    type: GET_FOLLOWINGS,
    payload,
  };
};

const removeFollow = (id) => {
  return {
    type: REMOVE_FOLLOW,
    id,
  };
};

const addFollow = (payload) => {
  return {
    type: ADD_FOLLOW,
    payload,
  };
};

export const showFollowing = (id) => async (dispatch) => {
  // console.log("THISISTHEID------------------>", id);
  const res = await fetch(`/api/users/${id}/follows`);
  // console.log("----------->", res);
  if (res.ok) {
    const data = await res.json();
    // console.log("THISBEDADADADADATA------------------>", data);
    dispatch(showFollowings(data, id));
  }
};

export const unfollowUser = (id) => async (dispatch) => {
  console.log("*****DISBEDA----------> id", id);
  const res = await fetch(`/api/users/${id}/dashboard`, {
    method: "DELETE",
  });
  console.log("******DISBEDA res------>", res);
  if (res.ok) {
    console.log("******DISBEDA res.ok------>", res);
    dispatch(removeFollow(id));
  }
};

export const followUser = (id) => async (dispatch) => {
  const res = await fetch(`/users/${id}/dashboard`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(addFollow(data, id));
  }
};

const initialState = { myFollows: [], follows: [] };

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_FOLLOWINGS:
      // console.log("THISISTHEACTION----------->", action);
      // console.log("THISISTHESTATE-------------->", state);
      newState = { ...state };
      newState.myFollows = action.payload;
      return newState;
    case REMOVE_FOLLOW:
      newState = { ...state };
      console.log("*******DISBEDA newState------->", newState[action.id]);
      delete newState[action.id];
      return newState;
    case ADD_FOLLOW:
      newState = { ...state };
      newState.follows.push(action.payload);
      return newState;
    default:
      return state;
  }
}

// export default function reducer(state = {}, action) {
//   let newState;
//   switch (action.type) {
//     case GET_FOLLOWS:
//       console.log("THISISTHEACTION----------->", action);
//       console.log("THISISTHESTATE-------------->", state);
//       newState = { ...state };
//       action.payload.follows.forEach(
//         (follow) => (newState[follow.id] = follow)
//       );
//       return newState;
//     case REMOVE_FOLLOW:
//       newState = { ...state };
//       delete newState[action.id.id];
//       return newState;
//     case ADD_FOLLOW:
//       newState = { ...state, [action.id.id]: action.id };
//       return newState;
//     default:
//       return state;
//   }
// }
