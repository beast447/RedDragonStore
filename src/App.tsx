import './App.css'
import Hero from './components/Hero.tsx'
import Navbar from './components/Navbar';
import About from './components/About';
import Shop from './components/Shop';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <Navbar />
      <div>
        <Hero />
        <About />
        <Shop />
        <Contact />
        <Footer />
      </div>
    </>
  )
}

export default App
