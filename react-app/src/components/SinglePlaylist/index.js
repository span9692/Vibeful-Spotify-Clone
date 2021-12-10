import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { addPlaylist, deletePlaylist, getPlaylists, updatePlaylist } from '../../store/playlist';
import { useHistory } from 'react-router';
import './singleplaylist.css'

const SinglePlaylist = () => {
    const { playlistId } = useParams()

    const playlistState = useSelector((state) => (state.playlist))
    const playlist = Object.values(playlistState).filter(el => el.id == playlistId)[0]
    console.log('playlist', playlist)
    const data = playlistState[playlistId]
    console.log('data', data)

    const history = useHistory()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPlaylists())
    }, [dispatch])

    const sessionUser = useSelector((state) => state.session.user)
    if (!sessionUser) {
        // history.push('/');
        return <Redirect to="/" />;
    }

    const handleDelete = () => {
        dispatch(deletePlaylist(+playlistId));
        history.push('/');
    };

    const asdf = () => {
    let edit = document.getElementById('editname')
    edit.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const button = e.target;
            const jeff = button.parentNode;
            const div = jeff.parentNode;
            if (button.textContent === 'Edit Playlist Name') {
                const h = div.firstElementChild;
                const input = document.createElement('input')
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
                }
            }
        }
    })
}


    return (
        <div id='editname'>
            <span>{playlist?.playlist_name}</span>
            <div>
                <button onClick={() => handleDelete()}>
                    Delete Playlist
                </button>
                <button onClick={(() => asdf())}>
                    Edit Playlist Name
                </button>
            </div>
        </div>
    );
};
export default SinglePlaylist;
