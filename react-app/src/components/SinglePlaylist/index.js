import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { addPlaylist, deletePlaylist, getPlaylists, updatePlaylist } from '../../store/playlist';
import { useHistory } from 'react-router';
import './singleplaylist.css'
import { getLibrary } from '../../store/playlist_songs';
import PlaylistSongs from '../PlaylistSongs';
import { getSongs } from '../../store/song';

const SinglePlaylist = () => {
    const { playlistId } = useParams()

    const playlistState = useSelector((state) => (state.playlist))
    const playlist = Object.values(playlistState).filter(el => el.id == playlistId)[0]
    const songs = useSelector(state => Object.values(state.song))
    const playlist_song = useSelector(state => state.playlist_song)

    const userId = useSelector((state) => state.session.user.id);
    const playlists = useSelector((state) => Object.values(state.playlist));
    const currentUserLibrary = playlists.filter((el) => el.owner_id == userId && el.playlist_name == "Library")[0];
    const newUserLibrary = {...currentUserLibrary}

    const history = useHistory()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPlaylists())
        dispatch(getLibrary())
        dispatch(getSongs())
    }, [dispatch])

    const sessionUser = useSelector((state) => state.session.user)
    if (!sessionUser) {
        return <Redirect to="/" />;
    }

    const handleDelete = () => {
        dispatch(deletePlaylist(+playlistId));
        history.push('/');
    };

    const asdf = (e) => {
        if (e.target.tagName === 'BUTTON') {
            const button = e.target;
            const jeff = button.parentNode;
            const div = jeff.parentNode;
            if (button.textContent === 'Edit Playlist Name') {
                const h = div.firstElementChild;
                const input = document.createElement('input')
                input.className = 'myInput'
                input.type = 'text'
                input.value = h.textContent
                div.insertBefore(input, h);
                div.removeChild(h)
                button.textContent = 'Save';
            } else if (button.textContent === 'Save') {
                const input = div.firstElementChild;
                const h = document.createElement('span')
                h.textContent = input.value;
                if (h.textContent.length > 0) {
                    div.insertBefore(h, input);
                    div.removeChild(input)
                    button.textContent = 'Edit Playlist Name'
                    let newName = h.textContent

                    const payload = {
                        ...playlist,
                        newName
                    }

                    dispatch(updatePlaylist(payload))
                    return <Redirect to="/playlists" />
                }
            }
        }
    // })
}


    return (
        <div id='editname'>
            <span>{playlist?.playlist_name}</span>
            <div>
                <button onClick={() => handleDelete()}>
                    Delete Playlist
                </button>
                <button onClick={((e) => asdf(e))}>
                    Edit Playlist Name
                </button>
            </div>
            <PlaylistSongs songs={songs} playlists={playlists} currentUserLibrary={newUserLibrary} playlistId={playlistId} playlist_song={playlist_song}/>
        </div>
    );
};
export default SinglePlaylist;
