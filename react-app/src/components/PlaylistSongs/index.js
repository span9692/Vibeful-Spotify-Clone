import { useEffect } from 'react';
import { addToLibrary, removeFromLibrary } from "../../store/playlist_songs"
import { useDispatch } from 'react-redux'
import { playMusic } from '../../store/audio';
import AddToPlaylist from '../AddSongtoPlaylist';

<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous"></link>

const PlaylistSongs = ({ name, songs, currentUserLibrary, playlists, playlistId, playlist_song }) => {
    const dispatch = useDispatch()

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

    // playlist table

    return (
        <div className='tablediv'>
            <div className='pageTitle'><div>{name}</div></div>
            <div className='subTitle'>A collection of your favorite songs! &nbsp; &bull; &nbsp; {count} songs</div>

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
