import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPlaylists, deletePlaylist } from '../../store/playlist'


function PlayList() {
    const dispatch = useDispatch()

    const playlists = useSelector(state => Object.values(state.playlist))

    useEffect(() => {
        dispatch(getPlaylists())
    }, [dispatch])

    const handleDelete = (id) => {
        dispatch(deletePlaylist(id));
      };

    return (
        <div>
            PLAYLISTS
            {playlists.map(playlist => (
                <div key={playlist.id}>
                    {playlist.playlist_name} -- {playlist.owner_id}
                    <button onClick={() => handleDelete(playlist.id)}>
                    Delete Playlist
                    </button>
                </div>
                
            ))}
        </div>
    )
}

export default PlayList;