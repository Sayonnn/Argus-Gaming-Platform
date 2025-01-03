import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Explore from '../components/Explore'
import Info from '../components/Info'
import s from './home.module.css'
import Footer from '../components/Footer'
import QAM from '../components/QAM'
import About from '../components/About'
import LargeGallery from '../components/LargeScreenGallery'
import SmallGallery from '../components/SmallScreenGallery'
import Encouragements from '../components/Encouragement'

function Home() {
  return (
    <main className={`${s.home} `}>
      <Nav/>
      <Hero/>
      <Info/>
      <About/>
      <Encouragements/>
      
      <LargeGallery/> 
      <SmallGallery/>

      <Explore/>
      <Footer/>
      <QAM/>
    </main>
  )
}

export default Home
