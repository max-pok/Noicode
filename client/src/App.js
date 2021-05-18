<<<<<<< HEAD
import { useState } from 'react';
import Auth from './components/authentication/auth';
import Home from './components/home/home';
import Navigation from './components/navbar/navbar';
import NotFound from './components/notFound/NotFound';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Profile from './components/profile/profile';

function App() {
  const getToken = () => {
    return localStorage.getItem('token');
  };

  const getUserId = () => {
    return localStorage.getItem('userId');
=======
import { useState } from "react";
import Auth from "./components/authentication/auth";
import Home from "./components/home/home";
import Navigation from "./components/navbar/navbar";
import NotFound from "./components/notFound/NotFound";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Profile from "./components/profile/profile";

function App() {
  const getToken = () => {
    return localStorage.getItem("token");
  };

  const getUserId = () => {
    return localStorage.getItem("userId");
>>>>>>> 19164d418ffb6b7a6e96528e3cb371788d254435
  };

  const [token, setToken] = useState(getToken());
  const [userId, setUserId] = useState(getUserId);
<<<<<<< HEAD
  const [posts, setPosts] = useState([]);
  const [clicked, setClicked] = useState(false);

  const saveToken = (token, userId) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
=======

  const saveToken = (token, userId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
>>>>>>> 19164d418ffb6b7a6e96528e3cb371788d254435

    setToken(token);
    setUserId(userId);
  };

  // this will run when the localStorage is changed.
  // window.addEventListener("storage", function (e) {
  // })
  return (
    <div className="App">
      <Router>
        <Navigation token={userId} setToken={setToken} setUserId={setUserId} setPosts={setPosts} setClicked={setClicked} clicked={clicked} />
        <Switch>
          <Route path="/auth" exact>
<<<<<<< HEAD
            {token ? <Redirect to="/home" /> : <Auth saveToken={saveToken} />}
          </Route>
          <Route path="/home" exact>
            <Home posts={posts} clicked={clicked} setClicked={setClicked} />
          </Route>
          <Route path={'/users/:userId'} component={Profile}></Route>
          <Route path="/" exact>
            <Home posts={posts} clicked={clicked} setClicked={setClicked} />
=======
            {token ? (
              <Redirect to="/home" token={userId} />
            ) : (
              <Auth saveToken={saveToken} />
            )}
          </Route>
          <Route path="/home" exact>
            <Home token={userId} />
          </Route>
          <Route path={"/users/:userId"} component={Profile}></Route>
          <Route path="/" exact>
            <Home />
>>>>>>> 19164d418ffb6b7a6e96528e3cb371788d254435
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
