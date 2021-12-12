import React from "react";
import "./Library.css"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SongList from "../Songs";
import SinglePlaylist from "../SinglePlaylist";
import Profile from '../Profile/Profile';
import RowSong from '../RowSong/RowSong';
import { showFollowing } from "../../store/follow";
import { useParams } from "react-router-dom";
import Search from '../Search';
import Follows from "../Follows";
import SongLibrary from "../SongLibrary";
import { getSongs } from "../../store/song";
import { getPlaylists } from "../../store/playlist";
import { getLibrary } from "../../store/playlist_songs";
import RowPlaylist from "../RowPlaylist";
import RowExplore from "../RowExplore";
import { getAllUsers } from "../../store/alluser";

const Library = () => {
  const {id} = useParams()

  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const followInfo = useSelector(state => state.follow)
  const allSongs = useSelector(state => Object.values(state.song))
  const allPlaylists = useSelector(state => Object.values(state.playlist))
  const allPlaylistSongs = useSelector(state => state.playlist_song)
  let currentUserLibrary = allPlaylists.filter(el => el.owner_id == id && el.playlist_name == 'Library')[0]
  let currentUserLibraryId = currentUserLibrary?.id //just the library 'playlist' id

  const everyone = useSelector(state => Object.values(state.alluser))

  useEffect(() => {
    dispatch(showFollowing(user.id));
    dispatch(getSongs())
    dispatch(getPlaylists())
    dispatch(getLibrary()) // getLibrary grabs all playlist_song
    dispatch(getAllUsers())
  }, [dispatch, user.id]);

  let options = null;

  if (window.location.href.endsWith("songs")) {
    options = (
      <div className="library_songs_meta"><SongList /></div>
    )
  }
  else if (
    window.location.href.endsWith("dashboard") ||
    window.location.href.endsWith("home")) {
    options = (
      <>
        <Profile user={user} urlId={id} followInfo={followInfo}/>
        <RowSong urlId={id} allSongs={allSongs} currentUserLibraryId={currentUserLibraryId} allPlaylists={allPlaylists} allPlaylistSongs={allPlaylistSongs}/>
        <RowPlaylist urlId={id} allSongs={allSongs} currentUserLibraryId={currentUserLibraryId} allPlaylists={allPlaylists} allPlaylistSongs={allPlaylistSongs}/>
        <RowExplore urlId={id} currentUserLibrary={currentUserLibrary} allSongs={allSongs} currentUserLibraryId={currentUserLibraryId} allPlaylists={allPlaylists} allPlaylistSongs={allPlaylistSongs}/>
      </>
    );
  } else if (window.location.href.includes("playlist/")) {
    options = (
      <div className="library_songs_meta">
        <SinglePlaylist />
      </div>
    );
  } else if (window.location.href.endsWith("search")) {
    options = (
      <div className="library_songs_meta">
        <Search />
      </div>
    );
  } else if (window.location.href.endsWith("library")) {
    options = (
      <div className="library_songs_meta">
        <SongLibrary />
      </div>
    );
  } else if (window.location.href.endsWith("social")) {
    options = (
      <div className="library_songs_meta">
        <Follows everyone={everyone}/>
      </div>
    );
  }

  return (
    <>
      <div className="libray-container">
        {options}
      </div>
    </>
  );
};

export default Library;
