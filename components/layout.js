import { Footer } from './footer'
import { Header } from './header'

export const Layout = ({ children }) => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Header />
      <div className="max-w-3xl mx-auto">{children}</div>
      <Footer />
    </main>
  )
}
