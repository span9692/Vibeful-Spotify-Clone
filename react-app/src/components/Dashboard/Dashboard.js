import React from "react";
import Playlist from "../Playlists/Playlist"
import Library from "../Library/Library"
import Player from '../Player/index'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { addPlaylist, getPlaylists } from "../../store/playlist";
import { deleteUser } from "../../store/user";
import { Redirect, useHistory, useParams } from 'react-router-dom';
import "./Dashboard.css"
import { showFollowing } from "../../store/follow";

const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {id} = useParams

  const sessionUser = useSelector((state) => state.session.user)
  const allUsers = useSelector(state => Object.values(state.alluser))
  const follows = useSelector(state => Object.values(state.follow))

  useEffect(() => {
    dispatch(getPlaylists())
    dispatch(showFollowing())
  }, [dispatch])

  if(!sessionUser) {
    return <Redirect to="/" />;
  }

  const goSearch = () => {
    history.push('/search')
  }

  const goLibrary = () => {
    history.push(`/users/${sessionUser.id}/library`)
  }

  const goSocial = () => {
    history.push(`/users/${sessionUser.id}/social`)
  }

  const owner_id = sessionUser.id

  const add = () => {
    dispatch(addPlaylist({
      playlist_name: 'Untitled Playlist',
      owner_id: owner_id,
      playlist_pic: 'https://res.cloudinary.com/photofinder/image/upload/v1639179904/music_note_a5ygjq.jpg'
    }))
  }
  console.log(".")


  return (
    <>
      <div className="dashboard">
        <div className="dashboard-top-navbar"></div>
        <div className="dashboard-main">
          <div className="dashboard-main-leftnav">
            <div className="d-m-leftnav-top">
              <ul>
                <li>
                  <div className="d-m-leftnav-item">
                  <i className="fas fa-search"></i><span className='pointer' onClick={() => goSearch()}>Search</span>
                  </div>
                </li>
                <li>
                  <div className="d-m-leftnav-item">
                  <i className="fas fa-icons"></i><span className='pointer' onClick={() => goLibrary()}>Your library</span>
                  </div>
                </li>
              </ul>
              <div className="liner"></div>
              <ul>
                <li>
                  <div className="d-m-leftnav-item">
                  <i class="fas fa-users"></i><span className='pointer' onClick={() => goSocial()}>Social</span>
                  </div>
                </li>
                <li>
                  <div className="d-m-leftnav-item">
                  <i class="fab fa-napster"></i><span className='pointer' onClick={() => add()}>Create a playlist</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="liner"></div>
            <Playlist />
          </div>
          <div className="dashboard-main-rightcontent">
            <Library owner_id={owner_id} />
          </div>
        </div>
        {/* <div className="dashboard-bot-player"><Player /></div> */}
      </div>
    </>
  );
};

export default Dashboard;
