import { DefaultSeo } from 'next-seo'
import React from 'react'
import { ThemeProvider } from 'theme-ui'
import { Layout } from '../components/layout'
import SEO from '../next-seo.config'
import theme from '../theme'

function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default App
