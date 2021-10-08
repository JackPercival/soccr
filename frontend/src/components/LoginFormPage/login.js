import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const [userNameLabelFocus, setUserNameLabelFocus] = useState('');
  const [userNameInputFocus, setUserNameInputFocus] = useState('');
  const [passwordLabelFocus, setPasswordLabelFocus] = useState('');
  const [passwordInputFocus, setPasswordInputFocus] = useState('');


  useEffect(() => {
    if (credential.length > 0 && userNameLabelFocus !== 'formLabelDone') {
      setUserNameLabelFocus('formLabelFocus')
      setUserNameInputFocus('formInputDone')
    }
    if (password.length > 0 && passwordLabelFocus !== 'formLabelDone') {
      setPasswordLabelFocus('formLabelFocus')
      setPasswordInputFocus('formInputDone')
    }

  }, [credential, password])

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

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
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <label>
            Username or Email
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Log In</button>
        </form>
        <p className="already">Not a Soccr member? <Link to="/signup" id="loginHere">Sign up here.</Link></p>
      </div>
      <div className="main-image" id="signUpImage"></div>
    </div>
  );
}

export default LoginFormPage;
