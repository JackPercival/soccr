import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage/login";
import SignupFormPage from "./components/SignupFromPage/signUp";
import MainPage from "./components/MainPage/mainIndex";
import ExplorePage from "./components/Explore/explore";
import SingleImage from "./components/SingleImage/singleImage";
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <MainPage isLoaded={isLoaded}/>
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/explore">
            <ExplorePage />
          </Route>
          <Route path="/images/:imageId">
            <SingleImage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
