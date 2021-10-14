import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage/login";
import SignupFormPage from "./components/SignupFromPage/signUp";
import MainPage from "./components/MainPage/mainIndex";
import ExplorePage from "./components/Explore/explore";
import SingleImage from "./components/SingleImage/singleImage";
import Upload from "./components/Upload/upload";
import EditImage from "./components/EditImage/editImage";
import Profile from "./components/Profile/profile";
import AlbumContents from "./components/AlbumContents/albumContents";
import CreateAlbum from "./components/UploadAlbum/uploadAlbum";
import SearchResults from "./components/search/search";
import PageNotFound from "./components/PageNotFound/PageNotFound";
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
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/explore">
            <ExplorePage />
          </Route>
          <Route exact path="/images/:imageId">
            <SingleImage />
          </Route>
          <Route exact path="/images/:imageId/edit">
            <EditImage />
          </Route>
          <Route exact path="/upload">
            <Upload />
          </Route>
          <Route exact path="/people/:userId">
            <Profile />
          </Route>
          <Route exact path="/albums/:albumId">
            <AlbumContents />
          </Route>
          <Route exact path="/create-album">
            <CreateAlbum />
          </Route>
          <Route exact path="/search/:searchParameters">
            <SearchResults />
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
