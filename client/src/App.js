import { useState, useEffect } from 'react';
import Auth from './components/authentication/auth';
import Home from './components/home/home';
import Post from './components/post/post';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

function App() {
  const getToken = () => {
    return localStorage.getItem('token');
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  // this will run when the localStorage is changed.
  // window.addEventListener("storage", function (e) {
  // })

  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/auth'>
            {token ? <Redirect to='/home' /> : <Auth saveToken={saveToken} />}
          </Route>
          <Route path='/home'>
            <Home />
          </Route>
          <Route path='/'>
            <Home />
            {/* <Home /> */}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
