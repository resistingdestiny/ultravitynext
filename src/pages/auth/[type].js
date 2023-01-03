import React from 'react'
import { useRouter } from 'next/router'
import Meta from 'components/Meta'
import AuthSection2 from 'components/AuthSection2'
import AuthSection3 from 'components/AuthSection3'
import AuthSection from 'components/AuthSection'

function AuthPage(props) {
  const router = useRouter()

  return <></>
}

// Tell Next.js to export static files for each page
// See https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
export const getStaticPaths = () => ({
  paths: [
    { params: { type: 'signin' } },
    { params: { type: 'signup' } },
    { params: { type: 'forgotpass' } },
    { params: { type: 'changepass' } }
  ],
  fallback: true
})

export function getStaticProps({ params }) {
  return { props: {} }
}

export default AuthPage
