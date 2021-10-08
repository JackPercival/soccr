import React, { useState } from "react";
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
  const [labelFocus, setLabelFocus] = useState('');

  if (sessionUser) return <Redirect to="/" />;

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
            <NavLink to="/main" id="mainLink">
                <div id="logoContents">
                    <div className="logoCircle" id="blueCircle"></div>
                    <div className="logoCircle" id="redCircle"></div>
                    <div id="soccrLogo">soccr</div>
                </div>
            </NavLink>
        </header>
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
              {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div className="formField">
              <label className={`formLabel ${labelFocus}`}>
                Email
              </label>
              <input
                  class="formInput"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  onClick={() => setLabelFocus('formLabelFocus')}
                  onBlur={() => setLabelFocus('')}
              />
            </div>
            <div className="formField">
              <label className="formLabel">
                Username
              </label>
              <input
                  class="formInput"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
              />
            </div>
            <div className="formField">
              <label className="formLabel">
                Password
              </label>
              <input
                class="formInput"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="formField">
              <label className="formLabel">
                Confirm Password
              </label>
              <input
                class="formInput"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Sign Up</button>
          </form>
          <p className="already">Already a Soccr member. <Link to="/login">Log in here.</Link></p>
        </div>
        <div className="main-image" id="signUpImage"></div>
      </div>
  );
}

export default SignupFormPage;
