import React from 'react'
import { ThemeProvider } from 'theme-ui'
import { Layout } from '../components/layout'
import theme from '../theme'

function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default App
