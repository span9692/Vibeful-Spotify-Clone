import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditProfile from "./EditProfile"
import '../Profile.css'

function ProfileModal({currentUser}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="editProfileBtn pointer"
        onClick={() => setShowModal(true)}
      >
        Edit Profile
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditProfile setShowModal={setShowModal} currentUser={currentUser} />
        </Modal>
      )}
    </>
  );
}

export default ProfileModal;
