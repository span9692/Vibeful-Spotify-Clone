import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPlaylists } from '../../store/playlist'
import { getLibrary } from '../../store/playlist_songs'
import { getSongs } from '../../store/song'
import IndivSong from "../Songs/IndivSong"

const SongList = ({ songResult }) => {
    const dispatch = useDispatch()

    const userId = useSelector((state) => state.session.user.id);
    const playlists = useSelector((state) => Object.values(state.playlist));
    const currentUserLibrary = playlists.filter(
        (el) => el.owner_id == userId && el.playlist_name == "Library"
    )[0];
    const newUserLibrary = { ...currentUserLibrary }
    const playlist_songs = useSelector((state) => state.playlist_song);


    useEffect(() => {
        dispatch(getSongs())
        dispatch(getPlaylists())
        dispatch(getLibrary())
    }, [dispatch])
    // search table
    return (
        <div className='tablediv'>
            <table>
                <tr className='tableHeader'>
                    <th>#</th>
                    <th>Title</th>
                    <th></th>
                    <th>Artist</th>
                    <th>Album</th>
                    <th></th>
                    <th></th>
                </tr>
                {songResult.map((song, index) => (
                    <IndivSong key={song.id} index={index} song={song} currentUserLibrary={newUserLibrary} playlist_songs={playlist_songs} playlists={playlists} />
                ))}
            </table>
        </div>
    )
}

export default SongList
