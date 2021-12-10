import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = ({setShowModal}) => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const handleLogin = () => {
    setShowModal(false);
    document.querySelector("#openSidebarMenu").checked = true;
  }

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setErrors(data)
      }
    }
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

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form className="signUpForm">
      <div className="signUpContent">
        <h1>Sign Up Now</h1>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>
              {error.includes("first_name")
                ? "First name is required"
                : error.includes("last_name") ? "Last name is required" : error.includes("email") ?
                "Please enter a valid email" : error.includes("password") ? "Please enter a valid password" : error}
            </div>
          ))}
        </div>
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
      <button onClick={onSignUp} type="submit" className="signUpContent-btn">
        Sign Up
      </button>
      <hr></hr>
      <p className="or">OR</p>
      <p className="or">
        Do you already have an account?{" "}
        <span className="signUpLogin pointer" onClick={handleLogin}>
          Login.
        </span>
      </p>
    </form>
  );
};

export default SignUpForm;
