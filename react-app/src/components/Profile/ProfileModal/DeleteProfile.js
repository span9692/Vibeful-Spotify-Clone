import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editUserDetail } from "../../../store/user";

const DeleteProfile = ({ setShowModal, currentUser, setPage }) => {
  const [errors, setErrors] = useState([]);
  const id = currentUser.id;
  const [firstName, setFirstName] = useState(currentUser.first_name);
  const [lastName, setLastName] = useState(currentUser.last_name);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState(currentUser.email);
  const [profilePic, setProfilePic] = useState(currentUser.profile_pic);
  const [validationErrors, setValidationErrors] = useState([]);
  const dispatch = useDispatch();

  const saveProfile = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (errors.length > 0) return setValidationErrors(errors);

    if (password === repeatPassword) {
      const data = await dispatch(
        editUserDetail(id, firstName, lastName, email, profilePic, password)
      );
      setShowModal(false);
      if (data) {
        setErrors(data);
      }
    }
  };

  const validate = () => {
    const validateErrors = [];

    if (!firstName) validateErrors.push("First name is required");
    if (!lastName) validateErrors.push("Last name is required");
    if (
      !email ||
      !email
        .toLocaleLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    )
      validateErrors.push("Please enter a valid e-mail");
    if (!password) validateErrors.push("Please enter a valid password");

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
            The following errors were found:
            <ul>
              {validationErrors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
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
        onClick={saveProfile}
      >
        Yes, I don't pass the vibe check
      </button>
    </form>
  );
};

export default DeleteProfile;
