import React, { useState, useEffect } from "react";
import { Modal } from "../../../context/Modal";
import EditProfile from "./EditProfile"
import { useHistory, useParams } from 'react-router-dom'
import { deleteUser } from "../../../store/user";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/session";
import '../Profile.css'
import { followUser, showFollowing, unfollowUser } from "../../../store/follow";

function ProfileModal({ currentUser, followInfo }) {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user)
  const everyone = useSelector(state => state.alluser)
  const follow = useSelector(state => state.follow)
  const userId = sessionUser?.id

  // console.log("followInfo", followInfo)
  // console.log('followInfo[userId][\'followees\']', followInfo[userId]['followees'])
  let option;
  let flag = false;
  
  if (followInfo[userId]) {
  followInfo[userId]['followees'].forEach(el => {
    if (el.id === +id) {
      flag = true
    }
  })
}


  if (userId === +id) {
    option = (
      <button className="editProfileBtn pointer" onClick={() => setShowModal(true)}>
        Edit Profile
      </button>
    )
  } else if (flag) {
    option = (
      <button className='editProfileBtn pointer' onClick={() => unfollowPerson()}>Unfollow</button>
    )
  } else {
    option = (
      <button className='editProfileBtn pointer' onClick={() => followPerson()}>Follow</button>
    )
  }

  const followPerson = () => {
    dispatch(followUser(everyone[userId], everyone[id]))
  }

  const unfollowPerson = () => {
    dispatch(unfollowUser(everyone[userId], everyone[id]))
  }

  return (
    <>
      {option}
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
