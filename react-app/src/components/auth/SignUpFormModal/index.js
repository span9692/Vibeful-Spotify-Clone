import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import SignUpForm from "../SignUpForm";

function SignUpFormModal() {
  const [showModal, setShowModal] = useState(false);

  const isLoginOpen = document.querySelector("#openSidebarMenu");

  if (isLoginOpen && showModal === true) isLoginOpen.checked = false;

  return (
    <>
      <button className="signUpButton pointer" onClick={() => setShowModal(true)}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignUpForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default SignUpFormModal
