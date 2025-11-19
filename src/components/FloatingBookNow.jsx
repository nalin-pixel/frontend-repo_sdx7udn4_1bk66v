import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function FloatingBookNow(){
  const [open, setOpen] = useState(false)
  const [workshops, setWorkshops] = useState([])
  const [workshop, setWorkshop] = useState('')
  const [sessions, setSessions] = useState([])
  const [session, setSession] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [seats, setSeats] = useState(1)
  const [loading, setLoading] = useState(false)
  const [created, setCreated] = useState(null)

  useEffect(()=>{
    fetch(`${API}/api/workshops`).then(r=>r.json()).then(d=>setWorkshops(d.items || []))
  },[])

  useEffect(()=>{
    if(!workshop) return
    fetch(`${API}/api/sessions?workshop=${workshop}`).then(r=>r.json()).then(d=>setSessions(d.items || []))
  },[workshop])

  const glow = {
    boxShadow: [
      '0 0 0 0 rgba(245,178,26,0.0)',
      '0 0 25px 6px rgba(245,178,26,0.6)',
      '0 0 0 0 rgba(245,178,26,0.0)'
    ]
  }

  async function submit(){
    setLoading(true)
    try{
      const res = await fetch(`${API}/api/bookings`, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          workshop_slug: workshop,
          session_id: session,
          customer_name: name,
          customer_email: email,
          customer_phone: phone,
          seats
        })
      })
      const d = await res.json()
      if(!res.ok){
        alert(d.detail || 'Error creating booking')
      } else {
        setCreated(d)
      }
    } finally { setLoading(false) }
  }

  return (
    <div>
      <motion.button
        onClick={()=>setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-[#3F6E73] text-white font-semibold flex items-center justify-center shadow-lg"
        animate={glow}
        transition={{duration: 2, repeat: Infinity, repeatDelay: 6}}
      >Book
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 bg-black/30 z-50"
            onClick={()=>setOpen(false)}
          >
            <motion.div
              initial={{x: 400, opacity:0}}
              animate={{x:0, opacity:1}}
              exit={{x:400, opacity:0}}
              transition={{type:'spring', stiffness:120, damping:20}}
              className="absolute right-0 top-0 bottom-0 w-full sm:w-[480px] bg-[#E8DCCF] p-6 shadow-2xl overflow-auto"
              onClick={(e)=>e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-[#0B1D36]">Book a Session</h3>
                <button onClick={()=>setOpen(false)} className="text-[#3F6E73]">Close</button>
              </div>

              {!created ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-[#0B1D36]/80">Workshop</label>
                    <select value={workshop} onChange={e=>{setWorkshop(e.target.value); setSession('')}} className="w-full mt-1 rounded-xl px-3 py-2 text-[#0B1D36]">
                      <option value="">Select workshop</option>
                      {workshops.map(w=> (<option key={w.slug} value={w.slug}>{w.title}</option>))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-[#0B1D36]/80">Date & Time</label>
                    <select value={session} onChange={e=>setSession(e.target.value)} className="w-full mt-1 rounded-xl px-3 py-2 text-[#0B1D36]">
                      <option value="">Select a slot</option>
                      {sessions.map(s=> (
                        <option key={s.id} value={s.id}>{new Date(s.start_time).toLocaleString()}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-[#0B1D36]/80">Name</label>
                      <input value={name} onChange={e=>setName(e.target.value)} className="w-full mt-1 rounded-xl px-3 py-2 text-[#0B1D36]" />
                    </div>
                    <div>
                      <label className="block text-sm text-[#0B1D36]/80">Email</label>
                      <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full mt-1 rounded-xl px-3 py-2 text-[#0B1D36]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-[#0B1D36]/80">Phone</label>
                    <input value={phone} onChange={e=>setPhone(e.target.value)} className="w-full mt-1 rounded-xl px-3 py-2 text-[#0B1D36]" />
                  </div>
                  <div>
                    <label className="block text-sm text-[#0B1D36]/80">Seats</label>
                    <input type="number" min="1" max="10" value={seats} onChange={e=>setSeats(parseInt(e.target.value)||1)} className="w-full mt-1 rounded-xl px-3 py-2 text-[#0B1D36]" />
                  </div>
                  <button disabled={loading} onClick={submit} className="w-full py-3 rounded-full bg-[#3F6E73] text-white font-semibold shadow hover:shadow-lg transition">
                    {loading? 'Processing...' : 'Book This Session'}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-[#0B1D36]">Booking created. Amount: ₹{created.amount}. Proceed to checkout.</div>
                  <a href={`/checkout/${created.booking_id}`} className="block text-center py-3 rounded-full bg-[#F5B21A] text-[#0B1D36] font-semibold">Go to Checkout</a>
                </div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
