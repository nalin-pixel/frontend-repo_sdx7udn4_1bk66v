import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_BACKEND_URL || ''

function useQuery(){
  const { search } = useLocation()
  return useMemo(()=> Object.fromEntries(new URLSearchParams(search)), [search])
}

export default function Booking(){
  const navigate = useNavigate()
  const q = useQuery()
  const [workshops, setWorkshops] = useState([])
  const [workshop, setWorkshop] = useState(q.workshop || '')
  const [sessions, setSessions] = useState([])
  const [session, setSession] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [seats, setSeats] = useState(1)
  const [creating, setCreating] = useState(false)

  useEffect(()=>{ fetch(`${API}/api/workshops`).then(r=>r.json()).then(d=> setWorkshops(d.items||[])) },[])
  useEffect(()=>{ if(workshop) fetch(`${API}/api/sessions?workshop=${workshop}`).then(r=>r.json()).then(d=> setSessions(d.items||[])) },[workshop])

  async function create(){
    setCreating(true)
    try{
      const res = await fetch(`${API}/api/bookings`, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({workshop_slug: workshop, session_id: session, customer_name: name, customer_email: email, customer_phone: phone, seats})
      })
      const d = await res.json()
      if(!res.ok){ alert(d.detail || 'Error'); return }
      navigate(`/checkout/${d.booking_id}`)
    } finally { setCreating(false) }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-[#0B1D36] mb-6">Book a Workshop</h1>
      <div className="rounded-3xl p-6 bg-white shadow space-y-4">
        <div>
          <label className="block text-sm text-[#0B1D36]/80">Workshop</label>
          <select value={workshop} onChange={e=>{setWorkshop(e.target.value); setSession('')}} className="w-full mt-1 rounded-xl px-3 py-2 text-[#0B1D36]">
            <option value="">Select workshop</option>
            {workshops.map(w=> <option key={w.slug} value={w.slug}>{w.title}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-[#0B1D36]/80">Date & Time</label>
          <select value={session} onChange={e=>setSession(e.target.value)} className="w-full mt-1 rounded-xl px-3 py-2 text-[#0B1D36]">
            <option value="">Select a slot</option>
            {sessions.map(s=> <option key={s.id} value={s.id}>{new Date(s.start_time).toLocaleString()}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-[#0B1D36]/80">Name</label>
            <input value={name} onChange={e=>setName(e.target.value)} className="w-full mt-1 rounded-xl px-3 py-2 text-[#0B1D36]"/>
          </div>
          <div>
            <label className="block text-sm text-[#0B1D36]/80">Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full mt-1 rounded-xl px-3 py-2 text-[#0B1D36]"/>
          </div>
        </div>
        <div>
          <label className="block text-sm text-[#0B1D36]/80">Phone</label>
          <input value={phone} onChange={e=>setPhone(e.target.value)} className="w-full mt-1 rounded-xl px-3 py-2 text-[#0B1D36]"/>
        </div>
        <div>
          <label className="block text-sm text-[#0B1D36]/80">Seats</label>
          <input type="number" min="1" max="10" value={seats} onChange={e=>setSeats(parseInt(e.target.value)||1)} className="w-full mt-1 rounded-xl px-3 py-2 text-[#0B1D36]"/>
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="text-[#0B1D36]/80">Price summary: <span className="font-semibold text-[#0B1D36]">₹{(workshops.find(w=>w.slug===workshop)?.price||0)*seats}</span></div>
          <button disabled={creating} onClick={create} className="px-5 py-3 rounded-full bg-[#3F6E73] text-white shadow hover:shadow-lg transition">{creating? 'Processing...':'Continue to Checkout'}</button>
        </div>
      </div>
    </div>
  )
}
