import React from "react";
import "./Library.css"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SongList from "../Songs";
import SinglePlaylist from "../SinglePlaylist";
import Profile from '../Profile/Profile';
import RowSong from '../RowSong/RowSong';
import { showFollowing } from "../../store/follow";
import Search from '../Search';
import Follows from "../Follows";
import SongLibrary from "../SongLibrary";

const Library = () => {

  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const followInfo = useSelector(state => state.follow)

  useEffect(() => {
    dispatch(showFollowing(user.id));
  }, [dispatch, user.id]);

  let options = null;

  if (window.location.href.endsWith("songs")) {
    options = (
      <div className="library_songs_meta"><SongList /></div>
    )
  } else if (window.location.href.endsWith("dashboard")) {
    options = (
      <>
      <Profile user={user} followInfo={followInfo}/>
      <RowSong />
      </>
    )
  } else if (window.location.href.includes("playlist/")) {
    options = (
      <div className="library_songs_meta"><SinglePlaylist /></div>
    )
  } else if (window.location.href.endsWith('search')) {
    options = (
      <div className="library_songs_meta"><Search /></div>
    )
  } else if (window.location.href.endsWith('library')) {
    options = (
      <div className="library_songs_meta"><SongLibrary /></div>
    )
  } else if (window.location.href.endsWith('social')) {
    options = (
      <div className="library_songs_meta"><Follows /></div>
    )
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
