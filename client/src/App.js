import { useState } from "react"
import Login from "./components/authentication/login/login"
import Home from "./components/home/home"
import "./App.css"

function App() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token")
    // const userToken = JSON.parse(tokenString)
    return tokenString
  }

  const [token, setToken] = useState(getToken())

  const saveToken = (userToken) => {
    sessionStorage.setItem("token", userToken)
    setToken(userToken)
  }

  return <div className='App'>{!token ? <Login saveToken={saveToken} /> : <Home />}</div>
}

export default App
