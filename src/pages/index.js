// ** React Imports
import { useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

// ** Hook Imports
import { useAuth } from 'src/context/FirebaseContext'

/**
 *  Set Home URL based on User Roles
 */
const Home = () => {
  // ** Hooks
  const { authUser } = useAuth()
  const router = useRouter()

  // Use the useEffect hook to wait for the authUser.uid to be returned
  useEffect(() => {
    // Check if the user is authenticated and redirect them to the appropriate page
    if (authUser && authUser.uid) {
      // Redirect user to Home URL
      router.replace('/dashboards/analytics')
    } else {
      // Redirect user to login page
      router.replace('/login')
    }
  }, [authUser]) // Only execute this effect when the authUser changes

  return null
}

export default Home
