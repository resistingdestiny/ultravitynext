import { useState, useEffect } from 'react'
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
const formatAuthUser = user => {
  return {
    uid: user.uid,
    email: user.email
  }
}

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
  const signInWithEmailAndPassword = (email, password) => Firebase.auth().signInWithEmailAndPassword(email, password)

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
      createUser(user.uid, { email: user.email })
      window.location.replace('/dashboards/analytics')
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

  return {
    loading,
    signOut,
    authUser,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
  }
}

export default useFirebaseAuth
