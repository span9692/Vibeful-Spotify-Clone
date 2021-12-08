import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getSongs } from '../../store/song'
import { playMusic } from '../../store/audio'
import { addToLibrary, getLibrary, removeFromLibrary } from '../../store/playlist_songs'
import Player from '../Player'
import { getPlaylists } from '../../store/playlist'

function SongList() {
    const dispatch = useDispatch()

    const songs = useSelector(state => Object.values(state.song))
    const userId = useSelector(state => state.session.user.id)
    const playlists = useSelector(state => Object.values(state.playlist))
    const currentUserLibrary = playlists.filter(el => el.owner_id == userId && el.playlist_name == 'Library')[0]

    console.log('playlistsssssssssssss', playlists)
    console.log('currentUserLibraryyyyyyyyyyyyyyy', currentUserLibrary)



    useEffect(() => {
        dispatch(getSongs())
        dispatch(getPlaylists())
        dispatch(getLibrary())
    }, [dispatch])

    const play = (song) => {
        dispatch(playMusic(song))
    }

    
    const addLibrarySong = (song) => {
        dispatch(addToLibrary(song, currentUserLibrary))
    }

    const removeLibrarySong = (song) => {
        dispatch(removeFromLibrary(song, currentUserLibrary))
    }

    
    return (
        <div>
            HELLO FROM SONGLIST
            {songs.map(song => (
                <div key={song.id}>
                    <button onClick={() => play(song)}>{song.title} -- {song.artist}</button>
                    {/* {checkLibrarySongExists(song) ? "100" : "3"} */}
                    {/* {false ? "100" : "3"} */}
                    <button onClick={() => addLibrarySong(song)}>Like</button>
                    <button onClick={() => removeLibrarySong(song)}>Unlike</button>
                    <button>Add to Playlist</button>
                </div>

            ))}
            <Player />
        </div>
    )
}

export default SongList;