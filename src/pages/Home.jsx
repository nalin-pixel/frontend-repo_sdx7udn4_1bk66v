import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Home(){
  const [nextSession, setNextSession] = useState(null)
  useEffect(()=>{
    fetch(`${API}/api/sessions/next`).then(r=>r.json()).then(d=>setNextSession(d.item))
  },[])

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-32 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0B1D36] leading-tight">Find Creativity. Find Calm.</h1>
            <p className="mt-4 text-lg text-[#0B1D36]/80">Mindful, healing art workshops designed to help you slow down, breathe, and make something beautiful with your hands.</p>
            <div className="mt-6 flex gap-3">
              <Link to="/workshops" className="px-5 py-3 rounded-full bg-[#3F6E73] text-white shadow hover:shadow-lg transition">Explore Workshops</Link>
              <Link to="/booking" className="px-5 py-3 rounded-full bg-[#F5B21A] text-[#0B1D36] shadow hover:shadow-lg transition">Book Now</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {['https://images.unsplash.com/photo-1504593811423-6dd665756598','https://images.unsplash.com/photo-1513342791620-8d83f05df3fc','https://images.unsplash.com/photo-1600431521340-491eca880813','https://images.unsplash.com/photo-1604076936065-c6e5f0505f01'].map((src,i)=> (
              <img key={i} src={`${src}?auto=format&fit=crop&w=600&q=60`} className="rounded-3xl shadow-lg" />
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-semibold text-[#0B1D36] mb-4">Next Upcoming Session</h2>
        {nextSession ? (
          <div className="rounded-2xl p-5 bg-white shadow flex items-center justify-between">
            <div>
              <div className="text-[#3F6E73] font-semibold">{nextSession.workshop_title}</div>
              <div className="text-[#0B1D36]">{new Date(nextSession.start_time).toLocaleString()} • {nextSession.available_seats} seats left</div>
            </div>
            <Link to="/booking" className="px-4 py-2 rounded-full bg-[#3F6E73] text-white">Book Now</Link>
          </div>
        ) : (
          <div className="text-[#0B1D36]/70">Loading next session...</div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-semibold text-[#0B1D36] mb-6">Featured Workshops</h2>
        <WorkshopsGrid limit={4} />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid md:grid-cols-2 gap-8">
        <div className="rounded-3xl p-8 bg-white shadow">
          <h3 className="text-xl font-semibold text-[#0B1D36] mb-4">Why Choose Us</h3>
          <ul className="grid grid-cols-2 gap-3 text-[#0B1D36]/90">
            {['Relaxation','Creativity','Healing','Skill-Building','Mindfulness','Start a Small Business'].map(i=> <li key={i} className="rounded-xl bg-[#E8DCCF] px-3 py-2">{i}</li>)}
          </ul>
        </div>
        <div className="rounded-3xl p-8 bg-white shadow">
          <h3 className="text-xl font-semibold text-[#0B1D36] mb-4">Gallery</h3>
          <div className="grid grid-cols-3 gap-2">
            {Array.from({length:9}).map((_,i)=> <div key={i} className="h-20 bg-[#E8DCCF] rounded-xl" />)}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h3 className="text-xl font-semibold text-[#0B1D36] mb-4">Testimonials</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {['I felt so relaxed!','Loved the vibe and teacher.','Perfect weekend activity.'].map((t,i)=> (
            <div key={i} className="rounded-2xl p-6 bg-white shadow text-[#0B1D36]/90">{t}</div>
          ))}
        </div>
      </section>
    </div>
  )
}

function WorkshopsGrid({limit}){
  const [items, setItems] = useState([])
  useEffect(()=>{ fetch(`${API}/api/workshops`).then(r=>r.json()).then(d=> setItems(d.items||[])) },[])
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {(limit? items.slice(0,limit): items).map(w=> (
        <Link to={`/workshops/${w.slug}`} key={w.slug} className="rounded-3xl bg-white shadow hover:shadow-lg transition overflow-hidden group">
          <img src={`${(w.images?.[0])||'https://images.unsplash.com/photo-1519681393784-d120267933ba'}?auto=format&fit=crop&w=800&q=60`} className="h-40 w-full object-cover" />
          <div className="p-4">
            <div className="font-semibold text-[#0B1D36] group-hover:scale-[1.01] transition">{w.title}</div>
            <div className="text-[#0B1D36]/70">₹{w.price}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}
