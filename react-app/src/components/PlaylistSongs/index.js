import { useEffect } from 'react';
import { addToLibrary, removeFromLibrary } from "../../store/playlist_songs"
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';
import { playMusic } from '../../store/audio';
import AddToPlaylist from '../AddSongtoPlaylist';
import { deletePlaylist, updatePlaylist } from '../../store/playlist';

<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous"></link>

const PlaylistSongs = ({ name, songs, currentUserLibrary, playlist, playlists, playlistId, playlist_song }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    // if playlist doesn't have any songs
    if (!(playlistId in playlist_song)) {
        playlist_song[playlistId] = []
    }

    let songsOnThisPlaylist = playlist_song[playlistId]
    let songsToDisplay= songs.filter(el => songsOnThisPlaylist.includes(el.id))

    const play = (song) => {
        dispatch(playMusic(song));
      };

    const addLibrarySong = (song) => {
        dispatch(addToLibrary(song, currentUserLibrary));
      };

      const removeLibrarySong = (song) => {
        dispatch(removeFromLibrary(song, currentUserLibrary));
      }

    let count = songsToDisplay.length


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
                input.className = 'pageTitle pageTitleBorder'
                input.setAttribute('size', 16)
                input.setAttribute('spellcheck', false)
                input.type = 'text'
                input.value = h.textContent
                div.insertBefore(input, h);
                div.removeChild(h)
                button.textContent = 'Save';
            } else if (button.textContent === 'Save') {
                const input = div.firstElementChild;
                const h = document.createElement('span')
                h.className='pageTitle pageTitleWidth'
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
    }

    // playlist table

    return (
        <div className='tablediv'>
            <span className='pageTitle'>{name}</span>
            <div className='subTitle'>
                <button onClick={() => handleDelete()}>
                    Delete Playlist
                </button>
                <button onClick={((e) => asdf(e))}>
                    Edit Playlist Name
                </button>
                <span className='subTitlePlaylist'>{count} songs</span>
            </div>

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
                {songsToDisplay.map((song, index) => (
                    <tr key={song.id} className='libraryRow'>
                        <td>{index+1}</td>
                        <td onClick={() => play(song)}><img className='coverImg' src={song.cover}></img></td>
                        <td onClick={() => play(song)}>{song.title}</td>
                        <td onClick={() => play(song)}>{song.artist}</td>
                        <td onClick={() => play(song)}>{song.album}</td>
                        <td>
                            {
                                playlist_song[currentUserLibrary.id]
                                ? [
                                    playlist_song[currentUserLibrary.id].includes(song.id) ? (
                                    <div onClick={() => removeLibrarySong(song)}>
                                        <i class="fas fa-heart"></i>
                                        </div>
                                    ) : (
                                        <div onClick={() => addLibrarySong(song)}><i class="far fa-heart"></i></div>
                                    ),
                                ]
                                : <div onClick={() => addLibrarySong(song)}><i class="far fa-heart"></i></div>
                            }
                        </td>
                        <td>
                            <AddToPlaylist key={song.id} song={song} playlists={playlists} currentUserLibrary={currentUserLibrary} />
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default PlaylistSongs;
