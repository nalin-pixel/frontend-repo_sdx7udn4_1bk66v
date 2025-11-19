export default function Gallery(){
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-[#0B1D36] mb-6">Gallery</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({length:16}).map((_,i)=> (
          <img key={i} src={`https://picsum.photos/seed/handiq${i}/600/600`} className="rounded-2xl shadow" />
        ))}
      </div>
    </div>
  )
}
