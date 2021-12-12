import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/session";
import { deleteUser } from "../../../store/user"
import { useHistory } from "react-router-dom";

const DeleteProfile = ({ setShowModal, currentUser, setPage }) => {
  const history = useHistory();
  const [validationErrors, setValidationErrors] = useState([]);
  const dispatch = useDispatch();

  const deleteAccount = async (e) => {
      e.preventDefault();
      const errors = validate();
      if (errors.length > 0 ) return setValidationErrors(errors);
      await dispatch(deleteUser(currentUser.id))
      dispatch(logout());
      history.push('/home')
  }

  const validate = () => {
    const validateErrors = [];

    if (currentUser.first_name === "Demo") validateErrors.push("Can't delete the demo user!");
    return validateErrors;
  };
  
  return (
    <form className="signUpForm">
      <img
        alt="userlogo"
        src="https://cdn.discordapp.com/attachments/917541871457275925/918793424776364052/user_icon.png"
      />
      <div className="signUpContent">
        <h1>Delete Profile</h1>
        <h3>Are you sure?</h3>
        {validationErrors.length > 0 && (
          <div className="validationErrors">
            {validationErrors.map((error) => (
              <span key={error}>{error}</span>
            ))}
            <br></br>
            <br></br>
          </div>
        )}
        <div></div>
      </div>
      <button
        type="submit"
        className="signUpContent-btn"
        onClick={(e) => {
          e.preventDefault();
          setPage(0);
        }}
      >
        No
      </button>
      <button
        type="submit"
        id="deleteContent-btn"
        className="signUpContent-btn"
        onClick={deleteAccount}
      >
        Yes, I don't pass the vibe check
      </button>
    </form>
  );
};

export default DeleteProfile;
