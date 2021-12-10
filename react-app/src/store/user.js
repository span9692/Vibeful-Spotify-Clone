const GET_ONE_USER = 'users/GET_ONE_USER'
const REMOVE_ONE_USER = 'users/REMOVE_ONE_USER';
const SET_USER = "users/SET_USER";
const EDIT_PROFILE_PIC = 'users/EDIT_PROFILE_PIC'

// Action Creators
const showUser = data => {
  return {
    type: GET_ONE_USER,
    data
  }
}

const setUser = (payload) => ({
  type: SET_USER,
  payload
});

const removeOneUser = id => {
    return {
        type: REMOVE_ONE_USER,
        payload: id
    };
};

// Thunk Creators
export const getUser = (id) => async dispatch => {
  const response = await fetch(`/api/users/${id}`)
  const user = await response.json()
  dispatch(showUser(user))
}

/*  revamping edit user */
export const editUserDetail =
  (id, first_name, last_name, email, profile_pic, password) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        first_name,
        last_name,
        email,
        profile_pic,
        password
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
    } 
    else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
  };

export const deleteUser = id => async dispatch => {
    const response = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      dispatch(removeOneUser(id));
    }
  };

  const initialState = {};
  export default function reducer(state = initialState, action) {
    let newState = {};
    switch (action.type) {
      case GET_ONE_USER:
        newState = action.data;
        return newState;
      case EDIT_PROFILE_PIC:
        newState = action.data;
        return newState;
      case SET_USER:
        newState = action.payload
        return newState;
      case REMOVE_ONE_USER:
        newState = { ...state };
        delete newState[action.payload];
        return newState;
      default:
        return state;
    }
  }
