const REMOVE_ONE_USER = 'users/REMOVE_ONE_USER';

// Action Creators


const removeOneUser = id => {
    return {
        type: REMOVE_ONE_USER,
        payload: id
    };
};

// Thunk Creators


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
      case REMOVE_ONE_USER:
        newState = { ...state };
        delete newState[action.payload];
        return newState;
      default:
        return state;
    }
  }