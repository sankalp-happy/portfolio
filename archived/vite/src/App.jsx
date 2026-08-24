import Nav from './components/Nav'
import Hero from './components/Hero'
import Work from './components/Work'
import Results from './components/Results'
import Stack from './components/Stack'
import About from './components/About'
import Contact from './components/Contact'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Results />
        <Stack />
        <About />
      </main>
      <Contact />
    </>
  )
}
