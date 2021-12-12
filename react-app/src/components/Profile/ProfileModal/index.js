import React, { useState, useEffect } from "react";
import { Modal } from "../../../context/Modal";
import EditProfile from "./EditProfile"
import { useHistory, useParams } from 'react-router-dom'
import { deleteUser } from "../../../store/user";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/session";
import '../Profile.css'
import { followUser, showFollowing, unfollowUser } from "../../../store/follow";

function ProfileModal({ currentUser }) {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user)
  const everyone = useSelector(state => state.alluser)
  const follow = useSelector(state => state.follow)
  const userId = sessionUser?.id

  useEffect(()=> {
    dispatch(showFollowing)
  })

  const onLogout = async (e) => {
    await dispatch(logout());
  };
  const handleDeleteUser = (id) => {
    onLogout()
    dispatch(deleteUser(id))
    history.push('/home')
  }

  const followPerson = () => {
    console.log(everyone[id])
    dispatch(followUser(everyone[userId], everyone[id]))
  }

  const unfollowPerson = () => {
    dispatch(unfollowUser(userId, id))
  }

  return (
    <>
      <button className="editProfileBtn pointer" onClick={() => setShowModal(true)}>
        Edit Profile
      </button>
      <button onClick={() => followPerson()}>Follow</button>
      <button onClick={() => unfollowPerson()}>UnFollow</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditProfile
            setShowModal={setShowModal}
            currentUser={currentUser}
          />
        </Modal>
      )}
    </>
  );
}

export default ProfileModal;
