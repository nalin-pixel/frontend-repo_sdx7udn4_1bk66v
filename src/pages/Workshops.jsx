import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Workshops(){
  const [items, setItems] = useState([])
  useEffect(()=>{ fetch(`${API}/api/workshops`).then(r=>r.json()).then(d=> setItems(d.items||[])) },[])
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-[#0B1D36] mb-6">All Workshops</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(w=> (
          <Link to={`/workshops/${w.slug}`} key={w.slug} className="rounded-3xl bg-white shadow hover:shadow-lg transition overflow-hidden group">
            <img src={`${(w.images?.[0])||'https://images.unsplash.com/photo-1519681393784-d120267933ba'}?auto=format&fit=crop&w=800&q=60`} className="h-48 w-full object-cover" />
            <div className="p-4">
              <div className="font-semibold text-[#0B1D36] group-hover:scale-[1.01] transition">{w.title}</div>
              <div className="text-[#0B1D36]/70">₹{w.price}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
