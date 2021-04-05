import { useState, useEffect } from "react"
import Auth from "./components/authentication/auth"
import Home from "./components/home/home"
import Navigation from "./components/navbar/navbar"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import "./App.css"

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
        <Navigation token={token} setToken={setToken} />
        <Switch>
          <Route path='/auth' exact>
            {token ? <Redirect to='/home' /> : <Auth saveToken={saveToken} />}
          </Route>
          <Route path='/home' exact>
            <Home />
          </Route>
          <Route path='/' exact>
            <Home />
          </Route>
          <Redirect to='/home' />
        </Switch>
      </Router>
    </div>
  )
}

export default App
