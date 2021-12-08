const GET_LIBRARY_SONG = 'playlist_songs/GET_LIBRARY_SONG'
const ADD_LIBRARY_SONG_PLAYLIST = 'playlist_songs/ADD_LIBRARY_SONG_PLAYLIST'

const getLibrarySong = data => {
    return {
        type: GET_LIBRARY_SONG,
        data
    }
}

const addToLibrarySongPlaylist = data => {
    return {
        type: ADD_LIBRARY_SONG_PLAYLIST,
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
    if (response.ok) {
        const data = await response.json()
        console.log('DATA!!! BACK FROM THE BACKEND', data)
        dispatch(addToLibrarySongPlaylist(data))
    }
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
        case ADD_LIBRARY_SONG_PLAYLIST:
            newState = {...state}
            console.log('IN THE REDUCER, newState', newState)
            newState[action.data["listId"]].push(action.data["musicId"])
            console.log('IN THE REDUCER, UPDATED newState', newState)
            return newState
        default:
            return state;
    }
}