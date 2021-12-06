const initialState = {};

const GET_SONGS = 'songs/GET_SONGS'

const showSongs = (data) => {
  return {
    type: GET_SONGS,
    data
  }
}

export const getSongs = () => async dispatch => {
  
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
      default:
        return state;
    }
  }