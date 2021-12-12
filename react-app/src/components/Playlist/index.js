import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPlaylists, deletePlaylist, updatePlaylist } from '../../store/playlist'
import EditPlaylistForm from '../UpdatePlaylist'
import { deleteUser } from "../../store/user";
import { Redirect, useHistory } from 'react-router-dom';
import { logout } from '../../store/session';

function PlayList() {
    const dispatch = useDispatch()
    const history = useHistory();

    const playlists = useSelector(state => Object.values(state.playlist))
    const sessionUser = useSelector((state) => state.session.user)
    useEffect(() => {
        dispatch(getPlaylists())
    }, [dispatch])

    const handleDelete = (id) => {
        dispatch(deletePlaylist(id));
      };

    const userId = sessionUser?.id


    //code to delete account
    const onLogout = async (e) => {
        await dispatch(logout());
      };
    const handleDeleteUser = (id) => {
        onLogout()
        dispatch(deleteUser(id))
        history.push('/home')
    }

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
            <button onClick={() => handleDeleteUser(userId)}>
                Delete Account
            </button>
        </>
    )
}

export default PlayList;
