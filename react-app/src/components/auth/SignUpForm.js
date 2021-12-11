import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp, login } from '../../store/session';

const SignUpForm = ({setShowModal}) => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const validate = () => {
    const validateErrors = [];

    if (!firstName) validateErrors.push("First name is required");
    if (!lastName) validateErrors.push("Last name is required");
    if (!email || !email.toLocaleLowerCase().match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) validateErrors.push("Please enter a valid e-mail");
    if (!password) validateErrors.push("Please enter a valid password");
    if (password !== repeatPassword) validateErrors.push("Password and Confirm Password must match");

    return validateErrors;
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    dispatch(login("user@demo.com", "password"));
  }

  const handleLogin = () => {
    setShowModal(false);
    document.querySelector("#openSidebarMenu").checked = true;
  }

  const onSignUp = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (errors.length > 0) return setValidationErrors(errors);

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
      <img
        alt="userlogo"
        src="https://cdn.discordapp.com/attachments/917541871457275925/918793424776364052/user_icon.png"
      />
      <div className="signUpContent">
        <h1>Sign Up Now</h1>
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
        <div>
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
      <button onClick={demoLogin} type="submit" className="signUpContent-btn">
        Demo User
      </button>
      <hr></hr>
      <p>
        Do you already have an account?{" "}
        <span className="signUpLogin pointer" onClick={handleLogin}>
          Login.
        </span>
      </p>
    </form>
  );
};

export default SignUpForm;
