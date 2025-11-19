import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import Workshops from './pages/Workshops'
import WorkshopPage from './pages/WorkshopPage'
import Booking from './pages/Booking'
import Checkout from './pages/Checkout'
import Confirmation from './pages/Confirmation'
import Gallery from './pages/Gallery'
import About from './pages/About'
import Contact from './pages/Contact'
import FloatingBookNow from './components/FloatingBookNow'
import WhatsAppButton from './components/WhatsAppButton'
import OrganicBackground from './components/OrganicBackground'

function Navbar(){
  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-lg bg-[#E8DCCF]/70 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[#3F6E73] shadow-inner shadow-black/20 flex items-center justify-center text-white font-bold">H</div>
          <div className="text-[#0B1D36] font-semibold tracking-tight">HANDIQ</div>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-[#0B1D36]">
          <Link className="hover:text-[#3F6E73] transition" to="/workshops">Workshops</Link>
          <Link className="hover:text-[#3F6E73] transition" to="/gallery">Gallery</Link>
          <Link className="hover:text-[#3F6E73] transition" to="/about">About</Link>
          <Link className="hover:text-[#3F6E73] transition" to="/contact">Contact</Link>
          <Link to="/booking" className="px-4 py-2 rounded-full bg-[#3F6E73] text-white shadow hover:shadow-lg transition">Book Now</Link>
        </nav>
      </div>
    </header>
  )
}

function Footer(){
  return (
    <footer className="mt-24 bg-[#0B1D36] text-[#E8DCCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="text-2xl font-semibold">HANDIQ</div>
          <p className="text-[#E8DCCF]/80 mt-2">Mindful, handcrafted workshops to help you slow down and create.</p>
        </div>
        <div>
          <div className="font-semibold mb-2">Explore</div>
          <ul className="space-y-1 text-[#E8DCCF]/80">
            <li><Link to="/workshops" className="hover:text-white">Workshops</Link></li>
            <li><Link to="/gallery" className="hover:text-white">Gallery</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Studio</div>
          <p className="text-[#E8DCCF]/80">Indiranagar, Bengaluru<br/>Open Tue–Sun, 10am–7pm</p>
        </div>
        <div>
          <div className="font-semibold mb-2">Newsletter</div>
          <form onSubmit={(e)=>e.preventDefault()} className="flex gap-2">
            <input className="flex-1 rounded-xl px-3 py-2 text-[#0B1D36]" placeholder="Your email" />
            <button className="px-4 py-2 rounded-xl bg-[#F5B21A] text-[#0B1D36] font-semibold shadow">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="text-center py-4 text-[#E8DCCF]/70 text-sm">© {new Date().getFullYear()} HANDIQ Studio</div>
    </footer>
  )}

function Layout({children}){
  useEffect(()=>{window.scrollTo(0,0)},[])
  return (
    <div className="min-h-screen bg-[#E8DCCF] relative">
      <OrganicBackground />
      <Navbar />
      <main className="pt-20 relative z-10">{children}</main>
      <Footer />
      <FloatingBookNow />
      <WhatsAppButton />
    </div>
  )
}

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home/></Layout>} />
        <Route path="/workshops" element={<Layout><Workshops/></Layout>} />
        <Route path="/workshops/:slug" element={<Layout><WorkshopPage/></Layout>} />
        <Route path="/booking" element={<Layout><Booking/></Layout>} />
        <Route path="/checkout/:bookingId" element={<Layout><Checkout/></Layout>} />
        <Route path="/confirmation/:bookingId" element={<Layout><Confirmation/></Layout>} />
        <Route path="/gallery" element={<Layout><Gallery/></Layout>} />
        <Route path="/about" element={<Layout><About/></Layout>} />
        <Route path="/contact" element={<Layout><Contact/></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
