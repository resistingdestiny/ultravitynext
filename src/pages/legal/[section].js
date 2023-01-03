import React from 'react'
import { useRouter } from 'next/router'

function LegalPage(props) {
  const router = useRouter()

  return <></>
}

// Tell Next.js to export static files for each page
// See https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
export const getStaticPaths = () => ({
  paths: [{ params: { section: 'terms-of-service' } }, { params: { section: 'privacy-policy' } }],
  fallback: true
})

export function getStaticProps({ params }) {
  return { props: {} }
}

export default LegalPage
