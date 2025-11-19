export default function Contact(){
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-[#0B1D36] mb-4">Contact Us</h1>
      <div className="rounded-3xl p-6 bg-white shadow space-y-4">
        <div>
          <div className="text-[#0B1D36]/80">Email: hello@handiq.studio</div>
          <div className="text-[#0B1D36]/80">Phone: +91 98765 43210</div>
          <a href="https://maps.google.com?q=HANDIQ%20Studio%20Indiranagar" target="_blank" className="text-[#3F6E73] underline">Open Map</a>
        </div>
        <form onSubmit={(e)=>e.preventDefault()} className="grid grid-cols-2 gap-3">
          <input className="col-span-1 rounded-xl px-3 py-2 text-[#0B1D36]" placeholder="Name"/>
          <input className="col-span-1 rounded-xl px-3 py-2 text-[#0B1D36]" placeholder="Email"/>
          <textarea className="col-span-2 rounded-xl px-3 py-2 text-[#0B1D36]" rows="4" placeholder="Message"/>
          <button className="col-span-2 px-4 py-3 rounded-full bg-[#3F6E73] text-white">Send</button>
        </form>
      </div>
    </div>
  )
}
