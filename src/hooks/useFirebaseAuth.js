import React, { useState, useEffect, useMemo, useContext, createContext } from 'react'
import queryString from 'query-string'
import {
  getAuth,
  onAuthStateChanged,
  signOut as authSignOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  sendEmailVerification,
  checkActionCode,
  applyActionCode,
  getAdditionalUserInfo,
  updateEmail as authUpdateEmail,
  updateProfile as authUpdateProfile,
  updatePassword as authUpdatePassword,
  sendPasswordResetEmail as authSendPasswordResetEmail,
  confirmPasswordReset as authConfirmPasswordReset
} from 'firebase/auth'
import Firebase from 'src/configs/firebase'
import { useUser, createUser, updateUser } from 'src/util/db'
import router from 'next/router'
import { getFriendlyPlanId } from '/src/util/prices'
const formatAuthUser = user => {
  return {
    uid: user.uid,
    email: user.email
  }
}

// Whether to merge extra user data from database into `auth.user`
const MERGE_DB_USER = true
// Whether to send email verification on signup
const EMAIL_VERIFICATION = true

// Wait for Firebase user to be initialized before resolving promise
// and taking any further action (such as writing to the database)
const waitForFirebase = uid => {
  return new Promise(resolve => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      // Ensure we have a user with expected `uid`
      if (user && user.uid === uid) {
        resolve(user) // Resolve promise
        unsubscribe() // Prevent from firing again
      }
    })
  })
}

// Create a `useAuth` hook and `AuthProvider` that enables
// any component to subscribe to auth and re-render when it changes.
const authContext = createContext()
export const useAuth = () => useContext(authContext)

const useFirebaseAuth = () => {
  const [authUser, setAuthUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const authStateChanged = async authState => {
    if (!authState) {
      setAuthUser(null)
      setLoading(false)
    } else {
      setLoading(true)
      const formattedUser = formatAuthUser(authState)
      setAuthUser(formattedUser)
      setLoading(false)
    }
  }

  const resetUser = () => {
    setAuthUser(null)
    setLoading(true)
  }
  const signInWithEmailAndPassword = (email, password) => {
    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        if (user) {
          window.location.replace('/dashboards/analytics')
        }
      })
  }

  // Store auth user in state
  // `user` will be object, `null` (loading) or `false` (logged out)
  const [user, setUser] = useState(null)

  const createUserWithEmailAndPassword = (email, password) =>
    Firebase.auth().createUserWithEmailAndPassword(email, password).then(signUp)

  const signUp = async res => {
    try {
      const user = res.user
      console.log('user', user)
      // Pass the user's uid into the createUser function
      createUser(user.uid, { email: user.email, owner: user.uid })
      console.log('user', user)
      setTimeout(() => {
        window.location.replace('/dashboards/analytics')
      }, 1500)
    } catch (error) {
      // Handle errors here
      console.log(error)
    }
  }

  const signOut = () => Firebase.auth().signOut().then(resetUser)

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = Firebase.auth().onAuthStateChanged(authStateChanged)

    return () => unsubscribe()
  }, [])

  const updatePassword = newPassword => {
    return authUpdatePassword(auth.currentUser, newPassword)
  }

  return {
    loading,
    signOut,
    authUser,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updatePassword
  }
}

export default useFirebaseAuth

// Handle Firebase email link for reverting to original email after an email change
export const handleRecoverEmail = async code => {
  // Check that action code is valid
  const info = await checkActionCode(auth, code)
  // Revert to original email by applying action code
  await applyActionCode(auth, code)
  // Send password reset email so user can change their password in the case
  // that someone else got into their account and changed their email.
  await authSendPasswordResetEmail(auth, info.data.email)
  // Return original email so it can be displayed by calling component
  return info.data.email
}

// Handle Firebase email link for verifying email
export const handleVerifyEmail = code => {
  return applyActionCode(auth, code)
}
