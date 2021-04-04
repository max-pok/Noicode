import React, { useEffect } from "react"
import Login from "./login/login"
import Register from "./register/register"
import { Divider } from "antd"
import "./auth.css"


function Auth({ saveToken }) {
  const handlePageSwitch = (element) => {
    const loginPage = document.getElementById("login-page")
    const registerPage = document.getElementById("register-page")
    loginPage.style.opacity = element === "login" ? "1" : "0.2"
    registerPage.style.opacity = element === "register" ? "1" : "0.2"

    loginPage.style.transition = "all 0.3s ease-in-out"
    registerPage.style.transition = "all 0.3s ease-in-out"
  }

  useEffect(() => {
    handlePageSwitch("login")
  }, [])

  return (
    <div className='combined-pages'>
      <div id='login-page' onClick={() => handlePageSwitch("login")}>
        <Login saveToken={saveToken} />
      </div>
      <Divider className='divider' type={window.innerWidth > 900 ? "vertical" : "horizontal"} />
      <div id='register-page' onClick={() => handlePageSwitch("register")}>
        <Register />
      </div>
    </div>
  )
}

export default Auth
