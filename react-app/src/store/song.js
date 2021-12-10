const GET_SONGS = 'songs/GET_SONGS'

const showSongs = (data) => {
  return {
    type: GET_SONGS,
    data
  }
}

export const getSongs = () => async dispatch => {
  const songs = await fetch('/api/songs/')
  const data = await songs.json()
  dispatch(showSongs(data))
}

export const searchSongs = (searchParam) => async dispatch => {
  const response = await fetch('/api/songs/search', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(searchParam)
  })
  const data = await response.json();
  dispatch(showSongs(data))
}

export default function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case GET_SONGS:
      newState = {};
      action.data.songs.forEach(song => newState[song.id] = song)
      return newState;
    default:
      return state;
  }
}
