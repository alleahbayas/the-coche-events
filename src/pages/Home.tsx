import Hero from './Hero'
import Intro from '../components/Intro'
import PackagePreview from '../components/PackagePreview'
import Cesta from '../components/CestaSection'

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <PackagePreview />
      <Cesta />
    </>
  )
}