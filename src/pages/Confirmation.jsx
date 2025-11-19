import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Confirmation(){
  const { bookingId } = useParams()
  const [booking, setBooking] = useState(null)
  useEffect(()=>{ fetch(`${API}/api/bookings/${bookingId}`).then(r=>r.json()).then(setBooking) },[bookingId])
  if(!booking) return <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 text-[#0B1D36]/70">Loading...</div>

  const start = new Date(booking.session?.start_time)
  const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('HANDIQ '+(booking.workshop?.title||''))}&dates=${start.toISOString().replace(/[-:]|\.\d{3}/g,'')}/${start.toISOString().replace(/[-:]|\.\d{3}/g,'')}&details=${encodeURIComponent('HANDIQ Workshop')}`

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="rounded-3xl p-6 bg-white shadow">
        <h1 className="text-2xl font-bold text-[#0B1D36]">Your Workshop is Booked!</h1>
        <div className="mt-3 text-[#0B1D36]/80">
          <div>Booking ID: {booking.id}</div>
          <div>Workshop: {booking.workshop?.title}</div>
          <div>Date: {start.toLocaleString()}</div>
          <div>Location: {booking.workshop?.location}</div>
        </div>
        <div className="mt-4 flex gap-3">
          <a className="px-4 py-2 rounded-full bg-[#F5B21A] text-[#0B1D36] font-semibold" href={calUrl} target="_blank">Add to Calendar</a>
          <a className="px-4 py-2 rounded-full bg-[#3F6E73] text-white font-semibold" href="https://maps.google.com?q=HANDIQ%20Studio%20Indiranagar" target="_blank">Open Map</a>
        </div>
        <div className="mt-6 text-[#0B1D36]/80">
          <div className="font-semibold text-[#0B1D36] mb-2">Arriving Instructions</div>
          <ul className="list-disc ml-5">
            <li>Arrive 10 minutes early.</li>
            <li>Wear comfortable clothes.</li>
            <li>Snacks and water provided.</li>
          </ul>
        </div>
        <div className="mt-6 text-[#0B1D36]/80">
          <div className="font-semibold text-[#0B1D36] mb-2">Receipt</div>
          <div>Amount paid: ₹{booking.amount} • Ref: {booking.payment_reference}</div>
        </div>
        <div className="mt-6">
          <Link to="/" className="px-4 py-2 rounded-full bg-[#3F6E73] text-white">Back to Home</Link>
        </div>
      </div>
    </div>
  )
}
