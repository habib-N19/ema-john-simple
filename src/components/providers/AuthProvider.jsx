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
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  //   creating new user
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }
  //   signing in users
  const signIn = (email, password) => {
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
    })
    // unmounting, stop observing when no use of the effect needed
    return () => {
      return unsubscribe()
    }
  }, [])
  const authInfo = {
    user,
    createUser,
    signIn,
    logOut
  }
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
