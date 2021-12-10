import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPlaylists, deletePlaylist, updatePlaylist } from '../../store/playlist'
import SinglePlaylist from '../SinglePlaylist'
import EditPlaylistForm from '../UpdatePlaylist'

function PlayList() {
    const dispatch = useDispatch()

    const playlists = useSelector(state => Object.values(state.playlist))
    const sessionUser = useSelector((state) => state.session.user)
    useEffect(() => {
        dispatch(getPlaylists())
    }, [dispatch])

    const handleDelete = (id) => {
        dispatch(deletePlaylist(id));
      };

    return (
        <>
            {/* <div>
                <SinglePlaylist/>
            </div> */}
            <div>
                PLAYLISTS
                {playlists?.map(playlist => (playlist.owner_id === sessionUser?.id?
                    <div key={playlist.id}>
                        {playlist.playlist_name} -- {playlist.owner_id}
                        <button onClick={() => handleDelete(playlist.id)}>
                        Delete Playlist
                        </button>
                        <div>
                            <EditPlaylistForm playlistId={playlist.id}/>
                        </div>
                    </div>

                : null

                ))}
            </div>
        </>
    )
}

export default PlayList;
