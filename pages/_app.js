import { DefaultSeo } from 'next-seo'
import React from 'react'
import 'tailwindcss/tailwind.css'
import { Layout } from '../components/layout'
import SEO from '../next-seo.config'
import '../styles/globals.css'

function App({ Component, pageProps }) {
  return (
    <Layout>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
