import { useDispatch } from 'react-redux'
import React, { useState } from "react";
import { addPlaylistSong } from '../../store/playlist_songs'
import { Modal } from '../../context/Modal'
import SignUpForm from '../auth/SignUpForm';
import './addSongtoPlaylist.css'
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous"></link>

function AddToPlaylist({ key, song, playlists, currentUserLibrary }) {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);
    // console.log(song)
    // console.log(playlists)
    // console.log(currentUserLibrary)
    let userId = currentUserLibrary.owner_id //use this to filter playlists
    // console.log(userId)
    let usersPlaylist = playlists.filter(el => el.owner_id === userId && el.playlist_name !== 'Library')
    // console.log(usersPlaylist)
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
        // dispatch(addPlaylistSong(song, playlistId))
        console.log(song, playlistId)
    }

    return (
        <>
        <div className='dropdownBtn'>
            {/* <div onClick={() => showPlaylistOptions()} className='addToPlaylistBtn'><i className='addToPlaylistBtn' class="fas fa-plus-circle"></i>test</div>
                <div id='playlistDropdown' className='dropdown-content'>
                {usersPlaylist.map(playlist=> (
                    <div key={playlist.id} className='addtoplaylist' onClick={() => addToUserPlaylist(song, playlist.id)}>{playlist.playlist_name}</div>
                ))}
                </div> */}

                
                {/* <div className='addToPlaylistBtn' onClick={() => showPlaylistOptions()}></div>
                <div className='relative'><i className='addToPlaylistBtn' class="fas fa-plus-circle"></i>
                    <div id='playlistDropdown' className='dropdown-content'>
                        {usersPlaylist.map(playlist=> (
                            <div key={playlist.id} className='addtoplaylist' onClick={() => addToUserPlaylist(song, playlist.id)}>{playlist.playlist_name}</div>
                        ))}
                    </div>
                </div> */}

                <div className='addToPlaylistBtn' onClick={() => setShowModal(true)}></div>
                <div className='relative'><i className='addToPlaylistBtn' class="fas fa-plus-circle"></i></div>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                    <div setShowModal={setShowModal}>
                        <div className='p'>
                            Add to Playlist
                            {usersPlaylist.map(playlist=> (
                                <div key={playlist.id} className='addtoplaylist' onClick={() => addToUserPlaylist(song, playlist.id)}>{playlist.playlist_name}</div>
                            ))}
                        </div>
                    </div>
                    </Modal>
                )}
                {/* <div className='relative'><i className='addToPlaylistBtn' class="fas fa-plus-circle"></i></div> */}
                    {/* <div id='playlistDropdown' className='dropdown-content'>
                        {usersPlaylist.map(playlist=> (
                            <div key={playlist.id} className='addtoplaylist' onClick={() => addToUserPlaylist(song, playlist.id)}>{playlist.playlist_name}</div>
                        ))}
                    </div> */}
                
                
                
                
        </div>
        </>
    )
}

export default AddToPlaylist
