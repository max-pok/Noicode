// auth-service.jsx
import React from "react"

const { createContext, useContext } = React

const AuthContext = createContext(null)

export const AuthProvider = (props) => {
  const value = {
    signIn: props.signIn || signIn,
    signUp: props.signUp || signUp,
  }

  return <AuthProvider.Provider value={value}>{props.children}</AuthProvider.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}

const signUp = (body) => {
  console.log(body)
}

const signIn = (body) => {
  // ...
}
