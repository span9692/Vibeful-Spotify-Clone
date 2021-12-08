import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getSongs } from '../../store/song'
import { playMusic } from '../../store/audio'
import { addToLibrary, getLibrary, removeFromLibrary } from '../../store/playlist_songs'
import Player from '../Player'
import { getPlaylists } from '../../store/playlist'
import AddToPlaylist from '../AddSongtoPlaylist'

function SongList() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)

    const songs = useSelector(state => Object.values(state.song))
    const userId = useSelector(state => state.session.user.id)
    const playlists = useSelector(state => Object.values(state.playlist))
    const currentUserLibrary = playlists.filter(el => el.owner_id == userId && el.playlist_name == 'Library')[0]
    const playlist_songs = useSelector(state => state.playlist_song)

    console.log('playlists', playlists)
    console.log('currentUserLibraryy', currentUserLibrary)
    console.log('songggg', songs)
    console.log('playlist songggs', playlist_songs)



    useEffect(() => {
        dispatch(getSongs())
        dispatch(getPlaylists())
        dispatch(getLibrary()).then(()=>setIsLoaded(true))
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

    if (currentUserLibrary) {
        if (!([currentUserLibrary.id] in playlist_songs)) {
            playlist_songs[currentUserLibrary.id] = []
        }
    }
    
    return isLoaded && (
        <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            HELLO FROM SONGLIST
            {songs.map(song => (
                <div key={song.id}>
                    <button onClick={() => play(song)}>{song.title} -- {song.artist}</button>
                    {playlist_songs[currentUserLibrary.id].includes(song?.id) ?
                    <button onClick={() => removeLibrarySong(song)}>Unlike</button> :
                    <button onClick={() => addLibrarySong(song)}>Like</button> 
                    }
                    <AddToPlaylist />
                    {/* <div className='add_to_playlist_dropdown'>
                        <button>Add to Playlist</button>
                    </div> */}
                </div>

            ))}
            <Player />
        </div>
    )
}

export default SongList;