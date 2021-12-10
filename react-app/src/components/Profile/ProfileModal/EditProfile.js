import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { editUserDetail, getUser } from "../../../store/user";

const EditProfile = ({ setShowModal, currentUser }) => {
    const [errors, setErrors] = useState([]);
    const id = currentUser.id
    const [firstName, setFirstName] = useState(currentUser.first_name);
    const [lastName, setLastName] = useState(currentUser.last_name);
    const [email, setEmail] = useState(currentUser.email);
    const [password, setPassword] = useState(currentUser.password);
    const [repeatPassword, setRepeatPassword] = useState("");
    const [profilePic, setProfilePic] = useState(currentUser.profile_pic);
    const [validationErrors, setValidationErrors] = useState([]);
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    const saveProfile = async (e) => {
    //   const errors = validate();
    //   if (errors.length > 0) return setValidationErrors(errors);

    //   if (password === repeatPassword) {
        const data = await dispatch(
          editUserDetail(id, firstName, lastName, email, password, profilePic)
        );
        // if (data) {
        //   setErrors(data);
        // }
      }
    // };


    //   const editPic = (payload) => {
    //     // let image = 'https://www.forbes.com/advisor/wp-content/uploads/2021/04/dogecoin.jpeg.jpg'
    //     let image =
    //       "https://media.discordapp.net/attachments/917541871457275925/918846475897798727/default-user.jpeg";
    //     dispatch(editUser(image, user.id));
    //   };

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
      if (password !== repeatPassword)
        validateErrors.push("Password and Confirm Password must match");

      return validateErrors;
    };



  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateProfilePic = (e) => {
    setProfilePic(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  return (
    <form className="signUpForm">
      <img
        alt="userlogo"
        src="https://cdn.discordapp.com/attachments/917541871457275925/918793424776364052/user_icon.png"
      />
      <div className="signUpContent">
        <h1>Edit Profile</h1>
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
        <div>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            onChange={updateFirstName}
            value={firstName}
          ></input>
        </div>
        <div>
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            onChange={updateLastName}
            value={lastName}
          ></input>
        </div>
        <div>
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          <input
            type="text"
            name="profile_pic"
            placeholder="URL of Profile Pic"
            onChange={updateProfilePic}
            value={profilePic}
          ></input>
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <input
            type="password"
            name="repeat_password"
            placeholder="Confirm Password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
      </div>
      <button type="submit" className="signUpContent-btn" onClick={() => saveProfile()}>
        Save Changes
      </button>
    </form>
  );
};

export default EditProfile;
