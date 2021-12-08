const GET_LIBRARY_SONG = 'playlist_songs/GET_LIBRARY_SONG'

const getLibrarySong = data => {
    return {
        type: GET_LIBRARY_SONG,
        data
    }
}

export const getLibrary = () => async dispatch => {
    const response = await fetch('/api/playlist_song/')
    const data = await response.json()
    dispatch(getLibrarySong(data))
}

export const addToLibrary = (song, currentUserLibrary) => async dispatch => {
    const response = await fetch('/api/playlist_song/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ song, currentUserLibrary })
    })
}

export const removeFromLibrary = (song, currentUserLibrary) => async dispatch => {
    const response = await fetch('/api/playlist_song/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ song, currentUserLibrary })
    })
}


export default function reducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case GET_LIBRARY_SONG:
            newState = {...state}
            newState = action.data
            return newState
        default:
            return state;
    }
}