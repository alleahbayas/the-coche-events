import Header from './components/Header'
import Hero from './pages/Hero'
import Intro from './components/Intro'
import PackagePreview from './components/PackagePreview'
import Cesta from './components/CestaSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div>
      <Header />
      <Hero />
      <Intro />
      <PackagePreview />
      <Cesta />
      <Footer />
    </div>
  )
}