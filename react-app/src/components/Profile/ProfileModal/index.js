import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditProfile from "./EditProfile"
import './index.css'
import {useHistory} from 'react-router-dom'
import { deleteUser } from "../../../store/user";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/session";
import '../Profile.css'

function ProfileModal({currentUser}) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch()
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user)
  const userId = sessionUser?.id

  const onLogout = async (e) => {
    await dispatch(logout());
  };
  const handleDeleteUser = (id) => {
    onLogout()
    dispatch(deleteUser(id))
    history.push('/home')
}

  return (
    <>
    <div>
      <button
        className="edit-account-btn"
        onClick={() => setShowModal(true)}
      >
        Edit Profile
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditProfile setShowModal={setShowModal} currentUser={currentUser} />
        </Modal>
      )}
    </div>
    </>
  );
}

export default ProfileModal;
