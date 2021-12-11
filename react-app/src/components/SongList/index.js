import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPlaylists } from '../../store/playlist'
import { getLibrary } from '../../store/playlist_songs'
import { getSongs } from '../../store/song'
import IndivSong from "../Songs/IndivSong"

const SongList = ({ search, songResult }) => {
    const dispatch = useDispatch()

    const userId = useSelector((state) => state.session.user.id);
    const playlists = useSelector((state) => Object.values(state.playlist));
    const currentUserLibrary = playlists.filter(
        (el) => el.owner_id == userId && el.playlist_name == "Library"
    )[0];
    const newUserLibrary = { ...currentUserLibrary }
    const playlist_songs = useSelector((state) => state.playlist_song);

    let option;
    if (search.length === 0 ) {
        option = false;
    } else {
        option = true;
    }

    useEffect(() => {
        dispatch(getSongs())
        dispatch(getPlaylists())
        dispatch(getLibrary())
    }, [dispatch])
    // search table
    return (
        <>
            {option ?
            (songResult.map((song, index) => (
                <IndivSong key={song.id} index={index} song={song} currentUserLibrary={newUserLibrary} playlist_songs={playlist_songs} playlists={playlists} />
            ))) : null
            }
        </>
    )
}

export default SongList
