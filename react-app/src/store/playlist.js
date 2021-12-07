const GET_PLAYLISTS = 'playlists/GET_PLAYLISTS'
const REMOVE_ONE_PLAYLIST = 'playlists/REMOVE_ONE_PLAYLIST';
const ADD_ONE_PLAYLIST = 'playlists/ADD_ONE_PLAYLIST'

//Define Action Creators
const showPlaylists = (data) => {
  return {
    type: GET_PLAYLISTS,
    data
  }
}

const removeOnePlaylist = id => {
    return { 
        type: REMOVE_ONE_PLAYLIST, 
        payload: id 
    };
};

const addOnePlaylist = payload => {
    return {
        type: ADD_ONE_PLAYLIST,
        payload
    }
}

// Define Thunk Creators
export const getPlaylists = () => async dispatch => {
  const playlists = await fetch('/api/playlists')
  const data = await playlists.json()
  dispatch(showPlaylists(data))
}


export const deletePlaylist = id => async dispatch => {
    const response = await fetch(`/api/playlists/${id}`, {
      method: 'DELETE',
    });
  
    if (response.ok) {
      dispatch(removeOnePlaylist(id));
    }
  };

  export const addPlaylist = playlist => async dispatch => {
    const response = await fetch('/api/playlists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(playlist),
    });
  
    if (response.ok) {
      const data = await response.json();
      dispatch(addOnePlaylist(data.playlist));
    }
  };

// Define reducer
export default function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case GET_PLAYLISTS:
      newState = {...state};
      action.data.playlists.forEach(playlist => newState[playlist.id] = playlist)
      return newState;
    case REMOVE_ONE_PLAYLIST:
      newState = { ...state };
      delete newState[action.payload];
      return newState;
    case ADD_ONE_PLAYLIST:
      newState = { ...state, [action.payload.id]: action.payload};
      return newState;
    default:
      return state;
  }
}