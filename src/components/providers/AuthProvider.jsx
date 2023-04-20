import React, { createContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import app from '../../firebase/firebase.config'

const auth = getAuth(app)
export const AuthContext = createContext(null)

//
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  //   creating new user
  const createUser = (email, password) => {
    // need to change the state of loading because creating user or signing in is a asynchronous process. thus when it does it's loading we are hitting private route and which checks if the user is there or not, but user is not available , so we are setting loading true and when user is loaded loading is false
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }
  //   signing in users
  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }
  //   sign out
  const logOut = () => {
    return signOut(auth)
  }
  //   setting observer on user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(false)
    })
    // unmounting, stop observing when no use of the effect needed
    return () => {
      return unsubscribe()
    }
  }, [])
  const authInfo = {
    user,
    createUser,
    loading,
    signIn,
    logOut
  }
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
