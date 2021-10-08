import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const [emailLabelFocus, setEmailLabelFocus] = useState('');
  const [emailInputFocus, setEmailInputFocus] = useState('');
  const [userNameLabelFocus, setUserNameLabelFocus] = useState('');
  const [userNameInputFocus, setUserNameInputFocus] = useState('');
  const [passwordLabelFocus, setPasswordLabelFocus] = useState('');
  const [passwordInputFocus, setPasswordInputFocus] = useState('');
  const [confirmPasswordLabelFocus, setConfirmPasswordLabelFocus] = useState('');
  const [confirmPasswordInputFocus, setConfirmPasswordInputFocus] = useState('');

  useEffect(() => {
    if (email.length > 0 && emailLabelFocus !== 'formLabelDone') {
      setEmailLabelFocus('formLabelFocus')
      setEmailInputFocus('formInputDone')
    }
    if (username.length > 0 && userNameLabelFocus !== 'formLabelDone') {
      setUserNameLabelFocus('formLabelFocus')
      setUserNameInputFocus('formInputDone')
    }
    if (password.length > 0 && passwordLabelFocus !== 'formLabelDone') {
      setPasswordLabelFocus('formLabelFocus')
      setPasswordInputFocus('formInputDone')
    }
    if (confirmPassword.length > 0 && confirmPasswordLabelFocus !== 'formLabelDone') {
      setConfirmPasswordLabelFocus('formLabelFocus')
      setConfirmPasswordInputFocus('formInputDone')
    }
  }, [email, username, password, confirmPassword])

  if (sessionUser) return <Redirect to="/" />;

  const handleFocus = (element, setterFunction) => {
    if (element.length > 0) {
      setterFunction("formLabelDone")
    } else {
      setterFunction('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="container">
        <header id="signUpHeader">
            <NavLink to="/" id="mainLink">
                <div id="logoContents">
                    <div className="logoCircle" id="blueCircle"></div>
                    <div className="logoCircle" id="redCircle"></div>
                    <div id="soccrLogo">soccr</div>
                </div>
            </NavLink>
        </header>
        <div id="mainContainer">
          <div id="formContainer">
            <div className="formLogo">
              <div className="circleContainer">
                <div className="logoCircle" id="blueCircle"></div>
                <div className="logoCircle" id="redCircle"></div>
              </div>
              <div className="forSoccr">Sign up for Soccr</div>
            </div>

            <form onSubmit={handleSubmit} id="signUpForm">
              <ul>
                {errors.map((error, idx) => <li className="loginError" key={idx}>{error}</li>)}
              </ul>
              <div className="formField">
                <label className={`formLabel ${emailLabelFocus}`}>
                  Email
                </label>
                <input
                    className={`formInput ${emailInputFocus}`}
                    type="text"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setEmailLabelFocus('formLabelFocus')}
                    onBlur={() => handleFocus(email, setEmailLabelFocus)}
                />
              </div>
              <div className="formField">
                <label className={`formLabel ${userNameLabelFocus}`}>
                  Username
                </label>
                <input
                    className={`formInput ${userNameInputFocus}`}
                    type="text"
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={() => setUserNameLabelFocus('formLabelFocus')}
                    onBlur={() => handleFocus(username, setUserNameLabelFocus)}
                />
              </div>
              <div className="formField">
                <label className={`formLabel ${passwordLabelFocus}`}>
                  Password
                </label>
                <input
                  className={`formInput ${passwordInputFocus}`}
                  type="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordLabelFocus('formLabelFocus')}
                  onBlur={() => handleFocus(password, setPasswordLabelFocus)}
                />
              </div>
              <div className="formField">
                <label className={`formLabel ${confirmPasswordLabelFocus}`}>
                  Confirm Password
                </label>
                <input
                  className={`formInput ${confirmPasswordInputFocus}`}
                  type="password"
                  value={confirmPassword}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setConfirmPasswordLabelFocus('formLabelFocus')}
                  onBlur={() => handleFocus(confirmPassword, setConfirmPasswordLabelFocus)}
                />
              </div>
              <button className="formButton" type="submit">Sign Up</button>
            </form>
            <p className="already">Already a Soccr member? <Link to="/login" id="loginHere">Log in here.</Link></p>
          </div>
        </div>
        <div className="main-image" id="signUpImage"></div>
      </div>
  );
}

export default SignupFormPage;
