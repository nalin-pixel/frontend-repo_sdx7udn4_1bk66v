import { motion } from 'framer-motion'

export default function OrganicBackground(){
  const blobs = [
    { c:'#3F6E73', x: '-10%', y: '-10%', s: 380, o: 0.15 },
    { c:'#B58E6D', x: '70%', y: '10%', s: 300, o: 0.12 },
    { c:'#F5B21A', x: '30%', y: '70%', s: 260, o: 0.08 },
  ]
  return (
    <div className="absolute inset-0 overflow-hidden -z-0">
      {blobs.map((b,i)=> (
        <motion.div key={i}
          initial={{scale:0.9}}
          animate={{scale:[0.95,1.05,0.95]}}
          transition={{duration: 10 + i*2, repeat: Infinity, repeatType: 'mirror'}}
          style={{
            position:'absolute', left:b.x, top:b.y,
            width:b.s, height:b.s, background:b.c,
            opacity:b.o, filter:'blur(50px)', borderRadius:'40% 60% 60% 40% / 40% 40% 60% 60%'
          }}
        />
      ))}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-1.png')] opacity-30 mix-blend-multiply" />
    </div>
  )
}
