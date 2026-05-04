import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Showcase from './components/Showcase'
import BOMTable from './components/BOMTable'
import Datasheet from './components/Datasheet'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Showcase />
        <BOMTable />
        <Datasheet />
      </main>
      <Footer />
    </div>
  )
}

export default App
