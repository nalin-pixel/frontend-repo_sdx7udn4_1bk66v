import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function WorkshopPage(){
  const { slug } = useParams()
  const [data, setData] = useState(null)
  const [reviews, setReviews] = useState([])

  useEffect(()=>{
    fetch(`${API}/api/workshops/${slug}`).then(r=>r.json()).then(setData)
    fetch(`${API}/api/reviews?workshop_slug=${slug}`).then(r=>r.json()).then(d=>setReviews(d.items||[]))
  },[slug])

  if(!data) return <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 text-[#0B1D36]/70">Loading...</div>
  const w = data.workshop
  const sessions = data.sessions || []

  return (
    <div>
      <div className="h-64 sm:h-96 relative">
        <img src={`${(w.images?.[0])||'https://images.unsplash.com/photo-1519681393784-d120267933ba'}?auto=format&fit=crop&w=1400&q=60`} className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D36]/70 to-transparent"/>
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-3xl sm:text-5xl font-bold drop-shadow">{w.title}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <p className="text-[#0B1D36]/90 text-lg">{w.description}</p>

          <div className="rounded-2xl p-5 bg-white shadow">
            <h3 className="font-semibold text-[#0B1D36] mb-2">What you will learn</h3>
            <ul className="list-disc ml-5 text-[#0B1D36]/90">
              {(w.what_you_learn||[]).map((i,idx)=> <li key={idx}>{i}</li>)}
            </ul>
          </div>

          <div className="rounded-2xl p-5 bg-white shadow">
            <h3 className="font-semibold text-[#0B1D36] mb-2">Materials provided</h3>
            <ul className="list-disc ml-5 text-[#0B1D36]/90">
              {(w.materials_provided||[]).map((i,idx)=> <li key={idx}>{i}</li>)}
            </ul>
          </div>

          <div className="rounded-2xl p-5 bg-white shadow">
            <h3 className="font-semibold text-[#0B1D36] mb-2">Gallery</h3>
            <div className="grid grid-cols-3 gap-2">
              {(w.images||[]).concat(w.images||[]).slice(0,6).map((src, i)=> (
                <img key={i} src={`${src}?auto=format&fit=crop&w=600&q=60`} className="rounded-xl"/>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-5 bg-white shadow">
            <h3 className="font-semibold text-[#0B1D36] mb-2">FAQ</h3>
            <div className="space-y-3 text-[#0B1D36]/90">
              <div>
                <div className="font-semibold">Can beginners join?</div>
                <div>Absolutely. Our sessions are beginner-friendly and calming.</div>
              </div>
              <div>
                <div className="font-semibold">Do I need to bring anything?</div>
                <div>All materials are provided unless specified.</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl p-5 bg-white shadow">
            <h3 className="font-semibold text-[#0B1D36] mb-2">Customer reviews</h3>
            <div className="space-y-3">
              {reviews.map(r=> (
                <div key={r.id} className="rounded-xl p-4 bg-[#E8DCCF]">
                  <div className="font-semibold text-[#0B1D36]">{r.name} • {r.rating}★</div>
                  <div className="text-[#0B1D36]/80">{r.comment}</div>
                </div>
              ))}
              {reviews.length===0 && <div className="text-[#0B1D36]/70">No reviews yet.</div>}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl p-5 bg-white shadow">
            <div className="text-2xl font-bold text-[#0B1D36]">₹{w.price}</div>
            <div className="text-[#0B1D36]/70">Duration: {w.duration_minutes} mins</div>
            <div className="text-[#0B1D36]/70">Location: {w.location}</div>
            <div className="text-[#0B1D36]/70">Instructor: {w.instructor}</div>
            <div className="mt-4">
              <div className="text-sm text-[#0B1D36]/70 mb-1">Upcoming slots</div>
              <div className="space-y-2">
                {sessions.map(s=> (
                  <div key={s.id} className="text-[#0B1D36]/90">{new Date(s.start_time).toLocaleString()}</div>
                ))}
                {sessions.length===0 && <div className="text-[#0B1D36]/70">No slots yet.</div>}
              </div>
            </div>
            <Link to={`/booking?workshop=${w.slug}`} className="block text-center mt-4 py-3 rounded-full bg-[#3F6E73] text-white font-semibold">Book This Workshop</Link>
          </div>

          <div className="rounded-2xl p-5 bg-white shadow">
            <h3 className="font-semibold text-[#0B1D36] mb-2">Recommended for you</h3>
            <Recommended slug={slug} />
          </div>
        </div>
      </div>
    </div>
  )
}

function Recommended({slug}){
  const [items, setItems] = useState([])
  useEffect(()=>{ fetch(`${API}/api/workshops`).then(r=>r.json()).then(d=> setItems((d.items||[]).filter(w=>w.slug!==slug).slice(0,3))) },[slug])
  return (
    <div className="space-y-3">
      {items.map(w=> (
        <Link to={`/workshops/${w.slug}`} key={w.slug} className="flex gap-3 items-center">
          <img src={`${(w.images?.[0])||'https://images.unsplash.com/photo-1519681393784-d120267933ba'}?auto=format&fit=crop&w=400&q=60`} className="w-16 h-16 object-cover rounded-xl" />
          <div>
            <div className="font-semibold text-[#0B1D36]">{w.title}</div>
            <div className="text-[#0B1D36]/70">₹{w.price}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}
