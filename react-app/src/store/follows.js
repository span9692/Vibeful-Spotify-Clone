const GET_FOLLOWS = "follows/GET_FOLLOWS";
const REMOVE_FOLLOW = "follows/REMOVE_FOLLOWS";
const ADD_FOLLOW = "follows/ADD_FOLLOWS";

const showFollows = (id) => {
  return {
    type: GET_FOLLOWS,
    payload: id,
  };
};

const removeFollow = (id) => {
  return {
    type: REMOVE_FOLLOW,
    payload: id,
  };
};

const addFollow = (id) => {
  return {
    type: ADD_FOLLOW,
    payload: id,
  };
};

export const showFollowers = (id) => async (dispatch) => {
  const res = await fetch(`/api/users/${id}/follows`);

  if (res.ok) {
    const data = await res.json();
    dispatch(showFollows(data, id));
  }
};

export const unfollowUser = (id) => async (dispatch) => {
  const res = await fetch(`/api/users/${id}/dashboard`, {
    method: "DELETE",
  });

  if (res.ok) {
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

export default function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case GET_FOLLOWS:
      newState = { ...state };
      action.id.playlists.forEach((follow) => (newState[follow.id] = follow));
      return newState;
    case REMOVE_FOLLOW:
      newState = { ...state };
      delete newState[action.id.id];
      return newState;
    case ADD_FOLLOW:
      newState = { ...state, [action.id.id]: action.id };
      return newState;
    default:
      return state;
  }
}
