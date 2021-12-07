const ADD_LIBRARY_SONG = 'playlist_songs/ADD_LIBRARY_SONG'

const newLibrarySong = data => {
    return {
        type: ADD_LIBRARY_SONG,
        data
    }
}

export const addToLibrary = (song, currentUserLibrary) => async dispatch => {
    console.log(song, 'this is the songggggggggggg')
    console.log(currentUserLibrary, 'this is the currentUserLibrary')
    const response = await fetch('/api/playlist_song/', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({song, currentUserLibrary})
    })
}

export const removeFromLibrary = (song, currentUserLibrary) => async dispatch => {
    console.log(song, 'this is the songggggggggggg')
    console.log(currentUserLibrary, 'this is the currentUserLibrary')
    const response = await fetch('/api/playlist_song/delete', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({song, currentUserLibrary})
    })
}

export default function reducer(state = {}, action) {
    let newState;
    switch (action.type) {
      default:
        return state;
    }
  }