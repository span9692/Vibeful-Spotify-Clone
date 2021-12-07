const GET_FOLLOWS = "follows/GET_FOLLOWS";
const REMOVE_FOLLOW = "follows/REMOVE_FOLLOWS";
const ADD_FOLLOW = "follows/ADD_FOLLOWS";

const showFollows = (data) => {
  return {
    type: GET_FOLLOWS,
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
