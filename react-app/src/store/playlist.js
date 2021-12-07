const GET_PLAYLISTS = 'playlists/GET_PLAYLISTS'
const REMOVE_ONE_PLAYLIST = 'playlists/REMOVE_ONE_PLAYLIST';

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
    default:
      return state;
  }
}