import AudioPlayer from 'react-h5-audio-player';
import './Player.css'
import 'react-h5-audio-player/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToLibrary, removeFromLibrary } from '../../store/playlist_songs';

const Player = () => {
    const dispatch = useDispatch()
    const song = useSelector(state => state.audio)
    const user = useSelector(state => state.session.user);
    const allPlaylists = useSelector(state => Object.values(state.playlist))
    const allPlaylistSongs = useSelector(state => state.playlist_song)
    const allSongs = useSelector(state => Object.values(state.song))
    const usersLibrary = allPlaylists.filter(el => el.owner_id === user.id && el.playlist_name === 'Library')[0]
    const usersLibraryId = usersLibrary['id']
    const songArray = allPlaylistSongs[usersLibraryId]
    console.log(songArray)
    console.log(song)

    console.log(songArray.includes(song.id))

    const addLibrarySong = (song) => {
        dispatch(addToLibrary(song, usersLibrary));
    };

    const removeLibrarySong = (song) => {
        dispatch(removeFromLibrary(song, usersLibrary));
    }


    const userPlayer = (
        <div className='showPlayer'>
            <div className='playerinfo playersidecolumn'>
                <img className='playerImg' src={song?.cover}></img>
                <div className='playerSongAndArtist'>
                    <div className='playerTitle'>{song?.title}</div>
                    <div className='playerArtist'>{song?.artist}</div>
                </div>
            </div>
            {/* <div> */}
            <AudioPlayer
                className='musicPlayer'
                autoPlay
                showSkipControls="False"
                showFilledVolume="True"
                src={song.url}
            />
            {/* </div> */}
            <div className='playersidecolumn'>
                {
                    allPlaylistSongs[usersLibraryId]
                    ? [
                        songArray.includes(song.id) ? (
                            <div onClick={() => removeLibrarySong(song)}>
                                <i class="fas fa-heart"></i>
                            </div>
                        ) : (
                            <div onClick={() => addLibrarySong(song)}><i class="far fa-heart"></i></div>
                        ),
                    ]
                    : <div onClick={() => addLibrarySong(song)}><i class="far fa-heart"></i></div>
                }
            </div>
        </div>
    )

    return (
    <>
      { user ? userPlayer : null }
    </>
    )
}

export default Player
