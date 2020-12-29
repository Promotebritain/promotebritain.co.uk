import { Box } from 'theme-ui'
import { Footer } from './footer'
import { Header } from './header'

export const Layout = ({ children }) => {
  return (
    <Box
      as="div"
      sx={{
        position: 'relative',
        maxWidth: 640,
        margin: '0 auto',
        padding: '0 20px',
      }}
    >
      <Header />
      {children}
      <Footer />
    </Box>
  )
}
