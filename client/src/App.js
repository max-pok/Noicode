import { useState } from "react"
import Auth from "./components/authentication/auth"
import Home from "./components/home/home"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import "./App.css"
import Profile from "./components/profile/profile"

function App() {
  const getToken = () => {
    return localStorage.getItem("token")
  }

  const [token, setToken] = useState(getToken())

  const saveToken = (token) => {
    localStorage.setItem("token", token)
    setToken(token)
  }

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
          <Route exact path='/profile'>
            <Profile />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
