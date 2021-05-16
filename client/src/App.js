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
  };

  const [token, setToken] = useState(getToken());
  const [userId, setUserId] = useState(getUserId);

  const saveToken = (token, userId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);

    setToken(token);
    setUserId(userId);
  };

  // this will run when the localStorage is changed.
  // window.addEventListener("storage", function (e) {
  // })

  return (
    <div className="App">
      <Router>
        <Navigation token={userId} setToken={setToken} setUserId={setUserId} />
        <Switch>
          <Route path="/auth" exact>
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
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
