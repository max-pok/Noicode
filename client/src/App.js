import { useState, useEffect } from 'react';
import Auth from './components/authentication/auth';
import Home from './components/home/home';
import Navigation from './components/navbar/navbar';
import NotFound from './components/notFound/NotFound';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Profile from './components/profile/profile';
import axios from 'axios';

function App() {
  const getToken = () => {
    return localStorage.getItem('token');
  };

  const getUserId = () => {
    return localStorage.getItem('userId');
  };

  const [token, setToken] = useState(getToken());
  const [userId, setUserId] = useState(getUserId);
  const [clicked, setClicked] = useState(false);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const userPostUrl = 'http://localhost:8080/api/posts/';
  const saveToken = (token, userId) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);

    setToken(token);
    setUserId(userId);
  };

  useEffect(() => {
    axios.get(userPostUrl).then((response) => {
      setPosts(response.data);
      setFilteredPosts(response.data);
    });
  }, []);

  // this will run when the localStorage is changed.
  // window.addEventListener("storage", function (e) {
  // })
  return (
    <div className="App">
      <Router>
        <Navigation token={userId} setToken={setToken} setUserId={setUserId} setFilteredPosts={setFilteredPosts} setClicked={setClicked} clicked={clicked} />
        <Switch>
          <Route path="/auth" exact>
            {token ? <Redirect to="/home" token={userId} /> : <Auth saveToken={saveToken} />}
          </Route>
          <Route path="/home" exact>
            <Home token={userId} filteredPosts={filteredPosts} setClicked={setClicked} clicked={clicked} />
          </Route>
          <Route path={'/users/:userId'} component={Profile}></Route>
          <Route path="/" exact>
            <Home filteredPosts={filteredPosts} setClicked={setClicked} clicked={clicked} />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
