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
  useEffect(() => {
    if (authUser) {
      // Redirect user to Home URL
      router.replace('/dashboards/analytics')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Spinner sx={{ height: '100%' }} />
}

export default Home
