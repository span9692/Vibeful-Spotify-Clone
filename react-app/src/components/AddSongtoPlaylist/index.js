import { useDispatch } from 'react-redux'
import { addPlaylistSong } from '../../store/playlist_songs'
import './addSongtoPlaylist.css'

function AddToPlaylist({ song, playlists, currentUserLibrary }) {
    const dispatch = useDispatch()
    // console.log(song)
    // console.log(playlists)
    // console.log(currentUserLibrary)
    let userId = currentUserLibrary.owner_id //use this to filter playlists
    // console.log(userId)
    let usersPlaylist = playlists.filter(el => el.owner_id === userId && el.playlist_name !== 'Library')
    console.log(usersPlaylist)
    // usersPlaylist is now a list of the user's array excluding the library

    const showPlaylistOptions = () => {
        document.getElementById('playlistDropdown').classList.toggle('show')
    }

    window.onclick = function (event) {
        if (!event.target.matches('.addToPlaylistBtn')) {
            let dropdowns = document.getElementsByClassName("dropdown-content");
            let i;
            for (i = 0; i < dropdowns.length; i++) {
                let openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    const addToUserPlaylist = (song, playlistId) => {
        dispatch(addPlaylistSong(song, playlistId))
    }

    return (
        <div className='dropdownBtn'>
            <button className='addToPlaylistBtn' onClick={() => showPlaylistOptions()}>Add to Playlist</button>
                <div id='playlistDropdown' className='dropdown-content'>
                {usersPlaylist.map(playlist=> (
                    <div key={playlist.id} className='addtoplaylist' onClick={() => addToUserPlaylist(song, playlist.id)}>{playlist.playlist_name}</div>
                ))}
                </div>
        </div>
    )
}

export default AddToPlaylist
