import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addToLibrary,
  getLibrary,
  removeFromLibrary,
} from "../../store/playlist_songs";
import { getSongs } from "../../store/song";
import { playMusic } from "../../store/audio";
import { getPlaylists } from "../../store/playlist";
import AddToPlaylist from "../AddSongtoPlaylist";
import './songs.css'
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous"></link>


function IndivSong({ key, song, currentUserLibrary, playlist_songs, playlists, index }) {
  const dispatch = useDispatch();

  const play = (song) => {
    dispatch(playMusic(song))
  };

  const addLibrarySong = (song) => {
    dispatch(addToLibrary(song, currentUserLibrary));
  };

  const removeLibrarySong = (song) => {
    dispatch(removeFromLibrary(song, currentUserLibrary));
  };

  return (
    <tr className='libraryRow'>
        <td>{index+1}</td>
        <td onClick={() => play(song)}>
        <img className='coverImg' src={song.cover}></img>
        </td>
        <td onClick={() => play(song)}>{song.title}</td>
        <td onClick={() => play(song)}>{song.artist}</td>
        <td onClick={() => play(song)}>{song.album}</td>
        <td>
        {
          playlist_songs[currentUserLibrary.id]
            ? [
              playlist_songs[currentUserLibrary.id].includes(song.id) ? (
                <div onClick={() => removeLibrarySong(song)}>
                  <i class="fas fa-heart"></i>
                </div>
              ) : (
                <div onClick={() => addLibrarySong(song)}><i class="far fa-heart"></i></div>
              ),
            ]
            : null
        }
        </td>
        <td>
          <AddToPlaylist key={key} song={song} playlists={playlists} currentUserLibrary={currentUserLibrary} />
        </td>
    </tr>
  );
}

export default IndivSong;
