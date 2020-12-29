import { Box } from 'theme-ui'

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
      {children}
    </Box>
  )
}
