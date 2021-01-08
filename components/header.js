import Link from 'next/link'
import { Box } from 'theme-ui'

export const Header = () => {
  return (
    <Box as="header">
      <Link href="/">
        <a>Promote Britain</a>
      </Link>
    </Box>
  )
}
