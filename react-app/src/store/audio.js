const PLAY_SONG = 'songs/PLAY_SONGS'

export const playMusic = (data) => {
    return {
        type: PLAY_SONG,
        data
    }
}

export default function reducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case PLAY_SONG:
            newState = {...state}
            newState = action.data
            return newState;
        default:
            return state;
    }
}