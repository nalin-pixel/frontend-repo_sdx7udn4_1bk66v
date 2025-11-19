import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Checkout(){
  const { bookingId } = useParams()
  const navigate = useNavigate()
  const [booking, setBooking] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{ fetch(`${API}/api/bookings/${bookingId}`).then(r=>r.json()).then(setBooking) },[bookingId])

  async function pay(){
    setLoading(true)
    try{
      const res = await fetch(`${API}/api/payments/checkout?booking_id=${bookingId}`, {method:'POST'})
      const d = await res.json()
      setToken(d.payment_token)
      // Simulate payment success then confirm
      const confirm = await fetch(`${API}/api/payments/confirm`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({booking_id: bookingId, payment_reference: d.payment_token})})
      const cd = await confirm.json()
      if(confirm.ok){ navigate(`/confirmation/${bookingId}`) }
    } finally { setLoading(false) }
  }

  if(!booking) return <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 text-[#0B1D36]/70">Loading...</div>

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 rounded-3xl p-6 bg-white shadow">
        <h1 className="text-2xl font-bold text-[#0B1D36] mb-4">Checkout</h1>
        <div className="text-[#0B1D36]/80 space-y-2">
          <div>Workshop: <span className="font-semibold text-[#0B1D36]">{booking.workshop?.title}</span></div>
          <div>Date: {new Date(booking.session?.start_time).toLocaleString()}</div>
          <div>Seats: {booking.seats}</div>
        </div>
      </div>
      <div className="rounded-3xl p-6 bg-white shadow">
        <div className="text-lg font-semibold text-[#0B1D36] mb-2">Payment</div>
        <div className="text-[#0B1D36]/80">Amount: <span className="font-semibold text-[#0B1D36]">₹{booking.amount}</span></div>
        <div className="text-[#0B1D36]/70 text-sm mt-1">Wix Payments / UPI / Cards supported (simulated)</div>
        <button disabled={loading} onClick={pay} className="w-full mt-4 py-3 rounded-full bg-[#3F6E73] text-white font-semibold">{loading ? 'Processing...' : 'Pay Securely'}</button>
      </div>
    </div>
  )
}
