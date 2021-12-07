const GET_SONGS = 'songs/GET_SONGS'

const showSongs = (data) => {
  return {
    type: GET_SONGS,
    data
  }
}

export const getSongs = () => async dispatch => {
  const songs = await fetch('/api/songs')
  const data = await songs.json()
  dispatch(showSongs(data))
}

export default function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case GET_SONGS:
      newState = {...state};
      action.data.songs.forEach(song => newState[song.id] = song)
      return newState;
    default:
      return state;
  }
}