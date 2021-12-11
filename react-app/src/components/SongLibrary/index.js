import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPlaylists } from '../../store/playlist'
import { getLibrary } from '../../store/playlist_songs'
import { getSongs } from '../../store/song'
import IndivSong from '../Songs/IndivSong'
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous"></link>

const SongLibrary = () => {
    const dispatch = useDispatch()

    const userId = useSelector((state) => state.session.user.id);
    const playlists = useSelector((state) => Object.values(state.playlist));
    let currentUserLibrary = playlists.filter(
        (el) => el.owner_id == userId && el.playlist_name == "Library"
    )[0];
    const newUserLibrary = { ...currentUserLibrary }
    const playlist_songs = useSelector((state) => state.playlist_song);
    const allSongs = useSelector(state => Object.values(state.song))

    // list of song IDs
    let songResult = (playlist_songs[newUserLibrary.id]) ? playlist_songs[newUserLibrary.id] : null
    let songs;
    if (!songResult || songResult.length === 0) {
        songResult = null;
    } else {
        songs = allSongs.filter((el) => songResult.includes(el.id));
    }

    let count = songs.length

    useEffect(()=>{
        dispatch(getSongs())
        dispatch(getPlaylists())
        dispatch(getLibrary())
    }, [dispatch])

    // library table
    const libraryLoaded = (
        <div className='tablediv'>
            <div className='pageTitle'><div>Library</div></div>
            <div className='subTitle'>A collection of your favorite songs! &nbsp; &bull; &nbsp; {count} {count == 1 ? 'song' : 'songs'}</div>
            <table className='tabletable'>
                <tr className='tableHeader'>
                    <th>#</th>
                    <th>Title</th>
                    <th></th>
                    <th>Artist</th>
                    <th>Album</th>
                    <th></th>
                    <th></th>
                </tr>
                {songs.map((song, index) => (
                    <IndivSong key={song.id} index={index} song={song} currentUserLibrary={newUserLibrary} playlist_songs={playlist_songs} playlists={playlists} />
                ))}
            </table>
        </div>
    )

    const libraryEmpty = (
      <>
        <br></br>
        <center>Your Library is empty! Add your first song!</center>
      </>
    );
    // library table
    return (
        <>
      { songResult === null ? libraryEmpty : libraryLoaded }
      </>
    )
}

export default SongLibrary
