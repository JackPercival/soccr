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

  }, [credential, password, userNameLabelFocus, passwordLabelFocus])

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleFocus = (element, setterFunction) => {
    if (element.length > 0) {
      setterFunction("formLabelDone")
    } else {
      setterFunction('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  const demoLogin = () => {
    const credential = 'DemoUser';
    const password = 'password';

    setCredential(credential);
    setPassword(password);

    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

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
      <div id="mainContainerAuth">
        <div id="formContainer">
          <div className="formLogo">
            <div className="circleContainer">
              <div className="logoCircle" id="blueCircle"></div>
              <div className="logoCircle" id="redCircle"></div>
            </div>
            <div className="forSoccr">Log in to Soccr</div>
          </div>

          <form onSubmit={handleSubmit} id="signUpForm" autoComplete="off">
            <ul>
              {errors.map((error, idx) => <li className="loginError" key={idx}>{error}</li>)}
            </ul>
            <div className="formField">
              <label className={`formLabel ${userNameLabelFocus}`}>
                Username or Email
              </label>
              <input
                className={`formInput ${userNameInputFocus}`}
                type="text"
                value={credential}
                required
                autoComplete="off"
                onChange={(e) => setCredential(e.target.value)}
                onFocus={() => setUserNameLabelFocus('formLabelFocus')}
                onBlur={() => handleFocus(credential, setUserNameLabelFocus)}
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
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordLabelFocus('formLabelFocus')}
                onBlur={() => handleFocus(password, setPasswordLabelFocus)}
              />
            </div>
            <div>
              <button className="formButton" type="submit">Log In</button>
              <button id="demoLoginButton"className="formButton" onClick={demoLogin}>Demo Log In</button>
            </div>
          </form>
          <p className="already">Not a Soccr member? <Link to="/signup" id="loginHere">Sign up here.</Link></p>
        </div>
      </div>
      <div className="main-image" id="signUpImage"></div>
    </div>
  );
}

export default LoginFormPage;
