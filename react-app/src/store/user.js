const GET_ONE_USER = 'users/GET_ONE_USER'
const REMOVE_ONE_USER = 'users/REMOVE_ONE_USER';
const EDIT_PROFILE_PIC = 'users/EDIT_PROFILE_PIC'

// Action Creators
const showUser = data => {
  return {
    type: GET_ONE_USER,
    data
  }
}

const editPic = data => {
  return {
    type: EDIT_PROFILE_PIC,
    data
  }
}

const removeOneUser = id => {
    return {
        type: REMOVE_ONE_USER,
        payload: id
    };
};

// Thunk Creators
export const getUser = (id) => async dispatch => {
  console.log('WE IN THE THUNK BABY')
  const response = await fetch(`/api/users/${id}`)
  const user = await response.json()
  dispatch(showUser(user))
}

export const editUser = (data, id) => async dispatch => {
  const response = await fetch(`/api/users/${id}/edit`, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({data, id})
  })
  const updated = await response.json()
  dispatch(editPic(updated))
}

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
        newState = action.data
        return newState
      case EDIT_PROFILE_PIC:
        console.log('action.data', action.data)
        newState = action.data
        console.log('newState', newState)
        return newState
      case REMOVE_ONE_USER:
        newState = { ...state };
        delete newState[action.payload];
        return newState;
      default:
        return state;
    }
  }
